# progress

## 概述

进度条

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称    | 类型                       | 默认值     | 必填 | 描述                                |
| ------- | -------------------------- | ---------- | ---- | ----------------------------------- |
| percent | `<number>`                 | 0          | 否   | 当前进度(type 为 circular 时不生效) |
| type    | horizontal &#124; circular | horizontal | 否   | 进度条类型，不支持动态修改          |

## 样式

支持[通用样式](common-styles.md)

horizontal progress 底色为#f0f0f0

circular progress 默认宽高为 32px，宽高设置不一致时，circular 图标为宽高的较小值

| 名称                 | 类型       | 默认值                            | 必填 | 描述                                          |
| -------------------- | ---------- | --------------------------------- | ---- | --------------------------------------------- |
| color                | `<color>`  | `#33b4ff 或者 rgb(51, 180, 255)`  | 否   | 进度条的颜色                                  |
| stroke-width         | `<length>` | 32px                              | 否   | 进度条的宽度(type 为 circular 时不生效)       |
| layer-color `1070+`  | `<color>`  | `#f0f0f0 或者 rgb(240, 240, 240)` | 否   | 进度条的背景颜色(type 为 circular 时不生效)   |

## 事件

支持[通用事件](common-events.md)

## progress &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/basic/progress/index.ux)