# 信息流自渲染广告（荣耀）

> 荣耀广告能力（[`@service.ad`](ad.md)）的信息流（原生）自渲染广告形态。开发者可自定义广告位置、出现时机与内容，通过预加载拿到广告实例数据后用自渲染组件拼装展示。

> **支持版本**
> - 快应用 App：支持
> - 卡片：不支持

## 简介

信息流渲染广告可以自定义广告位置以及出现时间、内容等，加载完成后即可触发。分两套流程：

- **自渲染 2.0（推荐）**：`ad.preloadAd` 一步预加载，直接渲染，无需再 `load`。
- **自渲染 1.0（旧）**：`ad.createPictureAd` 创建实例后再 `load`。

---

## 自渲染 2.0 流程

### ad.preloadAd(Object)

预加载信息流渲染广告，相当于 1.0 中 `createPictureAd()` + `load()` 的流程。无需创建后 `load`，直接渲染即可。

#### 参数：

| 属性           | 类型     | 必填 | 说明                                                                                         |
| -------------- | -------- | ---- | -------------------------------------------------------------------------------------------- |
| adUnitId       | String   | 是   | 广告位标识。空或错误标识会进入 `success` 回调且 `resultCode` 不为 `0`。配置竞价的广告位只能在 `1119+` 使用 |
| type           | String   | 是   | 预加载广告类型。信息流自渲染广告传入 `native`                                                |
| allowRecommend | Boolean  | 是   | 是否支持个性化推荐，影响广告内容精准性与收益，按用户是否允许个性化广告填写。不传会进入 `success` 回调且 `resultCode` 不为 `0` |
| adCount        | Number   | 否   | 加载广告数量，默认 `1`，最大 `3`                                                             |
| success        | Function | 否   | 成功回调                                                                                     |
| fail           | Function | 否   | 失败回调                                                                                     |

#### success 返回值：

| 属性            | 类型           | 说明                                       |
| --------------- | -------------- | ------------------------------------------ |
| resultCode      | Number         | 返回码，执行成功时为 `0`                    |
| adInstanceList  | List\<Object\> | 广告实例列表，见下表                       |

##### adInstanceList 字段：

| 属性              | 类型           | 说明                                                                                                  |
| ----------------- | -------------- | ----------------------------------------------------------------------------------------------------- |
| brand             | String         | 品牌名称                                                                                              |
| appVersion        | String         | 应用版本                                                                                              |
| appPackage        | String         | 广告应用包名                                                                                          |
| developerName     | String         | 开发者公司名称                                                                                        |
| permissionUrl     | String         | 权限 url                                                                                              |
| privacyAgreementUrl | String       | 隐私 url                                                                                              |
| homePage          | String         | 官网链接                                                                                              |
| adUnitId          | String         | 广告位 id                                                                                             |
| adId              | String         | 广告 id                                                                                               |
| image_height      | Number         | 图片高度                                                                                              |
| image_width       | Number         | 图片宽度                                                                                              |
| imgUrlList        | List\<String\> | 图片链接列表                                                                                          |
| title             | String         | 标题                                                                                                  |
| requestId         | String         | 请求 id                                                                                               |
| landingPageUrl    | String         | 落地页链接                                                                                            |
| sequence          | Number         | 广告序号                                                                                              |
| creativeType      | Number         | 广告子类型（规格）：`4` 大图文、`5` 小图文、`6` 三图文、`9` 竖版开屏图片、`10` 应用图文、`11` 横板视频、`12` 竖版视频、`13` 激励视频、`14` 插屏视频、`15` 插屏图片 |
| adFlag            | Number         | 广告标识：`0` 隐藏、`1` 展示                                                                          |
| closeFlag         | Number         | 是否展示关闭按钮：`0` 隐藏、`1` 展示                                                                  |
| interactionType   | Number         | 推广目标：`0` 应用推广（下载）、`1` 网页推广、`2` 应用直达、`3` 小程序推广、`103` 快应用推广          |
| proportion        | Number         | 图片比例                                                                                              |
| icon              | String         | logo                                                                                                  |
| videoDuration     | Number         | 视频时长                                                                                              |
| video_height      | Number         | 视频高度                                                                                              |
| video_width       | Number         | 视频宽度                                                                                              |
| hasVideo          | Boolean        | `true` 表示有视频资源，是视频类型广告                                                                  |
| coverUrl          | String         | 封面链接                                                                                              |
| hasPrivacy        | Boolean        | 下载类返回 `true`；为 `true` 时需自行调整六要素位置                                                    |
| mediaBidMode `1119+` | Number      | 价格模式：`0` 或缺省——托管模式；`1`——实时价格一价结算（推荐快应用使用）；`2`——二价结算                 |
| mediaBid `1119+`     | Number      | 荣耀结算价格，仅 `mediaBidMode` 非 `0` 时填充，单位：分/cpm                                            |

#### 示例：

```javascript
ad.preloadAd({
  adUnitId: '',
  allowRecommend: false,
  type: 'native',
  adCount: 1,
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

### ad.sendWinNotification(Object) `1119+`

竞价成功接口，bidding 流程中必须调用回传竞价结果。

| 参数名    | 类型   | 必填 | 说明                                                                                                |
| --------- | ------ | ---- | --------------------------------------------------------------------------------------------------- |
| adid      | String | 是   | 广告 id                                                                                             |
| type `1125+` | String | 否 | 竞价成功的广告位类型，信息流自渲染广告传入 `native`，默认 `native`                                  |
| winPrice  | Number | 是   | 荣耀竞胜价格，单位：分/cpm。`mediaBidMode` 非 0 时传入 `mediaBid` 字段；为 0 时传 `0`               |

**返回值：** `adid` 正确且执行成功返回 `success`。

```javascript
const res = ad.sendWinNotification({ adid, type: 'native', winPrice })
```

### ad.sendLossNotification(Object) `1119+`

竞价失败接口。bidding 流程中若使用一价模式则不强制回传竞败结果。

| 参数名    | 类型   | 必填 | 说明                                                                                                  |
| --------- | ------ | ---- | ----------------------------------------------------------------------------------------------------- |
| adid      | String | 是   | 广告 id                                                                                               |
| type `1125+` | String | 否 | 竞价失败的广告位类型，信息流自渲染广告传入 `native`，默认 `native`                                    |
| winPrice  | Number | 是   | 本次竞胜方出价，单位：分/cpm                                                                          |
| reason    | Number | 是   | 荣耀竞败原因：`1` 竞争力不足；`3` 报文不符合要求/素材不合法；`10001` 其他                              |
| src       | String | 是   | 竞胜方来源：`csj` 穿山甲 / `ylh` 优量汇 / `ks` 快手 / `hw` 华为 / `oppo` / `vivo` / `xiaomi` / `others` |
| winPkg    | String | 是   | 竞胜包名（未能获取时可传空字符串）                                                                    |

**返回值：** `adid` 正确且执行成功返回 `success`。

```javascript
const res = ad.sendLossNotification({
  adid, type: 'native', winPrice: 2000, reason: 3, src: 'hw', winPkg: 'com.huawei.ad'
})
```

### `<ad-button>`

> 该组件必须完整对用户可见，不可被任何元素覆盖或遮挡（含透明元素），否则无法触发下载。
>
> `picture-ad-button` 将不再维护，已转为使用 `ad-button`。

下载按钮；下载与非下载按钮显示不同，默认下载显示"安装"，非下载显示"点击查看"。

#### 属性：

| 属性       | 类型   | 必填 | 说明（单位 px）                                                                                        |
| ---------- | ------ | ---- | ------------------------------------------------------------------------------------------------------ |
| adid       | String | 是   | 广告 ID                                                                                                |
| width      | String | 否   | 宽，默认 `144px`，不小于 `55px`，最大不超过屏幕宽度。不在合法范围内使用默认值                          |
| height     | String | 否   | 高，默认 `76px`，范围 `15px~100px`。不在合法范围内使用默认值                                           |
| font-size  | Number | 否   | 按钮文本字体大小。取值范围 `20px~112.5px`，超出时取边界值                                                                                               |
| open-type  | Number | 否   | 非下载类广告的文案枚举值，默认 `0`                                                                     |
| valuetype  | Number | 否   | 下载类广告的文案枚举值，默认 `0`                                                                       |

##### valuetype 文案（仅中国大陆支持）：

| 值 | 文案 | 值 | 文案 |
| -- | ---- | -- | ---- |
| 0 | 安装 | 7 | 立即下载查看 |
| 1 | 下载并领取 | 8 | 下载立即阅读 |
| 2 | 安装并领取 | 9 | 下载解锁精彩章节 |
| 3 | 安装并收下 | 10 | 安装并领取 |
| 4 | 安装并兑换 | 11 | 快速安装 |
| 5 | 立即下载领取 | 12 | 安装并提现 |
| 6 | 下载并解锁 |  |  |

##### open-type 文案（仅中国大陆支持）：

| 值 | 文案 | 值 | 文案 |
| -- | ---- | -- | ---- |
| 0 | 点击查看 | 4 | 立即打开 |
| 1 | 打开并领取 | 5 | 打开应用 |
| 2 | 打开查看 | 6 | 打开 APP |
| 3 | 打开并解锁 | 7 | 打开 |

#### 事件：

**btnclick**（点击事件）：用户点击广告下载按钮时回调。

**回调函数参数：**

| 属性     | 类型   | 说明       |
| -------- | ------ | ---------- |
| adid     | String | 广告 id    |
| adUnitid | String | 广告位标识 |

**error** `1131+`（失败事件）：

**回调函数参数：**

| 属性      | 类型   | 说明                                                                                              |
| --------- | ------ | ------------------------------------------------------------------------------------------------- |
| errorcode | Number | `2002` 外层没有 `picture-ad-root`（`ad-button` 必须在 `picture-ad-root` 内）；`2003` `picture-ad-root` 中已有其它 `ad-button`（只能有一个） |
| errormsg  | String | 错误信息                                                                                          |

```html
<ad-button adid="{{adid}}" onerror="handleAdButtonError">
</ad-button>

<script>
  handleAdButtonError(e) {
    prompt.showToast({ message: `错误码 ${e.errorcode}，错误信息${e.errormsg}` })
  }
</script>
```

**downloadstatuschange**（下载状态回调）：用户点击安装按钮后，引擎监听广告 SDK 下载回调广播并回调 CP。

**回调函数参数：**

| 属性 | 类型   | 说明    |
| ---- | ------ | ------- |
| adid | String | 广告 id |
| state | Number | 状态枚举，见下表 |

| 枚举                  | 值    | 说明                |
| --------------------- | ----- | ------------------- |
| STATUS_NONE           | -1    | 无状态默认值        |
| DOWNLOAD_INIT         | 2002  | 已构建好下载信息    |
| DOWNLOAD_START        | 2003  | 下载开始            |
| DOWNLOAD_RUNNING      | 2004  | 下载中              |
| DOWNLOAD_SUCCESS      | 2005  | 下载完成            |
| DOWNLOAD_FAIL         | 2006  | 下载失败            |
| DOWNLOAD_PAUSE        | 2007  | 下载暂停            |
| DOWNLOAD_CANCEL       | 2008  | 下载安装任务已取消  |
| DOWNLOAD_WAIT         | 2009  | 排队等待下载        |
| INSTALL_RUNNING       | 2011  | 安装中              |
| INSTALL_SUCCESS       | 2012  | 安装完成            |
| INSTALL_FAIL          | 2013  | 安装失败            |
| HAS_INSTALL_SUCCESS   | 2100  | 已经安装成功        |

```html
<ad-button adid="{{adid}}" height="80px" width="80px"
  onbtnclick="ondownloadclick" ondownloadstatuschange="ondownloadstatuschange">
</ad-button>

<script>
  ondownloadstatuschange(e) {
    prompt.showToast({ message: `广告 ${e.adid} / ${e.state} 接收到回调状态枚举` })
  }
</script>
```

---

## 通用组件

### `<picture-ad-root>`

> 组件初始化渲染时必须传入合法的 `adid`。

广告内容容器组件，需搭配 `<div>` 使用，属性名为下划线形式。

#### 属性：

| 属性                                | 类型   | 必填 | 说明                                                                 |
| ----------------------------------- | ------ | ---- | -------------------------------------------------------------------- |
| adid                                | String | 是   | 广告 id                                                              |
| close_flag_gravity                  | String | 否   | 关闭按钮重心：`top_start`/`top_end`/`bottom_start`/`bottom_end`      |
| close_flag_margin_horizental        | Number | 否   | 关闭按钮横向间距（px）                                              |
| close_flag_margin_vertical          | Number | 否   | 关闭按钮竖向间距（px）                                              |
| text_essential_flag_gravity         | String | 否   | （仅下载类）下载广告文字要素重心，默认 `bottom_start`               |
| text_essential_flag_margin_horizental | Number | 否 | （仅下载类）文字要素横向间距（px）                                  |
| text_essential_flag_margin_vertical   | Number | 否 | （仅下载类）文字要素竖向间距（px）                                  |
| click_essential_flag_gravity        | String | 否   | （仅下载类）下载广告点击要素重心，默认 `bottom_start`               |
| click_essential_flag_margin_horizental | Number | 否 | （仅下载类）点击要素横向间距（px）                                  |
| click_essential_flag_margin_vertical   | Number | 否 | （仅下载类）点击要素竖向间距（px）                                  |
| text_essential_flag_color           | String | 否   | （仅下载类）文字要素颜色，仅支持 16 进制（argb/rgb），默认 `#66000000` |
| click_essential_flag_color          | String | 否   | （仅下载类）点击要素颜色，仅支持 16 进制（argb/rgb），默认 `#66000000` |

#### 事件：

**dislike**（点击不喜欢）：监听广告组件的点击不喜欢事件。

**回调函数参数：**

| 属性 | 类型   | 说明         |
| ---- | ------ | ------------ |
| adid | String | 广告 id      |
| text | String | 点击的文本   |
| id   | Number | 点击的组件 id |

```html
<picture-ad-root class="ad-item" adid="{{adid}}" ondislike="ondislike"
  close_flag_gravity="bottom_end" close_flag_margin_horizental="20" close_flag_margin_vertical="100"
  text_essential_flag_gravity="bottom_start" text_essential_flag_color="#66000000"
  click_essential_flag_gravity="bottom_start" click_essential_flag_color="#66000000">
  <div></div>
</picture-ad-root>

<script>
  ondislike(e) {
    prompt.showToast({ message: `广告 ${e.adid} 销毁成功，原因: ${e.text}` })
  }
</script>
```

**adshow** `1122+`（广告曝光）：监听广告曝光事件。

**回调函数参数：**

| 属性     | 类型   | 说明         |
| -------- | ------ | ------------ |
| adid     | String | 曝光广告 id  |
| adUnitId | String | 广告位标识   |

```html
<picture-ad-root class="ad-item" adid="{{adid}}" onadshow="onadshow">
  <div></div>
</picture-ad-root>

<script>
  onadshow(e) {
    prompt.showToast({ message: `广告 ${e.adid} 曝光，对应广告位: ${e.adUnitId}` })
  }
</script>
```

**error** `1131+`（失败）：监听 `picture-ad-root` 展示失败事件。

**回调函数参数：**

| 属性      | 类型   | 说明                                                   |
| --------- | ------ | ------------------------------------------------------ |
| errorcode | Number | `2001`：页面中 `picture-ad-root` 数量超上限            |
| errormsg  | String | 错误信息                                               |

```html
<picture-ad-root adid="{{adid}}" onerror="handlePictureAdRootError">
  <div></div>
</picture-ad-root>

<script>
  handlePictureAdRootError(e) {
    prompt.showToast({ message: `错误码 ${e.errorcode}，错误信息${e.errormsg}` })
  }
</script>
```

### `<picture-ad-click-callback-area>`

点击区域组件，定义点击区域，用法同 `<div>`。

#### 属性：

| 属性 | 类型   | 必填 | 说明                                                                                   |
| ---- | ------ | ---- | -------------------------------------------------------------------------------------- |
| adid | String | 是   | 广告唯一 id                                                                            |
| type | String | 否   | 点击组件类型，默认 `click`。`click` 基础点击组件（支持子组件与自定义点击事件）；`videoclick` 可点击视频组件（无需 `picture-ad-videoview` 即可自动渲染，不支持子组件/视频控制与回调）；`video` 不可点击视频组件（同上限制） |

#### 事件：

**areaclick**（点击）：

**回调函数参数：**

| 属性 | 类型   | 说明    |
| ---- | ------ | ------- |
| adid | String | 广告 id |

```html
<picture-ad-click-callback-area class="vertical" adid="{{adid}}" type="click" onareaclick="onareaclick">
  <div></div>
</picture-ad-click-callback-area>

<script>
  onareaclick(e) {
    prompt.showToast({ message: `广告 ${e.adid}触发了点击` })
  }
</script>
```

### `<picture-ad-videoview>`

视频广告播放组件，在广告实例 `load` 之后自动播放；如需控制播放逻辑，通过回调与方法控制。

#### 属性：

| 属性 | 类型   | 必填 | 说明                  |
| ---- | ------ | ---- | --------------------- |
| adid | Number | 是   | load 时得到的广告 id  |

#### 方法：

| 名称             | 参数                 | 说明                                                                                   |
| ---------------- | -------------------- | -------------------------------------------------------------------------------------- |
| start            | `{ usecache }`       | 开始播放，默认 `true` 使用缓存，`false` 不使用                                         |
| pause            | -                    | 暂停播放                                                                               |
| resume           | -                    | 恢复播放                                                                               |
| releasePlayer    | -                    | 释放播放器                                                                             |
| getPlayerState   | `{ success, fail }`  | 获取播放器状态                                                                         |
| setMuted         | `{ mute }`           | 设置静音，默认 `true` 静音，`false` 非静音                                             |
| isMuted          | -                    | 判断是否静音，返回 `true`/`false`                                                      |

##### getPlayerState() 参数：

| 属性    | 类型     | 必填 | 说明                   |
| ------- | -------- | ---- | ---------------------- |
| success | Function | 否   | 成功回调，返回播放器状态 |
| fail    | Function | 否   | 失败回调               |

##### 播放器状态：

| 状态名                  | 状态值 | 含义                                                                                       |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------ |
| STATE_ERROR             | -1     | 播放错误                                                                                   |
| STATE_IDLE              | 0      | 播放未开始                                                                                 |
| STATE_PREPARING         | 1      | 播放准备中                                                                                 |
| STATE_PREPARED          | 2      | 播放准备就绪                                                                               |
| STATE_STARTED           | 3      | 开始播放                                                                                   |
| STATE_PLAYING           | 4      | 正在播放                                                                                   |
| STATE_PAUSED            | 5      | 暂停播放                                                                                   |
| STATE_BUFFERING_PLAYING | 6      | 正在缓冲（播放中缓冲区不足，缓冲足够后恢复）                                               |
| STATE_BUFFERING_PAUSED  | 7      | 正在缓冲（播放中缓冲区不足，此时暂停，缓冲足够后恢复暂停）                                 |
| STATE_COMPLETED         | 8      | 播放完成                                                                                   |

```javascript
audioEvent() {
  const ad = this.$element('videoAd')
  ad.start({ usecache: true })
  ad.pause()
  ad.resume()
  ad.releasePlayer()
  ad.getPlayerState({
    success: (res) => { console.log(`播放器状态：${res}`) }
  })
  ad.setMuted({ mute: true })
  ad.isMuted({
    success: (res) => { prompt.showToast({ message: `是否静音：${res}` }) }
  })
}
```

#### 回调事件：

**videoprepare**（视频开始准备）：callback 返回 `{ adid }`。

**videoprepared**（准备好但未开始播放）：callback 返回 `{ adid }`。

**videostart**（视频开始播放）：callback 返回 `{ adid }`。

**videopause**（视频暂停）：callback 返回 `{ adid }`。

**videobuffering**（是否正在缓冲）：

**回调函数参数：**

| 属性         | 类型    | 说明       |
| ------------ | ------- | ---------- |
| adid         | String  | 广告 id    |
| isbuffering  | Boolean | 是否正在缓冲 |

**videoresume**（视频恢复播放）：callback 返回 `{ adid }`。

**videoend**（视频播放结束）：callback 返回 `{ adid }`。

**videoerror**（视频错误）：

**回调函数参数：**

| 属性      | 类型   | 说明                                    |
| --------- | ------ | --------------------------------------- |
| adid      | String | 广告 id                                 |
| errorcode | Number | 错误码，见[通用错误码](ad.md#通用错误码) |
| errormsg  | String | 错误信息                                |

```html
<picture-ad-videoview id="{{adid}}" adid="{{adid}}" class="ad-video"
  onvideoprepare="onvideoEvent('videoprepare')" onvideoprepared="onvideoEvent('videoprepared')"
  onvideostart="onvideoEvent('videostart')" onvideopause="onvideoEvent('videopause')"
  onvideobuffering="onvideoEvent('videobuffering')" onvideoresume="onvideoEvent('videoresume')"
  onvideoend="onvideoEvent('videoend')" onvideoerror="onvideoEvent('videoerror')">
</picture-ad-videoview>

<script>
  onvideoEvent(eventName, e) {
    prompt.showToast({ message: `广告 ${e.adid} 接收到视频 ${eventName} 事件` })
  }
</script>
```

---

## 自渲染 1.0 流程

### ad.createPictureAd(Object)

创建信息流渲染广告组件，每次调用返回全新实例。

#### 参数：

| 属性           | 类型    | 必填 | 说明                                                                                         |
| -------------- | ------- | ---- | -------------------------------------------------------------------------------------------- |
| adUnitId       | String  | 是   | 广告位标识。错误标识不会导致创建失败，但会在 `load` 时出错。配置竞价的广告位只能在 `1119+` 使用 |
| allowRecommend | Boolean | 是   | 是否支持个性化推荐，不传默认 `false`                                                         |

**返回值：** `pictureAd` 信息流渲染广告组件实例。

```javascript
ad.createPictureAd({
  adUnitId: '',
  allowRecommend: false
})
```

### pictureAd.load(Object)

加载信息流渲染广告。

#### 参数：

| 属性    | 类型     | 必填 | 说明                  |
| ------- | -------- | ---- | --------------------- |
| adCount | Number   | 是   | 广告数量，最大 `3`    |
| success | Function | 否   | 成功回调              |
| fail    | Function | 否   | 失败回调              |

#### success 返回值：

| 属性       | 类型           | 说明                          |
| ---------- | -------------- | ----------------------------- |
| resultCode | Number         | 返回码，执行成功为 `0`        |
| adInstanceList | List\<Object\> | 广告实例列表，字段与 2.0 基本一致，字段名差异：`adUnitId`→`slotid`、`adId`→`adid`、`imgUrlList`→`images`、`creativeType`→`subType`、`interactionType`→`promotionPurpose`、`icon`→`logo` |

> 接口调用成功，但广告内部错误也会触发 `success` 回调。

广告加载失败时（仍走 `success` 回调）返回如下数据格式：

| 属性       | 类型   | 说明                                   |
| ---------- | ------ | -------------------------------------- |
| resultCode | Number | 返回码，失败时非 `0`，可参考其他错误码 |
| resultMsg  | String | 错误信息                               |

`fail` 回调：接口调用失败，返回快应用通用错误代码。

| 错误码 | 说明           |
| ------ | -------------- |
| 200    | 快应用通用错误 |

```javascript
pictureAd.load({
  adCount: 3,
  success: (res) => {
    console.log(`success, res=${JSON.stringify(res)}`)
    if (res.resultCode === 0) {
      prompt.showToast({ message: `✅ 加载广告成功` })
    } else {
      prompt.showToast({ message: `❌ 加载广告失败: ${JSON.stringify(res)}` })
    }
  },
  fail: (res) => {
    prompt.showToast({ message: `❌ 加载广告失败: ${JSON.stringify(res)}` })
  }
})
```

### pictureAd.destroy(Object)

销毁信息流广告。**preload 创建的广告无法通过此方法销毁。**

| 属性    | 类型     | 必填 | 说明                                        |
| ------- | -------- | ---- | ------------------------------------------- |
| adid    | String   | 是   | 广告 id                                     |
| success | Function | 否   | 成功回调，`resultCode` 为 `0` 表示成功      |

### `<picture-ad-button>`

下载按钮，默认下载显示"安装"，非下载显示"点击查看"。

| 属性       | 类型   | 必填 | 说明（px） |
| ---------- | ------ | ---- | ---------- |
| adid       | Number | 是   | 广告 id    |
| width      | Number | 否   | 宽度       |
| height     | Number | 否   | 高度       |
| max-width  | Number | 否   | 最大宽度   |

**btnclick**（点击事件）：用户点击广告下载按钮时回调。

**回调函数参数：**

| 属性     | 类型   | 说明       |
| -------- | ------ | ---------- |
| adid     | String | 广告 id    |
| adUnitid | String | 广告位标识 |

```html
<picture-ad-button adid="{{adid}}" height="80" width="80" max-width="80"
  onbtnclick="ondownloadclick">
</picture-ad-button>
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101328
