# 账号 account

> 该接口与公共接口 [`@service.account`](../../../public/features/service/account.md) 同名但实现独立，为**荣耀快应用引擎专有**接口，提供荣耀帐号的登录判断、OAuth 授权与开发者托管 token 获取能力，用于接入荣耀帐号体系。

> **支持版本**
> - 卡片：支持
> - 快应用 App：支持

## 接口声明

```json
{ "name": "service.account" }
```

## 导入模块

```javascript
import account from '@service.account'
// 或
const account = require('@service.account')
```

## 接口定义

### account.getProvider()

获取账号服务提供商。

#### 参数：

无

#### 返回值：

字符串 `honor`，表示由荣耀提供账号服务。

#### 示例：

```javascript
console.log(account.getProvider())
```

### account.isLogin(OBJECT)

判断荣耀帐号是否已登录。

#### 参数：

| 参数名  | 类型     | 必填 | 说明     |
| ------- | -------- | ---- | -------- |
| success | Function | 否   | 成功回调 |
| fail    | Function | 否   | 失败回调 |

##### success 返回值：

| 参数名  | 类型    | 说明                                   |
| ------- | ------- | -------------------------------------- |
| isLogin | Boolean | 登录状态：`true` 已登录，`false` 未登录 |

##### fail 返回错误代码：

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 200    | 通用错误，判断出错时返回   |

#### 示例：

```javascript
account.isLogin({
  success: function (data) {
    console.log('data.isLogin = ' + data.isLogin)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### account.authorize(OBJECT)

请求用户进行 OAuth 授权，拿到 authorization code（用于在服务端换取 access token）。

#### 参数：

| 参数名  | 类型     | 必填 | 说明                                                       |
| ------- | -------- | ---- | ---------------------------------------------------------- |
| appid   | String   | 是   | 向荣耀帐号申请的快应用 ID（与下方 client_id 相同）         |
| type    | String   | 是   | 授权码模式填 `code`（仅支持 `code`，填其它值无效）         |
| scope   | String   | 否   | 申请的权限范围。缺失时等同 `scope.baseProfile`。见下方说明 |
| state   | String   | 否   | 任意值（会原封不动地返回）                                 |
| success | Function | 否   | 成功回调                                                   |
| fail    | Function | 否   | 失败回调                                                   |

`scope` 取值：

| scope                 | 说明                   |
| --------------------- | ---------------------- |
| `scope.baseProfile`   | 获取用户基本信息       |
| `scope.basePhone`     | 获取手机号             |
| `scope.basePhoneProfile` | 获取手机号和用户基本信息 |

##### success 返回值：

| 参数名 | 类型   | 说明                                                                  |
| ------ | ------ | --------------------------------------------------------------------- |
| code   | String | 返回的授权码，用于下一步换取 access token；有效期 5 分钟，用户登出失效 |
| state  | String | 请求时 `state` 指定的任意值                                            |

##### fail 返回错误代码：

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 200    | 通用错误，判断出错时返回   |
| 201    | 用户拒绝，获取帐号权限失败 |

#### 示例：

```javascript
account.authorize({
  appid: 'appid',
  type: 'code',
  scope: 'scope.baseProfile',
  success: function (data) {
    console.log(`handling success: ${data.code}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}, errorMsg = ${data}`)
  }
})
```

### account.getDeveloperToken(OBJECT)

获取开发者托管在荣耀云端的业务 token。

#### 参数：

| 参数名  | 类型     | 必填 | 说明     |
| ------- | -------- | ---- | -------- |
| success | Function | 否   | 成功回调 |
| fail    | Function | 否   | 失败回调 |

##### success 返回值：

| 参数名                 | 类型   | 说明                                       |
| ---------------------- | ------ | ------------------------------------------ |
| authorizeInfo.appId    | String | 应用标识                                   |
| authorizeInfo.state    | String | 帐号状态：`bind` 已绑定，`unbind` 未绑定    |
| oAuthToken.accessToken | String | 开发者托管在荣耀云端的业务 token           |
| oAuthToken.expireIn    | Number | 以秒为单位的 token 有效时间                |

##### fail 返回错误代码：

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 200    | 通用错误，判断出错时返回   |

#### 示例：

```javascript
account.getDeveloperToken({
  success: function (data) {
    console.log('data.oAuthToken.accessToken = ' + data.oAuthToken.accessToken)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}, errorMsg = ${data}`)
  }
})
```

## 服务端：用 Code 换取 Access Token

`authorize` 返回的 authorization code 需在服务端换取 access token。

**请求方式：** `POST`

**请求地址：** `https://hnoauth-login.cloud.hihonor.com/oauth2/v3/token`

**请求参数：**

| 参数           | 说明                                            |
| -------------- | ----------------------------------------------- |
| grant_type     | `authorization_code`                            |
| code           | 上一步拿到的 code 值                            |
| client_id      | 注册帐号时拿到的 client_id 值                   |
| client_secret  | 注册帐号时拿到的 client_secret 值               |
| redirect_uri   | 注册帐号时填写的 redirect_uri（未填可填 `honorid://redirect_url`） |

**请求示例（curl）：**

```bash
curl --location 'https://hnoauth-login.cloud.hihonor.com/oauth2/v3/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'grant_type=authorization_code' \
  --data-urlencode 'code=DQB6e9xxxxxxxxxxxx' \
  --data-urlencode 'client_id=xxxxxxxx' \
  --data-urlencode 'client_secret=25966cexxxxxxxxxxxxxxxxxx' \
  --data-urlencode 'redirect_uri=honorid://redirect_url'
```

**响应示例：**

```json
{
  "access_token": "xxxxx",
  "expires_in": 3600,
  "refresh_token": "xxxxx",
  "scope": "openid profile",
  "token_type": "Bearer"
}
```

## 服务端：获取用户信息（GOpen.User.getInfo）

使用用户级 access token 获取用户信息。

**请求地址：** `https://account-drcn.platform.hihonorcloud.com/rest.php?nsp_fmt=JSON&nsp_svc=GOpen.User.getInfo`

**请求参数：**

| 参数          | 必选 | 说明                                  |
| ------------- | ---- | ------------------------------------- |
| access_token  | 是   | 上一步拿到的 access_token 值          |
| getNickName   | 否   | 是否优先返回昵称：`0` 否（缺省）、`1` 是 |

**请求示例（curl）：**

```bash
curl --location 'https://account-drcn.platform.hihonorcloud.com/rest.php?nsp_fmt=JSON&nsp_svc=GOpen.User.getInfo' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'access_token=CgB6e3x93Exxxxxxxxxxxxxxxxxxxxxxx' \
  --data-urlencode 'getNickName=1'
```

**返回值：**

| 参数名          | 类型    | 说明 |
| --------------- | ------- | ---- |
| openID          | String  | 用户 openID |
| userID          | String  | 用户 userID |
| displayName     | String  | 显示名称，返回顺序取决于 `getNickName`：<br>• `getNickName=0`（或不传）：手机账号（带星号）→ 邮箱账号（带星号）→ 老账号（带星号）→ 昵称（空，缺省值除外）→ 第三方昵称 → 昵称（缺省值）<br>• `getNickName=1`：昵称（空，缺省值除外）→ 第三方昵称 → 昵称（缺省值）→ 手机账号（带星号）→ 邮箱账号（带星号）→ 老账号（带星号） |
| headPictureURL  | String  | 头像 |
| mobileNumber    | String  | 用户手机账号 |
| srvNationalCode | String  | 用户服务地国家 |
| nationalCode    | String  | 用户注册地 |
| birthDate       | String  | 生日，采用 `yyyymmdd` 格式 |
| ageGroupFlag    | Integer | 年龄段标识（只读，根据生日与 UP 定义临时计算）：`-1` 未知（未输入生日）、`0` 成人、`1` 未成人、`2` 儿童 |
| gender          | Integer | `0` 男、`1` 女、`2` 保密、`-1` 未设置 |
| email           | String  | 用户邮箱 |
| displayNameFlag | Integer | 显示名称标识，返回昵称时为 `0`，匿名账号时为 `1`。<br>• 昵称不优先（`getNickName=0`）：匿名手机账号 → 匿名邮箱账号 → 匿名老账号 → 非缺省昵称 → 第三方昵称 → 缺省昵称；前三项 `displayNameFlag=1`，后三项 `displayNameFlag=0`<br>• 昵称优先（`getNickName=1`）：非缺省昵称 → 第三方昵称 → 缺省昵称 → 匿名手机账号 → 匿名邮箱账号 → 匿名老账号；前三项 `displayNameFlag=0`，后三项 `displayNameFlag=1` |
| siteID          | Integer | 站点：`1` 中国、`5` 亚非拉、`7` 欧洲、`8` 俄罗斯 |

**响应示例：**

```json
{
  "nationalCode": "CN",
  "displayName": "mynickname",
  "openID": "MDFAMTA0MDY0NzI3kNjY0ODxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "headPictureURL": "https://upfile-drcn.platform.hihonorcloud.com/xxxxxxxxxxxxxxxxxxxxx.jpg",
  "displayNameFlag": 0,
  "userID": "155008xxxxxxxxxxxx",
  "accountBrand": 1,
  "srvNationalCode": "CN"
}
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/100977
