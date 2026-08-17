# 锁屏 keyguard `1090+`

实现系统锁屏的相关功能

## 接口声明

```json
{ "name": "system.keyguard" }
```

## 导入模块

```javascript
import keyguard from '@system.keyguard' 或 const keyguard = require('@system.keyguard')
```

## 接口定义

### keyguard.getKeyguardLockedStatus(OBJECT)

获取快应用当前环境是否为锁屏状态

#### 参数：

| 参数名  | 类型     | 必填 | 说明                               |
| ------- | -------- | ---- | ---------------------------------- |
| success | Function | 否   | 成功回调，返回值为一个对象         |
| fail    | Function | 否   | 失败回调，返回值为错误码与错误信息 |

##### success 返回值对象参数：

| 参数名           | 类型    | 说明                                                    |
| ---------------- | ------- | ------------------------------------------------------- |
| isKeyguardLocked | Boolean | true 当前快应用在锁屏状态；false 当前快应用在非锁屏状态 |

##### fail 返回值：

| 参数名 | 类型    | 说明     |
| ------ | ------- | -------- |
| data   | String  | 错误信息 |
| code   | Integer | 错误编码 |

#### 示例：

```javascript
import keyguard from '@system.keyguard'

export default {
  onShow() {
    keyguard.getKeyguardLockedStatus({
      success: result => {
        console.log('当前应用是否为锁屏状态：', result.isKeyguardLocked)
      },
      fail: (data, code) => {
        console.log(`get isKeyguardLocked fail, errMsg = ${data}`)
        console.log(`get isKeyguardLocked fail, errCode = ${code}`)
      }
    })
  }
}
```
