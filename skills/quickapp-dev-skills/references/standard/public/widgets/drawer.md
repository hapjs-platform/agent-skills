# drawer `1080+`

## 概述

抽屉容器，抽屉默认隐藏。可通过侧边滑动或者api调用显示，支持 flex 布局。

## 子组件

支持,包括 [`<drawer-navigation>`](drawer-navigation.md) 子组件

## 属性

支持[通用属性](common-attributes.md)

| 名称 | 类型       | 默认值 | 必填 | 描述                                                                                                                                                                                                                                     |
| ---- | ---------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enableswipe | `<boolean>` | true     | 否   |能否通过手势滑出或者滑入抽屉，默认可滑出和滑入。 |

## 样式

支持[通用样式](common-styles.md)

## 事件

支持[通用事件](common-events.md)

| 名称   | 参数                 | 描述                         |
| ------ | -------------------- | ---------------------------- |
| change | {direction:directionValue, state: stateValue} |抽屉打开关闭时回调。<br> direction：抽屉的位置，值为 start 或者 end。 start：左边，end：右边 <br> state:打开或者关闭状态。0：关闭，1：打开|
| scroll | {direction:directionValue, slideOffset:offsetValue, state:stateValue} | 抽屉滑动过程的事件回调。<br> direction：抽屉的位置<br> slideOffset：抽屉滑动过程中的偏移。取值范围:0.0-1.0 <br> state:抽屉当前状态,取值为0,1,2 <br> 0：静止状态 <br> 1：正在发生交互状态 <br> 2：用户已松手，正在滑动到目标位置 |

## 方法

| 名称    | 参数                      | 描述                     |
| ------- | ------------------------- | ------------------------ |
| openDrawer | Object | 打开指定方向的抽屉 |
| closeDrawer | Object | 关闭指定方向的抽屉 |

**openDrawer 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| direction     | string | 否           | -          |可选参数 direction 可指定为 start 或者 end。 如果未设置 direction 的值,且只存在一个 drawer-navigation 时,默认打开这个 drawer-navigation。如果左右 drawer-navigation 都存在，则默认打开左边的 drawer-navigation。当指定的 direction 与实际的 drawer-navigation  的 direction 的值不匹配时不生效。|

**closeDrawer 的参数说明:**

| 名称      | 类型      | 是否必选      | 默认值        | 备注              |
| --------- | -------- | ------------ | ------------ | ----------------- |
| direction     | string | 否           | -          |可选参数 direction 可指定为 start 或者 end。 如果未设置 direction 的值,且只存在一个 drawer-navigation 时,默认关闭这个 drawer-navigation。如果左右 drawer-navigation 都存在，则必须指定 direction 的值。当指定的 direction 与实际的 drawer-navigation  的 direction 的值不匹配时不生效。|

## drawer &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/extend/drawer/index.ux)
