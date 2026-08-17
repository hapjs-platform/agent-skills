# 快应用性能优化指南

本文档汇总快应用性能优化的各个方面，从渲染性能、包体积优化到网络优化，帮助开发者打造流畅、轻量的快应用。

---

## 一、渲染性能优化

### 1.1 使用 list 组件替代 div 循环

**原则**：DOM 结构复杂的列表必须使用 `<list>` + `<list-item>`，Native 会复用相同 `type` 的 list-item，滚动性能远优于 div 循环。

**关键点**：
- `type` 属性为必填，相同 DOM 结构用相同 type
- 不要在 list-item 内使用 `if` / `for` 指令
- 细粒度划分 list-item：不要按业务逻辑划分，而应按 DOM 结构划分

### 1.2 精简 DOM 层级

减少 DOM 树的级数和分支上的节点数。层级越少、数量越少，布局和绘制越快。

```html
<!-- 精简前：多余的包裹层 -->
<list-item type="product">
  <div>
    <div>
      <text>{{name}}</text>
    </div>
  </div>
</list-item>

<!-- 精简后 -->
<list-item type="product">
  <text>{{name}}</text>
</list-item>
```

### 1.3 关闭 scrollpage

`scrollpage` 属性默认关闭。不要轻易开启：
- 开启会降低 list 渲染性能
- 推荐将顶部非列表元素作为单独的 list-item 移入 list 中，从而避免开启 scrollpage

### 1.4 list-item 懒加载

提前 fetch 数据缓存到内存变量 `memList` 中，每次滚动到底部时从 `memList` 中提取部分数据渲染：

```javascript
let memList = []

export default {
  private: {
    productList: [],
    size: 10
  },
  _renderList() {
    if (memList.length > 0) {
      const list = memList.splice(0, this.size)
      this.productList = this.productList.concat(list)
    }
    if (memList.length <= this.size) {
      this.loadAndRender(false)  // 提前请求数据
    }
  }
}
```

**注意**：`memList` 不要定义在 ViewModel 数据属性中，避免触发无意义的数据驱动定义。

### 1.5 合理使用后代选择器

CSS 后代选择器对渲染性能有影响：
- 避免用 tag 标签名作为最后一项：`.doc-page #shop text { ... }`
- 减少层级深度：`.a .b .c .d .e .f { ... }`
- 最后一项尽量使用唯一类名：`.shop-name-full { ... }`

### 1.6 懒加载策略

| 场景 | 策略 |
|------|------|
| 列表 | 使用 list-item 懒加载，滚动到底部再渲染 |
| tabs | 非当前页签使用 `if` 控制，切换时才渲染 |
| 图片 | 避免在列表中加载大图；考虑按需加载 |

---

## 二、ViewModel 数据优化

### 2.1 简化 ViewModel 数据

ViewModel 会对赋值数据中的每个属性进行递归式数据驱动定义。属性越少，开销越小。

```javascript
// 从 API 获取完整数据后，只保留页面需要的字段
this.list = orderList.map(item => ({
  userId: item.userId,
  orderName: item.orderName
  // 过滤掉 userName, shoppingList 等不需要的属性
}))
```

### 2.2 避免 $element 赋值到 ViewModel

将 `$element('id')` 获取的 DOM 节点赋值到 ViewModel 属性会引发堆栈溢出。使用局部变量或模块级变量代替：

```javascript
let gNode = null
export default {
  onReady() {
    const node = this.$element('content')  // 局部变量
    gNode = this.$element('content')       // 模块级变量
  }
}
```

---

## 三、包体积优化

### 3.1 分包加载

当快应用体积较大时（普通包超过 2M），使用分包加载功能。

**核心限制**：
- 普通 rpk 包：不超过 2M
- 所有分包总大小：不超过 20M
- 单个分包/基础包：不超过 2M

**配置方法**：
```json
{
  "subpackages": [
    { "name": "pkgA", "resource": "PackageA" },
    { "name": "pkgB", "resource": "PackageB" }
  ]
}
```

**配置建议**：
- 首页保留在基础包中
- 业务关联的页面放在同一分包
- 基础包只放公共资源，分包放独有资源

### 3.2 JS 独立打包

自 `1080` 版本起，可通过配置的方式，将重复引用的 JS 资源抽取到独立文件，消除重复代码。

#### 方案1：使用 IDE 内置编译工具

使用 IDE 内置的编译工具打包，无需手动运行命令。需要在项目根目录下配置 `quickapp.config.js` 文件，配置内容如下：

```javascript
// quickapp.config.js
module.exports = {
  cli: {
    splitChunksMode: 'SMART'
  }
}
```
#### 方案2：使用 hap 命令行工具

编译时加 `--split-chunks-mode=smart` 参数，即可开启 JS 独立打包功能。
```bash
hap build --split-chunks-mode=smart
```

**适用场景**：
- 多个页面引用同一 JS 资源
- node_modules 中被多次引用的外部库
- 子组件被多次使用

### 3.3 动态导入

使用 `import()` 函数异步加载非首屏必需的 JS 文件，减少首次渲染时间。

```javascript
// 页面中使用
dynamicImportJs() {
  import('./dynamic-js').then(res => {
    this.count = res.calculate(this.count)
  })
}
```

需要配合 JS 独立打包（`--split-chunks-mode=smart`）使用。

### 3.4 整合公共 JS 到 app.ux

在 `app.ux` 中引入公共 JS 库并暴露给所有页面，避免每个页面重复打包。

```javascript
// app.ux
import util from './util'
export default {
  showMenu: util.showMenu
}

// 页面中通过 this.$app.$def.showMenu() 访问
```

### 3.5 函数共享方式对比

| 方式 | 适用场景 | 优点 |
|------|---------|------|
| `this.$app.$def` | app.ux 中定义的数据/方法 | 框架原生支持，简单直接 |
| global.js | 需要跨页面共享全局状态 | 不触发数据驱动，适合缓存数据 |
| import() 动态导入 | 非首屏必需的 JS 模块 | 减少首次加载体积 |

---

## 四、接口调用优化

### 4.1 减少不必要的接口调用

- 在回调函数中先通过 `$valid` / `$visible` 判断页面状态
- 页面隐藏时只缓存数据，不更新 UI
- 页面销毁时直接跳过回调逻辑

### 4.2 及时取消订阅

订阅接口（如 `geolocation.subscribe`）的回调会多次执行：
- 在 `onDestroy` 中取消订阅
- 或在回调中判断 `$valid` 后取消

---

## 五、性能排查工具

### 5.1 性能面板

使用 IDE 提供的性能分析面板（analyzer panel）监控页面渲染性能。

文档路径：`guide/tutorial/framework/analyzer-panel.md`

### 5.2 依赖分析

使用 IDE 的 hap-analyzer 工具分析包依赖，发现冗余代码。

文档路径：`guide/ide/hap-analyzer.md`

### 5.3 静态检测

使用 IDE 的静态检测工具在开发阶段发现性能隐患。

文档路径：`guide/ide/static-detection.md`

---

## 优化优先级建议

| 优先级 | 优化项 | 效果 |
|--------|--------|------|
| P0 | 使用 list 组件替代 div 循环 | 解决列表卡顿 |
| P0 | 避免 $element 赋值到 ViewModel | 防止崩溃 |
| P0 | 分包加载（包超 2M 时） | 解决打包失败 |
| P1 | 简化 ViewModel 数据 | 提升渲染性能 |
| P1 | 懒加载 | 减少首屏渲染时间 |
| P1 | JS 独立打包 + 动态导入 | 减少包体积 |
| P2 | 精简 DOM 层级 | 提升滚动流畅度 |
| P2 | 优化后代选择器 | 提升样式匹配性能 |
| P2 | 整合公共 JS | 减少重复代码 |