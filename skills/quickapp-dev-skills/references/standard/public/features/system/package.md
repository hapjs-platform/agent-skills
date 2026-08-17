# 应用管理 package `1000+`

## 接口声明

```json
{ "name": "system.package" }
```

## 导入模块

```javascript
import pkg from '@system.package' 或 const package = require('@system.package')
```

## 接口定义

### pkg.hasInstalled(OBJECT)

检测应用是否存在。支持检测原生应用是否已安装。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| package  | String   | 是   | 应用包名         |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型    | 说明         |
| ------ | ------- | ------------ |
| result | Boolean | 应用是否存在 |

#### 示例：

```javascript
pkg.hasInstalled({
  package: 'com.hap.app',
  success: function(data) {
    console.log(`handling success: ${data.result}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### pkg.install(OBJECT)

安装应用。支持安装原生应用。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| package  | String   | 是   | 应用包名         |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型    | 说明                 |
| ------ | ------- | -------------------- |
| result | Boolean | 是否成功发起安装操作 |

#### 示例：

```javascript
pkg.install({
  package: 'com.hap.app',
  success: function(data) {
    console.log(`handling success: ${data.result}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### pkg.getInfo(OBJECT) `1070+`
获取应用版本号、版本名称信息，包括原生应用和快应用

#### 参数：

|  参数名 |   类型  | 必填 |  说明   |
| ------ | ------ | ---- | ------- |
|package |String  |  是  |应用包名   |
|success |Function|  否  |成功回调   |
|fail    |Function|  否  |失败回调   |
|complete|Function|  否  |执行结束回调|

##### success 返回值：

|   参数名   | 类型  |  说明  |
| --------- | ---- | ----- |
|versionCode|Number|版本号  |
|versionName|String|版本名称|

##### fail 返回错误码：

|错误码|说明     |
|-----|--------|
|202  |参数错误  |
|1000 |应用不存在|

#### 示例：
```javascript
pkg.getInfo({
  package: 'com.hap.app',
  success: function(data) {
    console.log(`handling success: ${data.versionCode}, ${data.versionName}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### pkg.getSignatureDigests(OBJECT) `1070+`
获取应用签名摘要信息，包括原生应用和快应用

#### 参数：

|  参数名 |   类型  | 必填 |  说明   |
| ------ | ------ | --- | ------- |
|package |String  |  是 |应用包名   |
|success |Function|  否 |成功回调   |
|fail    |Function|  否 |失败回调   |
|complete|Function|  否 |执行结束回调|

##### success 返回值：

|      参数名     |  类型  |        说明              |
| -------------- | ----- | ----------------------- |
|signatureDigests| Array |签名摘要信息列表，使用SHA-256|

##### fail 返回错误码：

|错误码|说明      |
|-----|---------|
|202  |参数错误  |
|1000 |应用不存在|

#### 示例：
```javascript
pkg.getSignatureDigests({
  package: 'com.hap.app',
  success: function(data) {
    data.signatureDigests.map(function (item) {
        console.log(`handling success: signature = ${item}`)
    })
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 更多

可以使用页面路由中的 push 操作来打开应用。
