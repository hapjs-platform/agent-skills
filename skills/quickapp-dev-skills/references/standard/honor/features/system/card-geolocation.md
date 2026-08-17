# 卡片地理位置 card.geolocation

> 该接口为**荣耀快应用引擎专有**接口，用于卡片引导用户授权后获取位置经纬度、省份城市等信息。与公共接口 [`@system.geolocation`](../../../public/features/system/geolocation.md) 不同，这是面向**卡片场景**的独立接口，并提供 `checkPermission` / `requestPermission` 权限管理方法。

> **支持版本**
> - 卡片：`6020+`
> - 快应用 App：不支持

## 接口配置

`system.card.geolocation` 需要**后台运行**，除在卡片 `features` 中声明外，还需在 `manifest.json` 的 `config.background.features` 中声明：

```json
"config": {
  "logLevel": "log",
  "background": {
    "features": [
      "system.card.geolocation"
    ]
  }
}
```

并在卡片 `widgets.<cardName>` 中设置 `minPlatformVersion: 6020`。

## 接口声明

```json
{ "name": "system.card.geolocation" }
```

## 导入模块

```javascript
import geolocation from '@system.card.geolocation'
// 或
const geolocation = require('@system.card.geolocation')
```

## 接口定义

### geolocation.checkPermission()

检测是否拥有地理位置权限。

- 权限要求：无

#### 参数：

| 参数名   | 类型     | 必填 | 说明                            |
| -------- | -------- | ---- | ------------------------------- |
| success  | Function | 是   | 成功回调，返回值 `success`      |
| fail     | Function | 否   | 失败回调                        |
| complete | Function | 否   | 执行结束后的回调                |

##### fail 返回错误代码：

| 错误码 | 说明             |
| ------ | ---------------- |
| 201    | 用户拒绝         |
| 1000   | 系统位置开关关闭 |

#### 示例：

```javascript
geolocation.checkPermission({
  success: function (data) {
    console.log(`handling success: ${data}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### geolocation.requestPermission()

申请地理位置权限。

- 权限要求：无（需用户主动点击后调用，`onInit` / `onShow` 中不允许直接调用）

#### 参数：

| 参数名   | 类型     | 必填 | 说明     |
| -------- | -------- | ---- | -------- |
| success  | Function | 是   | 成功回调 |
| fail     | Function | 否   | 失败回调 |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值（data）：

| 回调值 data | 说明             |
| ----------- | ---------------- |
| 0           | 授权「始终允许」 |
| 201         | 用户取消授权     |
| 1000        | 系统位置开关关闭 |
| 1101        | 卡片包名解析异常 |

#### 示例：

```javascript
geolocation.requestPermission({
  success: function (data) {
    console.log(`handling success: ${data}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### geolocation.getLocation(OBJECT)

获取地理位置。

- 权限要求：精确设备定位、后台定位

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                                                  |
| -------- | -------- | ---- | --------------------------------------------------------------------------------------------------------------------- |
| timeout  | Number   | 否   | 超时时间，单位 ms，默认 `30000`。权限被拒绝或定位设置不当时可能永远不返回，需设置超时，超时后触发 `fail` 回调         |
| success  | Function | 是   | 成功回调                                                                                                              |
| fail     | Function | 否   | 失败回调，原因可能是用户拒绝或未获得「始终允许」权限                                                                   |
| complete | Function | 否   | 执行结束后的回调                                                                                                      |

##### success 返回值：

| 参数名    | 类型   | 说明                                                |
| --------- | ------ | --------------------------------------------------- |
| longitude | Number | 经度（如 `114.054512`）                             |
| latitude  | Number | 纬度（如 `22.576229`）                              |
| accuracy  | Number | 精确度（如 `40`）                                   |
| time      | Number | 时间戳（如 `1653708531509`）                        |
| province  | String | 省份（直辖市返回城市名称，如「上海市」）             |
| city      | String | 城市（直辖市也返回城市名称，如「上海市」）           |

##### fail 返回错误代码：

| 错误码 | 说明                 |
| ------ | -------------------- |
| 200    | 获取地理位置为空     |
| 201    | 用户拒绝             |
| 203    | 获取系统定位服务异常 |
| 204    | 超时返回             |
| 1000   | 系统位置开关关闭     |

#### 示例：

```javascript
geolocation.getLocation({
  timeout: 30000,
  success: function (data) {
    console.log(`handling success: longitude = ${data.longitude}, latitude = ${data.latitude}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 使用建议

1. 在卡片初始化或用户添加卡片时（`onInit`）使用；如需刷新，在卡片曝光（`onShow`）中再次使用。
2. `onInit` / `onShow` 中**不允许**直接调用 `requestPermission`，只允许用户主动点击后调用。
3. `onInit` 调用检测权限 `checkPermission`：有权限则直接 `getLocation`；无权限则显示未授权按钮，提示用户点击调用 `requestPermission`。
4. 卡片初始化添加触发 `onInit` 时同时会触发 `onShow`，需做触发限制处理。
5. 二次及以上禁止权限后不再弹授权框，会引导用户前往系统设置页开启权限。

---

## 来源

- https://developer.honor.com/cn/doc/guides/100970
