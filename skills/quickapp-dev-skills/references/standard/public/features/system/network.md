# 网络状态 network

## 接口声明

```json
{ "name": "system.network" }
```

## 导入模块

```javascript
import network from '@system.network' 或 const network = require('@system.network')
```

## 接口定义

### network.getType(OBJECT)

获取网络类型

#### 参数：

| 参数名   | 类型     | 必填 | 说明                         |
| -------- | -------- | ---- | ---------------------------- |
| success  | Function | 否   | 成功回调                     |
| fail     | Function | 否   | 失败回调，可能是因为缺乏权限 |
| complete | Function | 否   | 执行结束后的回调             |

##### success 返回值：

| 参数名  | 类型    | 说明                                        |
| ------- | ------- | ------------------------------------------- |
| metered | Boolean | 是否按照流量计费                            |
| type    | String  | 网络类型，可能的值为 2g，3g，4g，wifi，none，<br>5g(`1070+`)，bluetooth(`1070+`)，others(`1070+`) |

#### 示例：

```javascript
network.getType({
  success: function(data) {
    console.log(`handling success: ${data.type}`)
  }
})
```

### network.subscribe(OBJECT)

监听网络连接状态。如果多次调用，仅最后一次调用生效

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                        |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+` | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| callback         | Function | 否   | 每次网络发生变化，都会被回调                                                                |
| fail             | Function | 否   | 失败回调，可能是因为缺乏权限                                                                |

##### callback 返回值：

| 参数名  | 类型    | 说明                                        |
| ------- | ------- | ------------------------------------------- |
| metered | Boolean | 是否按照流量计费                            |
| type    | String  | 网络类型，可能的值为 2g，3g，4g，wifi，none，<br>5g(`1070+`)，bluetooth(`1070+`)，others(`1070+`) |

#### 示例：

```javascript
network.subscribe({
  callback: function(data) {
    console.log('handling callback')
  }
})
```

### network.unsubscribe()

取消监听网络连接状态

#### 参数：

无

#### 示例：

```javascript
network.unsubscribe()
```

### network.getSimOperators(OBJECT) `1070+`

获取Sim卡的运营商信息

#### 参数：

| 参数名   | 类型     | 必填 | 说明                         |
| -------- | -------- | ---- | ---------------------------- |
| success  | Function | 否   | 成功回调                     |
| fail     | Function | 否   | 失败回调                    |
| complete | Function | 否   | 执行结束后的回调             |

##### success 返回值：

| 参数名      | 类型     | 说明                                         |
| ---------- | -------- | ------------------------------------------- |
| operators  | Array    | SIM卡列表信息                                |
| size       | Number  | Sim卡数量                                     |

##### fail 返回错误代码：

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 1001    | 未插入sim卡                |
| 1002    | 获取运营商信息失败          |

##### SIM卡列表项参数：
| 参数名      | 类型     | 说明                                         |
| ---------- | -------- | ------------------------------------------- |
| operator   | String    | 返回Sim卡的运营商信息<br>运营商信息说明：此处统一返回MCC+MNC，即移动国家代码 + 移动网络代码；<br>中国移动：46000，46002，46004，46007；<br>中国联通：46001，46006，46009；<br>中国电信：46003，46005，46011；<br> 其余MCC+MNC请查看：https://www.mcc-mnc.com/ |
| slotIndex  | Number   | 卡槽序号                                     |
| isDefaultDataOperator  | Boolean  | 是否为默认数据卡                              |

#### 示例：

```javascript
network.getSimOperators({
  success:function (data) {
    console.log(`size: ${data.size}`)
    for (const i in data.operators) {
      console.log(`operator: ${data.operators[i].operator},
        slotIndex:${data.operators[i].slotIndex},
        isDefaultDataOperator:${data.operators[i].isDefaultDataOperator},`
      )
    }
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
