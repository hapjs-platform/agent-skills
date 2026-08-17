# 下载 downloadtask `1100+`

## 接口声明

```json
{ "name": "system.downloadtask" }
```

## 导入模块

```javascript
import downloadtask from '@system.downloadtask' 或 const downloadtask = require("@system.downloadtask")
```

## 接口定义

### 方法

### DownloadTask downloadtask.downloadFile(OBJECT)

创建一个下载任务，每次成功调用 downloadtask.downloadFile 将返回本次下载的 DownloadTask 实例。

#### 参数：

| 参数名       | 类型                      | 必填 | 说明                                                                      |
| ------------ | ------------------------- | ---- | ------------------------------------------------------------------------- |
| url          | String                    | 是   | 开发者服务器接口地址                                                      |
| data         | String/Object/ArrayBuffer | 否   | 请求的参数，可以是字符串，或者是 js 对象、Arraybuffer 对象。              |
| header       | Object                    | 否   | 下载请求的 header，会将其所有属性设置到请求的 header 部分。                   |
| filePath     | String                | 否   |  指定文件下载后存储的路径 (本地路径)。支持 internal URI 的 Cache、Files 以及 Mass 目录，默认存储在应用 Cache 目录下。|
| success      | Function                  | 否   | 成功返回的回调函数                                                        |
| fail         | Function                  | 否   | 失败的回调函数，可能会因为权限失败                                        |
| complete     | Function                  | 否   | 结束的回调函数（调用成功、失败都会执行）                                  |

##### success 返回值：

| 参数名     | 类型                                      | 说明                                          |
| ---------- | ----------------------------------------- | --------------------------------------------- |
| statusCode | Integer                                   | 服务器状态 code                               |
| filePath   | String              | 用户文件路径 (本地路径)|
| headers    | Object                                    | 服务器 response 的所有 header                 |

---

# DownloadTask

下载任务对象

## 方法

### DownloadTask.abort()

中断下载任务

### DownloadTask.onProgressUpdate(callback)

监听下载进度变化事件。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                                                   |
| -------- | -------- | ---- | ---------------------------------------------------------------------- |
| callback | Function | 是   | 下载进度变化事件的回调函数 |

##### callback 返回值

| 参数名                     | 类型   | 说明                                |
| ------------------------- | ------ | ---------------------------------- |
| progress                  | Number | 下载进度百分比                       |
| totalBytesWritten         | Number | 已经下载的数据长度，单位 Bytes         |
| totalBytesExpectedToWrite | Number | 预期需要下载的数据总长度，单位 Bytes    |

### DownloadTask.offProgressUpdate(callback)

取消监听下载进度变化事件。callback 是可选的，如果不传则取消所有通过 onProgressUpdate 监听的下载进度变化事件。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                |
| -------- | -------- | ---- | ----------------------------------- |
| callback | Function | 否   | HTTP Response Header 事件的回调函数 |

### DownloadTask.onHeadersReceived(callback)

监听 HTTP Response Header 事件，会比下载完成事件更早。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                                                   |
| -------- | -------- | ---- | ---------------------------------------------------------------------- |
| callback | Function | 是   | HTTP Response Header 事件的回调函数，callback 的第一个参数为响应头对象 |

##### callback 返回值

| 参数名 | 类型   | 说明                                    |
| ------ | ------ | --------------------------------------- |
| header | Object | 开发者服务器返回的 HTTP Response Header |

### DownloadTask.offHeadersReceived(callback)

取消监听 HTTP Response Header 事件。callback 是可选的，如果不传则取消所有通过 onHeadersReceived 监听的 HTTP Response Header 事件。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                |
| -------- | -------- | ---- | ----------------------------------- |
| callback | Function | 否   | HTTP Response Header 事件的回调函数 |

#### 示例代码：

```javascript
const retDownloadTask = downloadtask.downloadFile({
  url: 'http://www.example.com',
  success: function(res){
    console.log("Download success.resp = " + JSON.stringify(res))
  },
  fail: function(data, code) {
    console.log(`handling fail, errMsg = ${data}`)
    console.log(`handling fail, errCode = ${code}`)
  }
})

// 中断下载任务
retDownloadTask.abort()

// 监听响应头事件
retDownloadTask.onHeadersReceived(header => {
  console.log(
    `listening for response header event, header = ${JSON.stringify(header)}`
  )
})

// 监听下载进度事件
retDownloadTask.onProgressUpdate(res => {
  console.log(
    `listening download progress update event, progressUpdate data = ${JSON.stringify(res)}`
  )
})

// 取消全部监听 HTTP Response Header 事件
retDownloadTask.offHeadersReceived()

// 取消全部监听下载进度事件
retDownloadTask.offProgressUpdate()
```

##### 取消特定的 HTTP Response Header 事件

```javascript
function cb(header) {
  console.log(
    `listening for response header event 1, header = ${JSON.stringify(header)}`
  )
}

// 此次监听会被取消
retDownloadTask.onHeadersReceived(cb)
// event2 监听依然有效，不会被取消
retDownloadTask.onHeadersReceived(header => {
  console.log(
    `listening for response header event 2, header = ${JSON.stringify(header)}`
  )
})

retDownloadTask.offHeadersReceived(cb)
```

##### 取消特定的 下载进度 事件

```javascript
function cb(res) {
  console.log(
    `listening for download progress update event 1, progressUpdate data = ${JSON.stringify(res)}`
  )
}

// 此次监听会被取消
retDownloadTask.onProgressUpdate(cb)
// event2 监听依然有效，不会被取消
retDownloadTask.onProgressUpdate(res => {
  console.log(
    `listening for download progress update event 2, progressUpdate data = ${JSON.stringify(res)}`
  )
})

retDownloadTask.offProgressUpdate(cb)
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
