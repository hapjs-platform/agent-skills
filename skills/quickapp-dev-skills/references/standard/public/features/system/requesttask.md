# 数据请求 requesttask `1100+`

## 接口声明

```json
{ "name": "system.requesttask" }
```

## 导入模块

```javascript
import requesttask from '@system.requesttask' 或 const requesttask = require("@system.requesttask")
```

## 接口定义

### 方法

### RequestTask requesttask.request(OBJECT)

创建一个网络请求，每次成功调用 requesttask.request 将返回本次请求的 RequestTask 实例。

#### 参数：

| 参数名       | 类型                      | 必填 | 说明                                                                      |
| ------------ | ------------------------- | ---- | ------------------------------------------------------------------------- |
| url          | String                    | 是   | 开发者服务器接口地址                                                      |
| data         | String/Object/ArrayBuffer | 否   | 请求的参数，可以是字符串，或者是 js 对象、Arraybuffer 对象。              |
| header       | Object                    | 否   | 请求的 header，会将其所有属性设置到请求的 header 部分。                   |
| method       | String                    | 否   | 默认为 GET，可以是：OPTIONS，GET，HEAD，POST，PUT，DELETE，TRACE，CONNECT |
| responseType | String                    | 否   | 响应的数据类型，支持响应类型是 Text，Arraybuffer。                        |
| success      | Function                  | 否   | 成功返回的回调函数                                                        |
| fail         | Function                  | 否   | 失败的回调函数，可能会因为权限失败                                        |
| complete     | Function                  | 否   | 结束的回调函数（调用成功、失败都会执行）                                  |

##### success 返回值：

| 参数名     | 类型                      | 说明                                          |
| ---------- | ------------------------- | --------------------------------------------- |
| statusCode | Integer                   | 服务器状态 code                               |
| data       | String/Object/ArrayBuffer | 参考 `responseType与success中data的关系` 部分 |
| headers    | Object                    | 服务器 response 的所有 header                 |

##### responseType 与 success 中 data 的关系：

| responseType | data        | 说明                                                                                                                                                                                                                   |
| ------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 无           | String      | 服务器返回的 header 中 type 是 text 或 application/json、application/javascript、application/xml，值是文本内容，否则是存储的临时文件的 uri，临时文件如果是图片或者视频内容，可以将图片设置到 image 或 video 控件上显示 |
| text         | String      | 返回普通文本                                                                                                                                                                                                           |
| json         | Object      | 返回 js 对象                                                                                                                                                                                                           |
| file         | String      | 返回存储的临时文件的 uri                                                                                                                                                                                               |
| arraybuffer  | ArrayBuffer | 返回 ArrayBuffer 对象                                                                                                                                                                                                  |

---

# RequestTask

网络请求任务对象

## 方法

### RequestTask.abort()

中断请求任务

### RequestTask.onHeadersReceived(callback)

监听 HTTP Response Header 事件，会比请求完成事件更早。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                                                   |
| -------- | -------- | ---- | ---------------------------------------------------------------------- |
| callback | Function | 是   | HTTP Response Header 事件的回调函数，callback 的第一个参数为响应头对象 |

##### callback 返回值

| 参数名 | 类型   | 说明                                    |
| ------ | ------ | --------------------------------------- |
| header | Object | 开发者服务器返回的 HTTP Response Header |

### RequestTask.offHeadersReceived(callback)

取消监听 HTTP Response Header 事件。callback 是可选的，如果不传则取消所有通过 onHeadersReceived 监听的 HTTP Response Header 事件。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                |
| -------- | -------- | ---- | ----------------------------------- |
| callback | Function | 否   | HTTP Response Header 事件的回调函数 |

#### 示例代码：

```javascript
const retRequestTask = requesttask.request({
  url: 'http://www.example.com',
  responseType: 'text',
  method: 'GET',
  success: function(res) {
    console.log(`the status code of the response: ${res.statusCode}`)
    console.log(`the data of the response: ${res.data}`)
    console.log(`the headers of the response: ${JSON.stringify(res.headers)}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, errMsg = ${data}`)
    console.log(`handling fail, errCode = ${code}`)
  }
})

// 中断请求任务
retRequestTask.abort()

// 监听响应头事件
retRequestTask.onHeadersReceived(header => {
  console.log(
    `listening for response header event, header = ${JSON.stringify(header)}`
  )
})

// 取消监听 HTTP Response Header 事件
retRequestTask.offHeadersReceived()
```

##### 取消特定的 HTTP Response Header 事件

```javascript
function cb(header) {
  console.log(
    `listening for response header event 1, header = ${JSON.stringify(header)}`
  )
}

// 此次监听会被取消
retRequestTask.onHeadersReceived(cb)

// event2 监听依然有效，不会被取消
retRequestTask.onHeadersReceived(header => {
  console.log(
    `listening for response header event 2, header = ${JSON.stringify(header)}`
  )
})

retRequestTask.offHeadersReceived(cb)
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
