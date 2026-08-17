# slider

## 概述

滑动选择器

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称  | 类型       | 默认值 | 必填 | 描述 |
| ----- | ---------- | ------ | ---- | ---- |
| min   | `<number>` | ０     | 否   | -    |
| max   | `<number>` | 100    | 否   | -    |
| step  | `<number>` | 1      | 否   | -    |
| value | `<number>` | 0      | 否   | -    |

## 样式

支持[通用样式](common-styles.md)

| 名称                      | 类型       | 默认值                          | 必填 | 描述       |
| ------------------------- | ---------- | ------------------------------- | ---- | ---------- |
| color                     | `<color>`  | #f0f0f0 或者 rgb(240, 240, 240) | 否   | 背景条颜色 |
| selected-color            | `<color>`  | #009688 或者 rgb(0, 150, 136)   | 否   | 已选择颜色 |
| block-color `1050+`       | `<color>`  | -                               | 否   | 滑块的颜色 |
| padding-[left&#124;right] | `<length>` | 32px                            | 否   | 左右边距   |

## 事件

支持[通用事件](common-events.md)

| 名称   | 参数                                                        | 描述                                                         |
| ------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| change | {progress:progressValue, isFromUser:isFromUserValue`1080+`} | 完成一次拖动后触发的事件 <br/> isFromUser说明: <br/> 该事件是否由于用户拖动触发 |

## slider &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/form/slider/index.ux)
