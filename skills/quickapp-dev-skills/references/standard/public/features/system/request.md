# 上传下载 request

## 接口声明

```json
{ "name": "system.request" }
```

## 导入模块

```javascript
import request from '@system.request' 或 const request = require('@system.request')
```

## 接口定义

### request.upload(OBJECT)

上传文件

#### 参数：

| 参数名       | 类型     | 必填 | 说明                                                                                         |
| ------------ | -------- | ---- | -------------------------------------------------------------------------------------------- |
| url          | String   | 是   | 资源 url                                                                                     |
| header       | Object   | 否   | 请求的 header，会将其所有属性设置到请求的 header 部分。User-Agent 设置在`1040`版本开始支持。 |
| method       | String   | 否   | 默认为 POST，可以是： POST, PUT                                                              |
| files        | Array    | 是   | 需要上传的文件列表，使用 multipart/form-data 方式提交                                        |
| data `1000+` | Array    | 否   | HTTP 请求中其他额外的 form data                                                              |
| success      | Function | 否   | 成功返回的回调函数                                                                           |
| fail         | Function | 否   | 失败的回调函数                                                                               |
| complete     | Function | 否   | 结束的回调函数（调用成功、失败都会执行）                                                     |

##### files 参数 ：

files 参数是一个 file 对象的数组，file 对象的结构如下：

| 参数名   | 类型   | 必填 | 说明                                                              |
| -------- | ------ | ---- | ----------------------------------------------------------------- |
| filename | String | 否   | multipart 提交时，header 中的文件名                               |
| name     | String | 否   | multipart 提交时，表单的项目名，默认 file                         |
| uri      | String | 是   | 文件的本地地址                                                    |
| type     | String | 否   | 文件的 Content-Type 格式，默认会根据 filename 或者 uri 的后缀获取 |

##### data 参数 `1000+`：

| 参数名 | 类型   | 必填 | 说明              |
| ------ | ------ | ---- | ----------------- |
| name   | String | 是   | form 元素的名称。 |
| value  | String | 是   | form 元素的值。   |

##### success 返回值：

| 参数名  | 类型    | 说明                                                                                                                                                                                                                        |
| ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code    | Integer | 服务器状态 code                                                                                                                                                                                                             |
| data    | String  | 如果服务器返回的 header 中 type 是 text/\*或 application/json、application/javascript、application/xml，值是文本内容，否则是存储的临时文件的 uri 临时文件如果是图片或者视频内容，可以将图片设置到 image 或 video 控件上显示 |
| headers | Object  | 服务器 response 的所有 header                                                                                                                                                                                               |

#### 示例：

```javascript
request.upload({
  url: 'http://www.example.com',
  files: [
    {
      uri: 'internal://xxx/xxx/test',
      name: 'file1',
      filename: 'test.png'
    }
  ],
  data: [
    {
      name: 'param1',
      value: 'value1'
    }
  ],
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### request.download(OBJECT)

下载文件

#### 参数：

| 参数名              | 类型     | 必填 | 说明                                                                                         |
| ------------------- | -------- | ---- | -------------------------------------------------------------------------------------------- |
| url                 | String   | 是   | 资源 url                                                                                     |
| header              | String   | 否   | 请求的 header，会将其所有属性设置到请求的 header 部分。User-Agent 设置在 1040 版本开始支持。 |
| description `1010+` | String   | 否   | 下载描述，会用于通知栏标题。默认为文件名                                                     |
| filename `1010+`    | String   | 否   | 下载文件名。默认从网络请求或 url 中获取                                                      |
| success             | Function | 否   | 成功返回的回调函数                                                                           |
| fail                | Function | 否   | 失败的回调函数                                                                               |
| complete            | Function | 否   | 结束的回调函数（调用成功、失败都会执行）                                                     |

##### success 返回值：

| 参数名 | 类型   | 说明                                    |
| ------ | ------ | --------------------------------------- |
| token  | String | 下载的 token，根据此 token 获取下载状态 |

#### 示例：

```javascript
request.download({
  url: 'http://www.example.com',
  success: function(data) {
    console.log(`handling success${data.token}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### request.onDownloadComplete(OBJECT)

监听下载任务

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                     |
| -------- | -------- | ---- | ---------------------------------------- |
| token    | String   | 是   | download 接口返回的 token                |
| success  | Function | 否   | 成功返回的回调函数                       |
| fail     | Function | 否   | 失败的回调函数                           |
| complete | Function | 否   | 结束的回调函数（调用成功、失败都会执行） |

##### success 返回值：

| 参数名 | 类型   | 说明                                                         |
| ------ | ------ | ------------------------------------------------------------ |
| uri    | String | 下载文件的 Uri（默认情况下该文件处于应用缓存目录。如果文件类型为图片或者视频且要求用户可以在相册等应用内查看，则需要将该文件转存至公共目录，参考media接口中的方法实现即可） |

##### fail 返回错误代码：

| 错误码　 | 说明           |
| -------- | -------------- |
| 1000     | 下载失败       |
| 1001     | 下载任务不存在 |

#### 示例：

```javascript
request.onDownloadComplete({
  token: '123',
  success: function(data) {
    console.log(`handling success${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

manifest 中申请后可用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
