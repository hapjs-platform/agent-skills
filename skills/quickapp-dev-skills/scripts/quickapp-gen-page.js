#!/usr/bin/env node
/**
 * quickapp-gen-page.js — 快应用页面/组件脚手架生成器
 *
 * 快速生成页面或组件的 .ux 文件骨架，并可选择更新 manifest.json 路由配置。
 * 使用方法：
 *   node quickapp-gen-page.js <名称> [选项]
 *
 * 选项：
 *   --type      <类型>     page 或 component（默认 page）
 *   --dir       <目录>     目标目录（默认当前目录的 src/pages 或 src/components）
 *   --manifest  <路径>     manifest.json 路径，指定后自动注册路由（仅 page 类型）
 *   --api-mode  <模式>     callback / promise / subscription（默认 callback）
 *   --desc      <描述>     页面或组件描述
 *   --force               覆盖已存在的文件
 *
 * 示例：
 *   node quickapp-gen-page.js UserProfile
 *   node quickapp-gen-page.js UserProfile --type page --manifest ./src/manifest.json
 *   node quickapp-gen-page.js AvatarPicker --type component --dir ./src/components
 *   node quickapp-gen-page.js DataList --api-mode promise
 */
const fs = require("fs");
const path = require("path");

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length < 1 || args[0] === "--help" || args[0] === "-h") {
    console.log(`
quickapp-gen-page.js — 快应用页面/组件脚手架生成器

用法:
  node quickapp-gen-page.js <名称> [选项]

选项:
  --type     <类型>     page 或 component（默认 page）
  --dir      <目录>     目标目录
  --manifest <路径>     manifest.json 路径，指定后自动注册路由（仅 page 类型）
  --api-mode <模式>     callback / promise / subscription（默认 callback）
  --desc     <描述>     页面或组件描述
  --force               覆盖已存在的文件

示例:
  node quickapp-gen-page.js UserProfile
  node quickapp-gen-page.js UserProfile --type page --manifest ./src/manifest.json
  node quickapp-gen-page.js AvatarPicker --type component --dir ./src/components
`);
    process.exit(0);
  }

  const name = args[0];
  const opts = {
    type: "page",
    dir: "",
    manifest: "",
    apiMode: "callback",
    desc: "",
    force: false,
  };

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case "--type":
        opts.type = args[++i];
        break;
      case "--dir":
        opts.dir = path.resolve(args[++i]);
        break;
      case "--manifest":
        opts.manifest = path.resolve(args[++i]);
        break;
      case "--api-mode":
        opts.apiMode = args[++i];
        break;
      case "--desc":
        opts.desc = args[++i];
        break;
      case "--force":
        opts.force = true;
        break;
    }
  }

  return { name, opts };
}

function toComponentName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function toRoutePath(name) {
  return `pages/${toComponentName(name)}`;
}

function generatePageUx(name, opts) {
  const compName = toComponentName(name);

  let scriptContent = "";
  if (opts.apiMode === "promise") {
    scriptContent = `  export default {
    private: {
      title: '${compName}',
      loading: false,
      data: null,
    },
    onInit() {
      this.$page.setTitleBar({ text: '${compName}' })
    },
    onReady() {
      this.fetchData()
    },
    async fetchData() {
      this.loading = true
      try {
        const response = await fetch.fetch({
          url: 'https://api.example.com/data',
          method: 'GET',
        })
        const res = JSON.parse(response.data)
        this.data = res
      } catch (e) {
        console.error('fetch error', e)
      } finally {
        this.loading = false
      }
    },
    onDestroy() {
      // 清理资源
    },
  }`;
  } else if (opts.apiMode === "subscription") {
    scriptContent = `  let listener = null

  export default {
    private: {
      title: '${compName}',
      data: null,
    },
    onInit() {
      this.$page.setTitleBar({ text: '${compName}' })
    },
    onReady() {
      this.startListening()
    },
    startListening() {
      // 示例：订阅地理位置更新
      // const geolocation = require('@system.geolocation')
      // listener = geolocation.subscribe({
      //   callback: (res) => {
      //     if (this.\$valid) {
      //       this.data = res
      //     }
      //   },
      // })
    },
    onDestroy() {
      // 取消订阅，避免内存泄漏
      // if (listener && listener.unsubscribe) {
      //   listener.unsubscribe()
      // }
    },
  }`;
  } else {
    // callback 模式（默认）
    scriptContent = `  export default {
    private: {
      title: '${compName}',
      loading: false,
      data: null,
    },
    onInit() {
      this.$page.setTitleBar({ text: '${compName}' })
    },
    onReady() {
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      // const fetch = require('@system.fetch')
      // fetch.fetch({
      //   url: 'https://api.example.com/data',
      //   method: 'GET',
      //   success: (res) => {
      //     if (this.\$valid) {
      //       this.data = JSON.parse(res.data)
      //     }
      //   },
      //   fail: (err) => {
      //     console.error('fetch error', err)
      //   },
      //   complete: () => {
      //     this.loading = false
      //   },
      // })
    },
    onDestroy() {
      // 清理资源
    },
  }`;
  }

  return `<template>
  <div class="page">
    <text class="title">{{title}}</text>
    ${opts.desc ? `    <text class="desc">${opts.desc}</text>` : ""}
  </div>
</template>

<style lang="less">
  .page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 750px;
    height: 100%;
  }
  .title {
    font-size: 48px;
    color: #212121;
    margin-bottom: 20px;
  }
  ${opts.desc ? `  .desc {\n    font-size: 28px;\n    color: #999999;\n  }` : ""}
</style>

<script>
${scriptContent}
</script>`;
}

function generateComponentUx(name, opts) {
  const compName = toComponentName(name);

  return `<template>
  <div class="comp">
    <text class="title">{{title}}</text>
    <slot></slot>
  </div>
</template>

<style lang="less">
  .comp {
    flex-direction: column;
    width: 100%;
  }
  .title {
    font-size: 32px;
    color: #212121;
    margin-bottom: 10px;
  }
</style>

<script>
  export default {
    props: ['data'],
    data: {
      title: '${compName}',
    },
    onInit() {
      console.info('${compName} component init')
    },
    onReady() {
      // 组件就绪
    },
    onDestroy() {
      // 清理资源
    },
  }
</script>`;
}

function updateManifest(manifestPath, name) {
  if (!fs.existsSync(manifestPath)) {
    console.error(`  \u26a0 manifest.json \u4e0d\u5b58\u5728: ${manifestPath}`);
    return false;
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  } catch (e) {
    console.error(`  \u26a0 manifest.json \u89e3\u6790\u5931\u8d25: ${e.message}`);
    return false;
  }

  const routePath = toRoutePath(name);
  const componentName = "index";

  if (!manifest.router) {
    manifest.router = { entry: "", pages: {} };
  }
  if (!manifest.router.pages) {
    manifest.router.pages = {};
  }

  if (manifest.router.pages[routePath]) {
    console.log(`  \u26a0 \u8def\u7531\u5df2\u5b58\u5728: ${routePath}`);
    return false;
  }

  manifest.router.pages[routePath] = { component: componentName };

  // 如果还没有 entry，将当前页面设为 entry
  if (!manifest.router.entry) {
    manifest.router.entry = routePath;
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`  \u2713 \u5df2\u6ce8\u518c\u8def\u7531: ${routePath} \u2192 ${componentName}`);
  return true;
}

function generate({ name, opts }) {
  const compName = toComponentName(name);

  // 确定目标目录
  let targetDir;
  if (opts.dir) {
    targetDir = opts.dir;
  } else if (opts.type === "page") {
    targetDir = path.join(process.cwd(), "src", "pages", compName);
  } else {
    targetDir = path.join(process.cwd(), "src", "components", compName);
  }

  const uxFile = path.join(targetDir, "index.ux");

  if (fs.existsSync(uxFile) && !opts.force) {
    console.error(`\u9519\u8bef: \u6587\u4ef6\u5df2\u5b58\u5728: ${uxFile}\n\u4f7f\u7528 --force \u8986\u76d6`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  console.log(`\n\u521b\u5efa ${opts.type === "page" ? "\u9875\u9762" : "\u7ec4\u4ef6"}: ${compName}`);
  console.log(`\u76ee\u5f55: ${targetDir}\n`);

  // 生成 .ux 文件
  const content =
    opts.type === "page"
      ? generatePageUx(name, opts)
      : generateComponentUx(name, opts);

  fs.mkdirSync(path.dirname(uxFile), { recursive: true });
  fs.writeFileSync(uxFile, content, "utf-8");
  console.log(`  \u2713 ${path.relative(process.cwd(), uxFile)}`);

  // 如果是页面且指定了 manifest，则注册路由
  if (opts.type === "page" && opts.manifest) {
    updateManifest(opts.manifest, name);
  }

  console.log(`\n\u2705 ${opts.type === "page" ? "\u9875\u9762" : "\u7ec4\u4ef6"} ${compName} \u521b\u5efa\u5b8c\u6210\uff01`);
}

function main() {
  const { name, opts } = parseArgs();
  generate({ name, opts });
}

main();