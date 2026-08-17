# 日历事件 calendar

## 接口声明

```json
{ "name": "system.calendar" }
```

## 导入模块

```javascript
import calendar from '@system.calendar' 或 const barcode = require('@system.calendar')
```

## 接口定义

### calendar.insert(OBJECT)

插入日历事件

#### 权限要求

访问日历

#### 参数：

| 参数名        | 类型     | 必填         | 说明                                                                                                                                            |
| ------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| title         | String   | 是           | 事件的标题                                                                                                                                      |
| description   | String   | 否           | 事件的描述                                                                                                                                      |
| startDate     | Number     | 是           | 事件开始时间，以从公元纪年开始计算的协调世界时毫秒数表示                                                                                        |
| endDate       | Number     | 是           | 事件结束时间，以从公元纪年开始计算的协调世界时毫秒数表示                                                                                        |
| timezone      | String   | 否           | 事件的时区                                                                                                                                      |
| allDay        | Boolean  | 否           | true 表示此事件占用一整天（按照本地时区的定义）。 false 表示它是常规事件，可在一天内的任何时间开始和结束                                        |
| rrule         | String   | 重复事件必须 | 事件的重复发生规则格式。例如，`"FREQ=WEEKLY;COUNT=10;WKST=SU"`。 您可以在[此处](http://tools.ietf.org/html/rfc5545#section-3.8.5.3)找到更多示例 |
| remindMinutes | Array    | 否           | 在事件开始前几分钟进行提醒。例如：[5,15,30]                                                                                                     |
| organizer     | String   | 否           | 事件组织者（所有者）的电子邮件                                                                                                                  |
| success       | Function | 否           | 成功回调，值为插入成功的 id                                                                                                                     |
| fail          | Function | 否           | 失败回调                                                                                                                                        |
| cancel        | Function | 否           | 取消回调                                                                                                                                        |

##### fail 返回错误代码

| 错误码      | 说明                                         |
| ----------- | -------------------------------------------- |
| 201         | 用户拒绝，获取写日历权限失败                 |
| 202 `1000+` | 参数非法，如输入时间格式不对、参数不符合标准 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
calendar.insert({
  title: '事件Ａ',
  startDate: '1490770543000',
  endDate: '1490880543000',
  remindMinutes: [5, 15, 30],
  duration: 'PT1H',
  rrule: 'FREQ=WEEKLY;COUNT=２',
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
