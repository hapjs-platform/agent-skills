#!/usr/bin/env node
/**
 * hap-validate.js — 统一快应用代码校验（基于 hap-toolkit）
 *
 * hap build 命令对实际项目结构进行编译，从构建日志中提取校验结果。
 *
 * 使用方式：
 *   node hap-validate.js <eval-dir>              从 eval 输出目录提取代码并校验
 *   node hap-validate.js <project-dir>            直接校验现存的快应用项目
 *   node hap-validate.js --file <path.ux/.json>   校验单个文件（自动搭架项目）
 *   node hap-validate.js --help                   帮助信息
 *
 * 返回 JSON 格式：
 *   { buildSuccess: bool, hasRpk: bool, errors: [...], warnings: [...], fatalError: str|null }
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const os = require("os");

// ========================================================================
// 1. Default project scaffold
// ========================================================================

const DEFAULT_MANIFEST = {
  package: "com.validate.scaffold",
  name: "ValidateProject",
  versionName: "1.0.0",
  versionCode: 1,
  minPlatformVersion: 1070,
  icon: "/assets/logo.png",
  config: { logLevel: "off" },
  features: [],
  router: {
    entry: "pages/Index",
    pages: { "pages/Index": { component: "index" } },
  },
  display: { titleBar: true },
};

const DEFAULT_APP_UX = `<script>
export default {
  onCreate() { console.info('App onCreate') },
  onDestroy() { console.info('App onDestroy') },
}
</script>`;

const DEFAULT_PAGE_UX = `<template>
  <div class="page">
    <text>{{title}}</text>
  </div>
</template>
<style>
  .page { flex-direction: column; justify-content: center; align-items: center; width: 750px; }
  .title { font-size: 48px; }
</style>
<script>
export default { private: { title: 'Hello' } }
</script>`;

// ========================================================================
// 2. Code extraction from markdown
// ========================================================================

/**
 * Extract code blocks from markdown transcript.
 * Returns array of { language, content, filename_hint }.
 */
function extractCodeBlocks(markdown) {
  const blocks = [];
  // Match fenced code blocks: ```lang\ncontent```
  const fenceRx = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  while ((match = fenceRx.exec(markdown)) !== null) {
    const language = match[1].toLowerCase() || "text";
    const content = match[2];
    blocks.push({ language, content, filename_hint: null });
  }
  return blocks;
}

/**
 * Scan context lines around code blocks for explicit filename hints.
 */
function applyContextHints(markdown, blocks) {
  const hintRx = /(?:\/\/|#)\s*(?:file:\s*)?([^\s"']+\.(?:ux|js|json|css))/i;

  for (const block of blocks) {
    const blockStart = markdown.indexOf(block.content);
    if (blockStart < 0) continue;

    // Search preceding 400 chars for filename hint
    const preContext = markdown.substring(Math.max(0, blockStart - 400), blockStart);
    const hintMatch = preContext.match(hintRx);
    if (hintMatch) {
      block.filename_hint = hintMatch[1];
    }
  }
}

/**
 * Classify a code block: determine its likely filename and file type.
 */
function classifyBlock(block) {
  if (block.filename_hint) return; // Already has explicit hint

  const { language, content } = block;
  const trimmed = content.trim();

  // JSON with manifest fields → manifest.json
  if (language === "json" && /"package"\s*:/.test(trimmed) && /"router"\s*:/.test(trimmed)) {
    block.filename_hint = "manifest.json";
    return;
  }

  // Has <template> or <script> → .ux file
  if (/<template>/.test(trimmed) || /<script>/.test(trimmed)) {
    // Hint from content itself: e.g., // app.ux
    const inlineHint = trimmed.match(/\/\/\s*(.+\.ux)/);
    if (inlineHint) {
      block.filename_hint = inlineHint[1];
    } else if (language === "ux") {
      block.filename_hint = "page.ux";
    } else {
      // JavaScript tagged but contains template — still .ux
      block.filename_hint = "page.ux";
    }
    return;
  }

  // Plain JSON (non-manifest) → data file
  if (language === "json") {
    block.filename_hint = "data.json";
    return;
  }

  // JavaScript → .js file (but only if it's actual JS, not template-style)
  if ((language === "javascript" || language === "js") && !/<template>/.test(trimmed)) {
    block.filename_hint = "module.js";
    return;
  }

  // CSS/Less → .css file
  if (language === "css" || language === "less") {
    block.filename_hint = "style.css";
    return;
  }
}

// ========================================================================
// 3. Project scaffolding
// ========================================================================

/**
 * Create a temporary QuickApp project with extracted code blocks.
 * Returns the path to the temp project directory.
 */
function scaffoldProject(codeBlocks) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "hap-validate-"));
  const srcDir = path.join(tmpDir, "src");
  const pagesDir = path.join(srcDir, "pages");
  fs.mkdirSync(path.join(srcDir, "assets"), { recursive: true });

  // Write package.json
  fs.writeFileSync(
    path.join(tmpDir, "package.json"),
    JSON.stringify({ name: "validate-app", version: "1.0.0" }, null, 2)
  );

  // Start with default manifest, merge any extracted manifest.json
  const manifest = JSON.parse(JSON.stringify(DEFAULT_MANIFEST));
  let hasAppUx = false;
  let pageIndex = 0;
  const pageFiles = [];
  let hasRealPages = false;

  for (const block of codeBlocks) {
    if (!block.filename_hint) continue;

    if (block.filename_hint === "manifest.json") {
      try {
        const extracted = JSON.parse(block.content);
        Object.assign(manifest, deepMerge(manifest, extracted));
      } catch {
        // Invalid JSON, skip
      }
      continue;
    }

    if (block.filename_hint === "app.ux") {
      fs.writeFileSync(path.join(srcDir, "app.ux"), block.content);
      hasAppUx = true;
      continue;
    }

    if (block.filename_hint === "page.ux" || block.filename_hint.endsWith(".ux")) {
      // First real page: clear default scaffold pages
      if (!hasRealPages) manifest.router.pages = {};
      hasRealPages = true;

      let pagePath, pageKey;
      if (block.filename_hint.includes("/")) {
        // e.g. "pages/Demo/index.ux" → pagePath is the .ux file, pageKey is "pages/Demo"
        pagePath = path.join(srcDir, block.filename_hint);
        pageKey = path.dirname(block.filename_hint); // "pages/Demo"
      } else {
        pageIndex++;
        const pageName = `Page${pageIndex}`;
        pageKey = `pages/${pageName}`;
        pagePath = path.join(srcDir, "pages", pageName, "index.ux");
      }
      // Component must always be "index" — hap-toolkit resolves it as filename in the page dir
      manifest.router.pages[pageKey] = { component: "index" };
      fs.mkdirSync(path.dirname(pagePath), { recursive: true });
      fs.writeFileSync(pagePath, block.content);
      pageFiles.push(pagePath);
      continue;
    }

    if (block.filename_hint.endsWith(".js")) {
      const helperDir = path.join(srcDir, "helper");
      fs.mkdirSync(helperDir, { recursive: true });
      fs.writeFileSync(path.join(helperDir, block.filename_hint), block.content);
      continue;
    }

    if (block.filename_hint.endsWith(".css")) {
      const cssDir = path.join(srcDir, "assets", "styles");
      fs.mkdirSync(cssDir, { recursive: true });
      fs.writeFileSync(path.join(cssDir, block.filename_hint), block.content);
      continue;
    }
  }

  // Ensure app.ux exists
  if (!hasAppUx) {
    fs.writeFileSync(path.join(srcDir, "app.ux"), DEFAULT_APP_UX);
  }

  // Set entry to first registered page
  if (hasRealPages) {
    const pageKeys = Object.keys(manifest.router.pages);
    if (pageKeys.length > 0) {
      manifest.router.entry = pageKeys[0];
    }
  }

  // Ensure at least one page exists matching the manifest entry
  const entry = manifest.router.entry;
  const entryPagePath = path.join(srcDir, entry, "index.ux");
  if (!fs.existsSync(entryPagePath) && pageFiles.length > 0) {
    // Update entry to the first registered page
    const firstPage = path.relative(srcDir, path.dirname(pageFiles[0]));
    manifest.router.entry = firstPage;
  } else if (!fs.existsSync(entryPagePath) && pageFiles.length === 0) {
    // Write a default page
    const defaultPageDir = path.join(srcDir, "pages", "Index");
    fs.mkdirSync(defaultPageDir, { recursive: true });
    fs.writeFileSync(path.join(defaultPageDir, "index.ux"), DEFAULT_PAGE_UX);
    manifest.router.pages["pages/Index"] = { component: "index" };
    manifest.router.entry = "pages/Index";
  }

  // Write merged manifest.json
  fs.writeFileSync(path.join(srcDir, "manifest.json"), JSON.stringify(manifest, null, 2));

  return tmpDir;
}

/**
 * Simple deep merge: b overrides a for plain objects, returns a new object.
 */
function deepMerge(a, b) {
  const result = { ...a };
  for (const key of Object.keys(b)) {
    if (
      b[key] &&
      typeof b[key] === "object" &&
      !Array.isArray(b[key]) &&
      a[key] &&
      typeof a[key] === "object" &&
      !Array.isArray(a[key])
    ) {
      result[key] = deepMerge(a[key], b[key]);
    } else {
      result[key] = b[key];
    }
  }
  return result;
}

// ========================================================================
// 4. Run hap build
// ========================================================================

/**
 * Check if hap-toolkit is installed and accessible.
 */
function checkHapInstalled() {
  const result = spawnSync("which", ["hap"], {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf-8",
  });
  if (result.status !== 0) {
    console.error("错误: 未检测到 hap-toolkit，无法执行代码校验。请执行:");
    console.error("  npm install -g hap-toolkit --registry=https://registry.npmjs.org");
    process.exit(1);
  }
}

/**
 * Execute `hap build` in the given project directory.
 * Uses spawnSync to properly capture hap-toolkit's console output which
 * uses console.log/console.error (not direct stream writes).
 * Returns { exitCode, stdout, stderr, hasBuild, hasDist, rpkFiles }.
 */
function runHapBuild(projectDir) {
  checkHapInstalled();
  const result = spawnSync("hap", ["build"], {
    cwd: projectDir,
    timeout: 60000,
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
    maxBuffer: 10 * 1024 * 1024,
  });

  const stdout = result.stdout ? result.stdout.toString() : "";
  const stderr = result.stderr ? result.stderr.toString() : "";
  const exitCode = result.status;

  // Check for build artifacts
  const buildDir = path.join(projectDir, "build");
  const distDir = path.join(projectDir, "dist");
  const hasBuild = fs.existsSync(buildDir);
  const hasDist = fs.existsSync(distDir);
  const rpkFiles = hasDist
    ? fs.readdirSync(distDir).filter((f) => f.endsWith(".rpk"))
    : [];

  return { exitCode, stdout, stderr, hasBuild, hasDist, rpkFiles };
}

// ========================================================================
// 5. Parse hap build output
// ========================================================================

/**
 * Parse hap build stdout + stderr into structured validation results.
 */
function parseBuildOutput({ exitCode, stdout, stderr }) {
  const errors = [];
  const warnings = [];

  // --- Parse stderr for structured validation messages ---
  const stderrLines = stderr.split("\n");
  for (const line of stderrLines) {
    // [WARN] <path> @<line>:<col> WARN: <message>
    let m = line.match(/^\[WARN\]\s+(.+?)\s*@(\d+):(\d+)\s+WARN:\s+(.+?)$/);
    if (m) {
      warnings.push({ file: relativizePath(m[1]), line: parseInt(m[2]), col: parseInt(m[3]), message: m[4] });
      continue;
    }

    // [WARN] <path> @<line>:<col> Warn: <message> (capitalization variant)
    m = line.match(/^\[WARN\]\s+(.+?)\s*@(\d+):(\d+)\s+Warn:\s+(.+?)$/);
    if (m) {
      warnings.push({ file: relativizePath(m[1]), line: parseInt(m[2]), col: parseInt(m[3]), message: m[4] });
      continue;
    }

    // [ERROR] <path> @<line>:<col> ERROR: <message>
    m = line.match(/^\[ERROR\]\s+(.+?)\s*@(\d+):(\d+)\s+ERROR:\s+(.+?)$/);
    if (m) {
      errors.push({ file: relativizePath(m[1]), line: parseInt(m[2]), col: parseInt(m[3]), message: m[4] });
      continue;
    }

    // [ERROR] <path> @<line>:<col> <keyword>: <message> (CSS validation style)
    m = line.match(/^\[ERROR\]\s+(.+?)\s*@(\d+):(\d+)\s+(.+?):\s+(.+?)$/);
    if (m) {
      const keyword = m[4];
      // Only capture Haplinker/css-type errors, skip generic manifest errors
      if (keyword.includes("`")) {
        errors.push({ file: relativizePath(m[1]), line: parseInt(m[2]), col: parseInt(m[3]), message: `${keyword}: ${m[5]}` });
      }
      continue;
    }
  }

  // --- Check for fatal build errors in stderr ---
  // hap-toolkit dumps minified webpack bundle to stderr on fatal errors,
  // but the actual error message is the last "Error: 编译失败：<reason>" line.
  // Only match the clear error line, not minified JS content.
  let fatalError = null;
  if (exitCode !== 0 || (!errors.length && !warnings.length && !stdout.includes("### App Loader ###"))) {
    // Search from the end for "Error: 编译失败" - the real error
    const stderrLines = stderr.split("\n");
    for (let i = stderrLines.length - 1; i >= 0; i--) {
      const line = stderrLines[i].trim();
      if (line.startsWith("Error: ")) {
        fatalError = line.replace(/^Error:\s*/, "").trim();
        break;
      }
    }
  }

  // --- Check build success ---
  const buildSuccess = exitCode === 0 && stdout.includes("### App Loader ### 项目构建并生成文件");
  const hasRpk = stdout.match(/### App Loader ### 项目构建并生成文件：(.+\.rpk)/);

  return {
    buildSuccess,
    hasRpk: !!hasRpk,
    rpkName: hasRpk ? hasRpk[1] : null,
    errors,
    warnings,
    fatalError,
  };
}

/**
 * Relativize a full file path to just its src/ relative portion for readability.
 */
function relativizePath(filePath) {
  const idx = filePath.indexOf("/src/");
  if (idx >= 0) {
    return filePath.substring(idx + 1);
  }
  return filePath;
}

// ========================================================================
// 6. Read eval output directory
// ========================================================================

/**
 * Read all text output files from an eval directory (with_skill or without_skill).
 */
function readEvalOutputs(evalDir) {
  const outputsDir = path.join(evalDir, "outputs");
  if (!fs.existsSync(outputsDir)) return "";

  const texts = [];
  const files = fs.readdirSync(outputsDir).sort();
  for (const file of files) {
    if (file.endsWith(".md") || file.endsWith(".txt")) {
      try {
        texts.push(fs.readFileSync(path.join(outputsDir, file), "utf-8"));
      } catch { /* skip unreadable */ }
    }
  }
  return texts.join("\n\n");
}

// ========================================================================
// 7. Main
// ========================================================================

function printUsage() {
  console.log(`
hap-validate.js — 统一快应用代码校验（基于 hap-toolkit）

用法:
  node hap-validate.js <eval-dir>              从 eval 输出目录提取代码并校验
  node hap-validate.js <project-dir>           直接校验现存的快应用项目
  node hap-validate.js --file <path>           校验单个文件（自动搭架项目）
  node hap-validate.js --help                  帮助信息

示例:
  node hap-validate.js ./eval-0/with_skill
  node hap-validate.js ./my-quickapp-project
  node hap-validate.js --file src/manifest.json
`);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printUsage();
    process.exit(0);
  }

  let projectDir = null;
  let singleFile = null;
  let markdownText = null;
  let keepTemp = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--file") {
      singleFile = path.resolve(args[++i]);
      continue;
    }
    if (args[i] === "--keep-temp") {
      keepTemp = true;
      continue;
    }
    if (args[i] === "--markdown") {
      const mdPath = path.resolve(args[++i]);
      markdownText = fs.readFileSync(mdPath, "utf-8");
      continue;
    }
    if (!args[i].startsWith("--")) {
      // Positional argument: could be eval dir or project dir
      const candidate = path.resolve(args[i]);
      if (fs.existsSync(candidate)) {
        const outputsDir = path.join(candidate, "outputs");
        if (fs.existsSync(outputsDir)) {
          // It's an eval run directory with outputs/
          markdownText = readEvalOutputs(candidate);
        } else {
          // It might be a project directory (has src/manifest.json or package.json)
          projectDir = candidate;
        }
      }
    }
  }

  // Determine what to validate
  if (singleFile) {
    // Single file mode: scaffold a project around the single file
    const content = fs.readFileSync(singleFile, "utf-8");
    const ext = path.extname(singleFile).toLowerCase();
    const baseName = path.basename(singleFile);
    const lang = ext === ".ux" ? "ux" : ext === ".json" ? "json" : ext === ".js" ? "javascript" : "text";

    const codeBlocks = [{ language: lang, content, filename_hint: baseName }];
    classifyBlock(codeBlocks[0]);
    projectDir = scaffoldProject(codeBlocks);
  } else if (markdownText) {
    // Markdown mode: extract code blocks
    const codeBlocks = extractCodeBlocks(markdownText);
    applyContextHints(markdownText, codeBlocks);
    for (const block of codeBlocks) classifyBlock(block);

    if (codeBlocks.length === 0) {
      const result = {
        buildSuccess: null,
        hasRpk: false,
        note: "No code blocks found in markdown (knowledge-only eval)",
        errors: [],
        warnings: [],
        fatalError: null,
      };
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    }

    projectDir = scaffoldProject(codeBlocks.filter((b) => b.filename_hint));
  }

  if (!projectDir) {
    console.error("Error: could not determine what to validate");
    process.exit(1);
  }

  // Run hap build
  const buildResult = runHapBuild(projectDir);

  // Parse output
  const result = parseBuildOutput(buildResult);

  // Clean up temp dir only (not real project directories)
  if (!keepTemp && projectDir.startsWith(os.tmpdir())) {
    try {
      fs.rmSync(projectDir, { recursive: true, force: true });
    } catch { /* ignore cleanup errors */ }
  }

  console.log(JSON.stringify(result, null, 2));
  process.exit(result.buildSuccess ? 0 : 1);
}

if (require.main === module) {
  main();
}