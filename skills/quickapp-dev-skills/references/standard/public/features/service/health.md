# 健康 health `1050+`

## 接口声明

```json
{ "name": "service.health" }
```

## 导入模块

```javascript
import health from '@service.health' 或 const health = require('@service.health')
```

## 接口定义

### health.hasStepsOfDay(OBJECT)

是否支持提供每日步数的功能。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值

| 参数名  | 类型    | 说明                                               |
| ------- | ------- | -------------------------------------------------- |
| support | Boolean | 是否支持提供每日步数的功能.true 支持，false 不支持 |

#### 示例：

```javascript
health.hasStepsOfDay({
  success: function(data) {
    console.log(`handling success support：${data.support}`)
  },
  fail: function(data, code) {
    console.log(`handling fail!, code = ${code}`)
  }
})
```

### health.getTodaySteps(OBJECT)

获取每个自然日的步数，返回的是调用接口时，用户今天已经累计的步数。

#### 权限说明

需要用户授权才能获取数据。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值:

| 参数名 | 类型   | 说明         |
| ------ | ------ | ------------ |
| steps  | Number | 返回当天步数 |

##### fail 返回错误代码：

| 错误码 | 说明             |
| ------ | ---------------- |
| 201    | 用户拒绝授权     |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1001   | 还不支持获取步数 |

#### 示例：

```javascript
health.getTodaySteps({
  success: function(data) {
    console.log(`handling success steps${data.steps}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### health.getLastWeekSteps(OBJECT)

获取最近七个自然日每天的步数，包括今天。

#### 权限说明

需要用户授权才能获取数据。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值:

| 参数名    | 类型  | 说明                 |
| --------- | ----- | -------------------- |
| stepsList | Array | 最近七天步数列表数据 |

###### stepsList 列表项参数说明:

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| date   | String | 日期(2019-04-08) |
| steps  | Number | 日期对应的步数   |

##### fail 返回错误代码：

| 错误码 | 说明             |
| ------ | ---------------- |
| 201    | 用户拒绝授权     |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1001   | 还不支持获取步数 |

#### 示例：

```javascript
health.getLastWeekSteps({
  success: function(data) {
    for (const i in data.stepsList) {
      console.log(
        `handling success date: ${data.stepsList[i].date} steps: ${
          data.stepsList[i].steps
        }`
      )
    }
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       | 支持 | 备注                                                                    |
| ---------- | :--: | ----------------------------------------------------------------------- |
| 小米       | YES  | -                                                                       |
| vivo       | YES  | Android7.1 以上机型（同时依赖 vivo ROM 计步服务版本，通过自升级同步中） |
| 华为       | _no_ | -                                                                       |
| OPPO       | _no_ | -                                                                       |
| 中兴       | _no_ | -                                                                       |
| 金立       | _no_ | -                                                                       |
| 联想       | _no_ | -                                                                       |
| 魅族       | _no_ | -                                                                       |
| 努比亚     | _no_ | -                                                                       |
| 一加       | _no_ | -                                                                       |
| 海信       | _no_ | -                                                                       |
| **预览版** | _no_ | -                                                                       |
