# 快应用常见问题与避坑指南

本文档汇总快应用开发中常见问题的表现、原因及解决方案。当用户咨询或开发过程中遇到诡异错误或行为异常时，优先查阅本文档。

---

## 一、语法兼容性

### 1.1 使用了快应用不支持的语法

**现象**：开发时使用 Vue 语法、浏览器 HTML 语法或 Node.js 语法，编译报错或运行时异常。

**场景举例**：

可以参考本文下面的章节：## 常见 Vue 语法与快应用语法对比

**原因**：快应用的模板基于类 Vue 语法但不完全相同，且运行时环境是厂商 ROM 的 JS 引擎（非浏览器、非 Node.js），语法支持有限。

### 1.2 引用的 npm 库不兼容

**现象**：在快应用中引用 npm 库后编译报错，或运行时白屏。

**原因**：npm 上大部分库是为浏览器或 Node.js 编写的，可能依赖 `document`、`window`、`process`、`Buffer` 等快应用不支持的对象，或使用了 ES6+ 语法（快应用 JS 引擎仅支持 ES5）。

**识别兼容 npm 库的方法**：
- 优先选择无 DOM 依赖的纯逻辑库（如日期处理、数据校验）
- 避免依赖浏览器 API（`document`、`window`、`navigator`）的库
- 避免依赖 Node.js 核心模块（`fs`、`path`、`crypto`）的库
- 检查库的 `package.json` 中 `browser` 字段或查看其源码确认依赖

### 开发建议

1. **查阅文档**：开发前仔细阅读快应用开发文档，了解模板语法、组件 API、系统接口的完整支持情况
2. **真机调试**：始终在真机上运行测试，模拟器可能存在差异
3. **npm 库谨慎选择**：引入 npm 库前确认其语法和依赖能在快应用平台上运行，优先选择纯 JS / 无 DOM 依赖的库

---

## 二、IDE 模拟器与真机差异

**现象**：在 Quickapp Studio IDE 模拟器中预览正常，但在真机上运行白屏、功能异常或渲染效果不一致。

**原因**：IDE 模拟器是开发工具提供的近似运行环境，其渲染引擎、JS 引擎、系统 API 的实现与真机存在差异，特别是以下场景差异明显：

| 场景 | 差异说明 |
|------|---------|
| 特殊组件 | 一些复杂组件在模拟器和真机上的渲染效果、能力支持不一致 |
| 厂商特有接口 | 各厂商（华为、小米、OPPO、vivo）的定制接口在模拟器中可能无真实实现 |
| 手机系统能力 | 调用系统级能力（如 NFC、蓝牙、传感器、震动、人脸识别）时，模拟器无法提供真实硬件反馈 |
| API 返回数据 | 部分 API（如 `device`、`network`、`battery`）在模拟器中返回的数据结构与真机有差异 |
| 性能表现 | 模拟器不能反映真实设备的性能表现（渲染帧率、内存占用、包体积影响等） |

**解决方案**：
- 以真机运行效果为最终标准，模拟器仅用于快速调试 UI 布局
- 涉及特殊组件、厂商接口、系统能力时，直接在真机上调试
- 在目标厂商的实机设备上充分测试后再发布

---

## 三、生命周期相关问题

### 3.1 异步回调中操作已销毁页面

**现象**：页面返回后，之前的异步回调执行时报错

**原因**：异步接口（fetch、geolocation 等）的回调函数返回时，调用该接口的页面可能已经出栈销毁，ViewModel 数据属性已被删除

**解决方案**：
- 在回调中通过 `$valid` 判断页面状态
- 或使用 `bindPage` 方法绑定页面实例（详见 `best-practices/index.md`）

### 3.2 订阅接口未取消导致内存泄漏

**现象**：页面切换后，旧页面的回调仍在执行，则可能导致内存泄漏

**原因**：订阅接口（如 `geolocation.subscribe`）在页面销毁后未取消订阅

**解决方案**：
```javascript
export default {
  onDestroy() {
    geolocation.unsubscribe()
  }
}
```

---

## 四、列表（list）相关问题

### 4.1 列表崩溃

**常见原因及解决方案**：

| 原因 | 解决方案 |
|------|---------|
| list-item 未设置 `type` 属性 | 为每个 list-item 添加 `type` 属性 |
| list-item 内部使用了 `if` 指令 | 使用 `show` 指令代替 `if`，或设置不同的 `type` |
| 相同 `type` 的 list-item DOM 结构不一致 | 设置不同的 `type` 或在内部使用 `show` 保持 DOM 一致 |

### 4.2 列表滚动卡顿

**现象**：使用 div 循环实现的长列表滑动不流畅

**原因**：Native 无法复用 div 组件实现的列表元素

**解决方案**：使用 `<list>` + `<list-item>` 组件替代 div 循环

**最佳实践**：
- 设置 list-item 的 type 属性（必填）
- 精简 DOM 层级
- 细粒度划分 list-item
- 关闭 scrollpage（默认已关闭）
- 使用懒加载

---

## 五、onInit 中调用 $element 获取元素

**现象**：在 `onInit` 中通过 `this.$element('xx')` 获取元素后调用其方法（如 `focus()`），报错或元素为 `undefined`

**原因**：`onInit` 阶段 DOM 尚未渲染完成，此时调用 `$element()` 返回 `undefined`

**解决方案**：将 DOM 操作放在 `onReady` 及其之后的生命周期中

```javascript
// 错误：onInit 中 DOM 尚未渲染
export default {
  onInit() {
    const input = this.$element('searchInput')  // undefined
    input.focus()                                // 报错
  }
}

// 正确：DOM 在 onReady 阶段渲染完成
export default {
  onReady() {
    const input = this.$element('searchInput')
    input.focus()
  }
}
```

**最佳实践**：
- `$element()` 只能在 `onReady` 及之后的生命周期中使用
- 如果在 `onReady` 时元素仍不存在（条件渲染），在元素出现后使用 `$nextTick()` 获取

---

## 六、堆栈溢出

### 6.1 $element('id') 赋值到 ViewModel 属性

**现象**：`RangeError: Maximum call stack size exceeded`

**原因**：将 `$element('id')` 获取到的 DOM 节点赋值给 ViewModel 的数据属性（`private`/`protected`/`public`），会触发大规模数据驱动变化，导致内部异常循环

**解决方案**：赋值给**局部变量**或**页面级全局变量**，不要赋值到 ViewModel 属性

```javascript
// 错误
export default {
  private: { node: null },
  onReady() {
    this.node = this.$element('content')  // 触发堆栈溢出
  }
}

// 正确
let gContentNode = null
export default {
  onReady() {
    gContentNode = this.$element('content')
    const cContentNode = this.$element('content')
  }
}
```

---

## 七、数据绑定与渲染问题

### 7.1 访问 undefined 上的属性

**现象**：`Cannot read property 'c' of undefined`

**场景**：`<text>{{ a.b.c }}</text>` 其中 a = {}

**解决方案**：
```xml
<!-- 方案1：&& 运算 -->
<text>{{ a && a.b && a.b.c }}</text>

<!-- 方案2：定义 checkEmpty 函数 -->
<text>{{checkEmpty(a, 'b', 'c')}}</text>
```

### 7.2 JSON.parse() 解析失败

**现象**：JSON.parse 解析 HTML 页面出错

**解决方案**：在 app.ux 中代理 JSON.parse

```javascript
export function parseProxy() {
  const rawParse = JSON.parse
  JSON.parse = function(str, defaults) {
    try {
      return rawParse(str)
    } catch (err) {
      console.error(`JSON解析失败：${str}, ${err.stack}`)
      return defaults
    }
  }
}
```

---

## 八、配置与打包问题

### 8.1 使用接口时未声明 features

**现象**：调用系统接口（如 `fetch`、`storage`）时无响应或报错

**原因**：manifest.json 中未声明对应接口的 features

**解决方案**：
```json
{
  "features": [
    { "name": "system.fetch" },
    { "name": "system.storage" }
  ]
}
```

### 8.2 rpk 包超过 2M 无法上传

**现象**：打包失败或上传提示包体积超限

**原因**：普通 rpk 包大小限制为 2M

**解决方案**：
- 使用**分包加载**（subpackage）将业务模块拆分到独立分包
- 启用 **JS 独立打包**（`--split-chunks-mode=smart`）消除重复代码
- 使用**动态导入** `import()` 异步加载非首屏必需的 JS
- 整合公共 JS 库到 app.ux 中

详见 `standard/public/framework/subpackage.md` 和 `standard/public/framework/js-split.md`。

---

## 九、兼容性问题

| 问题 | 说明 |
|------|------|
| vivo 不支持 `onBackPress` | 在 vivo 设备上该生命周期不会被触发 |
| OPPO 不支持 `onMenuPress` | 在 OPPO 设备上该生命周期不会被触发 |
| 厂商差异 | 不同厂商对某些 API 的实现可能存在差异，建议在目标厂商设备上充分测试 |
| 低版本兼容 | 使用 `10xx+` 标注的 API 时需设置对应的 `minPlatformVersion`。建议设置为 `1070` 以上以获得良好的厂商兼容性 |

---

## 十、常见编码误区

### 10.1 内置组件无需 import

**现象**：在 .ux 文件中写 `<import name="switch" src="switch">` 或类似代码导入内置组件。

**原因**：`switch`、`slider`、`picker`、`list`、`list-item`、`input`、`textarea`、`video`、`canvas` 等是快应用内置组件，无需 `<import>` 导入。只有自定义组件（自己写的 .ux 组件）才需要使用 `<import>` 标签声明。

**解决方案**：直接在内置组件标签，移除多余的 `<import>` 代码。

```xml
<!-- 错误：内置组件不需要 import -->
<import name="switch" src="switch"></import>
<switch checked="true"></switch>

<!-- 正确：直接使用 -->
<switch checked="true"></switch>
```

### 10.2 Picker onchange 事件参数

**现象**：使用 `<picker>` 时，`onchange` 回调中不清楚 `detail` 返回的是索引还是文本值。

**不同 type 的返回值格式**：

| type | detail 返回值 | 说明 |
|------|-------------|------|
| `text` | `evt.detail.newValue` 为选中项的**文本** | `range` 数组中对应的文本值 |
| `date` | `evt.detail.newValue` 为日期字符串 | 格式 `YYYY-MM-DD` |
| `time` | `evt.detail.newValue` 为时间字符串 | 格式 `HH:mm` |
| `multitext` | `evt.detail.newValue` 为多列选中值数组 | 每列选中项的文本 |

示例：
```javascript
export default {
  onPickerChange(evt) {
    // text 类型：newValue 是文本值（不是索引）
    const selectedText = evt.detail.newValue
    // 如需索引，从 range 数组中查找
    const selectedIndex = this.acModes.indexOf(selectedText)
    console.info('选中:', selectedText, '索引:', selectedIndex)
  }
}
```

### 10.3 自定义组件必须使用 <import> 标签导入，不能用 ES Module import

**现象**：在 .ux 文件中通过 `<script>` 标签内的 `import MyComponent from './components/MyComponent.ux'` 语法导入自定义组件，编译报错或组件不渲染。

**原因**：快应用的 .ux 文件不是标准的 ES Module，模板引擎通过解析 `<import>` 标签来注册组件，不会识别 `<script>` 中的 ES `import` 语法。

**解决方案**：使用模板级 `<import>` 标签声明组件，并定义 `name` 属性作为模板中的标签名：

```xml
<template>
  <div>
    <!-- 使用 import 中 name 定义的标签名 -->
    <my-component prop1="{{value}}"></my-component>
  </div>
</template>

<!-- 正确：使用 <import> 标签导入自定义组件 -->
<import name="my-component" src="./components/MyComponent.ux"></import>

<script>
  // 错误：以下写法在快应用中无效
  // import MyComponent from './components/MyComponent.ux'
  
  export default {}
</script>
```

### 10.4 在 app.ux 中获取数据和方法需使用 this.$def

**现象**：在页面中通过 `this.xxx` 访问 app.ux 中定义的数据或方法，结果为 `undefined`。

**原因**：app.ux 中定义的数据和方法挂在应用实例上，页面中需要通过 `this.$app.$def` 访问。

**解决方案**：
```javascript
// app.ux 中定义
export default {
  globalData: { version: '1.0.0' },
  globalMethod() { return 'hello' }
}

// 页面中访问
export default {
  onInit() {
    // 正确
    const version = this.$app.$def.globalData.version
    const msg = this.$app.$def.globalMethod()
    
    // 错误：this.version 是 undefined
  }
}
```

---

## 常见 Vue 语法与快应用语法对比

| 类别 | Vue 语法 | 快应用写法 | 区别说明 |
|------|----------|-----------|---------|
| **模板语法** | `{{ expression }}` | `{{ expression }}` | 用法相同，数据绑定语法一致 |
| **指令：条件渲染** | `v-if="condition"` | `if="{{condition}}"` | 写法差异：快应用需用双花括号包裹条件表达式 |
| | `v-else` | `else` | 用法相同 |
| | `v-show="condition"` | `show="{{condition}}"` | 写法差异：快应用需用双花括号包裹 |
| **指令：列表渲染** | `v-for="item in list"` | `for="{{item in list}}"` | 快应用使用 `for="{{list}}"`，循环变量在作用域内默认以 `$item` 引用，索引通过 `$idx` 获取，也支持解构赋值 |
| **指令：事件绑定** | `@click="handler"` / `v-on:click="handler"` | `@click="handler"` / `onclick="handler"` | 写法差异：快应用使用 `on`，不支持 `v-on` |
| **指令：属性绑定** | `:src="value"` / `v-bind:src="value"` | `src="{{value}}"` | 写法差异：快应用使用插值语法而非 `:` 简写 |
| **指令：双向绑定** | `v-model="value"` | `model:value="{{value}}"` | 用法相同，快应用使用model:value指令 |
| **指令：样式绑定** | `:class="{ active: isActive }"` / `:style="{ color: 'red' }"` | class：`class="static {{isActive ? 'active' : ''}}"`；style：`style="{{ { color: 'red', fontSize: '14px' } }}"` | class 不支持对象语法，需用字符串拼接；style 支持对象语法，属性名使用驼峰 |
| **指令：v-html** | `v-html="html"` | richtext组件 | 快应用支持富文本richtext组件渲染html内容 |
| **指令：v-once** | `v-once` | 不支持 | 无直接替代，需自行控制数据更新时机 |
| **指令：v-pre** | `v-pre` | 不支持 | 无直接替代 |
| **指令：v-cloak** | `v-cloak` | 不支持 | 无替代必要，快应用模板解析在渲染前完成 |
| **计算属性** | `computed: { ... }` | `computed: { ... }` | 用法相同 |
| **侦听器** | `watch: { ... }` | 不支持watch对象，但支持$watch方法 | 快应用使用$watch方法监听数据变化，而非watch对象 |
| **组件注册** | `import Comp from './Comp.vue'` + `components: { Comp }` | `<import name="comp" src="./comp.ux">` | 快应用使用模板级 `<import>` 标签声明，而非 JS 导入 |
| **组件：props** | `props: ['name']` / `props: { name: { default: 'tom' }}` / `props: { prop1: Number, prop2Object: { type: String, required: true, validator: function(value) { xxx }} }`  | 用法相同，支持默认值、必填项、校验函数等 |
| **组件：emit** | `this.$emit('event', payload)` | `this.$emit('event', payload)` | 用法相同；父组件通过 `onevent="handler"` 监听 |
| **组件：插槽** | `<slot>` |  `<slot>` | 用法相同，快应用使用 `<slot>` 标签，支持具名插槽 |
| **组件通信** | `provide/inject` | 不支持，使用 `$app.$def` 全局共享或 `$broadcast` / `$on` 事件通信 | 快应用通过全局对象或事件广播实现跨级通信 |
| **生命周期：初始化** | `created()` | `onInit()` | 命名不同，触发时机类似（实例创建后触发） |
| **生命周期：挂载** | `mounted()` | `onReady()` | 命名不同，触发时机类似（DOM 渲染完成后触发） |
| **生命周期：销毁** | `beforeDestroy()` | `onDestroy()` | 命名不同，触发时机类似（页面/组件销毁前触发） |
| **生命周期：激活** | `activated()` / `deactivated()` | 无对应，使用 `onShow` / `onHide` 处理页面可见性 | Vue 的 keep-alive 特有，快应用无此概念 |
| **生命周期：更新** | `beforeUpdate()` / `updated()` | 不支持 | 无直接替代，数据变化通过 ViewModel 自动驱动视图更新 |
| **路由跳转** | `this.$router.push('/path')` | `router.push({ uri: '/path' })` | 快应用使用对象参数传 `uri`，且需从 `@system.router` 导入 |
| **路由传参** | `this.$route.query` | 外部传参通过data或public/protected进行接收 | 快应用在 `public` / `protected` / `data` 中定义 |
| **状态管理** | Vuex / Pinia | 不支持，通过 `$app.$def` 全局对象共享状态 | 快应用无官方状态管理库，用全局对象或封装 helper 替代 |
| **过滤器** | `{{ value \| filter }}` | 不支持，在 JS 中先处理数据再渲染，或使用 `computed` | 快应用模板不支持管道符，数据预处理在 JS 层完成 |
| **动画/过渡** | `<transition>` | 不支持，使用 CSS animation / `@keyframes` 实现 | Vue 提供组件级过渡，快应用需手写 CSS 动画 |
| **ref / $refs** | `this.$refs.xxx` | `this.$element('xxx')` | 快应用通过元素 id（`<div id="xxx">`）获取 DOM 节点，而非 ref 名称 |
| **模板片段** | `<template>` 作为多根容器 | `<template>` 只能包含一个根元素 | 快应用模板中 `<template>` 标签无特殊含义，需用真实 DOM 元素作为容器 |
| **自定义指令** | `Vue.directive()` | `dir:focus + directives: {focus: {mounted(el) {el.focus()}}}` | 快应用使用dir作为自定义指令的前缀，在directives中定义自定义指令 |
| **渲染函数** | `render()` / JSX | 不支持 | 快应用只支持 `.ux` 模板语法 |
