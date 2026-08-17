# canvas `1020+`

## 概述

画布组件，通过使用 JavaScript 中的脚本，可以在 canvas 上绘制图形，制作照片，创建动画等。

## 子组件

不支持

## 属性

支持[通用属性](common-attributes.md)

## 样式

支持[通用样式](common-styles.md)

## 事件

支持[通用事件](common-events.md)

## 方法

### canvas.toTempFilePath(Object object) `1050+`

把当前画布指定区域的内容导出生成指定大小的图片。

#### 参数

Object object

| 属性       | 类型     | 默认值               | 必填 | 描述                                                                          |
| ---------- | -------- | -------------------- | ---- | ----------------------------------------------------------------------------- |
| x          | number   | 0                    | 否   | 指定的画布区域的左上角横坐标                                                  |
| y          | number   | 0                    | 否   | 指定的画布区域的左上角纵坐标                                                  |
| width      | number   | canvas 宽度-x        | 否   | 指定的画布区域的宽度                                                          |
| height     | number   | canvas 高度-y        | 否   | 指定的画布区域的高度                                                          |
| destWidth  | number   | width\*屏幕像素密度  | 否   | 输出的图片的宽度                                                              |
| destHeight | number   | height\*屏幕像素密度 | 否   | 输出的图片的高度                                                              |
| fileType   | string   | png                  | 否   | 目标文件的类型                                                                |
| quality    | number   | 1.0                  | 否   | 图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。 |
| success    | function |                      | 否   | 接口调用成功的回调函数                                                        |
| fail       | function |                      | 否   | 接口调用失败的回调函数                                                        |
| complete   | function |                      | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                              |

##### object.fileType 的合法值

| 值  | 描述     |
| --- | -------- |
| jpg | jpg 图片 |
| png | png 图片 |

##### object.success 回调函数

###### 参数

Object res

| 属性             | 类型   | 描述           | 备注                   |
| ---------------- | ------ | -------------- | ---------------------- |
| uri `deprecated` | string | 生成文件的路径 | 使用`tempFilePath`代替 |
| tempFilePath     | string | 生成文件的路径 | -                      |

#### 示例代码

```js
// ...
onShow() {
  this.$element('canvas').toTempFilePath({
    x: 50,
    y: 50,
    width: 350,
    height: 350,
    destWidth: 200,
    destHeight: 200,
    fileType: 'png',
    quality: 0.5,
    success: (res) => {
      this.imageUrl = res.tempFilePath
    },
    fail: (err, code) => {
      prompt.showToast({
        message: `错误原因：${err}, 错误代码：${code}`
      })
    }
  })
}
// ...
```

### canvas.getContext()

创建 canvas 绘图上下文

#### 参数

| 参数        | 类型       | 描述             |
| ----------- | ---------- | ---------------- |
| contextType | `<string>` | 目前支持传入'2d' |

#### 返回值

| 参数 | 类型                       | 描述                                                                                                    |
| ---- | -------------------------- | ------------------------------------------------------------------------------------------------------- |
| '2d' | `CanvasRenderingContext2D` | 返回一个 CanvasRenderingContext2D 对象，用于 2D 绘制，请参考 [CanvasRenderingContext2D](#context2d)对象 |

#### 示例

```
var canvas = this.$element('canvasid');
var ctx = canvas.getContext('2d');
```

---

# <span id="context2d"> CanvasRenderingContext2D `1020+`

## 概述

通过 CanvasRenderingContext2D 可以在 canvas 上绘制矩形、文本、图片和其他对象。可以在 canvas 上调用 getContext('2d') 来获取 CanvasRenderingContext2D 的对象。

## 方法和属性

### **绘制矩形**

### CanvasRenderingContext2D.clearRect()

清除画布上在该矩形区域内的内容

#### 语法

```
ctx.clearRect(x, y, width, height);
```

#### 参数

| 参数   | 类型       | 描述                    |
| ------ | ---------- | ----------------------- |
| x      | `<number>` | 矩形区域左上角的 x 坐标 |
| y      | `<number>` | 矩形区域左上角的 y 坐标 |
| width  | `<number>` | 矩形区域的宽度          |
| height | `<number>` | 矩形区域的高度          |

### CanvasRenderingContext2D.fillRect()

填充一个矩形

#### 语法

```
ctx.fillRect(x, y, width, height);
```

#### 参数

| 参数   | 类型       | 描述                    |
| ------ | ---------- | ----------------------- |
| x      | `<number>` | 矩形路径左上角的 x 坐标 |
| y      | `<number>` | 矩形路径左上角的 y 坐标 |
| width  | `<number>` | 矩形路径的宽度          |
| height | `<number>` | 矩形路径的高度          |

### CanvasRenderingContext2D.strokeRect()

画一个非填充矩形

#### 语法

```
ctx.strokeRect(x, y, width, height);
```

#### 参数

| 参数   | 类型       | 描述                    |
| ------ | ---------- | ----------------------- |
| x      | `<number>` | 矩形路径左上角的 x 坐标 |
| y      | `<number>` | 矩形路径左上角的 y 坐标 |
| width  | `<number>` | 矩形路径的宽度          |
| height | `<number>` | 矩形路径的高度          |

### **绘制文本**

### CanvasRenderingContext2D.fillText()

填充文本

#### 语法

```
ctx.fillText(text, x, y)
```

#### 参数

| 参数 | 类型       | 描述                        |
| ---- | ---------- | --------------------------- |
| text | `<string>` | 在画布上输出的文本          |
| x    | `<number>` | 绘制文本的左上角 x 坐标位置 |
| y    | `<number>` | 绘制文本的左上角 y 坐标位置 |

### CanvasRenderingContext2D.strokeText()

给定的 (x, y) 位置绘制文本描边的方法

#### 语法

```
ctx.strokeText(text, x, y);
```

#### 参数

| 参数 | 类型       | 描述                  |
| ---- | ---------- | --------------------- |
| text | `<string>` | 要绘制的文本          |
| x    | `<number>` | 文本起始点的 x 轴坐标 |
| y    | `<number>` | 文本起始点的 y 轴坐标 |

### CanvasRenderingContext2D.measureText()

返回一个 TextMetrics 对象，该对象包含以像素计的指定字体宽度

#### 语法

```
ctx.measureText(text);
```

#### 参数

| 参数 | 类型       | 描述         |
| ---- | ---------- | ------------ |
| text | `<string>` | 要测量的文本 |

#### 返回值

| 类型        | 描述                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------- |
| TextMetrics | 返回一个 TextMetrics 对象，该对象包含以像素计的指定字体宽度。（TextMetrics.width 来获取宽度） |

### **线型**

### CanvasRenderingContext2D.lineWidth

设置线条的宽度

#### 语法

```
ctx.lineWidth = lineWidth;
```

#### 参数

| 参数      | 类型       | 描述       |
| --------- | ---------- | ---------- |
| lineWidth | `<number>` | 线条的宽度 |

### CanvasRenderingContext2D.lineCap

设置线条的端点样式

#### 语法

```
ctx.lineCap = lineCap;
```

#### 参数

| 参数    | 类型       | 描述                            |
| ------- | ---------- | ------------------------------- |
| lineCap | `<string>` | 'butt'(默认)、'round'、'square' |

### CanvasRenderingContext2D.lineJoin

设置线条的交点样式

#### 语法

```
ctx.lineJoin = lineJoin;
```

#### 参数

| 参数     | 类型       | 描述                            |
| -------- | ---------- | ------------------------------- |
| lineJoin | `<string>` | 'bevel'、'round'、'miter'(默认) |

### CanvasRenderingContext2D.miterLimit

设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离

#### 语法

```
ctx.miterLimit = miterLimit;
```

#### 参数

| 参数       | 类型       | 描述        |
| ---------- | ---------- | ----------- |
| miterLimit | `<number>` | 默认值是 10 |

### **文本样式**

### CanvasRenderingContext2D.font

设置当前字体样式的属性

#### 语法

```
ctx.font = value;
```

#### 参数

| 参数  | 类型       | 描述                                                            |
| ----- | ---------- | --------------------------------------------------------------- |
| value | `<string>` | 符合 CSS font 语法的 DOMString 字符串。默认值为 10px sans-serif |

### CanvasRenderingContext2D.textAlign

设置文字的对齐方式

#### 语法

```
ctx.textAlign = align;
```

#### 参数

| 参数  | 类型       | 描述                                        |
| ----- | ---------- | ------------------------------------------- |
| align | `<string>` | 'start'(默认),'end','left','center','right' |

### CanvasRenderingContext2D.textBaseline

设置文字的水平对齐

#### 语法

```
ctx.textBaseline = textBaseline;
```

#### 参数

| 参数         | 类型       | 描述                                                               |
| ------------ | ---------- | ------------------------------------------------------------------ |
| textBaseline | `<string>` | 'alphabetic'(默认),'middle','top','hanging','bottom','ideographic' |

### **填充和描边样式**

### CanvasRenderingContext2D.fillStyle

设置填充色

#### 语法

```
ctx.fillStyle = color;
ctx.fillStyle = gradient;
ctx.fillStyle = pattern;
```

#### 参数

| 参数     | 类型             | 描述                                                                                                         |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| color    | `<string>`       | CSS color                                                                                                    |
| gradient | `CanvasGradient` | 参考 [CanvasGradient](#canvasgradient) 对象，可通过 CanvasRenderingContext2D.createLinearGradient() 方法创建 |
| pattern  | `CanvasPattern`  | 通过 CanvasRenderingContext2D.createPattern() 方法创建                                                       |

### CanvasRenderingContext2D.strokeStyle

设置边框颜色

#### 语法

```
ctx.strokeStyle = color;
ctx.strokeStyle = gradient;
ctx.strokeStyle = pattern;
```

#### 参数

| 参数     | 类型             | 描述                                                                                                         |
| -------- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| color    | `<string>`       | CSS color                                                                                                    |
| gradient | `CanvasGradient` | 参考 [CanvasGradient](#canvasgradient) 对象，可通过 CanvasRenderingContext2D.createLinearGradient() 方法创建 |
| pattern  | `CanvasPattern`  | 通过 CanvasRenderingContext2D.createPattern() 方法创建                                                       |

### **渐变和图案**

### CanvasRenderingContext2D.createLinearGradient()

创建一个线性的渐变颜色

#### 语法

```
ctx.createLinearGradient(x0, y0, x1, y1);
```

#### 参数

| 参数 | 类型       | 描述          |
| ---- | ---------- | ------------- |
| x0   | `<number>` | 起点的 x 坐标 |
| y0   | `<number>` | 起点的 y 坐标 |
| x1   | `<number>` | 终点的 x 坐标 |
| y1   | `<number>` | 终点的 y 坐标 |

### CanvasRenderingContext2D.createPattern()

对指定的图像创建模式的方法，可在指定的方向上重复元图像

#### 语法

```
ctx.createPattern(image, repetition);
```

#### 参数

| 参数       | 类型       | 描述                                                            |
| ---------- | ---------- | --------------------------------------------------------------- |
| image      | `Image`    | 重复的图像源, 参考 [Image](#image) 对象                         |
| repetition | `<string>` | 指定如何重复图像, 'repeat', 'repeat-x', 'repeat-y', 'no-repeat' |

### **路径**

### CanvasRenderingContext2D.beginPath()

开始创建一个新路径

#### 语法

```
ctx.beginPath();
```

### CanvasRenderingContext2D.closePath()

封闭一个路径

#### 语法

```
ctx.closePath();
```

### CanvasRenderingContext2D.moveTo()

把路径移动到画布中的指定点

#### 语法

```
ctx.moveTo(x, y);
```

#### 参数

| 参数 | 类型       | 描述              |
| ---- | ---------- | ----------------- |
| x    | `<number>` | 目标位置的 x 坐标 |
| y    | `<number>` | 目标位置的 y 坐标 |

### CanvasRenderingContext2D.lineTo()

使用直线连接子路径的终点到 x，y 坐标

#### 语法

```
ctx.lineTo(x, y);
```

#### 参数

| 参数 | 类型       | 描述              |
| ---- | ---------- | ----------------- |
| x    | `<number>` | 目标位置的 x 坐标 |
| y    | `<number>` | 目标位置的 y 坐标 |

### CanvasRenderingContext2D.bezierCurveTo()

绘制三次贝赛尔曲线路径

#### 语法

```
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

#### 参数

| 参数 | 类型       | 描述                        |
| ---- | ---------- | --------------------------- |
| cp1x | `<number>` | 第一个贝塞尔控制点的 x 坐标 |
| cp1y | `<number>` | 第一个贝塞尔控制点的 y 坐标 |
| cp2x | `<number>` | 第二个贝塞尔控制点的 x 坐标 |
| cp2y | `<number>` | 第二个贝塞尔控制点的 y 坐标 |
| x    | `<number>` | 结束点的 x 坐标             |
| y    | `<number>` | 结束点的 y 坐标             |

### CanvasRenderingContext2D.quadraticCurveTo()

创建二次贝塞尔曲线路径

#### 语法

```
ctx.quadraticCurveTo(cpx, cpy, x, y);
```

#### 参数

| 参数 | 类型       | 描述                  |
| ---- | ---------- | --------------------- |
| cpx  | `<number>` | 贝塞尔控制点的 x 坐标 |
| cpy  | `<number>` | 贝塞尔控制点的 y 坐标 |
| x    | `<number>` | 结束点的 x 坐标       |
| y    | `<number>` | 结束点的 y 坐标       |

### CanvasRenderingContext2D.arc()

画一条弧线

#### 语法

```
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
```

#### 参数

| 参数          | 类型       | 描述                                              |
| ------------- | ---------- | ------------------------------------------------- |
| x             | `<number>` | 圆的 x 坐标                                       |
| y             | `<number>` | 圆的 y 坐标                                       |
| radius        | `<number>` | 圆的半径                                          |
| startAngle    | `<number>` | 起始弧度， x 轴方向开始计算，单位以弧度表示。     |
| endAngle      | `<number>` | 终止弧度                                          |
| anticlockwise | Boolean    | 可选。如果为 true，逆时针绘制圆，反之，顺时针绘制 |

### CanvasRenderingContext2D.arcTo()

根据控制点和半径绘制圆弧路径

#### 语法

```
ctx.arcTo(x1, y1, x2, y2, radius);
```

#### 参数

| 参数   | 类型       | 描述                    |
| ------ | ---------- | ----------------------- |
| x1     | `<number>` | 第一个控制点的 x 轴坐标 |
| y1     | `<number>` | 第一个控制点的 y 轴坐标 |
| x2     | `<number>` | 第二个控制点的 x 轴坐标 |
| y2     | `<number>` | 第二个控制点的 y 轴坐标 |
| radius | `<number>` | 圆弧的半径              |

### CanvasRenderingContext2D.rect()

创建一个矩形

#### 语法

```
ctx.rect(x, y, width, height);
```

#### 参数

| 参数   | 类型       | 描述                    |
| ------ | ---------- | ----------------------- |
| x      | `<number>` | 矩形路径左上角的 x 坐标 |
| y      | `<number>` | 矩形路径左上角的 y 坐标 |
| width  | `<number>` | 矩形路径的宽度          |
| height | `<number>` | 矩形路径的高度          |

### **绘制路径**

### CanvasRenderingContext2D.fill()

对当前路径中的内容进行填充

#### 语法

```
ctx.fill();
```

### CanvasRenderingContext2D.stroke()

画出当前路径的边框

#### 语法

```
ctx.stroke();
```

### CanvasRenderingContext2D.clip()

将当前创建的路径设置为当前剪切路径

#### 语法

```
 ctx.clip();
```

### **变换**

### CanvasRenderingContext2D.rotate()

顺时针旋转当前坐标轴

#### 语法

```
ctx.rotate(angle);
```

#### 参数

| 参数   | 类型       | 描述                                                                                                                                                                          |
| ------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rotate | `<number>` | 顺时针旋转的弧度。如果你想通过角度值计算，可以使用公式： degree \* Math.PI / 180 。旋转中心点一直是 canvas 的起始点。 如果想改变中心点，可以通过 translate() 方法移动 canvas. |

### CanvasRenderingContext2D.scale()

据 x 水平方向和 y 垂直方向，为 canvas 单位添加缩放变换。

#### 语法

```
ctx.scale(x, y);
```

#### 参数

| 参数 | 类型       | 描述               |
| ---- | ---------- | ------------------ |
| x    | `<number>` | 水平方向的缩放因子 |
| y    | `<number>` | 垂直方向的缩放因子 |

### CanvasRenderingContext2D.setTransform()

使用矩阵重新设置（覆盖）当前变换的方法

#### 语法

```
ctx.setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY);
```

#### 参数

| 参数       | 类型       | 描述     |
| ---------- | ---------- | -------- |
| scaleX     | `<number>` | 水平缩放 |
| skewX      | `<number>` | 水平倾斜 |
| skewY      | `<number>` | 垂直倾斜 |
| scaleY     | `<number>` | 垂直缩放 |
| translateX | `<number>` | 水平移动 |
| translateY | `<number>` | 垂直移动 |

### CanvasRenderingContext2D.transform()

使用矩阵多次叠加当前变换

#### 语法

```
ctx.transform(scaleX, skewX, skewY, scaleY, translateX, translateY);
```

#### 参数

| 参数       | 类型       | 描述     |
| ---------- | ---------- | -------- |
| scaleX     | `<number>` | 水平缩放 |
| skewX      | `<number>` | 水平倾斜 |
| skewY      | `<number>` | 垂直倾斜 |
| scaleY     | `<number>` | 垂直缩放 |
| translateX | `<number>` | 水平移动 |
| translateY | `<number>` | 垂直移动 |

### CanvasRenderingContext2D.translate()

对当前坐标系的原点(0, 0)进行变换

#### 语法

```
ctx.translate(x, y);
```

#### 参数

| 参数 | 类型       | 描述           |
| ---- | ---------- | -------------- |
| x    | `<number>` | 水平坐标平移量 |
| y    | `<number>` | 竖直坐标平移量 |

### **合成**

### CanvasRenderingContext2D.globalAlpha

设置全局画笔透明度

#### 语法

```
ctx.globalAlpha = value;
```

#### 参数

| 参数  | 类型       | 描述                                                              |
| ----- | ---------- | ----------------------------------------------------------------- |
| value | `<number>` | 数字在 0.0  （完全透明）和 1.0 （完全不透明）之间。  默认值是 1.0 |

### **绘制图像**

### CanvasRenderingContext2D.drawImage()

绘制图像到画布

#### 语法

```
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
```

#### 参数

| 参数    | 类型       | 描述                                                 |
| ------- | ---------- | ---------------------------------------------------- |
| image   | `Image`    | 所要绘制的图片资源, 参考 [Image](#image) 对象        |
| dx      | `<number>` | 图像的左上角在目标 canvas 上 X 轴的位置              |
| dy      | `<number>` | 图像的左上角在目标 canvas 上 Y 轴的位置              |
| dWidth  | `<number>` | 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 |
| dHeigt  | `<number>` | 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 |
| sx      | `<number>` | 源图像的矩形选择框的左上角 X 坐标                    |
| sy      | `<number>` | 源图像的矩形选择框的左上角 Y 坐标                    |
| sWidth  | `<number>` | 源图像的矩形选择框的高度                             |
| sHeight | `<number>` | 源图像的矩形选择框的高度                             |

### **Canvas 状态**

### CanvasRenderingContext2D.restore()

恢复之前保存的绘图上下文

#### 语法

```
ctx.restore();
```

### CanvasRenderingContext2D.save()

保存当前的绘图上下文

#### 语法

```
ctx.save();
```

### **像素操作 `1030+`**

### CanvasRenderingContext2D.createImageData()

创建一个新的、空白的、指定大小的 ImageData 对象，参考 [ImageData](#imagedata)

#### 语法

```
imagedata = ctx.createImageData(width, height);
imagedata = ctx.createImageData(imagedata);
```

#### 参数

| 参数      | 类型       | 描述                                                                                |
| --------- | ---------- | ----------------------------------------------------------------------------------- |
| width     | `<number>` | ImageData 新对象的宽度                                                              |
| height    | `<number>` | ImageData 新对象的高度                                                              |
| imagedata | `<object>` | 从现有的 ImageData 对象中，复制一个和其宽度和高度相同的对象。图像自身不允许被复制。 |

#### 返回值

| 类型       | 描述                                                                     |
| ---------- | ------------------------------------------------------------------------ |
| `<object>` | 指定了宽度和高度的，新的 ImageData 对象。 新对象使用透明的像素进行填充。 |

### CanvasRenderingContext2D.getImageData()

返回一个 ImageData 对象，用来描述 canvas 区域隐含的像素数据

#### 语法

```
imagedata = ctx.getImageData(sx, sy, sw, sh);
```

#### 参数

| 参数 | 类型       | 描述                                        |
| ---- | ---------- | ------------------------------------------- |
| sx   | `<number>` | 将要被提取的图像数据矩形区域的左上角 X 坐标 |
| sy   | `<number>` | 将要被提取的图像数据矩形区域的左上角 Y 坐标 |
| sw   | `<number>` | 将要被提取的图像数据矩形区域的宽度          |
| sh   | `<number>` | 将要被提取的图像数据矩形区域的高度          |

#### 返回值

| 类型       | 描述                                                |
| ---------- | --------------------------------------------------- |
| `<object>` | 一个 ImageData 对象，包含 canvas 给定的矩形图像数据 |

### CanvasRenderingContext2D.putImageData()

使用图像像素对象绘制矩形

#### 语法

```
ctx.putImageData(imagedata, dx, dy);
ctx.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
```

#### 参数

| 参数        | 类型       | 描述                                                                    |
| ----------- | ---------- | ----------------------------------------------------------------------- |
| imagedata   | `<object>` | 一个 ImageData 对象，包含像素值的数组对象                               |
| dx          | `<number>` | 源图像数据在目标画布中的位置偏移量 X 轴方向的偏移量                     |
| dy          | `<number>` | 源图像数据在目标画布中的位置偏移量 Y 轴方向的偏移量                     |
| dirtyX      | `<number>` | 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角 X 坐标 |
| dirtyY      | `<number>` | 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角 Y 坐标 |
| dirtyWidth  | `<number>` | 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度                    |
| dirtyHeight | `<number>` | 在源图像数据中，矩形区域的高度。默认是图像数据的高度                    |

注：快应用中 `putImageData` 方法绘制矩形的起始位置与 Web 表现有一定差异，请开发者留意。

### CanvasRenderingContext2D.setLineDash() `1040+`

设置虚线样式的方法

#### 语法

```
ctx.setLineDash(segments);
```

#### 参数

| 参数     | 类型      | 描述                             |
| -------- | --------- | -------------------------------- |
| segments | `<Array>` | 描述交替绘制线段和间距长度的数字 |

### CanvasRenderingContext2D.getLineDash() `1040+`

获取当前线段样式的方法

#### 语法

```
ctx.getLineDash();
```

#### 返回值

| 类型      | 描述                                                      |
| --------- | --------------------------------------------------------- |
| `<Array>` | 返回一个 Array 数组，一组描述交替绘制线段和间距长度的数字 |

### CanvasRenderingContext2D.lineDashOffset `1040+`

设置虚线偏移量的属性

#### 语法

```
ctx.lineDashOffset = value;
```

#### 参数

| 参数  | 类型       | 描述                                     |
| ----- | ---------- | ---------------------------------------- |
| value | `<number>` | 偏移量是 float 精度的数字。 初始值为 0.0 |

### CanvasRenderingContext2D.globalCompositeOperation `1040+`

设置要在绘制新形状时应用的合成操作的类型。

#### 语法

```
ctx.globalCompositeOperation = type;
```

#### 参数

| 参数 | 类型       | 描述                                   |
| ---- | ---------- | -------------------------------------- |
| type | `<string>` | 标识要使用的合成或混合模式操作的字符串 |

#### 属性值

| 值               | 描述                                                                         |
| ---------------- | ---------------------------------------------------------------------------- |
| source-over      | 默认。在目标图像上显示源图像。                                               |
| source-atop      | 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。           |
| source-in        | 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。 |
| source-out       | 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。 |
| destination-over | 在源图像上方显示目标图像。                                                   |
| destination-atop | 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。               |
| destination-in   | 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。 |
| destination-out  | 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。 |
| lighter          | 显示源图像 + 目标图像。                                                      |
| copy             | 显示源图像。忽略目标图像。                                                   |
| xor              | 使用异或操作对源图像与目标图像进行组合。                                     |

---

### CanvasRenderingContext2D.shadowBlur `1060+`

阴影的模糊级别，数值越大越模糊，默认值为 0

### 语法

```
ctx.shadowBlur = blur;
```

#### 参数

| 参数 | 类型       | 描述                                             |
| ---- | ---------- | ------------------------------------------------ |
| blur | `<number>` | 描述模糊效果程度的，float 类型的值。默认值是 0。 |

### CanvasRenderingContext2D.shadowColor`1060+`

可以转换成 CSS <color> 值的 DOMString 字符串。 默认值是 fully-transparent black.

### 语法

```
ctx.shadowColor = color;
```

#### 参数

| 参数  | 类型       | 描述                  |
| ----- | ---------- | --------------------- |
| color | `<string>` | CSS color，模糊的颜色 |

### CanvasRenderingContext2D.shadowOffsetX`1060+`

阴影水平偏移距离的 float 类型的值。默认值是 0。

### 语法

```
ctx.shadowOffsetX = offsetX;
```

#### 参数

| 参数    | 类型       | 描述                 |
| ------- | ---------- | -------------------- |
| offsetX | `<number>` | 阴影在水平方向的偏移 |

### CanvasRenderingContext2D.shadowOffsetY`1060+`

阴影垂直偏移距离的 float 类型的值。 默认值是 0。

### 语法

```
ctx.shadowOffsetY = offsetY;
```

#### 参数

| 参数    | 类型       | 描述                 |
| ------- | ---------- | -------------------- |
| offsetY | `<number>` | 阴影在竖直方向的偏移 |

# <span id="image"> Image `1020+`

## 概述

图片对象，通过 new Image() 创建

## 属性

| 名称   | 类型       | 默认值 | 必填 | 描述                                          |
| ------ | ---------- | ------ | ---- | --------------------------------------------- |
| src    | `<string>` | ""     | 是   | 网络地址或本地资源。支持 internal URI `1030+` |
| width  | `<length>` | 0px    | 否   | 图片高度                                      |
| height | `<length>` | 0px    | 否   | 图片宽度                                      |

## 事件

| 名称    | 参数                             | 描述                   |
| ------- | -------------------------------- | ---------------------- |
| onload  | { type: 'load', target: image }  | src 图片加载成功后调用 |
| onerror | { type: 'error', target: image } | src 图片加载失败后调用 |

---

# <span id="canvasgradient"> CanvasGradient `1020+`

## 概述

渐变对象，通过 CanvasRenderingContext2D.createLinearGradient() 创建

## 语法

```
const gradient = ctx.createLinearGradient(0,0,200,0);
gradient.addColorStop(0,"green");
gradient.addColorStop(1,"white");
```

## 方法

### CanvasGradient.addColorStop()

该方法在 CanvasGradient 对象上添加一个由偏移值和颜色值指定的断点

#### 语法

```
gradient.addColorStop(offset, color);
```

#### 参数

| 参数   | 类型       | 描述                                             |
| ------ | ---------- | ------------------------------------------------ |
| offset | `<number>` | `0`到`1`之间的值, 表示渐变点在起点和终点中的位置 |
| color  | `<string>` | CSS Color                                        |

---

# <span id="imagedata"> ImageData `1030+`

## 概述

ImageData 对象是一个普通对象，其中存储着 canvas 对象真实的像素数据

## 属性

| 名称   | 类型                  | 描述                                                                      |
| ------ | --------------------- | ------------------------------------------------------------------------- |
| width  | `<number>`            | 使用像素描述 ImageData 的实际宽度                                         |
| height | `<number>`            | 使用像素描述 ImageData 的实际高度                                         |
| data   | `<Uint8ClampedArray>` | 一个一维数组，包含以 RGBA 顺序的数据，数据使用 0 至 255（包含）的整数表示 |

## canvas &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/media/canvas/index.ux)
