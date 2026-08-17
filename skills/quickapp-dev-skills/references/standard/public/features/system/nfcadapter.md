# NFCAdapter `1100+`

## 概述

NFCAdapter 对象用于扫描和监听 NFC 标签，以及获取对应的标签实例的 API。

## 方法

### NFCAdapter.startDiscovery(OBJECT)

开始扫描NFC标签

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
nfcadapter.startDiscovery({
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

### NFCAdapter.stopDiscovery(OBJECT)

关闭NFC标签扫描

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| success  | Function                          | 否   | 成功回调   |
| fail     | Function                          | 否   | 失败回调   |
| complete | Function                          | 否   | 调用结束   |

#### 示例：

```javascript
nfcadapter.stopDiscovery({
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

### onDiscovered(function callback)

监听 NFC Tag

#### 参数：

| 参数名   | 类型                              | 必填 | 说明       |
| -------- | --------------------------------- | ---- | ---------- |
| callback | Function                         | 否   | 监听 NFC Tag   |

##### callback参数：

| 参数名   | 类型                              | 说明                                       |
| -------- | --------------------------------- | ------------------------------------------ |
| techs    | Array                             | tech 数组，用于匹配NFC卡片具体可以使用什么标准（NfcA等实例）处理 |
| id       | ArrayBuffer                       | tag ID                                     |
| messages | Array                             | NdefMessage 数组, 消息格式为 {id: ArrayBuffer, type: ArrayBuffer, payload: ArrayBuffer}|

#### 示例：

```javascript
nfcadapter.onDiscovered({
  callback: function(data) {
    if (data.id) {
      console.log(`id  = ` + new Int8Array(data.id))
    } else {
      console.log(`null of id`)
    }

    if (data.messages) {
      let cordsArray = data.messages[0].records;
      cordsArray.find(item => {
        console.log('payload = ' + new Int8Array(item.payload))
        console.log('id = ' + new Int8Array(item.id))
        console.log('type = ' + new Int8Array(item.type))
      });
    } else {
      console.log(`null of message`)
    }

    if (data.techs.length != 0) {
      data.techs.forEach((res, index) => {
        console.log("tag = " + res);
      });
    }
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### NFCAdapter.offDiscovered()

取消监听 NFC Tag

#### 参数：

无

#### 示例：

```javascript
nfcadapter.offDiscovered()
```

### NFCAdapter.getNdef()

获取 Ndef 实例

#### 参数：

无

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `Ndef`      | 返回一个 Ndef 对象，请参考 [Ndef](./nfcndef.md) 对象         |

#### 示例：

```javascript
ndef = nfcadapter.getNdef()
```

### NFCAdapter.getNfcA()

获取 NfcA 实例

#### 参数：

无

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `NfcA`      | 返回一个 NfcA 对象，请参考 [NfcA](./nfca.md) 对象            |

#### 示例：

```javascript
nfca = nfcadapter.getNfcA()
```

### NFCAdapter.getNfcB()

获取 NfcB 实例

#### 参数：

无

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `NfcB`      | 返回一个 NfcB 对象，请参考 [NfcB](./nfcb.md) 对象            |

#### 示例：

```javascript
nfcb = nfcadapter.getNfcB()
```

### NFCAdapter.getNfcF()

获取 NfcF 实例

#### 参数：

无

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `NfcF`      | 返回一个 NfcF 对象，请参考 [NfcF](./nfcf.md) 对象            |

#### 示例：

```javascript
nfcf = nfcadapter.getNfcF()
```

### NFCAdapter.getNfcV()

获取 NfcV 实例

#### 参数：

无

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `NfcV`      | 返回一个 NfcV 对象，请参考 [NfcV](./nfcv.md) 对象            |

#### 示例：

```javascript
nfcv = nfcadapter.getNfcV()
```

### NFCAdapter.getIsoDep()

获取 IsoDep 实例

#### 参数：

无

#### 返回值：

| 类型        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `IsoDep`      | 返回一个 IsoDep 对象，请参考 [IsoDep](./nfcisodep.md) 对象 |

#### 示例：

```javascript
isodep = nfcadapter.getIsoDep()
```

### NFCAdapter.getMifareClassic()

获取 MifareClassic 实例

#### 参数：

无

#### 返回值：

| 类型            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `MifareClassic` | 返回一个 MifareClassic 对象，请参考 [MifareClassic](./nfcmifareclassic.md) 对象 |

#### 示例：

```javascript
mifareclassic = nfcadapter.getMifareClassic()
```

### NFCAdapter.getMifareUltralight()

获取 MifareUltralight 实例

#### 参数：

无

#### 返回值：

| 类型               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| `MifareUltralight` | 返回一个 MifareUltralight 对象，请参考 [MifareUltralight](./nfcmifareultralight.md) 对象 |

#### 示例：

```javascript
mifareultralight = nfcadapter.getMifareUltralight()
```

