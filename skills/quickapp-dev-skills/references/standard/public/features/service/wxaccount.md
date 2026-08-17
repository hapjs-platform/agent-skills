# 微信账户 wxaccount `1010+`

## 接口声明

```json
{
  "name": "service.wxaccount",
  "params": {
    "appId": "your app id"
  }
}
```

### 参数

| 参数值 | 类型   | 说明                                                                 |
| ------ | ------ | -------------------------------------------------------------------- |
| appId  | String | 在 [微信开放平台](https://open.weixin.qq.com) 申请应用时分配的 appId |

## 导入模块

```javascript
import wxaccount from '@service.wxaccount' 或 const wxaccount = require("@service.wxaccount")
```

## 接口定义

### wxaccount.getType()

获取当前的微信登陆方式

#### 参数：

无

#### 返回值：

| 返回值 | 备注                                             |
| ------ | ------------------------------------------------ |
| APP    | 微信 app 登陆方式                                |
| NONE   | 当前微信登录不可用，微信未安装或者手机系统不支持 |

### wxaccount.authorize(OBJECT)

发起微信登陆，调用之前应该先使用 getType 函数查询 APP 登陆方式是否被支持

注意：rpk 的包名/签名需要和在微信后台注册的移动应用包名/签名一致。

#### 参数：

| 参数名  | 类型     | 必填 | 说明                                                                                                                                                                                       |
| ------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| scope   | String   | 是   | 应用授权作用域，如获取用户个人信息则填写 snsapi_userinfo，[微信关于 scope 的说明](https://open.weixin.qq.com/cgi-bin/showdocument?action=doc&id=open1419317851&t=0.8029775868076203#scope) |
| state   | String   | 否   | 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验                        |
| success | Function | 否   | 成功回调                                                                                                                                                                                   |
| fail    | Function | 否   | 失败回调                                                                                                                                                                                   |
| cancel  | Function | 否   | 取消回调                                                                                                                                                                                   |

#### success 返回值：

| 参数名  | 类型   | 说明                                                                                                                                                                                 |
| ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code    | String | 用于换取 accessToken 的 code，方法参考[微信的文档](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419317853&token=&lang=zh_CN) |
| state   | String | 第三方程序发送时用来标识其请求的唯一性的标志，由第三方程序调用 sendReq 时传入，由微信终端回传，state 字符串长度不能超过 1K                                                           |
| lang    | String | 微信客户端当前语言                                                                                                                                                                   |
| country | String | 微信用户当前国家信息                                                                                                                                                                 |

#### fail 返回错误代码：

| 错误码 | 说明                                                                        |
| ------ | --------------------------------------------------------------------------- |
| -2004  | 用户拒绝授权                                                                |
| -2006  | 微信错误码-6，该操作被微信屏蔽，原因是 rpk 签名和微信后台签名不符或者无权限 |
| 1000   | 微信未安装                                                                  |
| 1001   | 接口声明中没有配置 appId                                                    |

#### 示例

```javascript
useWXAccount: function() {
    var type = wxaccount.getType();
    if (type == 'APP') {
        wxaccount.authorize({
            scope: 'snsapi_userinfo',
            state: 'randomString',
            success: function(data) {
                console.log("wxaccount authorize success:" + JSON.stringify(data));
            },
            fail: function(data, code) {
                console.log("wxaccount authorize fail:" + data + ", code:" + code);
            },
            cancel: function() {
                console.log("wxaccount authorize cancelled.");
            }
        });
    } else {
        console.log("wxaccount not available.");
    }
}
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注                                   |
| ---------- | :-----: | -------------------------------------- |
| 小米       | **YES** | -                                      |
| 中兴       |  _no_   | -                                      |
| 华为       |  _no_   | -                                      |
| 金立       | **YES** | -                                      |
| 联想       |  _no_   | -                                      |
| 魅族       |  _no_   | -                                      |
| 努比亚     | **YES** | -                                      |
| OPPO       | **YES** | 需 ColorOS 5.0+，部分机型 ColorOS 3.x+ |
| vivo       | **YES** | -                                      |
| 一加       |    -    | -                                      |
| **预览版** |  _no_   | 预览版不提供微信账户接口               |
