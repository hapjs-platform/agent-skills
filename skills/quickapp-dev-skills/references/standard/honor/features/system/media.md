# 多媒体 media（荣耀扩展）

> 该接口为对公共接口 [`@system.media`](../../../public/features/system/media.md) 的**荣耀扩展**，`saveToSdCard` 由快应用 App / 页面调用保存图片，配合 `exchange` 发布给卡片消费。

> **支持版本**
> - 卡片：`6053+`（取出并展示图片）
> - 快应用 App：`1117+`（`saveToSdCard` 保存图片）

## 接口声明

```json
{ "name": "system.media" }
```

## 导入模块

```javascript
import media from '@system.media'
// 或
const media = require('@system.media')
```

## 接口定义

### media.saveToSdCard(OBJECT)

将快应用中的图片地址保存到存储空间。

#### 参数：

| 参数名  | 类型     | 必填 | 说明                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| uri     | string   | 是   | 源文件的 uri，文件扩展名必须是图片扩展名，**不支持网络图片** |
| success | function | 否   | 成功回调                                                     |
| fail    | function | 否   | 失败回调                                                     |

##### success 返回值：

| 参数名 | 类型   | 说明          |
| ------ | ------ | ------------- |
| path   | string | 图片 uri 地址 |

##### fail 返回错误代码：

| 错误码 | 说明                         |
| ------ | ---------------------------- |
| 201    | 用户拒绝                     |
| 202    | 参数错误                     |
| 207    | 用户拒绝并勾选不再询问复选框 |
| 300    | I/O 错误                     |

#### 示例：

完整流程分「快应用 app 侧」保存发布与「卡片侧」取出展示两步。

**快应用 app 侧**（保存图片并通过 exchange 发布路径）：

```javascript
import media from '@system.media'
import exchange from '@service.exchange'

media.pickImage({
  success: data => {
    const imagePath = data.uri
    if (imagePath && imagePath.length > 0) {
      media.saveToSdCard({
        uri: imagePath,
        success: function (data) {
          // 保存成功后，通过 exchange 发布图片路径供卡片使用
          exchange.set({
            key: 'photoconnect',
            value: data.path,
            success: function () {
              console.log('handling success')
            },
            fail: function (data, code) {
              console.log(`handling fail, code = ${code}`)
            }
          })
        },
        fail: function (data, code) {
          console.log(`handling fail, code = ${code}`)
        }
      })
    }
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

**卡片侧**（取出路径并展示）：

> ⚠️ **权限要求**：卡片需具备应用数据读取权限才能取出快应用 App 发布的图片路径，机制详见 [`exchange`](../service/exchange.md)。

```html
<!-- 图片组件 -->
<image src="{{url}}"></image>
```

```javascript
import exchange from '@service.exchange'

exchange.get({
  key: 'photoconnect',
  success: (res) => {
    this.url = res.value
  },
  fail: (error) => {
    console.log(`handling fail`)
  }
})
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101461
