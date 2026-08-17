# shortcut-button `1100+`

## 概述

添桌按钮组件。

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

| 名称  | 类型       | 默认值 | 必填 | 描述               |
| ----- | ---------- | ------ | ---- | ------------------ |
| value | `<string>` | -      | 否   | 添桌按钮组件的文本 |

## 样式

支持[通用样式](common-styles.md)

| 名称      | 类型                        | 默认值              | 必填 | 描述     |
| --------- | --------------------------- | ------------------- | ---- | -------- |
| color     | `<color>`                   | rgba(0, 0, 0, 0.87) | 否   | 文本颜色 |
| font-size | `<length>`                  | 37.5px              | 否   | 文本尺寸 |
| width     | `<length>` | 128px | 否              | 组件宽度 |
| height    | `<length>` | 70px | 否               | 组件高度 |

## 

支持[通用方法](common-methods.md)

## 事件

支持[通用事件](common-events.md)

| 名称  | 参数                                                         | 描述                                                         |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| click | MouseEvent `1050+`，{eventStatusCode: eventStatusCodeValue, eventMessage: eventMessageValue} `1100+` | 组件被点击时触发<br />eventStatusCode: 添桌操作返回码，0 成功，200 失败 <br />eventMessage: 详细信息 |

## 示例代码

```xml
<shortcut-button
      class="shortcut-button"
      value="添加至桌面"
      onclick="click()"
    ></shortcut-button>
```

