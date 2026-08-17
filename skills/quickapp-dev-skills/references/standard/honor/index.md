# 荣耀快应用专属参考

本目录收录**荣耀（Honor）快应用引擎平台专有**的接口与组件，是[快应用公共标准](../public/index.md)的荣耀扩展补充。

> 荣耀快应用基于快应用联盟标准，本目录只收录荣耀引擎新增或扩展的能力。当文档标注的平台版本号（如 `6032`、`6053`）时，表示需要在对应或更高的**荣耀快应用引擎平台版本**上使用，部分能力还需在联盟平台达到指定版本。

- 参考
  - 接口
    - 卡片设备与环境
      - [荣耀设备信息 honorDevice](features/system/honor-device.md)
      - [设备信息扩展 device（折叠屏 / OAID）](features/system/device.md)
      - [卡片地理位置 card.geolocation](features/system/card-geolocation.md)
    - 卡片数据与通信
      - [卡片与安卓通信 data](features/system/data.md)
      - [多媒体 media（扩展）](features/system/media.md)
      - [数据共享 exchange（扩展）](features/service/exchange.md)
    - 卡片宿主与能力
      - [卡片预渲染 hostconnection](features/system/hostconnection.md)
      - [卡片震动 vibrator（专有同名）](features/system/vibrator.md)
    - 账号与跳转
      - [卡片账号 account（专有同名）](features/service/account.md)
      - [微信小程序跳转 wxminiprogram](features/service/wxminiprogram.md)
    - 广告接入（仅快应用 App，卡片不支持）
      - [广告能力接入方法 ad（专有同名）](features/service/ad/ad.md)
      - [Banner 广告](features/service/ad/bannerad.md)
      - [插屏广告](features/service/ad/interstitialad.md)
      - [激励广告](features/service/ad/rewardedvideoad.md)
      - [信息流自渲染广告](features/service/ad/nativead.md)
      - [信息流模板广告](features/service/ad/feedad.md)
  - 组件
    - 基础组件（荣耀扩展）
      - [text 输入扩展](widgets/text.md)
      - [image 预渲染与图标](widgets/image.md)
    - 荣耀使用规范
      - [加桌按钮 shortcut-button（使用规范）](widgets/shortcut-button.md)
