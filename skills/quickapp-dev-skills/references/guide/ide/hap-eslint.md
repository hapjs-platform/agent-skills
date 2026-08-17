# 配置 eslint

> 了解如何配置 eslint，对 ux 文件的 js 代码和 js 文件进行实时的 js 语法检测。

通过本节你将学会：

- [如何开启 hap-eslint 功能](#如何开启-hap-eslint-功能)
- [如何 enable 或 disable 某条规则](#如何-enable-或-disable-某条规则)
- [如何使用命令行对整个项目进行校验](#如何使用命令行对整个项目进行校验)

## 如何开启 hap-eslint 功能

1. 安装插件

   从 `3.7.0` 版本起，IDE 不自带 eslint 插件，将把插件发布到插件市场中。

   在插件市场中搜索 hap-eslint，点击「**安装**」

2. 通过 `命令面板` 输入 “hap-eslint”，可以开启/关闭 eslint 功能，显示 hap-eslint 的日志打印，生成 eslint 配置文件，自动修复功能。

3. 在 eslint 功能起效前需要配置三个依赖库，分别是 `eslint babel-eslint eslint-plugin-hybrid`。

   ```
   npm install -D eslint

   npm install -D babel-eslint

   npm install -D eslint-plugin-hybrid
   ```

## 如何 enable 或 disable 某条规则

1. 在 eslint 起效后，当 ux 文件出现语法错误的时候，在 IDE 的下方问题栏中会自动 eslint 的语法错误告警或者提示。

2. 选中提示栏，点击右键会弹出一个对话框，点击上面的按钮可以在本文件中 disable 这条 eslint 规则。

## 如何使用命令行对整个项目进行校验

可以使用命令行，来检测本工程空间的所有 ux 文件的语法。输入：./node_modules/.bin/eslint src --ext=ux

