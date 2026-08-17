# 自定义编译配置

> toolkit 支持自定义的编译时配置项，使得相关路径可以根据项目目录自定义。

## 配置方法

在项目根路径下创建文件 quickapp.config.js，里面内容为：

```
module.exports = {
  sourceRoot: './src',
  signRoot: './sign',
  releasePath: './dist',
  outputPath: './build',
  server: { port: 8080 }
}
```

## 配置项释义

sourceRoot: 源码根目录

signRoot: 证书签名路径

releasePath: 快应用包目录

outputPath: 输出目录

server.port: 启动 hap server 的端口

注意：上述配置方法示例代码里的值，为各项的默认值
