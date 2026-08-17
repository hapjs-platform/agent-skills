# 微博账户 `1010+`

## 接口声明

```json
{
  "name": "service.wbaccount",
  "params": {
    "appKey": "your app key"
  }
}
```

### 参数

| 参数值 | 类型   | 说明                                                              |
| ------ | ------ | ----------------------------------------------------------------- |
| appKey | String | 在 [微博开放平台](http://open.weibo.com/) 申请应用时分配的 appKey |

## 导入模块

```javascript
import wbaccount from '@service.wbaccount' 或 const wbaccount = require("@service.wbaccount");
```

## 接口定义

### wbaccount.getType()

获取当前的微博登录方式

#### 参数：

无

#### 返回值：

| 返回值 | 备注                                                                    |
| ------ | ----------------------------------------------------------------------- |
| APP    | SSO 授权：在有微博客户端的情况下，同时手机系统支持时，使用 SSO 授权登陆 |
| WEB    | Web 授权：不支持 SSO 授权时，使用 webview 形式授权                      |
| NONE   | 当前无可用的微博登陆方式                                                |

### wbaccount.authorize(OBJECT)

进行微博授权

#### 参数：

| 参数名      | 类型     | 必填 | 说明                                                                                                                                          |
| ----------- | -------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| redirectUri | String   | 是   | 授权回调地址，与微博开放平台配置保持一致，默认可填写 `https://api.weibo.com/oauth2/default.html`                                              |
| scope       | String   | 否   | 申请 scope 权限所需参数，可一次申请多个 scope 权限，用逗号分隔。示例：follow_app_official_microblog，可参考：http://open.weibo.com/wiki/Scope |
| success     | Function | 否   | 成功回调                                                                                                                                      |
| fail        | Function | 否   | 失败回调                                                                                                                                      |
| cancel      | Function | 否   | 取消回调                                                                                                                                      |

##### success 返回值：

| 参数值       | 类型   | 说明                                    |
| ------------ | ------ | --------------------------------------- |
| accessToken  | String | 授权 token                              |
| expiresIn    | Number | 过期时间                                |
| uid          | String | 用户 uid                                |
| refreshToken | String | 刷新 token，可用于刷新授权 token 有效期 |
| phone        | String | 用户输入的手机号码                      |

#### 示例

```javascript
wbaccount.authorize({
  redirectUri: 'https://api.weibo.com/oauth2/default.html',
  scope: 'follow_app_official_microblog',
  success: function(data) {
    console.log('handling success. accessToken=' + data.accessToken)
  },
  fail: function(data, code) {
    console.log('handling fail, result data=' + data + ', code=' + code)
  },
  cancel: function() {
    console.log('handling cancel')
  }
})
```

## 后台运行限制
禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注            |
| ---------- | :-----: | --------------- |
| 小米       | **YES** | -               |
| 中兴       | **YES** | 仅支持 WEB 方式 |
| 华为       |  _no_   | -               |
| 金立       | **YES** | 仅支持 WEB 方式 |
| 联想       |  _no_   | -               |
| 魅族       | **YES** | 仅支持 WEB 方式 |
| 努比亚     | **YES** | -               |
| OPPO       | **YES** | 仅支持 WEB 方式 |
| vivo       | **YES** | 仅支持 WEB 方式 |
| 一加       |    -    | -               |
| **预览版** | **YES** | 仅支持 WEB 方式 |
