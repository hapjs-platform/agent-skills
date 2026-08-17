# 支付宝支付 alipay

## 接口声明

```json
{ "name": "service.alipay" }
```

## 导入模块

```javascript
import alipay from '@service.alipay' 或 const alipay = require('@service.alipay')
```

## 接口定义

### alipay.pay(OBJECT)

使用支付宝完成支付

#### 参数：

| 参数名    | 类型     | 必填 | 说明                                                                                                                                                                 |
| --------- | -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderInfo | String   | 是   | 服务端生成的订单信息，参考支付宝的[请求参数说明文档](https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.x7kkCI&treeId=204&articleId=105465&docType=1) |
| callback  | Function | 否   | 支付结果回调，格式参考支付宝的[通知参数说明文档](https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.xN1NnL&treeId=204&articleId=105302&docType=1)     |

#### 示例：

```javascript
alipay.pay({
  orderInfo: 'order1',
  callback: function(ret) {
    console.log('handling callback')
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注 |
| ---------- | :-----: | ---- |
| 小米       | **YES** | -    |
| 中兴       | **YES** | -    |
| 华为       | **YES** | -    |
| 金立       | **YES** | -    |
| 联想       | **YES** | -    |
| 魅族       | **YES** | -    |
| 努比亚     | **YES** | -    |
| OPPO       | **YES** | -    |
| vivo       | **YES** | -    |
| 一加       |    -    | -    |
| **预览版** | **YES** | -    |
