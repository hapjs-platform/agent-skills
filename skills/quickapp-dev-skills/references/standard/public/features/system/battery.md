# 电量信息 battery `1000+`

## 接口声明

```json
{ "name": "system.battery" }
```

## 导入模块

```javascript
import battery from '@system.battery' 或 const battery = require('@system.battery')
```

## 接口定义

### battery.getStatus(OBJECT)

获取当前设备的电量信息。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值   | 类型    | 说明                     |
| -------- | ------- | ------------------------ |
| charging | Boolean | 是否正在充电             |
| level    | Number  | 当前电量，0.0 - 1.0 之间 |

#### 示例：

```javascript
battery.getStatus({
  success: function(data) {
    console.log(`handling success: ${data.level}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
