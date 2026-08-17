# 地理位置 geolocation

## 接口声明

```json
{ "name": "system.geolocation" }
```

## 导入模块

```javascript
import geolocation from '@system.geolocation' 或 const geolocation = require('@system.geolocation')
```

## 接口定义

### geolocation.getLocation(OBJECT)

获取地理位置

#### 权限要求

精确设备定位

#### 参数：

| 参数名            | 类型     | 必填 | 说明                                                                                                                                                |
| ----------------- | -------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| timeout           | Number     | 否   | 设置超时时间，单位是 ms，默认值为 30000。在权限被系统拒绝或者定位设置不当的情况下，有可能永远不能返回结果，因而需要设置超时。超时后会使用 fail 回调 |
| coordType `1050+` | String   | 否   | 坐标系类型，可选值可通过 getSupportedCoordTypes 获取，默认为 wgs84                                                                                  |
| success           | Function | 是   | 成功回调                                                                                                                                            |
| fail              | Function | 否   | 失败回调，原因可能是用户拒绝                                                                                                                        |
| complete          | Function | 否   | 执行结束后的回调                                                                                                                                    |

##### success 返回值：

| 参数名           | 类型   | 说明   |
| ---------------- | ------ | ------ |
| longitude        | Number | 经度   |
| latitude         | Number | 纬度   |
| accuracy `1040+` | Number | 精确度 |
| time `1040+`     | Number | 时间   |

##### fail 返回错误代码

| 错误码       | 说明                       |
| ------------ | -------------------------- |
| 201          | 用户拒绝，获取定位权限失败 |
| 204          | 超时返回                   |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1000 `1000+` | 系统位置开关关闭           |

#### 示例：

```javascript
geolocation.getLocation({
  success: function(data) {
    console.log(
      `handling success: longitude = ${data.longitude}, latitude = ${
        data.latitude
      }`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### geolocation.openLocation(OBJECT) `1070+`

使用快应用内置地图查看位置，并且允许拉起第三方地图应用发起导航

#### 权限要求

精确设备定位

#### 参数：

| 参数名    | 类型     | 必填 | 说明                                        |
| --------- | -------- | ---- | ------------------------------------------- |
| latitude  | Number   | 是   | 纬度，范围为 -90~90，负数表示南纬           |
| longitude | Number   | 是   | 经度，范围为 -180~180，负数表示西经         |
| coordType | String   | 否   | 坐标系，支持 wgs84 和 gcj02，默认使用 wgs84 |
| scale     | Number   | 否   | 缩放比例，范围为 5~18，默认值是 18          |
| name      | String   | 否   | 位置名                                      |
| address   | String   | 否   | 地址的详细说明                              |
| success   | Function | 否   | 成功回调                                    |
| fail      | Function | 否   | 失败回调                                    |
| complete  | Function | 否   | 执行结束后的回调                            |

##### fail 返回错误代码

| 错误码 | 说明             |
| ------ | ---------------- |
| 201    | 用户拒绝，获取定位权限失败         |
| 202    | 经纬度参数非法   |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1000   | 跳转导航出错     |
| 1001   | 未安装地图应用   |

#### 示例：

```javascript
geolocation.openLocation({
  latitude: 22.553594050274,
  longitude: 114.0586290118,
  success: function() {
    console.log(`open location success`)
  },
  fail: function(data, code) {
    console.log(`open location fail, code = ${code}, errorMsg=${data}`)
  },
  complete: function() {
    console.log(`open location complete`)
  }
})
```

### geolocation.chooseLocation(OBJECT) `1070+`

打开快应用内置地图选择位置

#### 权限要求

精确设备定位

#### 参数：

| 参数名    | 类型     | 必填 | 说明                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| latitude  | Number   | 否   | 指定中心点纬度，如果为空则显示当前位置                       |
| longitude | Number   | 否   | 指定中心点经度，如果为空则显示当前位置                       |
| coordType | String   | 否   | 坐标系，支持 wgs84 和 gcj02，默认使用 wgs84。仅作用于指定中心点的经纬度坐标系，成功回调的返回值国内坐标固定使用 gcj02 坐标系，国外坐标固定使用 wgs84 坐标系 |
| success   | Function | 是   | 成功回调                                                     |
| fail      | Function | 否   | 失败回调                                                     |
| complete  | Function | 否   | 执行结束后的回调                                             |

##### success 返回值：

| 参数名    | 类型   | 说明                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| name      | String | 位置名称                                                     |
| address   | String | 详细地址                                                     |
| coordType | String | 返回值经纬度的坐标系，国内坐标固定使用 gcj02 坐标系，国外坐标固定使用 wgs84 坐标系 |
| latitude  | Number | 纬度，浮点数，范围为 -90~90，负数表示南纬                    |
| longitude | Number | 经度，浮点数，范围为 -180~180，负数表示西经                  |

##### fail 返回错误代码

| 错误码 | 说明         |
| ------ | ------------ |
| 201    | 用户拒绝，获取定位权限失败 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1000   | 所选位置无效 |

#### 示例：

```javascript
geolocation.chooseLocation({
  success: function(data) {
    console.log(
      `choose location success: name = ${data.name}, address = ${data.address}, coordType = ${data.coordType}, latitude = ${data.latitude}, longitude = ${data.longitude}`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  },
  complete: function() {
    console.log(`choose location complete`)
  }
})
```

### geolocation.getLocationType(OBJECT) `1010+`

获取系统当前支持的定位类型

#### 权限要求

精确设备定位

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 是   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型  | 说明                        |
| ------ | ----- | --------------------------- |
| types  | Array | 支持的类型['gps','network'] |

#### 示例：

```javascript
geolocation.getLocationType({
  success: function(data) {
    console.log(`handling success: locationType = ${data.types}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)  }
})
```

### geolocation.subscribe(OBJECT)

监听地理位置。如果多次调用，仅最后一次调用生效

#### 权限要求

精确设备定位

#### 参数：

| 参数名            | 类型     | 必填 | 说明                                                                                        |
| ----------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+`  | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| coordType `1050+` | String   | 否   | 坐标系类型，可选值可通过 getSupportedCoordTypes 获取，默认为 wgs84                          |
| callback          | Function | 是   | 每次位置信息发生变化，都会被回调                                                            |
| fail              | Function | 否   | 失败回调，原因可能是用户拒绝                                                                |

##### callback 返回值：

| 参数名           | 类型   | 说明   |
| ---------------- | ------ | ------ |
| longitude        | Number | 经度   |
| latitude         | Number | 纬度   |
| accuracy `1040+` | Number | 精确度 |
| time `1040+`     | Number | 时间   |

##### fail 返回错误代码

| 错误码       | 说明                       |
| ------------ | -------------------------- |
| 201          | 用户拒绝，获取定位权限失败 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1000 `1000+` | 系统位置开关关闭           |

#### 示例：

```javascript
geolocation.subscribe({
  callback: function(data) {
    console.log(
      `handling success: longitude = ${data.longitude}, latitude = ${
        data.latitude
      }`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### geolocation.unsubscribe()

取消监听地理位置

#### 参数：

无

#### 示例：

```javascript
geolocation.unsubscribe()
```

### geolocation.getSupportedCoordTypes() `1050+`

获取支持的坐标系类型

#### 参数：

无

#### 返回值：

字符串数组。当前支持的坐标系类型，如['wgs84']

#### 示例：

```javascript
var types = geolocation.getSupportedCoordTypes()
```

### geolocation.geocodeQuery(OBJECT) `1080+`

地理编码，只支持国内地理位置

#### 权限要求

无

#### 参数：

|   参数   |   类型   | 必填 |       说明       |
| :------: | :------: | :--: | :--------------: |
|   city   |  String  |  是  |   地址所在城市   |
| address  |  String  |  是  |       地址       |
| success  | Function |  是  |     成功回调     |
|   fail   | Function |  否  |     失败回调     |
| complete | Function |  否  | 执行结束后的回调 |

##### success 返回值：

|   参数    |  类型  | 说明 |
| :-------: | :----: | :--: |
| longitude | Number | 经度 |
| latitude  | Number | 纬度 |

#### 示例：

```javascript
geolocation.geocodeQuery({
        city: "武汉",
        address: "华中科技大学",
        success: function (ret) {
           console.info(`### geolocation.geocodeQuery ### ${ret.latitude}: ${ret.longitude}`)
        },
        fail: function (erromsg, errocode) {
          console.info(`### geolocation.geocodeQuery ### ${errocode}: ${erromsg}`)
        }
      })

```

### geolocation.reverseGeocodeQuery(OBJECT) `1080+`

逆地理编码，只支持国内地理位置

#### 权限要求

无

#### 参数：

| 参数           | 类型     | 必填 | 说明                                                         |
| -------------- | -------- | ---- | ------------------------------------------------------------ |
| longitude      | Number   | 是   | 经度                                                         |
| latitude       | Number   | 是   | 纬度                                                         |
| coordType      | String   | 否   | 坐标系，支持 wgs84 和 gcj02，默认使用 wgs84。                |
| includePoiInfo | Boolean  | 否   | success 回调的返回值是否需要包含设置位置附近的 POI 信息。默认 false ，即 success 回调中不返回 poiInfoList 信息 |
| success        | Function | 是   | 成功回调                                                     |
| fail           | Function | 否   | 失败回调，原因可能是用户拒绝                                 |
| complete       | Function | 否   | 执行结束后的回调                                             |

##### success 返回值：

|    参数     |  类型  |               说明               |
| :---------: | :----: | :------------------------------: |
| countryName | String |             国家名称             |
|  province   | String |             省份名称             |
|    city     | String |             城市名称             |
|  district   | String |             区县名称             |
|   street    | String | 街道名称（行政区划中的街道层级） |
|   address   | String |           简要地址信息           |
| poiInfoList | Array  | 设置位置附近的POI信息[{OBJECT}]  |

###### poiInfoList 中 OBJECT 参数

|   参数    |  类型  |   说明   |
| :-------: | :----: | :------: |
|  poiName  | String | poi名字  |
| longitude | Number |   经度   |
| latitude  | Number |   纬度   |
|   city    | String | 所在城市 |
|  address  | String |   地址   |
|   phone   | String |   电话   |

#### 示例：

```javascript
geolocation.reverseGeocodeQuery({
        latitude: 30.513070973744515,
        longitude: 114.41322124959942,
        coordType: "gcj02",
        includePoiInfo:true,
        success: function (ret) {
          console.info(`### geolocation.reverseGeocodeQuery ###` + JSON.stringify(ret))
        },
        fail: function (erromsg, errocode) {
          console.info(`### geolocation.reverseGeocodeQuery ### ${errocode}: ${erromsg}`)
        }
      })

```

## 后台运行限制

manifest 中申请后可用。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
