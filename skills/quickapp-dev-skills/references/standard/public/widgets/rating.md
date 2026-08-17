# rating `1000+`

## 概述

星级评分

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称      | 类型        | 默认值 | 必填 | 描述                             |
| --------- | ----------- | ------ | ---- | -------------------------------- |
| numstars  | `<number>`  | 5      | 否   | 星级总数                         |
| rating    | `<number>`  | 0      | 否   | 评星数                           |
| stepsize  | `<number>`  | 0.5    | 否   | 评星步长                         |
| indicator | `<boolean>` | false  | 否   | 是否作为一个指示器(用户不可操作) |

## 样式

支持[通用样式](common-styles.md)

| 名称            | 类型    | 默认值 | 必填 | 描述                                                             |
| --------------- | ------- | ------ | ---- | ---------------------------------------------------------------- |
| star-background | `<uri>` | -      | 否   | 单个星级未选中时的背景图片，仅支持本地路径                       |
| star-secondary  | `<uri>` | -      | 否   | 单个星级部分选中时的次背景图片，位于背景图片上层，仅支持本地路径 |
| star-foreground | `<uri>` | -      | 否   | 单个星级选中时的前景图片，仅支持本地路径                         |

## 事件

支持[通用事件](common-events.md)，不支持 click、longpress 事件

| 名称   | 参数                                                      | 描述                                                         |
| ------ | --------------------------------------------------------- | ------------------------------------------------------------ |
| change | {rating:currentRating, isFromUser:isFromUserValue`1080+`} | 评星数发生改变时触发 <br/> isFromUser说明: <br/> 该事件是否由于用户拖动触发 |

## rating &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/basic/rating/index.ux)