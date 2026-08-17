# 荣耀设备信息 honorDevice

> 该接口为**荣耀快应用引擎专有**扩展，用于卡片获取当前宿主（负一屏 / 桌面 / 荣耀快服务）与设备类型等信息。常用于卡片适配折叠屏、平板等多尺寸场景。

> **支持版本**
> - 卡片：`6020+`
> - 快应用 App：不支持

## 接口声明

```json
{ "name": "system.honorDevice" }
```

## 导入模块

```javascript
import honorDevice from '@system.honorDevice'
// 或
const honorDevice = require('@system.honorDevice')
```

## 接口定义

### honorDevice.getCardInfo(OBJECT)

获取卡片所在的宿主包名、设备类型与卡片尺寸。

#### 参数：

| 参数名   | 类型     | 必填 | 说明     |
| -------- | -------- | ---- | -------- |
| success  | Function | 是   | 成功回调 |
| fail     | Function | 否   | 失败回调 |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名     | 类型   | 说明                                                                                                  |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------- |
| pkgName    | String | 宿主包名：`com.hihonor.hiboard`（负一屏）、`com.hihonor.android.launcher`（桌面）、`com.hihonor.servicecenter`（荣耀快服务） |
| deviceType | String | 设备类型：`tablet`（平板）、`foldDevice`（折叠屏）、`phone`（直板机）                                 |

#### 示例：

```javascript
honorDevice.getCardInfo({
  success: function (data) {
    const { deviceType, pkgName } = data
    console.log(`handling success: deviceType = ${deviceType}, pkgName = ${pkgName}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```


---

## 来源

- https://developer.honor.com/cn/doc/guides/101165
