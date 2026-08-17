# switch

## 概述

开关选择

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称    | 类型        | 默认值 | 必填 | 描述                |
| ------- | ----------- | ------ | ---- | ------------------- |
| checked | `<boolean>` | false  | 否   | 可触发 checked 伪类 |

## 样式

支持[通用样式](common-styles.md)

| 名称                 | 类型                 | 默认值                             | 必填 | 描述                                       |
| -------------------- | -------------------- | ---------------------------------- | ---- | ------------------------------------------ |
| thumb-color `1070+`  | `<color>`            | `#009385 或者 rgb(0, 147, 133)`    | 否   | 滑块颜色                                   |
| track-color `1070+`  | `<color>`            | `#009385 或者 rgb(0, 147, 133)`    | 否   | 滑轨颜色                                   |

## 事件

支持[通用事件](common-events.md)

| 名称   | 参数                   | 描述                   |
| ------ | ---------------------- | ---------------------- |
| change | {checked:checkedValue} | checked 状态改变时触发 |

## switch &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/form/switch/index.ux)
