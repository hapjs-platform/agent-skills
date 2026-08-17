# 支付 pay

## 接口声明

```json
{ "name": "service.pay" }
```

## 导入模块

```javascript
import pay from '@service.pay' 或 const pay = require('@service.pay')
```

## 接口定义

### pay.getProvider()`1000+`

获取服务提供商。

#### 参数：

无

#### 返回值：

字符串，服务提供商的代号，如厂商的英文品牌名称，假如无此服务则返回空字符串

#### 示例：

```javascript
console.log(pay.getProvider())
```

### pay.pay(OBJECT)

使用支付完成付款

#### 参数：

| 参数名    | 类型     | 必填 | 说明             |
| --------- | -------- | ---- | ---------------- |
| orderInfo | String   | 是   | 订单信息         |
| success   | Function | 否   | 成功回调         |
| fail      | Function | 否   | 失败回调         |
| complete  | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名  | 类型    | 说明       |
| ------- | ------- | ---------- |
| code    | Integer | 返回状态码 |
| message | String  | 消息内容   |
| result  | String  | 支付结果   |

##### fail 返回值：

| 参数名  | 类型    | 说明       |
| ------- | ------- | ---------- |
| code    | Integer | 返回状态码 |
| message | String  | 消息内容   |

fail 异常码返回，不同的厂商提供的异常码会有差异，具体的异常码需要和厂商支付接口对接

#### 示例：

```javascript
pay.pay({
  orderInfo: 'order1',
  success: function(data) {
    console.log(`handling success: ${data.code}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注                                                                                        |
| ---------- | :-----: | ------------------------------------------------------------------------------------------- |
| 小米       | **YES** | [商务代表](mailto:lidan7@xiaomi.com)                                                        |
| 中兴       |  _no_   | -                                                                                           |
| 华为       | **YES** | [华为开发者联盟](https://developer.huawei.com/consumer/cn/console#/serviceCards/AppService) |
| 金立       |  _no_   | -                                                                                           |
| 联想       |  _no_   | -                                                                                           |
| 魅族       |  _no_   | -                                                                                           |
| 努比亚     |  _no_   | -                                                                                           |
| OPPO       | `1010+` | [OPPO 开放平台](https://open.oppomobile.com/)                                               |
| vivo       | **YES** | [vivo 开发者平台](https://dev.vivo.com.cn/)                                                 |
| 一加       |    -    | -                                                                                           |
| **预览版** |  _no_   | 预览版不提供支付接口                                                                        |
