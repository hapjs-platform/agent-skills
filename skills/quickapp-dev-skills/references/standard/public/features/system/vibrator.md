# 震动 vibrator

## 接口声明

```json
{ "name": "system.vibrator" }
```

## 导入模块

```javascript
import vibrator from '@system.vibrator' 或 const vibrator = require('@system.vibrator')
```

## 接口定义

### vibrator.vibrate(OBJECT)

触发震动

#### 参数：

| 参数         | 类型   | 必填 | 说明                                                       |
| ------------ | ------ | ---- | ---------------------------------------------------------- |
| mode `1030+` | String | 否   | 振动模式，"long"表示长振动，"short"表示短振动。默认为 long |

#### 示例：

```javascript
vibrator.vibrate({
  mode: 'long'
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
