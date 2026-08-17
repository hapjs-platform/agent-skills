# 视频 Video `1080+`

## 接口声明

```json
{ "name": "hap.io.Video" }
```

## 导入模块

```javascript
import Video from '@hap.io.Video' 或 const Video = require('@hap.io.Video')
```

## 接口定义

### 方法

#### new Video()

创建一个视频压缩任务实例

##### 参数：

| 参数名    | 类型   | 必填 | 说明                                                                                                                                                                                                       |
| --------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uri       | String | 是   | 原视频文件地址                                                                                                                                                                                             |
| height    | Number | 否   | 压缩后视频的高，单位像素，默认原视频高。部分视频压缩后实际高度会向上对齐 16 位（如传参数 300 压缩后为 304）。压缩后视频旋转角度处理为 0，所以原视频旋转角度为 90 或 270 时，压缩后实际宽高会和所设宽高互换 |
| width     | Number | 否   | 压缩后视频的宽，单位像素，默认原视频宽。部分视频压缩后实际宽度会向上对齐 16 位（如传参数 300 压缩后为 304）。压缩后视频旋转角度处理为 0，所以原视频旋转角度为 90 或 270 时，压缩后实际宽高会和所设宽高互换 |
| bitrate   | Number | 否   | 压缩后视频的码率，单位 bps(比特/秒)，默认原视频码率的 1/2。受硬件平台限制，无法精确控制实际压缩后的码率与所设定码率一致                                                                                    |
| framerate | Number | 否   | 压缩后视频的帧率，单位 fps(帧/秒)，默认原视频帧率，若获取不到原视频帧率，则默认为 30。受硬件平台限制，无法精确控制实际压缩后的帧率与所设定帧率一致                                                         |

##### 返回值：

| 类型    | 描述                |
| ------- | ------------------- |
| `Video` | 返回一个 Video 对象 |

##### 示例：

```javascript
var mVideoTask = new Video({
  uri: 'internal://temp/xxx.mp4'
})
```

#### Video.onprogressupdate = function(OBJECT)

对压缩任务注册进度监听

#### 参数：

| 参数名   | 类型     | 必填 | 说明                       |
| -------- | -------- | ---- | -------------------------- |
| callback | Function | 否   | 压缩进度变化时触发，频率 s |

#### callback 返回值：

| 参数名   | 类型   | 说明                              |
| -------- | ------ | --------------------------------- |
| progress | Number | 压缩进度，0~100，每秒有变化时更新 |

##### 示例：

```javascript
mVideoTask.onprogressupdate = function(data) {
  console.log(`progress: ${data.progress}`)
}
```

#### Video.compressVideo(OBJECT)

执行压缩视频任务

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| uri    | String | 压缩后视频文件地址   |
| name   | String | 视频文件名称         |
| size   | String | 视频文件大小，单位 B |

##### fail 返回错误代码：

| 错误码 | 说明                                                                                                     |
| ------ | -------------------------------------------------------------------------------------------------------- |
| 200    | 接口功能异常，可能原因：压缩任务已执行过 abort、系统版本过低(Android L 或以上才支持)                     |
| 202    | 参数错误，可能原因：uri 不合法、所设宽高为奇数、所设码率已高于原码率、所设参数过低或过高超出设备支持范围 |
| 203    | 找不到任务实例                                                                                           |
| 205    | 已发起了任务执行，无需再调用第二次                                                                       |
| 300    | IO 错误                                                                                                  |
| 1001   | 原视频无效，可能原因：传来的文件不是视频                                                                 |

##### 示例：

```javascript
mVideoTask.compressVideo({
  success: function(data) {
    console.log(
      `handling success,uri = ${data.uri}, name = ${data.name}, size = ${
        data.size
      }`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### Video.abort(OBJECT)

放弃执行该压缩任务，若该压缩任务正在进行，则中断压缩进程。

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### fail 返回错误代码：

| 错误码 | 说明                         |
| ------ | ---------------------------- |
| 200    | 该任务已经执行完成或已被中断 |
| 203    | 找不到任务实例               |

##### 示例：

```javascript
mVideoTask.abort({
  success: function(data) {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### Video.getVideoInfo(OBJECT)

获取视频信息

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| uri      | String   | 是   | 视频文件地址     |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名    | 类型   | 说明                                            |
| --------- | ------ | ----------------------------------------------- |
| uri       | String | 视频文件地址                                    |
| name      | String | 视频文件名称                                    |
| size      | String | 视频文件大小，单位 B                            |
| height    | Number | 视频高度，单位像素                              |
| width     | Number | 视频宽度，单位像素                              |
| bitrate   | Number | 视频码率，单位 bps(比特/秒)                     |
| framerate | Number | 视频帧率，单位 fps(帧/秒)。部分机型可能返回为空 |

##### fail 返回错误代码：

| 错误码 | 说明         |
| ------ | ------------ |
| 200    | 接口功能异常 |
| 202    | 参数错误     |

##### 示例：

```javascript
Video.getVideoInfo({
  uri: 'internal://temp/xxx.mp4',
  success: function(data) {
    console.log(
      `handling success,uri = ${data.uri}, name = ${data.name}, size = ${
        data.size
      }, height = ${data.height},width = ${data.width},bitrate = ${
        data.bitrate
      }, framerate = ${data.framerate}`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### Video.getVideoThumbnail(OBJECT)

获取视频缩略图

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| uri      | String   | 是   | 视频文件地址     |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型   | 说明           |
| ------ | ------ | -------------- |
| uri    | String | 缩略图文件地址 |

##### fail 返回错误代码：

| 错误码 | 说明         |
| ------ | ------------ |
| 200    | 接口功能异常 |
| 202    | 参数错误     |

##### 示例：

```javascript
Video.getVideoThumbnail({
  uri: 'internal://temp/xxx.mp4',
  success: function(data) {
    console.log(`handling success,uri = ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
