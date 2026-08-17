# 通用方法

通用方法，提供给所有组件调用的方法

在组件使用`id`标记 id 属性后，开发者可通过`this.$element('idName')`获取 dom 节点，再调用以下列举的`通用方法`

`id`属性赋值可以查看此[文档](./common-attributes.md#%E5%B8%B8%E8%A7%84%E5%B1%9E%E6%80%A7)入门

`this.$element`可以查看此[文档](../framework/script.md#%E5%85%AC%E5%85%B1%E6%96%B9%E6%B3%95)入门

**本节介绍的通用方法列表有：**

- [getBoundingClientRect(1070+)](#getboundingclientrectobject-object-1070)
- [toTempFilePath(1070+)](#totempfilepathobject-object-1070)
- [focus(1080+)](#focusobject-object-1080)

## 示例代码

```html
<template>
  <div>
      <div id="box1" class="box-normal"></div>
      <div id="box2" class="box-normal"></div>
  </div>
</template>
<script>
    export default {
        onShow(){
            this.$element('box1').getBoundingClientRect({
                success: function (data) {
                    const { top, bottom, left, right, width, height } = data;
                    prompt.showToast({
                        message: `getBoundingClientRect结果： width:${width}, height:${height},
                         top:${top}, bottom:${bottom}, left:${left}, right:${right}`
                    })
                },
                fail: (errorData, errorCode) => {
                    prompt.showToast({
                        message: `错误原因：${JSON.stringify(errorData)}, 错误代码：${errorCode}`
                    })
                },
                complete: function () {
                    console.info('complete')
                }
            })
        }
    }
</script>
```

以下是所有支持的`通用方法`

## getBoundingClientRect(Object object) `1070+`

返回元素的大小及其相对于视窗的位置

### 参数

Object object

| 属性     | 类型     | 默认值 | 必填 | 描述                                             |
| -------- | -------- | ------ | ---- | ------------------------------------------------ |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### object.success 回调函数

##### 参数

Object rect

| 属性   | 类型   | 描述             |
| ------ | ------ | ---------------- |
| left   | number | 元素的左边界坐标 |
| right  | number | 元素的右边界坐标 |
| top    | number | 元素的上边界坐标 |
| bottom | number | 元素的下边界坐标 |
| width  | number | 元素的宽度       |
| height | number | 元素的高度       |

## toTempFilePath(Object object) `1070+`

将组件当前的实际绘制区域的内容导出生成图片，保存到临时文件夹。video, camera 组件不支持该接口，组件中存在 video, camera, map, canvas 时，这些组件的绘制区域在生成的图片中将显示黑色。
map 组件只支持导出不含自定义 view（包括 custommarker, control, callout, label ）的地图底图

### 参数

Object object

| 属性     | 类型           | 默认值 | 必填 | 描述                                                                          |
| -------- | -------------- | ------ | ---- | ----------------------------------------------------------------------------- |
| fileType | jpg &#124; png | png    | 否   | 目标文件的类型                                                                |
| quality  | number         | 1.0    | 否   | 图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。 |
| success  | function       |        | 否   | 接口调用成功的回调函数                                                        |
| fail     | function       |        | 否   | 接口调用失败的回调函数                                                        |
| complete | function       |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）                              |

#### object.fileType 的合法值

| 值  | 描述     |
| --- | -------- |
| jpg | jpg 图片 |
| png | png 图片 |

#### object.success 回调函数

##### 参数

Object res

| 属性         | 类型   | 描述           |
| ------------ | ------ | -------------- |
| tempFilePath | string | 临时文件的路径 |

## focus(Object object) `1080+`

使组件获得或者失去焦点的方法

注：

1. 在 1080 以前的版本，仅 input 和 textarea 组件支持。在 1080 开始，快应用引擎增加了所有组件的`focus`支持

2. 欲查看或确认组件聚焦效果，建议为聚焦元素加上:focus 伪类，可参考[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus)学习

### 参数

| 属性  | 类型    | 默认值 | 必填 | 描述                                                |
| ----- | ------- | ------ | ---- | --------------------------------------------------- |
| focus | boolean | true   | 否   | 使组件获得或者失去焦点，聚焦时可触发 focus 伪类效果 |

### 示例代码

```html
<script>
    this.$element('box1').focus();  // 聚焦效果
    this.$element('box2').focus({focus:true});  // 聚焦效果
    this.$element('box3').focus({focus:false});  // 失焦效果
</script>
```
