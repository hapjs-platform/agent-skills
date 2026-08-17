# MifareClassic `1100+`

## 方法

### MifareClassic.close(OBJECT)

断开连接

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
mifareclassic.close({
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

### MifareClassic.connect(OBJECT)

连接 NFC 标签

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
mifareclassic.connect({
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

### MifareClassic.getMaxTransceiveLength(OBJECT)

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
mifareclassic.getMaxTransceiveLength({
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

### MifareClassic.isConnected(OBJECT)

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
mifareclassic.isConnected({
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

### MifareClassic.setTimeout(OBJECT)

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
mifareclassic.setTimeout({
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

### MifareClassic.transceive(OBJECT)

发送数据

对于MifareClassic的分块读写：
- 0x30：读取某个块的数据，指令[1位] + 块号[1位]
- 0xA0：往某个块区写入数据，指令[1位] + 块号[1位] + 数据[16位]
- 0x60：用密钥A对扇区进行身份验证，指令[1位] + 扇区[1位] + tagID[4位] + 秘钥[6位]
- 0x61：用密钥B对扇区进行身份验证，指令[1位] + 扇区[1位] + tagID[4位] + 秘钥[6位]
- 0xC1：递增值块，将结果存储在标记的临时块中，指令[1位] + 块号[1位] + 数据[4位]
- 0xC0：递减值块，将结果存储在标记的临时块中，指令[1位] + 块号[1位] + 数据[4位]
- 0xC2：将块区中的数据复制到临时块中，指令[1位] + 块号[1位]
- 0xB0：将临时块中的数据复制到指定的块区中，指令[1位] + 块号[1位]

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
dataView.setUint8(0, 0x00)
mifareclassic.transceive({
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

