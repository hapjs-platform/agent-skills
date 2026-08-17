# 推送 push

## 接口声明

```json
{ "name": "service.push" }
```

## 导入模块

```javascript
import push from '@service.push' 或 const push = require('@service.push')
```

## 接口定义

### push.getProvider()`1000+`

获取服务提供商。

#### 参数：

无

#### 返回值：

字符串，服务提供商的代号，如厂商的英文品牌名称，假如无此服务则返回空字符串

#### 示例：

```javascript
console.log(push.getProvider())
```

### push.subscribe(OBJECT)

订阅 push，后续可以收到 push 消息（一般可在应用初始化的地方进行调用。比如在 app 的 onCreate 方法中调用。）

#### 参数：

| 参数名   | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| success  | Function | 否   | 成功回调               |
| fail     | Function | 否   | 失败回调，返回失败原因 |
| complete | Function | 否   | 执行结束后的回调       |

##### success 返回值：

| 参数名 | 类型   | 说明                                                  |
| ------ | ------ | ----------------------------------------------------- |
| regId  | String | PushService 返回的注册 id，可用于针对某个用户发送消息 |

#### 示例：

```javascript
push.subscribe({
  success: function(data) {
    console.log(
      `push.subscribe succeeded, result data = ${JSON.stringify(data)}`
    )
  },
  fail: function(data, code) {
    console.log(
      `push.subscribe failed, result data = ${JSON.stringify(
        data
      )}, code = ${code}`
    )
  },
  complete: function() {
    console.log('push.subscribe completed')
  }
})
```

### push.unsubscribe(OBJECT)

取消订阅（一般不建议调用，调用后 regId 失效，需要重新订阅获取新的 regId）

#### 参数：

| 参数名   | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| success  | Function | 否   | 成功回调               |
| fail     | Function | 否   | 失败回调，返回失败原因 |
| complete | Function | 否   | 执行结束后的回调       |

#### 示例：

```javascript
push.unsubscribe({
  success: function(data) {
    console.log(
      `push.unsubscribe succeeded, result data = ${JSON.stringify(data)}`
    )
  },
  fail: function(data, code) {
    console.log(
      `push.unsubscribe failed, result data = ${JSON.stringify(
        data
      )}, code = ${code}`
    )
  },
  complete: function() {
    console.log('push.unsubscribe completed')
  }
})
```

### push.on(OBJECT)

添加 push 事件回调（透传消息的 payload 内容可在此回调中收到）

- 注意： OPPO 快应用平台在1113版本开始支持此特性

#### 参数：

| 参数名   | 类型     | 必填 | 说明              |
| -------- | -------- | ---- | ----------------- |
| callback | Function | 是   | push 事件回调处理 |

##### callback 返回值：

| 参数名    | 类型   | 说明             |
| --------- | ------ | ---------------- |
| messageId | String | 消息 id          |
| data      | String | 消息内容 payload |

#### 示例：

```javascript
push.on({
  callback: function(ret) {
    console.log(`received pass through message, ret = ${JSON.stringify(ret)}`)
  }
})
```

### push.off(OBJECT)

移除 push 事件回调，`push.on`中的`callback`不会再收到透传内容

- 注意： OPPO 快应用平台在1113版本开始支持此特性

#### 参数：

无

#### 示例：

```javascript
push.off()
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注                                                                                        |
| ---------- | :-----: | ------------------------------------------------------------------------------------------- |
| 小米       | **YES** | [小米消息推送服务](https://dev.mi.com/console/appservice/push.html)                         |
| 中兴       |  _no_   | -                                                                                           |
| 华为       | `1020+` | [华为开发者联盟](https://developer.huawei.com/consumer/cn/console#/serviceCards/AppService) |
| 金立       | `1010+` | [金立快应用开发者中心](http://devquickapp.gionee.com/)                                      |
| 联想       |  _no_   | -                                                                                           |
| 魅族       | `1010+` | [魅族集成推送服务](https://open.flyme.cn/service?type=push)                           |
| 努比亚     |  _no_   | -                                                                                           |
| OPPO       | **YES** | [OPPO 消息推送服务](https://push.oppo.com/)                                                 |
| vivo       | **YES** | [vivo 消息推送服务](https://dev.vivo.com.cn/documentCenter/doc/466)                         |
| 一加       |    -    | -                                                                                           |
| **预览版** |  _no_   | 预览版不提供推送接口                                                                        |
