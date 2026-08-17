# stack

## 概述

基本容器，子组件排列方式为层叠排列，每个直接子组件按照先后顺序依次堆叠，覆盖前一个子组件

## 子组件

支持

## 属性

支持[通用属性](common-attributes.md)

## 样式

支持[div 样式](div.md)

支持[通用样式](common-styles.md)

## 事件

支持[通用事件](common-events.md)

| 名称             | 参数                          | 描述                       |
| ---------------- | ----------------------------- | ------------------------ |
| fullscreenchange `1050+` | {fullscreen: fullscreenValue} | 进入和退出全屏时触发         |

## 方法

| 名称              | 参数                                                            | 描述             |
| ----------------- | -------------------------------------------------------------- | --------------- |
| requestFullscreen `1050+` |  { screenOrientation : "portrait" &#124; "landscape" } |  请求进入全屏模式  |
## stack &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/stack/index.ux)
