# 账号 account `1000+`

## 接口声明

```json
{ "name": "service.account" }
```

## 导入模块

```javascript
import account from '@service.account' 或 const account = require('@service.account')
```

## 接口定义

### account.getProvider()

获取服务提供商。

#### 参数：

无

#### 返回值：

字符串，服务提供商的代号，如厂商的英文品牌名称，假如无此服务则返回空字符串

#### 示例：

```javascript
console.log(account.getProvider())
```

## 接口定义

### account.isLogin(OBJECT)  `1060+`

判断账户登录状态。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |                                                                                                |

##### success 返回值：

| 参数名      | 类型   | 说明       |
| ----------- | ------ | ---------- |
| isLogin     | Boolean | 登录状态值。true表示已登录，false表示未登录 |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 通用错误，判断出错时返回该错误码 |

#### 示例：

```javascript
account.isLogin({
  success: function (data) {
    console.log('data.isLogin=' + data.isLogin)
    console.log('handling success' + JSON.stringify(data))
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
});
```

### account.authorize(OBJECT)

进行 OAuth 授权。

#### 参数：

| 参数名      | 类型     | 必填 | 说明                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| type        | String   | 是   | 授权码模式为 code，简化模式为 token。                        |
| redirectUri | String   | 否   | 重定向 URI。                                                 |
| scope       | String   | 否   | 申请的权限范围，假如不填则 getProfile 只返回 openId。 scope.baseProfile：获取用户基本信息 ；scope.basePhone：获取手机号 `1100+`；scope.basePhoneProfile：获取手机号和用户基本信息 `1100+` |
| state       | String   | 否   | 可以指定任意值，认证服务器会原封不动地返回这个值。           |
| success     | Function | 否   | 成功回调                                                     |
| fail        | Function | 否   | 失败回调                                                     |
| complete    | Function | 否   | 执行结束后的回调                                             |

##### success 返回值：

| 参数名      | 类型   | 说明                                                                               |
| ----------- | ------ | ---------------------------------------------------------------------------------- |
| state       | String | 请求时同字段指定的任意值。                                                         |
| code        | String | 授权码模式下可用，返回的授权码。                                                   |
| accessToken | String | 简化模式下可用，返回的访问令牌。                                                   |
| tokenType   | String | 简化模式下可用，访问令牌类型。                                                     |
| expiresIn   | Number | 简化模式下可用，访问令牌过期时间，单位为秒，如果通过其他方式设置，则此处可能为空。 |
| scope       | String | 简化模式下可用，实际权限范围，如果与申请一致，则此处可能为空。                     |

##### fail 返回错误代码

| 错误码      | 说明                                      |
| ----------- | ----------------------------------------- |
| 201         | 用户拒绝，获取帐号权限失败                |
| 202 `1100+` | 超出权限范围，不支持获取此scope对应的权限 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框             |

#### 示例：

```javascript
account.authorize({
  type: 'code',
  redirectUri: 'http://www.example.com/',
  success: function(data) {
    console.log(`handling success: ${data.code}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### account.getProfile(OBJECT)

获得用户基本信息。根据授权时选择的scope，返回不同信息。

#### 参数：

| 参数名   | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| token    | String   | 是   | 访问令牌               |
| success  | Function | 否   | 成功回调               |
| fail     | Function | 否   | 失败回调，返回失败原因 |
| complete | Function | 否   | 执行结束后的回调       |

##### success 返回值：

| 参数名              | 类型   | 说明                                                         |
| ------------------- | ------ | ------------------------------------------------------------ |
| openid              | String | 用户的 openid，可能为空                                      |
| id                  | String | 用户的 user id，可能为空                                     |
| unionid             | String | 用户在开放平台上的唯一标示符，本字段在满足一定条件下才会返回（需要在厂商的开放平台上额外申请） |
| nickname            | String | 用户的昵称，可能为空                                         |
| avatar              | Object | 用户的头像图片地址，可能为空，按照分辨率组织，当只有一个分辨率时，可以使用 default 对应的图片地址 |
| phoneNumber `1100+` | String | 用户的手机号，可能为空                                       |

unionid 机制说明

如果开发者拥有多个移动应用，可通过 unionid 来区分用户的唯一性，因为只要是同一个开放平台帐号下的移动应用，用户的 unionid 是唯一的。换句话说，同一用户，对同一个开放平台下的不同应用，unionid 是相同的。

##### scope与success返回值对应关系：

| 参数名      | baseProfile | basePhone | basePhoneProfile |
| ----------- | ----------- | --------- | ---------------- |
| openid      | √           |           | √                |
| id          | √           |           | √                |
| unionid     | √           |           | √                |
| nickname    | √           |           | √                |
| avatar      | √           |           | √                |
| phoneNumber |             | √         | √                |

#### 示例：

```javascript
account.getProfile({
  token: 'abcdefg',
  success: function(data) {
    console.log(`handling success: ${data.nickname}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### account.getPhoneNumber(OBJECT)  `1070+`

使用该接口前需要先跟厂商签订相应的商务合同，在获取用户的手机号码时，用户同意后，默认获取当前手机登录的厂商账号的手机号码，或者通过验证的用户输入的其他手机号码。

#### 权限要求

每次请求时都需要用户确认

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| encrypt  | Boolean | 否   | 获取手机号码是否加密，默认false，加解密方案需要跟具体的厂商对接。    |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值:

| 参数名 | 类型   | 说明         |
| ------ | ------ | ------------ |
| phoneNumber  | String | 用户手机号码 |

##### fail 返回错误代码：

| 错误码 | 说明             |
| ------ | ---------------- |
| 201    | 用户拒绝，获取用户手机号码失败     |
| 203    | 还未实现这个接口     |
| 205    | 前一次请求尚未完成，不允许发起新的请求     |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1001   | 不允许调用这个接口，需要先跟厂商签订相关的商务合同 |

#### 示例：

```javascript
account.getPhoneNumber({
  encrypt: false,
  success: function(data) {
    console.log(`handling success phoneNumber${data.phoneNumber}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### account.getEncryptedID(OBJECT) `1080+`
获取厂商加密过的系统账号ID，无需用户授权。当需要和厂商对接服务时，可以使用此ID.

#### 参数：
| 参数名 |  类型   | 必填 |  说明 |
| ----- | ------ | ---- | ---- |
|success|Function|  否  |成功回调|
|fail   |Function|  否  |失败回调|

##### success返回值：
|    参数名  |  类型 |     说明       |
| --------- | ---- | -------------- |
|encryptedid|String|加密过的系统账号ID|

##### fail返回错误代码：
|错误码|说明|
| ---- | ------ |
| 200  |通用错误 |
| 1001 |未登录账号|

#### 示例：
```javascript
account.getEncryptedID({
  success: function (data) {
    console.log(`handling success: ${data.encryptedid}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 账号服务端sdk
详情请见: [账号服务端sdk](accountsdk.md)。

## 支持明细

| 厂商       |  支持   | 备注                                                                                        |
| ---------- | :-----: | ------------------------------------------------------------------------------------------- |
| 小米       | **YES** | [小米帐号授权登录服务](https://dev.mi.com/console/appservice/account.html)                  |
| 中兴       | `1010+` | -                                                                                           |
| 华为       | **YES** | [华为开发者联盟](https://developer.huawei.com/consumer/cn/console#/serviceCards/AppService) |
| 金立       | `1010+` | [金立快应用开发者中心](http://devquickapp.gionee.com/)                                      |
| 联想       |  _no_   | -                                                                                           |
| 魅族       | **YES** | [魅族账号接入服务](https://open.flyme.cn/open-web/views/accountJoinUp.html)                 |
| 努比亚     | `1010+` | [努比亚开发者平台](http://developer.nubia.com/developer/view/index.html)                    |
| OPPO       | **YES** | [OPPO 开放平台](https://open.oppomobile.com/)                                               |
| vivo       | **YES** | [vivo帐号授权登录服务](https://dev.vivo.com.cn/documentCenter/doc/139)                      |
| 一加       |    -    | -                                                                                           |
| **预览版** |  _no_   | 预览版不提供账号接口                                                                        |
