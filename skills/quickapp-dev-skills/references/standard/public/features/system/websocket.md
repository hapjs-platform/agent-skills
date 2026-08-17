# WebSocketFactory `1020+`

## 接口声明

```json
{ "name": "system.websocketfactory" }
```

## 导入模块

```javascript
import websocketfactory from '@system.websocketfactory' 或 const websocketfactory = require('@system.websocketfactory')
```

## 接口定义

### 方法

### websocketfactory.create(OBJECT)

创建 websocket 实例

#### 参数：

| 参数名    | 类型        | 必填 | 说明                              |
| --------- | ----------- | ---- | --------------------------------- |
| url       | String      | 是   | 请求 url， 必须是 wss 或 ws 协议  |
| header    | Object      | 否   | 请求头，header 中不能设置 Referer，User-Agent设置在`1040`版本开始支持 |
| protocols | StringArray | 否   | 子协议组                          |

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `WebSocket` | 返回一个 WebSocket 对象，请参考 [WebSocket](#websocket) 对象 |

#### 示例：

```javascript
ws = websocketfactory.create({
  url: 'ws://test:8088',
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol']
})
```

---

# <span id="websocket"> WebSocket `1020+`

## 概述

WebSocket 对象提供了用于创建和管理 WebSocket 连接，以及可以通过该连接发送和接收数据的 API。

## 方法

### WebSocket.send(OBJECT)

向服务器发送数据

#### 参数：

| 参数名  | 类型                              | 必填 | 说明       |
| ------- | --------------------------------- | ---- | ---------- |
| data    | String &#124; ArrayBuffer `1030+` &#124; TypedArray `1080+` | 是   | 发送的消息 |
| success | Function                          | 否   | 成功回调   |
| fail    | Function                          | 否   | 失败回调   |

#### 示例：

```javascript
ws.send({
  data: 'send message',
  success: function() {
    console.log(`send success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### WebSocket.close(OBJECT)

关闭当前连接

#### 参数：

| 参数名  | 类型     | 必填 | 说明                         |
| ------- | -------- | ---- | ---------------------------- |
| code    | Number   | 否   | 关闭链接的状态号 ，默认 1000 |
| reason  | String   | 否   | 关闭的原因                   |
| success | Function | 否   | 接口调用成功的回调函数       |
| fail    | Function | 否   | 接口调用失败的回调函数       |

#### 示例：

```javascript
ws.close({
  code: 1000,
  reason: 'close as normal',
  success: function() {
    console.log(`close success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 属性

### WebSocket.onopen

用于指定连接成功后的回调函数

#### 参数：

| 参数名   | 类型     | 必填 | 说明         |
| -------- | -------- | ---- | ------------ |
| callback | Function | 否   | 打开连接回调 |

#### 示例：

```javascript
ws.onopen = function() {
  console.log(`connect open`)
}
```

### WebSocket.onmessage

用于指定当从服务器接受到信息时的回调函数

#### 参数：

| 参数名   | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| callback | Function | 否   | 服务器返回消息事件回调 |

#### callback 参数：

| 参数名 | 类型                              | 说明                                       |
| ------ | --------------------------------- | ------------------------------------------ |
| data   | String &#124; ArrayBuffer `1030+` | 监听器接收到的消息, 消息类型与发送类型一致 |

#### 示例：

```javascript
ws.onmessage = function(data) {
  console.log(`message is ${data.data}`)
}
```

### WebSocket.onclose

用于指定连接关闭后的回调函数

#### 参数：

| 参数名   | 类型     | 必填 | 说明               |
| -------- | -------- | ---- | ------------------ |
| callback | Function | 否   | 关闭连接事件回调。 |

#### callback 参数：

| 参数名   | 类型    | 说明                     |
| -------- | ------- | ------------------------ |
| code     | Number  | 服务器返回关闭的状态码。 |
| reason   | String  | 服务器返回的关闭原因。   |
| wasClean | Boolean | 是否正常关闭。           |

#### 示例：

```javascript
ws.onclose = function(data) {
  console.log(
    `onclose:data.code = ${data.code}, data.reason = ${
      data.reason
    }, data.wasClean = ${data.wasClean}`
  )
}
```

### WebSocket.onerror

用于指定连接失败后的回调函数

#### 参数：

| 参数名   | 类型     | 必填 | 说明         |
| -------- | -------- | ---- | ------------ |
| callback | Function | 否   | 连接错误回调 |

#### callback 参数：

| 参数名 | 类型   | 说明                 |
| ------ | ------ | -------------------- |
| data   | String | 监听器接收到的消息。 |

#### 示例：

```javascript
ws.onerror = function(data) {
  console.log(`onerror data.data = ${data.data}`)
}
```

## 后台运行限制
无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。