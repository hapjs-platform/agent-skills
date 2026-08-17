# 使用 canvas `1020+`

> 了解如何正确使用 canvas 画布，以及通过 canvas 绘制图形及动画。

通过本节，你将学会：

- [创建画布](#创建画布)
- [绘制](#绘制)
- [绘制图形](#绘制图形)
- [控制颜色和样式](#颜色和样式)
- [绘制文字](#绘制文字)
- [使用图片](#使用图片)
- [合成与裁切](#合成与裁切)
- [变形](#变形)
- [状态保存与恢复](#状态保存与恢复)
- [绘制动画](#绘制动画)
- [操作 canvas 像素](#像素操作-1030)

## 创建画布

快应用的 canvas 功能由两部分组成，canvas 组件和渲染脚本。

canvas 组件中，用于绘制图形的部分，称之为 **画布**。

### canvas 组件

和其他组件一样，在快应用 template 中添加即可。同时可为其添加需要的样式。

这里需要注意，与 HTML 中 canvas 不同的是：

- 暂不支持 width、height 属性，尺寸由 style 控制。
- 默认尺寸为 0 x 0。
- 底色默认为白色，background-color 无效。
- 支持 margin 样式，但 padding、border 无效。
- 不能有子节点。
- 获取节点的方式需要采用快应用标准的 `$element` 方法。
- 部分方法与 HTML 中表现有一定差异，可参见 [组件](../../widgets/canvas) 中具体方法下的提示。

### 渲染脚本

单独的 canvas 组件仅仅是一个透明矩形，我们需要通过渲染脚本来进一步操作。

首先通过 `$element` 和 id 来获取 canvas 组件节点，再通过 `getContext` 方法创建 canvas 绘图上下文。

`getContext` 方法的参数目前仅支持 `'2d'`，创建的 canvas 绘图上下文是一个 CanvasRenderingContext2D 对象。

在后续脚本中操作该对象即可绘制图形。

完整示例代码如下：

```html
<template>
  <div class="doc-page">
    <div class="content">
      <canvas class="new-canvas" id="new-canvas"></canvas>
    </div>
  </div>
</template>

<style>
  .content {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .new-canvas {
    height: 380px;
    width: 380px;
  }
</style>

<script>
  export default {
    private: {
      drawComplete: false
    },
    onInit() {
      this.$page.setTitleBar({
        text: 'canvas简单绘制'
      })
    },
    onShow() {
      if (!this.drawComplete) {
        this.drawCanvas()
      }
    },
    drawCanvas() {
      const canvas = this.$element('new-canvas') //获取 canvas 组件
      const ctx = canvas.getContext('2d') //获取 canvas 绘图上下文

      //绘制一个矩形
      ctx.fillStyle = 'rgb(200,0,0)'
      ctx.fillRect(20, 20, 200, 200)

      //绘制另一个矩形
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
      ctx.fillRect(80, 80, 200, 200)

      this.drawComplete = true
    }
  }
</script>
```
**如果你想进入页面即渲染`canvas`，只能在`onShow`中获取`canvas` 组件节点，绘制图形。**

输出效果如图

## 绘制

### 坐标系

开始画图之前，需要了解一下画布的坐标系。

如下图所示，坐标系原点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。x 轴向右递增，y 轴向下递增。

### 填充绘制（fill）

canvas 绘图的基本绘制方式之一是填充绘制。

填充是指用指定的内容填满所要绘制的图形，最终生成一个实心的图案。

### 描边绘制（stroke）

canvas 绘图的另一种基本绘制方式是描边绘制。

描边绘制是指，沿着所要绘制的图形边缘，使用指定的内容进行描绘，最终生成的是空心的图案。

如果既要填充又要描边，则需要分别绘制两次完成最终图案。

## 绘制图形

### 绘制矩形

矩形，是最基础的形状。canvas 提供了三种方法绘制矩形：

```JavaScript
//填充绘制矩形
ctx.fillRect(x, y, width, height)

//描边绘制矩形
ctx.strokeRect(x, y, width, height)

//擦除矩形区域，相当于用白色底色填充绘制
ctx.clearRect(x, y, width, height)
```

### 绘制路径

路径，是另一种基础形状。通过控制笔触的坐标点，在画布上绘制图形。

与绘制矩形的直接绘制不同，绘制路径需要一些额外的步骤。

- 首先，需要创建路径起始点。
- 然后，你使用各种路径绘制命令去画出路径。此时路径是不可见的。
- 根据需要，选择是否把路径封闭。
- 通过描边或填充方法来实际绘制图形。

为此，我们需要了解以下一些基本方法。

#### beginPath()

开始一条新路径，这是生成路径的第一步操作。

一条路径本质上是由多段子路径（直线、弧形、等等）组成。而每次调用 beginPath 之后，子路径清空重置，然后就可以重新绘制新的图形。

#### closePath()

闭合当前路径。

`closePath()` 不是必须的操作，相当于绘制一条当前位置到路径起始位置的直线子路径。

#### stroke()

描边绘制当前路径。

#### fill()

填充绘制当前路径。

当调用 `fill()` 时，当前没有闭合的路径会自动闭合，不需要手动调用 `closePath()` 函数。调用 `stroke()` 时不会自动闭合。

#### moveTo(x, y)

移动笔触。将当前路径绘制的笔触移动到某个坐标点。

相当于绘制一条真正不可见的子路径。通常用于绘制不连续的路径。

调用 `beginPath()` 之后，或者 canvas 刚创建的时候，当前路径为空，第一条路径绘制命令无论实际上是什么，通常都会被视为 `moveTo`。因此，在开始新路径之后建议通过 `moveTo` 指定起始位置。

#### 路径绘制命令

路径绘制命令是实际绘制路径线条的一些命令。包括有：

- 绘制直线：`lineTo`
- 绘制圆弧：`arc`、`arcTo`
- 贝塞尔曲线：`quadraticCurveTo`、`bezierCurveTo`
- 矩形：`rect`

这些命令都是用来绘制不同子路径的命令。具体的用途和参数，可以查阅 [参考文档](/widgets/canvas.md#context2d)

### 组合使用

这里，我们展示一个组合使用的效果，绘制一个快应用的 logo。

```javascript
drawCanvas () {
    const canvas = this.$element('newCanvas')
    const ctx = canvas.getContext('2d')

    const r = 20
    const h = 380
    const p = Math.PI

    ctx.beginPath()
    ctx.moveTo(r * 2, r)
    ctx.arc(r * 2, r * 2, r, -p / 2, -p, true)
    ctx.lineTo(r, h - r * 2)
    ctx.arc(r * 2, h - r * 2, r, p, p / 2, true)
    ctx.lineTo(h - r * 2, h - r)
    ctx.arc(h - r * 2, h - r * 2, r, p / 2, 0, true)
    ctx.lineTo(h - r, r * 2)
    ctx.arc(h - r * 2, r * 2, r, 0, -p / 2, true)
    ctx.closePath()
    ctx.stroke()

    const s = 60

    ctx.beginPath()
    ctx.moveTo(h / 2 + s, h / 2)
    ctx.arc(h / 2, h / 2, s, 0, -p / 2 * 3, true)
    ctx.arc(h / 2, h / 2 + s + s / 2, s / 2, -p / 2, p / 2, false)
    ctx.arc(h / 2, h / 2, s * 2, -p / 2 * 3, 0, false)
    ctx.arc(h / 2 + s + s / 2, h / 2, s / 2, 0, p, false)
    ctx.moveTo(h / 2 + s * 2, h / 2 + s + s / 2)
    ctx.arc(h / 2 + s + s / 2, h / 2 + s + s / 2, s / 2, 0, p * 2, false)
    ctx.moveTo(h / 2 + s / 4 * 3, h / 2 + s / 2)
    ctx.arc(h / 2 + s / 2, h / 2 + s / 2, s / 4, 0, p * 2, false)
    ctx.fill()
}
```

实现效果如下

## 颜色和样式

通过刚才的例子，我们学会了绘制图形。

但是我们看到，不管是填充还是描边，画出来的都是简单的黑白图形。如果想要指定描绘的内容，画出更丰富的效果应该如何操作呢？

有两个重要的属性可以做到，`fillStyle` 和 `strokeStyle`。顾名思义，分别是为填充和描边指定样式。

### 颜色

在本章节最初的例子里，其实已经看到上色的基本方法，就是直接用颜色作为指定样式。

```js
ctx.fillStyle = 'rgb(200,0,0)'
ctx.fillRect(20, 20, 200, 200)
```

一旦设置了 `fillStyle` 或者 `strokeStyle` 的值，新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，需要画完一种样式的图形后，重新设置 `fillStyle` 或 `strokeStyle` 的值。

```js
//填充绘制一个矩形，颜色为暗红色
ctx.fillStyle = 'rgb(200,0,0)'
ctx.fillRect(20, 20, 200, 200)

//描边绘制另一个矩形，边框颜色为半透明蓝色
ctx.strokeStyle = 'rgba(0, 0, 200, 0.5)'
ctx.strokeRect(80, 80, 200, 200)
```

canvas 的颜色支持各种 CSS 色彩值。

```js
// 以下值均为 '红色'
ctx.fillStyle = 'red' //色彩名称
ctx.fillStyle = '#ff0000' //十六进制色值
ctx.fillStyle = 'rgb(255,0,0)' //rgb色值
ctx.fillStyle = 'rgba(255,0,0,1)' //rgba色值
```

### 渐变色

除了使用纯色，还支持使用渐变色。先创建渐变色对象，并将渐变色对象作为样式进行绘图，就能绘制出渐变色的图形。

渐变色对象可以使用 `createLinearGradient` 创建线性渐变，然后使用 `addColorStop` 上色。

这里要注意的是，渐变色对象的坐标尺寸都是相对画布的。应用了渐变色的图形实际起到的是类似“蒙版”的效果。

```js
//填充绘制一个矩形，填充颜色为深红到深蓝的线性渐变色
const linGrad1 = ctx.createLinearGradient(0, 0, 300, 300)
linGrad1.addColorStop(0, 'rgb(200, 0, 0)')
linGrad1.addColorStop(1, 'rgb(0, 0, 200)')
ctx.fillStyle = linGrad1
ctx.fillRect(20, 20, 200, 200)

//描边绘制另一个矩形，边框颜色为深蓝到深红的线性渐变色
const linGrad2 = ctx.createLinearGradient(0, 0, 300, 300)
linGrad2.addColorStop(0, 'rgb(0, 0, 200)')
linGrad2.addColorStop(1, 'rgb(200, 0, 0)')
ctx.strokeStyle = linGrad2
ctx.strokeRect(80, 80, 200, 200)
```

### 线型

除了颜色，还可以在描边绘制图形的时候，为描边的线条增加线型。

线型可设置的项目包括：

#### 线宽（lineWidth）

顾名思义，线宽就是描边线条的宽度，单位是像素。

**这里要注意两点：**

> 线条的宽度会向图形的内部及外部同时延伸，会侵占图形的内部空间。<br>
> 在使用较宽线条时特别需要注意图形内部填充部分是否被过度挤压。<br>
> 常用解决方法可以尝试先描边后填充。

> 可能会出现的半渲染像素点。<br>
> 例如，绘制一条 (1, 1) 到 (1, 3)，线宽为 1px 的线段，是在 x = 1 的位置，向左右各延伸 0.5px 进行绘制。但是由于实际最小绘制单位是一个像素点，那么最终绘制出来的效果将是线宽 2px，但是颜色减半的线段，视觉上看就会模糊。<br>
> 常用解决方法，一种是改用偶数的线宽绘制；另一种可以将线段绘制的起始点做适当偏移，例如偏移至 (1.5, 1) 到 (1.5, 3)，左右各延伸 0.5px 后，正好布满一个像素点，不会出现半像素渲染了。

#### 端点样式（lineCap）

端点样式决定了线段端点显示的样子。从上至下依次为 `butt`，`round` 和 `square`，其中 `butt` 为默认值。

这里要注意的是，`round` 和 `square` 会使得线段描绘出来的视觉长度，两端各多出半个线宽，可参考蓝色辅助线。

#### 交点样式（lineJoin）

交点样式决定了图形中两线段连接处所显示的样子。从上至下依次为 `miter`, `bevel` 和 `round`，`miter` 为默认值。

#### 交点最大斜接长度（miterLimit）

在上图交点样式为 `miter` 的展示中，线段的外侧边缘会延伸交汇于一点上。线段直接夹角比较大的，交点不会太远，但当夹角减少时，交点距离会呈指数级增大。

`miterLimit` 属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，交点样式会自动变成了 `bevel`。

#### 示例

```js
ctx.lineWidth = 20
ctx.lineCap = 'round'
ctx.lineJoin = 'bevel'
ctx.strokeRect(80, 80, 200, 200)
```

#### 使用虚线

用 `setLineDash` 方法和 `lineDashOffset` 属性来制定虚线样式。 `setLineDash` 方法接受一个数组，来指定线段与间隙的交替；`lineDashOffset` 属性设置起始偏移量。

#### 示例

```javascript
drawLineDashCanvas () {
    const canvas = this.$element('linedash-canvas')
    const ctx = canvas.getContext('2d')

    let offset = 0

    // 绘制蚂蚁线
    setInterval(() => {
        offset++

        if (offset > 16) {
            offset = 0
        }

        ctx.clearRect(0, 0, 300, 300)
        // 设置虚线线段和间隙长度 分别为 4px 2px
        ctx.setLineDash([4, 2])
        // 设置虚线的起始偏移量
        ctx.lineDashOffset = -offset
        ctx.strokeRect(10, 10, 200, 200)
    }, 20)
}
```

运行效果如下

### 组合使用

通过学习，我们为刚才绘制的快应用 logo 添加颜色和样式。

```javascript
drawCanvas () {
    const r = 20
    const h = 380
    const p = Math.PI

    const linGrad1 = ctx.createLinearGradient(h, h, 0, 0)
    linGrad1.addColorStop(0, '#FFFAFA')
    linGrad1.addColorStop(0.8, '#E4C700')
    linGrad1.addColorStop(1, 'rgba(228,199,0,0)')

    ctx.fillStyle = linGrad1
    ctx.fillRect(0, 0, h, h)

    const linGrad2 = ctx.createLinearGradient(0, 0, h, h)
    linGrad2.addColorStop(0, '#C1FFC1')
    linGrad2.addColorStop(0.5, '#ffffff')
    linGrad2.addColorStop(1, '#00BFFF')

    ctx.beginPath()
    ctx.moveTo(r * 2, r)
    ctx.arc(r * 2, r * 2, r, -p / 2, -p, true)
    ctx.lineTo(r, h - r * 2)
    ctx.arc(r * 2, h - r * 2, r, p, p / 2, true)
    ctx.lineTo(h - r * 2, h - r)
    ctx.arc(h - r * 2, h - r * 2, r, p / 2, 0, true)
    ctx.lineTo(h - r, r * 2)
    ctx.arc(h - r * 2, r * 2, r, 0, -p / 2, true)
    ctx.closePath()
    ctx.lineWidth = 10
    ctx.strokeStyle = linGrad2
    ctx.stroke()

    const s = 60

    ctx.beginPath()
    ctx.moveTo(h / 2 + s, h / 2)
    ctx.arc(h / 2, h / 2, s, 0, -p / 2 * 3, true)
    ctx.arc(h / 2, h / 2 + s + s / 2, s / 2, -p / 2, p / 2, false)
    ctx.arc(h / 2, h / 2, s * 2, -p / 2 * 3, 0, false)
    ctx.arc(h / 2 + s + s / 2, h / 2, s / 2, 0, p, false)
    ctx.fillStyle = '#4286f5'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(h / 2 + s * 2, h / 2 + s + s / 2)
    ctx.arc(h / 2 + s + s / 2, h / 2 + s + s / 2, s / 2, 0, p * 2, false)
    ctx.fillStyle = 'rgb(234, 67, 53)'
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(h / 2 + s / 4 * 3, h / 2 + s / 2)
    ctx.arc(h / 2 + s / 2, h / 2 + s / 2, s / 4, 0, p * 2, false)
    ctx.fillStyle = 'rgba(250, 188, 5, 1)'
    ctx.fill()
}
```

实现效果如下

## 绘制文字

和绘制图形类似，快应用 canvas 也提供 `fillText` 和 `strokeText` 两种方法来绘制文字。

### 基本用法

```js
//填充绘制
ctx.fillText('Hello world', 10, 50)
```

### 文字样式

除了基本的样式，文字还提供了独有的样式。

#### 字体（font）

可以直接使用符合 CSS font 语法的字符串作为文字样式的字体属性。默认值为 `'10px sans-serif'`。

要注意的是，不同于 web，目前快应用还无法引入外部字体文件，对于字体的选择，仅限 serif、sans-serif 和 monosapce。

#### 对齐方式（textAlign）和 水平对齐方式（textBaseline）

这两个属性控制了文体相对与绘制定位点的对齐方式。

#### 示例

```js
ctx.font = '48px sans-serif'
ctx.textAlign = 'left'
ctx.textBaseline = 'top'
ctx.fillText('Hello world', 10, 50)
```

## 使用图片

除了直接在 canvas 中绘制各种图形，快应用还支持使用图片。

### 图像对象

为了能够在 canvas 中使用图片，需要使用图像对象来加载图片。

```js
const img = new Image() //新建图像对象
```

### 图片加载

修改图像对象的 src 属性，即可启动图片加载。

src 既可以使用 URI 来加载本地图片，也使用 URL 加载网络图片。

```js
const img = new Image() //新建图像对象

img.src = '/common/logo.png' //加载本地图片
img.src = 'https://www.quickapp.cn/assets/images/home/logo.png' //加载网络图片

//加载成功的回调
img.onload = () => {
  console.log('图片加载完成')
}

//加载失败的回调
img.onerror = () => {
  console.log('图片加载失败')
}
```

### 绘制图片

图片加载成功之后，就可以使用 `drawImage` 在画布中进行图片绘制了。

为避免图片未加载完成或加载失败导致填充错误，建议在加载成功的回调中进行图片填充操作。

```js
img.onload = () => {
  ctx.drawImage(img, 0, 0)
}
```

使用 `drawImage` 绘制图片也有 3 种不同的基本形式，通过不同的参数来控制。

#### 基础

```js
drawImage(image, x, y)
```

其中 image 是加载的图像对象，x 和 y 是其在目标 canvas 里的起始坐标。

这种方法会将图片原封不动的绘制在画布上，是最基本的绘制方法。

#### 缩放

```js
drawImage(image, x, y, width, height)
```

相对基础方法，多了两个 `width`、`height` 参数，指定了绘制的尺寸。

这种方法会将图片缩放成指定的尺寸后，绘制在画布上。

#### 切片

```js
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

其中 image 与基础方法一样，是加载的图像对象。

其它 8 个参数可以参照下方的图解，前 4 个是定义图源的切片位置和尺寸，后 4 个则是定义切片的目标绘制位置和尺寸。

### 在填充和描边绘制中使用图片

图片不仅仅可以直接绘制在画布中，还可以将图片像渐变色一样，作为绘制图形的样式，在填充和描边绘制中使用。

首先，需要通过 `createPattern` 创建图元对象，然后就可以将图元对象作为样式用在图形的绘制中了。

同样，为避免图片未加载完成或加载失败导致填充错误，建议在加载成功的回调中进行操作。

```js
img.onload = () => {
  const imgPat = ctx.createPattern(img, 'repeat') //创建图元对象
  const p = Math.PI

  //填充绘制一个圆，使用图片作为填充元素
  ctx.beginPath()
  ctx.moveTo(50, 30)
  ctx.arc(100, 100, 60, 0, p * 2, false)
  ctx.fillStyle = imgPat
  ctx.fill()

  //描边绘制一个圆，使用图片作为描边元素
  ctx.moveTo(100, 30)
  ctx.beginPath()
  ctx.arc(250, 250, 50, 0, p * 2, false)
  ctx.strokeStyle = imgPat
  ctx.lineWidth = 30
  ctx.stroke()
}
```

## 合成与裁切

在之前的例子里面，我们总是将一个图形画在另一个之上，对于其他更多的情况，仅仅这样是远远不够的。比如，对合成的图形来说，绘制顺序会有限制。不过，我们可以利用 globalCompositeOperation 属性来改变这种状况。此外, clip 属性允许我们隐藏不想看到的部分图形。

### 合成

我们不仅可以在已有图形后面再画新图形，还可以用来遮盖指定区域，清除画布中的某些部分（清除区域不仅限于矩形，像 clearRect()方法做的那样）以及更多其他操作。

`globalCompositeOperation = type`

这个属性设定了在画新图形时采用的遮盖策略，其值是一个用于标识不同遮盖方式的字符串。

#### source-over

这是默认设置，并在现有画布上下文之上绘制新图形。

#### source-atop

新图形只在与现有画布内容重叠的地方绘制。

#### source-in

新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。

#### source-out

在不与现有画布内容重叠的地方绘制新图形。

#### destination-over

在现有的画布内容后面绘制新的图形。

#### destination-atop

现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。

#### destination-in

现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。

#### destination-out

现有内容保持在新图形不重叠的地方。

#### lighter

两个重叠图形的颜色是通过颜色值相加来确定的。

#### copy

只显示新图形。

#### xor

图像中，那些重叠和正常绘制之外的其他地方是透明的。

#### 举例

```html
<template>
  <div class="page">
    <text class=glo-type>{{globalCompositeOperation}}</text>
    <canvas id="cavs" class="canvas"></canvas>
    <input class="btn" value="切换合成方式" type="button" onclick="changeGlobalCompositeOperation"></input>
  </div>
</template>

<style>
  .page {
    flex-direction: column;
    align-items: center;
  }

  .glo-type {
    margin: 20px;
  }

  .canvas {
    width: 320px;
    height: 320px;
    border: 1px solid red;
  }

  .btn {
    width: 500px;
    height: 80px;
    text-align: center;
    border-radius: 5px;
    margin: 20px;
    color: #ffffff;
    font-size: 30px;
    background-color: #0faeff;
  }
</style>

<script>
  export default {
    private: {
      globalCompositeOperation: 'source-over'
    },
    onShow () {
      this.draw()
    },
    draw () {
      const ctx = this.$element('cavs').getContext('2d')

      // 清除画布
      ctx.clearRect(0, 0, 320, 320)

      // 正常绘制第一个矩形
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'skyblue'
      ctx.fillRect(10, 10, 200, 200)

      // 设置canvas的合成方式
      ctx.globalCompositeOperation = this.globalCompositeOperation

      // 绘制第二个矩形
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.fillRect(110, 110, 200, 200)
    },
    // 切换canvas合成方式
    changeGlobalCompositeOperation () {
      const globalCompositeOperationArr = ['source-over', 'source-atop',
        'source-in', 'source-out',
        'destination-over', 'destination-atop',
        'destination-in', 'destination-out',
        'lighter', 'copy', 'xor']

      const index = globalCompositeOperationArr.indexOf(this.globalCompositeOperation)
      if (index < globalCompositeOperationArr.length - 1) {
        this.globalCompositeOperation = globalCompositeOperationArr[index + 1]
      }
      else {
        this.globalCompositeOperation = globalCompositeOperationArr[0]
      }

      this.draw()
    }
  }
</script>
```

### 裁切

裁切路径，就是用 `clip` 绘制一个不可见的图形。一旦设置好裁切路径，那么你在画布上新绘制的所有内容都将局限在该区域内，区域以外进行绘制是没有任何效果的。

已有的内容不受影响。

要取消裁切路径的效果，可以绘制一个和画布等大的矩形裁切路径。

```js
//绘制一个红色矩形
ctx.fillStyle = 'rgb(200,0,0)'
ctx.fillRect(20, 20, 200, 200)

//使用裁切路径绘制一个圆
ctx.beginPath()
ctx.arc(120, 120, 120, 0, Math.PI * 2, true)
ctx.clip()

//绘制一个蓝色矩形，超出圆形裁切路径之外的部分无法绘制
ctx.fillStyle = 'rgba(0, 0, 200)'
ctx.fillRect(80, 80, 200, 200)
```

运行效果如下

## 变形

到目前位置，我们所有的绘制，都是基于标准坐标系来绘制的。

标准坐标系的特点是：

- 原点在左上角
- 尺寸与画布像素点 1:1

现在介绍的变形，就是改变标准坐标系的方法。

### 变形的基本方法

- 平移：translate(x, y)
- 旋转：rotate(angle)
- 缩放：scale(x, y)
- 变形：transform(m11, m12, m21, m22, dx, dy)、setTransform(m11, m12, m21, m22, dx, dy)、resetTransform()

### 变形的基本原则

- 不会改变已经绘制的图形
- 改变的是坐标系
- 变形之后的所有绘制将依照新的坐标系来绘制

### 举例

```js
for (let i = 0; i < 6; i++) {
  ctx.fillRect(0, 0, 40, 40)
  ctx.translate(50, 0)
}
```

运行效果如图。

可以看到，虽然每次 `fillRect` 绘制的参数没有变化，但是因为坐标系变了，最终绘制出来的就是位置不同的图形。

## 状态保存与恢复

通过前面的学习，我可以看到，每次图形绘制其实都带着非常丰富的状态。

在绘制复杂图形的时候，就会带来重复获取样式的问题。

如何优化呢？

### canvas 状态的保存与恢复

```js
ctx.save() //保存
ctx.restore() //恢复
```

canvas 状态就是当前所有样式的一个快照。

save 和 restore 方法是用来保存和恢复 canvas 状态的。

canvas 状态存储在栈中，每次 save 的时候，当前的状态就被推送到栈中保存。

一个 canvas 状态包括：

- strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit 的值
- 当前的裁切路径
- 当前应用的变形

你可以调用任意多次 save 方法。

每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

### 举例

```js
ctx.fillRect(20, 20, 200, 200) // 使用默认设置，即黑色样式，绘制一个矩形

ctx.save() // 保存当前黑色样式的状态

ctx.fillStyle = '#ff0000' // 设置一个填充样式，红色
ctx.fillRect(30, 30, 200, 200) // 使用红色样式绘制一个矩形

ctx.save() // 保存当前红色样式的状态

ctx.fillStyle = '#00ff00' // 设置一个新的填充样式，绿色
ctx.fillRect(40, 40, 200, 200) // 使用绿色样式绘制一个矩形

ctx.restore() // 取出栈顶的红色样式状态，恢复
ctx.fillRect(50, 50, 200, 200) // 此时状态为红色样式，绘制一个矩形

ctx.restore() // 取出栈顶的黑色样式状态，恢复
ctx.fillRect(60, 60, 200, 200) // 此时状态为黑色样式，绘制一个矩形
```

运行效果如下：

## 绘制动画

之前我们介绍都是静态图像的绘制，接下来介绍动画的绘制方法。

### 基本原理

canvas 动画的基本原理并不复杂，就是利用 `setInterval` 和 `setTimeout` 来逐帧的在画布上绘制图形。

### 基本步骤

在每一帧绘制的过程中，基本遵循以下步骤。

- 清空 canvas
  > 除非接下来要画的内容会完全充满画布（例如背景图），否则你需要清空所有内容。最简单的做法就是用 `clearRect`。
- 保存 canvas 状态
  > 如果你要改变一些会改变 canvas 状态的设置（样式，变形之类的），又要在每画一帧之时都是原始状态的话，你需要先保存一下。
- 绘制动画图形（animated shapes）
  > 这一步才是重绘动画帧。
- 恢复 canvas 状态
  > 如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

## 像素操作 `1030+`

到目前为止，我们尚未深入了解 canvas 画布真实像素的原理，事实上，你可以直接通过 ImageData 对象操纵像素数据，直接读取或将数据数组写入该对象中。

### ImageData 对象

在快应用中 ImageData 对象是一个普通对象，其中存储着 canvas 对象真实的像素数据，它包含以下几个属性

- width 使用像素描述 ImageData 的实际宽度
- height 使用像素描述 ImageData 的实际高度
- data Uint8ClampedArray 类型，描述了一个一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示

data 属性返回一个 Uint8ClampedArray，它可以被使用作为查看初始像素数据。每个像素用 4 个 1 bytes 值(按照红，绿，蓝和透明值的顺序; 这就是 "RGBA" 格式) 来代表。每个颜色值部份用 0 至 255 来代表。每个部份被分配到一个在数组内连续的索引，左上角像素的红色部份在数组的索引 0 位置。像素从左到右被处理，然后往下，遍历整个数组。

Uint8ClampedArray 包含 高度 × 宽度 × 4 bytes 数据，索引值从 0 到(高度 × 宽度 × 4) - 1

例如，要读取图片中位于第 50 行，第 200 列的像素的蓝色部份，你会写以下代码：

```js
const blueComponent = imageData.data[50 * (imageData.width * 4) + 200 * 4 + 2]
```

你可能用会使用 Uint8ClampedArray.length 属性来读取像素数组的大小（以 bytes 为单位）：

```js
const numBytes = imageData.data.length
```

### 创建一个 ImageData 对象

去创建一个新的，空白的 ImageData 对象，你应该会使用 createImageData() 方法。有 2 个版本的 createImageData() 方法

```js
const myImageData = ctx.createImageData(width, height)
```

上面代码创建了一个新的具体特定尺寸的 ImageData 对象。所有像素被预设为透明黑。

你也可以创建一个被 anotherImageData 对象指定的相同像素的 ImageData 对象。这个新的对象像素全部被预设为透明黑。这个并非复制了图片数据。

```js
const myImageData = ctx.createImageData(anotherImageData)
```

### 得到场景像素数据

为了获得一个包含画布场景像素数据的 ImageData 对像，你可以用 getImageData() 方法：

```js
const myImageData = ctx.getImageData(left, top, width, height)
```

这个方法会返回一个 ImageData 对象，它代表了画布区域的对象数据，此画布的四个角落分别表示为(left, top),(left + width, top),(left, top + height),以及(left + width, top + height)四个点。这些坐标点被设定为画布坐标空间元素。

### 在场景中写入像素数据

你可以用 putImageData() 方法去对场景进行像素数据的写入。

```js
ctx.putImageData(myImageData, dx, dy)
```

dx 和 dy 参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标。

例如，为了在场景内左上角绘制 myImageData 代表的图片，你可以写如下的代码：

```js
ctx.putImageData(myImageData, 0, 0)
```

### 举例

在这个例子里，我们接着对刚才的快应用 logo 进行置灰色，我们使用 getImageData 获取 ImageData 对象，遍历所有像素以改变他们的数值。然后我们将被修改的像素数组通过 putImageData() 放回到画布中去。 grayscale 函数仅仅是用以计算红绿和蓝的平均值。你也可以用加权平均，例如 x = 0.299r + 0.587g + 0.114b 这个公式

```js
setGray() {
    const canvas = this.$element('new-canvas')
    const ctx = canvas.getContext('2d')
    const canvasW = 380
    const canvasH = 380

    // 得到场景像素数据
    const imageData = ctx.getImageData(0, 0, 380, 380)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    // 在场景中写入像素数据
    ctx.putImageData(imageData, 0, 0)
}
```

运行效果如下

## 总结

了解 canvas 的特点，现在就可以实现基本组件无法实现的视觉效果。
