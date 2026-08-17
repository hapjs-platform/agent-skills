# video

## 概述

Video 组件，提供了视频播放器的功能，从`1080`版本开始支持全屏显示自定义组件，入门请参考[教程](#全屏显示自定义组件)

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称                | 类型                        | 默认值          | 必填 | 描述                                                                                     |
| ------------------- | --------------------------- | --------------- | ---- | ---------------------------------------------------------------------------------------- |
| src                 | `<uri>`                     | -               | 否   | 视频播放内容的 uri                                                                       |
| autoplay            | `<boolean>`                 | false           | 否   | 渲染后是否自动播放                                                                       |
| poster              | `<uri>`                     | -               | 否   | 视频预览海报                                                                             |
| controls `1010+`    | `<boolean>`                 | true            | 否   | 是否显示默认控件                                                                         |
| muted `1030+`       | `<boolean>`                 | false           | 否   | 是否静音播放                                                                             |
| orientation `1070+` | `<string>`                  | landscape(横屏) | 否   | 指定点击默认控件的全屏按钮时视频进入的全屏方向。`landscape`横屏，`portrait`竖屏          |
| titlebar `1070+`    | `<boolean>`                 | true            | 否   | 指定视频组件全屏播放时是否显示顶栏，`true`为显示,`false`为不显示，在非全屏时均不显示顶栏 |
| title `1070+`       | `<string>`                  | -               | 否   | 配置全屏播放时顶栏显示的标题，最多只支持一行文案，超过会自动以省略号结尾截断             |
| playcount `1080+`   | `<integer>` &#124; infinite | 1               | 否   | 循环播放次数，可设置为 infinite 无限次播放                                               |

**备注**：如果开发者手动调用`requestFullScreen`方法进入全屏，将根据此方法的传入参数`screenOrientation`设置全屏方向。

示例代码：

```xml
<video src="xxx.mp4" orientation="portrait"></video>
```

## 样式

支持[通用样式](common-styles.md)

| 名称               | 类型                                                           | 默认值  | 必填 | 描述             |
| ------------------ | -------------------------------------------------------------- | ------- | ---- | ---------------- |
| object-fit `1040+` | contain &#124; cover &#124; fill &#124; none &#124; scale-down | contain | 否   | 视频源的缩放类型 |

object-fit 类型 `1040+`

| 类型       | 描述                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| contain    | 保持宽高比，缩小或者放大，使得视频完全显示在显示边界内，居中显示              |
| cover      | 保持宽高比，缩小或者放大，使得两边都大于或等于显示边界，居中显示              |
| fill       | 不保存宽高比，填充满显示边界                                                  |
| none       | 居中，无缩放                                                                  |
| scale-down | 保持宽高比，缩小或保持不变，取 `contain` 和 `none` 中显示较小的一个，居中显示 |

## 事件

支持[通用事件](common-events.md)

| 名称             | 参数                          | 描述                             |
| ---------------- | ----------------------------- | -------------------------------- |
| prepared         | {duration: value(秒)}         | 视频连接成功时触发               |
| start            | -                             | 开始播放时触发                   |
| pause            | -                             | 暂停时触发                       |
| finish           | -                             | 播放结束时触发                   |
| error            | -                             | 播放失败时触发                   |
| seeking          | {currenttime: value(秒)}      | 播放进度条滑动时触发             |
| seeked           | {currenttime: value(秒)}      | 播放进度条滑动放开时触发         |
| timeupdate       | {currenttime: value(秒)}      | 播放进度变化时触发，触发频率 4HZ |
| fullscreenchange | {fullscreen: fullscreenValue} | 视频进入和退出全屏时触发         |

## 方法

| 名称                      | 参数                                                  | 描述                                                                                                                   |
| --------------------------------  | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| start                 | -                                                     | 开始播放视频                                                                                                           |
| pause                 | -                                                     | 暂停播放视频                                                                                                           |
| setCurrentTime        | {currenttime: value(秒)}                              | 指定视频播放位置                                                                                                       |
| requestFullscreen     | { screenOrientation : "portrait" &#124; "landscape" } | minPlatformVersion < 1050: 默认参数为 "landscape"; minPlatformVersion >= 1050: 默认参数为 "portrait". 请求进入全屏模式 |
| exitFullscreen        | -                                                     | 视频退出全屏                                                                                                           |
| snapshot `1100+`      | {success: Function, fail: Function}                              | 截取当前视频帧                                                                                                           |

`snapshot` 方法 `success` 回调的返回值: data

data对象有以下属性:

|参数名     |    类型      |说明          |
|--------- |-------------|------------- |
|uri       |    String   |截屏图片的路径  |
|name      |    String   |图片文件的名称  |
|size      |    Number   |图片的大小，单位B|

`snapshot` 方法 `fail` 回调的返回值:

|参数名     |    类型      |说明   |
|--------- |-------------|------ |
|errorMsg  |    String   |错误信息|
|errorCode |    String   |错误编码|

## 全屏显示自定义组件 1080+

开发者经常会遇到全屏需要显示自定义组件的场景，如“画质切换”，“分享”按钮等。在 1080 版本开始，我们加入了此特性的支持，请按照以下步骤实现即可：

1.在 video 组件非全屏情况下实现自定义组件，并正常显示（推荐使用绝对定位实现自定义组件布局）

2.将 video 组件通过 div 标签包裹，并赋值`enablevideofullscreencontainer`值为 true，即可完成需求

div 组件的`enablevideofullscreencontainer`参数说明：

| 名称                                   | 类型    | 默认值 | 必填 | 描述                                                                                                                                              |
| -------------------------------------- | ------- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enablevideofullscreencontainer `1080+` | boolean | false  | 否   | 若 video 组件的直接父组件为 div 组件，且其`enablevideofullscreencontainer`值为 true，则开启全屏显示自定义组件特性。默认值为 false，特性为关闭状态 |

示例代码

```html
<template>
    <div enablevideofullscreencontainer="true">
        <video class="video" autoplay="false" orientation="landscape" title="快应用介绍视频"
                src="https://swsdl.vivo.com.cn/appstore/developer/uploadfile/20180323/20180323183010837.mp4">
        </video>
        <div class="button" onclick="toggleShowFlag" >
            <text class="button-text">弹幕开关</text>
        </div>
        <text class="danmu-container" show={{visible}}>awsl</text>
    </div>
</template>
<style>
    .danmu-container {
        position: absolute;
        top: 150px;
        right: -100px;
        font-size: 60px;
        color: #4c9afa;
        height: 70px;
        padding:0 30px;
    }
</style>
```

注意点：

1. 横竖屏切换的时候，video 的自定义组件的长度、位移等属性默认情况下会保持一致。

2. 在 video 组件切换到全屏状态后，当容器为绝对定位，通过[transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)样式触发变换操作，且长度单位为 px，则此时 px 的单位长度会重新计算，此时 1px 等于全屏下的`screenWidth/designWidth`。因此，横屏的自定义组件会比竖屏时显示的更长、更宽，此为正常现象。

3. 受注意点 2 重新计算 1px 长度影响的容器，其子节点不受影响。

4. 若需要触发 transform 操作又要保证长宽不变，可以使用`dp`单位，但`dp`单位仅在 1080 以上平台支持，需注意使用。dp 单位详情请参考[文档](../../tutorial/framework/page-style-and-layout.html#dp)

## video &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/media/video/index.ux)

说明:

1. 支持 HTTP/HTTPS/RTSP 协议
2. 在主流的视频编码格式(如：H.263，H.264，MPEG-4 等)和主流的音频编码格式(AAC，FLAC，MP3 等)下，支持主流的音视频封装格式如：MPEG-4(.mp4)，3GPP(.3gp)，MPEG-TS(.ts，not seekable)，Matroska(.mkv)，Ogg(.ogg)等
