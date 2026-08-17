# input

## 概述

提供可交互的界面，接收用户的输入，默认为单行

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称                 | 类型                                                                                                               | 默认值  | 必填 | 描述                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ------- | ---- | --------------------------------------------------------------------- |
| type                 | button &#124; checkbox &#124; radio &#124; text &#124; email &#124; date &#124; time &#124; number &#124; password &#124; tel`1050+` | text    | 否   | 支持动态修改 `1030+`                                                  |
| checked              | `<boolean>`                                                                                                        | false   | 否   | 当前组件的 checked 状态，可触发 checked 伪类，type 为 checkbox 时生效 |
| name                 | `<string>`                                                                                                         | -       | 否   | input 组件名称                                                        |
| value                | `<string>`                                                                                                         | -       | 否   | input 组件的值                                                        |
| placeholder          | `<string>`                                                                                                         | -       | 否   | 提示文本的内容，type 为 text&#124;email&#124;date&#124;time 时生效    |
| maxlength `1010+`    | `<number>`                                                                                                         | -       | 否   | 组件可接收用户输入字符的最大长度                                      |
| enterkeytype `1010+` | default &#124; send &#124; search &#124; next &#124; go &#124; done &#124;                                         | default | 否   | 设置软键盘 Enter 按钮的显示文本或图标．                               |
| autocomplete `1050+` | on &#124; off                                                                                                      | on      | 否   | 是否开启自动提示功能，当 type 为 tel 时生效                             |

## 样式

支持[通用样式](common-styles.md)

| 名称              | 类型                             | 默认值              | 必填 | 描述                                                               |
| ----------------- | -------------------------------- | ------------------- | ---- | ------------------------------------------------------------------ |
| color             | `<color>`                        | rgba(0, 0, 0, 0.87) | 否   | 文本颜色                                                           |
| font-size         | `<length>`                       | 37.5px              | 否   | 文本尺寸                                                           |
| placeholder-color | `<color>`                        | rgba(0, 0, 0, 0.38) | 否   | 提示文本的颜色，type 为 text&#124;email&#124;date&#124;time 时生效 |
| width             | `<length>` &#124; `<percentage>` | -                   | 否   | type 为 button 时，默认值为 128px                                  |
| height            | `<length>` &#124; `<percentage>` | -                   | 否   | type 为 button 时，默认值为 70px                                   |
| caret-color `1060+`| `<color>`  &#124; auto &#124; transparent | auto | 否   | 光标颜色，默认值为auto，与文本颜色一致 |

## 事件

支持[通用事件](common-events.md)

| 名称                     | 参数                                       | 描述                                                          |
| ----------------------- | ------------------------------------------ | ------------------------------------------------------------ |
| change                  | 不同 type 参数不同，具体见下方 change 事件参数  | input 组件的值、状态发生改变时触发, type 为 button 时无 change 事件 |
| enterkeyclick `1010+`   | {value：valueString}，value 为用户输入的值    | 软键盘 Enter 键点击事件                                         |
| selectionchange `1030+` | -                                          | 选中文本改变和光标移动时触发                                      |

### change 事件参数

| 参数               | text &#124; email &#124; date &#124; time &#124; number &#124; password | checkbox | radio | 备注            |
| ----------------- | ------------------------------------------------------------------------ | -------- | ----- | --------------- |
| name              |                                                                          | √        | √     |                 |
| value             | √                                                                        | √        | √     |                 |
| checked           |                                                                          | √        |       |                 |
| text `deprecated` | √                                                                        | √        |       | 使用 value 代替  |

## 方法

| 名称                      | 参数                                                     | 描述                                                                                                                                    |
| ------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| focus                     | {focus:true&#124;false}，focus 不传默认为 true           | 使组件获得或者失去焦点，可触发 focus 伪类，type 为 text&#124;email&#124;date&#124;time&#124;number&#124;password 时，可弹出或收起输入法 |
| select `1010+`            | -                                                        | 选中文本框的全部文本                                                                                                                    |
| setSelectionRange `1010+` | {start: `<number>`, end: `<number>`}                     | 设置文本框的选中区域                                                                                                                    |
| getSelectionRange `1010+` | {callback: Function(start: `<number>`, end: `<number>`)} | 获取文本的选中区域                                                                                                                      |

## input &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/form/input/index.ux)
