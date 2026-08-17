# Banner 广告（荣耀）

> 荣耀广告能力（[`@service.ad`](ad.md)）的 Banner 广告形态，通过 `ad.createBannerAd` 创建。

> **支持版本**
> - 快应用 App：支持
> - 卡片：不支持

## 简介

Banner 广告是由快应用生成的图片以及视频组件，**层级最高**，默认在所有快应用原生组件的最上方。Banner 组件可以由 `style` 属性自由控制大小以及展示的位置。

## ad.createBannerAd(Object)

创建 Banner 广告组件。每次调用都会返回一个全新的实例。

### 参数：

| 属性          | 类型    | 必填 | 说明                                                                                       |
| ------------- | ------- | ---- | ------------------------------------------------------------------------------------------ |
| adUnitId      | String  | 是   | 广告位标识（从荣耀广告联盟平台申请）。错误的广告标识不会导致创建失败，但会触发广告错误事件 |
| style         | Object  | 否   | 广告组件的容器样式，默认展示在屏幕左上角                                                   |
| allowRecommend | Boolean | 是   | 是否支持个性化推荐，不传默认 `false`。影响广告内容精准性与收益，按用户是否允许个性化广告填写 |

#### style 结构（单位：px）

| 属性   | 类型   | 必填 | 说明                                                                                              |
| ------ | ------ | ---- | ------------------------------------------------------------------------------------------------- |
| left   | Number | 否   | 广告组件左上角横坐标（默认 `0`）                                                                  |
| top    | Number | 否   | 广告组件左上角纵坐标（默认 `0`）                                                                  |
| width  | Number | 否   | 广告组件宽度。宽高有一项未设置则用默认值（宽 `360dp`、高 `60dp`）；图文 banner 最小值 `360dp`/`60dp`；宽高比固定 `6:1`，按传入宽高取较小尺寸 |
| height | Number | 否   | 广告组件高度。规则同 `width`                                                                      |

> - px 与 dp 换算：`dp = 物理分辨率 / screenDensity`，`screenDensity` 可通过 `device.getInfo` 获取。
> - 广告 `style` 只支持在初始化创建时设置，**不支持后续修改**；需要改位置请重新创建实例。

### 返回值：

`bannerAd`：Banner 广告组件实例。

### 示例：

```javascript
let bannerAd = ad.createBannerAd({
  adUnitId: '',
  allowRecommend: false,
  style: {
    left: 0,
    top: 0,
    width: 1080,
    height: 720
  }
})
```

避免遮挡状态栏/标题（用 `device.getInfo` 的 `statusBarHeight`）：

```javascript
const deviceInfo = await device.getInfo()
const { statusBarHeight, screenWidth } = deviceInfo.data
// 防止广告覆盖状态栏
bannerAd.style.top = statusBarHeight
// 广告横向居中（style.width 最大有效值为广告位默认宽度，可能无法铺满屏幕）
if (screenWidth > '广告自身宽度') {
  bannerAd.style.left = (screenWidth - '广告自身宽度') / 2
}
```

## 实例方法

### bannerAd.load() `1123+`

加载 Banner 广告（加载后不会显示）。

#### success 返回值：

| 属性          | 类型   | 说明                                                                |
| ------------- | ------ | ------------------------------------------------------------------- |
| mediaBidMode  | Number | 价格模式：`0` 或缺省——托管模式；`1`——实时价格一价结算；`2`——二价结算 |
| mediaBid      | Number | 荣耀结算价格，仅 `mediaBidMode` 非 `0` 时填充，单位：分/cpm          |

```javascript
bannerAd.load().then(res => {
  console.log(`result=${res.data}`)
})
```

### bannerAd.sendWinNotification(Object) `1123+`

竞价成功接口，bidding 流程中必须调用以回传竞价结果。

| 属性               | 类型   | 必填 | 说明                                                                  |
| ------------------ | ------ | ---- | --------------------------------------------------------------------- |
| winPrice           | Number | 是   | 荣耀竞胜价格，单位：分/cpm。`mediaBidMode` 非 0 时传入 `mediaBid` 字段；为 0 时传 `0` |
| highestLossPrice   | Number | 是   | 最大竞败方出价，单位：分/cpm                                          |

**返回值：** 成功返回字符串 `success`。

```javascript
const res = bannerAd.sendWinNotification({ winPrice, highestLossPrice: 2000 })
```

### bannerAd.sendLossNotification(Object) `1123+`

竞价失败接口，bidding 流程中必须调用以回传竞价结果。

| 属性         | 类型   | 必填 | 说明                                                                                                  |
| ------------ | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| winPrice     | Number | 是   | 本次竞胜方出价，单位：分/cpm                                                                          |
| reason       | Number | 是   | 荣耀竞败原因：`1` 竞争力不足（荣耀非最高出价方）；`3` 报文不符合要求/素材不合法；`10001` 其他          |
| src          | String | 是   | 竞胜方来源：`csj` 穿山甲 / `ylh` 优量汇 / `ks` 快手 / `hw` 华为 / `oppo` / `vivo` / `xiaomi` / `others` |
| winPkg       | String | 是   | 竞胜包名（未能获取时可传空字符串）                                                                    |

**返回值：** 成功返回字符串 `success`。

```javascript
const res = bannerAd.sendLossNotification({
  winPrice: 2000,
  reason: 3,
  src: 'hw',
  winPkg: 'com.huawei.ad'
})
```

### bannerAd.show()

展示 Banner 广告（若还未加载，则先加载再展示）。

**返回值：** Promise，成功为 `success`。

```javascript
bannerAd.show().then(res => {
  console.log(`result=${res.data}`)
})
```

### bannerAd.hide()

隐藏 Banner 广告。

**返回值：** Promise，成功为 `success`。

```javascript
bannerAd.hide().then(res => {
  console.log(`result=${res.data}`)
})
```

### bannerAd.destroy()

销毁 Banner 广告。

```javascript
bannerAd.destroy()
```

## 实例事件

> 注：每次创建监听事件都会覆盖上一个监听事件。

### bannerAd.onLoad(Function) / bannerAd.offLoad()

监听 / 取消监听加载事件，`callback` 返回 `success`。

```javascript
bannerAd.onLoad(res => {
  if (res === 'success') { /* ... */ }
})
bannerAd.offLoad() // 取消监听
```

### bannerAd.onResize(Function) / bannerAd.offResize()

监听 / 取消监听尺寸变化事件。

| 属性   | 类型   | 说明             |
| ------ | ------ | ---------------- |
| left   | Number | 左上角横坐标     |
| top    | Number | 左上角纵坐标     |
| width  | Number | 缩放后的宽度     |
| height | Number | 缩放后的高度     |

```javascript
bannerAd.onResize(res => {
  console.log(`left=${res.left},top=${res.top},width=${res.width},height=${res.height}`)
})
bannerAd.offResize() // 取消监听
```

### bannerAd.onShow(Function) / bannerAd.offShow()

监听 / 取消监听显示事件，`callback` 返回 `success`。

```javascript
bannerAd.onShow(res => {
  if (res === 'success') { /* ... */ }
})
bannerAd.offShow() // 取消监听
```

### bannerAd.onHide(Function) / bannerAd.offHide()

监听 / 取消监听隐藏事件，`callback` 返回 `success`。

```javascript
bannerAd.onHide(res => {
  if (res === 'success') { /* ... */ }
})
bannerAd.offHide() // 取消监听
```

### bannerAd.onClose(Function) / bannerAd.offClose()

监听 / 取消监听关闭事件，`callback` 返回 `success`。

```javascript
bannerAd.onClose(res => {
  if (res === 'success') { /* ... */ }
})
bannerAd.offClose() // 取消监听
```

### bannerAd.onError(Function) / bannerAd.offError()

监听 / 取消监听错误事件。

| 属性        | 类型   | 说明                       |
| ----------- | ------ | -------------------------- |
| errCode     | Number | 错误码，见[通用错误码](ad.md#通用错误码) |
| subErrCode  | Number | 子错误码                   |
| errMsg      | String | 错误信息                   |

> 广告错误并不会显示广告组件。

```javascript
bannerAd.onError(res => {
  console.log(`errorCode=${res.errCode}`)
})
bannerAd.offError() // 取消监听
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101325
