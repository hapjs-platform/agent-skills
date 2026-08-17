# custommarker  `1060+`

## 概述

[`<map>`](map.md)的子组件，用来将自定义的view固定到map中某一经纬度点

## 子组件

支持

注：

1. 在custommarker内部嵌套dom层级过深或者过多子组件会存在性能问题
2. custommarker禁止嵌套custommarker
3. 建议内部子组件使用stack、div、text、image等完成布局，不要使用tab、tab-bar、tab-content、swiper、list、map等

## 属性

支持[通用属性](common-attributes.md)

|       名称       |   类型   | 默认值 | 必填 |          描述          |
| :--------------: | :------: | :----: | :--: | :--------------------: |
| custommarkerattr | `<object>` |   -    |  是  | custommarker的位置信息 |

## 子属性

custommarkerattr

|   名称    |    类型    | 默认值 | 必填 |                             描述                             |
| :-------: | :--------: | :----: | :--: | :----------------------------------------------------------: |
|    id     | `<number>` |   -1   |  否  |                     每个标记点的唯一标识                     |
| latitude  | `<number>` |   -    |  是  |                          标记点纬度                          |
| longitude | `<number>` |   -    |  是  |                          标记点经度                          |
| coordType | `<string>` |   -    |  否  | 标记点坐标坐标系，如不为空，组件将自动做坐标转换。可选值可通过getSupportedCoordTypes获取 |
|  anchorX  | `<number>` |   0    |  否  |          原点是对应的经纬度，数值为相对对应X轴偏移           |
|  anchorY  | `<number>` |   0    |  否  |          原点是对应的经纬度，数值为相对对应Y轴偏移           |

## 样式

支持[通用样式](common-styles.md)

支持[`<div样式>`](div.md)

## 事件

支持[通用事件](common-events.md)
