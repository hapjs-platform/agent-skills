# 微信支付 wxpay

## 接口声明

```json
{
  "name": "service.wxpay",
  "params": {
    "package": "com.your.package",
    "sign": "abcdefg",
    "url": "http://your.domain/page"
  }
}
```

### manifest 参数说明

微信支付有 app 支付和网页支付两种方式，不同厂商的不同设备可能会支持其中的一种或者两种。为了提升用户体验和兼容不同厂商的设备，建议同时实现这两种方式。如果只想实现其中的一种，请勿配置另外一种支付方式的参数。同时配置两种参数，并且设备都支持的情况下，默认会选择 app 支付。

从 1040 版本开始，网页支付将支持直接设置 referer 方式，此方式不再需要实现中间页。原先需要实现中间页跳转的方式还会继续支持。直接设置 referer 方式需要在 pay 接口中设置 referer 参数，pay 接口的 extra 参数中必须配置 mweb_url，详见下述参数说明。

厂商实现详见“支持版本明细”。

#### app 支付

| 参数    | 说明                                                                                            |
| ------- | ----------------------------------------------------------------------------------------------- |
| package | 微信支付后台中注册的应用包名，需要和 rpk 中的包名保持一致                                       |
| sign    | 微信支付后台注册时提交的 apk 的签名的 Base64 编码，该 apk 签名证书需要和 rpk 的签名证书保持一致 |

#### 网页支付

| 参数 | 说明                                                                                                                     |
| ---- | ------------------------------------------------------------------------------------------------------------------------ |
| url  | 由开发者提供的 H5 页面，开发者需要在该页面中拉起微信网页支付。当调用微信网页支付接口时，系统会加载该页面，并传入订单信息 |

## 导入模块

```javascript
import wxpay from '@service.wxpay' 或 const wxpay = require('@service.wxpay')
```

## 接口定义

### wxpay.getType()

获取当前可用的微信支付调用方式

#### 参数：

无

#### 返回值：

| 返回值 | 备注                                                                                                                                                  |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| APP    | 微信 app 调用方式，服务端向微信支付下单时，trade_type 需要是 APP，参考[微信 app 支付](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1) |
| MWEB   | 微信网页调用方式，服务端向微信支付下单时，trade_type 需要是 MWEB，参考[微信网页支付](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20)      |
| none   | 微信未安装                                                                                                                                            |

**注意：**在 `getType` 返回值为 `APP` 时，开发者将只能使用 app 方式，不能使用网页方式。

### wxpay.pay(OBJECT)

发起微信支付

#### 参数：

| 参数名          | 类型     | 必填 | 说明                                                                                                                                                                                               |
| --------------- | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prepayid        | String   | 是   | 微信支付服务器生成的预支付订单 id，参考[微信 app 支付](https://pay.weixin.qq.com/wiki/doc/api/app/app.php?chapter=9_1)和[微信网页支付](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20) |
| referer `1040+` | String   | 否   | 在微信支付后台配置的域名。从 1040 版本开始，在使用微信网页方式调用时，若该参数不为空，将通过直接设置 referer 的方式拉起微信客户端。                                                                |
| extra           | Object   | 是   | 当前支付方式下，需要填入的额外订单信息，具体见下文的 extra 参数说明                                                                                                                                |
| success         | Function | 否   | 成功后的回调函数，App 方式下，回调发生在用户支付完成之后，网页方式下，回调发生在订单提交给微信 app 之后                                                                                            |
| fail            | Function | 否   | 失败回调                                                                                                                                                                                           |
| cancel          | Function | 否   | 取消回调                                                                                                                                                                                           |

#### extra 参数：

##### app 方式

| 字段名        | 必选 | 说明                           |
| ------------- | ---- | ------------------------------ |
| app_id        | 是   | 微信支付订单中的 app_id        |
| partner_id    | 是   | 微信支付订单中的 partner_id    |
| package_value | 是   | 微信支付订单中的 package_value |
| nonce_str     | 是   | 微信支付订单中的 nonce_str     |
| time_stamp    | 是   | 微信支付订单中的 time_stamp    |
| order_sign    | 是   | 微信支付订单中的 order_sign    |

##### 网页方式

| 字段名      | 必选 | 说明                                                                                                                                                                                                                                                                                    |
| ----------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mweb_url    | 否   | 在微信的支付服务器下单以后，微信返回的 MWEB_URL，在 CP 用于微信支付的 h5 页面中，直接将 mweb_url 取出后跳转过去即可，但这个做法并不是强制的，您也可以通过其他自定义键值向您自己的服务器换取 MWEB_URL。从 1040 版本开始，若使用直接设置 referer 的方式拉起微信客户端支付，则此参数必选。 |
| custome_key | 否   | 其他的自定义键值，cp 可以根据需要增加其他自己认为需要的键名和键值                                                                                                                                                                                                                       |

#### success 返回值：

| 参数名    | 类型   | 说明                                                        |
| --------- | ------ | ----------------------------------------------------------- |
| prepayid  | String | 只在 App 支付方式下会出现，微信支付订单的 prepayId.         |
| final_url | String | 只在网页方式下会出现，拼接参数之后，最终用于打开网页的 url. |

#### fail 返回错误代码：

| 错误码 | 说明                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 900    | 在 manifest.json 中配置的应用签名有误，无法解析                                                                                            |
| 901    | 在 manifest.json 中配置的应用包名有误                                                                                                      |
| 1000   | 微信未安装                                                                                                                                 |
| 1001   | 用于微信网页支付的 url 配置找不到                                                                                                          |
| 2001   | 订单已经提交给微信，但是微信返回错误, 可能的原因：签名错误、未注册 APPID、项目设置 APPID 不正确、注册的 APPID 与设置的不匹配、其他异常等。 |

#### 示例

```javascript
useWxpay () {
  var payType = wxpay.getType();
  if (payType === 'APP') {
    wxpay.pay({
      //微信 app支付的prepayId
      prepayid: 'your order prepayid,eg: wx20170101abcdef1234567890',
      extra: {
        app_id: 'your app_id',
        partner_id: 'your partner_id',
        package_value: 'your package_value',
        nonce_str: 'your nonce_str',
        time_stamp: 'your time_stamp',
        order_sign: 'your order sign'
      },
      fail: function (data, code) {
        console.log(`WX PAY failed, code = ${code}`)
      },
      cancel: function () {
        console.log('WX PAY cancelled by user')
      },
      success: function (data) {
        console.log('WX PAY success')
      }
    })
  } else if (payType === 'MWEB') {
    wxpay.pay({
      //微信网页支付的prepayId
      prepayid: 'your order prepayid,eg: wx20170101abcdef1234567890',
      extra: {
        //传递给支付页面的自定义参数, 根据需要进行设置, 会被urlEncode之后拼接在配置的url尾部
        mweb_url: 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin',
        customeKey1: 'customeValue1',
        customeKey2: 'customeValue2'
      },
      fail: function (data, code) {
        console.log(`WX H5 PAY handling fail, code = ${code}`)
      },
      cancel: function () {
        console.log('WX H5 PAY handling cancel')
      },
      success: function (data) {
        //H5方式下，支付成功的回调仅仅只是指将订单递交给微信，并不意味着支付已经成功完成
        console.log('WX H5 PAY handling success')
      }
    })
  } else {
    console.log('WX PAY is not avaliable')
  }
}
```

1040 开始，微信网页支付支持直接设置 referer 方式：

```javascript
useWxpay () {
  var payType = wxpay.getType();
  if (payType === 'MWEB') {
    wxpay.pay({
      // 微信网页支付的prepayId
      prepayid: 'your order prepayid,eg: wx20170101abcdef1234567890',
      referer: 'your host name configured in wechat, eg: https://www.quickapp.cn',
      extra: {
        // 需要将微信返回的MWEB_URL地址配置到这里
        mweb_url: 'https://wx.tenpay.com/cgi-bin/mmpayweb-bin'
      },
      fail: function (data, code) {
        console.log(`WX H5 PAY handling fail, code = ${code}`)
      },
      cancel: function () {
        console.log('WX H5 PAY handling cancel')
      },
      success: function (data) {
        //H5方式下，支付成功的回调仅仅只是指将订单递交给微信，并不意味着支付已经成功完成
        console.log('WX H5 PAY handling success')
      }
    })
  }
}
```

## 后台运行限制

禁止使用。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注                                                           |
| ---------- | :-----: | -------------------------------------------------------------- |
| 小米       | **YES** | -                                                              |
| 中兴       | **YES** | 仅支持 MWEB 方式                                               |
| 华为       | **YES** | 仅支持 MWEB 方式                                               |
| 金立       | **YES** | -                                                              |
| 联想       |  _no_   | -                                                              |
| 魅族       | **YES** | 支持 MWEB 方式；APP 方式需 Flyme 7+                            |
| 努比亚     | **YES** | 仅支持 MWEB 方式                                               |
| OPPO       | **YES** | 支持 MWEB 方式；APP 方式需 ColorOS 5.0+，部分机型 ColorOS 3.x+ |
| vivo       | **YES** | -                                                              |
| 一加       |    -    | -                                                              |
| **预览版** | **YES** | 仅支持 MWEB 方式                                               |
