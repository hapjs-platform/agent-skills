# 激励广告（荣耀）

> 荣耀广告能力（[`@service.ad`](ad.md)）的激励视频广告形态，通过 `ad.createRewardedVideoAd` 创建。

> **支持版本**
> - 快应用 App：支持
> - 卡片：不支持

## 简介

激励广告可提供奖励式交互吸引用户观看，高点击、高观看率，并在用户完成激励后以回调方式通知快应用。

## ad.createRewardedVideoAd(Object)

创建激励广告组件。每次调用都会返回一个全新的实例。

### 参数：

| 属性           | 类型    | 必填 | 说明                                                                                         |
| -------------- | ------- | ---- | -------------------------------------------------------------------------------------------- |
| adUnitId       | String  | 是   | 广告位标识（从荣耀广告联盟平台申请）。错误的广告标识不会导致创建失败，但会触发广告错误事件。配置了竞价的广告位只能在 `1119+` 版本使用 |
| allowRecommend | Boolean | 是   | 是否支持个性化推荐，不传默认 `false`。影响广告内容精准性与收益，按用户是否允许个性化广告填写 |

### 返回值：

`rewardedVideoAd`：激励视频广告组件实例。

### 示例：

```javascript
let rewardedVideoAd = ad.createRewardedVideoAd({
  adUnitId: '',
  allowRecommend: false
})
```

## 实例方法

### rewardedVideoAd.preload() `1125+`

预加载激励视频广告（预加载后不会显示），可提前加载以优化体验。`1125+` 推荐使用 `preload` 替代 `load`。

#### success 返回值：

| 属性          | 类型   | 说明                                                                |
| ------------- | ------ | ------------------------------------------------------------------- |
| mediaBidMode  | Number | 价格模式：`0` 或缺省——托管模式；`1`——实时价格一价结算；`2`——二价结算 |
| mediaBid      | Number | 荣耀结算价格，仅 `mediaBidMode` 非 `0` 时填充，单位：分/cpm          |

```javascript
rewardedVideoAd.preload().then(res => {
  console.log(`result=${res.data}`)
})
```

### rewardedVideoAd.load()

加载激励视频广告（加载完后不会显示），可提前加载以优化体验。`1125+` 推荐使用 `preload`。

#### success 返回值：

- 当 `manifest.json` 的 `minPlatformVersion >= 1123` 时返回竞价参数：

| 属性          | 类型   | 说明                                                                |
| ------------- | ------ | ------------------------------------------------------------------- |
| mediaBidMode  | Number | 价格模式：`0` 或缺省——托管模式；`1`——实时价格一价结算；`2`——二价结算 |
| mediaBid      | Number | 荣耀结算价格，仅 `mediaBidMode` 非 `0` 时填充，单位：分/cpm          |

- 当 `minPlatformVersion < 1123` 时不返回竞价参数。

**返回值：** Promise，成功为 `success`。

```javascript
rewardedVideoAd.load().then(res => {
  console.log(`result=${res.data}`)
})
```

### rewardedVideoAd.sendWinNotification(Object) `1123+`

竞价成功接口，bidding 流程中必须调用以回传竞价结果。

| 属性     | 类型   | 必填 | 说明                                                                  |
| -------- | ------ | ---- | --------------------------------------------------------------------- |
| winPrice | Number | 是   | 荣耀竞胜价格，单位：分/cpm。`mediaBidMode` 非 0 时传入 `mediaBid` 字段；为 0 时传 `0` |

**返回值：** 成功返回字符串 `success`。

```javascript
const res = rewardedVideoAd.sendWinNotification({ winPrice })
```

### rewardedVideoAd.sendLossNotification(Object) `1123+`

竞价失败接口，bidding 流程中必须调用以回传竞价结果。

| 属性     | 类型   | 必填 | 说明                                                                                                  |
| -------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| winPrice | Number | 是   | 本次竞胜方出价，单位：分/cpm                                                                          |
| reason   | Number | 是   | 荣耀竞败原因：`1` 竞争力不足（荣耀非最高出价方）；`3` 报文不符合要求/素材不合法；`10001` 其他          |
| src      | String | 是   | 竞胜方来源：`csj` 穿山甲 / `ylh` 优量汇 / `ks` 快手 / `hw` 华为 / `oppo` / `vivo` / `xiaomi` / `others` |
| winPkg   | String | 是   | 竞胜包名（未能获取时可传空字符串）                                                                    |

**返回值：** 成功返回字符串 `success`。

```javascript
const res = rewardedVideoAd.sendLossNotification({
  winPrice: 2000,
  reason: 3,
  src: 'hw',
  winPkg: 'com.huawei.ad'
})
```

### rewardedVideoAd.show()

展示激励视频广告（若还未加载，则先加载再展示）。

**返回值：** Promise，成功为 `success`。

```javascript
rewardedVideoAd.show().then(res => {
  console.log(`result=${res.data}`)
})
```

### rewardedVideoAd.destroy()

销毁激励视频广告。

```javascript
rewardedVideoAd.destroy()
```

## 实例事件

> 注：每次创建监听事件都会覆盖上一个监听事件。

### rewardedVideoAd.onLoad(Function) / rewardedVideoAd.offLoad()

监听 / 取消监听加载事件，`callback` 返回 `success`。

```javascript
rewardedVideoAd.onLoad(res => {
  if (res === 'success') { /* ... */ }
})
rewardedVideoAd.offLoad() // 取消监听
```

### rewardedVideoAd.onShow(Function) / rewardedVideoAd.offShow()

监听 / 取消监听显示事件，`callback` 返回 `success`。

```javascript
rewardedVideoAd.onShow(res => {
  if (res === 'success') { /* ... */ }
})
rewardedVideoAd.offShow() // 取消监听
```

### rewardedVideoAd.onReward(Function) / rewardedVideoAd.offReward()

监听 / 取消监听**获得激励**事件：用户观看广告完成奖励后通知快应用，`callback` 返回 `success`。

```javascript
rewardedVideoAd.onReward(res => {
  if (res === 'success') {
    // 发放奖励
  }
})
rewardedVideoAd.offReward() // 取消监听
```

### rewardedVideoAd.onClose(Function) / rewardedVideoAd.offClose()

监听 / 取消监听关闭事件，`callback` 返回 `success`。

```javascript
rewardedVideoAd.onClose(res => {
  if (res === 'success') { /* ... */ }
})
rewardedVideoAd.offClose() // 取消监听
```

### rewardedVideoAd.onError(Function) / rewardedVideoAd.offError()

监听 / 取消监听错误事件。

| 属性       | 类型   | 说明                                |
| ---------- | ------ | ----------------------------------- |
| errCode    | Number | 错误码，见[通用错误码](ad.md#通用错误码) |
| subErrCode | Number | 子错误码                            |
| errMsg     | String | 错误信息                            |

```javascript
rewardedVideoAd.onError(res => {
  console.log(`errorCode=${res.errCode}`)
})
rewardedVideoAd.offError() // 取消监听
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101327
