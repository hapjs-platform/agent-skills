# 夜间模式适配 `1070+`

从 Android 10 开始，系统加入了夜间模式（也有被称为深色模式、暗色模式）的原生支持。快应用也同步引入了此特性，方便开发者更好地适配夜间模式。

在这一篇教程，我们将从简单的主题模式配置入门，到控制自动反色开关与手动配置夜间模式的样式，逐步掌握夜间模式的最佳实践。

**注意：**

1. 夜间模式仅在`Android 10`以上版本的手机支持，如果要查看效果，请确保拥有合适版本的手机，且快应用平台版本号在`1070`以上。另外，快应用打包工具 hap-toolkit 的版本号要在`0.6.15`版本以上。（可通过命令`hap -v`查看版本号)

2. vivo 手机在`1077`及以上版本支持深色模式，且默认采用强制日间模式

通过本篇教程，我们将学会：

- [配置 app 的主题模式](#配置-app-的主题模式)
- [获取 app 的主题模式值](#获取-app-的主题模式值)
- [系统主题模式切换的回调](#系统主题模式切换的回调)
- [ForceDark 开关](#forcedark-开关)
- [通过媒体查询配置指定主题模式的样式](#通过媒体查询配置指定主题模式的样式)

## 效果展示

## 配置 app 的主题模式

快应用的主题模式支持三种：

- 跟随系统主题模式
- 固定日间模式
- 固定夜间模式

其中，`跟随系统主题模式`这一项选中时，当系统切换`日间`、`夜间`两种主题模式，快应用也会跟随变换主题模式。

了解 3 种主题模式的区别后，现在我们可以尝试在快应用配置`主题模式`啦。

### 步骤：

在`manifest.json`的`display`属性，添加`themeMode`值即可，默认为`-1`（跟随系统主题模式）,详情请查看[manifest 文档](/framework/manifest.md)

### 示例代码：

```json
"display": {
  "themeMode": -1,
}
```

### themeMode 可填入值：

| 参数值 |       意义       |
| :----: | :--------------: |
|   -1   | 跟随系统主题模式 |
|   0    |   固定日间模式   |
|   1    |   固定夜间模式   |

## 获取 app 的主题模式值

如果需要针对特定的主题模式做适配逻辑，我们就需要获取当前的主题模式值了

### 步骤：

通过调用`@system.configuration`的`getThemeMode`方法即可获取，详情可参考[configuration 文档](/features/system/configuration.md)

### 返回值：

| 参数值 |        意义        |
| :----: | :----------------: |
|   0    | 当前主题为日间模式 |
|   1    | 当前主题为夜间模式 |

### 示例代码：

```javascript
import configuration from '@system.configuration'
export default {
  getTheme() {
    const themeMode = configuration.getThemeMode()
    console.log(`Theme mode is ${themeMode} now~`)
  }
}
```

## 系统主题模式切换的回调

想象一个用户常见的场景，比如说在小说阅读时，用户切换系统主题到夜间模式，应用需弹出提示“进入夜间模式啦”。这个时候，就需要监听主题模式切换了。

### 步骤：

1.  在页面代码如`index.ux`里，实现快应用页面级别的`onConfigurationChanged`回调，监听配置切换事件。

2.  当 type 为`themeMode`时，此时回调即为主题模式切换的回调

详情可参考[script](/framework/script.md)文档的`onConfigurationChanged`一节

### 注意：

1.  因为在`onConfigurationChanged`只能拿到`type`值，所以开发者如果需要在回调时同时获取主题模式值来判断，可以参考[上一节](#获取-app-的主题模式值)教程，手动获取`themeMode`值

2.  即使在 manifest.json 配置了`themeMode`为`0`（固定日间模式）或`1`（固定夜间模式），用户切换系统主题时快应用不会有界面变化，但仍会触发`onConfigurationChanged`回调

### 示例代码：

```javascript
// index.ux
import configuration from '@system.configuration'
export default {
  onConfigurationChanged(params) {
    const { type = '' } = params
    if (type === 'themeMode') {
      const themeMode = configuration.getThemeMode()
      console.log(`themeMode has changed! And now theme mode is ${themeMode}.`)
    } else {
      console.log(`other type of config has changed, type is : ${type}.`)
    }
  }
}
```

## ForceDark 开关

看了我们上面的效果图，也许你会好奇，只是设置了皮肤模式，为什么我的快应用就自动在夜间模式可以反色呢？而且效果还这么好！

其实，这是 Android 10 以上系统提供的一个功能，叫`Force Dark`。开启了`Force Dark`的安卓应用，就会在`夜间模式`下自动反色，达到十分简单且效果不赖的 APP 夜间模式效果，详情可查看 Android 的[深色主题背景](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme)文档的"Force Dark"一节

而快应用也把`Force Dark`的特性在 1070 以上的版本开始加入支持。

我们只需要按照[配置 app 的主题模式](#配置-app-的主题模式)教程，将 themeMode 设为`-1`(跟随系统主题模式）或`1`（固定夜间模式），即可在夜间模式查看反色效果，非常方便。

然而，因为`Force Dark`反色的样式由 Android 底层自动计算，且仅在系统为`夜间模式`时生效，我们是无法手动修改的。因此，根据需求场景，我们可能需要手动关闭反色效果，或指定快应用在`夜间模式`下的样式。

在这一节，我们将学习如何关闭反色效果。

`ForceDark` 的开关有 3 个级别：

- [应用级别](#应用级别的-forcedark)
- [单页面级别](#单页面级别的-forcedark)
- [组件级别](#组件级别的-forcedark)

### ForceDark 开关基本原则

在快应用中，`ForceDark`开关，除了直接影响自己的反色表现，也同样影响其所有子元素的反色表现。

父子元素的层级顺序：APP 级别 > 页面级别 > 组件级别 > 子组件级别

具体规则如下：

- 如果父元素设置为`true`，子元素设置为`false`，则子元素的表现是`false`；子元素设置为`true`，则子元素的表现为`true`
- 如果父元素设置为`false`，子元素无论设置为`false`或`true` ，表现都是`false`

### 应用级别的 forceDark

应用级别的`forceDark`开关，可配置此快应用所有页面的自动反色开关。

#### 步骤：

在`manifest.json`的`display`属性下可配置`forceDark`属性（属性为驼峰命名）

#### 参数值：

默认为`true`（开启），可选值：`true`（开启），`false`（关闭）

#### 示例代码：

```json
"display": {
   "themeMode": -1,
   "forceDark": true
}
```

### 单页面级别的 forceDark

页面级别的`forceDark`开关，可配置特定页面的自动反色开关。

#### 步骤：

在`manifest.json`的`display`属性下的`pages`数组的页面节点，可配置`forceDark`属性（属性为驼峰命名）

#### 参数值：

默认为`true`（开启），可选值：`true`（开启），`false`（关闭）

#### 示例代码：

```json
"display": {
  "pages": {
    "Demo": {
      "titleBarText": "示例页",
      "forceDark": false
    },
  }
}
```

### 组件级别的 forcedark

组件级别的`forcedark`开关，可以配置该组件的自动反色开关

#### 步骤：

在组件标签里配置`forcedark`属性(属性为全小写命名)

#### 参数值：

默认为`true`（开启），可选值：`true`（开启），`false`（关闭）

#### 示例代码：

```html
// force-dark-demo.ux
<template>
<div>
   <text forcedark="false">关闭了自动反色的文字</text>
   <text>默认开启了自动反色的文字</text>
<div>
</template>
```

#### 注意点：

- 组件级别的`forcedark`属性为全小写！与`manifest.json`的配置项为驼峰的`forceDark`不一样！请注意书写！

- 子节点的`forcedark`遵守[ForceDark 开关基本原则](#forcedark-开关基本原则)的简介，需要注意父子元素的`forcedark`开关的影响

- `span`组件不支持`forcedark`开关，它只能依赖父元素的`forcedark`参数值控制开关，并且当父元素为`span`的时候，继续往上找，直至找到父元素为`a`或`text`元素截止

- `video`、`camera`、`map`、`custommarker`、`canvas`组件均不支持设置`forcedark`参数，也不会响应父元素的`forcedark`设置

## 通过媒体查询配置指定主题模式的样式

当我们对安卓夜间模式的反色处理不太满意时，上一节我们学习了如何手动关闭反色效果。这一节，我们会使用媒体查询（`media query`），去配置指定主题模式的样式

媒体查询，即`media query`，快应用在`1070`版本开始提供支持，详情可查看[样式](/framework/style-sheet.md)文档。

如果需要使用`media query`实现夜间模式的样式配置，则查询条件是`prefers-color-scheme`

**注意：** `prefers-color-scheme`的媒体查询仅在 Android 10+手机支持

支持参数：

- `light` 系统主题模式为日间模式时查询生效
- `dark` 系统主题模式为夜间模式时查询生效

示例代码：

```html
<style>
  .box {
    width:100px;
    height:100px;
    background-color:black;
  }

  @media (prefers-color-scheme: dark) {
    .box {
      background: white;
    }
  }
</style>
```

## 总结

夜间模式作为新的软件交互界面的探索，快应用在 Android 10+手机上提供了支持与丰富的可配置项。开发者配合这篇教程，可以更好更快捷地，实现快应用的夜间模式形态。
