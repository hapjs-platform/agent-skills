# reader-div `1200+`

## 概述

小说组件容器

* 注：oppo侧在`1114+`版本支持

## 子组件

内部支持添加单 div 容器组件，主要用于广告的展示

## 属性

支持[通用属性](common-attributes.md)

| 名称       | 类型    | 默认值 | 必填 | 描述                                                                                       |
| ---------- | ------- | ------ | ---- | ------------------------------------------------------------------------------------------ |
| color                  | `<color>`                                                                 | rgba(0, 0, 0, 0.54) | 否   | 文本颜色 |
| font-size              | `<length>`                                                                | 42px              | 否   | 文本尺寸，最小 36px，最大 60px |
| sectionbreak              | `<string>`                                                                |                 | 是   | 分段符，文本分段标识符，用于章节内容分段    |
| movemode              | `<string>`                                                                |                 | 是   | 阅读模式，可以设置值  horizontal 左右滑覆盖阅读，vertical 上下阅读   |

## 样式

支持[通用样式](common-styles.md)

## 事件

| 名称         | 参数                                                                         | 描述                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| pagechange       | {isForward: forward(标识前进还是后退) <br />isReverse: reverse(标识顺序章节还是逆序章节) <br />readerIndex:readerIndex(小说页面index) <br />totalPages:readerpages(章节小说页面总页数) <br />curIndex:totalCurIndex(包括广告页的当前页index) <br />preIndex:totalPreIndex(包括广告页的上一页index) <br />isPreAd:loadAd(是否需要预加载广告)} | 小说翻页回调接口 <br />标识当前小说页(历史加载过广告页情况，返回或前进翻页会通过 isPreAd 标识下一页是否为广告页，方便提前预加载广告)<br /> 通过 readerIndex 和 totalPages 比较可以判断在章节头部还是尾部 <br />通过 isForward 字段可以判断是前进还是后退 <br />通过 isReverse 字段可以判断是章节逆序加载还是顺序加载 <br />preIndex 和 curIndex 标识所有加载页(小说页和广告页)上一页的 index 和当前页的 index |
| chapterstart       | {movemode: mode( horizontal 标识左右翻页，vertical 上下滑动 )} | 章节开头右滑回调 <br /> 标识当前翻页到章节开头，触发后可以在回调方法中设置上一章节内容 |
| chapterend       | {movemode: mode( horizontal 标识左右翻页，vertical 上下滑动 )} | 章节末尾左滑回调 <br /> 标识当前翻页到章节末尾，触发后可以在回调方法中设置下一章节内容 |
## 方法

| 名称     | 参数                      | 描述                      |
| -------- | ------------------------- | ------------------------- |
| setContent | Object | 设置当前章节小说文本内容 |
| getPageContent | Object | 获取指定页面index小说文本内容，未指定则默认获取当前页面文本内容 |
| setPageColor | Object | 设置页面背景颜色 |
| goNextPage | Object | 前进翻页 |
| goPrePage | Object | 后退翻页 |
| preLoadPage | Object | 用于在当前页预加载下一页(主要用于提前预加载广告) |
| setLineSpace | Object | 设置行间距 |

**setContent 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| title     | string   | 是           |              | 小说章节标题 |
| content     | string   | 是           |              | 小说章节文本内容 |
| forward     | boolean   | 否           |     true         | 适用场景从当前章翻到上一章，设置 false 则是从章节末尾开始阅读，默认 true 从章节头部开始阅读 |

**getPageContent 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| pageIndex      | number   | 否           | 默认当前页       | 默认当前页 |

**setPageColor 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| pagecolor      | <color>   | 是           |             | 页面颜色 |

**preLoadPage 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| forward      | boolean   | 否           |    true         | 预加载下一页还是上一页，预加载执行后会将 reader-div 小说组件中 单 div 容器组件中的内容提前预加载到下一页 |

**setLineSpace 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| type      | string   | 否           |    normal         | 设置行间距，可设置 low、normal、high 三种类型，标识 低、中、高 |

## reader-div &nbsp; 示例代码

```
 <reader-div  id="readerdiv"
        sectionbreak='","'
        style="font-size: {{fontsize}}px;color: {{fontColor}};background-color: {{backgroundcolor}}" movemode="{{movemode}}"
        onpagechange="pagechange" onchapterend="chapterend" onchapterstart="chapterstart"
        onclick="oncontainerclick"
        >
      <div class="ad-container" style="background-color: {{backgroundcolor}}" >
           单div的广告容器
      </div>
 </reader-div>
```

## 延伸阅读

1、小说组件内只支持单 div的一个子组件，主要用于广告展示，通过 preLoadPage 方法触发预加载，并且展示频次上，在连续三页中只允许展示一次

2、新增组件兼容方案
      由于 reader-div 组件在之前引擎版本并不存在，为兼容使用 reader-div 的快应用在旧引擎中使用情况，
      需要在跳转页面之前首先判断版本 versionCode 是否达到 reader-div 组件要求版本，如果版本过低，可以跳转到原有小说阅读实现，版本达到要求则可以跳转到使用 reader-div 组件的页面

[版本判断方法](https://doc.quickapp.cn/features/system/device.html#devicehost1070)

```
  var device = require('@system.device')
      var host = device.host
      var packagename = host.package
      var versionName = host.versionName
      var versionCode = host.versionCode
```

