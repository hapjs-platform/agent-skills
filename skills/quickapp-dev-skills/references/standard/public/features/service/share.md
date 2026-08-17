# 第三方分享 share

## 接口声明

```json
{
  "name": "service.share",
  "params": {
    "appSign": "abcdefg...",
    "qqKey": "1234567",
    "wxKey": "wx1234",
    "sinaKey": "1234"
  }
}
```

### manifest 参数说明

在使用第三方分享时，需要在 manifest.json 文件中填写一些参数。可以填写所有参数来支持所有分享平台

| 参数    | 说明                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------- |
| appSign | 第三方分享后台注册时提交的 apk 的签名的 Base64 编码，该 apk 签名证书需要和 rpk 的签名证书保持一致 |
| qqKey   | 在 [腾讯开放平台](http://open.qq.com/) 注册时获取的应用 ID                                        |
| wxKey   | 在 [微信开放平台](https://open.weixin.qq.com/) 注册时获取的应用 ID                                |
| sinaKey | 在 [微博开放平台](http://open.weibo.com/) 注册时获取的应用 ID                                     |

## 导入模块

```javascript
import share from '@service.share' 或 const share = require('@service.share')
```

## 接口定义

### share.getProvider()`1000+`

获取服务提供商。

#### 参数：

无

#### 返回值：

字符串，服务提供商的代号，如厂商的英文品牌名称，假如无此服务则返回空字符串

#### 示例：

```javascript
console.log(share.getProvider())
```

### share.share(OBJECT)

分享内容

#### 参数：

| 参数名            | 类型     | 必填                  | 说明                                                                                                                                     |
| ----------------- | -------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| shareType         | Integer      | 是                    | 分享类型。<br/>0：默认图文，1：纯文字，2：纯图片，3：音乐，4：视频。                                                                     |
| title             | String   | 分享类型 0,1,3,4 必须 | 分享的标题。                                                                                                                             |
| summary           | String   | 否                    | 分享的摘要。                                                                                                                             |
| targetUrl         | String   | 分享类型 0,3,4 必须   | 点击后的跳转 URL                                                                                                                         |
| imagePath         | String   | 分享类型 2,3,4 必须   | 分享图片/缩略图的本地地址; 另外可支持分享在线图片的 url `1040+`                                                                          |
| mediaUrl          | String   | 分享类型 3,4 必须     | 分享的音乐/视频数据 URL                                                                                                                  |
| platforms `1010+` | Array    | 否                    | 分享到的平台，不填则默认分享所有平台。<br>可用值包括：WEIBO(新浪微博)、QQ、WEIXIN(微信好友)、WEIXIN_CIRCLE(微信朋友圈)、SYSTEM(系统分享) |
| success           | Function | 否                    | 成功回调(暂不支持)                                                                                                                       |
| fail              | Function | 否                    | 失败回调，返回值为错误信息和错误码（错误码可见[通用错误码](../index.md#code)）                                                           |
| cancel            | Function | 否                    | 取消回调                                                                                                                                 |

#### 示例：

```javascript
share.share({
  shareType: 0,
  title: '标题',
  summary: '摘要',
  imagePath: 'xxx/xxx/xxx/share.jpg',
  targetUrl: 'http://www.example.com',
  platforms: ['WEIBO'],
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, failMess=${data},code=${code}`)
  }
})
```

### share.getAvailablePlatforms(OBJECT) `1010+`

获取当前可用的支持分享的平台列表

#### 参数：

| 参数值   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

#### success 返回值：

| 参数值    | 类型  | 说明                                                                                                               |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------ |
| platforms | Array | 当前可用的支持分享的平台列表，可用值包括：WEIBO(新浪微博)、QQ、WEIXIN、WEIXIN_CIRCLE(微信朋友圈)、SYSTEM(系统分享) |

#### 示例：

```javascript
share.getAvailablePlatforms({
  success: function(data) {
    for (const i in data.platforms) {
      console.log("platforms: " + data.platforms[i]);
    }
  },
  fail: funciton(data, code) {
    console.log("handling fail, code=" + code);
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注                                   |
| ---------- | :-----: | -------------------------------------- |
| 小米       | **YES** | -                                      |
| 中兴       |  _no_   | -                                      |
| 华为       | **YES** | [华为第三方分享](https://developer.huawei.com/consumer/cn/doc/development/quickApp-References/quickapp-api-thirdshare)                                      |
| 金立       |  _no_   | -                                      |
| 联想       | **YES** | -                                      |
| 魅族       | **YES** | 需 Flyme 7+                            |
| 努比亚     |  _no_   | -                                      |
| OPPO       | **YES** | 需 ColorOS 5.0+，部分机型 ColorOS 3.x+ |
| vivo       | **YES** | -                                      |
| 一加       |    -    | -                                      |
| **预览版** |  _no_   | 预览版不提供第三方分享接口             |
