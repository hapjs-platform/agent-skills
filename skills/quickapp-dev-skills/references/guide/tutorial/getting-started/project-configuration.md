# 项目配置信息

> 熟悉描述整个项目的配置文件（`<ProjectName>/src/manifest.json`），掌握常用字段的意义：路由 router、UI 显示 display

通过本节，你将学会：

- 配置应用基本信息
- 配置页面路由
- 配置页面 UI 显示

## 配置应用基本信息

每个应用都要有专属的名称，图标等，这些信息都需要在`manifest.json`文件中配置。详见文档[manifest 文件](../../framework/manifest.md)

#### 应用包名（package）

应用包名，是区别于其他应用的唯一标识

推荐采用 com.company.module 的格式，示例如下：

```json
{
  "package": "com.example.demo"
}
```

#### 应用名称（name）

应用名称，6 个汉字以内，与应用商店保存的名称一致；框架提供保存到桌面的功能，桌面上显示的应用名即为此属性

示例如下：

```json
{
  "name": "发票小助手"
}
```

#### 应用图标（icon）

规则为正方形（不能是圆角），且务必无白边

```json
{
  "icon": "/Common/logo.png"
}
```

注意：

请使用**绝对路径**，其中`/`对应于路径`<ProjectName>/src/`

#### 应用版本名称、版本号（versionName、versionCode）

应用版本名称、版本号为开发者的应用包维护的版本信息

应用版本名称为`主版本.次版本`格式

应用版本号为整数，从`1`开始，每次更新上架请自增 1

示例如下：

```json
{
  "versionName": "1.0",
  "versionCode": 1
}
```

#### 支持的最小平台版本号（minPlatformVersion）

支持的最小平台版本号为非必填项，标识开发者的 rpk 包兼容支持的最小运行平台版本

当使用了 1000 及以上的平台版本新增特性时，就必须确保`minPlatformVersion`最低为该平台版本号，避免上线后在更低版本平台上运行出错

示例如下：

```json
{
  "minPlatformVersion": 1000
}
```

注意：

若项目配置文件中的`minPlatformVersion`低于 1000，请在提测前[下载安装快应用平台内测版](https://www.quickapp.cn/docCenter/post/69)，自测通过后提测

#### 配置接口列表（features）

在使用接口时，需要先在 manifest 中声明接口。在每个接口文档的顶部，都附有声明接口的配置代码

以 fetch 网络请求为例，示例如下：

```json
{
  "features": [{ "name": "system.fetch" }]
}
```

## 配置页面路由（router）

路由，用于定义页面的实际地址、跳转地址。如果 ux 页面没有配置路由，则不参与项目编译。一个目录下最多只能存在一个主页面文件（不包括组件文件）

#### 首页名称（router.entry）

首页，即应用平台启动时默认打开的页面。首页需配置为应用中某页面的名称，即在`<ProjectName>/src`目录下，**页面目录的相对路径**

示例如下：

假设工程根目录如下所示

```
└── src
    └── Demo                  页面目录，存放各自页面私有的资源文件和组件文件
        └── index.ux          页面文件，文件名不必与父文件夹相同（推荐index.ux）
```

假设首页为 Demo 目录下的 index.ux 文件，则首页对应的页面名称为`Demo`

```json
{
  "router": {
    "entry": "Demo"
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
└── src
    |── Demo                  页面目录，存放各自页面私有的资源文件和组件文件
    |   └── index.ux         页面文件，文件名不必与父文件夹相同（推荐index.ux）
    └── Doc
        └── Layout            页面目录，存放各自页面私有的资源文件和组件文件
            └── index.ux     页面文件，文件名不必与父文件夹相同（推荐index.ux）
```

当页面名称（router.pages 的 key）为`Demo`时，对应的页面配置（router.pages 的 value）包括：

- **component**：页面对应的 ux 文件名`index`
- **path**：页面路径，默认为页面名称`Demo`

```json
{
  "router": {
    "pages": {
      "Demo": {
        "component": "index"
      },
      "Doc/Layout": {
        "component": "index"
      }
    }
  }
}
```

现在，开发者就可以通过`/Demo`访问到 Demo 目录下的 index.ux 页面了

## 配置页面 UI 显示（display）

UI 显示，用于定义与 UI 显示相关的配置。支持定义：页面公用的默认 UI 显示、页面私有的 UI 显示

#### 页面公用的默认 UI 显示

页面公用的默认 UI 显示，即被所有页面共享

以标题栏文字的配置为例：

```json
{
  "display": {
    "titleBarText": "页面公用的默认标题"
  }
}
```

未配置私有标题的页面，标题栏文字均将显示为`页面公用的默认标题`

#### 页面私有的 UI 显示

页面私有的 UI 显示，在`display.pages`对象下配置：key 为页面名称（与路由中的页面名称保持一致），value 为页面私有的 UI 显示

以标题栏文字的配置为例：

```json
{
  "display": {
    "pages": {
      "Demo": {
        "titleBarText": "Demo页面的标题"
      }
    }
  }
}
```

## 总结

熟悉了常用配置项后，开发者就可以熟练的配置页面路由、UI 显示等信息了
