# web

## 概述

用于显示在线的 html 页面，在 webview 的 useragent 后追加内容，格式是 hap/<平台版本号>/<厂商标识> <平台应用包名>/<平台应用版本号> <应用名>/<应用版本号> (<来源信息>)。“来源信息”与 app 接口的 getInfo 方法返回结果中的 source 字段相同。

使用 web 组件，必须声明"[打开网页](../features/system/webview.md)"接口，否则会提示缺乏权限。

`1010+` 支持上传文件，不支持多选。
`1020+` 支持下载文件。
`1040+` 支持定位。

由于各厂商系统 webview 已不再支持非安全域的 web 定位请求，为保证定位成功率和精度，请尽快升级您的站点到 HTTPS。

`1040+`  支持 h5 页面中 input 标签的拍照、录视频、录音频以及音频、视频、图片文件选择。

accept 字段内容（audio/*  表示音频  ， video/*  表示视频 ，image/\*  表示图片 或者其他有效 MIME 类型）。

`1090+`  支持 h5 页面中 input 标签的capture属性。

## 子组件

不支持

## 属性

| 名称                           | 类型        | 默认值 | 必填 | 描述                                                                                                                                            |
| ------------------------------ | ----------- | ------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| src                            | `<string>`  | -      | 否   | 需要加载的页面地址                                                                                                                              |
| trustedurl `1020+`             | `<array>`   | -      | 否   | 可信任的网址，支持正则表达式。只有 trustedurl 中链接或者 src 链接的网页可以和框架进行双向通信                                                   |
| allowthirdpartycookies `1030+` | `<boolean>` | false  | 否   | 是否支持第三方 cookies，设置为 true 时开启接收第三方 cookies。 **注意**：`allowthirdpartycookies`只支持安卓 5.0 及以上系统。5.0 以下默认为 true |
| showloadingdialog `1070+`      | `<boolean>` | false   | 否   | 是否展示默认加载框                                                                                                                              |
| supportzoom `1070+`            | `<boolean>` | true   | 否   | 网页是否支持放大缩小                                                                                                                            |
| useragent  `1091+`            | `<string>` | default   | 否   | 设置web组件的userAgent，默认使用快应用的UA。<br>- 设置为system，表示使用系统默认UA。<br>- 设置其他字符串属于自定义UA。<br>- 不设置此字段或者传入空值，使用默认快应用UA。|
| intercepturl `1200+`           | `<array>`   | -      | 否   | 配置拦截页面内跳转的网址，支持正则表达式。                          |

## 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/media/web/index.ux)

## 事件

支持[通用事件](common-events.md)

| 名称             | 参数                                                          | 描述                       |
| ---------------- | :------------------------------------------------------------ | -------------------------- |
| pagestart        | {url: urlString, canBack: true/false `1080+`, canForward: true/false `1080+`}            | 开始加载网页时触发，参数详情说明如下         |
| pagefinish       | {url: urlString, canBack: true/false, canForward: true/false} | 网页加载完成时触发         |
| titlereceive     | {title: title}                                                | 收到网页标题时触发         |
| error            | {errorMsg: errorMsg, url: urlString `1080+`, canBack: true/false `1080+`, canForward: true/false `1080+`,<br>errorType: typeInteger `1080+`, code:codeInteger `1080+`, description: descriptionString `1080+`, isAuthorized: true/false `1080+`}           | 网页加载出现错误时触发，参数详情说明如下  |
| message `1020+`  | {message: messageString, url: urlString}                      | 接收到网页发来的消息时触发 |
| progress `1070+` | {progress: progressValue}                                     | 当前进度，范围 0~100       |
| intercepturl `1200+` | {url: urlString}                                          | 当拦截到intercepturl属性配置的跳转网址时触发          |

### pagestart事件新增返回参数 `1080+`:
| 参数       | 返回值类型 | 描述             |
| ---------- | ---------- | ---------------- |
| canBack    | Boolean    | 是否可以向后浏览 |
| canForward | Boolean    | 是否可以向前浏览 |

### error事件新增返回参数 `1080+`:
| 参数       | 返回值类型 | 描述             |
| ---------- | ---------- | ---------------- |
| url        | String    | webview加载资源出错时，当前访问资源的链接地址 |
| canBack    | Boolean    | webview加载资源出错时，当前webview是否可以向后浏览 |
| canForward | Boolean    | webview加载资源出错时，当前webview是否可以向前浏览 |
| errorType  | Integer    | webview加载资源出错时，当前错误的所属类型：<br>0：通用错误<br>1：http错误<br>2：证书错误 |
| code       | Integer    | webview加载资源出错时，当前返回的错误码，例如：404，500等 |
| description | String    | webview加载资源出错时，当前的错误信息描述 |
| isAuthorized | Boolean    | webview加载资源出错时，当前的异常域名是否已经授权`（默认值为false，主要用于证书错误）` |

## 方法

| 名称                | 参数                     | 描述                       |
| ------------------- | ------------------------ | -------------------------- |
| reload              |                          | 重新加载页面               |
| forward             |                          | 浏览历史页面中的前一个页面 |
| back                |                          | 浏览历史页面中的后一个页面 |
| canForward          | {callback: Function}     | 是否可以向前浏览           |
| canBack             | {callback: Function}     | 是否可以向后浏览           |
| postMessage `1020+` | {message: messageString, success: Function `1100+`, fail: Function `1100+`} | 向网页发送消息|
| isSupportWebRTC `1080+`| {callback: Function}  | 是否支持webrtc功能         |
| setCookie  `1100+`| {domain: domainString, name: nameString, value: valueString, path: pathString, expries:expriesString, maxAge: maxAgeInt, extra: extraString, success: Function, fail: Function}  | 设置本地Cookie         |

### canForward 回调函数返回参数：

| 参数       | 返回值类型 | 描述             |
| ---------- | ---------- | ---------------- |
| canForward | Boolean    | 是否可以向前浏览 |

### canBack 回调函数返回参数：

| 参数    | 返回值类型 | 描述             |
| ------- | ---------- | ---------------- |
| canBack | Boolean    | 是否可以向后浏览 |

### postMessage 的参数说明：
| 名称 | 类型 | 是否必选| 描述 |
| --- | ---- | ------- | ----- |
| message `1020+`| string | 是 | 向网页发送的信息 |
| success `1100+`| Function | 否 | 发送成功回调 |
| fail    `1100+`| Function | 否 | 发送失败回调 |

### isSupportWebRTC 回调函数返回参数 `1080+`：
| 参数    | 返回值类型 | 描述             |
| ------- | ---------- | ---------------- |
| isSupportWebRTC | Boolean    | 是否支持webrtc功能 |

### setCookie 的参数说明 `1100+`：
| 名称    | 类型 | 是否必填| 描述             |
| -------| --------- |----- | --------------- |
| domain | string    |  是  | cookie设置的域名 |
| name | string    |  是  | cookie的名称 |
| value | string    |  否  | cookie的值 |
| path | string    |  否  | cookie的路径，默认为/ |
| expires | string    |  否  | cookie的过期时间，时间格式必须是GMT时间格式 |
| maxAge | string    |  否  | cookie的过期时间，单位为：秒。maxAge优先级高于expires |
| extra | string    |  否  | cookie其它额外信息 |
| success | Function    |  否  | 调用成功的回调函数 |
| fail | Function    |  否  | 调用失败的回调函数 |

### 示例：

```html
<web id="web" src="http://www.example.com/"></web>
```

```javascript
onBackPress () {
  this.$element('web').canBack({
    callback: function (e) {
      if (e) {
        // 加载历史列表中的上一个 URL
        this.$element('web').back()
      } else {
        router.back()
      }
    }.bind(this)
  })
  // 阻止默认行为，等待异步操作
  return true
}
```

## 内部 API

在 web 打开的网页中可以使用的事件和方法

### 事件

| 名称                     | 参数       | 描述                       |
| ------------------------ | ---------- | -------------------------- |
| system.onmessage `1020+` | `<string>` | 收到快应用发送的消息时触发 |

### 方法

| 名称                       | 参数       | 描述             |
| -------------------------- | ---------- | ---------------- |
| system.postMessage `1020+` | `<string>` | 发送消息到快应用 |

#### 示例

```javascript
system.onmessage = function(data) {
  console.log('message received: ' + data)
}
system.postMessage('hello')
```

## 相关接口
在 web 打开的网页中仅支持以下JSSDK接口：

| 名称                     | 参数       | 描述                       |
| ------------------------ | ---------- | -------------------------- |
| getEnv `1100+` | { data:{quickapp:Boolean} }| 检测是否在快应用环境 |
| scan `1100+` | { scanType:int, success:Function, fail:Function, cancel:Function, complete:Function }|快应用扫一扫|

### 示例

```javascript
window.hap.getEnv(data => {
  console.log(data.quickapp)
})

window.hap.scan({
  scanType: 0, success: (data) => {
    console.log(`handling success: ${data.result}`)
  }, fail: (data, code) => {
    console.log(`handling fail, code = ${code}`)
  }, cancel: () => {
    console.log('cancel')
  }, complete: () => {
    console.log('complete')
  }
})
```

## web &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/media/web/detail/index.ux)
