# 剪贴板 clipboard

## 接口声明

```json
{ "name": "system.clipboard" }
```

## 导入模块

```javascript
import clipboard from '@system.clipboard' 或 const clipboard = require('@system.clipboard')
```

## 接口定义

### clipboard.set(OBJECT)

修改剪贴板内容

#### 权限要求

写入剪贴板（注：各厂商权限要求可能不同，vivo侧要求写入剪贴板权限）

#### 参数：

| 参数名   | 类型     | 必填 | 说明                 |
| -------- | -------- | ---- | -------------------- |
| text     | String   | 是   | 需要放到剪切板的内容 |
| success  | Function | 否   | 成功回调             |
| fail     | Function | 否   | 失败回调             |
| complete | Function | 否   | 执行结束后的回调     |

##### fail 返回错误代码

| 错误码       | 说明                       |
| ------------ | -------------------------- |
| 201          | 用户拒绝，获取写入剪贴板权限失败 |

#### 示例：

```javascript
clipboard.set({
  text: 'text',
  success: function(data) {
    console.log(`handling success`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### clipboard.get(OBJECT)

读取剪贴板内容

#### 权限要求

访问剪贴板（注：各厂商权限要求可能不同，vivo侧要求访问剪贴板权限，oppo侧在`1114+`要求访问剪贴板权限）

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型   | 说明       |
| ------ | ------ | ---------- |
| text   | String | 剪切板内容 |

##### fail 返回错误代码

| 错误码       | 说明                       |
| ------------ | -------------------------- |
| 201          | 用户拒绝，获取访问剪贴板权限失败 |

#### 示例：

```javascript
clipboard.get({
  success: function(data) {
    console.log(`handling success: ${data.text}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
