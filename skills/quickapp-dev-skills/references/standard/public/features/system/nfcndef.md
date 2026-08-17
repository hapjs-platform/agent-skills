# Ndef `1100+`

## 方法

### Ndef.close(OBJECT)

断开连接

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
ndef.close({
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

### Ndef.connect(OBJECT)

连接 NFC 标签

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
ndef.connect({
  success: function() {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

### Ndef.isConnected(OBJECT)

获取当前标签的连接状态

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

##### success 返回值对象参数：

| 参数名       | 类型    | 说明                           |
| ------------ | ------- | ------------------------------ |
| isConnected  | Boolean | 是否已经建立了连接             |

#### 示例：

```javascript
ndef.isConnected({
  success: function(data) {
    console.log(`handling success, isConnected = ` + data.isConnected)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

### Ndef.setTimeout(OBJECT)

设置超时时间

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| timeout  | Number                            | 是   | 超时时间（ms） |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
ndef.setTimeout({
  timeout: 1000,
  success: function(data) {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

### Ndef.writeNdefMessage(OBJECT)

发送数据

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| uris     | Array                             | 否   | uri数组    |
| texts    | Array                             | 否   | text数组   |
| records  | Array                             | 否   | 二进制对象数组, 需要指明 id, type 以及 payload (均为 ArrayBuffer 类型) |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
ndef.writeNdefMessage({
  texts: ["123"],
  success: function(data) {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

## 备注

读取 Ndef 信息，请从 [NFCAdapter.onDiscovered()](./nfcadapter.md) 的 messages 对象中获取。

