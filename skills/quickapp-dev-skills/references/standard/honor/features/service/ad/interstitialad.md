# 插屏广告（荣耀）

> 荣耀广告能力（[`@service.ad`](ad.md)）的插屏广告形态，通过 `ad.createInterstitialAd` 创建。

> **支持版本**
> - 快应用 App：支持
> - 卡片：不支持

## 简介

插屏广告是由快应用生成的图片以及视频组件，**层级最高**，默认在所有快应用原生组件的最上方。插屏广告位于屏幕**居中显示**，广告大小固定不可控制。

## ad.createInterstitialAd(Object)

创建插屏广告组件。每次调用都会返回一个全新的实例。

### 参数：

| 属性           | 类型    | 必填 | 说明                                                                                         |
| -------------- | ------- | ---- | -------------------------------------------------------------------------------------------- |
| adUnitId       | String  | 是   | 广告位标识（从荣耀广告联盟平台申请）。错误的广告标识不会导致创建失败，但会触发广告错误事件。配置了竞价的广告位只能在 `1119+` 版本使用 |
| allowRecommend | Boolean | 是   | 是否支持个性化推荐，不传默认 `false`。影响广告内容精准性与收益，按用户是否允许个性化广告填写 |

### 返回值：

`interstitialAd`：插屏广告组件实例。

### 示例：

```javascript
let interstitialAd = ad.createInterstitialAd({
  adUnitId: '',
  allowRecommend: false
})
```

## 实例方法

### interstitialAd.load()

加载插屏广告（加载完后不会显示）。

#### success 返回值：

| 属性                 | 类型   | 说明                                                                |
| -------------------- | ------ | ------------------------------------------------------------------- |
| mediaBidMode `1123+` | Number | 价格模式：`0` 或缺省——托管模式；`1`——实时价格一价结算；`2`——二价结算 |
| mediaBid `1123+`     | Number | 荣耀结算价格，仅 `mediaBidMode` 非 `0` 时填充，单位：分/cpm          |

```javascript
interstitialAd.load().then(res => {
  console.log(`result=${res.data}`)
})
```

### interstitialAd.sendWinNotification(Object) `1123+`

竞价成功接口，bidding 流程中必须调用以回传竞价结果。

| 属性             | 类型   | 必填 | 说明                                                                  |
| ---------------- | ------ | ---- | --------------------------------------------------------------------- |
| winPrice         | Number | 是   | 荣耀竞胜价格，单位：分/cpm。`mediaBidMode` 非 0 时传入 `mediaBid` 字段；为 0 时传 `0` |
| highestLossPrice | Number | 是   | 最大竞败方出价，单位：分/cpm                                          |

**返回值：** 成功返回字符串 `success`。

```javascript
const res = interstitialAd.sendWinNotification({ winPrice, highestLossPrice: 2000 })
```

### interstitialAd.sendLossNotification(Object) `1123+`

竞价失败接口，bidding 流程中必须调用以回传竞价结果。

| 属性     | 类型   | 必填 | 说明                                                                                                  |
| -------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| winPrice | Number | 是   | 本次竞胜方出价，单位：分/cpm                                                                          |
| reason   | Number | 是   | 荣耀竞败原因：`1` 竞争力不足（荣耀非最高出价方）；`3` 报文不符合要求/素材不合法；`10001` 其他          |
| src      | String | 是   | 竞胜方来源：`csj` 穿山甲 / `ylh` 优量汇 / `ks` 快手 / `hw` 华为 / `oppo` / `vivo` / `xiaomi` / `others` |
| winPkg   | String | 是   | 竞胜包名（未能获取时可传空字符串）                                                                    |

**返回值：** 成功返回字符串 `success`。

```javascript
const res = interstitialAd.sendLossNotification({
  winPrice: 2000,
  reason: 3,
  src: 'hw',
  winPkg: 'com.huawei.ad'
})
```

### interstitialAd.show()

展示插屏广告（若还未加载，则先加载再展示）。

**返回值：** Promise，成功为 `success`。

```javascript
interstitialAd.show().then(res => {
  console.log(`result=${res.data}`)
})
```

### interstitialAd.destroy()

销毁插屏广告。

```javascript
interstitialAd.destroy()
```

## 实例事件

> 注：每次创建监听事件都会覆盖上一个监听事件。

### interstitialAd.onLoad(Function) / interstitialAd.offLoad()

监听 / 取消监听加载事件，`callback` 返回 `success`。

```javascript
interstitialAd.onLoad(res => {
  if (res === 'success') { /* ... */ }
})
interstitialAd.offLoad() // 取消监听
```

### interstitialAd.onShow(Function) / interstitialAd.offShow()

监听 / 取消监听显示事件，`callback` 返回 `success`。

```javascript
interstitialAd.onShow(res => {
  if (res === 'success') { /* ... */ }
})
interstitialAd.offShow() // 取消监听
```

### interstitialAd.onClose(Function) / interstitialAd.offClose()

监听 / 取消监听关闭事件，`callback` 返回 `success`。

```javascript
interstitialAd.onClose(res => {
  if (res === 'success') { /* ... */ }
})
interstitialAd.offClose() // 取消监听
```

### interstitialAd.onError(Function) / interstitialAd.offError()

监听 / 取消监听错误事件。

| 属性       | 类型   | 说明                                |
| ---------- | ------ | ----------------------------------- |
| errCode    | Number | 错误码，见[通用错误码](ad.md#通用错误码) |
| subErrCode | Number | 子错误码                            |
| errMsg     | String | 错误信息                            |

```javascript
interstitialAd.onError(res => {
  console.log(`errorCode=${res.errCode}`)
})
interstitialAd.offError() // 取消监听
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101326
