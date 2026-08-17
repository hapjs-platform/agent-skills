# 开发与调试

> 掌握开发与调试的方法，帮助定位及解决问题

通过本节，你将学会：

- 使用日志输出
- 远程调试

## 使用日志输出

**1 修改日志等级**

打开工程根目录下的 src 文件夹的 manifest.json，找到 config 配置，将 logLevel 修改为最低级别`debug`，即：允许所有级别的日志输出

修改后`<ProjectName>/src/manifest.json`中 config 配置代码如下：

```json
{
  "config": {
    "logLevel": "debug"
  }
}
```

**2 在 js 中输出日志**

当 js 代码未按需求正确运行，输出日志能帮助开发者快速定位问题；与传统前端开发一致，使用`console`对象输出日志，如下：

```javascript
console.debug('debug')
console.log('log')
console.info('info')
console.warn('warn')
console.error('error')
```

**3 查看日志**

开发者可以使用`Android Studio`的`Android Monitor`输出来查看日志。

## 远程调试

远程调试指的是通过**快应用调试器**、**hap-toolkit 的远程调试命令** 、**chrome devtools 调试界面**，来调试手机 app 端的页面

**1 WIFI 调试**

如果手机与 PC 在同一局域网，可以使用 WIFI 调试，步骤如下：

- 在项目根目录下执行如下命令，启动 HTTP 调试服务器：

```shell
npm run server
```

服务启动成功后，命令行终端和调试服务器主页可以看到提供扫描的二维码

- 手机快应用调试器中关闭`开启USB调试`
- 手机快应用调试器点击`扫码安装`按钮，扫码安装待调试的 rpk 文件
- 手机快应用调试器中点击`开始调试`按钮，开始调试

**2 USB 调试**

USB 调试模式不需要手机与 PC 在同一局域网，需要在调试过程中手机通过 USB 连接 PC，步骤如下：

- 在项目根目录下执行如下命令，启动 HTTP 调试服务器：

```shell
npm run server
```

- 手机开启`设置 --> 开发者选项 --> USB调试`
- 手机快应用调试器选中`开启USB调试`，手机 USB 连接到 PC
- 手机快应用调试器中点击`在线更新`按钮，安装待调试的 rpk 文件
- 手机快应用调试器中点击`开始调试`按钮，开始调试

## 总结

至此，开发者已经了解了开发调试与运行项目的过程；接下来就可以按个人习惯开发项目了，后面将分篇幅介绍各个小要点，熟悉的部分可以跳过
