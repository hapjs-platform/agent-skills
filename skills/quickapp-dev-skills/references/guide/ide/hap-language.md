# ux 文件语法辅助

> 了解开发工具中的对 ux 文件的语法辅助功能

通过本节你将学会：

- [ux 文件的自动补全](#ux-文件自动补全)
- [ux 文件定义跳转](#ux-文件定义跳转)
- [ux 文件链接跳转](#ux-文件链接跳转)
- [ux 文件悬浮提示](#ux-文件悬浮提示)

## ux 文件自动补全

1. template 区域内补全

- 标签补全，输入“<”开始补全。
- 标签属性补全（通用属性和组件属性）。
- 标签属性值补全（如果存在枚举值）。

2. style 区域内补全

- Less，Sass, css 属性补全。
- Less，Sass, css 属性值补全。

3. script 区域内补全

- script 模版支持快应用模块、模块方法补全、console 等的快捷补全。

4. 其他补全

- 路径补全，包括引入组件的路径，引入媒体的路径。
- class 值补全，根据 style 标签中定义的 class 值。

## ux 文件定义跳转

- template 支持 class 和 id 的跳转、变量跳转、方法跳转、自定义组件跳转，Script 支持接口的跳转等。
- mac 下按住 `command + 左键`， windows 下 `ctrl + 左键`，光标将直接跳转到定义处

## ux 文件链接跳转

- ux 文件链接跳转
- mac 下按住 `command + 左键`， windows 下 `ctrl + 左键`，光标将直接跳转到定义处
- 直接跳转至链接文件

## ux 文件悬浮提示

- 标签悬浮提示
- 标签属性值提示
- style 样式提示
- script 方法，导入模块提示等。

**注意：**

- script 方法提示，需要安装 [快应用接口声明文件](https://github.com/vivoquickapp/quickapp-types)。
- 执行 `npm install --save-dev https://github.com/vivoquickapp/quickapp-types` 安装快应用接口声明文件，需要安装 [git](https://git-scm.com/downloads) 工具才能正常安装，否则会提示安装失败。

