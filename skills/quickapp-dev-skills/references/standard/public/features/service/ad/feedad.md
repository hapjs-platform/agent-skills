# 原生广告2.0`1200+`

**原生广告2.0是对原有原生广告的优化和升级，使用原生广告2.0的API，开发者可深度地定制广告样式。**

## 接口定义

### ad.preloadAd(Object object)

在快应用环境下，支持通过调用 ad.preloadAd 接口，提前加载广告数据，在后续创建对应广告标签 ad 时，会自动使用预加载的广告数据，省去创建广告标签时拉取广告的耗时。该方法会异步回调结果。

#### 参数

| **参数** | **类型** | **必填** | **说明**                                      |
| -------- | -------- | -------- | --------------------------------------------- |
| adUnitId | String   | 是       | 广告位标识                                    |
| type     | String   | 是       | 广告单元所属广告位类型<br>native：原生广告2.0 |
| adCount  | Number   | 否       | 预期返回的广告条数                            |

#### success返回参数

| **参数** | **类型** | **必填** | **说明**                                                     |
| -------- | -------- | -------- | ------------------------------------------------------------ |
| adList   | Object   | 否       | 广告详细信息的对象，请求原生广告2.0成功时返回，数据格式如下表 |

返回广告数据`adList` 是一个 Array 对象，其中数据对象格式为：

| **参数**     | **类型** | **说明**                                                     |
| ------------ | -------- | ------------------------------------------------------------ |
| adId         | String   | 广告数据id，用于标识不同广告数据                             |
| title        | String   | 广告标题                                                     |
| desc         | String   | 广告描述                                                     |
| icon         | String   | 推广应用的Icon图标                                           |
| imgUrlList   | Array    | 广告图片列表                                                 |
| clickBtnTxt  | String   | 点击按钮文本描述                                             |
| materialType | Number   | 广告素材类型，取值详见各厂商支持明细                         |
| hasPrivacy   | Boolean  | 是否具备隐私交互组件能力                                     |
| appInfo      | Object   | 应用下载类广告的落地页应用信息，非应用下载类广告该信息可能为空 |

##### appInfo 参数

| **参数**   | **类型** | **说明**         |
| ---------- | -------- | ---------------- |
| appName    | String   | 应用名称         |
| appVersion | String   | 应用版本         |
| appSize    | Float    | 应用大小，单位KB |
| developer  | String   | 开发者名称       |

#### 代码示例

```js
let adParams = {
  adUnitId: this.adUnitId, // 原生广告2.0广告位id
  type: 'native',          // 原生广告2.0广告类型 
  adCount: 2,              // 原生广告2.0广告预期返回广告条数   
}

ad.preloadAd({
  ...adParams,
  success: (data) => {
    this.adList = data.adList
    prompt.showToast({
      message: `success! data=${JSON.stringify(data)}`
    })
  }, fail: (data, code) => {
    console.log(data, code)
    prompt.showToast({
      message: `fail! data=${JSON.stringify(data)}, code=${code}`
    })
  }
})
```
## 组件定义

### ad 广告组件

#### 概述

广告组件。

#### 子组件

支持。

#### 属性

除了支持通用属性以外，还支持如下属性。

| **名称** | **类型** | **默认值** | **必填** | **描述**                                                     |
| -------- | -------- | ---------- | -------- | ------------------------------------------------------------ |
| adid     | String   | -          | 是       | 填入preloadAd方法获取的广告数据中的 adId 字段，<br>通过该属性将组件指定为 ad 接口返回的对应原生广告2.0素材的展示容器 |

#### 样式

支持[通用属性](https://doc.quickapp.cn/widgets/common-attributes.html)。

#### 事件

不支持[通用事件](https://doc.quickapp.cn/widgets/common-events.html)，支持如下事件：

| **名称** | **参数**                             | **描述**                               |
| -------- | ------------------------------------ | -------------------------------------- |
| adclick  | -                                    | 广告组件内可响应广告点击动作区域被点击 |
| adshow   | -                                    | 广告组件曝光回调                       |
| error    | { errCode: Number,   errMsg: String} | 广告加载失败时触发                     |

### ad-clickable-area 组件

#### 概述

ad 组件子组件，用于展示广告的可点击区域。

#### 子组件

type 为 `click `时支持子组件，type 为 `button `、`video`、`privacy`时，不支持子组件。

#### 属性

支持[通用属性](https://doc.quickapp.cn/widgets/common-attributes.html)。

| **名称** | **类型**                             | **默认值** | **必填** | **描述**                                                     |
| -------- | ------------------------------------ | ---------- | -------- | ------------------------------------------------------------ |
| type     | click &#124; button &#124; video &#124; privacy | click      | 否       | 组件类型<br>click：图文素材点击区域，支持子组件，点击后跳转至相应的落地页；<br>button：创意按钮点击区域，不支持子组件，点击后会执行对应的广告交互操作；<br>video：视频素材展示区域，不支持子组件，不响应点击动作；<br/>privacy：应用要素信息组件，涵盖隐私、权限、简介，不支持子组件，点击后唤起弹窗展示完整信息；<br/> |

**注：**

1. 当广告类型为视频类广告时，必须要配置有且只能有一个用于展示视频类广告的type，否则无法展示视频播放区域；
2. 视频类广告的播放、暂停等交互由平台控制，不支持开发者自定义控制；
3. 素材具备隐私交互组件能力（hasPrivacy为true）时，type为privacy才有效果；
4. 不允许通过任意方式将button区域设置为透明。

#### 样式

支持[通用样式](https://doc.quickapp.cn/widgets/common-styles.html)。

**当type 为 click 时：**

支持[div样式](https://doc.quickapp.cn/widgets/div.html)。

**当type为button时：**

| **名称**         | **类型** | **默认值** | 必填 | **描述**                                                     |
| ---------------- | -------- | ---------- | ---- | ------------------------------------------------------------ |
| width            | `<length>` | 90px       | 否   | 组件宽度。仅支持px单位，不允许小于90px。                     |
| height           | `<length>` | 30px       | 否   | 组件高度。仅支持px单位，只允许设置范围：30px - 180px。       |
| font-size        | `<length>` | 15px       | 否   | 文本尺寸。仅支持px单位，只允许设置范围：15px - 113px。       |
| opacity          | `<number>` | 1          | 否   | 组件透明度。设置无效，不允许设置为透明。                     |
| color            | `<color>`  | #FFFFFF    | 否   | 文本颜色。当color和background-color值过于相似时，这两个字段设置的值无效。 |
| background-color | `<color>`  | #456FFF    | 否   | 背景颜色。当color和background-color值过于相似时，这两个字段设置的值无效。 |

#### 事件

不支持。

## 支持明细

更详细的原生广告2.0接入api，请参考各厂商接入指引明细。

| 厂商       | 支持    | 文档                                                         |
| ---------- | ------- | ------------------------------------------------------------ |
| 小米       | `1103+` | [原生广告2.0](https://dev.mi.com/distribute/doc/details?pId=1716) |
| 中兴       | no      | -                                                            |
| 华为       | no      | -                                                            |
| 金立       | no      | -                                                            |
| 联想       | no      | -                                                            |
| 魅族       | no      | -                                                            |
| 努比亚     | no      | -                                                            |
| OPPO       | `1091+` | [原生广告信息流2.0](https://open.oppomobile.com/new/developmentDoc/info?id=11351) |
| vivo       | `1094+` | [原生广告2.0](https://dev.vivo.com.cn/documentCenter/doc/633#w1-9) |
| 一加       | no      | -                                                            |
| **预览版** | **no**  | 预览版不提供广告接口                                         |
