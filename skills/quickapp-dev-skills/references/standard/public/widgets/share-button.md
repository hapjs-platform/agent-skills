# share-button `1100+`

## 概述

分享按钮组件。

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称          | 类型        | 默认值 | 必填 | 描述                                                         |
| ------------- | ----------- | ------ | ---- | ------------------------------------------------------------ |
| value         | `<string>`  | -      | 否   | 分享按钮组件的文本                                           |
| title         | `<string>`  | -      | 否   | 分享标题                                                     |
| description   | `<string>`  | -      | 否   | 分享描述                                                     |
| icon          | `<string>`  | -      | 否   | 分享图片的url                                                |
| url           | `<string>`  | -      | 否   | 不支持跳转快应用设备时, 分享跳转使用此链接                   |
| path          | `<string>`  | -      | 否   | 分享路径，若为空则默认使用当前页面路径                       |
| params        | `<object>`  | -      | 否   | 自定义参数，允许开发者自由配置<br/>使用方式同page中setMenubarData中的[shareParams参数](../framework/script.md#页面方法) |
| platforms     | `<array>`   | -      | 否   | 分享到的平台，不填则默认分享所有平台。<br/>可用值包括：WEIBO(新浪微博)、QQ、WEIXIN(微信好友)、WEIXIN_CIRCLE(微信朋友圈)、SYSTEM(系统分享) |
| usepageparams | `<boolean>` | false  | 否   | 是否使用页面参数                                             |

## 样式

支持[通用样式](common-styles.md)

| 名称      | 类型                        | 默认值              | 必填 | 描述     |
| --------- | --------------------------- | ------------------- | ---- | -------- |
| color     | `<color>`                   | rgba(0, 0, 0, 0.87) | 否   | 文本颜色 |
| font-size | `<length>`                  | 37.5px              | 否   | 文本尺寸 |
| width     | `<length>` | 128px | 否              | 组件宽度 |
| height    | `<length>` | 70px | 否               | 组件高度 |

## 方法

支持[通用方法](common-methods.md)

## 事件

支持[通用事件](common-events.md)

| 名称    | 参数                                     | 描述                                                         |
| ------- | ---------------------------------------- | ------------------------------------------------------------ |
| success | {code: codeValue, content: contentValue} | 分享成功回调<br />code: 返回值，0 成功<br />content: 分享到的平台名 |
| fail    | {code: codeValue, content: contentValue} | 分享失败回调<br />code: 返回值，200 失败<br />content: 分享失败的原因 |
| cancel  | {code: codeValue, content: contentValue} | 分享取消回调<br />code: 返回值，100 取消<br />content: 详细信息 |

## 示例代码

```xml
<share-button
      class="share-button"
      value="分享"
      title="自定义标题"
      description="自定义描述"
      platforms="[QQ, WEIBO]"
      params="{key1: value1, key2: value2}"
      onclick="click()"
      onsuccess="success()"
      onfail="fail()"
      oncancel="cancel()"
    ></share-button>
```

