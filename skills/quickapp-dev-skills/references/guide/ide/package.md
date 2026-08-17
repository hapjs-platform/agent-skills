# 打包

> 生成发布的 RPK 包

## 生成发布的 RPK 包

1. 可以通过点击顶部工具栏的「**打包**」按钮执行功能。

   + 正式包：NODE_ENV 的值为 production
   + 测试包：NODE_ENV 的值为 development
   + 预发包：NODE_ENV 的值为 pre
   + 自定义：可添加自定义的 NODE_ENV值 和自定义其他变量的值

  点击「**设置**」按钮，可以修改 NODE_ENV 和其他变量的值

2. 检查证书

   检测在工程的 sign 目录中是否存在 certificate.pem 和 private.pem 文件。如不存在则提示用户去[生成证书](./certification.md)。

   **注意**：请使用同一份证书文件生成正式包，证书文件不一致会导致签名校验失败，无法通过上线审核。

3. 打包成功

   打包成功之后，会在 dist 目录下生成带有 release 签名的 rpk 包。可以选择「**打开 rpk 所在位置**」及「**上传包管理平台**」（需要登录官网）。

