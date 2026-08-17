# script 脚本

用来定义页面数据和实现生命周期接口

## 语法

支持 ES6 语法

### 模块声明

可以通过 import 引入功能模块，在代码中调用模块方法（具体参看接口部分文档说明）

```javascript
import fetch from '@system.fetch'
```

### 代码引用

JS 代码引用推荐使用 import 来导入, 例如：

```javascript
import utils from '../Common/utils.js'
```

**注意**： 快应用环境不是 node 环境，不要引用 node 原生模块，如 `import fs from 'fs'`

## 对象

### 页面级组件

| 属性              | 类型                   | 描述                                                                                                                                                                                                                                                                                                                                                |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data `deprecated` | Object &#124; Function | 页面级组件的数据模型，能够转换为 JSON 对象；属性名不能以$或\_开头, 不要使用 for, if, show, tid 等保留字<br/>如果是函数，返回结果必须是对象，在组件初始化时会执行函数获取结果作为 data 的值<br/>使用 data 方式声明的属性会被外部数据覆盖，因此存在一定安全风险，推荐使用下面的 public,protected,private 来声明属性（注意：它们不能与 data 同时声明） |
| public `1000+`    | Object                 | 页面级组件的数据模型，影响传入数据的覆盖机制：public 内定义的属性允许被传入的数据覆盖，如果外部传入数据的某个属性未被声明，在 public 中不会新增这个属性                                                                                                                                                                                             |
| protected `1000+` | Object                 | 页面级组件的数据模型，影响传入数据的覆盖机制：protected 内定义的属性，允许被应用内部页面请求传递的数据覆盖，不允许被应用外部请求传递的数据覆盖                                                                                                                                                                                                      |
| private `1000+`   | Object                 | 页面级组件的数据模型，影响传入数据的覆盖机制：private 内定义的属性不允许被覆盖                                                                                                                                                                                                                                                                      |
| computed `1050+`  | Object                 | 计算属性，属性名不能以$或\_开头, 不要使用 for, if, show, tid 等保留字                                                                                                                                                                                                                                                                               |

### 自定义组件

| 属性             | 类型                   | 描述                                                                                                                                                                                                                                                |
| ---------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data             | Object &#124; Function | 自定义组件的数据模型，能够转换为 JSON 对象；属性名不能以$或\_开头, 不要使用 for, if, show, tid 等保留字<br/>如果是函数，返回结果必须是对象，在组件初始化时会执行函数获取结果作为 data 的值                                                          |
| props            | Array &#124; Object    | 定义组件外部可传入的所有属性；属性名不能以$或\_开头, 不要使用 for, if, show, tid 等保留字<br/>在模板代码中，请使用短横线分隔命名代替驼峰命名。如，属性定义 props: ['propA']，可通过`<tag prop-a='xx'>`方式传递到组件内部<br/>支持 prop 验证 `1010+` |
| computed `1050+` | Object                 | 计算属性，属性名不能以$或\_开头, 不要使用 for, if, show, tid 等保留字                                                                                                                                                                               |
| externalClasses `1100+` | Array                 | 外部样式属性，定义外部传入的样式名 |
| provide          | Object &#124; Function | 向所有子孙组件注入数据，详见 [provide & inject](provide-inject.md)（联盟 `1400+` / OPPO `1143+`） |
| inject           | Array &#124; Object    | 接收祖先组件通过 provide 注入的数据，详见 [provide & inject](provide-inject.md)（联盟 `1400+` / OPPO `1143+`） |
| pageLifecycles   | Object                 | 自定义组件监听所在页面的生命周期，详见[自定义组件监听页面生命周期 pageLifecycles](#自定义组件监听页面生命周期-pagelifecycles) |

#### prop 验证 `1010+`

在自定义组件中，可将 props 定义为带验证需求的对象。其中，key 为属性名，value 为属性对应的验证需求。验证失败则输出错误提示日志，增加 prop 验证有利于规范自定义组件的使用

**定义：**

| 属性              | 类型     | 描述                                                                                                                                                                                                                                                     |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type `1010+`      | -        | 检查属性值的类型。支持单一类型和多种可能类型，可在原生和自定义构造函数中任意选择，单独或组合使用<br/><ul><li>原生构造函数：String &#124; Number &#124; Boolean &#124; Function &#124; Object &#124; Array &#124; Symbol</li><li>自定义构造函数</li></ul> |
| default `1010+`   | -        | 设置属性的默认值                                                                                                                                                                                                                                         |
| required `1010+`  | Boolean  | 设置属性是否必填                                                                                                                                                                                                                                         |
| validator `1010+` | Function | 设置自定义验证函数。若函数的返回值为真，则通过验证；否则验证失败                                                                                                                                                                                         |

**示例：**

```html
<script>
  export default {
    props: {
      // 单一类型检查的简写
      propA: Number,
      // 多种可能类型的简写
      propB: [String, Number],
      // 必填的字符串
      propC: {
        type: String,
        required: true
      },
      // 带默认值的数字
      propD: {
        type: Number,
        default: 100
      },
      // 带有默认值的对象
      propE: {
        type: Object,
        default () {
          return { message: 'hello' }
        }
      },
      // 自定义验证函数
      propF: {
        validator (value) {
          return value === 'hello'
        }
      }
    }
  }
</script>
```

### 计算属性 `1050+`

- 类型：`{ [key: string]: Function | { get: Function, set: Function } }`
- 详细：计算属性将被混入到 Vm 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vm 实例。计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是不会被更新的。

#### 示例：

```js
export default {
  data: {
    firstName: 'Quick',
    lastName: 'App'
  },
  computed: {
    fullName: {
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(value) {
        const names = value.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  onReady() {
    console.log(this.fullName) // Quick App
    this.fullName = 'John Doe'
    console.log(this.firstName) // John
    console.log(this.lastName) // Doe
  }
}
```

### 外部样式 `1100+`

开发者可通过 `externalClasses` 将外部样式传递给自定义组件。

注意：

1. 若传递的样式名在自定义组件中已有定义，则优先级：外部样式 > 自定义组件中定义的样式；若在一个节点上同时应用普通样式及外部样式，则优先级：外部样式 > 普通样式
2. 若在 `props` 中定义了同名属性，则在 `externalClasses` 中无法再使用该属性

#### 示例：

```js
// 父组件
<template>
  <div>
    <custom-component my-class="color-class font-class"></custom-component>
  </div>
</template>

<style>
.color-class {
  color: #FF0000;
}
.font-class {
  font-size: 20px;
}
</style>
```

```js
// 子组件
<template>
  <div>
    <text class="my-class">该节点的样式由父组件决定</text>
  </div>
</template>

<script>
export default {
  externalClasses: ['my-class'],
}
</script>
```

### 公共对象

| 属性               | 类型    | 描述                                                  |
| ------------------ | ------- | ----------------------------------------------------- |
| $app               | Object  | 应用对象                                              |
| $page              | Object  | 页面对象                                              |
| $valid             | Boolean | 页面对象是否有效                                      |
| $visible           | Boolean | 页面是否处于用户可见状态                              |
| $attrs `1090+`     | Object  | 与 Vue 中 $attrs 类似，用于高阶组件传值               |
| $listeners `1090+` | Object  | 与 Vue 中 $listeners 类似，用于高阶组件跨层级事件触发 |

示例代码：

$attrs:

```javascript
// 父组件 comp.ux
<template>
  <div class="demo-page">
    <child name="{{ name }}" gender="{{ gender }}" age="{{ age }}"></child>
  </div>
</template>

// 子组件 child.ux
<text>父亲name为：{{ name }}</text>
<grandson $attrs></grandson>

<script>
export default {
  props: ['name'],
}
</script>

// 孙子组件 grandson.ux
<text>高阶comp组件gender为： {{ $attrs.gender }}</text>
```

$listeners:

```javascript
// 父组件 comp.ux
<template>
  <div class="demo-page">
    <child onevent1="handleEvent1"></child>
  </div>
</template>

<script>
export default {
  handleEvent1(evt) {
    // do something!
  }
}
</script>

// 子组件 child.ux
<grandson $listeners></grandson>

// 孙子组件 grandson.ux
<input type="button" value="grandson触发高阶组件comp中的event1事件" onclick="emitEvent1"/>

<script>
export default {
  emitEvent1() {
    this.$emit('event1', {childName: 'grandson'})
  }
}
</script>
```

### 应用对象

可通过`$app`访问

| 属性  | 类型   | 描述                                                                      |
| ----- | ------ | ------------------------------------------------------------------------- |
| $def  | Object | 使用`this.$app.$def`获取在`app.ux`中暴露的对象                            |
| $data | Object | 使用`this.$app.$data`获取在`manifest.json`的`config.data`中声明的全局数据 |

### 页面对象

可通过`$page`访问

| 属性                    | 类型   | 描述                                                                                                                          |
| ----------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| action                  | String | 获取打开当前页面的 action。仅在当前页面是通过 filter 匹配的方式打开时有效，否则为 undefined。参见[manifest 文件](manifest.md) |
| uri                     | String | 获取打开当前页面的 uri。仅在当前页面是通过 filter 匹配的方式打开时有效，否则为 undefined。参见[manifest 文件](manifest.md)    |
| name `1030+`            | String | 获取当前页面路由的名称，与[manifest 文件](manifest.md)中`router.pages` 中对应的属性名一致                                     |
| path `1030+`            | String | 获取当前页面路由的 path，与[manifest 文件](manifest.md)中`router.pages` 中对应的 path 一致                                    |
| component `1030+`       | String | 获取当前页面路由的 component，与[manifest 文件](manifest.md)中`router.pages` 中对应的 component 一致                          |
| orientation `1040+`     | String | 获取当前页面的屏幕方向：<br>portrait：竖屏<br>landscape：横屏                                                                 |
| statusBarHeight `1050+` | Number | 获取当前页面的状态栏高度                                                                                                      |
| titleBarHeight `1050+`  | Number | 获取当前页面的标题栏高度                                                                                                      |
| windowWidth `1050+`     | Number | 获取当前页面的可使用窗口宽度                                                                                                  |
| windowHeight `1050+`    | Number | 获取当前页面可使用窗口高度                                                                                                    |

## 方法

### 数据方法

| 属性    | 类型     | 参数                         | 描述                                                                            |
| ------- | -------- | ---------------------------- | ------------------------------------------------------------------------------- |
| $set    | Function | key: String <br/> value: Any | 添加数据属性，用法：`this.$set('key',value)` `this.$vm('id').$set('key',value)` |
| $delete | Function | key: String                  | 删除数据属性，用法：`this.$delete('key')` `this.$vm('id').$delete('key')`       |

### 公共方法

| 属性                      | 类型     | 参数               | 描述                                                                                                                                                                                                                                                       |
| ------------------------- | -------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $element                  | Function | id: String 组件 id | 获取指定 id 的组件 dom 对象，如果没有指定 id，则返回根组件 dom 对象用法：`<template> <div id='xxx'></div> </template>` `this.$element('xxx')` 获取 id 为 xxx 的 div 组件实例对象 `this.$element()` 获取根组件实例对象                                      |
| $root                     | Function | 无                 | 获取顶层 ViewModel                                                                                                                                                                                                                                         |
| $parent                   | Function | 无                 | 获取父亲 ViewModel                                                                                                                                                                                                                                         |
| $child                    | Function | id: String 组件 id | 获取指定 id 的自定义组件的 ViewModel 用法：`this.$child('xxx')` 获取 id 为 xxx 的 div 组件 ViewModel                                                                                                                                                       |
| $nextTick                 | Function | function: 回调函数  | 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，可以获取更新后DOM。                                                                                                                                                      |
| $vm `deprecated`          | Function | id: String 组件 id | 请使用上面`this.$child('xxx')`替代                                                                                                                                                                                                                         |
| $rootElement `deprecated` | Function | 无                 | 请使用上面`this.$element()`替代                                                                                                                                                                                                                            |
| $forceUpdate              | Function | 无                 | 更新 ViewModel 数据，可能会触发 DOM 操作，如：创建节点、更新节点、删除节点等；这些 DOM 操作不一定在数据更新时立即执行，而是在开发者的业务代码执行后触发；<br/>若开发者期望数据更新时立即执行相应的 DOM 操作，可使用：`this.$forceUpdate()`；一般不推荐使用 |

### 事件方法

| 属性         | 类型     | 参数                                                                                                                                            | 描述                                                                                                                                                                                         |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| $on          | Function | type: String 事件名 <br/> handler: Function 事件句柄函数                                                                                        | 添加事件处理句柄用法：`this.$on('xxxx', this.fn)` fn 是在`<script>`中定义的函数                                                                                                              |
| $off         | Function | type: String 事件名 <br/> handler: Function 事件句柄函数                                                                                        | 删除事件处理句柄用法：`this.$off('xxxx', this.fn)` `this.$off('xxx')` 删除指定事件的所有处理句柄                                                                                             |
| $dispatch    | Function | type: String 事件名                                                                                                                             | 向上层组件发送事件通知用法：`this.$dispatch('xxx')`正常情况下，会一直向上传递事件（冒泡）如果要停止冒泡，在事件句柄函数中调用`evt.stop()`即可                                                |
| $broadcast   | Function | type: String 事件名                                                                                                                             | 向子组件发送事件通知用法：`this.$broadcast('xxx')`正常情况下，会一直向下传递事件如果要停止传递，在事件句柄函数中调用`evt.stop()`即可                                                         |
| $emit        | Function | type: String 事件名 <br/> data: Object 事件参数                                                                                                 | 触发事件，对应的句柄函数被调用用法：`this.$emit('xxx')` `this.$emit('xxx', {a:1})`传递的事件参数可在事件回调函数中，通过`evt.detail`来访问，例如`evt.detail.a`                               |
| $emitElement | Function | type: String 事件名 <br/> data: Object 事件参数 <br/> id: String 组件 id (默认为-1 代表根元素)                                                  | 触发组件事件, 对应的句柄函数被调用用法：`this.$emitElement('xxx', null, 'id')` `this.$emitElement('xxx', {a:1})`传递的事件参数可在事件回调函数中，通过`evt.detail`来访问，例如`evt.detail.a` |
| $watch       | Function | data: String 属性名, 支持'a.b.c'格式，不支持数组索引 <br/> handler: String 事件句柄函数名, 函数的第一个参数为新的属性值，第二个参数为旧的属性值 | 动态添加属性/事件绑定，属性必须在 data 中定义，handler 函数必须在`<script>`定义；当属性值发生变化时事件才被触发用法：`this.$watch('a','handler')`                                            |

### 应用方法 `1010+`

可通过`$app`访问

| 属性         | 类型     | 参数 | 描述                                                            |
| ------------ | -------- | ---- | --------------------------------------------------------------- |
| exit `1010+` | Function | 无   | 退出快应用，结束应用生命周期。<br/>调用方法：`this.$app.exit()` |

### 页面方法

可通过`$page`访问

| 属性                           | 类型     | 参数                                                                                                                                                                                                                                                                                                                               | 描述                                                                                                                                                                                                                                                                            |
| ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| setTitleBar                    | Function | text: String 标题栏文字 <br/> textColor: String 文字颜色 <br/> backgroundColor: String 背景颜色 <br/> backgroundOpacity `1000+`: Number 背景透明度 <br/> menu `1000+`: Boolean 是否在标题栏右上角显示菜单按钮                                                                                                                     | 设置当前页面的标题栏用法：`this.$page.setTitleBar({text:'Hello', textColor:'#FF0000', backgroundColor:'#FFFFFF', backgroundOpacity:0.5, menu: true})`                                                                                                                           |
| setMeta `1090+`                | Function | title: String 当前页面用于搜索的标题。 <br/> description: String 当前页面内容摘要 <br/> pic: String 当前页面缩略图的在线地址<br/> keywords: String 描述页面内容的关键词，多个可用逗号（英文状态下）隔开<br/>                                                                                                                       | 通过 setMeta 设置的标题仅用于搜索，页面 titleBar 标题请通过`setTitleBar`设置                                                                                                                                                                                                    |
| finish `1010+`                 | Function | 无                                                                                                                                                                                                                                                                                                                                | 从本页面退出，结束页面生命周期。<br/>调用方法：`this.$page.finish()`                                                                                                                                                                                                            |
| exitFullscreen `1050+`         | Function | 无                                                                                                                                                                                                                                                                                                                                | 页面退出全屏模式                                                                                                                                                                                                                                                               |
| setStatusBar `1050+`           | Function | immersive: Boolean 是否开启状态栏沉浸式 <br/> textStyle: String 文字样式 <br/> backgroundColor: String 状态栏背景颜色 <br/> backgroundOpacity `1000+`: Number 状态栏背景不透明度 <br/> systemNavigationBarBackground `1100+`: String 底部手势条(虚拟按键)背景色，**仅 OPPO 支持**                                                 | 设置当前页面的状态栏用法：`this.$page.setStatusBar({immersive:true, textStyle:'dark', backgroundColor:'#FFFFFF', backgroundOpacity:0.5, systemNavigationBarBackground:'#000'})`                                                                                               |
| scrollTo `1070+`               | Function | top: Number 要滚动到的纵坐标，单位：px <br/> behavior: String 滚动行为，支持参数 smooth(平滑滚动)，instant(瞬间滚动)，默认值 auto，效果等同于 instant                                                                                                                                                                              | 纵向滚动页面到指定的纵坐标用法：`this.$page.scrollTo({top:1000, behavior:'smooth'})`                                                                                                                                                                                            |
| scrollBy `1070+`               | Function | top: Number 滚动的纵轴偏移量 ，单位：px<br/> behavior: String 滚动行为，支持参数 smooth(平滑滚动)，instant(瞬间滚动)，默认值 auto，效果等同于 instant                                                                                                                                                                              | 以给定的偏移量纵向滚动页面用法：`this.$page.scrollBy({top:100})`                                                                                                                                                                                                                |
| getMenuBarRect `1070+`         | Function | 获取 menuBar 的布局位置信息 ( 手机当前分辨率下的像素值 ) 。坐标信息以页面内容区左上角为原点 。                                                                                                                                                                                                                                     | 获取 menuBar 页面位置信息用法：`this.$page.getMenuBarRect()`                                                                                                                                                                                                                    |
| getMenuBarBoundingRect `1090+` | Function | 获取 menuBar 对应 designWidth 设计尺寸的布局位置信息。坐标信息以页面内容区左上角为原点，单位 px                                                                                                                                                                                                                                    | 获取 menuBar 页面对应 designWidth 设计尺寸的位置信息用法：`this.$page.getMenuBarBoundingRect()`                                                                                                                                                                                 |
| setMenubarData `1080+`         | Function | shareTitle: String 分享标题 <br/> shareDescription: String 分享描述 `1070+` <br/> shareIcon: String 分享图片 `1070+` <br/> shareCurrentPage: Boolean 当前页面是否支持分享, 默认 false `1080+` <br/> shareParams: Object 分享当前页面时的透传参数，示例 {"key":value} 类型 `1080+` <br/> shareUrl: String 不支持跳转快应用设备时, 分享跳转使用此链接 `1080+` <br/> usePageParams: Boolean 是否添加当前页面参数到分享参数中, 默认 false, 未配置时由 shareCurrentPage 决定是否添加页面参数到分享参数中`1100+` <br>[注意：shareCurrentPage 设置 true 时, 不要在页面参数中添加敏感信息，如账号密码等涉及到安全类的信息字段内容] | 设置当前页面 MenubarData 用法：`this.$page.setMenubarData({shareTitle:'分享标题', shareDescription:'分享描述',shareIcon:'https://doc.quickapp.cn/assets/images/logo.png', shareCurrentPage:true, shareUrl:'https://www.quickapp.cn/', shareParams:"{\"key\":\"1\",\"id\":0}"})` |
| setSecure `1090+`              | Function | Boolean，是否允许截屏和录屏。默认为 false，允许截屏和录屏，为 true 时不允许截屏和录屏。                                                                                                                                                                                                                                            | 设置页面是否可以截屏和录屏用法：`this.$page.setSecure(true)`<br/> 小米快应用、vivo、OPPO 快应用暂不支持此特性                                                                                                                                                                                     |
| setTabBarItem `1200+`         | Function | index: Integer 序号 <br/> text: String 文字内容 <br/> iconPath: String 图片链接 <br/> selectedIconPath: String 选中图片链接 <br/> pagePath: String 页面路由路径 <br/> pageParams: String 页面参数，示例 {"key":value} 类型  |设置当前页面 tabBarItem 用法：<br/> `this.$page.setTabBarItem({index: 0, text:'文字内容' ,iconPath:'https://doc.quickapp.cn/assets/images/logo.png', selectedIconPath:'https://doc.quickapp.cn/assets/images/logo.png', pagePath:'页面路由路径', pageParams:"{\"key\":\"1\",\"id\":0}"})` |

注意：对于 setMenubarData 使用 shareParams 或者页面参数的情况下，页面参数的接收必须在相应页面对字串内容中的 key 值 {"key": value}显式声明 public 才可以接收到，参见 https://doc.quickapp.cn/framework/seo.html?h=%E9%A1%B5%E9%9D%A2%E5%8F%82%E6%95%B0

`systemNavigationBarBackground`（`1100+`）用于设置底部手势条（虚拟按键）背景色，**仅 OPPO 支持**。系统中存在两种系统导航方式：虚拟按键和全面屏手势（路径：设置 => 系统设置 => 系统导航方式）。用法示例：

```js
this.$page.setStatusBar({
  systemNavigationBarBackground: '#000'
})
```

示例：

```javascript
*页面中需要声明参数变量名称，注意参数名称需要和 shareParams 中的 key-value 的 key 值名称对应，对于 usePageParams 或者 shareCurrentPage 为 true 情况，也要对应页面参数声明对应的 key 值接收参数*

public: {

    key: null

  },

如果快应用当前页面和打开的分享页面不同，在打开快应用时候，跳转到分享页时，分享参数可以在 onInit 中接收到

onInit() {

console.log('onInit share param page :  ' + JSON.stringify(this.key))

}

如果快应用当前页面和打开的分享页面相同，在打开快应用时候，跳转到分享页时，分享参数可以在 onRefresh 接收到

onRefresh(data){

console.log('onRefresh share param page :  ' + JSON.stringify(data.key))

}
```

## 生命周期接口

### 页面生命周期

#### onInit

监听页面初始化。当页面完成初始化时调用，只触发一次

##### 参数

| 参数名        | 类型   | 描述                                                                                                         |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| query `1060+` | Object | 通过 deeplink、router.push 等接口传入的 uri 中 query 解析成的对象，或者 router.push 等接口传入的 params 对象 |

#### onReady

监听页面创建完成。当页面完成创建可以显示时触发，只触发一次

##### 参数

无

#### onShow

监听页面显示。当进入页面时触发

##### 参数

无

#### onHide

监听页面隐藏。当页面跳转离开时触发

##### 参数

无

#### onDestroy

监听页面退出。当页面跳转离开（不进入导航栈）时触发

##### 参数

无

#### onBackPress

监听返回按钮动作。当用户点击返回按钮时触发

##### 参数

无

##### 返回值

| 类型    | 描述                                                                                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Boolean | 返回 true 表示页面自己处理返回逻辑，返回 false 表示使用默认的返回逻辑，不返回值会作为 false 处理；<br> 注意：该函数不支持声明为异步函数（即：使用`async`标识），因为返回值代表界面要立即响应用户操作； |

#### onMenuPress

监听菜单按钮动作。当用户点击菜单按钮时触发

##### 参数

无

##### 返回值

| 类型    | 描述                                                                                                                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Boolean | 返回 true 表示开发者自己处理响应逻辑，返回 false 表示使用系统弹出菜单的逻辑，不返回值会作为 false 处理；<br> 注意：该函数不支持声明为异步函数（即：使用`async`标识），因为返回值代表界面要立即响应用户操作； |

#### onRefresh `1050+`

监听页面重新打开。

1.当页面在 manifest 中 launchMode`1050+` 标识为'singleTask'时，仅会存在一个目标页面实例，用户多次打开目标页面时触发此函数。<br/>2.打开目标页面时在 push 参数中携带 flag 'clearTask'，且页面实例已经存在时触发。<br/>该回调中参数为重新打开该页面时携带的参数。<br/>详见[页面启动模式](./launch-mode.md)

##### 参数

| 参数名 | 类型   | 描述                                                                                                         |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------ |
| query  | Object | 通过 deeplink、router.push 等接口传入的 uri 中 query 解析成的对象，或者 router.push 等接口传入的 params 对象 |

#### onConfigurationChanged `1060+`

监听应用配置发生变化。当应用配置发生变化时触发，如系统语言、主题模式、屏幕方向或屏幕大小发生改变。

##### 参数

| 参数名 | 类型   | 描述                   |
| ------ | ------ | ---------------------- |
| event  | Object | 应用配置发生变化的事件 |

event 参数：

| 参数名 | 类型   | 描述                                               |
| ------ | ------ | -------------------------------------------------- |
| type   | String | 应用配置发生变化的原因类型，支持的 type 值如下所示 |

event 中`type` 现在支持的参数值如下：

| 参数值            | 描述                                                              |
| ----------------- | ----------------------------------------------------------------- |
| locale            | 应用配置因为语言、地区变化而发生改变                              |
| themeMode `1070+` | 系统主题模式变更时会触发(不受 manifest.json 的 themeMode 值影响） |
| orientation `1200+` | 屏幕方向跟随系统发生变化时触发 |
| screenSize `1200+` | 设备屏幕大小发生变化时触发，如横竖屏旋转、折叠屏手机内外屏切换等 |

示例代码：

```javascript
onConfigurationChanged(evt) {
  console.log(`触发生命周期onConfigurationChanged, 配置类型：${evt.type}`)
}
```

#### onReachTop `1080+`

监听页面是否触顶。页面滚动位置从不触顶到触顶时触发

##### 参数

无

#### onReachBottom `1080+`

监听页面是否触底。页面滚动位置从不触底到触底时触发

##### 参数

无

#### onPageScroll `1080+`

监听页面滚动。页面发生滚动时触发，内嵌滑动组件的滚动不会触发

##### 参数

| 参数名 | 类型   | 描述               |
| ------ | ------ | ------------------ |
| event  | Object | 页面发生滚动的事件 |

event 参数：

| 参数名    | 类型   | 描述                       |
| --------- | ------ | -------------------------- |
| scrollTop | Number | 页面在垂直方向已滚动的距离 |

### 页面的生命周期接口的调用顺序

- 打开页面 A：onInit() -> onReady() -> onShow()
- 在页面 A 打开页面 B：onHide()
- 从页面 B 返回页面 A：onShow()
- A 页面返回：onBackPress() -> onHide() -> onDestroy()

### 自定义组件的生命周期 `1050+`

自定义组件，指的是通过<import>语法引入的 ViewModel 组件

| 属性      | 类型     | 参数 | 返回值 | 描述             | 触发时机               |
| --------- | -------- | ---- | ------ | ---------------- | ---------------------- |
| onInit    | Function | 无   | 无     | 监听初始化       | 当数据驱动化完成时触发 |
| onReady   | Function | 无   | 无     | 监听模板创建完成 | 当模板创建完成时触发   |
| onDestroy | Function | 无   | 无     | 监听组件销毁     | 当销毁时触发           |

#### 自定义组件监听页面生命周期 pageLifecycles

先前自定义组件只支持 `onInit`、`onReady`、`onDestroy` 这三个组件本身的生命周期，不支持监听组件所在页面的生命周期，当需要监听页面生命周期时，需依赖父子组件通信。

现自定义组件已支持通过 `pageLifecycles` 监听 `onShow`、`onHide`、`onConfigurationChanged` 这三个使用频率较高的页面生命周期，不再需要依赖父子组件通信。

注：

1. 联盟预览版 `1400+` 支持，OPPO 快应用引擎 `1137+` 及以上版本可用
2. 卡片也已支持，支持版本同快应用

在自定义组件 ux 文件中，声明 `pageLifecycles` 对象，可在该对象中定义以下生命周期回调：

| 生命周期             | 参数     | 描述                                                             |
| -------------------- | -------- | ---------------------------------------------------------------- |
| show                 | 无       | 自定义组件所在页面的 onShow 生命周期被触发时执行                 |
| hide                 | 无       | 自定义组件所在页面的 onHide 生命周期被触发时执行                 |
| configurationChanged | `Object` | 自定义组件所在页面的 onConfigurationChanged 生命周期被触发时执行 |

示例代码：

```js
// 自定义组件 ux 文件
export default {
  data() {
    return {
      title: '自定义组件'
    }
  },
  pageLifecycles: {
    show() {
      console.log('组件所在页面的 onShow 生命周期')
    },
    hide() {
      console.log('组件所在页面的 onHide 生命周期')
    },
    configurationChanged(params) {
      console.log('组件所在页面的 onConfigurationChanged 生命周期', params)
    }
  }
}
```

### 应用生命周期

#### onCreate()

监听应用创建,应用创建时调用

##### 参数

无

#### onRequest() `1070+`

监听应用收到一个外部的打开新页面的请求

##### 参数

无

#### onIntentExecute(intelligentIntent) 

监听应用收到意图框架的意图调用请求

##### 参数

| 参数名 | 类型   | 描述               |
| ------ | ------ | ------------------ |
| intelligentIntent  | Object | 意图调用参数，框架会自动解析为JSON对象；如果解析失败，会直接返回意图调用参数：
{intentName: "Unkown", extras: "..(意图参数)..."} |

intelligentIntent 参数：

| 参数名 | 类型   |  必选   | 描述               |
| ------ | ------ |------ | ---------------- |
| intentName  | String | 是 | 意图名称 |
| requestId  | String  | 是 | 本次意图调用的唯一id |
| device  | String | 是 |触发意图调用的设备信息，可选值：phone/watch/tablet/tv/car |
| entry  | String | 是 | 触发意图调用的入口信息，如桌面卡片 |
| entityId  | String | 否 |多实例场景，区分实例信息 |
| parameters  | Object | 否 |意图调用参数，如地理位置坐标/用户习惯等，不同垂域应定义不同内容 |
| extras  | Object | 否 | 额外的意图参数 |

#### onShow() `1070+`

监听应用返回前台,应用返回前台时调用

##### 参数

无

#### onHide() `1070+`

监听应用退到后台,应用退到后台时调用

##### 参数

无

#### onDestroy()

监听应用销毁,应用销毁时调用

##### 参数

无

#### onError(Object) `1030+`

监听应用报错,应用捕获异常时调用

##### 参数

| 参数名  | 类型   | 描述     |
| ------- | ------ | -------- |
| message | String | 错误描述 |
| stack   | String | 调用栈   |

建议快应用上线前将 `manifest.json` 中的 `config.logLevel` 配置为 `warn`，本地开发时，可配置为 `log` 或 `debug`。更完善的错误捕获能力见下方 `onErrorCaptured` / `onErrorHandler`。

#### onErrorCaptured(err, vm, info)

- 注：联盟预览版 `1300+` 支持，OPPO 快应用引擎已在 `1117+` 版本支持

在捕获到自身以及后代组件的错误时被触发，可以在回调中 `return false` 以阻止错误继续向上传播。页面及组件均支持，使用方法同页面/组件的其它生命周期。

##### 参数

| 参数名 | 类型   | 描述               |
| ------ | ------ | ------------------ |
| err    | Object | 错误对象           |
| vm     | Object | 错误所在的组件实例 |
| info   | String | 附加的错误来源信息 |

##### 错误传播规则

- 在框架捕获到错误时，如果此时能拿到 `vm` 对象，错误将会由子组件冒泡到父组件，逐个触发页面或组件的 `onErrorCaptured` 钩子，直至全局的 `onErrorHandler` 钩子，中间可通过 `return false` 来阻止错误继续传递；如果此时拿不到 `vm` 对象，错误将直接发送给全局的 `onErrorHandler` 钩子；
- 如果 `onErrorCaptured` 钩子自身抛出了一个错误，则这个新错误和原本被捕获的错误都会发送给全局的 `onErrorHandler` 钩子。

##### 示例代码

```javascript
// 页面或组件 index.ux
export default {
  onErrorCaptured(err, vm, info) {
    console.error('onErrorCaptured error: ', err)
    console.error('onErrorCaptured vm of component: ', vm)
    console.error('onErrorCaptured error info: ', info)

    // 编写线上错误监控代码
    // yourReportErrorCode(err.message, err.stack, vm?._type, info)

    // 可通过 return false 阻止错误继续传递
    // return false
  }
}
```

##### 注意事项

请注意，以下用法可能会导致 `onErrorCaptured` 被循环触发，请尽量避免。

- 在 `onErrorCaptured` 里修改 `data/public/protected/private` 里面的属性，该修改引发了新的错误；
- `onErrorCaptured` 里面的异步代码引发了新的错误。

如必须使用，请保证以上用法不会产生新的错误，或者自己使用 `try/catch` 拦截可能存在的错误，不让其冒泡到框架层，否则 `onErrorCaptured` 可能会有循环被触发的风险。

#### onErrorHandler(err, vm, info)

- 注：联盟预览版 `1300+` 支持，OPPO 快应用引擎已在 `1117+` 版本支持

在捕获到错误时被触发，若 `onErrorHandler` 未定义或者其本身抛出一个新的错误，那么被捕获的错误将由 `console.error` 进行输出。使用方法同 `app` 其它生命周期。

##### 参数

| 参数名 | 类型                | 描述               |
| ------ | ------------------- | ------------------ |
| err    | Object              | 错误对象           |
| vm     | Object \| undefined | 错误所在的组件实例 |
| info   | String              | 附加的错误来源信息 |

ps：`vm`（组件实例对象）可能不存在，取决于捕获到错误时，能否拿到 `vm` 对象。比如捕获到的错误为定时器回调或接口回调错误，此时是不存在 `vm` 对象的。

##### 示例代码

```javascript
// app.ux
export default {
  onErrorHandler (err, vm, info) {
    console.error('onErrorHandler error: ', err)
    console.error('onErrorHandler vm of component: ', vm)
    console.error('onErrorHandler error info: ', info)
    
    // 编写线上错误监控代码
  	// yourReportErrorCode(err.message, err.stack, vm?._type, info)
  }
}
```

##### 注意事项

请注意，以下用法可能会导致 `onErrorHandler` 被循环触发，请尽量避免。

- 在 `onErrorHandler` 里通过 `vm` 修改组件的属性，该修改引发了新的错误；
- `onErrorHandler` 里面的异步代码引发了新的错误。

如必须使用，请保证以上用法不会产生新的错误，或者自己使用 `try/catch` 拦截可能存在的错误，不让其冒泡到框架层，否则 `onErrorHandler` 可能会有循环被触发的风险。

##### 补充说明

- 框架层无法捕获到 `promise` 内部错误以及嵌套多层的 `async` 函数内部错误，此类情况无法触发 `onErrorCaptured` 和 `onErrorHandler` 生命周期，需自行做好错误的捕获处理；
- 卡片不支持 `app` 生命周期，所以卡片也不支持 `onErrorHandler`，卡片可直接使用 `onErrorCaptured` 生命周期；
- 部分获取不到 `vm` 的场景，比如定时器回调错误、接口回调错误，触发流程如下：
  - 快应用侧：直接触发 `onErrorHandler` 生命周期，不会触发页面或组件的 `onErrorCaptured` 生命周期；
  - 卡片侧：直接触发页面的 `onErrorCaptured` 生命周期，不会触发组件的 `onErrorCaptured` 生命周期。

#### onPageNotFound(Object) `1060+`

监听页面跳转的异常，当页面跳转异常时，如果前端在 app.ux 定义了 onPageNotFound，将会收到错误回调

页面跳转场景：router.push、router.replace、a 标签配置 href 属性跳转

示例代码：

```javascript
// this methods must be written at app.ux
// app.ux
export default {
  onPageNotFound(params) {
    const { uri = '' } = params
    console.error('error uri', uri)
  }
}
```

onPageNotFound 回调返回一个对象，对象参数值如下展示：

| 参数名 | 类型   | 描述                   |
| ------ | ------ | ---------------------- |
| uri    | String | 页面跳转出现异常的地址 |

### app.ux 对象的属性

app.ux 对象指的是：开发者在`app.ux`中`<script>`节点内要导出的对象

| 属性/方法       | 类型 | 参数 | 描述                                                                             |
| --------------- | ---- | ---- | -------------------------------------------------------------------------------- |
| plugins `1060+` | 数组 | 无   | 数组中的每个元素代表开发者定义的前端插件；详情请参考下面的文档：`框架前端插件`； |

### 消息通道(BroadcastChannel) `1000+`

用来实现不同页面之间的相互通信。

#### 接口说明

在 BroadcastChannel 的构造函数中,只支持接受一个参数,就是"频道名称"(channel name)

比如：

```javascript
const test = new BroadcastChannel('channel')
```

BroadcastChannel 定义的接口如下：

```javascript
declare interface BroadcastChannel = {
  name: string,
  postMessage: (message: any) => void;
  onmessage: (event: MessageEvent) => void;
  close: () => void;
}
```

消息对象（MessageEvent）的类型定义如下：

```javascript
declare interface MessageEvent = {
  type: string, // "message"
  data: any
}
```

对参数的说明：

| 名称        | 类型       | 参数             | 描述                                                               |
| ----------- | ---------- | ---------------- | ------------------------------------------------------------------ |
| name        | `String`   | String:频道名称  | 频道名称,区分不同的消息频道(注意：不同频道之间不可通信)。          |
| postMessage | `Function` | Object: 消息内容 | 用于在当前频道中广播消息。                                         |
| onmessage   | `Function` | Event:消息对象   | 订阅消息。在频道中接收到广播消息之后，会给所有订阅者派发消息事件。 |
| close       | `Function` | 无               | 关闭当前的频道。                                                   |

#### 用法

假设在我们的应用中，有 A、B、C 三个页面

在页面 A 中：

```javascript
const pageA = new BroadcastChannel('channel1')
pageA.postMessage('haha!')
```

在页面 B 中：

```javascript
const pageB = new BroadcastChannel('channel1')
```

在页面 C 中：

```javascript
const pageC = new BroadcastChannel('channel1')
pageC.onmessage = function(event) {
  console.log(event.data)
  pageC.postMessage('hello, i am here!')
}
```

这样,页面 A 、B 、C 都创建一个监听了 'channel1' 频道的 BroadcastChannel 对象，它们之间可以通过这个对象实现互相通信。

当 pageA 发布了 'haha!' 消息时，pageC 将收到一个消息事件，其 data 字段等于 'haha!'，然后也向频道中回复一条消息。注意：自己不会收到自己发的消息。

但是 pageB 并不会收到这些消息，因为他没有实现 onmessage 方法，相当于没有接收频道中的消息，所以他实际上不是一个订阅者。

注意:在 pageA 销毁 channel 当前不与页面 context 进行上下文绑定，需要主动关闭消息通道，如下所示:

```javascript
const pageA = new BroadcastChannel('tom')
pageA.close()
```

### 框架前端插件 `1060+`

开发者有时面对更多的解耦合与 [AOP（Aspect Oriented Programming）](https://baike.baidu.com/item/AOP/1332219)需求，插件机制用于解决开发者业务代码与平台本身能力的耦合分离；

比如，开发者需要记录用户打开快应用与每个页面打开返回等的时间操作节点，用于埋点需求，此时通过插件机制就可以不侵入到每个页面代码模块中，实现更优雅；

#### 定义插件

开发者通过定义一个普通的 js 对象就可以代表一个插件（称为：插件对象），该对象提供 install 方法，将在应用启动时加载并安装插件，此时该方法得到执行；

##### 插件对象

| 属性/方法 | 类型     | 参数    | 描述                                                                                     |
| --------- | -------- | ------- | ---------------------------------------------------------------------------------------- |
| install() | Function | VmClass | 第一个参数代表每个组件（页面级 ViewModel、自定义组件 ViewModel）所属的类，称为 VmClass； |

##### VmClass 类

| 属性/方法  | 类型     | 参数   | 描述                   |
| ---------- | -------- | ------ | ---------------------- |
| mixin()    | Function | object | 监听页面的生命周期事件 |
| mixinApp() | Function | object | 监听应用的生命周期事件 |

如下代码所示：

```javascript
// file：plugin-demo.js

const PluginDemo = {
  // 安装入口
  install(VmClass) {
    // 页面生命周期
    VmClass.mixin({
      onInit() {
        console.info(`页面生命周期：onInit`)
      },
      onReady() {
        console.info(`页面生命周期：onReady`)
      },
      onShow() {
        console.info(`页面生命周期：onShow`)
      },
      onHide() {
        console.info(`页面生命周期：onHide`)
      }
    })

    // 应用生命周期
    VmClass.mixinApp({
      onCreate() {
        console.info(`页面生命周期：onCreate`)
      }
    })
  }
}

export default PluginDemo
```

#### 插件引入

开发者在`app.ux`对象中声明 plugins 属性（类型为数组），数组中的元素声明为需要引入的插件；

如下代码所示：

```html
<script>
  // file：app.ux

  import pluginDemo from './plugin-demo.js'

  export default {
    plugins: [
      pluginDemo
    ]
  }
</script>
```
