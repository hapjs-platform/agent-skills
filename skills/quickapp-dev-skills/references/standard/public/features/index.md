# 接口概述

## 类型

### 同步

同步接口立即返回调用结果

**示例：**

```javascript
console.log(JSON.stringify(app.getInfo()))
```

### 异步

异步接口不会立即返回调用结果，在异步接口任务完成后执行某些操作，可选择以下方式之一：

- 使用回调函数
- 使用 Promise `1010+`

#### 使用回调函数

开发者可以在调用异步接口的实参中传递相应的回调函数；回调函数会在接口任务完成时根据状态执行回调。任意回调函数最多执行一次

#### 异步接口支持的回调函数：

| 参数名   | 类型     | 说明                                                                                                       |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| success  | Function | 成功回调                                                                                                   |
| fail     | Function | 失败回调，返回错误信息和错误代码。若文档未特别说明，错误代码为 200。若返回其他错误代码，参见具体的接口文档 |
| cancel   | Function | 取消回调                                                                                                   |
| complete | Function | 执行结束后的回调                                                                                           |

其中，success、fail、cancel 三个回调函数是互斥的，每次接口调用会执行这三个回调函数中的一个，且仅执行一次；之后再调用 complete 回调函数一次

**示例：**

```javascript
prompt.showContextMenu({
  itemList: ['item1', 'item2'],
  itemColor: '#ff33ff',
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  cancel: function() {
    console.log('handling cancel')
  },
  complete: function() {
    console.log('handling complete')
  }
})
```

#### 使用 Promise `1010+`

支持调用异步接口返回 `Promise` 实例，开发者可以在返回的 `Promise` 实例上使用 `then`, `catch` 方法绑定回调函数

`Promise` 实例的状态是 **resolve（成功）**还是 **reject（失败）**，依赖于异步接口任务执行的结果。若任务成功，则 `Promise` 实例的状态为 `resolve`；否则，`Promise`实例的状态为 `reject`

**使用方法：**

只有在调用异步接口的实参中**不传递任何回调函数**时，才会返回一个 `Promise` 实例

若在调用异步接口的实参中，某个属性（如：success）的值为函数，则调用异步接口的返回值为 undefined，切换至上面介绍的`使用回调函数`模式

因此，在框架中不能同时`使用回调函数`和`使用Promise`

在 `Promise` 实例的 `then` 方法中，可传入两个参数：

- 第一个参数为 `resolve`（成功）的回调函数，对应异步接口支持的回调函数中的`success` 和 `callback`。参数的 data 属性为返回的数据
- 第二个参数为 `reject`（失败）的回调函数，对应异步接口支持的回调函数中的 `cancel` 或 `fail`。失败的回调函数的参数比成功的回调函数多一个 code 属性，用于判断具体状态。若 code 为 100，对应 cancel；若 code 大于或等于 200，对应 fail

**示例：**

```javascript
const promise = prompt.showContextMenu({
  itemList: ['item1', 'item2'],
  itemColor: '#ff33ff'
})
promise.then(
  res => {
    console.log(`异步接口返回的数据：${res.data}`)
  },
  res => {
    console.log(`异步接口返回的数据：${res.data}`)
    console.log(`异步接口返回的状态码：${res.code}`)
    if (res.code === 100) {
      // 对应异步接口支持的回调函数中的cancel
    } else if (res.code >= 200) {
      // 对应异步接口支持的回调函数中的fail
    }
  }
)
```

### 订阅

订阅接口不会立即返回调用结果，开发者需要在实参中传递相应的回调函数；回调函数会在接口任务完成时执行回调；由于是订阅类型，回调函数可能执行多次

**订阅接口支持的回调函数：**

| 参数名   | 类型     | 说明                                                                                                       |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | 回调，每次订阅的对象变化时，都会被执行                                                                     |
| fail     | Function | 失败回调，返回错误信息和错误代码。若文档未特别说明，错误代码为 200。若返回其他错误代码，参见具体的接口文档 |

以监听地理位置（geolocation.subscribe）为例：

- 调用 geolocation.subscribe 监听地理位置的改变，则每次地理位置发生改变，都会调用传入的 callback 回调，返回新的位置信息
- 若用户拒绝授予权限，会调用 fail 回调函数并结束接口调用，callback 回调函数永远不会被调用

**示例：**

```javascript
geolocation.subscribe({
  callback: function(data) {
    console.log(
      `handling success: longitude = ${data.longitude}, latitude = ${
        data.latitude
      }`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 使用接口的注意事项

### 接口为只读，不可覆盖

### 执行回调函数时判断页面状态

由于异步和订阅接口不会在调用后立即返回结果，而是一段时间后执行回调函数并携带返回结果作为参数；因此，执行回调函数时，调用接口的页面，会属于以下三种状态之一：

1. 显示中（用户正在阅读的页面）：`this.$valid && this.$visible`
2. 已隐藏（加载新页，导致页面被隐藏）：`this.$valid && !this.$visible`
3. 已销毁（退出当前页面，页面被销毁）：`!this.$valid && !this.$visible`

若执行回调函数时，调用接口的页面已隐藏或已销毁，则存在以下问题：

- 若页面已隐藏，在回调函数中更新 ViewModel 中的数据，会驱动页面视图更新，无意义的降低性能；建议在回调函数中缓存数据，当页面再次进入显示状态时，再更新 ViewModel 中的数据
- 若页面已销毁，页面中的 ViewModel 也会销毁，在回调函数中更新 ViewModel 中的数据可能会引起报错；建议在回调函数中先判断页面状态，若页面已被销毁，则直接退出

提示：关于页面状态`$valid`、`$visible`，参见[script 脚本](../framework/script.md)

**示例：**

```javascript
geolocation.getLocation({
  success: function(data) {
    if (this.$valid && this.$visible) {
      // 页面仍在显示中
    } else if (this.$valid && !this.$visible) {
      // 页面已隐藏
    } else {
      // 页面已销毁
    }
  }.bind(this),
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### 取消无意义的订阅

订阅接口的回调函数可能会被多次调用。若页面已隐藏或已销毁，仍继续订阅，既会影响框架的响应速度，也会造成内存泄露。因此，建议在页面被销毁后取消订阅

在页面销毁后取消订阅有以下两种方式：

- 方式一：在页面生命周期 onDestroy 中取消订阅
- 方式二：在订阅接口的回调函数中，先判断页面状态，若页面已被销毁，取消订阅

**示例：**

```javascript
export default {
  onDestroy() {
    // 方式一：在页面生命周期onDestroy中取消订阅
    geolocation.unsubscribe()
  },
  onReady() {
    // 订阅，监听地理位置
    geolocation.subscribe({
      callback: function(data) {
        // 方式二：在订阅接口的回调函数中，先判断页面状态，若页面已被销毁，取消订阅
        if (!this.$valid) {
          geolocation.unsubscribe()
        }
        console.log(
          `handling success: longitude = ${data.longitude}, latitude = ${
            data.latitude
          }`
        )
      }.bind(this),
      fail: function(data, code) {
        console.log(`handling fail, code = ${code}`)
      }
    })
  }
}
```

注：若在应用生命周期中调用订阅接口，只要应用仍然在运行，订阅都是有效的；建议当不再需要订阅时，主动取消订阅

## 权限控制

部分接口因为涉及到安全和隐私问题，增加了权限控制，调用时会出现用户授权弹窗，待用户授权后才能继续执行。
权限控制有两种模式，一种是每次调用都需要授权，一种是授权后记住保存状态，下次调用不再需要重复授权。

## <span id="code"> 常见错误代码

| 代码 | 含义       |
| ---- | ---------- |
| 200  | 一般性错误 |
| 201  | 用户拒绝   |
| 202  | 参数非法   |
| 203  | 服务不可用 |
| 204  | 请求超时   |
