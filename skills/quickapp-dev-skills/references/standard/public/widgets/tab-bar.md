# tab-bar

## 概述

[`<tabs>`](tabs.md)的子组件，用来展示 tab 的标签区，子组件排列方式为横向排列

## 子组件

支持

## 属性

支持[通用属性](common-attributes.md)

| 名称 | 类型                    | 默认值 | 必填 | 描述                                                                                                                                                                                         |
| ---- | ----------------------- | ------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode | scrollable &#124; fixed | fixed  | 否   | mode 为 scrollable 时，子组件宽度为设置宽度，当宽度之和大于 tab-bar 宽度，子组件可以横向滚动；mode 为 fixed 时，子组件宽度均分 tab-bar 宽度，当宽度之和大于 tab-bar 宽度，子组件依旧均分宽度 |

## 样式

支持[通用样式](common-styles.md)

| 名称   | 类型                             | 默认值 | 必填 |
| ------ | -------------------------------- | ------ | ---- |
| height | `<length>` &#124; `<percentage>` | 100px  | 否   |

## 事件

支持[通用事件](common-events.md)

## tab-bar &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/tabs/index.ux)
