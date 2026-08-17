# 使用命令行

> 了解命令行使用整体流程：环境安装、运行时预览效果，掌握基本概念：项目产出`rpk`文件

**通过本节，你将学会:**

- [安装环境](#安装环境)
- [安装 toolkit](#安装-toolkit)
- [项目开发](#项目开发)
- [调试项目](#调试项目)
- [发布前打包](#发布前打包)
- [在真机上预览效果](#在真机上预览效果)

**注意**：本节介绍如何使用命令行开发快应用。如果使用 IDE 开发，则不需要学习本节内容。

## 安装环境

### 安装 NodeJS

需安装**8.0**以上版本的 NodeJS (建议使用 10.0+ 以上)，请从[NodeJS 官网](https://nodejs.org)下载

请注意：hap-toolkit@0.3 及其以后的版本不再支持 NodeJS v8.0 以下的版本)

### 手机安装调试器

调试器是一个 Android 应用程序，下载调试器 APK 详见[资源下载](https://www.quickapp.cn/docCenter/post/69)

在手机上安装并打开调试器，按钮功能如下：

- **扫码安装**：配置 HTTP 服务器地址，下载 rpk 包，并唤起平台运行 rpk 包
- **本地安装**：选择手机文件系统中的 rpk 包，并唤起平台运行 rpk 包
- **在线更新**：重新发送 HTTP 请求，更新 rpk 包，并唤起平台运行 rpk 包
- **开始调试**：唤起平台运行 rpk 包，并启动远程调试

**注意**：若打开调试器无法点击按钮，请升级手机系统到最新版本或安装平台预览版

安装成功后如下图所示：

### 手机安装平台预览版

较新的系统版本中内置平台正式版，开发调试平台新功能可使用平台预览版

平台预览版存在以下优缺点：

- 优点：迭代速度快，可立即体验平台新功能
- 缺点：实现与真实的运行环境存在差异，对厂商服务和第三方服务的支持存在缺陷

平台预览版是一个 Android 应用程序，下载平台预览版 APK 详见[资源下载](https://www.quickapp.cn/docCenter/post/69)

下载安装成功后，在手机调试器中点击切换运行平台至`org.hapjs.mockup`，即可在平台预览版上安装运行 rpk 包

## 安装 toolkit

hap-toolkit 为开发编译工具

通过 npm 仓库安装，在命令行中执行以下命令：

```shell
npm install -g hap-toolkit
```

在命令行中执行`hap -v`会输出版本信息表示`hap-toolkit`安装成功，如下命令所示：

```shell
hap -v
```

## 项目开发

开发环境搭建完成，以及 hap-toolkit 工具完成，我们就可以进行项目开发

### 创建项目

安装 toolkit 工具后，可通过全局`hap`命令创建一个项目模板，如下所示:

```shell
hap init <ProjectName>
```

其中`<ProjectName>`为自定义的项目名称，如`hap init demo`

关于生成项目模板具体介绍，详情请见：[项目结构讲解](./project-structure.md)

### 安装依赖

在项目根目录下，运行如下命令安装模块到`node_modules`目录

```shell
npm install
```

### 编译项目

#### 手动编译项目

在项目的根目录下，运行如下命令进行编译打包，生成 rpk 包

```shell
npm run build
```

编译打包成功后，项目根目录下会生成文件夹：**build**、**dist**

- **build**：临时产出，包含编译后的页面 js，图片等
- **dist**：最终产出，包含 rpk 文件。其实是将 build 目录下的资源打包压缩为一个文件，后缀名为`rpk`，**这个`rpk`文件就是项目编译后的最终产出**

#### 自动编译项目

如果希望每次修改源代码文件后，都自动编译项目，请使用如下命令：

```shell
npm run watch
```

### 安装 rpk 包

编译项目产出了 rpk 包后，请打开手机调试器

若打开调试器无法点击按钮，请升级手机系统到最新版本或安装平台预览版

调试器可使用后，就可以在调试器上安装 rpk 包了

可以通过 WIFI 在线更新方式安装 rpk 包，此方式要确保手机与 PC 在同一局域网，步骤如下：

**1 启动 HTTP 服务器**

在终端中新建一个窗口，进入项目的根目录运行如下命令，启动本地服务器（默认端口为 8000）

```shell
npm run server
```

自定义端口（如：8080）

```shell
npm run server -- --port 8080
```

**2 在手机上扫码安装**

步骤如下：

- 手机`打开快应用调试器 --> 关闭"开启USB调试"`
- `点击"扫码安装"`，扫描终端窗口中的二维码即可完成配置（若扫描不成功，可在浏览器中打开页面：`http://localhost:<your port>`，扫描页面中的二维码）
- 点击`在线更新`唤起平台运行 rpk 包

若提示`安装失败`，请检查执行 npm run server 的终端窗口是否正常运行，手机和 PC 是否可以通过 IP 相互访问

**注意：**

- **如果手机与 PC 不在同一局域网**，可以使用 USB 在线更新和本地安装预览运行效果，详见文档[调试](./cli-debug.md)

### 预览效果

安装成功后，效果如下：

### 总结

了解项目的目录结构，**编译时**通过编译工具产出`rpk`文件，**运行时**通过调试器安装`rpk`文件；打通整个流程后，开发者就可以边开发边预览效果了

## 调试项目

至此，我们初步完成通过命令行工具进行快应用开发相关工作，项目调试工作，详情请见：[调试](./cli-debug.md)

## 发布前打包

在项目发布生产前，需进行发布前打包工作

### 编译打包工程

在工程的根目录下运行

```shell
npm run build
```

编译后的工程目录在/`<ProjectName>`/build

生成的应用路径为/`<ProjectName>`/dist/`<ProjectPackage>`.rpk

### 增加 release 签名

通过 openssl 命令等工具生成签名文件`private.pem`、`certificate.pem`，例如：

```shell
openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
```

在工程的 sign 目录下创建 release 目录，将私钥文件 private.pem 和证书文件 certificate.pem 拷贝进去

注：

从`hap-toolkit@0.7.2` 版本开始，通过命令`hap init`新建的项目，sign 目录默认只存放 release 版证书，不再在目录下区分`sign/debug`与`sign/release`目录来存放 debug 与 release 版签名，详情可查看[此处](../tutorial/overview/project-structure.html#项目介绍)

因此，通过上述步骤生成的签名文件，在新版 toolkit 新建的项目，直接拷贝至项目的 sign 目录即可，无需先创建 release 目录

### 发布程序包

发布程序包前需要`增加release签名`，然后在工程的根目录下运行

```shell
npm run release
```

生成的应用路径为/`<ProjectName>`/dist/`<ProjectPackage>`.release.rpk

## 在真机上预览效果

如果已经打包测试或正式版 rpk 后，需要在自己的手机上或者发给别人预览效果时，我们可以这么做：

1. 安装平台预览版，教程可见[这里](#手机安装平台预览版)
2. 将安卓设备连接到电脑上，设置为"传输文件“模式
3. 打开安卓设备，在根目录下新建 rpks 目录，目录路径为`sdcard/rpks`
4. 将打包好的快应用 rpk 放置在此目录
5. 打开平台预览版应用，即可在列表看到步骤 4 放置的快应用

