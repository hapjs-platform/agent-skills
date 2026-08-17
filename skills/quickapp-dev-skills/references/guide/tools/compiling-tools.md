# 编译工具

## 编译打包工程

在工程的根目录下运行

```shell
npm run build
```

编译后的工程目录在<ProjectName>/build

生成的应用路径为<ProjectName>/dist/<ProjectPackage>.rpk

## 增加 release 签名

通过 openssl 命令等工具生成签名文件`private.pem`、`certificate.pem`，例如：

```shell
openssl req -newkey rsa:2048 -nodes -keyout private.pem -x509 -days 3650 -out certificate.pem
```

在工程的 sign 目录下创建 release 目录，将私钥文件 private.pem 和证书文件 certificate.pem 拷贝进去

## 发布程序包

发布程序包前需要`增加release签名`，然后在工程的根目录下运行

```shell
npm run release
```

生成的应用路径为<ProjectName>/dist/<ProjectPackage>.release.rpk

如果需要临时使用 debug 签名，可以使用

```shell
npm run release -- --debug
```

注意: debug 签名由于是公开的，安全性无法保证，一定不要使用 debug 签名签发正式上线的应用
