# QQ 账户 qqaccount `1010+`

## 接口声明

```json
{
  "name": "service.qqaccount",
  "params": {
    "appId": "your app id",
    "clientId": "you client id"
  }
}
```

### 参数

| 参数值   | 类型   | 说明                                                                                |
| -------- | ------ | ----------------------------------------------------------------------------------- |
| appId    | String | 在 [腾讯开放平台](http://op.open.qq.com/manage_centerv2) 申请移动应用时分配的 appId |
| clientId | String | 在 [QQ 互联](https://connect.qq.com/) 申请网页应用时分配的 clientId                 |

## 导入模块

```javascript
import qqaccount from '@service.qqaccount' 或 const qqaccount = require("@service.qqaccount")
```

## 接口定义

### qqaccount.getType()

获取当前的 QQ 登陆方式

#### 参数：

无

#### 返回值：

| 返回值 | 备注                                                                                                                                                                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APP    | QQ 的 app 登陆方式，使用在[腾讯开放平台](http://op.open.qq.com/manage_centerv2)注册信息进行登陆，参考[QQ 登录和注销](http://wiki.open.qq.com/wiki/QQ%E7%99%BB%E5%BD%95%E5%92%8C%E6%B3%A8%E9%94%80)                                                 |
| WEB    | QQ 的网页登陆方式，使用[QQ 互联](http://wiki.connect.qq.com/%E7%BD%91%E7%AB%99%E6%8E%A5%E5%85%A5%E6%B5%81%E7%A8%8B)的注册信息进行登陆，参考[OAuth2.0 开发文档](http://wiki.open.qq.com/wiki/website/%E5%87%86%E5%A4%87%E5%B7%A5%E4%BD%9C_OAuth2.0) |
| NONE   | 当前无可用的 QQ 登陆方式                                                                                                                                                                                                                           |

### qqaccount.authorize(OBJECT)

发起 qq 登陆，不同的登陆方式下，应该传入不同的参数，调用之前应该先使用 getType 函数查询当前的登陆方式．

#### 参数：

| 参数名      | 类型     | 必填 | 说明                                                                                                                                                                                                                          |
| ----------- | -------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state       | String   | 是   | client 端的状态值。用于第三方应用防止 CSRF 攻击，成功授权后回调时会原样带回。请务必严格按照流程检查用户与 state 参数状态的绑定。app 方式下不使用该参数                                                                        |
| redirectUri | String   | 是   | 授权回调地址,APP 方式下,不使用该参数                                                                                                                                                                                          |
| scope       | String   | 否   | 请求用户授权时向用户显示的可进行授权的列表。可填写的值是[API 文档](http://wiki.open.qq.com/wiki/website/API%E5%88%97%E8%A1%A8)中列出的接口，以及一些动作型的授权（目前仅有：do_like），如果要填写多个接口名称，请用逗号隔开。 |
| success     | Function | 否   | 成功回调                                                                                                                                                                                                                      |
| fail        | Function | 否   | 失败回调                                                                                                                                                                                                                      |
| cancel      | Function | 否   | 取消回调                                                                                                                                                                                                                      |

#### success 返回值：

| 参数名      | 类型   | 说明                                                                                                                                                                                                             |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url         | String | QQ 回调给出的完整 url,仅在网页方式下会返回                                                                                                                                                                       |
| code        | String | 用于换取 accessToken 的 Authorization_Code,仅在网页方式下会返回，通过 code 换取 AccessToken 的方法参考[QQ 的文档](http://wiki.connect.qq.com/%E4%BD%BF%E7%94%A8authorization_code%E8%8E%B7%E5%8F%96access_token) |
| state       | String | 原始的 state 值,仅在网页方式下会返回                                                                                                                                                                             |
| openId      | String | QQ 登陆后给该用户的唯一标示,仅在 app 方式下会返回                                                                                                                                                                |
| accessToken | String | 用于访问 api 的 accessToken,仅在 app 方式下会返回                                                                                                                                                                |
| expiresIn   | Number | accessToken 的有效时长，以秒为单位                                                                                                                                                                               |

#### fail 返回错误代码：

| 错误码 | 说明               |
| ------ | ------------------ |
| 1000   | 来自 QQ 的未知错误 |

### 示例

```javascript
useQQLogin: function() {
    var type = qqaccount.getType();
    if (type == 'APP') {
        qqaccount.authorize({
            scope: 'all',
            success: function(data) {
                console.log("qqaccount authorize success, data:" + JSON.stringify(data));
            },
            fail: function(data, code) {
                console.log("qqaccount authorize fail, data:" + data + ", code:" + code);
            },
            cancel: function() {
                console.log("qqaccount authorize cancelled.");
            }
        });
    } else if (type == 'WEB') {
        qqaccount.authorize({
            state: 'random2234',
            scope: 'all',
            redirectUri: 'https://your.redirect.url/path',
            success: function(data) {
                console.log("qqaccount authorize success, data:" + JSON.stringify(data));
            },
            fail: function(data, code) {
                console.log("qqaccount authorize fail, data:" + data + ", code:" + code);
            },
            cancel: function() {
                console.log("qqaccount authorize cancelled.");
            }
        });
    } else {
        console.log("qqaccount not available.");
    }
}
```

## 后台运行限制

禁止使用。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注            |
| ---------- | :-----: | --------------- |
| 小米       | **YES** | -               |
| 中兴       | **YES** | 仅支持 WEB 方式 |
| 华为       |  _no_   | -               |
| 金立       | **YES** | -               |
| 联想       |  _no_   | -               |
| 魅族       | **YES** | 仅支持 WEB 方式 |
| 努比亚     | **YES** | -               |
| OPPO       | **YES** | 仅支持 WEB 方式 |
| vivo       | **YES** | 仅支持 WEB 方式 |
| 一加       |    -    | -               |
| **预览版** | **YES** | 仅支持 WEB 方式 |
