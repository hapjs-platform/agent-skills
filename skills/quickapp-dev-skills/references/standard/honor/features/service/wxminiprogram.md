# 微信小程序跳转 wxminiprogram

> 该接口为**荣耀快应用引擎专有**接口，用于从快应用 / 卡片拉起微信小程序。

> **支持版本**
> - 卡片：`6040+`
> - 快应用 App：`1103+`

## 接口声明

```json
{ "name": "service.wxminiprogram" }
```

## 导入模块

```javascript
import wxrouter from '@service.wxminiprogram'
// 或
const wxrouter = require('@service.wxminiprogram')
```

## 接口定义

### wxrouter.launch(OBJECT)

拉起微信小程序。

> 该方法可跳转至任意合法的小程序，且不限制可跳转的小程序数量。

#### 参数：

| 参数名   | 类型   | 必填 | 说明                                                                                         |
| -------- | ------ | ---- | -------------------------------------------------------------------------------------------- |
| userName | String | 是   | 小程序原始 id                                                                                |
| path     | String | 否   | 拉起小程序的可带参路径，不填则默认跳转小程序首页。传参需按 query 格式，如 `?index=1`（需 encode） |
| type     | Number | 否   | 启动小程序类型：`0` 正式版、`1` 开发版、`2` 体验版                                            |

#### 示例：

```javascript
import wxrouter from '@service.wxminiprogram'

export default {
  handleClick() {
    wxrouter.launch({
      userName: 'xxxxxxxx',
      path: '/page'
    })
  }
}
```

如需传入多个参数，将参数 encode 后拼接到 `path`，并在小程序端 decode：

```javascript
wxrouter.launch({
  userName: 'xxxxxxxx',
  path: `/page?url1=${encodeURIComponent(url1)}&url2=${encodeURIComponent(url2)}`
})
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101162
