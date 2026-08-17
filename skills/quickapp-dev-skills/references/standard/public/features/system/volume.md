# 系统音量 volume `1000+`

## 接口声明

```json
{ "name": "system.volume" }
```

## 导入模块

```javascript
import volume from '@system.volume' 或 const volume = require('@system.volume')
```

## 接口定义

### volume.getMediaValue(OBJECT)

获取当前多媒体音量。

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型   | 说明                             |
| ------ | ------ | -------------------------------- |
| value  | Number | 系统媒体当前音量，0.0-1.0 之间。 |

#### 示例：

```javascript
volume.getMediaValue({
  success: function(data) {
    console.log(`handling success: ${data.value}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### volume.setMediaValue(OBJECT)

设置当前多媒体音量。

#### 参数：

| 参数名   | 类型     | 必填 | 说明                       |
| -------- | -------- | ---- | -------------------------- |
| value    | Number   | 是   | 设置的音量，0.0-1.0 之间。 |
| success  | Function | 否   | 成功回调                   |
| fail     | Function | 否   | 失败回调                   |
| complete | Function | 否   | 执行结束后的回调           |

#### 示例：

```javascript
volume.setMediaValue({
  value: 0.5,
  success: function() {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
