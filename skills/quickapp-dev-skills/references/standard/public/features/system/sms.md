# 发送短信 sms `1010+`

## 接口声明

```json
{ "name": "system.sms" }
```

## 导入模块

```javascript
import sms from '@system.sms' 或 const sms = require('@system.sms')
```

## 接口定义

### sms.send(OBJECT)

发送短信，每次发送都需要用户授权

#### 权限要求

发送短信

#### 参数：

| 参数名   | 类型     | 必填 | 说明                         |
| -------- | -------- | ---- | ---------------------------- |
| address  | String   | 是   | 目标号码                     |
| content  | String   | 是   | 短信内容（不可超过 70 字符） |
| success  | Function | 否   | 成功回调                     |
| fail     | Function | 否   | 失败回调                     |
| complete | Function | 否   | 执行结束后的回调             |

##### fail 返回错误代码

| 错误码 | 说明                         |
| ------ | ---------------------------- |
| 201    | 用户拒绝，获取发短信权限失败 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
sms.send({
  address:'123456',
  content:'这是短信内容',
  success: function () {
    console.log('handling success')
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### sms.readSafely(OBJECT) `1050+`

获取手机短信内容，用于获取手机验证码等场景（仅允许获取 5 分钟内的应用短信）。
**安全性**：短信中通过增加应用签名 hash 信息，接口获取短信时通过 hash 来验证区分该应用的短信内容。
**短信格式**：11 位签名 hash 字符放到短信末尾，可通过 Debugger 工具获取。

```
【某某应用】您的验证码是：1111，5分钟内有效，请勿泄漏。如非本人操作，请忽略此信息。
FA+9qCX9VSu
```

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                          |
| -------- | -------- | ---- | --------------------------------------------- |
| timeout  | Number     | 否   | 超时时间，单位是 ms，默认值为 60000（一分钟） |
| success  | Function | 否   | 成功回调                                      |
| fail     | Function | 否   | 失败回调                                      |
| complete | Function | 否   | 执行结束后的回调                              |

##### success 返回值：

| 参数值  | 类型   | 说明         |
| ------- | ------ | ------------ |
| message | String | 原始短信内容 |

##### fail 返回错误代码

| 错误码 | 说明     |
| ------ | -------- |
| 204    | 超时返回 |

#### 示例

```javascript
sms.readSafely({
  success: function(data) {
    console.log('handling success. message=' + data.message)
  },
  fail: function(data, code) {
    console.log('handling fail, result data=' + data + ', code=' + code)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
