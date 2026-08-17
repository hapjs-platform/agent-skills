# 截屏 screenshot `1100+`

## 接口声明

```json
{ "name": "system.screenshot" }
```

## 导入模块

```javascript
import screenshot from '@system.screenshot' 或 const screenshot = require('@system.screenshot')
```

## 接口定义

### screenshot.onUserCaptureScreen(OBJECT)

监听用户截屏事件。用户使用系统截屏按键截屏、三指滑屏等方式时触发

#### 权限要求

读手机存储

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                |
| ---------------- | -------- | ---- | ----------------------------------------------------------------------------------|
| callback         | Function | 是   | 用户截屏后会回调此函数。                                                            |

##### callback 返回值：

无

##### fail 返回错误代码

| 错误码       | 说明                       |
| ------------ | -------------------------- |
| 201          | 用户拒绝，获取读取手机存储权限失败 |

#### 示例：

```javascript
screenshot.onUserCaptureScreen({
  callback: function (data) {
    console.log(`用户截屏了`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}, errorMsg=${data}`)
  }
})
```

### screenshot.offUserCaptureScreen()

取消监听用户截屏

#### 参数：

无

#### 示例：

```javascript
screenshot.offUserCaptureScreen()
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
