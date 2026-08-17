# 非等比例的屏幕适配

> 本节主要讲述如何开发：非手机设备、非等比例屏幕适配的快应用

通过本节，你将学会：

- [背景介绍](#背景介绍)
- [H5开发中的viewport](#h5-viewport)
- [引入DP单位](#dpunit)
- [字体大小跟随系统设置变化](#followsystemconfig)
- [获取屏幕宽度的dp值与实际渲染窗口的宽度dp值](#getScreenDPNum)
- [使用媒体查询适配](#useMediaQuery)

## 背景介绍

当前开发者开发的快应用，适配到不同屏幕分辨率的设备时，居多采用的是`等比例的放大缩小`方案完成的；

因为开发者所采用的方案，大多定义`manifest.json中的designWidth`为固定值，比如：默认的750或者1080，然后代码中使用百分比或者px单位完成适配；

这种方案的原理就是将所有运行的设备：在`屏幕宽度`上做一定数值的等分，然后完成同等比例的放大缩小完成适配；

注意：是基于屏幕宽度的等分，不是应用实际渲染可见宽度，比如：负一屏中快应用卡片场景，卡片的实际渲染宽度要比屏幕全宽小；

然而，`非等比例的屏幕适配`也是开发前常见的一种需求，比如：不同屏幕大小时显示的内容不同，大屏时显示的文字内容更多，小屏时显示内容较少；

另外，`非全屏宽的布局`也在快应用的部分场景中比较常见，比如：负一屏中快应用卡片渲染，其卡片所渲染的宽度相对屏幕全宽要小；

还有，`横屏时的屏幕适配`也在快应用开发中比较常见，比如：适配到 Pad、电视、车机等之类的横屏设备；

本节主要基于以上几个方面的需求，提供一些建议与指导；

## H5开发中的viewport <a id="h5-viewport"></a>

在H5移动站点的开发中，关于视口viewport的概念，存在两个指向：`布局视口`和`可见视口`；

前者指的是页面实际渲染所占据的大小，比如：如果页面中不声明`<meta name="viewport">`时，布局视口默认为980；

后者指的是页面对用户来说，在不缩放拖动情况下，可见区域的大小，这个通常指的就是屏幕宽度，即：webview以占据全屏幕宽的方式展现；

为了给用户最佳的浏览体验，开发者一般将`布局视口`设置为`可见视口`的大小，即：`<meta name="viewport" conent="width=device-width">`；

上面meta标签中`width`代表如何定义页面实际渲染的宽度，`device-width`代表的是`可见视口`的宽度（注意：非屏幕宽度）；

比如：在屏幕宽度为420DP的设备上，定义某个Webview的应用显示宽度为300DP时，`device-width`对应的值为300；

此时，某个最外层元素如果width设置为：300px、100%时，就代表渲染占据`可见视口`的宽度，此时1px对应Android中的1dp；

## 引入DP单位 <a id="dpunit"></a> `1080+`

DP是Android开发中常见的单位，也称为：设备独立像素（Device Independant Pixels）；

DP的计算公式为： 屏幕宽度的DP值 = 设备屏幕分辨率的宽度 / DPR = 设备dpi / 160；

DPR也称为`Screen Density`屏幕密度，获取设备的屏幕密度值可以通过[规范文档中的device接口获取](../../features/system/device.md#devicegetinfoobject)；

比如：当屏幕分辨率的宽度为1080像素、DPR为3时，对应的屏幕DP宽度为360，即：360dp；

提示：实际上，屏幕分辨率、设备dpi、屏幕宽度dp值是可以通过系统设置更新的，修改某个变量会相应导致其它变量更新换算；

引入DP单位，开发者可以解决`非等比例的屏幕适配`；

比如：在DPR为3的小屏幕上希望内容显示较少，设置元素的宽度dp较小，在DPR为3的大屏幕上希望内容显示较多，设置元素的宽度dp较大；

该单位可以像`px单位`一样，用于常见的DOM元素的宽度、高度上；

### 注意事项

当前快应用平台针对DP单位的支持正在开发中，请使用如下方式作为临时解决方法：

开发者可以在`manifest.json`中定义`designWidth:"device-width"`，并在代码中使用px替代dp单位来临时解决，此时的1px即为1dp；

后期应用中如果只会用到dp单位，还是推荐使用dp替换px来写样式；

## 字体大小跟随系统设置变化 <a id="followsystemconfig"></a>

当开发者希望页面中的字体大小跟随系统中设置的变化而变化时，可以在`manifest.json`中设置`textSizeAdjust:auto`解决；

具体请参考[规范文档中的textSizeAdjust属性](../../framework/manifest.md#display)；

## 获取屏幕宽度的dp值与实际渲染窗口的宽度dp值 <a id="getScreenDPNum"></a>

开发者可以通过下面的示例代码，获取屏幕与应用的相关DP值，具体请参考[规范文档的device接口](../../features/system/device.md#devicegetinfoobject)；

```javascript
import device from "@system.device"

device.getInfo({
  success: function(data) {
    const {
      screenDensity,
      screenWidth,
      windowWidth
    } = data

    console.info(`设备的屏幕密度DPR：${screenDensity}`)
    console.info(`设备的屏幕分辨率的宽度：${screenWidth}`)
    console.info(`应用的实际渲染窗口的宽度：${screenWidth}`)

    const screenWidthInDP = screenWidth / screenDensity
    console.info(`设备的屏幕宽度DP值：${screenWidthInDP}`)

    const windowWidthInDP = windowWidth / screenDensity
    console.info(`应用的实际渲染宽度DP值：${windowWidthInDP}`)
  }
})

```

## 使用媒体查询适配 <a id="useMediaQuery"></a>

当开发者希望针对不同的设备环境进行不同的定义时，可以通过媒体查询来解决；

这些设备环境的指标包括：`orientation`、`resolution`等，具体请参考[规范文档的媒体查询介绍](../../framework/style-sheet.md#媒体查询-1070)；

媒体查询的示例如下：

```html
<style>
  /* 默认的样式定义*/
  .page-tabs-auto {
    background-color: red;
  }

  /* 媒体查询：屏幕横屏时的定义 */
  @media(orientation: landscape) {
    .page-tabs-auto {
      background-color: blue;
    }
  }
</style>

```

## 其他需求收集

如果开发者有其他围绕布局相关的需求，欢迎联系我们，您可以向[快应用Github官方提交Issue](https://github.com/quickappcn/issues)；

比如：

- 希望应用中只有部分元素的字体大小跟随系统设置的变化而变化，即：引入SP单位

- 监听当前设备屏幕的变化，如：横竖屏切换

## 参考

- [移动端Android设备上像素单位的调研](https://zhuanlan.zhihu.com/p/67111002)

- [移动前端开发之viewport的深入理解](https://www.cnblogs.com/2050/p/3877280.html)

## 总结

了解了以上信息之后，开发者就可以开发非等比例屏幕适配的快应用了，以及非全屏宽度下渲染的应用；
