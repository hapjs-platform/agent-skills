# 项目结构讲解

> 本文对项目的结构及相关进行了讲解，包括快应用文件结构讲解，配置增加页面，引入依赖等

**通过本节，你将学会:**

- [项目介绍](#项目介绍)
- [配置信息](#配置信息)
- [新增页面](#新增页面)
- [引入依赖](#引入依赖)

## 项目介绍

您可以通过[快应用 IDE](./quick-start.md) 或[命令行工具](../../ide/cli.html)（hap-toolkit），来创建一个项目；

该项目会包含了**项目配置**与**示例页面**的初始代码，项目根目录主要结构如下：

```
└── src
│   ├── assets          # 公用的资源(Images/Styles/字体...)
│   │   ├──images       # 存储 png/jpg/svg 等公共图片资源
│   │   └──styles       # 存放 less/css/sass 等公共样式资源
│   ├── helper          # 项目自定义辅助各类工具
│   ├── pages           # 统一存放项目页面级代码
│   ├── app.ux          # 应用程序代码的入口文件
│   └── manifest.json   # 配置应用基本信息
└── package.json        # 定义项目需要的各种模块及配置信息
```

**目录的简要说明如下**：

- **src**：项目源文件夹（含配置、资源、代码等）；
- **package.json**：定义项目需要的各种模块及配置信息；

## 配置信息

每个应用都要有专属的**名称**，**图标**等，这些信息都需要在 `manifest.json` 文件中配置。详见文档 [manifest 文件](../../framework/manifest.md)

### 应用包名（package）

应用包名，是区别于其他应用的唯一标识。

推荐采用 com.company.module 的格式，示例如下：

```json
{
  "package": "com.example.demo"
}
```

### 应用名称（name）

应用名称，6 个汉字以内，与应用商店保存的名称一致；框架提供保存到桌面的功能，桌面上显示的应用名即为此属性；示例如下：

```json
{
  "name": "发票小助手"
}
```

### 应用图标（icon）

规则为正方形（不能是圆角），且务必无白边；

```json
{
  "icon": "/assets/images/logo.png"
}
```

### 应用版本名称、版本号（versionName、versionCode）

应用版本名称、版本号为开发者的应用包维护的版本信息；

应用版本名称为`主版本.次版本`格式；

应用版本号为整数，从 `1` 开始，每次更新上架请**自增 1**；

示例如下：

```json
{
  "versionName": "1.0",
  "versionCode": 1
}
```

### 支持的最小平台版本号（minPlatformVersion）

支持的最小平台版本号为非必填项，标识开发者的 rpk 包兼容支持的最小运行平台版本；建议填写 `1070`（各厂商绝大部分机型已覆盖）；

当使用了 1000 及以上的平台版本新增特性时，就必须确保 `minPlatformVersion` 最低为该平台版本号，避免上线后在更低版本平台上运行出错；

示例如下：

```json
{
  "minPlatformVersion": 1070
}
```

注意事项：

- 若项目配置文件中的 `minPlatformVersion` 低于某版本，请在提测前[下载安装快应用平台内测版](https://www.quickapp.cn/docCenter/post/69)，自测通过后提测；

- 以快应用 `minPlatformVersion: 1080`，用户版本 1070 为例:
  - 该应用线上存在 `minPlatformVersion <= 1070` 版本，该用户只可以搜索和使用 `minPlatformVersion <= 1070` 版本中的最新版本；
  - 该应用线上只存在 `minPlatformVersion: 1080` 版本，该用户可以搜索到 `minPlatformVersion: 1080` 版本，点击打开会提醒用户升级版本，用户在升级之后可打开 1080 版本。

### 配置接口列表（features）

在使用接口时，需要先在 manifest 中声明接口。在每个接口文档的顶部，都附有声明接口的配置代码，以 fetch 网络请求为例，示例如下：

```json
{
  "features": [{ "name": "system.fetch" }]
}
```

## 新增页面

新增及配置页面，需要依赖 `manifest.json` 中 `router` 及 `display` 配置；

### router

`router`，路由，用于定义页面的实际地址、跳转地址。如果 ux 页面没有配置路由，则不参与项目编译。一个目录下最多只能存在一个主页面文件（不包括组件文件）。

#### 首页 (router.entry)

首页，即应用平台启动时默认打开的页面。首页需配置为应用中某页面的名称，即在`<ProjectName>/src`目录下，**页面目录的相对路径**，假设工程根目录如下所示：

```
└── src
    ├── assets                # 公用的资源(Images/Styles/字体...)
    ├── helper                # 项目自定义辅助各类工具
    └── pages                 存放所有页面文件夹
        └── Demo              页面目录，存放各自页面私有的资源文件和组件文件
            └── index.ux      页面文件，文件名不必与父文件夹相同（推荐index.ux）
```

假设首页为 Demo 目录下的 index.ux 文件，则首页对应的页面名称为 `pages/Demo`；

```json
{
  "router": {
    "entry": "pages/Demo"
  }
}
```

#### 页面路由对象（router.pages）

页面路由对象，key 为页面名称（`<ProjectName>/src`目录下，**页面目录的相对路径**），value 为页面具体路由配置，key 不要重复

页面具体路由配置（router.pages 的 value）包括以下属性：

- **component**：页面对应的 ux 文件名
- **path**：页面路径，不填则默认为页面名称（`<ProjectName>/src`目录下，页面目录的**相对路径**）

示例如下：

假设工程根目录如下所示

```
└──src
    ├── assets                # 公用的资源(Images/Styles/字体...)
    ├── helper                # 项目自定义辅助各类工具
    └── pages
        |── Demo                  页面目录，存放各自页面私有的资源文件和组件文件
        |   └── index.ux         页面文件，文件名不必与父文件夹相同（推荐index.ux）
        └── Doc
            └── Layout            页面目录，存放各自页面私有的资源文件和组件文件
                └── index.ux     页面文件，文件名不必与父文件夹相同（推荐index.ux）
```

当页面名称（router.pages 的 key）为 `Demo` 时，对应的页面配置（router.pages 的 value）包括：

- **component**：页面对应的 ux 文件名`index`；
- **path**：页面路径，默认为页面名称`Demo`；

```json
{
  "router": {
    "pages": {
      "pages/Demo": {
        "component": "index"
      },
      "pages/Doc/Layout": {
        "component": "index"
      }
    }
  }
}
```

现在，开发者就可以通过 `pages/Demo` 访问到 Demo 目录下的 index.ux 页面。

### display

`display`，UI 显示，用于定义与 UI 显示相关的配置。支持定义：页面公用的默认 UI 显示、页面私有的 UI 显示。

#### 页面公用的默认 UI 显示

页面公用的默认 UI 显示，即被所有页面共享；以标题栏文字的配置为例：

```json
{
  "display": {
    "titleBarText": "页面公用的默认标题"
  }
}
```

未配置私有标题的页面，标题栏文字均将显示为`页面公用的默认标题`。

#### 页面私有的 UI 显示

页面私有的 UI 显示，在`display.pages`对象下配置：key 为页面名称（与路由中的页面名称保持一致），value 为页面私有的 UI 显示

以标题栏文字的配置为例：

```json
{
  "display": {
    "pages": {
      "Demo": {
        "titleBarText": "Demo 页面的标题"
      }
    }
  }
}
```

## 引入依赖

在快应用开发过程中，经常需要引入依赖

### 引入 js

快应用中支持 `ES6` 的 `module` 标准，使用 `import` 引入 js 依赖，同时支持 CommonJs 规范，使用`require`引入 js 依赖；

```js
// 首先在 `manifest.json` 中配置 `fetch` 接口

// require引入
const fetch = require('@system.fetch')

// import引入
import fetch from '@system.fetch'
```

### 引入 CSS

快应用支持 CSS 通过 `@import` 方式引入

```css
// 引入外部css文件
@import './style.css';

// 引入外部less文件
@import './style.less';
```

### 引入自定义组件

框架引入自定义组件的方式是通过 `<import>` 标签完成的，如下面代码所示：

```html
<import name="comp-part1" src="./part1"></import>
```

`<import>标签`中的的`src`属性指定自定义组件的地址，`name`属性指定在`<template>`组件中引用该组件时使用的**标签名称**

最终页面定义与引入方式如下：

```html
<import name="my-component" src="./myComponent"></import>

<template>
  <div>
    <my-component></my-component>
  </div>
</template>
```
