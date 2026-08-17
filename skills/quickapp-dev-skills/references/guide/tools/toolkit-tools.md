# toolkit 工具

为了方便开发，提供了 hap-toolkit 来帮助开发者通过命令行工具来完成工程的创建等工作

## 安装 NodeJS

需安装**8.0**以上版本的 NodeJS (建议使用 10.0+ 以上)，请从[NodeJS 官网](https://nodejs.org)下载

请注意：hap-toolkit@0.3及其以后的版本不再支持 NodeJS v8.0 以下的版本

## 安装工具

通过 npm 仓库安装，在命令行中执行以下命令：

```shell
npm install -g hap-toolkit
```

在命令行中执行`hap -v`会输出版本信息表示`hap-toolkit`安装成功，如下命令所示：

```shell
hap -v
```

## 创建新工程

用来创建一个模板工程项目

```shell
hap init <ProjectName>
```

进入工程的根目录运行如下命令安装依赖包

```shell
npm install
```

## 升级工程

用来进行常规工程目录结构与依赖的升级

进入已经建好的工程目录中

```shell
hap update
```

命令参数：

--force 强制升级（将当前工程升级到 hap-toolkit 版本, 有可能导致版本降级，请谨慎使用）

升级完成后，在工程目录中运行 npm install 安装依赖库

## 命令帮助

```shell
hap --help
```

## 工具更新

重新全局安装工具即可，请参考上面`安装工具`

## 启动调试服务器

在工程目录下执行:

```shell
npm run server
```

服务默认端口为：8000，也可以通过执行如下命令自定义端口号

```shell
npm run server -- --port XXX
```

该命令将启动一个 HTTP Server，提供`devtools页面`的请求，PC 机与手机调试器交互的功能。

启动成功后，终端会输出一个二维码（PC 机的服务器地址），或者开发者也可以通过浏览器访问服务器主页地址查看该二维码，如：`http://localhost:8000`；

## 编译

### 1 手动编译

运行如下命令，完成编译

```shell
npm run build
```

### 2 自动编译

运行如下命令，启动文件监视器，每次修改工程文件时，会自动编译

```shell
npm run watch
```

每次编译完成后，会通知手机快应用调试器更新 rpk 包，更新成功后，自动在手机端刷新
