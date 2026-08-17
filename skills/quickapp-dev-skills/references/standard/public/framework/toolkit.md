# 编译工具 hap-toolkit

开发者开发快应用项目时，需要利用脚手架创建一个快应用的初始化项目并编写项目源代码；

之后使用编译工具编译项目得到构建文件（以 rpk 后缀命名，如：`com.application.demo.rpk`）；

当得到项目编译后的构建文件后，可以使用调试器安装并运行该项目。

上面就是编译工具的主要任务：

1. 初始化项目：创建空的快应用项目工程；

2. 编译项目：校验源码文件，构建项目得到产出文件；

3. 下载与更新产出：建立 HTTP 服务器，当手机运行时请求资源和调试应用时，完成下载更新；

其中第二步`编译项目`的工作量最大，开发者对项目编译的需求也各不相同，因此提供下面的个性化配置能力。

## 编译参数

编译工具提供了多种编译能力，开发者可以根据项目需求进行设置。

比如开发者想启用端到端的测试能力，可以在编译项目时携带参数`--enable-e2e`。这样，开发者就可以在运行快应用时进行端到端的测试。

### 如何设置编译参数

通常有两种方式设置编译参数，以开发者开启端到端测试能力并抽取单独的 source-map 文件为例：

- 在命令行携带编译参数；

```bash
npx hap build --enable-e2e --devtool=source-map
```

或者

```bash
npm run build -- --enable-e2e --devtool=source-map
```

注意：如果是上面通过 npm 运行，记得携带：`--`标识让参数传递到内部的命令；

- 在项目根目录新建配置文件`quickapp.config.js`，并配置 cli 属性；

```javascript
module.exports = {
  cli: {
    enableE2e: true,
    devtool: 'source-map'
  }
}
```

### 输出编译工具当前版本支持的编译参数

```
  npx hap build -h
```

### 常见编译参数

常见的编译参数如下：

#### 启用 e2e 测试：`--enable-e2e`

开发者如果想针对项目的功能模块或者接口兼容性进行真机自动化测试，可以开启 e2e 测试能力。开启 e2e 测试能力会导致`rpk`体积变大，适用于项目代码的测试用例保证场景，在项目上线阶段不要启用该能力。

使用方法请查看[自动化测试文档](https://doc.quickapp.cn/tutorial/others/testing.html)。

#### 启用代码覆盖率统计：`--enable-istanbul`

开发者如果想针对项目中多次调用的部分进行优化，可以启用代码覆盖率统计能力。启用该能力后，开发者可以在调试工具提供的页面中查看各个模块的使用情况，进行针对性优化。

使用方法请查看[代码覆盖率使用文档](https://doc.quickapp.cn/tutorial/others/testing.html)。

#### sourcemap 配置：`--devtool <value>`

编译工具在编译项目时默认将`sourcemap`打到 js 文件内，通过设置 value 可以控制`sourcemap`输出形式。具体内容可以参考 webpack 的[devtool](https://webpack.js.org/configuration/devtool/)选项。默认为`none`，设置为`source-map`值表示单独输出 sourcemap 文件。

#### 启用抽离样式能力`1070+`：`--enable-extract-css`

快应用在 1070 以上版本对样式计算进行了优化，启用该能力可以将页面和组件的样式在编译时进行提取，加速运行时样式计算过程。单独启用会增加 rpk 包的体积，配合`--remove-ux-style`参数可以保证 rpk 体积不变。

#### 启用独立 JS 打包`1080+`：`--split-chunks-mode [value]`

启用独立 JS 打包能力可以将被引用两次或以上的 JS 资源抽取到独立的文件中，使得相关文件共用同一份 JS 代码。

该参数有两个值：

- `redundancy`：默认模式。即与先前版本一样不抽取， JS 资源被重复打包至每个引用到的页面。命令如：`npm run release -- --split-chunks-mode=redundancy`
- `smart`：智能模式。 动态导入和被引用两次或以上的 JS 资源会被抽取至独立文件。命令如：`npm run release -- --split-chunks-mode=smart`

#### 启用日志诊断能力：`--enable-diagnosis`

开发中经常需要调试页面，之前可以使用调试器工具启动 devtools 页面来完成界面与 JS 的调试，有时开发者也希望能够有一种轻量级的调试方式；

通过启用该参数，编译时工具将会在项目构建时，引入额外的 JS 文件，该文件会监听`console`对象上的`error()/warn()/info()/debug()/log()`方法调用，并将相应的日志信息记录下来，通过 fetch 请求发送到项目的服务器（通过`npm run server`）中；

服务器收到请求的信息时，会将对应设备的日志输出记录在项目根目录的`logs`文件夹中，文件夹中的每个文件代表了一个对应的快应用设备运行时的日志输出；

通过这种方式，开发者可以查看应用运行时最新的日志输出，方便查看内容与定位；

内置日志监听的 JS 实现，请参考编译时工具中的文件路径，如：`./node_modules/@hap-toolkit/packager/router/lib/diagnosis.js`；

提示：该功能从编译时工具`hap-toolkit@0.7.0`开始支持；

## 项目配置

快应用可以支持常见的前端编译工具，目前主要针对 webpack(>=4)进行兼容与设置，开发者可以在`quickapp.config.js`文件中配置，具体配置方法如下。

### 如何配置项目

在项目根目录下增加`quickapp.config.js`文件，项目配置文件如下：

```javascript
const path = require('path')

const webpack = require('webpack')

module.exports = {
  // hap命令构建时的配置参数
  cli: {
    enableE2e: true
  },
  // 采用webpack编译时的配置
  webpack: {
    resolve: {
      extensions: ['.uxtest'],
      alias: {
        '&': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // webpack插件示例
      new WebpackPluginDemo(),
      // 自动替换代码中的变量
      new webpack.DefinePlugin({
        ENV_TYPE: process.env.type
      })
    ]
  }
}

class WebpackPluginDemo {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('WebpackPluginDemo', function(
      compilation,
      callback
    ) {
      callback()
    })
  }
}
```

开发者对项目编译会有不同的需求，可以在`webpack`命名空间下设置`resolve`、`module`、`plugins`属性进行自定义配置，[webpack 配置文档地址](https://webpack.js.org/configuration/)。

### 版本更新日志

在`hap-toolkit`中有详细的版本更新信息或在[更新日志](https://www.npmjs.com/package/hap-toolkit)查看版本日志

### 配置参考示例

快应用在[Github 的官方站点项目：quickappcn/hap-toolkit-usage](https://github.com/quickappcn/hap-toolkit-usage/)，提供了常见的配置示例。
