# 快应用开发最佳实践

本文档汇总快应用开发中各模块的最佳实践，帮助开发者写出高质量、可维护的快应用代码。

---

## 一、项目结构与代码组织

### 1.1 推荐的项目目录结构

```
src/
├── assets/              # 公共资源（图片、样式、字体）
│   ├── images/
│   └── styles/
├── helper/              # 工具函数
├── components/          # 公共组件
├── pages/               # 页面代码
├── app.ux              # 应用入口
├── global.js           # 全局函数共享
└── manifest.json       # 应用配置
```

### 1.2 合理划分页面与组件

- 将可复用的 UI 片段抽取为自定义组件，放在 `components/` 目录
- 使用 `<import>` 标签引入组件：`<import name="my-comp" src="./components/myComp"></import>`
- 页面文件只处理页面级别的逻辑，组件负责独立的业务单元

---

## 二、ViewModel 数据管理

### 2.1 数据定义的作用域

| 属性 | 使用场景 |
|------|---------|
| `public` | 允许被应用外部数据覆盖。在需要从应用外部往应用内传递数据时使用 |
| `protected` | 允许被应用内页面之间跳转时传递数据覆盖。在需要应用内页面之间跳转时传递数据时使用 |
| `private` | 页面内部私有数据，不允许被覆盖 |
| `data` | 自定义组件所定义的数据 |

### 2.2 数据过滤原则

ViewModel 会对赋值的数据中每个属性进行**递归式数据驱动定义**，所以：
- 只定义页面真正需要的属性
- 从 API 获取数据后，用 `map` 过滤掉不需要的字段
- 避免将大型对象完整赋值到 ViewModel 数据中

```javascript
// 好：只保留需要的字段
this.list = apiData.map(item => ({
  id: item.id,
  name: item.name
}))
```

### 2.3 普通数据不要放在 ViewModel 中

不需要驱动视图变化的数据（如列表懒加载的缓存数据）应定义为**模块级变量**，而非 ViewModel 数据属性：

```javascript
// 正确：模块级变量
let memList = []

export default {
  private: {
    productList: []   // 只放渲染需要的数据
  }
}
```

---

## 三、全局工具注入

快应用中每个页面/组件都需要独立 `import` 依赖模块。利用 `app.ux` 的全局入口特性，将高频工具挂载到全局对象上，避免重复导入。

```javascript
// app.ux — 应用入口
import { $storage } from './helper/storage'
import { $utils } from './helper/utils'
import { $report } from './helper/report'

// 将高频工具挂载到全局，所有页面/组件中无需再 import
const hook2global = Object.getPrototypeOf(global) || global
hook2global.$storage = $storage
hook2global.$utils = $utils
hook2global.$report = $report
```

**使用方式**：任何页面或组件中直接调用：

```javascript
// pages/home/index.ux — 无需 import
export default {
  onShow() {
    const data = $storage.get('cache_key')  // 读取缓存
    $utils.debounce(this.onSearch, 300)()    // 防抖工具
    $report.send(EVENT_ID.HOME_SHOW)         // 上报埋点
  }
}
```

**最佳实践要点**:
- 选择跨页面/组件使用频率高的模块进行注入（工具函数、存储、埋点、常量）
- 使用 `Object.getPrototypeOf(global) || global` 兼容不同快应用引擎版本
- 不宜将所有模块都全局注入，仅在 `app.ux` 中引入真正全局通用的依赖

---

## 四、组件全局注册

在 `app.ux` 的模板中声明通用组件，所有页面自动可用，无需重复 import。

```html
<!-- app.ux 中声明，所有页面无需重复 import -->
<import name="title-bar" src="./components/title-bar/index.ux"></import>
<import name="loading" src="./components/loading/index.ux"></import>
<import name="error" src="./components/error/index.ux"></import>
```

**注意：**
- `app.ux` 中声明的组件不会被编译进页面产物Bundle内，但会编译进全局app.js Bundle中。全局app.js会在首屏加载，注意平衡全局组件数量，以免影响首屏加载性能
- 避免与页面内同名组件冲突

---

## 五、函数共享

### 5.1 通过 app.ux 共享

```javascript
// app.ux
import util from './util'

export default {
  showMenu: util.showMenu,
  data1: { name: '共享数据' }
}

// 页面中访问
this.$app.$def.showMenu()
this.$app.$def.data1.name
```

### 5.2 通过 global.js 共享

快应用支持在 `src` 目录下放置 `global.js`，其中的代码会在应用启动时自动执行，导出的内容可通过 `global` 对象在任意页面中访问。

```javascript
// src/global.js — 应用启动时自动执行
function getGlobalRef() {
  return Object.getPrototypeOf(global) || global
}
const quickappGlobal = getGlobalRef()

function setGlobalData(key, val) {
  quickappGlobal[key] = val
}
function getGlobalData(key) {
  return quickappGlobal[key]
}

export { setGlobalData, getGlobalData }
```

**使用方式**：在 `app.ux` 中引入 `global.js` 完成初始化，之后任意页面中直接通过全局对象访问：

```javascript
// app.ux
import './global'  // 引入 global.js，执行初始化

export default {
  onCreate() {
    setGlobalData('userInfo', { name: '张三' })
  }
}
```

```javascript
// 任意页面中 — 无需 import，直接使用
export default {
  onShow() {
    const userInfo = getGlobalData('userInfo')
    console.log(userInfo.name)  // '张三'
  }
}
```

**使用场景**：
- 需要在应用启动时执行的初始化逻辑
- 跨页面共享的非响应式数据（如设备信息、登录态 token）
- 与 `app.ux` 全局注入配合使用：`global.js` 负责数据定义，`app.ux` 负责将高频模块挂载到原型链上

**最佳实践要点**:
- `global.js` 中的代码在应用启动时自动执行，适合放置一次性的初始化逻辑
- 注意 `global.js` 中定义的数据不是响应式的，视图更新需要走 ViewModel 数据
- 对于需要驱动视图更新的全局数据，使用 `app.ux` 的 `$app.$def` 方式共享

---

## 六、统一网络请求封装

### 6.1 基础请求封装

收敛所有 `@system.fetch` 调用到一个请求层，统一注入公共参数，并提供可选的缓存兜底机制。

```javascript
// request.js — 统一网络请求层
import fetch from '@system.fetch'
import storage from '@system.storage'

export async function request(params, cacheId) {
  const { url, data, method = 'GET', header = {}, responseType = '' } = params

  try {
    const response = await fetch.fetch({ url, data, method, header, responseType })
    if (response.data.code !== 200) throw 'request fail'
    if (cacheId) storage.set({ key: cacheId, value: response.data.data })
    return JSON.parse(response.data.data)
  } catch (err) {
    // 失败了但有缓存，则返回缓存数据做降级
    if (cacheId) {
      const cached = await storage.get({ key: cacheId })
      if (cached.data) return JSON.parse(cached.data)
    }
    return { code: -1, msg: err }
  }
}
```

**最佳实践要点**:
- 所有请求必须走封装层，禁止直接调用 `@system.fetch`
- 请求层只处理网络 + JSON 序列化 + 缓存存取，不耦合业务逻辑

### 6.2 请求超时控制

`@system.fetch` 本身不提供超时参数，可通过 `Promise.race` 实现超时控制：

```javascript
// request.js — 带超时的请求封装
export async function requestWithTimeout(params, timeout = 5000) {
  const result = await Promise.race([
    request(params),
    new Promise(resolve => {
      setTimeout(() => resolve({ code: -1, msg: 'timeout' }), timeout)
    }),
  ])
  return result
}
```

**最佳实践要点**:
- 超时时间根据接口特点配置，普通接口 5s，大数据量接口可适当放宽
- 超时与正常请求走同一响应格式，调用方无需区分处理

### 6.3 环境自动切换

快应用编译工具支持环境变量切换，详见 `环境变量管理` 章节。通过环境变量切换，可区分不同的网络地址。

业务代码中根据不同环境使用不同配置：

```javascript
// helper/config.js — 环境配置
const config = {
  development: {
    baseUrl: 'https://test-api.example.com',
  },
  production: {
    baseUrl: 'https://api.example.com',
  },
  pre: {
    baseUrl: 'https://pre-api.example.com',
  },
}

const env = process.env.NODE_ENV || 'development'
export default config[env]
```
---

## 七、缓存优先的数据获取策略

快应用运行在手机本地，网络不稳定时应有降级策略。采用"缓存优先，网络兜底"模式，用户弱网时看到的是有数据的界面而非白屏。

```
流程:
  1. 尝试读取本地缓存 (@system.storage)
  2. 判断缓存是否过期（按接口配置不同有效期）
  3. 发起网络请求
  4. 请求成功 → 更新缓存 → 返回新数据
  5. 请求失败且有旧缓存 → 返回 FAIL_BUT_CACHE + 缓存数据
  6. 请求失败且无缓存 → 返回 FAIL
```

```javascript
// data.js — 缓存优先的数据获取
import storage from '@system.storage'

const NETWORK = {
  NORMAL: 200,
  FAIL_BUT_CACHE: -3,   // 请求失败但有旧缓存可用
  FAIL: -2,              // 完全失败
}

async function fetchWithCache({ apiUrl, params, cacheKey, maxAgeMs = 30 * 60 * 1000 }) {
  const cached = await storage.get({ key: cacheKey })
  if (cached.data) {
    const parsed = JSON.parse(cached.data)
    if (Date.now() - parsed.timestamp < maxAgeMs) {
      return { code: NETWORK.NORMAL, data: parsed.data }
    }
  }

  try {
    const res = await request({ url: apiUrl, data: params })
    storage.set({ key: cacheKey, value: JSON.stringify({ data: res, timestamp: Date.now() }) })
    return { code: NETWORK.NORMAL, data: res }
  } catch (e) {
    if (cached.data) {
      return { code: NETWORK.FAIL_BUT_CACHE, data: JSON.parse(cached.data).data }
    }
    return { code: NETWORK.FAIL }
  }
}
```

**最佳实践要点**:
- UI 层根据 `FAIL_BUT_CACHE` 展示"缓存数据 + 弱网提示"，而非直接白屏
- 不同数据按更新频率配置不同的缓存有效期，避免数据过于陈旧
- 写入缓存时携带时间戳，而非依赖文件修改时间

---

## 八、Storage 异步封装

`@system.storage` 的接口是回调风格的，直接使用会导致代码嵌套。封装为 Promise/async 风格的包装函数，配合全局注入让所有页面都能方便使用。

```javascript
// storage.js — 异步 storage 封装
import storage from '@system.storage'

export async function get(key, defaultValue = null) {
  try {
    const res = await new Promise((resolve, reject) => {
      storage.get({
        key,
        success: data => resolve(data),
        fail: reject,
      })
    })
    return res.data ? JSON.parse(res.data) : defaultValue
  } catch (e) {
    return defaultValue
  }
}

export function set(key, data) {
  storage.set({
    key,
    value: JSON.stringify(data),
  })
}
```

**使用示例：**

```javascript
// 存储
$storage.set('search_history', ['打车', '外卖'])

// 读取，第二个参数为默认值
const history = await $storage.get('search_history', [])
```

**最佳实践要点**:
- `get` 方法返回 Promise，配合 async/await 消除回调嵌套
- 所有 storage 操作自动 JSON 序列化/反序列化，业务代码直接读写 JS 对象
- `get` 方法提供 `defaultValue` 参数，避免调用方每次都要判空

---

## 九、接口调用规范

### 9.1 防止页面销毁后执行回调

异步接口的回调可能发生在页面已隐藏或已销毁之后，需要在回调中检查页面状态。以下两种方案任选一种：

**方案一：回调函数中通过 `this.$valid` 判断**

```javascript
fetch.fetch({
  success: function(data) {
    if (this.$valid && this.$visible) {
      // 页面仍在显示，正常更新 UI
    } else if (this.$valid && !this.$visible) {
      // 页面已隐藏，只缓存数据
    } else {
      // 页面已销毁，直接返回
    }
  }.bind(this)
})
```

**方案二：封装 bindPage 方法自动跳过**

```javascript
Function.prototype.bindPage = function(vmInst) {
  const fn = this
  return function() {
    if (vmInst && vmInst.$valid) {
      return fn.apply(vmInst, arguments)
    }
  }
}

// 使用
fetch.fetch({
  success: function(ret) {
    // 页面销毁后不会执行
  }.bindPage(this)
})
```

### 9.3 取消订阅

订阅接口的回调可能多次执行，页面销毁后应取消订阅：

```javascript
export default {
  onDestroy() {
    geolocation.unsubscribe()
  }
}
```

### 9.4 声明 features

使用任何系统接口前，必须在 `manifest.json` 的 `features` 数组中声明：

```json
{
  "features": [
    { "name": "system.fetch" },
    { "name": "system.geolocation" }
  ]
}
```

---

## 十、组件使用最佳实践

### 10.1 列表（list + list-item）

- **精简 DOM 层级**减少 DOM 树的级数和分支上的 DOM 节点数
- **始终使用 list 组件**实现长列表，不要用 div 循环
- **list-item 的 type 属性必须填写**，相同 DOM 结构的 list-item 用相同的 type
- **细粒度划分 list-item**：把复杂列表拆成尽可能小的 list-item 类型
- **关闭 scrollpage**（默认已关闭），将顶部非列表内容也作为 list-item 移入 list
- **使用懒加载模式**：数据缓存在内存变量中，每次滚动到底部时只渲染部分数据

### 10.2 条件渲染

- `if` 指令：条件为 false 时不渲染 DOM 节点（适合非首屏内容、懒加载场景）
- `show` 指令：条件为 false 时隐藏 DOM 节点（节点始终存在，适合高频切换）
- tabs 切换时：非当前页签使用 `if` 控制，切换时才渲染

### 10.3 图片优化

- 使用合适尺寸的图片资源
- 避免在列表中加载大图
- 图片资源放在 `assets/images/` 目录下统一管理

---

## 十一、组件通信

### 11.1 父子组件通信

父子组件通过 `props` + `on*` 事件（类 Vue 模式）：

```html
<!-- 子组件模板中 -->
<div onclick="handleClick">

<!-- 子组件 js 中 -->
handleClick() {
  this.$emit('add')  // 对父组件暴露 onadd 事件
}
```

```html
<!-- 父组件模板中 -->
<child-component onadd="handleAdd"></child-component>
```

### 11.2 跨级/兄弟组件通信

通过 `$broadcast` 和 `$on` 实现跨级通信：

```javascript
// 父页面广播
onShow() {
  this.$broadcast('tab-show')
}

onHide() {
  this.$broadcast('tab-hide')
}
```

```javascript
// 子组件中监听
onInit() {
  this.$on('tab-show', () => { this.refreshData() })
  this.$on('tab-hide', () => { this.stopPolling() })
}
```

---

## 十二、骨架屏（Skeleton Screen）

页面数据从接口异步加载时，展示骨架屏而非 loading 动画，让用户感知页面正在加载且大致了解页面结构。

```less
// common.less — 骨架屏动画
@keyframes skeleton-pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.skeleton-box {
  background: #f5f5f5;
  border-radius: 12px;
}

.skeleton-block {
  width: 100%;
  height: 32px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

```html
<!-- 页面中使用骨架屏 -->
<template>
  <div>
    <!-- 加载中：展示骨架占位 -->
    <div if="{{ !dataLoaded }}" class="skeleton-box">
      <div class="skeleton-block" style="width: 60%;"></div>
      <div class="skeleton-block" style="width: 80%; margin-top: 16px;"></div>
    </div>
    <!-- 加载完成：展示真实内容 -->
    <div if="{{ dataLoaded }}">
      <!-- 真实内容 -->
    </div>
  </div>
</template>
```

**最佳实践要点**:
- 骨架占位的尺寸应尽量接近真实内容，减少 layout 抖动
- 使用 `opacity` 动画而非 `transform`，避免在快应用中触发不必要的重排
- 骨架屏应与真实内容的结构对齐，用户从骨架过渡到内容时感知更平滑

---

## 十三、统一异常状态处理

网络断开、接口超时、搜索无结果是三种最常见的异常场景，分别设计对应的处理方式，覆盖所有失败场景。

| 场景 | 行为 |
|------|------|
| 整体页面网络异常（如无网络） | 断网提示 + "重新加载"按钮，点击触发页面刷新 |
| 页面内某区块请求失败 | 轻量提示条，不阻塞页面其余内容 |
| 搜索无结果 | 提示用户更换关键词 |

```html
<!-- 异常状态使用示例 -->
<template>
  <div>
    <!-- 整体页面异常 -->
    <exception-page if="{{pageError}}" @onrefresh="loadData"></exception-page>

    <!-- 正常内容区块 -->
    <div else>
      <net-error if="{{sectionError}}" @onrefresh="loadSection"></net-error>
      <no-data if="{{searchDone && list.length === 0}}"></no-data>
    </div>
  </div>
</template>
```

**最佳实践要点**:
- 每个异常组件都接受 `onRefresh` 回调，用户点击重试直接触发数据刷新
- 区分"整体异常"和"局部异常"：整体异常覆盖整个页面，局部异常只影响对应区块
- 避免在异常状态下展示空白页面，至少给出明确的用户引导

---

## 十四、搜索防抖

搜索场景中高频触发接口请求会浪费性能和流量。使用 debounce 用于通用防抖。

```javascript
// helper/utils.js — 通用 debounce
export function debounce(func, wait = 1000, immediate = true) {
  let timeout
  return function (...args) {
    if (immediate && !timeout) func.apply(this, args)
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (!immediate) func.apply(this, args)
      timeout = null
    }, wait)
  }
}
```

**最佳实践要点**:
- 自定义 debounce 使用 `immediate = true` 让首次触发无延迟，提升响应感

---

## 十五、埋点上报集中管理

埋点 ID 散落在业务代码中会导致维护困难、容易遗漏或重复。将所有埋点 ID 定义在一个文件中，上报时通过统一接口调用。

```javascript
// const.js — 所有埋点 ID 集中定义
export const EVENT_ID = {
  HOME_SHOW:       'Home_Show',
  HOME_CLICK:      'Home_Click',
  SEARCH_CLICK:    'Search_Click',
  DETAIL_SHOW:     'Detail_Show',
  DETAIL_INSTALL:  'Detail_Install',
  // 更换或废弃时只需修改此处
}
```

```javascript
// report.js — 统一上报封装
export function send(eventId, extraParams = {}) {
  if (!eventId) return
  const payload = {
    event_id: eventId,
    timestamp: Date.now(),
    ...extraParams,
  }
  // 调用 SDK 上报，此处以实际 SDK 为准
  // analytics.send(payload)
}
```

```javascript
// 任意页面中使用
$report.send(EVENT_ID.HOME_SHOW)
$report.send(EVENT_ID.DETAIL_INSTALL, { pkgName: 'com.example.app' })
```

**最佳实践要点**:
- 埋点 ID 统一管理，更换或废弃时只需修改一处
- 埋点调用不与业务逻辑耦合，不散落在条件分支中
- 上报 SDK 初始化在 `app.ux` 的 `onCreate` 中完成，全局只初始化一次

---

## 十六、[err, data] 异步模式

快应用中大量系统 API 使用回调风格，容易产生嵌套。可以统一包装为 Promise 并以 `[err, data]` 元组返回。

```javascript
// helper/utils.js
export function getDeviceInfo() {
  return new Promise((resolve) => {
    device.getInfo()
      .then((data) => resolve([null, data.data]))
      .catch(() => resolve([true, {}]))
  })
}
```

**调用方：**

```javascript
let [err, res] = await $utils.getDeviceInfo()
if (!err) {
  this.osVersionCode = res.osVersionCode
}
```

**要点：**
- 无论成功失败，Promise 永远 `resolve` 不 `reject`
- 调用方只需检查第一个元素是否为 `null`，无需 try-catch

---

## 十七、样式规范

### 19.1 原子化工具类

将 Flexbox 的常用排列方式抽为语义化 class，在模板中直接组合使用：

```less
// common.less
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.align-items-center { align-items: center; }
.display-none { display: none; }
.display-flex { display: flex; }
.mask {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
```

### 19.2 变量与 Mixin

```less
// variables.less
@brand: #456fff;
@white: #ffffff;
@grey: #9393aa;

// mixins.less
.flex-box-mixins (@column, @justify, @align) {
  flex-direction: @column;
  justify-content: @justify;
  align-items: @align;
}
```

### 19.3 规范要点

- **避免深度后代选择器**：减少层级深度，避免用 tag 标签名做最后一项
- **推荐使用 class 选择器**而非标签选择器
- **使用 less 预编译**提升样式可维护性
- 页面私有样式放在页面级 `<style>` 中，公共样式放在 `assets/styles/` 目录

---

## 十八、Display / 折叠屏适配

快应用运行在多种屏幕尺寸的设备上（手机、平板、折叠屏），但框架本身不提供响应式断点。通过读取系统显示级别在全局层面做适配。

```javascript
// app.ux onCreate — 一次性读取系统配置，全局共享
import device from '@system.device'

export default {
  async onCreate() {
    const info = await device.getInfo()
    // 注入到 $app.$def，所有组件可通过 this.$app.$def 访问
    this.$app.$def.showLevel = info.data.showLevel         // 显示大小级别（1-4）
    this.$app.$def.fontLevel = info.data.fontLevel         // 字体大小级别
    this.$app.$def.isFoldable = info.data.deviceType === 'FOLDABLE'
  }
}
```

```javascript
// 组件中根据全局配置动态计算样式
export default {
  computed: {
    itemWidth() {
      const level = this.$app.$def.showLevel
      return (level >= 2) ? '168px' : '144px'
    }
  }
}
```

```javascript
// 折叠屏展开/折叠时刷新布局
export default {
  onConfigurationChanged() {
    this.$broadcast('refresh-ui')  // 通知所有子组件刷新 UI
  }
}
```

**子组件中监听 `refresh-ui` 事件，响应刷新：**

```javascript
export default {
  onInit() {
    this.$on('refresh-ui', () => {
      this.recalcLayout()  // 重新计算布局
    })
  },

  recalcLayout() {
    // 根据最新的设备状态刷新 UI
  }
}
```

- 折叠屏展开/收起时通过 `$broadcast` 通知所有子组件刷新 UI

---

## 十九、桌面快捷方式管理

快应用常见的需求是从桌面快捷方式再次打开。可通过 `@system.shortcut` 和厂商系统接口统一封装快捷方式的创建和检测。

```javascript
// helper/utils.js
import shortcut from '@system.shortcut'
import prompt from '@system.prompt'

// 创建桌面快捷方式（带判重）
export async function createAppShortcut(packageName) {
  try {
    const hasInstalled = await shortcut.hasInstalled({ packageName })
    if (hasInstalled) {
      prompt.showToast({ message: '桌面图标已存在' })
      return false
    }
    await shortcut.install({ packageName })
    return true
  } catch (e) {
    prompt.showToast({ message: '添加快捷方式失败' })
    return false
  }
}
```

**最佳实践要点**:
- 在 `app.ux` 的 `onCreate` 中全局关闭系统默认弹窗（`shortcut.systemPromptEnabled = false`），由应用自己控制提示时机
- 创建前调用 `hasInstalled` 判重，避免重复图标

---

## 二十、工程化配置

### 26.1 Webpack 别名

使用别名避免深层次的相对路径：

```js
// quickapp.config.js
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '/common': path.resolve(__dirname, 'src/common'),
    '/components': path.resolve(__dirname, 'src/components'),
  },
}
```

### 26.2 环境变量管理

快应用编译工具内置了 `process.env.NODE_ENV` 环境变量，无需额外配置。不同打包方式对应的值如下：

| 打包方式 | process.env.NODE_ENV 值 |
|---------|------------------------|
| `hap release`（命令行正式包） | `production` |
| `hap build`（命令行测试包） | `development` |
| IDE 正式包 | `production` |
| IDE 测试包 | `development` |
| IDE 预发包 | `pre` |

业务代码中根据不同环境使用不同配置：

```javascript
// helper/config.js — 环境配置
const config = {
  development: {
    baseUrl: 'https://test-api.example.com',
  },
  production: {
    baseUrl: 'https://api.example.com',
  },
  pre: {
    baseUrl: 'https://pre-api.example.com',
  },
}

const env = process.env.NODE_ENV || 'development'
export default config[env]
```

如果需要在 `process.env.NODE_ENV` 之外自定义环境变量，可在 `quickapp.config.js` 中通过 `webpack.DefinePlugin` 注入：

```js
// quickapp.config.js（在项目根目录下）
const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),  // 通过 cross-env 注入
      }
    }),
  ],
}
```

**最佳实践要点**:
- `process.env.NODE_ENV` 是编译工具内置变量，IDE 打包和命令行打包时自动赋值，无需手动注入
- 自定义环境变量才需要 `webpack.DefinePlugin` 配合 `cross-env` 在构建脚本中注入
- 将环境配置集中管理（如 `helper/config.js`），不要在业务代码中四处判断环境变量

---

## 二十一、无障碍适配

为交互元素提供 `aria-label`，支持 TalkBack 等屏幕阅读器：

```html
<div id="back" onclick="goBack" aria-label="返回 按钮 点按两次即可激活"></div>
```

```javascript
// 弹窗时告知屏幕阅读器
this.$element('wrap').announceForTalkBack({ content: '弹出式窗口' })
```

---

## 总结

| 实践 | 收益 |
|------|------|
| 全局挂载公共模块 | 所有页面零 import 使用公共模块 |
| 统一请求层 + 缓存降级 | 弱网自动读取缓存，无需每个接口独立处理 |
| 全局组件注册 | 一次声明全局可用，减少重复代码 |
| 缓存优先策略 | 弱网环境展示缓存数据避免白屏 |
| 骨架屏 | 提升加载感知性能 |
| 统一异常处理 | 覆盖所有失败场景，提供明确引导 |
| `[err, data]` 异步模式 | 统一的错误处理范式，避免 try-catch 滥用 |
| 埋点集中管理 | 维护集中，调用统一 |
| `$broadcast` / `$on` / `$emit` 通信 | 页面级解耦，适应复杂嵌套组件 |
| 折叠屏/横竖屏适配 | 覆盖折叠屏、平板等特殊形态 |
| 自定义 Tab 保持状态 | 避免原生 Tab 切换时状态丢失 |
| CSS 工具类 + Less 变量 | 样式复用，主题一致性 |
| 数据过滤原则 + 模块级变量 | 减少 ViewModel 性能开销 |
| 能力检测灰度控制 | 支持和不支持的设备走同一份代码 |