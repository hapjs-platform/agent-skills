# text

## 概述

文本

文本内容写在标签内容区，支持转义字符`"\"`

## 子组件

支持[`<a>`](a.md)与[`<span>`](span.md)，`1100+`版本支持[`<image>`](image.md#作为text、span、a的子组件使用)

## 属性

支持[通用属性](common-attributes.md)

## 样式

支持[通用样式](common-styles.md)

| 名称                   | 类型                                                                      | 默认值              | 必填 | 描述                                                                                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------- | ------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lines                  | `<number>`                                                                | -1                  | 否   | 文本行数，-1 代表不限定行数                                                                                                                                                   |
| color                  | `<color>`                                                                 | rgba(0, 0, 0, 0.54) | 否   | 文本颜色                                                                                                                                                                      |
| font-size              | `<length>`                                                                | 30px                | 否   | 文本尺寸                                                                                                                                                                      |
| font-style             | normal &#124; italic                                                      | normal              | 否   |                                                                                                                                                                               |
| font-weight            | normal &#124; bold &#124; lighter &#124; border &#124; `<number>` `1050+` | normal              | 否   | 当前平台仅支持`normal`与`bold`两种效果，当值为数字时，低于`550`为前者，否则为后者。                                                                                           |
| font-family `1030+`    | `<string>`                                                                | -                   | 否   | 文本字体。可设置一个有先后顺序的，由字体名或者字体族名组成的列表，以逗号分隔。列表中第一个已安装或者通过 [font-face](font-face-style.md) 指定的字体，会被选中作为文本的字体。 |
| text-decoration        | underline &#124; line-through &#124; none                                 | none                | 否   |                                                                                                                                                                               |
| text-align             | left &#124; center &#124; right                                           | left                | 否   |                                                                                                                                                                               |
| text-indent `1040+`    | `<length>` &#124; `<percentage>` &#124; `<cm>` &#124; `<em>`              | -                   | 否   | 规定文本块首行的缩进                                                                                                                                                          |
| line-height            | `<length>`                                                                | -                   | 否   | 文本行高                                                                                                                                                                      |
| text-overflow          | clip &#124; ellipsis                                                      | clip                | 否   | 在设置了行数的情况下生效                                                                                                                                                      |
| letter-spacing `1100+` | normal &#124; `<length>`                                                  | normal              | 否   | 字间距                                                                                                                                                                        |

**示例**

- 单行省略

```css
 {
  lines: 1;
  text-overflow: ellipsis;
}
```

- 多行省略，以两行为例

```css
 {
  lines: 2;
  text-overflow: ellipsis;
}
```

## 事件

支持[通用事件](common-events.md)

## text &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/basic/text/index.ux)
