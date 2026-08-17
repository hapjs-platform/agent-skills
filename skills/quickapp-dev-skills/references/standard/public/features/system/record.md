# 录音 record `1000+`

## 接口声明

```json
{ "name": "system.record" }
```

## 导入模块

```javascript
import record from '@system.record' 或 const record = require('@system.record')
```

## 接口定义

### record.start(OBJECT)

开始录音。

#### 权限要求

录音

#### 参数：

| 参数名                   | 类型     | 必填 | 说明                                                                                                    |
| ------------------------ | -------- | ---- | ------------------------------------------------------------------------------------------------------- |
| duration `1010+`         | Number   | 否   | 录音时长，单位为 ms。如果 duration 为有效值将在达到指定值时停止录音                                     |
| sampleRate `1010+`       | Number   | 否   | 采样率。不同的音频格式所支持的采样率范围不同。对于 aac 格式，默认设置为 8000，建议使用 8000/16000/44100 |
| numberOfChannels `1010+` | Number   | 否   | 录音通道数，有效值 1/2                                                                                  |
| encodeBitRate `1010+`    | Number   | 否   | 编码码率。编码码率的取值与采样率和音频格式有关。对 aac 格式，建议按照下表中取值范围来选择编码码率       |
| frameSize `1200+`        | Number   | 否   | PCM音频数据帧大小，单位 Byte。传入 frameSize 后，每录制指定帧大小的内容后，会通过 onframerecorded 回调录制的文件内容，不指定则不会回调。<br>注意回调帧数据大小不一定是设置的frameSize，有可能会调整为一个合适的值 。                                                          |
| format `1010+`           | String   | 否   | 音频格式，有效值 3gpp/amr_nb/aac/pcm(`1200+`)。缺省为 3gpp。使用pcm格式时，如不指定 frameSize 参数，则不会回调onframerecorded。                                                           |
| success                  | Function | 否   | 成功回调                                                                                                |
| fail                     | Function | 否   | 失败回调                                                                                                |
| complete                 | Function | 否   | 执行结束后的回调                                                                                        |

##### aac 格式采样率及码率建议值对应表：

| 采样率 | 编码码率       |
| ------ | -------------- |
| 8000   | 16000 ~ 48000  |
| 16000  | 24000 ~ 96000  |
| 44100  | 64000 ~ 320000 |

##### success 返回值：

| 参数名 | 类型   | 说明                                   |
| ------ | ------ | -------------------------------------- |
| uri    | String | 录音文件的存储路径，在应用的缓存目录中 |

##### fail 返回错误代码

| 错误码 | 说明                           |
| ------ | ------------------------------ |
| 201    | 用户拒绝授权，获取录音权限失败 |
| 202 `1200+`    | 参数错误。如指定 bufferSize 参数 > 0 时，format 不为 pcm 格式则返回此错误 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
record.start({
  duration: 10000,
  sampleRate: 8000,
  numberOfChannels: 1,
  encodeBitRate: 16000,
  //frameSize:1024,
  //format: 'pcm',
  format: 'aac',
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### record.onframerecorded = function(data) `1200+` 
监听已录制完指定帧大小的文件事件。如果设置了 frameSize，则会回调此事件。

#### 参数
无。                              

#### data 返回值：

| 属性                    | 类型      | 说明                                                                                                    |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------- |
| frameBuffer        | ArrayBuffer | 录制的音频数据帧。通常音频数据帧大小为指定的 bufferSize,但是如果指定的 bufferSize 太小则会自动调整为一个合适的大小。       |
| isLastFrame        | boolean     | 是否是最后一帧数据。              |

#### 示例：

```javascript
record.onframerecorded = function (res){     
  //获取音频数据：res.frameBuffer
  //是否是最后一帧：res.isLastFrame 
}
```

### record.stop(OBJECT)

停止录音。

#### 参数：

无

#### 示例：

```javascript
record.stop()
```

## 后台运行限制

manifest 中申请后可用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
