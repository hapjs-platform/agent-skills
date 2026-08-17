# 设备信息 device（荣耀扩展）

> 该接口为对公共接口 [`@system.device`](../../../public/features/system/device.md) 的**荣耀扩展**，新增折叠屏 / 双屏设备状态字段（`getInfo`），并新增荣耀 OAID 获取接口 `getHonorOAID3rdParty`。

## 接口声明

```json
{ "name": "system.device" }
```

## 导入模块

```javascript
import device from '@system.device'
// 或
const device = require('@system.device')
```

## 接口定义

### device.getInfo(OBJECT)

在公共 `device.getInfo` 返回值的基础上，荣耀引擎新增以下字段，用于判断折叠屏与双屏状态。

#### success 返回值（荣耀新增字段）：

| 参数名       | 类型    | 说明                                      | 支持版本 |
| ------------ | ------- | ----------------------------------------- | -------- |
| isFoldDevice | Boolean | 是否为折叠屏设备（`true`：是；`false`：否） | 卡片无版本要求；快应用 App `1120+` |
| foldState    | Number  | 折叠屏状态（`1`：展开；`2`：折叠）         | 卡片无版本要求；快应用 App `1120+` |
| isTwoColumn  | Boolean | 是否为双屏模式（`true`：是；`false`：否）  | 卡片 `6048+`；快应用 App 不支持 |

#### 示例：

```javascript
device.getInfo({
  success: function (data) {
    const { isFoldDevice, foldState, isTwoColumn } = data
    console.info(`是否为折叠屏设备：${isFoldDevice}`)
    console.info(`折叠屏状态：${foldState}`)
    console.info(`是否为双屏模式：${isTwoColumn}`)
  }
})
```

---

### onConfigurationChanged(evt)

> `onConfigurationChanged` 是联盟标准的应用配置变化生命周期回调（详见 [`script.md`](../../../public/framework/script.md)）。荣耀引擎在标准 `type` 取值基础上，额外扩展了折叠屏状态值。

当系统语言、主题模式、屏幕方向、屏幕大小或折叠屏折叠 / 展开状态发生变化时触发。

#### 参数

| 参数名 | 类型   | 描述                   |
| ------ | ------ | ---------------------- |
| event  | Object | 应用配置发生变化的事件 |

`event.type` 荣耀扩展取值：

| 参数值            | 描述           | 支持版本 |
| ----------------- | -------------- | -------- |
| `foldStateExpand` | 折叠屏展开状态 | 卡片 `6047+`；快应用 App `1104+` |
| `foldStateFolded` | 折叠屏折叠状态 | 卡片 `6047+`；快应用 App `1104+` |

#### 示例

```javascript
onConfigurationChanged(evt) {
  console.log(`触发生命周期onConfigurationChanged, 配置类型：${evt.type}`)
  if (evt.type === 'foldStateExpand') {
    // 折叠屏展开
  } else if (evt.type === 'foldStateFolded') {
    // 折叠屏折叠
  }
}
```

---

### device.getHonorOAID3rdParty(OBJECT)

> **支持版本**
> - 卡片：`6041+`
> - 快应用 App：`1104+`

获取荣耀 OAID，用于卡片展示个性化内容。该接口为**特殊接口**，使用前需**至少提前一个月**向荣耀提交申请，并在荣耀开发者服务平台录入隐私声明协议。

#### 参数：

| 参数名           | 类型   | 必填 | 说明                                                                 |
| ---------------- | ------ | ---- | -------------------------------------------------------------------- |
| userAcceptPrivacy | String | 是   | `Y` 表示开发者已获取用户同意隐私协议的承诺；`N` 表示未同意。**不传可能导致返回值数据结构不正确** |
| success          | Function | 否 | 成功回调                                                             |
| fail             | Function | 否 | 失败回调                                                             |

##### success 返回值：

| 参数名        | 类型    | 说明                                                                                                          |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| oaid          | String  | oaid 值                                                                                                       |
| oaidGotten    | Boolean | oaid 是否成功从 SDK 获取：`true` 时 `oaid` / `oaid2`（过渡期）有值；`false` 时 `message` 有值                 |
| message       | String  | oaid 未成功获取时的信息（含义见下表）                                                                         |
| transitional  | Number  | 过渡期标识：`1`=oaid 为华为 oaid、oaid2 为荣耀 oaid；`2`=oaid 为荣耀 oaid、oaid2 为华为 oaid；`9`=过渡期结束，oaid 为荣耀 oaid |
| oaid2         | String  | 过渡期 oaid 值 2                                                                                              |

##### message 参数对照表：

| 出现条件（message） | 说明 |
| ------------------ | ---- |
| illegal arg        | 参数不匹配 |
| undefined          | SDK 获取空值 |
| err                | SDK 发生错误 |
| no permission               | 进程错误 |
| no permission: privacy limit on | 系统限制隐私追踪开关打开 |
| no permission: privacy policy missing | 包信息中未查询到隐私政策 |
| no permission: privacy not confirm | 用户未同意隐私权限 |
| no permission: not in dl white list | 双清单中没有匹配值 |
| no permission: intelligent recommendation forbidden account | 帐号没有智能推荐功能 |
| no permission: no intelligent recommendation | 没有智能推荐功能 |
| no permission: intelligent recommendation version un-support | 不支持推荐功能 |

#### 示例：

```javascript
device.getHonorOAID3rdParty({
  userAcceptPrivacy: 'Y',
  success: function (res) {
    if (res.oaidGotten) {
      // 根据过渡期标识区分荣耀 oaid 与华为 oaid
      let hnOaid = ''
      let hwOaid = ''
      switch (res.transitional) {
        case 1:
          hnOaid = res.oaid2
          hwOaid = res.oaid
          break
        case 2:
          hnOaid = res.oaid
          hwOaid = res.oaid2
          break
        case 9:
          hnOaid = res.oaid
          hwOaid = ''
          break
      }
      console.log(`HNOAID=${hnOaid}, HWOAID=${hwOaid}`)
    } else {
      console.log(`getOaidError: ${res.message}`)
    }
  },
  fail: function (res) {
    console.log(`failErr: ${JSON.stringify(res)}`)
  }
})
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101165
- https://developer.honor.com/cn/doc/guides/101151
