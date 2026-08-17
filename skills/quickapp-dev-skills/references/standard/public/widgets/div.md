# div

## 概述

基本容器

## 子组件

支持

## 属性

支持[通用属性](common-attributes.md)

| 名称                                   | 类型    | 默认值 | 必填 | 描述                                                                                                                                              |
| -------------------------------------- | ------- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| enablevideofullscreencontainer `1080+` | boolean | false  | 否   | 若 video 组件的直接父组件为 div 组件，且其`enablevideofullscreencontainer`值为 true，则开启全屏显示自定义组件特性。默认值为 false，特性为关闭状态 |

## 样式

支持[通用样式](common-styles.md)

| 名称               | 类型                                                                                             | 默认值     | 必填 | 描述 |
| ------------------ | ------------------------------------------------------------------------------------------------ | ---------- | ---- | ---- |
| flex-direction     | column &#124; row &#124; column-reverse `1040+` &#124; row-reverse `1040+`                       | row        | 否   | -    |
| flex-wrap          | nowrap &#124; wrap &#124; wrap-reverse                                                           | nowrap     | 否   | -    |
| justify-content    | flex-start &#124; flex-end &#124; center &#124; space-between &#124; space-around                | flex-start | 否   | -    |
| align-items        | stretch &#124; flex-start &#124; flex-end &#124; center                                          | stretch    | 否   | -    |
| align-content      | stretch &#124; flex-start &#124; flex-end &#124; center &#124; space-between &#124; space-around | stretch    | 否   | -    |
| align-self `1010+` | auto &#124; stretch &#124; flex-start &#124; flex-end &#124; center &#124; baseline              | auto       | 否   | -    |

## 事件

支持[通用事件](common-events.md)

## div &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/div/index.ux)
