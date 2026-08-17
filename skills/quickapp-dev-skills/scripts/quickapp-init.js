#!/usr/bin/env node
/**
 * quickapp-init.js — 快应用项目脚手架生成器
 *
 * 基于 hap-toolkit 的 hap init 命令生成标准项目模板，
 * 并根据用户参数（--package、--name 等）进行后处理。
 *
 * 使用方法：
 *   node quickapp-init.js [项目目录] [选项]
 *
 * 选项：
 *   --package   <包名>       如 com.example.myapp（默认 com.quickapp.demo）
 *   --name      <应用名>     如 我的应用（默认 QuickApp）
 *   --version   <版本号>     如 1.0.0（默认 1.0.0）
 *   --version-code <版本码>  如 1（默认 1）
 *   --min-version <最小平台> 如 1070（默认 1070）
 *   --desc      <描述>       应用描述
 *   --skip-demo              跳过 Demo 页面和 widget，生成干净的项目结构
 *   --force     覆盖已存在的目录
 *
 * 示例：
 *   node quickapp-init.js ./my-app
 *   node quickapp-init.js ./my-app --package com.example.demo --name 我的应用 --min-version 1090
 */

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
quickapp-init.js — 快应用项目脚手架生成器

用法:
  node quickapp-init.js <项目目录> [选项]

选项:
  --package <包名>          应用包名，如 com.example.demo
  --name <应用名>           应用名称
  --version <版本号>        版本名称，如 1.0.0
  --version-code <版本码>   版本号，如 1
  --min-version <数字>      最小平台版本，如 1070
  --desc <描述>             应用描述
  --skip-demo               跳过 Demo 页面和 widget，生成干净的项目结构
  --force                   覆盖已存在的目录

示例:
  node quickapp-init.js ./my-app
  node quickapp-init.js ./my-app --package com.example.demo --name 我的应用
`);
    process.exit(0);
  }

  const projectDir = path.resolve(args[0]);
  const opts = { package: "com.quickapp.demo", name: "QuickApp", version: "1.0.0", versionCode: 1, minVersion: 1070, desc: "", skipDemo: false, force: false };

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case "--package": opts.package = args[++i]; break;
      case "--name": opts.name = args[++i]; break;
      case "--version": opts.version = args[++i]; break;
      case "--version-code": opts.versionCode = parseInt(args[++i]); break;
      case "--min-version": opts.minVersion = parseInt(args[++i]); break;
      case "--desc": opts.desc = args[++i]; break;
      case "--skip-demo": opts.skipDemo = true; break;
      case "--force": opts.force = true; break;
    }
  }

  return { projectDir, opts };
}

/**
 * Write a JSON file with consistent formatting, log the update.
 */
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
}

function generateProject({ projectDir, opts }) {
  // --- Pre-flight checks ---

  // Check hap-toolkit is installed
  const whichResult = spawnSync("which", ["hap"], { stdio: ["ignore", "pipe", "pipe"], encoding: "utf-8" });
  if (whichResult.status !== 0) {
    console.error("错误: 未检测到 hap-toolkit，请执行:");
    console.error("  npm install -g hap-toolkit --registry=https://registry.npmjs.org");
    process.exit(1);
  }

  // Handle existing directory
  if (fs.existsSync(projectDir)) {
    if (opts.force) {
      fs.rmSync(projectDir, { recursive: true, force: true });
    } else {
      console.error(`错误: 目录已存在: ${projectDir}\n使用 --force 覆盖`);
      process.exit(1);
    }
  }

  console.log(`\n创建项目: ${opts.name} (${opts.package})`);
  console.log(`目录: ${projectDir}\n`);

  // --- Run hap init ---
  const parentDir = path.dirname(projectDir);
  const appName = path.basename(projectDir);

  const result = spawnSync("hap", ["init", appName], {
    cwd: parentDir,
    input: "\n",
    stdio: ["pipe", "inherit", "inherit"],
    encoding: "utf-8",
    timeout: 30000,
  });

  if (result.status !== 0) {
    const signal = result.signal ? ` (signal: ${result.signal})` : "";
    console.error(`错误: hap init 执行失败，退出码 ${result.status}${signal}`);
    process.exit(1);
  }

  // --- Post-process manifest.json ---
  const manifestPath = path.join(projectDir, "src", "manifest.json");
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    manifest.package = opts.package;
    manifest.name = opts.name;
    manifest.versionName = opts.version;
    manifest.versionCode = opts.versionCode;
    manifest.minPlatformVersion = opts.minVersion;

    // Update entry page titleBarText
    const entryPage = manifest.router && manifest.router.entry;
    if (entryPage && manifest.display && manifest.display.pages && manifest.display.pages[entryPage]) {
      manifest.display.pages[entryPage].titleBarText = opts.name;
    }

    writeJson(manifestPath, manifest);
  }

  // --- Post-process package.json ---
  const pkgPath = path.join(projectDir, "package.json");
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    pkg.name = opts.name;
    pkg.version = opts.version;
    if (opts.desc) {
      pkg.description = opts.desc;
    }
    writeJson(pkgPath, pkg);
  }

  // --- Remove demo pages and widgets (if --skip-demo) ---
  if (opts.skipDemo) {
    const demoDirs = [
      path.join(projectDir, "src", "pages", "Demo"),
      path.join(projectDir, "src", "pages", "DemoDetail"),
      path.join(projectDir, "src", "widgets"),
    ];
    for (const dir of demoDirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log(`  ✓ ${path.relative(process.cwd(), dir)} (removed)`);
      }
    }

    // Clean up manifest: remove demo pages and widgets from router
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      if (manifest.router) {
        delete manifest.router.pages["pages/Demo"];
        delete manifest.router.pages["pages/DemoDetail"];
        delete manifest.router.widgets;
        manifest.router.entry = "";
      }
      if (manifest.display && manifest.display.pages) {
        delete manifest.display.pages["pages/Demo"];
        delete manifest.display.pages["pages/DemoDetail"];
      }
      writeJson(manifestPath, manifest);
    }
  }

  // --- Update README.md (if --desc provided) ---
  if (opts.desc) {
    const readmePath = path.join(projectDir, "README.md");
    if (fs.existsSync(readmePath)) {
      const readme = fs.readFileSync(readmePath, "utf-8");
      const newReadme = `# ${opts.name}\n\n${opts.desc}\n\n---\n\n${readme}`;
      fs.writeFileSync(readmePath, newReadme, "utf-8");
      console.log(`  ✓ ${path.relative(process.cwd(), readmePath)} (updated)`);
    }
  }

  console.log(`\n✅ 项目创建完成！`);
  console.log(`\n下一步：`);
  console.log(`  cd ${path.relative(process.cwd(), projectDir)}`);
  console.log(`  npm install`);
  console.log(`  hap build`);
}

function main() {
  const { projectDir, opts } = parseArgs();
  generateProject({ projectDir, opts });
}

main();