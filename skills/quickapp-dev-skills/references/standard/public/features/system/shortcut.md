# 桌面图标 shortcut

## 接口声明

```json
{ "name": "system.shortcut" }
```

## 导入模块

```javascript
import shortcut from '@system.shortcut' 或 const shortcut = require('@system.shortcut')
```

## 接口定义

### 方法

#### shortcut.hasInstalled(OBJECT)

获取桌面图标是否创建。**调用shortcut.install方法后立即调用该方法得到的结果可能不正确，存在一定延时。**
**建议在调用shortcut.install方法后不要立即调用该方法。**
（注：各厂商延时情况可能略有不同，vivo侧android 11之前机型大概有50ms左右延时、android 11及之后机型大概有100ms左右延时）

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                      |
| -------- | -------- | ---- | ----------------------------------------- |
| success  | Function | 否   | 成功回调。参数：true 已创建，false 未创建 |
| fail     | Function | 否   | 失败回调                                  |
| complete | Function | 否   | 执行结束后的回调                          |

##### 示例：

```javascript
shortcut.hasInstalled({
  success: function() {
    console.log('handling success')
  }
})
```

#### shortcut.install(OBJECT)

创建桌面图标，每次创建都需要用户授权

##### 权限要求

创建桌面图标

##### 参数：

| 参数名          | 类型     | 必填 | 说明                                                     |
| --------------- | -------- | ---- | -------------------------------------------------------- |
| message `1030+` | String   | 否   | 权限弹窗上的说明文字，用于向用户解释为什么要创建桌面图标 |
| success         | Function | 否   | 创建成功                                                 |
| fail            | Function | 否   | 创建失败                                                 |
| complete        | Function | 否   | 执行结束后的回调                                         |

###### fail 返回错误代码

| 错误码 | 说明                    |
| ------ | ------------------------|
| 201    | 用户拒绝创建       |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |
| 1001   | 接口调用超过当日使用频次|

##### 示例：

```javascript
shortcut.install({
  success: function() {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### 属性

| 名称                          | 参数类型 | 是否可读 | 是否可写 | 描述                                                                  |
| ----------------------------- | -------- | -------- | -------- | --------------------------------------------------------------------- |
| systemPromptEnabled `1020+`　 | Boolean  | 是       | 是       | 是否开启系统快捷方式创建弹窗，默认 true。不会持久化，只对当前运行有效 |

#### 示例：

```javascript
shortcut.systemPromptEnabled = false
let enabled = shortcut.systemPromptEnabled
console.log('system prompt enabled: ' + enabled)
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
