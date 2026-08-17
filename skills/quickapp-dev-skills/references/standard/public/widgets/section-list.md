# section-list  `1090+`

## 概述

分组列表容器

## 子组件

仅支持[`<section-group>`](section-group.md)和[`<section-item>`](section-item.md)

## 属性

支持[通用属性](common-attributes.md)

## 样式

支持[通用样式](common-styles.md)

## 事件

支持[通用事件](common-events.md)

| 名称   | 参数                 | 描述                         |
| ------ | -------------------- | ---------------------------- |
| scroll | {scrollX:scrollXValue, scrollY:scrollYValue, scrollState:stateValue} | 列表滑动 <br> stateValue 说明: <br> 0： list 停止滑动 <br> 1： list 正在通过用户的手势滑动 <br> 2： list 正在滑动，用户已松手 |
| scrollend | - | 列表滑动结束 |
| scrolltouchup | - | 列表滑动过程中手指抬起 |
| scrolltop | - | 列表滑动到顶部 |
| scrollbottom | - | 列表滑动到底部 |

## 方法

| 名称    | 参数                      | 描述                     |
| ------- | ------------------------- | ------------------------ |
| scrollTo | object | 滚动到指定位置 |

**scrollTo 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| index | number | 否 | 0 | 滚动的目标位置索引，取值范围为 section-list 直接子dom元素范围 |
| behavior | smooth &#124; instant | 否 | instant | 是否平滑滑动，，支持参数 smooth (平滑滚动)，instant (瞬间滚动) |

## section-list &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/extend/section-list/index.ux)

