# textarea

## 概述

提供可交互的界面，接收用户的输入，默认为多行

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称              | 类型       | 默认值 | 必填 | 描述                             |
| ----------------- | ---------- | ------ | ---- | -------------------------------- |
| placeholder       | `<string>` | -      | 否   | 提示文本的内容                   |
| maxlength `1010+` | `<number>` | -      | 否   | 组件可接收用户输入字符的最大长度 |

## 样式

支持[通用样式](common-styles.md)

| 名称              | 类型       | 默认值              | 必填 | 描述           |
| ----------------- | ---------- | ------------------- | ---- | -------------- |
| color             | `<color>`  | rgba(0, 0, 0, 0.87) | 否   | 文本颜色       |
| font-size         | `<length>` | 37.5px              | 否   | 文本尺寸       |
| placeholder-color | `<color>`  | rgba(0, 0, 0, 0.38) | 否   | 提示文本的颜色 |
| caret-color `1060+`| `<color>`  &#124; auto &#124; transparent | auto | 否   | 光标颜色，默认值为auto，与文本颜色一致 |

## 事件

支持[通用事件](common-events.md)

| 名称                    | 参数           | 描述                         |
| ----------------------- | -------------- | ---------------------------- |
| change                  | {text:newText} | 输入内容发生变化时触发       |
| selectionchange `1030+` | -              | 选中文本改变和光标移动时触发 |
| linechange `1060+`                 | {height: `<number>`, lineCount: `<number>`} | 输入框行数变化时调用，height为当前输入框高度，lineCount为当前文本行数       |

## 方法

| 名称                      | 参数                                                     | 描述                                                          |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------------------- |
| focus                     | {focus:true&#124;false}，focus 不传默认为 true           | 使组件获得或者失去焦点，可触发 focus 伪类，可弹出或收起输入法 |
| select `1010+`            | -                                                        | 选中文本框的全部文本                                          |
| setSelectionRange `1010+` | {start: `<number>`, end: `<number>`}                     | 设置文本框的选中区域                                          |
| getSelectionRange `1010+` | {callback: Function(start: `<number>`, end: `<number>`)} | 获取文本的选中区域                                            |

## textarea &nbsp; 示例代码

``` html
<template>
    <div style="flex-direction:column;">
        <textarea onchange="change">{{name}}</textarea>
        <input type="button" value="click" onclick="handle" ></input>
    </div>
</template>

<script>
  export default {
    private: {
      name:'my'
    },
    handle(){
      console.log(this.name)
    },
    change(e){
      this.name = e.text
      //console.log(e)
    },
  }
</script>
```
**注意**
> `textarea`手动赋值，请采用

```html
<textarea>{{name}}</textarea>
```
在ide中可能会存在警告，请暂时忽略该警告，后期我们会改善。

> 快应用目前采用数据单向流，需要监听`textarea`的`chagne`事件，手动给`name`赋值。

更多详细示例，请查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/form/textarea/index.ux)
