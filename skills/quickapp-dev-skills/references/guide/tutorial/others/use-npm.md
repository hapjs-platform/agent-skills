# 使用 npm

> npm 是包管理工具，允许开发者下载第三方包到本地使用，允许开发者将自己编写的包上传到 npm 服务器。推荐开发者使用 npm

通过本节，你将学会：

- [引入 npm 包](#引入-npm-包)
- [发布 npm 包](#发布-npm-包)

## 引入 npm 包

开发者可引入 npm 包中提供的文件，引入后即可正常使用他人编写的代码

### 准备工作

引入 npm 包前，需要先在本地安装 npm 包。可执行以下命令安装：

```shell
npm install <package>
```

其中 `<package>` 为 npm 包名。以 npm 包 quick-app-kit-demo 为例：

```shell
npm install quick-app-kit-demo
```

### 引入文件

本地安装 npm 包后，就可以引入 npm 包提供的文件了。根据引入文件类型的不同，引入的方法存在差异。常见文件的类型及引入方法如下：

- 组件文件

使用 `<import>` 引入 npm 包中的自定义组件，注意设置组件文件的相对路径。以 npm 包 quick-app-kit-demo 为例：

```html
<import name="comp" src="<relative path to node_modules>/node_modules/quick-app-kit-demo/src/component/index.ux"></import>
```

- 样式文件

使用导入外部文件或合并外部文件的方式，引入 npm 包中的样式文件，注意设置样式文件的相对路径。以 npm 包 quick-app-kit-demo 为例：

```html
<!-- 导入外部文件, 代替style内部样式 -->
<style src="<relative path to node_modules>/node_modules/quick-app-kit-demo/src/common/common.css"></style>

<!-- 合并外部文件 -->
<style>
  @import '<relative path to node_modules>/node_modules/quick-app-kit-demo/src/common/common.css';
</style>
```

- js 文件

使用 import 引入 npm 包中的 js 文件，注意设置 js 文件的相对路径。以 npm 包 quick-app-kit-demo 为例：

```javascript
import getStr from '<relative path to node_modules>/node_modules/quick-app-kit-demo/src/common/util'
```

## 发布 npm 包

开发者也可以发布 npm 包，分享和重用自己编写的代码

### 准备工作

1. 准备好要发布的目录

2. 建议目录下增加 README.md 文件，说明 npm 包的功能及用法等

3. 确保目录下有 package.json 文件，若目录下没有 package.json 文件，执行以下命令初始化生成一个新的 package.json 文件

```shell
npm init
```

**注意**：暂不支持 npm 包中提供本地图片资源，请使用线上图片资源代替

### 发布流程

**1. 注册账号**

如果还没有 npm 账号，访问 [npm 官网](https://www.npmjs.com/)注册账号

**2. 登录账号**

在本地执行以下命令，登录 npm 帐号

```shell
npm login
```

**3. 发布 npm 包**

在目录下执行以下命令，发布 npm 包

```shell
npm publish
```

**4. 验证发布结果**

访问 `https://npmjs.com/package/<package>` ，检查发布是否成功，其中 `<package>` 为 npm 包名

**注意**：若开发者修改过 npm 的源，需要在登录或发布前将源切回 npm

## 总结

推荐开发者使用 npm 包、发布 npm 包。有利于分享和复用代码，提高开发效率
