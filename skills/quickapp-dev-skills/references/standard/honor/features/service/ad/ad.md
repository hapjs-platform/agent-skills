# 广告 ad（荣耀专有同名）

> 该接口与公共接口 [`@service.ad`](../../../../public/features/service/ad/ad.md) 同名，为**荣耀快应用引擎平台**提供的广告能力实现。在荣耀手机上 `ad.getProvider()` 返回 `honor`。荣耀在标准接口基础上扩展了预加载（`preloadAd`）、竞价回传（`sendWinNotification` / `sendLossNotification`）以及信息流自渲染/模板组件（`ad-button`、`picture-ad-root`、`ad-custom` 等）。

> **支持版本**
> - 快应用 App：支持
> - 卡片：不支持

## 简介

广告能力接口为快应用提供广告服务。可接入多种形态的广告资源，接入简单，广告位置灵活可控。

## 接入方法

快应用接入广告能力**无需使用 SDK**，单独使用接口即可接入。

1. **变现合作及注册**：参见[《荣耀变现合作及注册》](https://developer.honor.com/cn/docs/20030/guides/cooperative-registration)。
2. **广告位接入与测试**：参见[《联盟流量管理》](https://developer.honor.com/cn/docs/20030/guides/traffic-management)、[《联盟广告位测试验证及上线》](https://developer.honor.com/cn/docs/20030/guides/test-acceptance-and-launch)。

### 开发实现

在 `manifest.json` 中注册接口：

```json
{ "name": "service.ad" }
```

页面内导入并使用：

```javascript
import ad from '@service.ad'
```

在调用接口前使用 `ad.getProvider()` 获取当前服务提供商代号。

## 接口声明

```json
{ "name": "service.ad" }
```

## 导入模块

```javascript
import ad from '@service.ad'
// 或
const ad = require('@service.ad')
```

## 接口定义

### ad.getProvider()

获取当前广告服务提供商代号。

#### 参数：

无

#### 返回值：

字符串，固定为 `honor`（在荣耀手机运行时）。

#### 示例：

```javascript
console.log(ad.getProvider()) // 'honor'
```

## 广告类型

| 类型 | 创建 / 预加载接口 | 说明 |
| --- | --- | --- |
| [Banner 广告](bannerad.md) | `ad.createBannerAd` | 图片/视频组件，层级最高，可通过 `style` 控制大小与位置 |
| [插屏广告](interstitialad.md) | `ad.createInterstitialAd` | 居中展示，大小固定不可控 |
| [激励广告](rewardedvideoad.md) | `ad.createRewardedVideoAd` | 奖励式视频，用户完成后回调通知快应用 |
| [信息流自渲染广告](nativead.md) | `ad.preloadAd`(`type:'native'`) / `ad.createPictureAd` | 自定义广告位置与内容，用自渲染组件拼装 |
| [信息流模板广告](feedad.md) | `ad.preloadAd`(`type:'custom'`) + `<ad-custom>` | 平台提供图文/视频模板，自动渲染 |

## 广告能力使用须知

**数据使用说明**：开发者需告知并获取用户同意广告数据处理，可参考以下内容添加至快应用隐私声明中：

> 为向用户提供感兴趣的商业广告和商业推广活动，本快应用将通过荣耀广告服务处理用户的应用的信息、匿名设备标识符（OAID）、操作系统的设置信息、设备的硬件信息、网络信息（IP 地址、WLAN 信息）、运营商信息，详情可查看[《荣耀广告与隐私的声明》](https://developer.honor.com/cn/docs/20030/guides/sdk-privacy-statement)。

> 注意：若应用内展示个性化广告，需要在应用内为用户提供控制个性化广告的开关。

## 通用错误码

各广告组件的 `onError` 回调返回 `errCode` / `subErrCode` / `errMsg`，通用错误码如下：

| 错误码 | 说明 |
| ------ | ---- |
| 1000 | 无网络 |
| 1001 | 广告单元无效 |
| 1002 | 无可用的广告（可能因手机未安装相关应用而过滤掉了广告等） |
| 1003 | 广告单元已关闭 |
| 1004 | 内部错误，参考子错误码 |

> 子错误码详情参考：[《错误码》](https://developer.honor.com/cn/docs/20030/guides/error-codes)。

---

## 来源

- https://developer.honor.com/cn/doc/guides/101324
- https://developer.honor.com/cn/doc/guides/101329
