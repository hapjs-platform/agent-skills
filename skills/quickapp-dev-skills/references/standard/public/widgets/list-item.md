# list-item

## 概述

[`<list>`](list.md)的子组件，用来展示列表具体 item，宽度默认充满 list 组件

## 子组件

支持

## 属性

支持[通用属性](common-attributes.md)

| 名称                      | 类型        | 默认值 | 必填 | 描述                                                                                                                                                                                                                                     |
| ------------------------- | ----------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type                      | `<string>`  | -      | 是   | list-item 类型，值为自定义的字符串，如'loadMore'。**相同的 type 的 list-item 必须具备完全一致的 DOM 结构**。因此，在 list-item 内部需谨慎使用 if 和 for，因为 if 和 for 可能造成相同的 type 的 list-item 的 DOM 结构不一致，从而引发错误 |
| disallowintercept `1100+` | `<boolean>` | false  | 否   | 不允许 list 组件拦截点击事件。true 为不允许，false 为允许                                                                                                                                                                                |

## 样式

支持[`<div>样式`](div.md)

不支持 position 样式，支持[通用样式](common-styles.md)

| 名称        | 类型       | 默认值 | 必填 | 描述                                                     |
| ----------- | ---------- | ------ | ---- | -------------------------------------------------------- |
| column-span | `<number>` | 1      | 否   | list-item 在 list 中所占列数，一般用于 list 多列显示时。 |

**注**：

正常情况下，`list-item`的`column-span`数值应小于等于其父组件`list`的`columns`数值，请开发者留意

1070 版本开始，list 组件支持配置样式`layout-type`,可选属性值：`stagger`、`grid(默认)`

- 当`layout-type` 为`stagger`时：若`list-item`的`column-span`数值等于其父组件`list`的`columns`数值，表示占满所有列；否则，list-item 组件将表现为`column-span: 1`的样式

- 当没有指定`layout-type`或`layout-type`为`grid`时：若`list-item`的`column-span`数值小于等于其父组件`list`的`columns`数值，则表现为占有`column-span`列宽度的样式；否则，list-item 组件将表现为`column-span: 1`的样式

## 事件

支持[通用事件](common-events.md)

## list-item &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/list/index.ux)

## 延伸阅读

正确使用组件 list-item，参见[list 教程](/tutorial/widgets/list-tutorial.md)
