# NFC `1100+`

实现NFC的相关功能

## 接口声明

```json
{ "name": "system.nfc" }
```

## 导入模块

```javascript
import nfc from '@system.nfc' 或 const nfc = require('@system.nfc')
```

## 接口定义

### nfc.getNFCAdapter()

获取客户端NFC适配器

#### 参数：

无

#### 返回值：

| 类型         | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| `NFCAdapter` | 返回一个 NFCAdapter 对象，请参考 [NFCAdapter](./nfcadapter.md) 对象 |

#### 示例：

```javascript
import nfc from '@system.nfc'

nfcadapter = nfc. getNFCAdapter()
```

## 错误码

| 错误码 | 说明                                  |
| ------ | ------------------------------------- |
| 0      | 成功                                  |
| 10000  | 设备不支持NFC                         |
| 10001  | 系统NFC开关未打开                     |
| 10010  | 未知错误                              |
| 10011  | 参数无效                              |
| 10012  | 参数解析成NdefMessage失败             |
| 10013  | 未扫描到NFC标签                       |
| 10014  | 连接失败                              |
| 10015  | 相关读写操作失败                      |
| 10016  | 标签未连接                            |
| 10017  | 当前标签不支持改功能                  |
| 10018  | 标签容量不够                          |

## 主要操作过程：

下面以往 NfcA 卡片写入 apdu 指令为例：
- 1）调用tt.getNFCAdapter()获取NFC适配器实例
- 2）调用NFCAdapter.onDiscovered(function callback)注册贴卡监听回调
- 3）调用NFCAdapter.startDiscovery(Object object)开始监听贴卡
- 4）贴卡，onDiscovered回调
- 5）根据onDiscovered回调res对象的techs字段匹配到卡片支持NFC-A标准
- 6）通过NFCAdapter.getNfcA()获取NfcA实例
- 7）使用NfcA实例进行读写
- 8）调用NfcA.connect()和NFC卡片建立连接
- 9）调用NfcA.transceive(Object object)往NFC卡片写入apdu指令并接收卡片返回数据
- 10）读写完毕，调用NfcA.close()断开连接
- 11）调用NFCAdapter.stopDiscovery(Object object)结束监听贴卡

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

