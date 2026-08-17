# 二维码 barcode

## 接口声明

```json
{ "name": "system.barcode" }
```

## 导入模块

```javascript
import barcode from '@system.barcode' 或 const barcode = require('@system.barcode')
```

## 接口定义

### barcode.scan(OBJECT)

扫描二维码

#### 权限要求

使用相机

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| cancel   | Function | 否   | 取消回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型   | 说明         |
| ------ | ------ | ------------ |
| result | String | 解析后的内容 |

##### fail 返回错误代码

| 错误码 | 说明                       |
| ------ | -------------------------- |
| 201    | 用户拒绝，获取相机权限失败 |
| 207 `1100+` | 用户拒绝并勾选不再询问复选框 |

#### 示例：

```javascript
barcode.scan({
  success: function(data) {
    console.log(`handling success: ${data.result}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
