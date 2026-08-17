# 优化技巧

> 了解常用的优化手段，提升对应用代码整理的组织能力，合理拆分功能模块

通过本节，你将学会：

- [函数共享](#函数共享)
- [性能优化](#性能优化)
- [错误处理](#错误处理)
- [结构优化](#结构优化)

## 函数共享

框架应用开发与传统的 H5 页面开发之间有一个显著的不同点：

应用是多页面共享同一个 V8 Context，而 H5 页面通常是一个页面一个 V8 Context，页面间无法通讯

因此，在应用开发中，开发者需要了解页面与 APP 之间，页面与页面之间的共享方式。常见的通讯需求如下：

- 引入 babel 或者 lodash 等类库，全局暴露供所有页面使用
- 实现页面间参数传递，尤其是回传。详见文档[页面切换及参数传递](switching-pages-and-passing-parameters.md)

目前，在框架中，可以通过`使用框架API`和`使用global.js`实现函数共享

### 使用框架 API

开发者可以在页面`ViewModel`中，通过`this.$app.$def`获取 APP 上定义的数据及方法。详见文档[生命周期](lifecycle.md)

**示例如下：**

```javascript
// app.ux中导出的对象
const appDef = this.$app.$def
```

### 使用 global.js

开发者可参考下面示例的方式定义全局的函数，实现页面与 APP 之间，页面与页面之间的函数共享。

```javascript
// global.js
/**
 * @file 全局能力的配置与获取
 */

function getGlobalRef() {
  return Object.getPrototypeOf(global) || global
}

const quickappGlobal = getGlobalRef()

/**
 * 设置全局(被APP与Page共享)数据；
 * @param key {string}
 * @param val {*}
 */
function setGlobalData(key, val) {
  quickappGlobal[key] = val
}

/**
 * 获取全局(被APP与Page共享)数据；
 * @param key {string}
 * @return {*}
 */
function getGlobalData(key) {
  return quickappGlobal[key]
}

// 两个方法默认定义在全局
setGlobalData('setGlobalData', setGlobalData)
setGlobalData('getGlobalData', getGlobalData)

export { setGlobalData, getGlobalData }

// app.ux
<script>
  import './global'
  import util from './util'

  export default {
    showMenu: util.showMenu,
    createShortcut: util.createShortcut
  }
</script>
```

完成上述定义后，开发者即可在页面中使用`setGlobalData`和`getGlobalData`来定义和使用全局共享的函数。如下：

```javascript
// 页面文件 index1.ux
<script>
export default {
  function func1() {
    console.log(`invoke global function1`)
  }
  setGlobalData('func1', func1)
}
</script>

// 页面文件 index2.ux
<script>
export default {
  function func2() {
    getGlobalData('func1')()
  }
}
</script>
```

## 性能优化

性能优化包括两个大类

- 通用的解决方案，这类具有普适性
- 与具体组件结合的解决方案，如：组件级别的懒加载，甚至利用组件本身特性完成优化

建议开发者了解性能优化的常见方案，提升应用性能

### 简化`ViewModel`的数据

在`ViewModel`的定义中，属性`public`、`protected`、`private` 主要承担数据驱动的数据定义与改造功能，会对赋值的数据中每个属性进行递归式的定义。因此，属性个数的定义越少越好，尤其是数组类型数据，建议过滤不需要用到的对象属性

**示例如下：**

如果页面仅需要用到 list 中每个 item 的 userId, orderName 属性的话，则仅赋值这两个属性到`ViewModel`数据中，过滤掉非相关属性：

```javascript
// 模拟fetch请求返回的数据
const orderList = [
  {
    userId: '123',
    orderName: 'XX产品',
    userName: '张三',
    shoppingList: [
      {
        productId: '001',
        productLink: 'http://xxx',
        productShop: {
          ownerId: '2390',
          ownerName: 'XXX店铺'
        }
      }
    ]
  },
  {
    // ...
  }
]

export default {
  private: {
    list: []
  },
  onInit () {
    // 返回页面中需要的对象属性，过滤无用的对象属性
    this.list = orderList.map(item => {
      userId: item.userId,
      orderName: item.orderName
    })
  }
}
```

### 合理使用后代选择器

框架支持 CSS 中的后代选择、支持 less 预编译，方便开发者开发，提升代码可维护性。然而，过多的使用后代选择器，也会在节点匹配上带来性能损耗，尤其是当一个节点满足多个选择时

**优化建议如下：**

- 避免使用组件名称（tag 标签名称）作为后代选择的最后一项匹配规则，如： `.doc-page #shop text { ... }`；否则每个 text 组件渲染时都会遍历匹配一次
- 减少后代选择的层级数量，层级越深，单次匹配耗时越长，如：`.class1 .class2 .class3 .class4 .class5 .class6 { ... }`
- 后代选择中最后一条匹配规则的定义名称尽量唯一，如：`.doc-page #shop .shop-item .shop-name-full { ... }`

### 使用懒加载

懒加载是一项通用的优化手段，传统 H5 页面中的图片懒加载，指的是页面即将滚动到屏幕可视区域时，才加载资源，渲染页面

在框架中，也可以使用懒加载技术：为了加快页面可视区域的渲染，可以通过`指令`或者`事件触发`等手段推迟不可见区域的渲染

**例如：**

- list 组件中，不在屏幕之内的 list-item 可以在滑动时加载更多，完成渲染。详见文档[list 教程](../widgets/list-tutorial.md)
- tabs 组件中，非当前显示的页签内容，可以在用户点击页签时完成渲染（借助`if`指令控制`tab-content组件的子节点`）。详见文档[tabs 教程](../widgets/tabs-tutorial.md)

## 错误处理

在框架的开发中，一旦程序执行出错，就会报出 JS 异常。常见的一些错误有：

### 读取 undefined 上的属性

**场景举例：**

这是 JS 开发中常见的错误。对一个值为 null 或 undefined 的变量取属性就会报错。例如：

```xml
<!-- a = {}; -->
<text>{{ a.b.c }}</text>
<!-- Error: Cannot read property 'c' of undefined -->
```

**解决方案：**

1、&& 方法，通过逻辑运算的执行顺序来规避错误。代码如下：

```xml
<text>{{ a && a.b && a.b.c }}</text>
```

2、 在 ViewModel 上增加函数方法

推荐方案 2，在 ViewModel 上建立一个 `checkEmpty` 函数。示例代码如下：

```javascript
export default {
  checkEmpty(...args) {
    let ret
    if (args.length > 0) {
      ret = args.shift()
      let tmp
      while (ret && args.length > 0) {
        tmp = args.shift()
        ret = ret[tmp]
      }
    }
    return ret || false
  }
}
```

这样，就可以方便的调用了。

```xml
<text>{{checkEmpty(a, 'b', 'c')}}</text>
```

### JSON.parse()解析出错

**场景举例：**

代码执行 fetch 请求，请求返回的数据默认是 JSON 化的字符串了，开发者使用 JSON 对象解析，这是正常逻辑；

但是一旦遇到服务器端权限校验失败等问题时，会返回类似 503 的 HTML 页面，此时 JSON 解析肯定就会失败

**解决方案：**

1. 在每个 JSON.parse()的代码执行处进行 try-catch 包围，处理出错情况
2. 在 app.ux 中提前代理 JSON.parse()，使用 try-catch 包围，待异常出现时埋点数据，或者返回默认正常数据替代

推荐方案 2，示例代码如下：

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

### 回调函数中引用`ViewModel`数据报错

**场景举例：**

用户打开 PageA，然后点击链接打开 PageB，PageB 中执行接口方法（如 fetch 请求），然后立即返回到 PageA；此时接口的回调函数返回，但 PageB 已经出栈销毁，此时，执行开发者传递的回调函数报错

这是由于，回调函数中访问了一些`ViewModel`的数据等，而这些`ViewModel`的数据属性已经伴随着页面销毁而删除了，所以引起报错

报错信息为：`undefined:217: TypeError: Cannot read property 'xx' of null`

**解决方案：**

1. 在回调函数执行之前，通过`ViewModel`对象的`$valid`判断页面状态
2. 在`Function.prototype`上定义方法，关联到每个回调函数绑定`ViewModel`实例

推荐方案 2，示例代码如下：

```javascript
/**
 * 在Function原型上定义bindPage方法：将回调函数绑定到页面对象，页面销毁时，不执行回调函数
 */
export function bindPageLC() {
  Function.prototype.bindPage = function(vmInst) {
    const fn = this
    return function() {
      if (!vmInst) {
        throw new Error(`使用错误：请传递VM对象`)
      }
      if (vmInst.$valid) {
        return fn.apply(vmInst, arguments)
      } else {
        console.info(`页面销毁时，不执行回调函数`)
      }
    }
  }
}
```

在`${anyPage}.ux`中，通过`fn.bindPage(this)`，在回调函数上绑定`ViewModel`实例

```javascript
export default {
  private: {},
  request() {
    // 调用bindPage(this)返回：绑定了页面对象的回调函数，当页面销毁时，不执行回调函数
    fetch.fetch({
      success: function(ret) {
        // 数据操作等
      }.bindPage(this)
    })
  }
}
```

示例代码详见`Tutorial项目`中 app.ux 文件引入的：`util.js`

### 堆栈溢出问题

已知将通过 $element('id') 获取到内容，赋值给成员变量，可能会引发堆栈溢出（RangeError: Maximum call stack size exceeded），从而导致程序崩溃；同时，页面 DOM 存在成员变量(如 A )的引用，当该变量 A 发生变化时，即会引发堆栈溢出报错问题，示例代码如下：

```html
<template>
  <div id="content">
    <input type="button" class="button" @click="onTestClick" value="会引发堆栈溢出"/>
    <text>{{ stateText }}</text>
  </div>
</template>

<script>
  export default {
    private: {
      mContentNode: null,
      stateText: 'init state'
    },
    onReady() {
      /* 如将 $element('id')获取到内容，赋值给成员变量，则有可能引发堆栈溢出 */
      this.mContentNode = this.$element('content')
    },
    onTestClick() {
      /* 页面 DOM 存在成员变量的引用，当发生变化时，即是引发如上所述的一种必现方式 */
      this.stateText = 'new state'
    }
  }
</script>
```

这是因为赋值为 vm 属性，会触发大规模的数据驱动变化，导致内部出现异常循环，从而引发堆栈溢出报错，在未来版本中将会予以修复；

**解决方案：**

只要不将 $element('id') 获取到内容，赋值给成员变量，即可规避堆栈溢出问题；可以将其赋值给局部变量，或页面全局变量，示例代码如下：

```js
<script>
  let $gContentNode = null
  export default {
    private: {
      stateText: 'init state'
    },
    onReady() {
      /* 如将 $element('id')获取到内容，赋值给局部变量，或页面全局变量，则可规避堆栈溢出问题 */
      const cContentNode = this.$element('content')
      $gContentNode = this.$element('content')
    },
    onTestClick() {
      this.stateText = 'new state'
    }
  }
</script>
```

## 结构优化

结构优化的目的是减小页面以及整体 rpk 包的体积，减少冗余代码

常用的手段有以下几项：

### 整合常用 JS 库到 app.ux 中

在`app.ux`中引入常用的 JS 库，并暴露给每个页面使用；可以避免每个页面在打包时对 JS 的重复定义

## 总结

好的优化能够提升项目的可维护性，保证页面渲染的性能，减少不必要的代码耦合；建议开发者多多体会
