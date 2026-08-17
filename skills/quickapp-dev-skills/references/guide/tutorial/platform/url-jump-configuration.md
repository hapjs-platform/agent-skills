# URL 跳转配置 `Deprecated`

`注：快应用联盟不再推荐使用该方式跳转快应用，后续将考虑关闭该跳转方式。如需在 H5 页中接入跳转快应用能力，请参考：`[H5 点击组件](./jump-component.md)

URL 跳转配置是指在 H5 页面中可以通过调用接口跳转到应用。

## 接入方式

使用本功能，需要在网页中嵌入以下 js，支持 HTTP 与 HTTPS 访问。

```xml
<script type="text/javascript" src="//statres.quickapp.cn/quickapp/js/routerinline.min.js"></script>
```

注意：appRouter 和 channelReady 方法需要在 body 标签内调用，不支持在 head 标签里调用。（直接调用或引入外部 JS 文件调用均可）

## 调起应用

appRouter(packageName, path, params, confirm)

### 参数：

| 参数名      | 类型   | 必填 | 说明                                                                                                                                                                                                                                                                                                                |
| ----------- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| packageName | String | 是   | 配置跳转快应用的包名，包名和 manifest.json 的"package"属性保持一致。                                                                                                                                                                                                                                                |
| path        | String | 否   | 配置跳转的页面路径，对应 manifest.json 中 router 下 page 的 path 字段。<br>如果不传 path 值或 path 值为空字符串，跳转时会打开首页 <br> 详情请参见[manifest 文档](https://doc.quickapp.cn/framework/manifest.html)的"router.page"一节                                                                                |
| params      | Object | 否   | 配置透传给快应用页面的参数。<br>如果不传 params，会默认使用当前加载此 appRouter 函数的网页 url 的参数值作为 params 的值。<br>通过 params 传入的参数值，会赋值到当前快应用页面的 public 同名字段 <br> 详情请参见[deeplink 文档](https://doc.quickapp.cn/tutorial/platform/deeplink.html)中"快应用获取 key-value"一节 |
| confirm     | String | 否   | 配置在跳转确认弹窗中显示的文案。<br>当 confirm 值被框架转换为 Boolean 类型，且结果值为 false 时，如 confirm 值为空字符串、undefined、null 等，表示无需用户确认直接跳转；否则，表示跳转时需要用户确认，且弹框显示 confirm 文案。                                                                                     |

### 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>URL跳转配置</title>
    <script
      type="text/javascript"
      src="//statres.quickapp.cn/quickapp/js/routerinline.min.js"
    ></script>
  </head>
  <body>
    <!-- 调起应用 -->
    <script type="text/javascript">
      // 需要在body标签里实现 appRouter 方法的调用
      // 通过script标签引入routerinline.min.js后， appRouter函数会绑定到window上，因为是全局函数，所以可直接引用
      // *** 注意 *** 此处 appRouter 两个示例选"其中一个"拷贝运行，即可查看效果

      // 无需用户确认的调用方式，只传入三个参数
      // 包名格式为 'xxx.yyy.zzz'，包名和 manifest.json 的"package"属性保持一致。
      // 路径格式为 'aa/bb/cc'， 对应 manifest.json 中 router 下 page 的 path 字段。
      // 透传参数类型为对象，快应用页面可通过 public 属性获取
      appRouter('xxx.yyy.zzz',
                   'Home/Video',
                   { a: 2, b: 'efg' })

      // 需要用户确认的调用方式，需传入四个参数
      // appRouter 第4个参数填入需要显示的文案
      appRouter('xxx.yyy.zzz',
                'Home/Audio',
                { a: 1, b: 'abc' },
                'Quick App Demo')

    </script>
  </body>
</html>
```

### 支持明细

| 厂商   | 支持版本 | 备注                                      |
| ------ | -------- | ----------------------------------------- |
| 小米   | 1000+    | -                                         |
| 中兴   | -        | -                                         |
| 华为   | 1010+    | 需 EMUI 8.2+；<br>暂不支持 `confirm` 参数 |
| 金立   | -        | -                                         |
| 联想   | -        | -                                         |
| 魅族   | -        | -                                         |
| 努比亚 | 1000+    | -                                         |
| OPPO   | 1000+    | 需 ColorOS 2.1 以上支持                   |
| vivo   | 1000+    | -                                         |
| 一加   | 1040+    | 需 Android 10+ 支持                       |
| 海信   | 1030 　  | -                                         |

## 检测平台是否支持服务

channelReady(callback)

### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                |
| -------- | -------- | ---- | ----------------------------------------------------------------------------------- |
| callback | function | 是   | 平台上快应用能力检测的回调函数，如支持快应用服务则返回 true 值，否则则返回 false 值 |

### 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <title>URL跳转配置</title>
    <script
      type="text/javascript"
      src="//statres.quickapp.cn/quickapp/js/routerinline.min.js"
    ></script>
  </head>
  <body>
    <!-- 检测平台是否支持服务 -->
    <script type="text/javascript">
      // 需要在body标签里实现 channelReady 方法的调用
      // 通过script标签引入routerinline.min.js后， channelReady函数会绑定到window上，因为是全局函数，所以可直接引用
      // 通过传递回调函数获取结果，平台支持快应用则返回true，不支持则返回false
      channelReady(function(bAvailable) {
        alert('是否存在框架服务：' + bAvailable)
      })
    </script>
  </body>
</html>
```

### 支持明细

| 厂商   | 支持版本 | 备注                                           |
| ------ | -------- | ---------------------------------------------- |
| 小米   | 1000+    | 需 MIUI 稳定版 v9.5+ 或 开发版 8.2+            |
| 中兴   | -        | -                                              |
| 华为   | -        | 华为暂不支持能力检测，所有安卓设备 channelReady  都会返回  true  值，并且不是所有设备都支持网页跳转，所以请开发者务必作好 fallback，在跳转不能正常的情况下，H5 页面能够继续为用户提供服务。（注：非麒麟芯片的华为手机均不支持网页跳转） |
| 金立   | -        | -                                              |
| 联想   | -        | -                                              |
| 魅族   | -        | -                                              |
| 努比亚 | -        | -                                              |
| OPPO   | 1000+    | 需 ColorOS 2.1 以上支持                        |
| vivo   | 1000+    | 需 Android 8.0 及以上机型支持                  |
| 一加   | 1040+    | 需 Android 10+ 支持                            |
| 海信   | 1030 　  | -                                              |

## 快应用码

`快应用码`，是快应用`官方提供`的跳转快应用的页面，集成了上述的 url 跳转配置，方便开发者在不部署 web 页面时，也能有跳转快应用的入口

平时一般以二维码的方式传播分享，故称为`快应用码`

### 地址格式

与`deeplink`一节的 https 链接格式保持一致： `https://hapjs.org/app/<package>/[path][?key=value]`，

- package: 应用包名，必选
- path: 应用内页面的 path，可选，默认为首页
- key-value: 希望传给页面的参数，可选，可以有多个

### 如何生成快应用码

生成快应用码有三种方法：

1. 通过快应用的[app.createQuickAppQRCode](https://doc.quickapp.cn/features/system/app.html#appcreatequickappqrcode-1070) 方法在快应用内生成快应用码

2. 通过开发者后台的`快应用码`页配置

3. 根据[地址格式](#地址格式) 一节，开发者可以自己组合快应用码跳转地址，实现指定配置项的跳转快应用功能

**注意：**

目前联盟不提供接口查询本手机是否支持网页跳转快应用的能力，所以请开发者务必做好fallback，确保在跳转不正常的情况下，仍然有合适的H5页面为用户提供服务。
