# map `1020+`

## 概述

地图

## 子组件

支持且只支持[`<custommarker>`](custommarker.md)作为其子组件 `1060+`

## 属性

支持[通用属性](common-attributes.md)

| 名称                      | 类型        | 默认值                     | 必填 | 描述                                                                                     |
| ------------------------- | ----------- | -------------------------- | ---- | ---------------------------------------------------------------------------------------- |
| latitude                  | `<number>`  | 默认为当前位置，否则为北京 | 否   | 中心纬度                                                                                 |
| longitude                 | `<number>`  | 默认为当前位置，否则为北京 | 否   | 中心经度                                                                                 |
| coordtype                 | `<string>`  | -                          | 否   | 中心坐标坐标系，如不为空，组件将自动做坐标转换。可选值可通过 getSupportedCoordTypes 获取 |
| scale                     | `<number>`  | 11                         | 否   | 缩放级别,4-20                                                                            |
| rotate                    | `<number>`  | 0                          | 否   | 逆时针旋转角度                                                                           |
| markers                   | `<array>`   | -                          | 否   | 用来标记地图上的点                                                                       |
| showmylocation            | `<boolean>` | false                      | 否   | 显示带有方向的当前定位点                                                                 |
| polylines                 | `<array>`   | -                          | 否   | 折线                                                                                     |
| polygons `1050+`          | `<array>`   | -                          | 否   | 多边形                                                                                   |
| circles                   | `<array>`   | -                          | 否   | 地图上显示圆                                                                             |
| controls                  | `<array>`   | -                          | 否   | 控件                                                                                     |
| groundoverlays            | `<array>`   | -                          | 否   | 贴图                                                                                     |
| heatmaplayer `1070+`      | `<object>`  | -                          | 否   | 显示热力图                                                   |
| includepoints             | `<array>`   | -                          | 否   | 缩放视野以包含所有给定的坐标点                                                           |
| showcompass `1040+`       | `<boolean>` | true                       | 否   | 是否显示指南针控件，设置为true时，旋转地图后指南针出现                                       |
| showscale `1070+`         | `<boolean>` | false                      | 否   | 是否显示比例尺控件                                                                       |
| showzoom `1070+`          | `<boolean>` | false                      | 否   | 是否显示放大缩小功能控件                                                                 |
| enableoverlooking `1040+` | `<boolean>` | false                      | 否   | 控制启用或禁用俯视（3D）功能，默认关闭。如果启用，则用户可使用双指 向下或向上滑动到俯视图|
| enablezoom `1040+`        | `<boolean>` | true                       | 否   | 是否支持缩放                                                                             |
| enablescroll `1040+`      | `<boolean>` | true                       | 否   | 是否支持拖动                                                                             |
| enablerotate `1040+`      | `<boolean>` | true                       | 否   | 是否支持旋转                                                                             |

**注**：

1. 一级属性都是全部小写的格式，并不符合驼峰命名方式，这里的 coordtype 属性与下文需加以区分；
2. 如果地图没有加载完毕，includepoints 属性不生效，建议在 loaded 监听事件中设置该属性。

## 子属性

markers

| 名称            | 类型       | 默认值         | 必填 | 描述                                                                                                                   |
| --------------- | ---------- | -------------- | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| id              | `<number>` | -1             | 否   | 每个标记点的唯一标识                                                                                                   |
| latitude        | `<number>` | -              | 是   | 标记点纬度                                                                                                             |
| longitude       | `<number>` | -              | 是   | 标记点经度                                                                                                             |
| coordType       | `<string>` | -              | 否   | 标记点坐标坐标系，如不为空，组件将自动做坐标转换。可选值可通过 getSupportedCoordTypes 获取                             |
| offsetX `1030+` | `<number>` | -              | 否   | 标记点固定位置距离原点的 X 坐标，map 组件的左上角为原点(0,0)。设置了 offsetX,offsetY 后，marker 的坐标位置将不再生效。 |
| offsetY `1030+` | `<number>` | -              | 否   | 标记点固定位置距离原点的 Y 坐标，map 组件的左上角为原点(0,0)。设置了 offsetX,offsetY 后，marker 的坐标位置将不再生效。 |
| title           | `<string>` | -              | 否   | 标记点名称                                                                                                             |
| iconPath        | `<uri>`    | -              | 是   | 标记图标资源的 uri。支持本地绝对路径；`1030+`版本支持网络路径                                                          |
| opacity         | `<number>` | 1              | 否   | 标记透明度，0-1                                                                                                        |
| rotate          | `<number>` | 0              | 否   | 逆时针旋转角度                                                                                                         |
| width           | `<length>` | 标记图实际宽度 | 否   | 标记图宽度                                                                                                             |
| height          | `<length>` | 标记图实际高度 | 否   | 标记图高度                                                                                                             |
| anchor          | `<object>` | `{x:0.5,y:1}`  | 否   | 标记点在标记图标的位置，x 表示横向坐标，取值范围 0-1，y 表示纵向坐标，取值范围 0-1                                     |
| callout         | `<object>` | -              | 否   | 标记点上方的文本弹窗                                                                                                   |
| label `1040+`    | `<object>` | -              | 否   | 标记点周边展示文本                                           |
| zIndex          | `<number>` | -              | 否   | z 轴坐标，用来描述重叠时的展示顺序                                                                                     |

markers-callout

| 名称            | 类型                                  | 默认值    | 必填 | 描述                          |
| --------------- | ------------------------------------- | --------- | ---- | ----------------------------- |
| convertHtml `1040+` | `<boolean>`                           | false     | 否   | content内容以html格式展示     |
| content         | `<string>`                            | -         | 是   | 文本内容                      |
| color           | `<color>`                             | `#000000` | 否   | 字体颜色                      |
| fontSize        | `<length>`                            | 30px      | 否   | 文本字号                      |
| borderRadius    | `<length>`                            | 0px       | 否   | 边框圆角                      |
| padding         | `<length>`                            | 0px       | 否   | 文本边缘留白，支持 1-4 个参数 |
| backgroundColor | `<color>`                             | `#ffffff` | 否   | 背景色                        |
| display         | `byclick` &#124; `always`             | byclick   | 否   | 点击触发显示还是常显          |
| textAlign       | `left` &#124; `right` &#124; `center` | center    | 否   | 文本对齐方式                  |

**注**：

convertHtml为true时，content支持展示的tag有：br、p、strong、b、font、sup、sub、u及h1到h6 。

markers-label `1040+`

| 名称            | 类型                      | 默认值    | 必填 | 描述                                                  |
| --------------- | ------------------------- | --------- | ---- | ----------------------------------------------------- |
| content         | `<string>`                | -         | 是   | 文本内容                                              |
| color           | `<color>`                 | `#000000` | 否   | 字体颜色                                              |
| fontSize        | `<length>`                | 30px      | 否   | 文本字号                                              |
| anchorX         | `<number>`                | 0         | 否   | label的坐标，原点是 marker 对应的经纬度，对应水平偏移 |
| anchorY         | `<number>`                | 0         | 否   | label的坐标，原点是 marker 对应的经纬度，对应垂直偏移 |
| borderRadius    | `<length>`                | 0px       | 否   | 边框圆角                                              |
| padding         | `<length>`                | 0px       | 否   | 文本边缘留白，支持 1-4 个参数                         |
| backgroundColor | `<color>`                 | `#ffffff` | 否   | 背景色                                                |
| textAlign       | `left` &#124; `right` &#124; `center` | center    | 否   | 文本对齐方式                                          |

polylines

| 名称   | 类型        | 默认值    | 必填 | 描述                                             |
| ------ | ----------- | --------- | ---- | ------------------------------------------------ |
| points | `<array>`   | -         | 是   | 路线上点的数组[{latitude, longitude, coordType}] |
| color  | `<color>`   | `#666666` | 否   | 路线颜色，`#666666`不可简写为`#666`                                        |
| width  | `<length>`  | 10px      | 否   | 路线宽度                                         |
| dotted | `<boolean>` | false     | 否   | 是否为虚线                                       |
| arrowLine `1050+` | `<boolean>` | false     | 否   | 是否展示带箭头纹理的线                                      |
| arrowIconPath `1050+` | `<uri>`  | -     | 否   | 更换纹理图标，在arrowLine为true时生效，只支持本地绝对路径图片，图片宽、高需设计为2的整数倍                |
| zIndex | `<number>`  | -         | 否   | z 轴坐标，用来描述重叠时的展示顺序               |

polygons `1050+`

| 名称   | 类型        | 默认值    | 必填 | 描述                                             |
| ------ | ----------- | --------- | ---- | ------------------------------------------------ |
| points | `<array>`   | -         | 是   | 经纬度数组[{latitude, longitude, coordType}] |
| strokeColor  | `<color>`   | `#666666` | 否   | 描边的颜色                                         |
| strokeWidth  | `<length>`  | 5px      | 否   | 描边的宽度                                        |
| fillColor | `<color>` | `#666666`     | 否   | 填充颜色                                       |
| zIndex | `<number>`  | -         | 否   | z 轴坐标，用来描述重叠时的展示顺序               |

circles

| 名称        | 类型       | 默认值    | 必填 | 描述                                                                                     |
| ----------- | ---------- | --------- | ---- | ---------------------------------------------------------------------------------------- |
| latitude    | `<number>` | -         | 是   | 圆心的纬度                                                                               |
| longitude   | `<number>` | -         | 是   | 圆心的经度                                                                               |
| coordType   | `<string>` | -         | 否   | 圆心坐标坐标系，如不为空，组件将自动做坐标转换。可选值可通过 getSupportedCoordTypes 获取 |
| radius      | `<number>` | -         | 是   | 半径（单位：米）                                                                         |
| fillColor   | `<color>`  | `#666666` | 否   | 填充颜色                                                                                 |
| borderWidth | `<length>` | 0px       | 否   | 描边的宽度                                                                               |
| borderColor | `<color>`  | `#666666` | 否   | 描边的颜色                                                                               |
| zIndex      | `<number>` | -         | 否   | z 轴坐标，用来描述重叠时的展示顺序                                                       |

groundoverlays

| 名称      | 类型        | 默认值 | 必填 | 描述                               |
| --------- | ----------- | ------ | ---- | ---------------------------------- |
| id        | `<number>`  | -1     | 否   | 贴图 id                            |
| northEast | `<object>`  | -      | 是   | 贴图东北角坐标                     |
| southWest | `<object>`  | -      | 是   | 贴图西南角坐标                     |
| iconPath  | `<uri>`     | -      | 是   | 图片资源的本地绝对路径             |
| opacity   | `<number>`  | 1      | 否   | 透明度，0-1                        |
| visible   | `<boolean>` | true   | 否   | 可见性                             |
| zIndex    | `<number>`  | -      | 否   | z 轴坐标，用来描述重叠时的展示顺序 |

heatmaplayer `1070+`

|      名称      |    类型    |                            默认值                            | 必填 |                             描述                             |
| :------------: | :--------: | :----------------------------------------------------------: | :--: | :----------------------------------------------------------: |
|   coordType    | `<string>` |                              -                               |  否  |                            坐标系                            |
| weightedPoints | `<array>`  |                              -                               |  是  | 带权值的经纬度位置点的数组 {latitude, longitude，intensity: number}，大小不能为 0，latitude 和 longitude 必填，intensity 默认为 1 |
|    gradient    | `<object>` | {colors: [`rgb(0, 0, 200)`, `rgb(0, 225, 0)`, `rgb(255, 0, 0)`], startPoints: [0.08, 0.4, 1.0]} |  否  | 热力图渐变 {colors: [], startPoints: []}，colors 和 statPoints 不能为 null ，长度不能为 0 ，两数组长度须一致，startPoints 数据必须递增；colors: 渐变色用到的所有颜色数组, 按声明的顺序由冷到热；startPoints: 每一个颜色的起始点数组范围 [0.0, 1.0]，与 colors 数组一一对应 |
|    opacity     | `<number>` |                             0.6                              |  否  |                  热力图层透明度，范围 [0, 1]                  |
|     radius     | `<length>` |                             12px                             |  否  |                  热力图点半径，范围 [10,50]                   |

northEast/southWest

| 名称      | 类型       | 默认值 | 必填 | 描述   |
| --------- | ---------- | ------ | ---- | ------ |
| latitude  | `<number>` | -      | 是   | 纬度   |
| longitude | `<number>` | -      | 是   | 经度   |
| coordType | `<string>` | -      | 否   | 坐标系 |

controls

| 名称      | 类型        | 默认值 | 必填 | 描述                       |
| --------- | ----------- | ------ | ---- | -------------------------- |
| id        | `<number>`  | -1     | 否   | 控件的 id                  |
| position  | `<object>`  | -      | 否   | 控件相对地图组件的位置     |
| iconPath  | `<string>`  | -      | 是   | 控件图标资源的本地绝对路径 |
| clickable | `<boolean>` | true   | 否   | 是否可点击                 |

controls-position

| 名称   | 类型       | 默认值 | 必填 | 描述                                         |
| ------ | ---------- | ------ | ---- | -------------------------------------------- |
| left   | `<length>` | 0      | 否   | 和地图左边界的距离                           |
| right  | `<length>` | 0      | 否   | 和地图右边界的距离，指定 left 时，该属性无效 |
| top    | `<length>` | 0      | 否   | 和地图上边界的距离                           |
| bottom | `<length>` | 0      | 否   | 和地图下边界的距离，指定 top 时，该属性无效  |
| width  | `<length>` | -      | 否   | 控件宽度                                     |
| height | `<length>` | -      | 否   | 控件高度                                     |

## 样式

支持[通用样式](common-styles.md)

| 名称                            | 类型      | 默认值                    | 必填 | 描述                                                                                                                                                        |
| ------------------------------- | --------- | ------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mylocation `1030+`              | -         | -                         | 否   | 简写属性，在一个声明中设置所有的 mylocation 属性，可以按顺序设置属性 mylocation-fill-color mylocation-stroke-color mylocation-icon-path，不设置的值为默认值 |
| mylocation-fill-color `1030+`   | `<color>` | rgba(135, 206, 235, 0.15) | 否   | 定位精度圈填充颜色。支持透明(rgba(0,0,0,0))                                                                                                                 |
| mylocation-stroke-color `1030+` | `<color>` | rgba(135, 206, 235, 0.15) | 否   | 定位精度圈描边颜色。支持透明(rgba(0,0,0,0))                                                                                                                 |
| mylocation-icon-path `1030+`    | `<uri>`   | -                         | 否   | 标记图标资源的本地绝对路径                                                                                                                                  |

## 事件

支持[通用事件](common-events.md)

| 名称         | 参数                     | 描述                   |
| ------------ | ------------------------ | ---------------------- |
| loaded       | -                        | 地图渲染更新完成时触发 |
| regionchange | `{southwest, northeast}` | 视野发生变化时触发     |
| tap          | `{latitude, longitude}`  | 点击地图时触发         |
| markertap    | `{markerId}`             | 点击地图标记点时触发   |
| callouttap   | `{markerId}`             | 点击标记点对应弹窗触发 |
| controltap   | `{controlId}`            | 点击控件触发           |
| poitap `1050+`   | `{OBJECT}`             | 点击地图poi点时触发           |

### poitap 的 OBJECT 参数列表

| 参数     | 类型     | 说明                                                    |
| -------- | -------- | ------------------------------------------------------- |
| poiId  | String | 代表poi的唯一Id |
| poiName     | String | poi名称                                  |
| latitude | Number | 纬度                                  |
| longitude | Number | 经度                                  |

## 方法

| 名称                         | 参数   | 描述                                                           |
| ---------------------------- | ------ | -------------------------------------------------------------- |
| getCenterLocation            | OBJECT | 获取地图中心点坐标                                             |
| translateMarker              | OBJECT | 在地图上移动 marker                                            |
| moveToMyLocation             | -      | 将地图中心点移动到当前位置坐标                                 |
| includePoints                | OBJECT | 缩放地图，展示所有给定坐标点，如果地图未加载完毕，该方法不生效 |
| getRegion                    | OBJECT | 获取当前地图视野范围                                           |
| getScale                     | OBJECT | 获取地图的放大级别                                             |
| getSupportedCoordTypes       | OBJECT | 获取地图当前支持的坐标系                                       |
| getCoordType                 | OBJECT | 获取地图当前使用的坐标系                                       |
| convertCoord                 | OBJECT | 对坐标的坐标系进行转换                                         |
| setCompassPosition `1070+`   | OBJECT | 设置指南针控件相对地图左上角的距离                             |
| setScalePosition `1070+`     | OBJECT | 设置地图比例尺控件相对地图左上角的距离                         |
| setZoomPosition `1070+`      | OBJECT | 设置地图放大缩小控件相对地图左上角的距离                       |
| setMaxAndMinScaleLevel `1070+` | OBJECT | 自定义缩放级别限制，范围 4-20                                |

### getCenterLocation 的 OBJECT 参数列表

| 参数     | 类型     | 必填 | 说明                                                    |
| -------- | -------- | ---- | ------------------------------------------------------- |
| success  | Function | 否   | 接口调用成功的回调函数， `res = {latitude， longitude}` |
| fail     | Function | 否   | 接口调用失败的回调函数                                  |
| complete | Function | 否   | 接口调用结束的回调函数                                  |

### translateMarker 的 OBJECT 参数列表

| 参数         | 类型     | 必填 | 说明                                                  |
| ------------ | -------- | ---- | ----------------------------------------------------- |
| markerId     | Number   | 是   | 指定 marker                                           |
| destination  | Object   | 是   | 指定 marker 移动到的目标点（`{latitude, longitude}`） |
| autoRotate   | Boolean  | 否   | 移动过程中是否自动旋转 marker                         |
| rotate       | Number   | 否   | marker 的旋转角度，autoRotate 为 true，该值无效       |
| duration     | Number   | 否   | 动画持续时长，默认值 1000ms                           |
| animationEnd | Function | 否   | 动画结束回调函数                                      |
| success      | Function | 否   | 接口调用成功的回调函数                                |
| fail         | Function | 否   | 接口调用失败的回调函数                                |
| complete     | Function | 否   | 接口调用结束的回调函数                                |

### includePoints 的 OBJECT 参数列表

| 参数     | 类型     | 必填 | 说明                                                                  |
| -------- | -------- | ---- | --------------------------------------------------------------------- |
| points   | Array    | 是   | 要显示在可视区域内的坐标点数组，`[{latitude, longitude， coordType}]` |
| padding  | String   | 否   | 坐标点形成的最小矩形区域距离边缘的最小距离，支持 1-4 个参数，单位：px |
| success  | Function | 否   | 接口调用成功的回调函数                                                |
| fail     | Function | 否   | 接口调用失败的回调函数                                                |
| complete | Function | 否   | 接口调用结束的回调函数                                                |

### getRegion 的 OBJECT 参数列表

| 参数     | 类型     | 必填 | 说明                                                                            |
| -------- | -------- | ---- | ------------------------------------------------------------------------------- |
| success  | Function | 否   | 接口调用成功的回调函数， `res = {southwest, northeast}`，西南角与东北角的经纬度 |
| fail     | Function | 否   | 接口调用失败的回调函数                                                          |
| complete | Function | 否   | 接口调用结束的回调函数                                                          |

### getScale 的 OBJECT 参数列表

| 参数     | 类型     | 必填 | 说明                                    |
| -------- | -------- | ---- | --------------------------------------- |
| success  | Function | 否   | 接口调用成功的回调函数，`res = {scale}` |
| fail     | Function | 否   | 接口调用失败的回调函数                  |
| complete | Function | 否   | 接口调用结束的回调函数                  |

### getSupportedCoordTypes 的 OBJECT 参数列表

| 参数     | 类型     | 必填 | 说明                                                                     |
| -------- | -------- | ---- | ------------------------------------------------------------------------ |
| success  | Function | 否   | 接口调用成功的回调函数，`res = coordTypes:[coordType1, coordType2, ...]` |
| fail     | Function | 否   | 接口调用失败的回调函数                                                   |
| complete | Function | 否   | 接口调用结束的回调函数                                                   |

### getCoordType 的 OBJECT 参数列表

| 参数      | 类型       | 必填 | 说明                                                                                                                                      |
| --------- | ---------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| latitude  | `<number>` | 否   | 坐标点的纬度                                                                                                                              |
| longitude | `<number>` | 否   | 坐标点的经度                                                                                                                              |
| coordType | `<string>` | 否   | 坐标点的坐标系                                                                                                                            |
| success   | Function   | 否   | 接口调用成功的回调函数，`res = {coordType}`，coordType 可选值可通过 getSupportedCoordTypes 获取，如果坐标点缺省，则默认屏幕中心点为坐标点 |
| fail      | Function   | 否   | 接口调用失败的回调函数                                                                                                                    |
| complete  | Function   | 否   | 接口调用结束的回调函数                                                                                                                    |

### convertCoord 的 OBJECT 参数列表

| 参数      | 类型       | 必填 | 说明                                                                                         |
| --------- | ---------- | ---- | -------------------------------------------------------------------------------------------- |
| from      | `<string>` | 否   | 输入坐标当前的坐标系，可选值可通过 getSupportedCoordTypes 获取，当前只支持 wgs84             |
| to        | `<string>` | 否   | 输入坐标需要转换输出的坐标系，可选值可通过 getSupportedCoordTypes 获取，默认为当前地图坐标系 |
| latitude  | `<number>` | 是   | 需要转换的坐标纬度                                                                           |
| longitude | `<number>` | 是   | 需要转换的坐标经度                                                                           |
| success   | Function   | 否   | 接口调用成功的回调函数，`res = {latitude， longitude}`                                       |
| fail      | Function   | 否   | 接口调用失败的回调函数                                                                       |
| complete  | Function   | 否   | 接口调用结束的回调函数                                                                       |

### setCompassPosition 的 OBJECT 参数列表

| 参数 | 类型       | 必填 | 说明                                         |
| ---- | ---------- | ---- | -------------------------------------------- |
| x    | `<length>` | 是   | 指南针控件相对于地图左侧的横向距离，例如：50px |
| y    | `<length>` | 是   | 指南针控件相对于地图上侧的纵向距离，例如：50px |

### setScalePosition 的 OBJECT 参数列表

| 参数 | 类型       | 必填 | 说明                                         |
| ---- | ---------- | ---- | -------------------------------------------- |
| x    | `<length>` | 是   | 比例尺控件相对于地图左侧的横向距离，例如：50px |
| y    | `<length>` | 是   | 比例尺控件相对于地图上侧的纵向距离，例如：50px |

### setZoomPosition 的 OBJECT 参数列表

| 参数 | 类型       | 必填 | 说明                                           |
| ---- | ---------- | ---- | ---------------------------------------------- |
| x    | `<length>` | 是   | 放大缩小控件相对于地图左侧的横向距离，例如：50px |
| y    | `<length>` | 是   | 放大缩小控件相对于地图上侧的纵向距离，例如：50px |

### setMaxAndMinScaleLevel 的 OBJECT 参数列表

| 参数     | 类型       | 必填 | 说明     |
| -------- | ---------- | ---- | -------- |
| maxLevel | `<number>` | 是   | 最大倍数 |
| minLevel | `<number>` | 是   | 最小倍数 |

## map &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/thirdParty/map/index.ux)

## 支持明细

| 厂商       |  支持   | 备注 |
| ---------- | :-----: | ---- |
| 小米       | `1020+` | -    |
| 中兴       | `1020+` | -    |
| 华为       | `1030+` | -    |
| 金立       | `1020+` | -    |
| 联想       | `1020+` | -    |
| 魅族       | `1020+` | -    |
| 努比亚     | `1020+` | -    |
| OPPO       | `1020+` | -    |
| vivo       | `1020+` | -    |
| 一加       |    -    | -    |
| **预览版** | `1020+` | -    |
