#!/usr/bin/env node
/**
 * quickapp-find-docs.js — 快应用文档快速查找脚本
 *
 * 在 references/ 目录中通过关键词搜索文档标题和内容，
 * 快速定位到相关文档文件，无需手动翻阅索引。
 *
 * 使用方法：
 *   node quickapp-find-docs.js <关键词>
 *
 * 选项：
 *   --full         全文搜索（默认只搜索文件名和标题）
 *   --context <n>  显示匹配行前后 n 行上下文（默认 2）
 *   --json         以 JSON 格式输出
 *   --max <n>      最大结果数（默认 20）
 *
 * 示例：
 *   node quickapp-find-docs.js 生命周期
 *   node quickapp-find-docs.js list 组件
 *   node quickapp-find-docs.js 网络请求 --full
 *   node quickapp-find-docs.js 相机 --context 5
 *   node quickapp-find-docs.js bluetooth --json
 */
const fs = require("fs");
const path = require("path");

// ─── 配置 ───────────────────────────────────────────────────────
const SKILL_DIR = path.resolve(__dirname, "..");
const REFERENCES_DIR = path.join(SKILL_DIR, "references");
const INDEX_FILE = path.join(REFERENCES_DIR, "index.md");

// ─── 参数解析 ───────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
quickapp-find-docs.js — 快应用文档快速查找脚本

在 references/ 目录中通过关键词搜索文档标题和内容，快速定位到相关文档。

用法:
  node quickapp-find-docs.js <关键词> [选项]

选项:
  --full             全文搜索（默认只搜索文件名和标题）
  --context <n>      显示匹配行前后 n 行上下文（默认 2）
  --json             以 JSON 格式输出
  --max <n>          最大结果数（默认 20）

示例:
  node quickapp-find-docs.js 生命周期
  node quickapp-find-docs.js list 组件
  node quickapp-find-docs.js 网络请求 --full
  node quickapp-find-docs.js 相机 --context 5
  node quickapp-find-docs.js bluetooth --json
`);
    process.exit(0);
  }

  const opts = {
    keywords: [],
    full: false,
    context: 2,
    json: false,
    max: 20,
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--full") {
      opts.full = true;
    } else if (args[i] === "--json") {
      opts.json = true;
    } else if (args[i] === "--context") {
      opts.context = parseInt(args[++i]) || 2;
    } else if (args[i] === "--max") {
      opts.max = parseInt(args[++i]) || 20;
    } else {
      opts.keywords.push(args[i]);
    }
  }

  return opts;
}

// ─── 文件扫描 ───────────────────────────────────────────────────
function getAllDocFiles(dir) {
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...getAllDocFiles(fullPath));
      } else if (entry.name.endsWith(".md")) {
        results.push(fullPath);
      }
    }
  } catch (e) {
    // skip unreadable dirs
  }
  return results;
}

function extractTitle(content) {
  const m = content.match(/^#\s+(.+)/m);
  return m ? m[1].trim() : "";
}

function getRelativePath(filePath) {
  return path.relative(REFERENCES_DIR, filePath);
}

// ─── 关键词搜索 ───────────────────────────────────────────────────
function matchesAll(content, keywords) {
  return keywords.every(kw => content.toLowerCase().includes(kw.toLowerCase()));
}

function searchByTitle(files, keywords) {
  const results = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const title = extractTitle(content);
    const relPath = getRelativePath(file);

    // 文件名匹配
    const fileNameMatch = matchesAll(file, keywords);

    // 标题匹配
    const titleMatch = title && matchesAll(title, keywords);

    // index.md 中的描述行匹配（行内有关键词）
    let indexContext = "";
    if (relPath !== "index.md") {
      // 不处理 index.md 自身的匹配
    }

    if (fileNameMatch || titleMatch) {
      results.push({
        file: relPath,
        title: title || path.basename(file, ".md"),
        matchType: fileNameMatch ? "filename" : "title",
        lines: [],
      });
    }
  }
  return results;
}

function searchByContent(files, keywords, contextN = 0) {
  const results = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const lines = content.split("\n");
    const title = extractTitle(content);
    const relPath = getRelativePath(file);

    const matchingLines = [];
    const seenLineNo = new Set();
    for (let i = 0; i < lines.length; i++) {
      if (matchesAll(lines[i], keywords)) {
        const start = Math.max(0, i - contextN);
        const end = Math.min(lines.length - 1, i + contextN);
        for (let j = start; j <= end; j++) {
          const lineNo = j + 1;
          if (seenLineNo.has(lineNo)) continue;
          seenLineNo.add(lineNo);
          matchingLines.push({
            line: lineNo,
            text: lines[j].trimEnd(),
            hit: j === i,
          });
        }
      }
    }

    if (matchingLines.length > 0) {
      matchingLines.sort((a, b) => a.line - b.line);
      results.push({ file: relPath, title: title || path.basename(file, ".md"), matchType: "content", lines: matchingLines });
    }
  }
  return results;
}

// ─── 索引辅助搜索 ───────────────────────────────────────────────
function searchIndex(keywords) {
  // 读取 index.md 找到匹配的主题行，然后提取对应的文档路径
  let indexContent;
  try {
    indexContent = fs.readFileSync(INDEX_FILE, "utf-8");
  } catch {
    return [];
  }

  const lines = indexContent.split("\n");
  const matchedLines = [];

  for (let i = 0; i < lines.length; i++) {
    if (matchesAll(lines[i], keywords)) {
      // 尝试从行中提取文档路径（通常在 | 分隔的最后一列或链接中）
      const pathMatch = lines[i].match(/`([^`]+\.md)`/);
      const linkMatch = lines[i].match(/\(([^)]+\.md)\)/);
      const docPath = pathMatch ? pathMatch[1] : linkMatch ? linkMatch[1] : "";

      matchedLines.push({
        indexLine: i + 1,
        text: lines[i].trim(),
        docPath,
      });
    }
  }

  return matchedLines;
}

// ─── 输出 ───────────────────────────────────────────────────────
function outputJson(data) {
  console.log(JSON.stringify(data, null, 2));
}

function outputText(results, indexMatches, opts) {
  const total = results.length + indexMatches.length;

  if (indexMatches.length > 0) {
    console.log(`\n\u2512 index.md \u4e2d\u627e\u5230\u7684\u76f8\u5173\u8bb0\u5f55\uFF1A`);
    console.log(`\u250c${"\u2500".repeat(58)}\u2510`);
    for (const m of indexMatches) {
      console.log(`\u2502 \u001b[36m\u2192\u001b[0m ${m.text}`);
      if (m.docPath) {
        console.log(`\u2502   \u001b[2m\u6587\u6863: ${m.docPath}\u001b[0m`);
      }
    }
    console.log(`\u2514${"\u2500".repeat(58)}\u2518`);
  }

  if (results.length === 0) {
    if (indexMatches.length === 0) {
      console.log(`\n\u6ca1\u6709\u627e\u5230\u76f8\u5173\u6587\u6863\u3002`);
    }
    return;
  }

  console.log(`\n\u627e\u5230 ${results.length} \u4e2a\u76f8\u5173\u6587\u6863\uFF1A\n`);

  for (let i = 0; i < Math.min(results.length, opts.max); i++) {
    const r = results[i];
    const tag = r.matchType === "filename" ? "\u001b[33m\u6587\u4ef6\u540d\u001b[0m" : r.matchType === "title" ? "\u001b[32m\u6807\u9898\u001b[0m" : "\u001b[34m\u5185\u5bb9\u001b[0m";
    console.log(`  ${String(i + 1).padStart(2)}. ${tag} \u001b[1m${r.title}\u001b[0m`);
    console.log(`     ${r.file}`);

    if (r.lines && r.lines.length > 0) {
      let previewLines = [];
      if (r.matchType === "content" && opts.context > 0) {
        const firstHit = r.lines.find(l => l.hit);
        if (firstHit) {
          const startLine = firstHit.line - opts.context;
          const endLine = firstHit.line + opts.context;
          previewLines = r.lines.filter(l => l.line >= startLine && l.line <= endLine);
        }
      }
      if (previewLines.length === 0) {
        previewLines = r.lines.slice(0, 5);
      }

      for (const matchLine of previewLines) {
        const prefix = matchLine.hit ? ">" : " ";
        const lineNo = matchLine.line != null ? String(matchLine.line).padStart(4) : "   -";
        console.log(`     \u2502${prefix} ${lineNo}: ${matchLine.text}`);
      }

      if (r.matchType === "content") {
        const totalHits = r.lines.filter(l => l.hit).length;
        const shownHits = previewLines.filter(l => l.hit).length;
        if (totalHits > shownHits) {
          console.log(`     \u2502 ... \u8fd8\u6709 ${totalHits - shownHits} \u884c\u547d\u4e2d`);
        }
      } else if (r.lines.length > 5) {
        console.log(`     \u2502 ... \u8fd8\u6709 ${r.lines.length - 5} \u884c\u5339\u914d`);
      }
    }
    console.log();
  }

  if (results.length > opts.max) {
    console.log(`  ... \u8fd8\u6709 ${results.length - opts.max} \u4e2a\u7ed3\u679c\u672a\u663e\u793a\uFF0C\u4f7f\u7528 --max <n> \u8c03\u8282`);
  }

  // 显示统计
  const byType = {};
  results.forEach(r => { byType[r.matchType] = (byType[r.matchType] || 0) + 1; });
  const parts = Object.entries(byType).map(([k, v]) => `${k}: ${v}`);
  console.log(`  \u001b[2m(\u7edf\u8ba1: ${parts.join(", ")})\u001b[0m\n`);
}

// ─── 主流程 ─────────────────────────────────────────────────────
function main() {
  const opts = parseArgs();

  if (!fs.existsSync(REFERENCES_DIR)) {
    console.error(`\u9519\u8bef: \u6587\u6863\u76ee\u5f55\u4e0d\u5b58\u5728: ${REFERENCES_DIR}`);
    process.exit(1);
  }

  const keywords = opts.keywords;
  if (keywords.length === 0) {
    console.error("\u9519\u8bef: \u8bf7\u8f93\u5165\u5173\u952e\u8bcd");
    process.exit(1);
  }

  // 1. 先在 index.md 中查找
  const indexMatches = searchIndex(keywords);

  // 2. 搜索文档
  const files = getAllDocFiles(REFERENCES_DIR);
  let results;

  if (opts.full) {
    results = searchByContent(files, keywords, opts.context);
  } else {
    // 默认：先按标题/文件名搜索，如果结果太少再补充内容搜索
    results = searchByTitle(files, keywords);
    if (results.length < 3) {
      const contentResults = searchByContent(files, keywords, opts.context);
      // 合并去重
      const existingFiles = new Set(results.map(r => r.file));
      for (const cr of contentResults) {
        if (!existingFiles.has(cr.file)) {
          results.push(cr);
          existingFiles.add(cr.file);
        }
      }
    }
  }

  // 按匹配类型排序：文件名 > 标题 > 内容
  const typeOrder = { filename: 0, title: 1, content: 2 };
  results.sort((a, b) => (typeOrder[a.matchType] || 9) - (typeOrder[b.matchType] || 9));

  if (opts.json) {
    outputJson({ keywords, indexMatches, results, total: results.length });
  } else {
    outputText(results, indexMatches, opts);
  }
}

main();
