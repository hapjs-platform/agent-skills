# MifareUltralight `1100+`

## 方法

### MifareUltralight.close(OBJECT)

断开连接

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
mifareultralight.close({
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

### MifareUltralight.connect(OBJECT)

连接 NFC 标签

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
mifareultralight.connect({
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

### MifareUltralight.getMaxTransceiveLength(OBJECT)

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
mifareultralight.getMaxTransceiveLength({
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

### MifareUltralight.isConnected(OBJECT)

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
mifareultralight.isConnected({
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

### MifareUltralight.setTimeout(OBJECT)

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
mifareultralight.setTimeout({
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

### MifareUltralight.transceive(OBJECT)

发送数据

对于MifareUltralight的分页读写:
- 0x30：读取某页的数据，指令[1位] + 页号[1位]
- 0xA2：往某页写入数据，指令[1位] + 页号[1位] + 数据

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
let arrayBuffer = new ArrayBuffer(2)
let dataView = new DataView(arrayBuffer)
dataView.setUint8(0, 0x30)
dataView.setUint8(1, 0x00)
mifareultralight.transceive({
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

