# slide-view `1090+`

## 概述

侧滑操作容器

## 子组件

支持

支持的子组件与[`<div>`](div.md)组件相同

## 属性

支持[通用属性](common-attributes.md)

|名称|类型|默认值|必填|描述|
| ---- | ---- | ---- | ---- | ---- |
|edge|`left` &#124; `right`|right|否|按钮组区域位于哪一侧|
|enableslide|`<boolean>`|true|否|是否允许侧滑|
|isopen|`<boolean>`|false|否|按钮区域是否打开|
|layer|`same` &#124; `above`|above|否|按钮组与主体的层级关系，same表示按钮组与主体处于同一层，above表示主体覆盖在按钮组之上|
|buttons|`<array>`|- |是|按钮组，不超过三个，超出时仅显示前三个，且总宽度限制为不超过侧滑操作容器宽度的2/3|

## 子属性

buttons

|名称|类型|默认值|必填|描述|
| ---- | ---- | ---- | ---- | ---- |
|id|`<string>`|- |是|button的id值，buttonClick事件返回的id值|
|buttonWidth|`<length>`|- |否|button的宽度|
|icon|`<uri>`|- |否|button的图标|
|iconWidth|`<length>`|75px|否|图标的宽度|
|iconHeight|`<length>`|75px|否|图标的高度|
|iconBackgroundColor|`<color>`|#F2F2F2|否|icon的圆形背景区域颜色，在backgroundType='icon'时有效|
|text|`<string>`|- |否|button的文字|
|textSize|`<number>`|15px|否|文字大小|
|textColor|`<color>`|#000000|否|文字颜色|
|backgroundColor|`<color>`|#F2F2F2|否|背景颜色|
|backgroundType|`fill` &#124; `icon`|fill|否|背景的样式，fill表示填充全部背景；icon表示为圆形背景区域且仅显示图标，不显示文字|
|secondaryConfirm|`<object>`|- |否|该按钮的二次确认状态，如果为空，则表示没有二次确认状态|

buttons - secondaryConfirm

| 名称      | 类型       | 默认值             | 必填 | 描述               |
| --------- | ---------- | ------------------ | ---- | ------------------ |
| text      | `<string>` | -                  | 是   | 二次确认的文字     |
| textSize  | `<number>` | 15px               | 否   | 二次确认的文字大小 |
| textColor | `<color>`  | 对应button文字颜色 | 否   | 二次确认的文字颜色 |

**注**：

1. button的高度不允许修改，充满整个高度
2. button按照添加顺序从左往右排列
3. backgroundType设置为icon时，按钮样式为圆形背景区域并且只显示icon，不显示文字；设置为fill时，背景色填充整个区域，并且如果设置了icon和text，则icon在上，text在下居中显示，如果仅设置了icon或text其一，则居中显示
4. 如果设置了二次确认，则点击相应按钮会显示出二次确认文本，二次确认的背景色与按钮背景色一致

## 样式

支持[通用样式](common-styles.md)

**注**：

 width、height相关样式无效，使用组件自身内容需要的高度

## 事件

支持[通用事件](common-events.md)

|名称|参数|描述|
| ---- | ---- | ---- |
|open|- |按钮组区域打开时触发|
|close|- |按钮组区域关闭时触发|
|slide|{offset:offsetValue}|按钮组区域滑动时触发，offset表示当前滑动的距离|
|buttonclick|{id:idValue, isSecondaryConfirm:isSecondaryConfirmValue}|按钮组被点击时触发，index表示被点击按钮的序号，isSecondaryConfirm表示是否为二次确认按钮被点击|

## 方法

|名称|参数|描述|
| ---- | ---- | ---- |
|open|Object|打开按钮组区域|
|close|Object|关闭按钮组区域|
|hideSecondaryConfirm|-|隐藏二次确认区域|

open 的参数说明:

|名称|类型|是否必填|默认值|备注|
| ---- | ---- | ---- | ---- | ---- |
|animation|boolean|否|true|是否有打开动画|

close 的参数说明:

|名称|类型|是否必填|默认值|备注|
| ---- | ---- | ---- | ---- | ---- |
|animation|boolean|否|true|是否有关闭动画|

## slide-view &nbsp; 示例代码：

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/extend/slide-view/index.ux)
