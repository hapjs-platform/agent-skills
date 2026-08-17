# 通信信息 telecom `1080+`

## 接口声明

```json
{ "name": "system.telecom" }
```

## 导入模块

```javascript
import telecom from '@system.telecom' 或 const telecom = require('@system.telecom')
```

## 接口定义

### telecom.getTelecomInfo(OBJECT)

获取设备通信信息

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数值                  | 类型    | 说明             |
| ----------------------- | ------- | ---------------- |
| is5GDevice              | Boolean | 是否是5G设备     |
| is5GSwitchOpened        | Boolean | 5G开关是否已打开 |

#### 示例：

```javascript
telecom.getTelecomInfo({
  success: function(ret) {
    console.log(`handling success, is5GDevice = ${ret.is5GDevice}`)
  }
})
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。