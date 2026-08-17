# 多媒体 media

## 接口声明

```json
{ "name": "system.media" }
```

## 导入模块

```javascript
import media from '@system.media' 或 const media = require('@system.media')
```

## 接口定义

### media.takePhoto(OBJECT)

拍摄照片

#### 权限要求

使用相机

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名       | 类型   | 说明                   |
| ------------ | ------ | ---------------------- |
| uri          | String | 选取的文件路径         |
| name `1060+` | String | 选取的文件名称         |
| size `1060+` | Number | 选取的文件大小，单位 B |

##### fail 返回错误代码：

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 201    | 用户拒绝，获取相机权限失败 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
media.takePhoto({
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### media.takeVideo(OBJECT)

拍摄视频

#### 权限要求

使用相机

#### 参数：

| 参数名              | 类型     | 必填 | 说明                                              |
| ------------------- | -------- | ---- | ------------------------------------------------- |
| maxDuration `1080+` | Number   | 否   | 拍摄视频最长拍摄时间，单位 s，默认 60s            |
| success             | Function | 否   | 成功回调，参数示例如： {uri: 'file:///video.mp4'} |
| fail                | Function | 否   | 失败回调                                          |
| cancel              | Function | 否   | 取消回调                                          |
| complete            | Function | 否   | 执行结束后的回调                                  |

##### success 返回值：

| 参数名       | 类型   | 说明                   |
| ------------ | ------ | ---------------------- |
| uri          | String | 选取的文件路径         |
| name `1060+` | String | 选取的文件名称         |
| size `1060+` | Number | 选取的文件大小，单位 B |

##### fail 返回错误代码

| 错误码      | 说明                                 |
| ----------- | ------------------------------------ |
| 201         | 用户拒绝，获取相机权限失败           |
| 202 `1080+` | maxDuration 参数错误，不能小于等于 0 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
media.takeVideo({
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### media.pickImage(OBJECT)

选择图片

#### 权限要求

读手机存储

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名       | 类型   | 说明                   |
| ------------ | ------ | ---------------------- |
| uri          | String | 选取的文件路径         |
| name `1060+` | String | 选取的文件名称         |
| size `1060+` | Number | 选取的文件大小，单位 B |

#### 示例：

```javascript
media.pickImage({
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### media.pickImages(OBJECT) `1040+`

选择多张图片

#### 权限要求

读手机存储

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名        | 类型  | 说明                                   |
| ------------- | ----- | -------------------------------------- |
| uris          | Array | 选取的文件路径列表                     |
| files `1060+` | Array | 选取的文件列表，是一个 file 对象的数组 |

file 对象如下：

| 参数名 | 类型   | 说明                   |
| ------ | ------ | ---------------------- |
| uri    | String | 选取的文件路径         |
| name   | String | 选取的文件名称         |
| size   | Number | 选取的文件大小，单位 B |

#### 示例：

```javascript
media.pickImages({
  success: function(data) {
    console.log(`handling success: ${data.uris}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### media.pickVideo(OBJECT)

选择视频

#### 权限要求

读手机存储

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名       | 类型   | 说明                   |
| ------------ | ------ | ---------------------- |
| uri          | String | 选取的文件路径         |
| name `1060+` | String | 选取的文件名称         |
| size `1060+` | Number | 选取的文件大小，单位 B |

#### 示例：

```javascript
media.pickVideo({
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### media.pickVideos(OBJECT) `1040+`

选择多个视频

#### 权限要求

读手机存储

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名        | 类型  | 说明                                   |
| ------------- | ----- | -------------------------------------- |
| uris          | Array | 选取的文件路径列表                     |
| files `1060+` | Array | 选取的文件列表，是一个 file 对象的数组 |

file 对象如下：

| 参数名 | 类型   | 说明                   |
| ------ | ------ | ---------------------- |
| uri    | String | 选取的文件路径         |
| name   | String | 选取的文件名称         |
| size   | Number | 选取的文件大小，单位 B |

#### 示例：

```javascript
media.pickVideos({
  success: function(data) {
    console.log(`handling success: ${data.uris}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### media.pickFile(OBJECT)`1010+`

选择文件

#### 权限要求

读手机存储

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名       | 类型   | 说明                   |
| ------------ | ------ | ---------------------- |
| uri          | String | 选取的文件路径         |
| name `1060+` | String | 选取的文件名称         |
| size `1060+` | Number | 选取的文件大小，单位 B |

#### 示例：

```javascript
media.pickFile({
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### media.saveToPhotosAlbum(OBJECT)`1010+`

将图片/视频保存到相册中

注：从`1080`版本开始，图片和视频的保存路径发生了改变，以图片为例，规则如下：（视频场景下 Pictures 目录改为 Movies 即可）

快应用包名：manifest.json 的`package`属性值

快应用的应用名： manifest.json 的`name`属性值

1.没有设置 folderName

图片保存地址格式：sdcard/Pictures/"快应用包名"/"快应用的应用名"/xxx.jpg

2.手动设置了 folderName

图片保存地址格式：sdcard/Pictures/"快应用包名"/"folderName"/yyy.jpg

另外，从`1090`版本开始，`Android 10+`系统且硬件能力支持的机器，可以保存`HEIF/HEIC`类照片

#### 权限要求

写手机存储

#### 参数：

| 参数名             | 类型     | 必填 | 说明                                                                                                                                                           |
| ------------------ | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uri                | String   | 是   | 源文件的 uri，文件的扩展名必须是图片或视频的扩展名                                                                                                             |
| folderName `1080+` | String   | 否   | 图片/视频保存在相册中的`自定义文件夹名`，最大长度为 50 个字符，最多支持 10 级目录，每级目录名不超过 10 个字符。不能包含下列任何英文字符之一：\:\*?"<> &#124; . |
| success            | Function | 否   | 成功回调                                                                                                                                                       |
| fail               | Function | 否   | 失败回调                                                                                                                                                       |
| complete           | Function | 否   | 执行结束后的回调                                                                                                                                               |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 201    | 用户拒绝 |
| 202    | 参数错误 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 300    | I/O 错误 |

#### 示例：

```javascript
media.pickImage({
  success: data => {
    const imagePath = data.uri
    if (imagePath && imagePath.length > 0) {
      media.saveToPhotosAlbum({
        uri: imagePath,
        folderName: 'custom-folder',
        success: function() {
          console.log(`已保存图片于自定义目录：custom-folder`)
        },
        fail: function(data, code) {
          console.log(`保存图片失败, 错误码：${code}`)
        }
      })
    }
  },
  fail: function(data, code) {
    console.log(`选择图片失败, 错误码：${code}`)
  }
})
```

### media.previewImage(OBJECT)`1040+`

预览图片，调用之后会在新打开的页面中全屏预览传入的图片，预览的过程中用户可以左右滑动浏览，可以通过双指缩放图片，可以保存图片到相册。

#### 权限要求

写手机存储

#### 参数：

| 参数名   | 类型             | 必填 | 说明                                                                                                                                      |
| -------- | ---------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| current  | Number 或 String | 否   | 数据类型可选择 Number 或者 String：<br>Number：当前显示的图片的下标，默认 0；<br>String：当前显示的图片链接，默认为 uris 中的第一张的地址 |
| uris     | Array            | 是   | 需要预览的图片链接列表，同时支持网络和本地地址                                                                                            |
| success  | Function         | 否   | 接口调用成功的回调函数                                                                                                                    |
| fail     | Function         | 否   | 接口调用失败的回调函数                                                                                                                    |
| complete | Function         | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                                                                                          |

#### 示例：

```javascript
media.previewImage({
  current: 'http://www.xxx.com/a.jpg',
  uris: [
    'http://www.xxx.com/a.jpg',
    'http://www.xxx.com/b.jpg',
    'http://www.xxx.com/c.jpg'
  ],
  success: function() {
    console.log('preview success')
  },
  fail: function(data, code) {
    console.log('preview fail, code = ${code}')
  }
})
```

### media.getRingtone(OBJECT) `1040+`

获取系统铃声。如果是获取来电铃声，双卡情况下，获取的是卡 1 对应的铃声。

#### 权限要求

读手机存储

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                      |
| -------- | -------- | ---- | --------------------------------------------------------- |
| type     | String   | 是   | 铃声类型，ringtone：来电，notification：通知，alarm：闹钟 |
| success  | Function | 否   | 成功回调                                                  |
| fail     | Function | 否   | 失败回调                                                  |
| complete | Function | 否   | 执行结束后的回调                                          |

##### success 返回值：

| 参数名 | 类型   | 说明                                   |
| ------ | ------ | -------------------------------------- |
| title  | String | 铃声名称，若铃声被删除，返回空字符串。 |

##### fail 返回错误代码：

| 错误码 | 说明                     |
| ------ | ------------------------ |
| 202    | 参数错误，即铃声类型不对 |
| 203 `1120+` | 获取铃声能力不可用 |

#### 示例：

```javascript
media.getRingtone({
  type: 'ringtone',
  success: function(data) {
    console.log(`get ringtone success title: ${data.title}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### media.setRingtone(OBJECT) `1040+`

设置系统铃声，目前只支持本地文件。如果是设置来电铃声，双卡情况下，卡 1 卡 2 对应的铃声都会设置。

#### 权限要求

写手机存储。而且每次设置铃声时，都有弹框来让用户选择是否同意设置铃声。

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                      |
| -------- | -------- | ---- | --------------------------------------------------------- |
| uri      | String   | 是   | 铃声文件路径，只支持本地文件                              |
| type     | String   | 是   | 铃声类型，ringtone：来电，notification：通知，alarm：闹钟 |
| title    | String   | 否   | 铃声名称，没有设置默认取文件名                            |
| success  | Function | 否   | 成功回调                                                  |
| fail     | Function | 否   | 失败回调                                                  |
| complete | Function | 否   | 执行结束后的回调                                          |

##### fail 返回错误代码：

| 错误码 | 说明                                                                                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 201    | 用户拒绝                                                                                                                                                                          |
| 202    | 参数错误，即铃声类型不对，目前支持的铃声类型有 15 种，文件后缀分别为：.mp3、 .ogg、 .oga、 .flac、 .wav、 .m4a、 .amr、 .awb、 .wma、 .aac、 .mka、 .mid、 .midi、 .smf、 .imy 。 |
| 203 `1120+` | 设置铃声能力不可用 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1001   | 文件不存在                                                                                                                                                                        |

#### 示例：

```javascript
media.setRingtone({
  type: 'ringtone',
  uri: 'internal://mass/test/test.mp3',
  title: 'test',
  success: function() {
    console.log(`set ringtone success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

## 后台运行限制

`1090`版本之前，所有`system.meida`接口的方法均无法后台运行。

从`1090`版本开始，`system.meida`的`saveToPhotosAlbum`方法支持后台运行，且不需要与其他[后台运行](../../framework/background-running.md)接口一样，在 manifest.json 里配置 background 参数。

其他方法仍不支持后台运行。
