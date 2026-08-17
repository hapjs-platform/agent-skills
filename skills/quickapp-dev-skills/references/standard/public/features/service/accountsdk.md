# quickapp-account-sdk-java

## 背景
快应用的账号接口协议不一致，开发者接入的成本比较高。为了解决这个问题，通过该sdk提供统一的方法，让开发者快速便捷的获取账号信息。

## 集成方式
注意事项：
sdk基于jdk1.8开发，建议集成的项目使用的jdk的版本不低于1.8

maven
```agsl
<dependency>
    <groupId>com.quickapp.union</groupId>
    <artifactId>account-sdk-java</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>

```

## 使用方式

### 原生方式

#### oppo
```
  // OPPO的相关配置
  Credential credential = new Credential();
  Credential.Config oppoConfig = new Credential.Config();
  oppoConfig.setAk("your appId");
  oppoConfig.setSk("your appSecret");
  credential.addConfig(Source.OPPO, oppoConfig);
  Client client = Client.getInstance(credential);
  
  // 通过code获取Token
  String code = "your authorization code here";
  Token accessToken = client.getTokenByCode(code, Source.OPPO);
  
  // 刷新Token
  String refreshToken = "your refresh token here";
  Token accessToken = client.getTokenByRefreshToken(refreshToken, Source.OPPO);
  
  // 通过code获取用户信息
  String code = "your authorization code here";
  User user = client.getUserByCode(code, Source.OPPO);
  
  // 通过accessToken获取用户信息  --- 该方法只能获取用户的基本信息和手机号，openId和unionId无法获取！！
  AccessToken accessToken = new AccessToken();
  accessToken.setAccessToken("your access token here");
  User user = client.getUserByToken(accessToken, Source.OPPO);
```

#### vivo
```
  // vivo的相关配置
  Credential credential = new Credential();
  Credential.Config config = new Credential.Config();
  // 请正确配置您的appId与appKey参数，可从vivo开放平台->管理中心->快应用->账号服务->接入参数中获取
  config.setAk("your appId");
  config.setSk("your appKey");
  credential.addConfig(Source.VIVO, config);
  Client client = Client.getInstance(credential);
  
  // 通过code获取Token
  Token token = client.getTokenByCode("your authorization code", Source.VIVO);
  String accessToken = token.getAccessToken();
  String sessionKey = token.getRefreshToken();
  
  // 刷新Token
  // 注：当前vivo账号不支持在刷新token时获取新的sessionKey。
  Token token = client.getTokenByRefreshToken("your refresh token", Source.VIVO);
  String accessToken = token.getAccessToken();
  
  // 通过code获取用户信息
   User user = client.getUserByCode("your authorization code", Source.VIVO);
   
  // 通过accessToken获取用户信息
  // 注：通过getTokenByCode接口获取
  AccessToken token = new AccessToken();
  token.setAccessToken("your access token");
  token.setSessionKey("your session key");
  User user = client.getUserByToken(token, Source.VIVO);
  
  // 注：本sdk中的vivo接口根据vivo账号原始api集成，关于vivo账号原始api的更多信息可查阅vivo开放平台文档：https://dev.vivo.com.cn/documentCenter/doc/139#s-rxcvccv8
```

#### xiaomi
> 参考文档：
> https://dev.mi.com/xiaomihyperos/documentation/detail?pId=1708

> https://dev.mi.com/xiaomihyperos/documentation/detail?pId=1517

```
  // XiaoMi的相关配置
  Credential credential = new Credential();
  Credential.Config config = new Credential.Config();
  // 申请应用时分配的应用 ID，可以在小米开发者开放平台应用详情页获取
  config.setAk("your AppID");
  // 申请应用时分配的 AppSecret
  config.setSk("your AppSecret");
  // 回调地址, 必须和申请应用是填写的一致(参数部分可不一致)
  config.setRedirectUrl("your callback url");
  credential.addConfig(Source.XIAOMI, config);
  Client client = Client.getInstance(credential);
  
  // 通过code获取Token
  String code = "your authorization code here";
  Token accessToken = client.getTokenByCode(code, Source.XIAOMI);
  
  // 刷新Token
  String refreshToken = "your refresh token here";
  Token accessToken = client.getTokenByRefreshToken(refreshToken, Source.XIAOMI);
  
  // 通过code获取用户信息
  String code = "your authorization code here";
  // 会返回以下字段：
  // nickName - 小米账号昵称
  // openId - 小米用户在您 APP 的唯一标识
  // unionId - 小米用户在您的所有 APP 范围内唯一标识
  // avatars - 头像
  User user = client.getUserByCode(code, Source.XIAOMI);
  
  // 通过accessToken获取用户信息 
  AccessToken accessToken = new AccessToken();
  accessToken.setAccessToken("your access token here");
  // 只会返回以下字段（比getUserByCode接口少了openId）：
  // nickName - 小米账号昵称
  // unionId - 小米用户在您的所有 APP 范围内唯一标识
  // avatars - 头像
  User user = client.getUserByToken(accessToken, Source.XIAOMI);
```

#### 支持多家厂商的配置，SDK可以随意获取指定厂商的账号信息
```
  // 多家厂商配置
  Credential credential = new Credential();
  // 加入oppo配置
  Credential.Config oppo = new Credential.Config();
  oppo.setAk("your oppo ak");
  oppo.setSk("your oppo sk");
  credential.addConfig(Source.OPPO, oppo);
  // 加入vivo配置
  Credential.Config oppoConfig = new Credential.Config();
  vivo.setAk("your vivo ak");
  vivo.setSk("your vivo sk");
  credential.addConfig(Source.VIVO, vivo);
  // 加入xiaomi配置
  Credential.Config oppoConfig = new Credential.Config();
  xiaomi.setAk("your xiaomi ak");
  xiaomi.setSk("your xiaomi sk");
  credential.addConfig(Source.XIAOMI, xiaomi);
  
  Client client = Client.getInstance(credential);
  // 获取oppo账号
  User oppoUser = client.getUserByCode("your oppo code", Source.OPPO);
  // 获取vivo账号
  User vivoUser = client.getUserByCode("your vivo code", Source.VIVO);
  // 获取xiaomi账号
  User xiaomiUser = client.getUserByCode("your xiaomi code", Source.XIAOMI);
  
```

## 设计规范
* config:
  * Credential: 定义不同厂商的配置
  * HttpConfig：定义http的性能参数
* domain：定义统一的数据规范
* enums: 枚举类
* exception：异常定义
* handler: 采用工厂模式，通过AbstractHandler + IHandler来扩展不同厂商的接口实现
* http: http的方法封装
* util: 工具类封装

