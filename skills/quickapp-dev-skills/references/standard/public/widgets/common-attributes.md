# 通用属性

通用属性，即所有组件都支持的属性。

开发者可以在所有的组件标签上都使用`通用属性`

## 示例代码

```html
<template>
  <div>
      <text id="text1" class="text-normal">line 1</text>
      <text id="text2" class="text-normal red">line 2</text>
  </div>
</template>
```

## 常规属性

| 名称              | 类型        | 默认值 | 描述                                                                                              |
| ----------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------- |
| id                | `<string>`  | -      | 唯一标识                                                                                          |
| style             | `<string>`  | -      | 样式声明                                                                                          |
| class             | `<string>`  | -      | 引用样式表                                                                                        |
| disabled          | `<boolean>` | false  | 表明当前组件是否可用                                                                              |
| aria-label        | `<string>`  | -      | 当前元素的标签描述，接受字符串作为参数                                                            |
| aria-unfocusable  | `<boolean>` | false  | 无障碍模式下是否能够获取焦点, 设置 true 时, 该组件 aria-label 属性在无障碍模式下不会生效          |
| forcedark `1070+` | `<boolean>` | true   | `组件级别`的夜间模式自动反色开关（仅 Android 10+系统支持），非必填，默认值为 true（开启自动反色） |
| autofocus `1100+` | `<boolean>` | false   | 默认获取焦点，一个页面存在多个组件配置autofocus时，会以最后一个组件的autofocus生效。 |
| overflow `1100+` | `<string>` | hidden   | 子节点是否能够超出父节点显示，不会被父节点裁剪，可选值[visible, hidden], visible表示子节点可以超过父节点显示，hidden表示子节点超出父节点，会被裁剪 |

forcedark 参数注意事项：

1.常规属性的`forcedark`参数为全小写，与`manifest.json`的`forceDark`参数为驼峰命名法不一样。

2.`video`、`camera`、`map`、`custommarker`组件均不支持设置`forcedark`参数，也不会响应父元素的`forcedark`设置

3.span 组件不支持`forcedark`开关，它只能依赖父元素的`forcedark`参数值控制开关，并且当父元素为 span 的时候，继续往上找，直至找到父元素为`a`或`text`元素截止

## 渲染属性

| 名称 | 类型        | 默认值 | 描述                                                                             |
| ---- | ----------- | ------ | -------------------------------------------------------------------------------- |
| for  | `<array>`   | -      | 根据数据列表，循环展开当前标签                                                   |
| if   | `<boolean>` | -      | 根据数据 boolean 值，添加或移除当前标签                                          |
| show | `<boolean>` | -      | 根据数据 boolean 值，显示或隐藏当前标签，相当于控制{ display: flex &#124; none } |

渲染属性工作方式详见[template 模板](../framework/template.md)

注意：属性和样式不能混用，不能在属性字段中进行样式设置

## data 属性 `1050+`

给组件绑定 data 属性，然后运行时通过 `dataset` 获取，方便进一步判断

**示例：**

```html
<template>
  <div>
    <div id="elNode1" data-person-name="Jack"></div>
  </div>
</template>

<script>
  export default {
    onReady () {
      const el = this.$element('elNode1')
      const elData = el.dataset.personName
      console.info(`输出data属性： ${elData}`)
    }
  }
</script>
```
