# richtext

## 概述

富文本容器

文本内容直接写在标签内容区，内容格式需与 type 相匹配，只支持静态内容，由于需要实时编译，文本内容尽量不要频繁改变，否则可能导致性能问题

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称   | 类型 | 默认值 | 必填 | 描述                              |
| ----  | ---- | ------ | ---- | --------------------------------- |
| type  | html | -      | 是   | 按照传统 WEB 页面的方式进行渲染 |
| scene | book | -      | 否   | 可实现图文翻页效果             |

## 样式

支持[`<div>样式`](div.md)，height 样式设置无效

支持[通用样式](common-styles.md)

## 事件

支持[通用事件](common-events.md)

| 名称     | 参数 | 描述  |
| ---- | ---- | ---- |
| start `1070+`      | - | 开始加载时触发 |
| complete `1070+`   | - | 加载完成时触发 |
| pagechanged `1100+`| {curpage: `<number>`, totalpage: `<number>`} | 页面翻页后返回当前页数和总页数 |
| splitpage   `1100+`| {totalpage: `<number>`}                      | 加载内容完成后返回总页数      |

## 方法

| 名称       | 参数                           | 描述                     |
| -------    | ----------------------------- | ------------------------ |
| addContent `1100+` | {value: `<string>`, index: `<number>`} | 需要在指定页面加载的内容 |

## richtext &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/container/richtext/index.ux)
