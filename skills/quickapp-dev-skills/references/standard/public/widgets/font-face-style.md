# 自定义字体样式 `1030+`

`font-face` 用于定义字体样式。当需要为文本组件设置自定义字体时，可以在 `style` 中定义 `font-face` 作为自定义字体，然后在 `font-family` 中可以引用该字体。

自定义字体可以是从项目中的字体文件或网络字体文件中加载的字体。

注：
只支持 ttf 和 otf 格式的字体。

## 定义 font-face

```css
@font-face {
  font-family: myfont;
  src: url('http://www.example.com/myfont.ttf');
}
```

### font-family

自定义字体的名称。

### src

自定义字体的来源。

目前支持的字体来源有 3 种：

- 项目中的字体文件: 通过 `url` 指定项目中的字体文件路径(只支持绝对路径)
- 网络字体文件：通过 `url` 指定网络字体的地址
- 系统字体：通过 `local` 指定系统字体名称  `1100+`

## 使用 font-face

在 `style` 中定义了 `font-face` 后，我们可以在文本组件的 `font-family` 样式中指定 `font-face` 的名称，该组件即可应用 `font-face` 定义的字体。
`font-face` 中暂不支持设置多个 `src` 。

### 示例

```html
<template>
  <!-- template里只能有一个根节点 -->
  <div class="demo-page">
    <text class="font">测试自定义字体 test custom font</text>
  </div>
</template>

<style>
  @font-face {
    font-family: myfont;
    src: url("http://www.example.com/myfont.ttf");
  }
  .demo-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .font {
    font-family: myfont, serif;
  }
</style>
```

## 图标字体(icon-font)

将图标制作成字体文件，保存到项目文件中（如:src/Common/iconfont.ttf），在 `style` 中定义一个 `font-face` ，然后在需要使用图标字体的地方使用该`font-face` 作为组件的字体，组件的内容为字体文件中我们需要使用的图标的字符。

### 示例

```html
<template>
  <!-- template里只能有一个根节点 -->
  <div class="demo-page">
    <text>测试text中嵌套iconfont<span class="icon-font-span">&#xe822;</span>test icon font</text>
  </div>
</template>

<style>
  @font-face {
    font-family: iconfont;
    src: url("/Common/iconfont.ttf");
  }
  .demo-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .icon-font-span {
    font-family: iconfont;
    font-size: 40px;
    color: #ff0000;
  }
</style>
```

## font-family &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/style/font-family/index.ux)
