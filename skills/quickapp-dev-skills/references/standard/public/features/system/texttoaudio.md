# 语音合成 texttoaudio `1080+`

## 接口声明

```json
{ "name": "service.texttoaudio" }
```

## 导入模块

```javascript
import texttoaudio from '@service.texttoaudio' 或 const texttoaudio = require('@service.texttoaudio')
```

## 接口定义

### 方法

#### texttoaudio.speak(OBJECT)

语音播报，输入需要播报的文本内容，实时播报

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                                                    |
| -------- | -------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| lang     | String   | 是   | 文本语言 zh_CN（中国大陆）en_US(英文)                                                                                   |
| content  | String   | 是   | 需要播报的文本内容，限制长度小于 4000 个字符                                                                            |
| rate     | Number   | 否   | 设置语速，不设置默认为正常值（1），取值大于 0，不同语音引擎取值区间不同，超过将取区间边界值。（0.5 为半速、2 为二倍速） |
| pitch    | Number   | 否   | 设置音调，不设置默认为正常值（1），取值大于 0，不同语音引擎取值区间不同，超过将取区间边界值。（值越大音调越高）         |
| success  | Function | 否   | 成功回调                                                                                                                |
| fail     | Function | 否   | 失败回调                                                                                                                |
| complete | Function | 否   | 执行结束后的回调                                                                                                        |

##### success 返回值：

| 参数名      | 类型   | 说明                       |
| ----------- | ------ | -------------------------- |
| utteranceId | String | 请求成功，本次操作唯一标识 |

##### fail 返回错误代码：

| 错误码 | 说明                                               |
| ------ | -------------------------------------------------- |
| 202    | 参数错误                                           |
| 1001   | 系统版本过低，不支持此功能(Android L 或以上才支持) |
| 1002   | 初始化失败                                         |
| 1003   | 输入的文本长度超限                                 |
| 1004   | 语言不支持                                         |

##### 示例：

```javascript
texttoaudio.speak({
  lang: 'zh_CN',
  content: '这是语音播报效果',
  pitch: 1,
  rate: 1,
  success: function(data) {
    console.log(`handling success, utteranceId = ${data.utteranceId}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### texttoaudio.textToAudioFile(OBJECT)

语音合成，输入需要合成的文本内容，生成本地音频文件

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                                                    |
| -------- | -------- | ---- | ----------------------------------------------------------------------------------------------------------------------- |
| lang     | String   | 是   | 文本语言 zh_CN（中国大陆）en_US(英文)                                                                                   |
| content  | String   | 是   | 需要合成的文本内容，限制长度小于 4000 个字符                                                                            |
| rate     | Number   | 否   | 设置语速，不设置默认为正常值（1），取值大于 0，不同语音引擎取值区间不同，超过将取区间边界值。（0.5 为半速、2 为二倍速） |
| pitch    | Number   | 否   | 设置音调，不设置默认为正常值（1），取值大于 0，不同语音引擎取值区间不同，超过将取区间边界值。（值越大音调越高）         |
| success  | Function | 否   | 成功回调                                                                                                                |
| fail     | Function | 否   | 失败回调                                                                                                                |
| complete | Function | 否   | 执行结束后的回调                                                                                                        |

##### success 返回值：

| 参数名      | 类型   | 说明                       |
| ----------- | ------ | -------------------------- |
| filePath    | String | 生成文件路径               |
| utteranceId | String | 请求成功，本次操作唯一标识 |

##### fail 返回错误代码：

| 错误码 | 说明                                               |
| ------ | -------------------------------------------------- |
| 202    | 参数错误                                           |
| 1001   | 系统版本过低，不支持此功能(Android L 或以上才支持) |
| 1002   | 初始化失败                                         |
| 1003   | 输入的文本长度超限                                 |
| 1004   | 语言不支持                                         |
| 1005   | io 异常                                            |

##### 示例：

```javascript
texttoaudio.textToAudioFile({
  lang: 'zh_CN',
  content: '这是语音播报效果',
  pitch: 1,
  rate: 1,
  success: function(data) {
    console.log(
      `handling success,filePath = ${data.filePath}, utteranceId = ${
        data.utteranceId
      }`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### texttoaudio.isLanguageAvailable(OBJECT)

是否支持语言类型

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                  |
| -------- | -------- | ---- | ------------------------------------- |
| lang     | String   | 是   | 文本语言 zh_CN（中国大陆）en_US(英文) |
| success  | Function | 否   | 成功回调                              |
| fail     | Function | 否   | 失败回调                              |
| complete | Function | 否   | 执行结束后的回调                      |

##### success 返回值：

| 参数名      | 类型    | 说明                      |
| ----------- | ------- | ------------------------- |
| isAvailable | Boolean | true：支持，false：不支持 |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 内部错误 |
| 202    | 参数错误 |

##### 示例：

```javascript
texttoaudio.isLanguageAvailable({
  lang: 'zh_CN',
  success: function(data) {
    console.log(`isAvailable: ${data.isAvailable}`)
  }
})
```

#### texttoaudio.onttsstatechange = function(data)

注册状态监听，监听每个操作的状态，通过 id 区分（语音播报 id 的前缀为"speak"，语音合成 id 的前缀为"speakAudio"）

##### data 返回值：

| 属性        | 类型   | 说明                                                               |
| ----------- | ------ | ------------------------------------------------------------------ |
| utteranceId | String | 操作对应的 id 标识                                                 |
| state       | String | 本次操作的状态，可能的取值有四种: onStart、onDone、onStop、onError |

##### 示例：

```javascript
texttoaudio.onttsstatechange = function(data) {
  console.log(`utteranceId: ${data.utteranceId}, state: ${data.state}`)
}
```

#### texttoaudio.stop()

停止，无论当前处于语音播报还是保存到文件的过程

##### 参数：无

##### 返回值：

| 返回值 | 说明     |
| ------ | -------- |
| 0      | 请求成功 |
| -1     | 请求失败 |

##### 示例：

```javascript
texttoaudio.stop()
```

#### texttoaudio.isSpeaking()

判断语音是否正在播放或者合成

##### 参数：无

##### 返回值：

| 返回值 | 说明                 |
| ------ | -------------------- |
| true   | 正在播报或合成过程中 |
| false  | 不在播报或合成过程中 |

##### 示例：

```javascript
console.log(`isSpeaking: ${texttoaudio.isSpeaking()}`)
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
