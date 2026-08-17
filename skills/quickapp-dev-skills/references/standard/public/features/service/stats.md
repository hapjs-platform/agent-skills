# 统计 stats `1000+`

## 接口声明

```json
{ "name": "service.stats" }
```

## 导入模块

```javascript
import stats from '@service.stats' 或 const stats = require('@service.stats')
```

## 接口定义

### stats.getProvider()

获取服务提供商。

#### 参数：

无

#### 返回值：

字符串，服务提供商的代号，如厂商的英文品牌名称，假如无此服务则返回空字符串

#### 示例：

```javascript
console.log(stats.getProvider())
```

### stats.recordCountEvent(OBJECT)

计数类型事件。通常用来描述⼀个事件累积发⽣的次数，适用的场景如按钮点击、界面进入、用户输入等。

#### 参数：

| 参数名       | 类型   | 必填 | 说明                                                     |
| ------------ | ------ | ---- | -------------------------------------------------------- |
| category 　  | String | 否   | 定义事件的类别，开发者可使用该参数对⾃定义打点做整理归类 |
| key 　　　　 | String | 是   | 定义事件的主键，作为该事件的唯⼀标识                     |
| map 　　　　 | Object | 否   | 定义事件的属性和取值（Key-Value 键值对）                 |

##### 返回值：

无

#### 示例：

```javascript
stats.recordCountEvent({
  category: 'Button_Click',
  key: 'Button_OK_click',
  map: {
    param1: 'value1'
  }
})
```

### stats.recordCalculateEvent(OBJECT)

计算类型事件。用通常用来描述⼀个带数值的事件的发⽣，适用的场景如用户消费事件，附带的数值是每次消费的⾦额；下载⽂件事件，附带的数值是每次下载消耗的时间等。

#### 参数：

| 参数名       | 类型   | 必填 | 说明                                                    |
| ------------ | ------ | ---- | ------------------------------------------------------- |
| category 　  | String | 否   | 定义事件的类别.开发者可使用该参数对⾃定义打点做整理归类 |
| key 　　　　 | String | 是   | 定义事件的主键，作为该事件的唯⼀标识                    |
| value 　　　 | Number | 是   | 定义事件的值。　　　　　　　　　　　　　　              |
| map 　　　　 | Object | 否   | 定义事件的属性和取值（Key-Value 键值对）                |

##### 返回值：

无

#### 示例：

```javascript
stats.recordCalculateEvent({
  category: 'user_pay',
  key: 'buy_ebook',
  value: 20,
  map: {
    param1: 'value1'
  }
})
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。

## 支持明细

| 厂商       |  支持   | 备注                                                          |
| ---------- | :-----: | ------------------------------------------------------------- |
| 小米       | `1010+` | [小米统计](https://dev.mi.com/console/appservice/status.html) |
| 中兴       |  _no_   | -                                                             |
| 华为       |  _no_   | -                                                             |
| 金立       | `1010+` | [金立快应用开发者中心](http://devquickapp.gionee.com/)        |
| 联想       |  _no_   | -                                                             |
| 魅族       |  _no_   | -                                                             |
| 努比亚     |  _no_   | -                                                             |
| OPPO       |  _no_   | -                                                             |
| vivo       |  _no_   | -                                                             |
| 一加       |    -    | -                                                             |
| **预览版** |  _no_   | 预览版不提供统计接口                                          |
