# JS 独立打包 `1080+`

当不同页面同时引入同一 JS 资源时，默认情况下编译工具会将该 JS 资源代码打包至该页面文件中。由于打包后相关页面文件都包含了重复的 JS 代码，会造成最终打包生成的 rpk 包体积较大。

快应用平台自`1080`版本起支持将 JS 资源独立打包。当 app.ux 或页面文件两次或以上引用到同一 JS 资源时，会将该 JS 资源抽取到独立的文件中，使得相关文件共用同一份 JS 代码，可有效减少整个 rpk 包体积。

同时，基于 JS 独立打包，开发者可使用 import() 动态导入的能力，详见`动态导入`部分。

## 配置方法

本功能配合编译工具使用，编译项目时携带参数：`--split-chunks-mode=smart`

更多关于该参数的配置信息，参见[编译工具](./toolkit.md)

## 抽取对象

所有被动态导入的 JS 资源均会被抽取至独立文件中。

所有被引用两次或以上的 JS 资源均会被抽取至独立文件中，包括：

- 普通 JS 文件

- 子组件

- node_modules 中被引用的外部库

## 动态导入 `1080+`

标准用法的 import 导入的模块是静态的，会使所有被导入的 JS，在加载时就被编译。如果一个页面依赖的 JS 文件很大并且又不是首次渲染所必须的，可以考虑以异步的形式加载 JS 文件。

可以使用 import()函数动态导入 js 文件，从而减少首次渲染时间。如果使用 import()函数动态导入 JS 文件，必须使用 JS 独立打包，将动态导入的 JS 资源抽取到独立文件。

使用 import()方法动态导入，示例如下：

```html
<template>
  <div class="demo-page">
    <text class="title">{{count}}</text>
    <input class="btn" type="button" value="点击导入动态JS" onclick="dynamicImportJs" />
  </div>
</template>

<script>
export default {
  private: {
    count: 100
  },
  dynamicImportJs() {
    import('./dynamic-js').then(res => {
      console.log('已动态导入dynamic-js')
      this.count = res.calculate(this.count)
    })
  }
}
</script>
```

动态导入 JS 文件：

```javascript
// dynamic-js.js

const a = 100

export function calculate(b) {
  return a + b
}
```
