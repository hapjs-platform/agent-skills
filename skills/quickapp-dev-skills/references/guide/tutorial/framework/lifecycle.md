# 生命周期

> 了解页面的生命周期与状态，APP 的生命周期

通过本节，你将学会：

- [页面的生命周期：](#页面的生命周期)`onInit`、`onReady`、`onShow`、`onHide`、`onDestroy`、`onBackPress`、`onMenuPress`、`onRefresh(1050+)`、`onConfigurationChanged(1060+)`、`onReachTop(1080+)`、`onReachBottom(1080+)`、`onPageScroll(1080+)`
- [页面的状态：](#页面的状态)`显示`、`隐藏`、`销毁`
- [APP 的生命周期：](#APP-的生命周期)`onCreate`、`onRequest`、`onIntentExecute`、`onShow`、`onHide`、`onDestroy`、`onError`、`onPageNotFound`

注意：生命周期的说明也可以参考这篇[文档](../../framework/script.md#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%8E%A5%E5%8F%A3)

## 生命周期图

## 页面的生命周期

由于页面通过`ViewModel`渲染，那么页面的生命周期指的也就是`ViewModel`的生命周期，包括常见的：onInit, onReady, onShow 在**页面创建**时触发调用

### onInit()

**表示`ViewModel`的数据已经准备好**，可以开始使用页面中的数据

**示例如下：**

```javascript
private: {
  // 生命周期的文本列表
  lcList: []
},
onInit () {
  this.$page.setTitleBar({ text: '生命周期' })

  this.lcList.push('onInit')

  console.info(`触发：onInit`)
  console.info(`执行：获取ViewModel的lcList属性：${this.lcList}`)   // 执行：获取ViewModel的lcList属性：onInit
  // $app信息
  console.info(`获取：manifest.json的config.data的数据：${this.$app.$data.name}`)
  console.info(`获取：APP文件中的数据：${this.$app.$def.data1.name}`)
  console.info(`执行：APP文件中的方法`, this.$app.$def.method1())
}
```

### onReady()

**表示`ViewModel`的模板已经编译完成**，可以开始获取 DOM 节点（如：`this.$element(idxxx)`）

**示例如下：**

```javascript
onReady () {
  this.lcList.push('onReady')

  console.info(`触发：onReady`)
  console.info(`执行：获取模板节点：${this.$rootElement()}`)   // 执行：获取模板节点：<div attr={} style={"flexDirection":"column"}>...</div>
}
```

### onShow(), onHide()

APP 中可以同时运行多个页面，但是**每次只能显示其中一个页面**；这点不同与纯前端开发，浏览器页面中每次只能有一个页面，当前页签打开另一个页面，上个页面就销毁了；不过和 SPA 开发倒有点相似，切换页面但浏览器全局 Context 是共享的

所以页面的切换，就产生了新的事件：页面被切换隐藏时调用 onHide()，页面被切换重新显示时调用 onShow()

判断页面的显示状态，可以调用`ViewModel`的`$visible`属性：`true`表示显示，`false`表示隐藏

**示例如下：**

```javascript
onShow () {
  this.lcList.push('onShow')

  console.info(`触发：onShow`)
  console.info(`执行：获取页面显示状态属性：${this.$visible}`)  // true
},
onHide () {
  this.lcList.push('onHide')

  console.info(`触发：onHide`)
  console.info(`执行：获取页面显示状态属性：${this.$visible}`)  // false
}
```

### onDestroy()

页面被销毁时调用，例如用户从当前页面返回到上一页

所以，页面销毁时应该做一些**释放资源**的操作，如：取消接口订阅监听`geolocation.unsubscribe()`

判断页面是否处于被销毁状态，可以调用`ViewModel`的`$valid`属性：`true`表示存在，`false`表示销毁

**示例如下：**

```javascript
onDestroy () {
  console.info(`触发：onDestroy`)
  console.info(`执行：页面要被销毁，销毁状态：${this.$valid}，应该做取消接口订阅监听的操作: geolocation.unsubscribe()`)    // true，即将销毁
  setTimeout(function () {
    console.info(`执行：页面已被销毁，不会执行`)                // 页面已销毁，不会执行
  }.bind(this), 0)
}
```

**提示：**

- 在`onDestroy()`中判断`$valid`没有意义，因为页面即将被销毁；如果在本页面之外持有该`ViewModel`的引用则可以通过`$valid`判断页面状态
- `setTimeout`之类的异步操作绑定在了当前页面上，因此当页面销毁之后异步调用不会执行

### onBackPress()

当用户点击`返回实体按键`、`左上角返回菜单`时触发该事件

如果事件响应方法最后返回`true`表示不返回，自己处理业务逻辑（完毕后开发者自行调用 API 返回）；否则：不返回数据，或者返回其它数据：表示遵循系统逻辑：返回到上一页

vivo快应用不支持此生命周期

**示例如下：**

```javascript
onBackPress () {
  console.info(`触发：onBackPress`)
  // true：表示自己处理；否则默认返回上一页
  // return true
}
```

### onMenuPress()

在 1070 以前的版本，当同时满足当前页面的`manifest.json`中的`menu`值为 true 与`titleBar`值为 true 时，此时屏幕顶部的标题栏会显示右侧的菜单按钮，点击此按钮会触发`onMenuPress`回调

1070 版本开始，快应用推出了新的`menuBar`胶囊按钮的交互形式，取代了之前标题栏右侧菜单按钮的按钮交互。当`manifest.json`中的`menu`值为 true 时，点击`menuBar`的左侧按钮，也会触发`onMenuPress`回调，详见[menuBar 文档](../../framework/manifest.md#menubardata-1070)

**注意：** 若`onMenuPress`回调在当前页面被实现了，且符合上述触发`onMenuPress`回调的条件，点击`menu`或`menubar`的**系统**弹窗逻辑就会**被拦截不触发**

OPPO快应用暂不支持此生命周期

**示例如下：**

```javascript
// 只要实现了此回调，就会拦截当前页面的menu或menubar的系统弹窗逻辑
onMenuPress(){
  prompt.showToast({
    message: `我拦截了menu点击`
  })
}
```

### onRefresh(query) `1050+`

监听页面重新打开。详细说明请参考[文档](https://doc.quickapp.cn/framework/script.html?h=onRefresh)

1.当页面在 manifest 中 launchMode`1050+` 标识为'singleTask'时，仅会存在一个目标页面实例，用户多次打开目标页面时触发此函数。<br/>2.打开目标页面时在 push 参数中携带 flag 'clearTask'，且页面实例已经存在时触发。<br/>该回调中参数为重新打开该页面时携带的参数。<br/>详见[页面启动模式](../../framework/launch-mode.md)

**示例如下：**

```javascript
onRefresh(query) {
  // launchMode 为 singleTask 时，重新打开页面时携带的参数不会自动更新到页面 this 对象上
  // 需要在此处从 query 中拿到并手动更新
  console.log('page refreshed!!!')
}
```

### onConfigurationChanged(event) `1060+`

监听应用配置发生变化。当应用配置发生变化时触发，如系统语言或主题模式改变，详细说明请参考[文档](https://doc.quickapp.cn/framework/script.html?h=onConfigurationChanged)

```javascript
onConfigurationChanged(evt) {
  console.log(`触发生命周期onConfigurationChanged, 配置类型：${evt.type}`)
}
```

### onReachTop() `1080+`

监听页面是否触顶

**示例如下：**

```javascript
onReachTop() {
  console.log('页面到底顶部')
}
```

### onReachBottom() `1080+`

监听页面是否触底

**示例如下：**

```javascript
onReachBottom() {
  console.log('页面到底底部')
}
```

### onPageScroll(event) `1080+`

监听页面滚动

**示例如下：**

```javascript
onPageScroll(evt) {
  console.log(`页面滚动距离：${evt.scrollTop}`)
}
```

## 页面的状态

如上所述，APP 中允许多个页面同时存在并运行，但当前仅显示其中一个，因此每个页面就会处于多个状态的一个状态

1. **显示**：该页面就是当前 APP 正在显示的页面，用`$visible`判断
2. **隐藏**：该页面上打开新页面后，该页面被隐藏，用`$visible`判断
3. **销毁**：该页面因某原因销毁后，就不会再执行里面的代码，用`$valid`判断

关于接口调用与页面的生命周期与状态，详见文档[script 脚本](../../framework/script.md)

## APP 的生命周期

当前为 APP 的生命周期提供了八个回调函数：onCreate()、onRequest()`1070+`、onIntentExecute()、onShow()`1070+`、onHide()`1070+`、onDestroy()、onError()`1030+`、onPageNotFound()`1060+`，可在`app.ux`中定义回调函数，[详情及参数](https://doc.quickapp.cn/framework/script.html#%E5%BA%94%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

**示例如下：**

```javascript
export default {
  onCreate() {
    console.info('Application onCreate')
  },
  onRequest() {
    console.info('Application onRequest')
  },
  onIntentExecute(intelligentIntent) {
    console.info('Application onIntentExecute')
    console.info('intelligentIntent', intelligentIntent)
  },
  onShow() {
    console.info('Application onShow')
  },
  onHide() {
    console.info('Application onHide')
  },
  onDestroy() {
    console.info('Application onDestroy')
  },
  onError() {
    console.log('Application onError')
  },
  onPageNotFound(params) {
    const { uri = '' } = params
    console.error('error uri', uri)
  },
  // 暴露给所有页面，在页面中通过：this.$app.$def.method1()访问
  method1() {
    console.info('这是APP的方法')
  },
  // 暴露给所有页面，在页面中通过：this.$app.$def.data1访问
  data1: {
    name: '这是APP存的数据'
  }
}
```

在`app.ux`中，开发者可以做一些独立于页面的操作。比如：引入公共的 JS 资源，然后暴露给所有页面

在`app.ux`中，通过`this.$def`访问`app.ux`中定义的数据和方法

**示例如下：**

```javascript
console.info(`获取：APP文件中的数据：${this.$def.data1.name}`)
console.info(`执行：APP文件中的方法`, this.$def.method1())
console.info(`获取：manifest.json的应用名称：${this.$def.manifest.name}`)
console.info(`获取：manifest.json的config.data的数据：${this.$data.name}`)
```

在`pageName.ux`中，通过`this.$app.$def`访问`app.ux`中定义的数据和方法

**示例如下：**

```javascript
console.info(`获取：APP文件中的数据：${this.$app.$def.data1.name}`)
console.info(`执行：APP文件中的方法`, this.$app.$def.method1())
console.info(`获取：manifest.json的应用名称：${this.$app.$def.manifest.name}`)
console.info(`获取：manifest.json的config.data的数据：${this.$app.$data.name}`)
```

### 关于$app 与$app.\$def

$app 与$app.$def（后面简称$def）是两个不同的对象；

前者代表框架为开发者暴露提供的 APP 对象；后者代表开发者在 app.ux 中导出的对象，放置业务相关的全局**数据**和方法；

初学开发者可以跳过该块学习，待后期深入了解；

前者对象拥有 onCreate, onDestroy 生命周期；当应用启动时会执行 onCreate 方法，里面执行 this.variable1 的赋值是在\$app 对象上；

后者对象中的 onCreate, onDestroy 方法并不会执行，作用仅仅只是把方法复制到前者对象上而已；

这些全局方法在页面中：既可以通过 this.$app.method1()调用，也可以通过 this.$app.$def.method1()调用；不同之处在于前者可以取到之前赋值的 variable1 变量，而后者不可以取到（因为之前的赋值是在$app 对象上执行的）；

## 总结

理解页面与 APP 的生命周期，有助于更好的组织页面的业务逻辑，方便页面之间的交互与资源释放等的处理
