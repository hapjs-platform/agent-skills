# image 组件扩展（荣耀）

> 该文档为公共组件 [`image`](../../public/widgets/image.md) 的**荣耀扩展**，新增 `preloadImage` 图片预渲染属性与 `appPackage` 获取应用图标属性。各特性的支持版本见对应小节。

## 图片预渲染 preloadImage

> **支持版本**
> - 卡片：`6053+`
> - 快应用 App：不支持

图片预渲染指用户访问卡片前，宿主提前下载卡片中的图片，首次访问时直接展示加载好的图片，避免实时下载等待。

### 新增属性

| 名称          | 类型    | 必填 | 说明                                |
| ------------- | ------- | ---- | ----------------------------------- |
| preloadImage  | boolean | 否   | 预渲染传 `true`，非预渲染为 `false` 或不传 |

### 新增事件

| 事件             | 触发时机       | 回调参数                                                                                   |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------ |
| onPreLoadSuccess | 预渲染成功回调 | `type`：固定值 `PreLoadSuccess`；`timeStamp`：时间戳                                       |
| onPreLoadFail    | 预渲染失败回调 | `type`：固定值 `preloadfail`；`timeStamp`：时间戳                                          |

### 示例

```html
<image
  preloadImage="true"
  src="https://image.jpg"
  onpreloadsuccess="preLoadSuccess"
  onpreloadfail="preLoadFail"
  oncomplete="complete"
  onerror="error"
></image>
```

## 获取应用图标 appPackage

> **支持版本**
> - 卡片：`6053+`
> - 快应用 App：不支持

支持卡片传入应用包名，引擎从设备中查询该应用的图标信息并展示在组件中。

### 新增属性

| 名称        | 类型   | 说明                            |
| ----------- | ------ | ------------------------------- |
| appPackage  | string | 要获取图标的 app 包名           |

- 若不存在该包名或加载失败，触发 `error` 回调。
- 若为空，不显示内容。

### 示例

```html
<image appPackage="com.hihonor.quickengine" width="30dp" height="30dp"></image>
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101460
- https://developer.honor.com/cn/doc/guides/101462
