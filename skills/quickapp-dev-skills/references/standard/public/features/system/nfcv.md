# NfcV `1100+`

## 方法

### NfcV.close(OBJECT)

断开连接

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
nfcv.close({
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

### NfcV.connect(OBJECT)

连接 NFC 标签

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
nfcv.connect({
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

### NfcV.getMaxTransceiveLength(OBJECT)

获取最大传输长度

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

##### success 返回值对象参数：

| 参数名    | 类型    | 说明                           |
| --------- | ------- | ------------------------------ |
| length    | number  | 最大传输长度                   |

#### 示例：

```javascript
nfcv.getMaxTransceiveLength({
  success: function(data) {
    console.log(`handling success, length = ` + data.length)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

### NfcV.isConnected(OBJECT)

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
nfcv.isConnected({
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

### NfcV.transceive(OBJECT)

发送数据

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| data     | ArrayBuffer                       | 否   | 需要传递的二进制数据 |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

##### success 返回值对象参数：

| 参数名       | 类型        | 说明                           |
| ------------ | ----------- | ------------------------------ |
| data         | ArrayBuffer | 标签返回结果                   |

#### 示例：

```javascript
let arrayBuffer = new ArrayBuffer(1)
let dataView = new DataView(arrayBuffer)
dataView.setUint8(0, 0x60)
nfcv.transceive({
  data: arrayBuffer,
  success: function(data) {
    console.log(`handling success, result = ` + new Int8Array(data.data))
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log(`handling complete`)
  }
})
```

