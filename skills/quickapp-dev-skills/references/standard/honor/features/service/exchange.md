# 数据共享 exchange（荣耀扩展）

> 该接口为对公共接口 [`@service.exchange`](../../../public/features/service/exchange.md) 的**荣耀扩展**，新增 `registerObserver` / `unregisterObserver` 注册监听能力，支持同签名的卡片之间、卡片与快应用之间、快应用之间动态监听数据变化。

## 接口声明

```json
{ "name": "service.exchange" }
```

## 导入模块

```javascript
import exchange from '@service.exchange'
// 或
const exchange = require('@service.exchange')
```

## 接口定义

> **支持版本**
> - 卡片：`6056+`
> - 快应用 App：`1120+`

### exchange.registerObserver(OBJECT)

注册回调监听事件，动态获取同签名应用发布的数据变化。

> - 初始化时不会执行回调，只有数据变化后才执行。
> - 适用场景：卡片之间、App 之间、卡片与 App 之间的数据发布与监听。

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                 |
| -------- | -------- | ---- | -------------------------------------------------------------------- |
| package  | String   | 是   | 需要监听的应用包名                                                   |
| scope    | String   | 否   | 监听的数据发布空间：`application`（默认）、`vendor`（`1080+`）、`global` |
| sign     | String   | 是   | 需要监听的应用签名 SHA-256                                           |
| key      | String   | 是   | 数据的 key                                                           |
| success  | Function | 否   | 监听的数据发生变化后的回调                                           |
| fail     | Function | 否   | 监听失败的回调                                                       |

##### success 返回值：

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| value  | String | 数据变化后的值 |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 内部错误 |
| 202    | 参数错误 |

#### 示例：

```javascript
// 数据监听侧：初始化数据用 exchange.get 读取，数据更新通过 exchange.registerObserver 监听
exchange.registerObserver({
  package: 'com.example',
  sign: '7a12ecxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 数据发布侧签名 SHA-256
  key: 'token',
  success: (ret) => {
    console.log(`handling success, value = ${ret.value}`)
  },
  fail: (data, code) => {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### exchange.unregisterObserver(OBJECT)

取消回调监听事件。

#### 参数：

| 参数名   | 类型     | 必填 | 说明         |
| -------- | -------- | ---- | ------------ |
| package  | String   | 是   | 取消监听的应用包名 |
| key      | String   | 是   | 数据的 key   |
| success  | Function | 否   | 取消监听成功的回调 |
| fail     | Function | 否   | 取消监听失败的回调 |

##### success 返回值：

| 返回值   | 说明                          |
| -------- | ----------------------------- |
| success  | 成功返回固定字符串 `success`  |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 200    | 内部错误 |
| 202    | 参数错误 |

#### 示例：

```javascript
exchange.unregisterObserver({
  package: 'com.example',
  key: 'token',
  success: (ret) => {
    console.log(`handling success: ${ret}`)
  },
  fail: (data, code) => {
    console.log(`handling fail, code = ${code}`)
  }
})
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101505
