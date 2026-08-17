# 闹钟 alarm `1040+`

## 接口声明

```json
{ "name": "system.alarm" }
```

## 导入模块

```javascript
import alarm from '@system.alarm' 或 const alarm = require('@system.alarm')
```

## 接口定义

### alarm.setAlarm (OBJECT)

设置闹钟，每次添加弹出提示框，同意后调用接口添加。

#### 参数

| 参数名   | 类型     | 必填 | 说明                                                                                                                |
| -------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| hour     | Number   | 是   | 设置起闹小时[0，23]                                                                                                 |
| minute   | Number   | 是   | 设置起闹分钟[0，59]                                                                                                 |
| message  | String   | 否   | 闹钟名,建议长度不超过 10 字符,以保证最佳显示效果                                                                    |
| vibrate  | Boolean  | 否   | 是否震动，默认 true                                                                                                 |
| days     | Array    | 否   | 重复周期<br>默认是一次性闹钟<br>[0,1,2,3,4,5,6] 每天<br>[0,1,2,3,4]周一到周五<br>[0,6]（0 表示周一 6 表示周日）<br> |
| ringtone | String   | 否   | 默认铃声随系统，文件路径为数据文件或应用内的资源                                                                    |
| success  | Function | 否   | 成功回调                                                                                                            |
| fail     | Function | 否   | 失败回调                                                                                                            |
| complete | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）                                                                          |

##### fail 返回错误代码：

| 错误码 | 说明     |
| ------ | -------- |
| 201    | 用户拒绝 |
| 202    | 参数错误 |
| 203 `1120+` | 闹钟能力不可用 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 300    | I/O 错误 |

#### 示例

```javascript
alarm.setAlarm({
    hour:18,
    minute: 20,
    message: '闹钟1',
    days: [4],
    ringtone: 'internal://mass/test/test.mp3',
    success: function() {
        console.log('handling success')
    },
    fail: function(data, code) {
        console.log(`handling fail, code = ${code}, errorMsg=${data}`)
    },
    complete: function() {
        console.log('handling complete')
    }
}
```

### alarm.getProvider()

获取服务提供商

#### 参数：

无

#### 返回值:

字符串，服务提供商的代号，如厂商的英文品牌名称，假如无此服务则返回空字符串

#### 示例

```
console.log(alarm.getProvider())
```

### alarm.isAvailable(OBJECT) `1120+`

获取闹钟能力可用状态

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                                                |
| -------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| success  | Function | 否   | 成功回调                                                                                                            |
| fail     | Function | 否   | 失败回调                                                                                                            |
| complete | Function | 否   | 执行结束后的回调（调用成功、失败都会执行）                                                                          |

#### 返回值:

| 参数名   | 类型   | 说明                                                                                                                |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| isAvailable | Boolean | true：闹钟能力可用，false：闹钟能力不可用 |

#### 示例

```
alarm.isAvailable({
  success: function(data) {
    console.log(`handling success: ${data.isAvailable}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
