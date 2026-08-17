# 信息流模板广告（荣耀）

> 荣耀广告能力（[`@service.ad`](ad.md)）的信息流模板广告形态。平台提供图文/视频通用模板（大图文、小图文、三图文、应用图文、横版视频、竖版视频）自动渲染，开发者用 `<ad-custom>` 组件展示。

> **支持版本**
> - 快应用 App：支持（需联盟平台版本号 `1125+`）
> - 卡片：不支持

## 简介

模板渲染信息流广告是由图片与文字混搭而成的一种广告形式。拉取信息流广告时，平台提供的通用模板有：大图文、小图文、三图文、应用图文、横版视频、竖版视频。

## ad.preloadAd(Object)

预加载信息流模板广告。

### 参数：

| 属性           | 类型     | 必填 | 说明                                                                                         |
| -------------- | -------- | ---- | -------------------------------------------------------------------------------------------- |
| adUnitId       | String   | 是   | 广告位标识。空或错误标识会进入 `success` 回调且 `resultCode` 不为 `0`。配置竞价的广告位只能在 `1119+` 使用 |
| type           | String   | 是   | 预加载广告类型，信息流模板广告传入 `custom`                                                  |
| allowRecommend | Boolean  | 是   | 是否支持个性化推荐。不传会进入 `success` 回调且 `resultCode` 不为 `0`                        |
| adCount        | Number   | 否   | 加载广告数量，默认 `1`，最大 `3`                                                             |
| success        | Function | 否   | 成功回调                                                                                     |
| fail           | Function | 否   | 失败回调                                                                                     |

### success 返回值：

| 属性            | 类型           | 说明                  |
| --------------- | -------------- | --------------------- |
| resultCode      | Number         | 返回码，成功为 `0`    |
| adInstanceList  | List\<Object\> | 广告列表，见下表      |

#### adInstanceList 字段：

| 属性            | 类型   | 说明                                                                                                  |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| adUnitId        | String | 广告位 id                                                                                             |
| adId            | String | 广告 id                                                                                               |
| appPackage      | String | 广告应用包名                                                                                          |
| interactionType | Number | 推广目标：`0` 应用推广（下载）、`1` 网页推广、`2` 应用直达、`3` 小程序推广、`103` 快应用推广          |
| mediaBidMode    | Number | 价格模式：`0` 或缺省——托管模式；`1`——实时价格一价结算；`2`——二价结算                                 |
| mediaBid        | Number | 荣耀结算价格，仅 `mediaBidMode` 非 `0` 时填充，单位：分/cpm                                            |

### 示例：

```javascript
ad.preloadAd({
  adUnitId: this.adUnitId,
  allowRecommend: this.allowRecommend,
  type: 'custom',
  adCount: 3,
  success: (res) => {
    if (res.resultCode === 0) {
      prompt.showToast({ message: `✅ 预加载广告成功` })
    } else {
      prompt.showToast({
        message: `❌ 预加载广告失败: resultCode=${res.resultCode}, resultMsg=${res.resultMsg}`
      })
    }
  },
  fail: (res) => {
    prompt.showToast({ message: `❌ 预加载广告失败: ${JSON.stringify(res)}` })
  }
})
```

## ad.sendWinNotification(Object)

竞价成功接口，bidding 流程中必须调用回传竞价结果。

| 参数名    | 类型   | 必填 | 说明                                                                                                |
| --------- | ------ | ---- | --------------------------------------------------------------------------------------------------- |
| adid      | String | 是   | 广告 id                                                                                             |
| type      | String | 是   | 竞价成功的广告位类型，信息流模板广告传入 `custom`                                                   |
| winPrice  | Number | 是   | 荣耀竞胜价格，单位：分/cpm。`mediaBidMode` 非 0 时传入 `mediaBid` 字段；为 0 时传 `0`               |

**返回值：** `adid` 正确且执行成功返回 `success`。

```javascript
const res = ad.sendWinNotification({ type: 'custom', adid, winPrice })
```

## ad.sendLossNotification(Object)

竞价失败接口，bidding 流程中必须调用回传竞价结果。

| 参数名    | 类型   | 必填 | 说明                                                                                                  |
| --------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| adid      | String | 是   | 广告 id                                                                                               |
| type      | String | 是   | 竞价失败的广告位类型，信息流模板广告传入 `custom`                                                    |
| winPrice  | Number | 是   | 本次竞胜方出价，单位：分/cpm                                                                          |
| reason    | Number | 是   | 荣耀竞败原因：`1` 竞争力不足；`3` 报文不符合要求/素材不合法；`10001` 其他                              |
| src       | String | 是   | 竞胜方来源：`csj` 穿山甲 / `ylh` 优量汇 / `ks` 快手 / `hw` 华为 / `oppo` / `vivo` / `xiaomi` / `others` |
| winPkg    | String | 是   | 竞胜包名（未能获取时可传空字符串）                                                                    |

**返回值：** `adid` 正确且执行成功返回 `success`。

```javascript
const res = ad.sendLossNotification({
  adid: this.adPriceData.adid, type: 'custom',
  winPrice: 2000, reason: 3, src: 'hw', winPkg: 'com.huawei.ad'
})
```

## 组件 `<ad-custom>`

信息流模板广告组件。

> `adUnitId` 与 `adid` 互斥：使用 `preloadAd` 预加载并需指定 `adid` 曝光时，不要填写 `adUnitId`。

### 属性：

| 属性           | 类型    | 必填 | 说明（px）                                                                                           |
| -------------- | ------- | ---- | ---------------------------------------------------------------------------------------------------- |
| adUnitId       | String  | 是（指定 `adid` 时非必填） | 广告位 ID                                                                                            |
| adid           | String  | 否   | 广告 ID                                                                                              |
| allowRecommend | Boolean | 是（指定 `adid` 时无效）   | 是否支持个性化推荐。影响广告内容精准性与收益，按用户是否允许个性化广告填写                           |

### 示例：

```html
<ad-custom adid="{{adid}}" allowrecommend="{{allowRecommend}}"
  onload="onLoad" onerror="onErrorEvt" onclick="onClick"
  onshow="onShowEvent" onclose="onClose" ondownloadstatuschange="onDownloadstatuschange">
</ad-custom>
```

### 事件：

通过组件属性绑定回调（事件名前加 `on` 前缀，如 `onload="onLoad"`），各事件及回调参数如下。

#### load（广告加载成功）

监听广告加载成功事件，绑定属性 `onload`。

| 属性     | 类型   | 说明      |
| -------- | ------ | --------- |
| adid     | String | 广告 id   |
| adUnitId | String | 广告位标识 |

#### error（广告加载失败）

监听广告加载失败事件，绑定属性 `onerror`。

| 属性    | 类型   | 说明     |
| ------- | ------ | -------- |
| errCode | Number | 错误码   |
| errMsg  | String | 错误信息 |

#### click（点击）

用户点击广告时回调通知 CP，绑定属性 `onclick`。

| 属性     | 类型   | 说明      |
| -------- | ------ | --------- |
| adid     | String | 广告 id   |
| adUnitId | String | 广告位标识 |

#### show（广告曝光）

监听广告曝光事件，绑定属性 `onshow`。

| 属性     | 类型   | 说明      |
| -------- | ------ | --------- |
| adid     | String | 广告 id   |
| adUnitId | String | 广告位标识 |

#### close（广告关闭）

监听广告关闭事件，绑定属性 `onclose`。

| 属性     | 类型   | 说明      |
| -------- | ------ | --------- |
| adid     | String | 广告 id   |
| adUnitId | String | 广告位标识 |

### ad-custom 下载状态回调

**downloadstatuschange**：通知 CP 广告的下载安装状态。

| 属性     | 类型   | 说明        |
| -------- | ------ | ----------- |
| adid     | String | 广告 id     |
| adUnitId | String | 广告位 id   |
| state    | Number | 状态枚举    |

| 枚举                | 值    | 说明                |
| ------------------- | ----- | ------------------- |
| STATUS_NONE         | -1    | 无状态默认值        |
| DOWNLOAD_INIT       | 2002  | 已构建好下载信息    |
| DOWNLOAD_START      | 2003  | 下载开始            |
| DOWNLOAD_RUNNING    | 2004  | 下载中              |
| DOWNLOAD_SUCCESS    | 2005  | 下载完成            |
| DOWNLOAD_FAIL       | 2006  | 下载失败            |
| DOWNLOAD_PAUSE      | 2007  | 下载暂停            |
| DOWNLOAD_CANCEL     | 2008  | 下载安装任务已取消  |
| DOWNLOAD_WAIT       | 2009  | 排队等待下载        |
| INSTALL_RUNNING     | 2011  | 安装中              |
| INSTALL_SUCCESS     | 2012  | 安装完成            |
| INSTALL_FAIL        | 2013  | 安装失败            |
| HAS_INSTALL_SUCCESS | 2100  | 已经安装成功        |

---

## 来源

- https://developer.honor.com/cn/doc/guides/101612
