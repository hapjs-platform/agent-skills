# 打开网页 webview

## 接口声明

```json
{ "name": "system.webview" }
```

## 导入模块

```javascript
import webview from '@system.webview' 或 const webview = require('@system.webview')
```

## 接口定义

### webview.loadUrl(OBJECT)

打开网页，标题栏样式与打开 webview 的页面的标题栏样式相同，在 webview 的 useragent 后追加内容，格式是 hap/<平台版本号>/<厂商标识> <平台应用包名>/<平台应用版本号> <应用名>/<应用版本号> (<来源信息>)。“来源信息”与 app 接口的 getInfo 方法返回结果中的 source 字段相同。

#### 参数：

| 参数名                         | 类型    | 必填 | 说明                                                                                                                                            |
| ------------------------------ | ------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| url                            | String  | 是   | 要加载的页面 url                                                                                                                                |
| allowthirdpartycookies `1030+` | Boolean | 否   | 是否支持第三方 cookies，设置为 true 时开启接收第三方 cookies。 **注意**：`allowthirdpartycookies`只支持安卓 5.0 及以上系统。5.0 以下默认为 true |
| showloadingdialog  `1070+`| Boolean | 否 | 是否展示默认加载框，默认值是 false |
| useragent  `1091+`        | String | 否   | 设置web组件的userAgent，默认使用快应用的UA。<br>- 设置为system，表示使用系统默认UA。<br>- 设置其他字符串属于自定义UA。<br>- 不设置此字段或者传入空值，使用默认快应用UA。|

#### 示例：

```javascript
webview.loadUrl({
  url: 'http://www.example.com',
  allowthirdpartycookies: true
})
```
### webview.setCookie(OBJECT) `1100+`

设置WebView的Cookie信息。

#### 参数：

| 参数名 | 类型    | 必填 | 说明 |
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

#### 示例：

```javascript
webview.setCookie({
  domain: '127.0.0.1',
  name: 'cookieName',
  value: 'cookieVaule',
  maxAge: 3000,
  path: '/',
  success: function() {
    console.log('success')
  },
  fail: function(e) {
    console.log('fail')
  }
})
```

## WebView 内部 API

在 webview 打开的网页中可以使用的 api

### system.go(path)

跳转到当前应用的指定页面

#### 参数：

| 参数名 | 类型   | 必填 | 说明                                                                                                       |
| ------ | ------ | ---- | ---------------------------------------------------------------------------------------------------------- |
| path   | String | 是   | 要跳转的页面，例:/detail?param1=value1 特殊的,如果 path 的值是"/",则跳转到 path 为"/"的页,没有则跳转到首页 |

#### 示例：

```javascript
system.go('/detail?param1=value1')
```

## 在WebView通过deeplink打开快应用 `1060+`
在webview打开的网页中，支持通过deeplink打开快应用，deeplink支持的格式参见[deeplink](/tutorial/platform/deeplink.md)
#### 示例：
```javascript
location.href='hap://app/org.hapjs.demo.sample/page?key=value'
location.href='http://hapjs.org/app/org.hapjs.demo.sample/page?key=value'
location.href='https://hapjs.org/app/org.hapjs.demo.sample/page?key=value'
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
