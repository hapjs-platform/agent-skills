# style 样式

用于描述 template 模板的组件样式，决定组件应该如何显示

样式布局采用 CSS Flexbox（弹性盒）样式，针对部分原生组件，对 CSS 进行了少量的扩充以及修改

为了解决屏幕适配问题，所有与大小相关的样式（例如 width、font-size）均以基准宽度（默认 750px）为基础，根据实际屏幕宽度进行缩放，例如 width:100px，在 1500px 宽度屏幕上，width 实际上为 200px

## 文件导入

支持 2 种导入外部文件的方式

```html
<!-- 导入外部文件, 代替style内部样式 -->
<style src="./style.css"></style>

<!-- 合并外部文件 -->
<style>
  @import './style.css';
  .a {
  }
</style>
```

## 模板内部样式

支持使用 style、class 属性来控制组件的样式

```html
<!-- 内联inline -->
<div style="color:red; margin: 10px;"/>
<!-- class声明 -->
<div class="normal append"/>
```

## 选择器

支持的选择器有：

| 选择器         | 样例             | 样例描述                                                  |
| -------------- | ---------------- | --------------------------------------------------------- |
| .class         | .intro           | 选择所有拥有 class="intro" 的组件                         |
| \#id           | \#firstname      | 选择拥有 id="firstname" 的组件                            |
| tag            | div              | 选择所有 div 组件                                         |
| ,              | .a, .b           | 选择所有 class=“.a” 以及 class=“.b”的组件                 |
| #id .class tag | .page .body text | 支持 id,class,tag 的后代选择器，也可以使用">"表示直接后代 |

```html
<style>
  /* 单个选择器 */
  text {
  }
  .class-abc {
  }
  #idAbc {
  }
  /* 后代选择 */
  .doc-page #testTag div text {
  }
  .doc-page #test-class .class1 {
  }
  .doc-page #testId #testIdId1 {
  }
  /* 直接后代选择 */
  .doc-page #testTag .flex-column > text {
  }
  /* 同一样式适应多个选择器 */
  .font-text, .font-comma {
  }
</style>
```

注意，选择器声明的变化可能会导致元素重新绘制。为了减少选择器变化引起的 DOM 更新数量，**当前只支持：CSS 声明的多个选择器中最后一个规则的变更对 DOM 的更新**

```html
<template>
  <div class="{{docBody}}">
    <text class="{{rowDesc}}">描述内容</text>
  </div>
</template>

<style>
  .doc-body .row-desc1 {
    color: #ff0000;
  }
  .doc-body .row-desc2 {
    color: #0000ff;
  }
  .doc-body2 .row-desc1 {
    color: #00ff00;
  }
</style>

<script>
  export default {
    // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
    private: {
      rowDesc: 'row-desc1',
      docBody: 'doc-body'
    }
  }
</script>
```

以上的代码示例，当我们把`rowDesc变量`从`row-desc1`变为`row-desc2`时是通知 Native 更新节点样式，但是如果把`docBody变量`从`doc-body`变为`doc-body2`，是不会通知 DOM 更新的。

因为`doc-body`不是最后一个选择器，非末尾的选择器变更有可能影响很多 DOM 元素，从而影响到渲染性能

## 选择器优先级

当前样式的选择器的优先级计算保持与浏览器一致，是浏览器 CSS 渲染的一个子集（仅支持：inline, id, class, tag, 后代，直接后代）

多条 CSS 声明可以匹配到同一个元素 如 div，应用在该元素上的 CSS 声明总体优先级是：inline > #id > .class > tag，这四大类匹配到该元素的多个 CSS 声明，如：`#page .class-div`和`.page .class-div`，其优先级按照各选择器的权值高低之和来比较

- `ID选择器`（例如: #hello）的权值为 10000

- `类选择器`（例如: .example）的权值为 100

- `类型选择器`（例如: h1）的权值为 1

css 的优先级计算文档也可以查看[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)入门

那么以下 CSS 声明计算的权值为：

- `#page`的权值为：10000

- `#page .class-div`的权值为：10100

- `#page .class-div text`的权值为 10101

- `#page #body .container div text`的权值为：20102

因此：

- `#page .class-div`和`.page .class-div`比较，权值不一样，权值高优先级高；如果权值相同，则按照声明顺序：后者覆盖前者

## 媒体查询 `1070+`

快应用从`1070`版本开始支持`媒体查询`能力。通过`媒体查询`(media query)，开发者可以根据各种设备特征和参数的值或者是否存在来调整快应用的样式。

媒体查询是`响应式设计`的一部分。在快应用中，和 css 类似，可使用 @media at-rule 根据媒体查询的结果，有条件地应用样式表的一部分；也可使用 @import 有条件地应用整个样式表。

开发者也可以参考[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)入门，但是请注意，快应用支持的`媒体类型`和`媒体特性`是 web css 的子集，并没有提供完全支持，详情请参阅下面的文档。

注意：`媒体查询`除了需要快应用平台版本在`1070`以上，也需要快应用打包工具 hap-toolkit 的版本号在`0.6.15`版本以上。（可通过命令`hap -v`查看)

### 示例代码：

```css
.box {
  width: 100px;
  height: 100px;
  background-color: black;
}

@media (orientation: landscape) {
  .box {
    background-color: white;
  }
}
```

### 语法：

每条`媒体查询`语句都由一个可选的`媒体类型`和任意数量的`媒体特性`表达式构成。可以使用多种逻辑操作符合并多条媒体查询语句。媒体查询语句不区分大小写。

当`媒体类型`（如果指定）与在其上显示文档的设备匹配并且所有`媒体特性`表达式都计算为`true`时，媒体查询将计算为`true`。 涉及未知媒体类型的查询总是 false 的。

有两种方法可以执行`媒体查询`:

#### @media 方式引入媒体查询:

```css
@media [media type] [and|not|only] [(media feature)] {
    CSS-Code;
}
```

**举例：**

-     `@media (max-width: 30) { ... }`  // level3的写法。

-     `@media (width <= 30) { ... }`       // level4的写法，比level3更清晰简洁。

-     `@media screen and (min-width: 400) and (max-width: 700) { ... }` // 多条件写法。

-     `@media (400 <= width <= 700) { ... }` // 多条件level4写法。

#### @import 方式引入媒体查询

```css
@import './css_file_name.css' [media type] [and|not|only] [(media feature) ];
```

**举例：**

- `@import './style.css' screen and (min-width: 400) and (max-width: 700);` // 多条件写法

### 媒体类型：

`媒体类型`（Media types）描述设备的类别。除了在使用 not 或 only 逻辑操作符必须一并填上`媒体类型`;其他时候，媒体类型是可选择是否填入的。

目前快应用支持的`媒体类型`如下：

| 媒体类型 |      简介      |
| :------: | :------------: |
|  screen  | 主要用于屏幕。 |

### 媒体特性：

`媒体特性`（Media features）描述了输出设备，或是浏览环境的具体特征。媒体特性表达式是完全可选的，它负责测试这些特性或特征是否存在、值为多少。

每条媒体特性表达式都必须用`括号`括起来。

目前快应用支持的`媒体特性`如下：

|         类型         |                                              描述                                              | 查询时是否需带单位 | 支持单位 |
| :------------------: | :--------------------------------------------------------------------------------------------: | :----------------: | :------: |
|        height        |                                定义输出设备中的页面可视区域高度                                |         否         |    dp    |
|      min-height      |                              定义输出设备中的页面可视区域最小高度                              |         否         |    dp    |
|      max-height      |                              定义输出设备中的页面可视区域最大高度                              |         否         |    dp    |
|        width         |                                定义输出设备中的页面可视区域宽度                                |         否         |    dp    |
|      min-width       |                              定义输出设备中的页面可视区域最小宽度                              |         否         |    dp    |
|      max-width       |                              定义输出设备中的页面可视区域最大宽度                              |         否         |    dp    |
|      resolution      |                                      定义输出设备的分辨率                                      |         是         | dppx,dpi |
|    min-resolution    |                                    定义输出设备的最小分辨率                                    |         是         | dppx,dpi |
|    max-resolution    |                                    定义输出设备的最大分辨率                                    |         是         | dppx,dpi |
|     orientation      |      定义屏幕处于横屏模式还是竖屏模式，支持属性：`portrait`（竖屏）、`landscape`（横屏）       |         否         |    无    |
|     aspect-ratio     |         定义输出设备中的页面可见区域宽高比，比例值需要按照`x / y`的格式，例如 `1 / 2`          |         否         |    无    |
|   min-aspect-ratio   |                      定义输出设备中的页面可见区域最小宽高比，参数要求同上                      |         否         |    无    |
|   max-aspect-ratio   |                      定义输出设备中的页面可见区域最大宽高比，参数要求同上                      |         否         |    无    |
| prefers-color-scheme | 检测用户的系统主题，仅在 Android 10+系统生效。支持属性：`light`(日间模式）、`dark`（夜间模式） |         否         |    无    |

#### 注意：

1.dppx 的值对应的是快应用的`device`接口的`getInfo`方法返回值的`screenDensity`值，也与浏览器里 BOM API 的 Window.devicePixelRatio
值一样,详情请查阅[快应用文档](https://doc.quickapp.cn/features/system/device.html?h=screendensity)或[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resolution)

举例：一台安卓物理分辨率为 1920\*1080 的手机，screenDensity = 3，所以此设备满足`(resolution: 3dppx)`的查询条件

2.dpi 的值= 160 \* dppx 的值，dppx 值计算可参考第 1 条规则。

举例：一台安卓物理分辨率为 1920*1080 的手机，screenDensity = 3，此设备的 dpi 值 = 160 * 3 = 480，所以此设备满足`(resolution: 480dpi)`的查询条件

3.在`媒体特性`列表中，标记了"查询时不带单位"的`媒体特性`,如 width、height 的查询，都不带长度单位，且长度单位只能为`dp`

dp 数值 = 物理分辨率 / screenDensity

举例：一台安卓物理分辨率为 1920\*1080 的手机，screenDensity = 3，屏幕宽度 = 1080 像素 = 360dp，所以此设备满足`(width:360)`的查询条件

4.`媒体特性`里，`页面可视区域`的意思是整个屏幕去掉通知栏、标题栏等其他非快应用前端可以控制布局渲染的区域。其宽高值都可以用快应用的`device`接口的`getInfo`获取，以下是示例代码：

```html
<script>
import device from "@system.device";
export default {
  onReady() {
    device.getInfo({
      success: function(result) {
        let { windowWidth = 0, windowHeight = 0, screenDensity = 0 } = result;
        console.log(`像素密度（同样也是dppx的值）: ${screenDensity}`);
        console.log(`可视区域宽度（物理分辨率）: ${windowWidth}`);
        console.log(`可视区域高度（物理分辨率）: ${windowHeight}`);
        console.log(`可视区域宽度（dp单位）: ${windowWidth / screenDensity}`);
        console.log(`可视区域高度（dp单位）: ${windowHeight / screenDensity}`);
        console.log(`设备dpi值: ${screenDensity * 160}`);
      }
    });
  }
};
</script>
```

### 逻辑操作符：

开发者可以使用`逻辑操作符`组合多个`媒体特性`的查询条件，编写复杂的`媒体查询`。

|     类型      |                                                                                                                                                    描述                                                                                                                                                    |
| :-----------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|      and      |                                                                                                   and 运算符用于将多个媒体特性组合到一个单独的媒体查询中，要求每个链接的特性返回 true，则此时查询为真。                                                                                                    |
|      not      | not 运算符用于否定媒体查询，如果查询不返回 false，则返回 true。如果出现在逗号分隔的列表中，它只会否定应用它的特定查询。如果使用 not 运算符，则必须指定显式媒体类型。<br>例如：not screen and (min-width: 400) and (max-width: 700) <br> 注：not 关键字不能用于否定单个功能表达式，它会作用于整个媒体查询。 |
|     only      |                                                       only 运算符仅用于整个查询匹配应用样式, 快应用处理以 only 开头的关键词时将会忽略 only。<br>如果使用 only 运算符，必须指定媒体类型。例如：only screen and (min-width: 400) and (max-width: 700)                                                        |
| ,<br>（逗号） |                                                                       逗号分隔效果等同于 or 逻辑操作符。当使用逗号分隔的媒体查询时，如果任何一个媒体查询返回真，样式就是有效的。<br>例如：(orientation: landscape), (height >= 690)                                                                        |
|      or       |                                                                       or 运算符用于将多个媒体特性比较语句组合到一个媒体查询语句中，只要有其中一条媒体特性比较语句返回 true，查询成立。<br>例如：(min-width: 400) or (max-width: 700)                                                                       |
|      <=       |                                                                                                                                      小于等于。例如： (400 <= width)                                                                                                                                       |
|      >=       |                                                                                                                                      大于等于。例如： (500 >= height)                                                                                                                                      |
|       <       |                                                                                                                                         小于。例如： (400 < width)                                                                                                                                         |
|       >       |                                                                                                                                        大于。例如： (500 > height)                                                                                                                                         |

## 样式预编译

目前快应用支持`less`与`sass`的预编译，具体教程也可以参考[这里](/tutorial/framework/page-style-and-layout.md#%E5%BC%95%E5%85%A5less/scss%E9%A2%84%E7%BC%96%E8%AF%91)

```html
<!--导入外部文件, 代替style内部样式-->
<style lang="less" src="./lessFile.less"></style>

<!--合并外部文件-->
<style lang="less">
  @import './lessFile.less';
  .page-less {
    #testTag {
      .less-font-text, .less-font-comma {
        font-size: 60px;
      }
    }
  }
</style>
```

## 伪类

任何组件中，如果某个属性是 boolean 类型且默认值为 false 时，均可通过该属性名字来声明伪类，当属性变为 true 时伪类生效，例如所有组件的 disabled 属性、input 组件的 checked 属性等

另外部分组件会有其他形式的伪类支持，比如 input 组件可以通过主动调用 focus 方法，或者用户操作获得焦点，使得 focus 伪类生效，详情请参考各组件内部说明

在`1010+`版本上提供了 active 伪类的支持，当用户按下组件时该伪类生效。其中默认可点击的组件（input, a, picker, switch 等）声明即有效，非默认可点击组件（image, text, div, stack 等）声明该伪类后须同时监听 click 事件才有效果

伪类写法举例：

```html
<template>
  <div class="doc-page">
    <input type="button" class="btn" disabled="{{btndisabled}}" value="Click" onclick="btnClick" />
  </div>
</template>

<style>
  .doc-page {
    flex: 1;
    align-items: center;
    justify-content: center;
  }
  .btn {
    width: 360px;
    height: 120px;
    background-color: red;
  }
  .btn:disabled{
    background-color: green;
  }
</style>

<script>
  export default {
    data: {
      btndisabled: false
    },
    btnClick () {
      this.btndisabled = true
    }
  }
  </script>
```

当组件的 disabled 属性变为 true 时，disabled 伪类的样式生效，叠加到原有样式上，例子中 background-color 会从红色变成绿色
