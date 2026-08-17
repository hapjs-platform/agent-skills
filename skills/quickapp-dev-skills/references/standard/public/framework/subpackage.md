# 分包加载 `1040+`

当快应用体积较大时，可以使用快应用的分包加载功能。

简单来说，就是将项目中的所有页面及资源通过配置规则划分到多个单独的分包文件中，运行时单独下载，加快页面渲染。

分包加载的能力首先依赖于编译时工具，根据开发者在manifest.json中配置的subpackages规则，将项目打包成多个分包。

这些分包包含一个基础包和若干个分包，基础包内容包含一些公共的资源、页面等内容，而分包内容则是根据开发者的配置资源目录进行划分。

其次运行时，快应用将优先加载基础包和页面所在分包，其余分包会自动在后台进行预加载。

目前快应用分包大小有以下限制：

* 普通包（rpk）：不超过2M
* 分包（rpks）：
  * 整个快应用的所有分包大小不超过20M
  * 单个分包/基础包大小不能超过2M

对快应用进行分包，可以优化快应用首次启动的加载时间，以及更好的管理和解耦各个模块功能。

为达到最佳的分包效果，可以参考以下建议进行分包配置：

* 首页建议保留在基础包中
* 业务逻辑上密切相关的页面配置在同一个分包中
* 基础包放置公共资源，单个分包独有的资源放置到分包中，以减小基础包大小

### 配置方法

假设应用根目录文件组织如下：

```
├── manifest.json
├── app.ux
├── Hello
│   ├── hello.ux
├── PackageA
│   ├── Page1
│   │   └──page1.ux
│   ├── Page2
│   │   └──page2.ux
├── PackageB
│   ├── Page3
│   │   └──page3.ux
│   ├── Page4
│   │   └──page4.ux
└── Common
    ├── ComponentA.ux
    ├── ComponentB.ux
    └── xxx.png
```

开发者可以在manifest.json subpackages 字段中声明项目分包结构：

```json
{
  "package": "com.company.unit",
  "name": "appName",
  "icon": "/Common/icon.png",
  "versionName": "1.0",
  "versionCode": 1,
  "minPlatformVersion": 1000,
  "features": [{ "name": "system.network" }],
  "permissions": [{ "origin": "*" }],
  "config": {
    "logLevel": "off"
  },
  "router": {
    "entry": "Hello",
    "pages": {
      "Hello": {
        "component": "hello"
      },
      "PackageA/Page1": {
        "component": "page1"
      },
      "PackageA/Page2": {
        "component": "page2"
      },
      "PackageB/Page3": {
        "component": "page3"
      },
      "PackageB/Page4": {
        "component": "page4"
      }
    }
  },
  "subpackages": [
    {
      "name": "pkgA",
      "resource": "PackageA"
    },
    {
      "name": "pkgB",
      "resource": "PackageB"
    }
  ]
}
```

subpackages 的具体配置，详见[manifest 文件](manifest.md)

### 打包原则

* 声明 subpackages 后，将按照 subpackages 配置的资源路径进行打包， subpackages 配置路径以外的目录将被打包到基础包中
* 基础包也能包含自己的 pages ，打包时会依据路径的规则将 pages 内的页面划分到对应的分包中，subpackages 配置路径以外的页面将保留在基础包中
* 分包的根目录不能是另外一个分包的子目录

### 引用原则

* 分包可以依赖基础包的资源，不能依赖其他分包的资源

### 低版本兼容

兼容性考虑包括两方面：编译时兼容与运行时兼容

#### 编译时兼容

如果项目中没有配置subpackages，那么打包最终仅生成rpk后缀的文件，称为整包，拥有全部的页面与资源(即没有启用分包功能)。

如果项目中正确配置了subpackages，并且该版本的编译工具支持分包功能，那么打包最终会生成rpks后缀的文件，文件内部包含一个整包，以及所有的分包。分包文件后缀名为srpk。

为了做到开发时兼容老版本调试平台，生成rpks文件的同时，也会生成rpk整包文件。

#### 运行时兼容

如果快用平台不支持分包，线上运行时只会下载rpk文件，保持原有的运作方式。

如果快应用平台支持分包，线上运行时会优先下载基础包与页面所在分包，其余分包会自动在后台进行预加载。
