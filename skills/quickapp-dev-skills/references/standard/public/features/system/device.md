# 设备信息 device

## 接口声明

```json
{ "name": "system.device" }
```

## 导入模块

```javascript
import device from '@system.device' 或 const device = require('@system.device')
```

## 接口定义

### device.getInfo(OBJECT)

获取设备信息

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值                    | 类型    | 说明                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| brand                     | String  | 设备品牌                                                                                                                                                                                                                                                                                                                                                                |
| manufacturer              | String  | 设备生产商                                                                                                                                                                                                                                                                                                                                                              |
| model                     | String  | 设备型号                                                                                                                                                                                                                                                                                                                                                                |
| product                   | String  | 设备代号                                                                                                                                                                                                                                                                                                                                                                |
| osType                    | String  | 操作系统名称                                                                                                                                                                                                                                                                                                                                                            |
| osVersionName             | String  | 操作系统版本名称                                                                                                                                                                                                                                                                                                                                                        |
| osVersionCode             | Integer | 操作系统版本号                                                                                                                                                                                                                                                                                                                                                          |
| platformVersionName       | String  | 运行平台版本名称                                                                                                                                                                                                                                                                                                                                                        |
| platformVersionCode       | Integer | 运行平台版本号                                                                                                                                                                                                                                                                                                                                                          |
| language                  | String  | 系统语言                                                                                                                                                                                                                                                                                                                                                                |
| region                    | String  | 系统地区                                                                                                                                                                                                                                                                                                                                                                |
| screenWidth               | Integer | 屏幕宽                                                                                                                                                                                                                                                                                                                                                                  |
| screenHeight              | Integer | 屏幕高                                                                                                                                                                                                                                                                                                                                                                  |
| windowWidth `1030+`       | Integer | 可使用窗口宽度                                                                                                                                                                                                                                                                                                                                                          |
| windowHeight `1030+`      | Integer | 可使用窗口高度                                                                                                                                                                                                                                                                                                                                                          |
| statusBarHeight `1030+`   | Integer | 状态栏高度                                                                                                                                                                                                                                                                                                                                                              |
| screenDensity `1040+`     | Float   | 设备的屏幕密度                                                                                                                                                                                                                                                                                                                                                          |
| vendorOsName `1080+`      | String  | 手机厂商系统的名称，如 ColorOS                                                                                                                                                                                                                                                                                                                                          |
| vendorOsVersion `1080+`   | String  | 手机厂商系统的版本号                                                                                                                                                                                                                                                                                                                                                    |
| cutout `1080+`            | Array   | 针对异形屏(比如刘海屏、水滴屏和开孔屏)返回异形区域的位置大小。Array 中每个 item 表示一个异形区域的描述。item 参数：<br/>left:cutout 左边界距离屏幕左边距离<br/>top:cutout 上边界距离屏幕上边距离<br/>right:cutout 右边界距离屏幕右边距离<br/>bottom:cutout 下边界距离屏幕下边距离<br/>cutout 的坐标描述以竖屏为基准。即在横屏和竖屏下获取的 cutout 参数描述都是一样的。 |
| deviceType `1090+`        | String  | 当前快应用引擎的设备类型，手机版为'phone'，电视为'tv'，平板为'tablet'，折叠屏为'foldable'                                                                                                                                                                                                                                                                                                                               |
| screenRefreshRate `1100+` | Float   | 获取屏幕显示刷新率(获取帧率可能不为60, 90, 144等标准帧率)                                                                                                                                                                                                                                                                                                               |

#### 示例：

```javascript
device.getInfo({
  success: function(ret) {
    console.log(`handling success， brand = ${ret.brand}`)
  }
})
```

### device.getId(OBJECT)

批量获取设备标识，需要用户授权

#### 权限要求

获取手机状态

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                |
| -------- | -------- | ---- | ------------------------------------------------------------------- |
| type     | Array    | 是   | 支持 device、mac、user、advertising `1000+`四种类型，可提供一至多个 |
| success  | Function | 否   | 成功回调                                                            |
| fail     | Function | 否   | 失败回调                                                            |
| complete | Function | 否   | 执行结束后的回调                                                    |

##### success 返回值：

按照传入的 type 返回对应的 id，未在 type 中出现的 id 类型不会返回

| 参数名              | 类型   | 说明                                                                                                                                                                               |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device              | String | 设备唯一标识。在 Android 上返回 IMEI 或 MEID; 在 Android Q 之后，除了华为手机返回 aaid(应用匿名设备标识符)，其他厂商手机如果支持 oaid（匿名设备标识符）则返回 oaid，否则返回空值。 |
| mac                 | String | 设备的 mac 地址。在 Android M 及以上返回固定值：02:00:00:00:00:00                                                                                                                  |
| user                | String | 用户唯一标识。在 Android 上返回 androidid                                                                                                                                          |
| advertising `1000+` | String | 广告唯一标识                                                                                                                                                                       |

##### fail 返回错误代码

| 错误码 | 说明         |
| ------ | ------------ |
| 201    | 用户拒绝授权 |
| 207 `1100+`   | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
device.getId({
  type: ['device', 'mac'],
  success: function(data) {
    console.log(`handling success: ${data.device}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### device.getDeviceId(OBJECT) `1000+`

获取设备唯一标识。需要用户授权

#### 权限要求

获取手机状态

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值   | 类型   | 说明                                                                                                                                                                               |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| deviceId | String | 设备唯一标识。在 Android 上返回 IMEI 或 MEID; 在 Android Q 之后，除了华为手机返回 aaid(应用匿名设备标识符)，其他厂商手机如果支持 oaid（匿名设备标识符）则返回 oaid，否则返回空值。 |

##### fail 返回错误代码

| 错误码 | 说明         |
| ------ | ------------ |
| 201    | 用户拒绝授权 |
| 207 `1100+`   | 用户拒绝并勾选不再询问复选框 |

```javascript
device.getDeviceId({
  success: function(data) {
    console.log(`handling success: ${data.deviceId}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getUserId(OBJECT) `1000+`

获取用户唯一标识

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值 | 类型   | 说明                                      |
| ------ | ------ | ----------------------------------------- |
| userId | String | 用户唯一标识。在 Android 上返回 androidid |

```javascript
device.getUserId({
  success: function(data) {
    console.log(`handling success: ${data.userId}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getAdvertisingId(OBJECT) `1000+`

获取广告唯一标识

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值        | 类型   | 说明         |
| ------------- | ------ | ------------ |
| advertisingId | String | 广告唯一标识 |

```javascript
device.getAdvertisingId({
  success: function(data) {
    console.log(`handling success: ${data.advertisingId}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getSerial(OBJECT) `1040+`

获取设备序列号

#### 权限要求

获取手机状态

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调，根据Android平台要求，Android 10开始不允许向第三方应用提供SN，该接口将回调fail，建议使用其他系统标识符如OAID替代         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值 | 类型   | 说明       |
| ------ | ------ | ---------- |
| serial | String | 设备序列号 |

```javascript
device.getSerial({
  success: function(data) {
    console.log(`handling success: ${data.serial}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getTotalStorage(OBJECT) `1000+`

获取存储空间的总大小

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值       | 类型 | 说明                                                                 |
| ------------ | ---- | -------------------------------------------------------------------- |
| totalStorage | Number | 存储空间的总大小，单位是 Byte。在 Android 上返回的是外部存储的总大小 |

```javascript
device.getTotalStorage({
  success: function(data) {
    console.log(`handling success: ${data.totalStorage}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getAvailableStorage(OBJECT) `1000+`

获取存储空间的可用大小

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值           | 类型 | 说明                                                                     |
| ---------------- | ---- | ------------------------------------------------------------------------ |
| availableStorage | Number | 存储空间的可用大小，单位是 Byte。在 Android 上返回的是外部存储的可用大小 |

```javascript
device.getAvailableStorage({
  success: function(data) {
    console.log(`handling success: ${data.availableStorage}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getCpuInfo(OBJECT) `1000+`

返回 CPU 信息

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值  | 类型   | 说明                                                    |
| ------- | ------ | ------------------------------------------------------- |
| cpuInfo | String | CPU 信息。在 Android 上返回的是/proc/cpuinfo 文件的内容 |

```javascript
device.getCpuInfo({
  success: function(data) {
    console.log(`handling success: ${data.cpuInfo}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.getOAID(OBJECT) `1060+`

返回厂商设备标识符中的 OAID（匿名设备标识符）

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值 | 类型   | 说明                                          |
| ------ | ------ | --------------------------------------------- |
| oaid   | String | oaid 的值,如果当前手机还不支持 oaid，返回空值 |

```javascript
device.getOAID({
  success: function(data) {
    console.log(`handling success: ${data.oaid}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### device.platform`1030+`

同步方法获取平台版本信息

##### 返回值：

返回 platform 对象，包含下列属性

| 属性        | 类型    | 说明             |
| ----------- | ------- | ---------------- |
| versionName | String  | 运行平台版本名称 |
| versionCode | Integer | 运行平台版本号   |

#### 示例：

```javascript
var device = require('@system.device')
var platform = device.platform
var versionName = platform.versionName
var versionCode = platform.versionCode
```

### 属性 `1060+`

| 名称              | 参数类型 | 是否可读 | 是否可写 | 描述                                                          |
| ----------------- | -------- | -------- | -------- | ------------------------------------------------------------- |
| allowTrackOAID 　 | Boolean  | 是       | 否       | 限制 oaid 以及 android q 以上的 deviceId 是否可以用于广告跟踪 |

#### 示例：

```javascript
var device = require('@system.device')
var allowTrackOAID = device.allowTrackOAID
```

### device.host`1070+`

同步方法获取宿主信息

##### 返回值：

返回`host`对象。在应用模式下，返回引擎包名，如 org.hapjs.mockup。卡片模式下，返回加载卡片的宿主信息，包含下列属性

| 属性        | 类型    | 说明                                            |
| ----------- | ------- | ----------------------------------------------- |
| package     | String  | 宿主的包名。如调试器的名称是 org.hapjs.debugger |
| versionName | String  | 宿主的版本名称                                  |
| versionCode | Integer | 宿主的版本号                                    |

#### 示例：

```javascript
var device = require('@system.device')
var host = device.host
var package = host.package
var versionName = host.versionName
var versionCode = host.versionCode
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
