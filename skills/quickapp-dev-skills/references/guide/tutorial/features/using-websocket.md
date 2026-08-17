# WebSocket 教程

> 了解如何使用 WebSocket

通过本节，你将学会：

- [创建连接](#创建连接)
- [向服务器发送数据](#向服务器发送数据)
- [接收服务器发送的消息](#接收服务器发送的消息)
- [关闭连接](#关闭连接)

## 使用方法

### 创建连接

为了使用 WebSocket 协议通信，你需要需先通过`websocketfactory.create()`创建一个 WebSocket 对象；这将会自动地尝试建立与服务器的连接。

```javascript
ws = websocketfactory.create({
  url: 'wss://echo.websocket.org',
  header: {
    'content-type': 'application/json'
  },
  protocols: ['protocol']
})
```

参数说明：

| 参数名    | 说明                                                                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url       | 要连接的 URL。这应当是 WebSocket 服务器会响应的 URL。                                                                                                                   |
| header    | 附加请求头。这些键值对会被添加到请求头中，服务器可以从中读取信息。                                                                                                      |
| protocols | 一个或多个协议字符串。这些字符串用来指定子协议，这样一个服务器就可以实现多个 WebSocket 子协议（比如你可能希望一个服务器可以根据指定的 protocol 来应对不同的互动情况）。 |

### 向服务器发送数据

一旦你的连接打开完成，你就可以向服务器发送数据了。对每一个要发送的消息使用 `WebSocket` 对象的 `send()` 方法：

```javascript
ws.send({
  data:'send message',
  success:function(){
    console.log(`send success`)
  },
  fail:function(){
    console.log(`send fail`)
  }
})
```

### 接收服务器发送的消息

WebSockets 是一个基于事件的 API；收到消息的时候，一个 "message" 消息会被发送到 onmessage 函数。为了开始监听传入数据，可以进行如下操作：

```javascript
ws.onmessage = function (data) {
  console.log(`message is ${data.data}`)
}
```

### 关闭连接

当你不需要再用 WebSocket 连接了,调用 `WebSocket` 对象的 `close()`方法：

```javascript
ws.close({
  code:1000,
  reason:'close as normal',
  success:function(){
    console.log(`close success`)
  },
  fail:function(){
    console.log(`close fail`)
  }
})
```

参数说明：

| 参数名 | 说明                                     |
| ------ | ---------------------------------------- |
| code   | 关闭的状态码。如果不填写默认值为`1000`。 |
| reason | 连接关闭的原因。                         |

**示例代码如下**：

```html
<template>
  <div class="doc-page">
    <div class="item-container">
      <input type="button" class="btn" onclick="create" value="创建websocket实例" />
      <input type="text" class="input-text" onchange="handleChange" placeholder="请输入" />
      <input type="button" class="btn" onclick="send" value="发送消息" />
      <input type="button" class="btn" onclick="close" value="关闭连接" />
    </div>
  </div>
</template>

<script>
  import prompt from '@system.prompt'
  import websocketfactory from '@system.websocketfactory'

  let ws = null
  let isOpen = false
  export default {
    private: {
      message: ''
    },
    create() {
      //创建websocket实例
      ws = websocketfactory.create({
        url: 'wss://echo.websocket.org',
        header: {
          'content-type': 'application/json'
        },
        protocols: ['protocol']
      })

      //连接打开事件的监听
      ws.onopen = function () {
        isOpen = true
        prompt.showToast({
          message: 'connect open'
        })
      }

      //消息事件的监听
      ws.onmessage = function (data) {
        prompt.showToast({
          message: `message is ${data.data}`
        })
      }

      //错误事件的监听
      ws.onerror = function () {
        prompt.showToast({
          message: 'error'
        })
      }

      //关闭连接事件的监听
      ws.onclose = function (data) {
        prompt.showToast({
          message: 'onclose:data.code = '+data.code+', data.reason = '+data.reason+', data.wasClean = '+data.wasClean
        })
      }
    },
    handleChange(e) {
      this.message = e.value
    },
    //发送消息
    send() {
      isOpen && ws.send({
        data: this.message,
        success: function () {
          prompt.showToast({
            message: 'send success'
          })
        },
        fail: function () {
          prompt.showToast({
            message: 'send fail'
          })
        }
      })
    },
    //关闭连接
    close() {
      isOpen && ws.close({
        success: function () {
          isOpen = false
          prompt.showToast({
            message: 'close success'
          })
        },
        fail: function () {
          prompt.showToast({
            message: 'close fail'
          })
        }
      })
    }
  }
</script>
```

## 多实例

WebSocket 支持创建多个实例，如果开发者要创建多个 WebSocket 实例，需要调用多次`websocketfactory.create()`方法，并自行管理创建的 WebSocket 对象。
