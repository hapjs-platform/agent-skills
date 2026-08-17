# 图片编辑 image `1000+`

## 接口声明

```json
{ "name": "system.image" }
```

## 导入模块

```javascript
import image from '@system.image' 或 const image = require('@system.image')
```

## 接口定义

### image.getImageInfo(OBJECT)

获取图片信息

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                       |
| -------- | -------- | ---- | -------------------------------------------------------------------------- |
| uri      | String   | 是   | 图片地址，可以是数据文件或应用内的资源。如果是应用内资源，必须使用绝对路径 |
| success  | Function | 否   | 成功回调                                                                   |
| fail     | Function | 否   | 失败回调                                                                   |
| complete | Function | 否   | 执行结束后的回调                                                           |

##### success 返回值：

| 参数名 | 类型    | 说明                    |
| ------ | ------- | ----------------------- |
| uri    | String  | 图片地址                |
| width  | Integer | 图片的宽度，单位为 px   |
| height | Integer | 图片的高度，单位为 px   |
| size   | Number  | 图片的大小，单位为 Byte |

##### fail 返回错误代码

| 错误码 | 说明           |
| ------ | -------------- |
| 202    | 参数错误       |
| 300    | I/O 错误       |
| 301    | 文件路径不存在 |

#### 示例：

```javascript
image.getImageInfo({
  uri: 'internal://tmp/abc.jpg',
  success: function(data) {
    console.log(`handling success: size = ${data.size}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### image.compressImage(OBJECT)

压缩图片

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                       |
| -------- | -------- | ---- | -------------------------------------------------------------------------- |
| uri      | String   | 是   | 图片地址，可以是数据文件或应用内的资源。如果是应用内资源，必须使用绝对路径 |
| quality  | Integer  | 否   | 图片的压缩质量，0-100 之间，默认是 75                                      |
| ratio    | Number   | 否   | 尺寸压缩倍数，必须大于 0，尺寸会变为原图的 1/ratio 大小                    |
| format   | String   | 否   | 图片保存格式，支持 JPEG，PNG，WEBP 三种格式。默认使用 JPEG 格式            |
| success  | Function | 否   | 成功回调                                                                   |
| fail     | Function | 否   | 失败回调                                                                   |
| complete | Function | 否   | 执行结束后的回调                                                           |

##### success 返回值：

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| uri    | String | 压缩后的图片地址 |

##### fail 返回错误代码

| 错误码 | 说明           |
| ------ | -------------- |
| 202    | 参数错误       |
| 300    | I/O 错误       |
| 301    | 文件路径不存在 |

#### 示例：

```javascript
image.compressImage({
  uri: 'internal://tmp/abc.jpg',
  quality: 80,
  ratio: 2, // 变为原图的1/2大小
  format: 'JPEG',
  success: function(data) {
    console.log(data.uri)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### image.applyOperations(OBJECT) `1000+`

对图片按顺序执行编辑操作。

在顺序执行编辑操作列表中的操作时，上一步操作生成的结果会作为下一步操作的输入，坐标系也是以上一步操作生成的结果的左上角为坐标原点重新确定的。

#### 参数：

| 参数名     | 类型        | 必填 | 说明                                                                           |
| ---------- | ----------- | ---- | ------------------------------------------------------------------------------ |
| uri        | String      | 是   | 图片地址，可以是数据文件或应用内的资源。如果是应用内资源，必须使用绝对路径     |
| operations | ObjectArray | 否   | 编辑操作列表，按照先后顺序执行。如果未提供，则不会执行编辑操作，仅重新保存图片 |
| quality    | Integer     | 否   | 图片的压缩质量，0-100 之间，默认是 75                                          |
| format     | String      | 否   | 图片保存格式，支持 JPEG，PNG，WEBP 三种格式。默认使用 JPEG 格式                |
| success    | Function    | 否   | 成功回调                                                                       |
| fail       | Function    | 否   | 失败回调                                                                       |
| complete   | Function    | 否   | 执行结束后的回调                                                               |

#### 支持的编辑操作

1. 图片裁剪

| 参数名 | 类型   | 必填 | 说明                            |
| ------ | ------ | ---- | ------------------------------- |
| action | String | 是   | 必须是 crop                     |
| x      | Number | 否   | 裁剪的起始点的 x 坐标，默认是 0 |
| y      | Number | 否   | 裁剪的起始点的 y 坐标，默认是 0 |
| width  | Number | 是   | 裁剪的图片宽度                  |
| height | Number | 是   | 裁剪的图片高度                  |

2. 图片缩放

| 参数名 | 类型   | 必填 | 说明                                                       |
| ------ | ------ | ---- | ---------------------------------------------------------- |
| action | String | 是   | 必须是 scale                                               |
| scaleX | Number | 否   | 宽度的缩放比率，缩放后宽度会变成原图的 scaleX 倍。默认是 1 |
| scaleY | Number | 否   | 高度的缩放比率，缩放后高度会变成原图的 scaleY 倍。默认是 1 |

3. 图片旋转

| 参数名 | 类型   | 必填 | 说明          |
| ------ | ------ | ---- | ------------- |
| action | String | 是   | 必须是 rotate |
| degree | Number | 是   | 旋转的角度    |

##### success 返回值：

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| uri    | String | 生成的图片的地址 |

##### fail 返回错误代码

| 错误码 | 说明           |
| ------ | -------------- |
| 202    | 参数错误       |
| 300    | I/O 错误       |
| 301    | 文件路径不存在 |

#### 示例：

```javascript
image.applyOperations({
  uri: 'internal://cache/123.png',
  operations: [
    {
      action: 'scale',
      scaleX: 0.5,
      scaleY: 0.5
    },
    {
      action: 'crop',
      width: 200,
      height: 200
    },
    {
      action: 'rotate',
      degree: 90
    }
  ],
  quality: 90,
  format: 'webp',
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### image.editImage(OBJECT)

打开编辑器来编辑图片。目前支持选择图片范围并裁剪。

#### 参数：

| 参数名               | 类型     | 必填 | 说明                                                                                                                              |
| -------------------- | -------- | ---- | --------------------------------------------------------------------------------------------------------------------------------- |
| uri                  | String   | 是   | 图片地址，可以是数据文件或应用内的资源。如果是应用内资源，必须使用绝对路径                                                        |
| aspectRatioX `1050+` | Integer  | 否   | 用于限定裁剪结果的宽高比，该参数指定宽高比中宽度比率。例如：aspectRatioX 为 16，aspectRatioY 为 9，则限定裁剪结果必须是 16:9 的图 |
| aspectRatioY `1050+` | Integer  | 否   | 用于限定裁剪结果的宽高比，该参数指定宽高比中宽度比率。例如：aspectRatioX 为 16，aspectRatioY 为 9，则限定裁剪结果必须是 16:9 的图 |
| success              | Function | 否   | 成功回调                                                                                                                          |
| fail                 | Function | 否   | 失败回调                                                                                                                          |
| cancel               | Function | 否   | 取消回调　　　                                                                                                                    |
| complete             | Function | 否   | 执行结束后的回调                                                                                                                  |

##### success 返回值：

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| uri    | String | 生成的图片的地址 |

##### fail 返回错误代码：

| 错误码 | 说明           |
| ------ | -------------- |
| 202    | 参数错误       |
| 300    | I/O 错误       |
| 301    | 文件路径不存在 |

#### 示例：

```javascript
image.editImage({
  uri: 'internal://cache/123.png',
  success: function(data) {
    console.log(`handling success: ${data.uri}`)
  },
  cancel: function() {
    console.log('handling cancel')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### image.getExifAttributes(OBJECT) `1040+`

获取图片的 exif 信息。支持的格式：JPEG,DNG,CR2,NEF,NRW,ARW,RW2,ORF,PEF,SRW,RAF,HEIF。

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                       |
| -------- | -------- | ---- | -------------------------------------------------------------------------- |
| uri      | String   | 是   | 图片地址，可以是数据文件或应用内的资源。如果是应用内资源，必须使用绝对路径 |
| success  | Function | 否   | 成功回调                                                                   |
| fail     | Function | 否   | 失败回调                                                                   |
| complete | Function | 否   | 执行结束后的回调                                                           |

##### success 返回值：

| 参数名     | 类型   | 说明             |
| ---------- | ------ | ---------------- |
| uri        | String | 图片地址         |
| attributes | Object | 图片的 exif 信息 |

##### fail 返回错误代码

| 错误码 | 说明           |
| ------ | -------------- |
| 202    | 参数错误       |
| 300    | I/O 错误       |
| 301    | 文件路径不存在 |

#### 示例：

```javascript
image.getExifAttributes({
  uri: 'internal://cache/123.png',
  success: function(data) {
    console.log(`handling success: ${JSON.stringify(data.attributes)}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### image.setExifAttributes(OBJECT) `1040+`

设置图片的 exif 信息。设置操作会直接在所给图片上进行，不会生成新的图片。支持的格式：JPEG。

#### 参数：

| 参数名     | 类型     | 必填 | 说明                                                                       |
| ---------- | -------- | ---- | -------------------------------------------------------------------------- |
| uri        | String   | 是   | 图片地址，可以是数据文件或应用内的资源。如果是应用内资源，必须使用绝对路径 |
| attributes | Object   | 是   | 要设置的 exif 属性列表　                                                   |
| success    | Function | 否   | 成功回调                                                                   |
| fail       | Function | 否   | 失败回调                                                                   |
| complete   | Function | 否   | 执行结束后的回调                                                           |

##### attributes 接受的 exif 属性：

Artist, BitsPerSample, Compression, Copyright, DateTime, ImageDescription, ImageLength, ImageWidth, JPEGInterchangeFormat, JPEGInterchangeFormatLength, Make, Model, Orientation, PhotometricInterpretation, PlanarConfiguration, PrimaryChromaticities, ReferenceBlackWhite, ResolutionUnit, RowsPerStrip, SamplesPerPixel, Software, StripByteCounts, StripOffsets, TransferFunction, WhitePoint, XResolution, YCbCrCoefficients, YCbCrPositioning, YCbCrSubSampling, YResolution, ApertureValue, BrightnessValue, CFAPattern, ColorSpace, ComponentsConfiguration, CompressedBitsPerPixel, Contrast, CustomRendered, DateTimeDigitized, DateTimeOriginal, DeviceSettingDescription, DigitalZoomRatio, ExifVersion, ExposureBiasValue, ExposureIndex, ExposureMode, ExposureProgram, ExposureTime, FNumber, FileSource, Flash, FlashEnergy, FlashpixVersion, FocalLength, FocalLengthIn35mmFilm, FocalPlaneResolutionUnit, FocalPlaneXResolution, FocalPlaneYResolution, GainControl, ISOSpeedRatings, ImageUniqueID, LightSource, MakerNote, MaxApertureValue, MeteringMode, NewSubfileType, OECF, PixelXDimension, PixelYDimension, RelatedSoundFile, Saturation, SceneCaptureType, SceneType, SensingMethod, Sharpness, ShutterSpeedValue, SpatialFrequencyResponse, SpectralSensitivity, SubfileType, SubSecTime, SubSecTimeDigitized, SubSecTimeOriginal, SubjectArea, SubjectDistance, SubjectDistanceRange, SubjectLocation, UserComment, WhiteBalance, GPSAltitude, GPSAltitudeRef, GPSAreaInformation, GPSDOP, GPSDateStamp, GPSDestBearing, GPSDestBearingRef, GPSDestDistance, GPSDestDistanceRef, GPSDestLatitude, GPSDestLatitudeRef, GPSDestLongitude, GPSDestLongitudeRef, GPSDifferential, GPSImgDirection, GPSImgDirectionRef, GPSLatitude, GPSLatitudeRef, GPSLongitude, GPSLongitudeRef, GPSMapDatum, GPSMeasureMode, GPSProcessingMethod, GPSSatellites, GPSSpeed, GPSSpeedRef, GPSStatus, GPSTimeStamp, GPSTrack, GPSTrackRef, GPSVersionID, InteroperabilityIndex, ThumbnailImageLength, ThumbnailImageWidth, DNGVersion, DefaultCropSize, ThumbnailImage, PreviewImageStart, PreviewImageLength, AspectFrame, SensorBottomBorder, SensorLeftBorder, SensorRightBorder, SensorTopBorder, ISO, JpgFromRaw

##### success 返回值：

| 参数名 | 类型   | 说明     |
| ------ | ------ | -------- |
| uri    | String | 图片地址 |

##### fail 返回错误代码

| 错误码 | 说明           |
| ------ | -------------- |
| 202    | 参数错误       |
| 300    | I/O 错误       |
| 301    | 文件路径不存在 |

#### 示例：

```javascript
image.setExifAttributes({
  uri: 'internal://cache/123.jpg',
  attributes: {
    Orientation: '1',
    Make: 'quick app'
  },
  success: function(data) {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
