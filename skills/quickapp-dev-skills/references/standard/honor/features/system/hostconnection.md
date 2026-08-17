# 卡片预渲染 hostconnection

> 该接口为**荣耀快应用引擎专有**接口，用于卡片与宿主通信，实现**卡片预渲染**能力：在用户访问卡片前，宿主提前生成卡片结构，用户首次访问时直接展示完整卡片，避免「白卡 → 骨架图 → 完整卡片」的等待过程。

> **支持版本**
> - 卡片：支持
> - 快应用 App：不支持

> **投放要求**：在 APP 建议和 YOYO 建议投放的卡片，**必须**支持预渲染能力。卡片发送预渲染消息不会影响不支持预渲染的媒体（负一屏、荣耀快服务等）。

## 接入步骤

### 1. 在 manifest 文件中卡片层声明接口

```json
{ "name": "system.hostconnection" }
```

### 2. 在卡片配置最外层添加预渲染标签

```json
"honorPreRender": true
```

示例：

```json
{
  "package": "com.hostconnection.demo",
  "honorPreRender": true,
  ...
  "router": {
    "widgets": [
      {
        "demo": {
          "name": "预渲染卡片",
          "features": [
            { "name": "system.hostconnection" }
          ],
          ...
        }
      }
    ]
  }
}
```

> ⚠️ 只有同时满足「配置了预渲染标签」**且**「预渲染消息格式正确」，才支持预渲染，缺一不可。

### 3. 导入接口

```javascript
import hostconnection from '@system.hostconnection'
// 或
const hostconnection = require('@system.hostconnection')
```

## 接口定义

### hostconnection.send(OBJECT)

向宿主发送预渲染完成通知（或失败通知）。

#### 参数：

| 参数名      | 类型   | 必填 | 说明                                                                 |
| ----------- | ------ | ---- | -------------------------------------------------------------------- |
| status      | String | 是   | `success`：成功回调；`error`：非成功情况回调                         |
| abilityKey  | String | 是   | 固定值 `honor_pre_render`（荣耀预渲染能力）                          |
| msg         | String | 否   | 渲染描述。若渲染失败，可发送错误描述告知失败原因                     |
| extraInfo   | Object | 否   | 后续业务扩充字段                                                     |

#### 示例：

```javascript
import hostconnection from '@system.hostconnection'
import fetch from '@system.fetch'

export default {
  data() {
    return {
      hasInited: 0 // 0 代表卡片首次加载
    }
  },
  onInit() {
    this.getData()
  },
  getData() {
    const that = this
    fetch.fetch({
      url: 'https://www.example.com',
      responseType: 'text',
      success: function (response) {
        if (that.hasInited === 0) {
          // 数据请求完成，发送成功预渲染消息
          that.sendPreRenderMessage()
        }
      },
      fail: function (data, code) {
        if (that.hasInited === 0) {
          // 数据请求异常，发送异常预渲染消息
          that.sendPreRenderMessage('error', data)
        }
      },
      complete: function () {
        that.hasInited = 1 // 请求结束，标记非首次加载
      }
    })
  },
  // 发送预渲染消息
  sendPreRenderMessage(status = 'success', msg = '', extraInfo = {}) {
    hostconnection.send({
      status: status,
      abilityKey: 'honor_pre_render',
      msg: msg,
      extraInfo: extraInfo
    })
    console.log('预渲染消息发送了======>')
  }
}
```

> 建议在卡片初始化阶段（`onInit`）、数据请求完成后发送预渲染完成通知；数据请求异常时发送 `status: 'error'` 通知。

---

## 来源

- https://developer.honor.com/cn/doc/guides/101191
