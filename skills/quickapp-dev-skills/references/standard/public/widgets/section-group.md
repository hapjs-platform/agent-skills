# section-group  `1090+`

## 概述

section-list的子组件。不支持position。

## 子组件

仅支持子元素 section-header、section-item 和 section-group。section-group 支持多个 section-item 和 section-group，section-group 最多只支持一个 section-header，后面的 header 将被忽略。

## 属性

支持[通用属性](common-attributes.md)

| 名称         | 类型        | 默认值 | 必填 | 描述                                      |
| ------------ | ----------- | ------ | ---- | ----------------------------------------- |
| expand | `<boolean>` | false | 否 | 内容是否展开显示，默认折叠。|

## 样式

不支持[通用样式](common-styles.md)

## 事件

不支持[通用事件](common-events.md)

| 名称   | 参数                 | 描述                         |
| ------ | -------------------- | ---------------------------- |
| change | object | section-group 折叠-展开时回调 |

**change 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| state | number | 是 | 1 | state 表示当前的状态,可选值如下： 1：折叠状态 2：展开状态 |

## 方法

| 名称    | 参数                      | 描述                     |
| ------- | ------------------------- | ------------------------ |
| expand | {expand: boolean} | 是否展开显示。如果父节点处于折叠状态，那么调用展开时不生效。参数必填 true:展开显示 false:折叠显示 |
| scrollTo | object | 滚动到指定位置|

**scrollTo 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| index | number | 是 | 0 | 滚动的目标位置索引，取值范围为直接子节点的范围(不包含 header) |
| behavior | smooth &#124; instant | 否 | instant | 是否平滑滑动，支持参数 smooth (平滑滚动)，instant (瞬间滚动) |
