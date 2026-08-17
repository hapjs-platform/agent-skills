# 命令行调试

> 我们通过[概述](../index.html)，已经成功安装并且运行快应用，本文主要介绍通过 `chrome devtools` 进行远程调试方法

**通过本节，你将学会:**

- [简要介绍](#简要介绍)
- [Element 面板](#element-面板)
- [设置节点样式](#设置节点样式)
- [调试 JS 代码](#调试-js-代码)
- [Network 的 HTTP 请求](#network-的-http-请求)
- [调试 Web 组件](#调试-web-组件-1060)
- [获取组件对应的 Android View ID](#获取组件对应的-android-view-id-1060)

## 简要介绍

开发调试需要更具打印日志定位问题，包括查询标签结构，样式 UI，network 等

### 日志输出准备

#### 1. 修改日志等级

打开工程根目录下的 src 文件夹的 manifest.json，找到 config 配置，将 logLevel 修改为最低级别 debug，即：允许所有级别的日志输出

修改后 `<ProjectName>/src/manifest.json` 中 `config` 配置代码如下：

```json
{
  "config": {
    "logLevel": "debug"
  }
}
```

#### 2. 在 js 中输出日志

当 `js` 代码未按需求正确运行，输出日志能帮助开发者快速定位问题；与传统前端开发一致，使用 `console` 对象输出日志，如下：

```javascript
console.debug('debug')
console.log('log')
console.info('info')
console.warn('warn')
console.error('error')
```

#### 3. 查看日志

开发者可以使用 `Android Studio` 的 `Android Monitor` 输出来查看日志，还有下文主要介绍的通过 `chrome devtools 调试界面` 调试手机 app 端的页面

### 远程调试准备

远程调试指的是通过`快应用调试器`、`hap-toolkit` 的远程调试命令 、`chrome devtools 调试界面`，来调试手机 app 端的页面

远程调试依赖 `chrome 浏览器` ，浏览器 `devtools` 会与手机上调试工具建立 `socket` 连接，实时获取修改应用运行数据，进行调试

#### 1. WIFI 调试

如果手机与 PC 在同一局域网，可以使用 WIFI 调试，步骤如下：

- 在项目根目录下执行如下命令，启动 HTTP 调试服务器（ **注意**：如果使用 IDE 调试，则不需要执行该命令，因为 IDE 已经自动开启调试服务）：

  ```bash
  npm run server
  ```

- 手机快应用调试器中关闭 `开启USB调试`
- 手机快应用调试器点击 `扫码安装` 按钮，扫码安装待调试的 `rpk` 文件
- 手机快应用调试器中点击 `开始调试` 按钮，开始调试

  **示例图：**

#### 2. USB 调试

USB 调试模式不需要手机与 PC 在同一局域网，需要在调试过程中手机通过 USB 连接 PC，步骤如下：

- 在项目根目录下执行如下命令，启动 `HTTP` 调试服务器（ **注意**：如果使用 IDE 调试，则不需要执行该命令，因为 IDE 已经自动开启调试服务）：

  ```bash
  npm run server
  ```

- 手机开启`设置` --> `开发者选项` --> `USB调试`
- 手机快应用调试器选中开启 `USB调试`，手机 `USB` 连接到 PC
- 手机快应用调试器中点击 `在线更新` 按钮，安装待调试的 `rpk` 文件
- 手机快应用调试器中点击 `开始调试` 按钮，开始调试

  **示例图：**

#### 3. 展示 chrome devtools 调试界面

点击 `开始调试` 按钮，展现 `chrome devtools` 页面

注：需要首先安装 chrome 浏览器

**示例图：**

## Element 面板

类似传统前端调试，在 `element 面板` 中可以通过 DOM 树的形式查看所有页面元素，同时也能对这些元素进行所见即所得的编辑。

### 编辑 DOM

#### 1. 查看元素

- 点击审查元素按钮，或者使用快捷键 `Ctrl + Shift + C (windows)` 或者 `Cmd + Shift + C (Mac)` ，然后去页面上选择 DOM
- 在 `Element` 面板上，用鼠标手动选择某个 DOM 节点

#### 2. 导航 DOM 节点

- 在 DOM 上单击，高亮节点，在节点任意处双击或点击左边箭头，可展开一个节点
- 使用键盘，向上箭头选择此节点之前一个节点，在 Elements 面板内可见的节点，有可能是父节点、兄弟节点、或者兄弟节点的子节点等），向下类似，选择之后一个节点
- 使用键盘，向左箭头选择这个节点父元素，依此论推，向右箭头可以展开一个节点，再次按向右箭头会选择到这个展开节点的第一个子元素，依此论推
- 在 `Element` 面板最下方为面包屑路径，当前选中节点以蓝色高亮表示

#### 3. 编辑 DOM 节点及属性

- 在 DOM 上单击或双击可编辑现有属性
- 在 DOM 上右击，显示弹框，选择 `Add attribute` 或者 `Edit attribute` 添加或编辑属性
- 在 DOM 上右击，显示弹框，选择 `Edit as HTML` 可编辑 DOM 及属性

## 设置节点样式

当选中一个 DOM 元素，`Styles` 窗口显示所有这个元素上的样式，优先级从高到低

- 最上面： `element.style`，显示直接写在标签内的行内样式
- 其次：直接匹配这个元素的 css
- 最后：为元素的盒子模型

## 调试 JS 代码

### 错误信息查看

当代码运行时发生异常，界面会弹出一个对话框，点击查看错误， 可以显示出错误发生的堆栈，供开发者分析

### 利用 devtools 调试界面 console 输出

按照 [简要介绍](#简要介绍) 中日志输出准备，开发者可以在工程项目中利用 `console` 的输出函数打印的调试信息，以及属于 `native` 模块打印的信息，都可以通过 `devtools` 调试界面的 `console` 面板进行查看

### 命令行

需要先安装 adb 工具，可以参考[官方网站说明](https://developer.android.com/studio/releases/platform-tools.html)进行安装，可将目录加到系统 PATH 中，方便后续使用

```shell
adb logcat -s LOGCAT_CONSOLE
```

注意：

在快应用 `1030` 及以前版本，请运行

```shell
adb logcat -s JsConsole
```

## Network 的 HTTP 请求

同传统 H5 页面开发一样，`Network` 面板会展示 `Devtools` 记录的所有网络请求

## 调试 Web 组件 `1060+`

点击调试器右上角的菜单按钮进入设置页面,勾选开启 Web 组件调试开关

手机开启开发者选项中的 USB 调试并连接手机 USB, 然后进入需要调试的页面

在 chrome 浏览器地址栏中输入: `chrome://inspect/#devices` , 打开 DevTools 调试面板

点击 inspect 即可进入调试页面

## 获取组件对应的 Android View ID `1060+`

在进行自动化测试时,需要知道原生 Android 的 View ID, 可通过组件的 getViewId 方法获取原生 Android 对应的 View ID

```shell
this.$element('element_id').getViewId()
```
