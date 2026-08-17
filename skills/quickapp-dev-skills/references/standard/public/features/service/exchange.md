# 交换数据 exchange `1050+`

## 接口声明

提供了一个不同快应用间数据交互的方式。快应用可以利用它发布数据，或从其他快应用获取数据

数据交互有三个数据空间，分别是应用空间（application）、应用开发商空间（vendor，`1080+`）和全局空间（global）

application：数据发布在应用空间，读取、修改(`1080+`)、删除(`1080+`)时需同时指定发布方的包名和签名，并且需要发布方授权

vendor(`1080+`)：数据发布在应用开发商空间，同签名的多个应用的写操作会相互覆盖，读取时不能指定发布方的包名和签名，不需要发布方授权

global：数据发布在全局空间，多个应用的写操作会相互覆盖，读取时不能指定发布方的包名和签名，不需要发布方授权

**注意**：

set、get 操作支持在 `application`、`vendor`(`1080+`) 和`global` 空间上操作数据

remove、clear、grantPermission、revokePermission 只支持在 `application` 空间上操作数据

```json
{ "name": "service.exchange" }
```

## 导入模块

```javascript
import exchange from '@service.exchange' 或 const exchange = require('@service.exchange')
```

## 接口定义

### exchange.get (OBJECT)

读取快应用平台数据，可获取到`应用空间`（application）、`应用开发商空间`（vendor，`1080+`）或`全局空间`（global）的数据

#### 参数

| 参数名   | 类型     | 必填 | 说明                                                                                |
| -------- | -------- | ---- | ----------------------------------------------------------------------------------- |
| package  | String   | 否   | 数据发布方的包名，scope 为 `application` 时必须提供，为 `vendor`(`1080+`) 或 `global` 时必须为空         |
| sign     | String   | 否   | 数据发布方签名的 SHA-256，scope 为 `application` 时必须提供，为 `vendor`(`1080+`) 或 `global` 时必须为空 |
| scope    | String   | 否   | 数据发布的空间类型，支持 application、vendor(`1080+`) 和 global，默认为 application                  |
| key      | String   | 是   | 数据的 key                                                                          |
| success  | Function | 否   | 成功回调                                                                            |
| fail     | Function | 否   | 失败回调                                                                            |
| complete | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）                                          |

#### 返回值:

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| value  | String | 数据的值 |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 202    | 参数错误 |
| 1000   | 没有权限 |

#### 示例

```javascript
exchange.get({
  package: 'com.example',
  sign: '7a12ec1d66233f20a20141035b1f7937',
  key: 'token',
  success: function(ret) {
    console.log(`handling success, value = ${ret.value}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### exchange.set (OBJECT)

发布数据到快应用平台，可发布到`应用空间`（application）、`应用开发商空间`（vendor，`1080+`）或`全局空间`（global）

注意：从 1080 开始，修改方可以通过`set`来修改非本快应用的数据

在修改非本快应用的`应用空间`数据前，必须确保数据发布方已为数据修改方授予`修改`权限，使用`exchange.grantPermission`接口授权即可

#### 参数

| 参数名         | 类型     | 必填 | 说明                                                                                                                                                     |
| -------------- | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key            | String   | 是   | 数据的 key                                                                                                                                               |
| value          | String   | 是   | 数据的值                                                                                                                                                 |
| scope          | String   | 否   | 数据发布的空间类型，支持 application、vendor(`1080+`) 和 global，默认为 application                                                                                         |
| success        | Function | 否   | 成功回调                                                                                                                                                 |
| fail           | Function | 否   | 失败回调                                                                                                                                                 |
| complete       | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）                                                                                                               |
| package`1080+` | String   | 否   | 配置需要写入数据到某快应用的`应用空间`时某快应用的`包名`，仅在`scope`参数不设置或设置为`application`时生效，在`scope`为`vendor`(`1080+`)或`global`时必须设为空值            |
| sign `1080+`   | String   | 否   | 配置需要写入数据到某快应用的`应用空间`时某快应用的`签名`的 SHA-256，仅在`scope`参数不设置或设置为`application`时生效，在`scope`为`vendor`(`1080+`)或`global` 时必须设为空值 |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 202    | 参数错误 |

#### 示例

```javascript
exchange.set({
  key: 'token',
  value: '12347979',
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### exchange.remove (OBJECT)

从快应用平台删除发布到`应用空间`（application）的数据

注意：从 1080 开始，修改方可以通过`remove`来删除非本快应用的数据

在删除非本快应用的`应用空间`数据前，必须确保数据发布方已为数据修改方授予`删除`权限，使用`exchange.grantPermission`接口授权即可

#### 参数

| 参数名         | 类型     | 必填 | 说明                                                                                                             |
| -------------- | -------- | ---- | ---------------------------------------------------------------------------------------------------------------- |
| key            | String   | 是   | 数据的 key                                                                                                       |
| success        | Function | 否   | 成功回调                                                                                                         |
| fail           | Function | 否   | 失败回调                                                                                                         |
| complete       | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）                                                                       |
| package`1080+` | String   | 否   | 配置需要删除某个快应用的`应用空间`数据时某快应用的`包名`，仅在删除非当前修改方的数据时，必须填入此项             |
| sign `1080+`   | String   | 否   | 配置需要删除到某个快应用的`应用空间`数据时某快应用的`签名`的 SHA-256，仅在删除非当前修改方的数据时，必须填入此项 |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 202    | 参数错误 |

#### 示例

```javascript
exchange.remove({
  key: 'token',
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### exchange.clear (OBJECT)

从快应用平台清除`当前快应用`的`应用空间`的数据

#### 参数

| 参数名   | 类型     | 必填 | 说明                                       |
| -------- | -------- | ---- | ------------------------------------------ |
| success  | Function | 否   | 成功回调                                   |
| fail     | Function | 否   | 失败回调                                   |
| complete | Function | 否   | 执行结束后的回调（调用成功、失败都会执行） |

#### 示例

```javascript
exchange.clear({
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### exchange.grantPermission (OBJECT)

授予指定快应用读取 get、修改 set(`1080+`)、删除 remove(`1080+`)数据的权限。

同签名的快应用不用授权，默认有读取 get、修改 set(`1080+`)、删除 remove(`1080+`)权限

#### 参数

| 参数名          | 类型     | 必填 | 说明                                                                                                                                                                                                                                               |
| --------------- | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| package         | String   | 是   | 授权应用的包名                                                                                                                                                                                                                                     |
| sign            | String   | 是   | 授权应用的签名 SHA-256                                                                                                                                                                                                                             |
| key             | String   | 否   | 数据的 key。如果为空，则授权当前所有 key 的读取权限                                                                                                                                                                                                |
| success         | Function | 否   | 成功回调                                                                                                                                                                                                                                           |
| fail            | Function | 否   | 失败回调                                                                                                                                                                                                                                           |
| complete        | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）                                                                                                                                                                                                         |
| writable`1080+` | Boolean  | 否   | 配置授权应用是否可修改/删除数据，默认值为 false；当值为空或 false 时，将仅授予读取权限，并且如果之前有修改/删除权限也将被回收；当值为 true 时，将同时授予读取、写入、删除三个权限。如果要取消读取这项权限，则需调用`exchange.revokePermission`方法 |

应用的签名的 SHA-256 可通过 `快应用调试器` 进行获取。

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 202    | 参数错误 |

#### 示例

```javascript
exchange.grantPermission({
  sign: '7a12ec1d66233f20a20141035b1f7937',
  package: 'com.example',
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### exchange.revokePermission (OBJECT)

取消授予指定快应用应用读取 get、修改 set(`1080+`)、删除 remove(`1080+`)数据的权限

不能取消同签名应用的读取 get、修改 set(`1080+`)、删除 remove(`1080+`)授权

#### 参数

| 参数名   | 类型     | 必填 | 说明                                            |
| -------- | -------- | ---- | ----------------------------------------------- |
| package  | String   | 是   | 取消授权的应用包名                              |
| key      | String   | 否   | 数据的 key。如果为空，则取消当前所有 key 的授权 |
| success  | Function | 否   | 成功回调                                        |
| fail     | Function | 否   | 失败回调                                        |
| complete | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）      |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 202    | 参数错误 |

#### 示例

```javascript
exchange.revokePermission({
  package: 'com.example',
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
