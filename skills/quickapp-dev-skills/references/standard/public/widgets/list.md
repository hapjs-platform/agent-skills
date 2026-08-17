# list

## 概述

列表视图容器

## 子组件

仅支持[`<list-item>`](list-item.md)

## 属性

支持[通用属性](common-attributes.md)

| 名称       | 类型    | 默认值 | 必填 | 描述                                                                                       |
| ---------- | ------- | ------ | ---- | ------------------------------------------------------------------------------------------ |
| scrollpage | boolean | false  | 否   | 是否将 list 顶部页面中非 list 部分随 list 一起滑出可视区域，开启该属性会降低 list 渲染性能 |

## 样式

支持[通用样式](common-styles.md)

| 名称           | 类型                                                                        | 默认值  | 必填  | 描述                         |
| ---------------| -------------------------------------------------------------------------- | ------ | -----| ------------------- -------- |
| flex-direction | column &#124; row &#124; column-reverse `1040+` &#124; row-reverse `1040+` | column | 否   | 设置列表的滚动以及子元素的排列方向 |
| columns        | number                                                                     | 1      | 否   | list 显示列数                 |
| layout-type `1070+`        | string                                                         | grid   | 否   | grid：网格展示 <br> stagger：交错显示(瀑布流展示)，该模式下，可自定义各个 list-item 的高度                 |

## 事件

| 名称         | 参数                                                                         | 描述                                                                                                                          |
| ------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| scroll       | {scrollX:scrollXValue, scrollY:scrollYValue, scrollState:stateValue `1010+`} | 列表滑动 <br> stateValue 说明: <br> 0： list 停止滑动 <br> 1： list 正在通过用户的手势滑动 <br> 2： list 正在滑动，用户已松手 |
| scrollbottom | -                                                                            | 列表滑动到底部                                                                                                                |
| scrolltop    | -                                                                            | 列表滑动到顶部                                                                                                                |
| scrollend `1040+`    | -                                                                    | 列表滑动结束                                                                                                                |
| scrolltouchup `1040+` | -                                                                   | 列表滑动过程中手指抬起                                                                                                                |

## 方法

| 名称     | 参数                      | 描述                      |
| -------- | ------------------------- | ------------------------- |
| scrollTo | Object | list 滚动到指定 item 位置|
| scrollBy `1070+`| Object | 使 list 的内容滑动一定距离 |

**scrollTo 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| index     | number   | 否           | 0             | list 滚动的目标 item 位置 |
| smooth `deprecated` | boolean  | 否           | false         | 是否平滑滚动，值为 false 时表示直接滚动到指定位置，值为 true 时表示平滑滚动到指定位置 |
| behavior `1070+` | smooth &#124; instant &#124; auto | 否 | auto | 是否平滑滑动，支持参数 smooth (平滑滚动)，instant (瞬间滚动)，默认值 auto，效果等同于 instant |

**scrollBy 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| left      | number   | 否           | 0            | 从当前位置水平方向滑动距离，单位 px。值为正时向左滑动，为负时向右滑动。flex-direction 为 column 或 column-reverse 时不生效 |
| top       | number   | 否           | 0            | 从当前位置垂直方向滑动距离，单位 px。值为正时向上滑动，为负时向下滑动。flex-direction 为 row 或 row-reverse 时不生效 |
| behavior  | smooth &#124; instant &#124; auto | 否 | auto | 是否平滑滑动，支持参数 smooth (平滑滚动)，instant (瞬间滚动)，默认值 auto，效果等同于 instant |

## list &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/list/index.ux)

查看瀑布流[示例代码](https://github.com/quickappcn/sample/blob/master/src/scenario/scene/waterfall/index.ux)

## 延伸阅读

正确使用和优化组件 list，参见[list 教程](/tutorial/widgets/list-tutorial.md)
