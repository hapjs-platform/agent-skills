# text 输入扩展（荣耀）

> 该文档为公共组件 [`text`](../../public/widgets/text.md) 的**荣耀扩展**。各特性的支持版本见对应小节。

## 输入功能

> **支持版本**
> - 卡片：`6038+`
> - 快应用 App：不支持

卡片不支持使用 `input` 标签输入，如需在卡片内输入文字，需使用 `text` 标签并借助荣耀新增的属性、方法与事件，拉起默认输入法弹窗。需在卡片 `widgets.<cardName>` 中设置 `minPlatformVersion: 6038`。

### 新增属性

| 名称          | 类型     | 默认值                                              | 必填 | 描述                                                                  |
| ------------- | -------- | --------------------------------------------------- | ---- | --------------------------------------------------------------------- |
| placeholder   | string   | -                                                   | 否   | 输入框内的占位文本                                                    |
| maxlength     | number   | -                                                   | 否   | 组件可接受的最大长度                                                  |
| enterkeytype  | string   | `default`                                           | 否   | 软键盘 Enter 按钮显示文本或图标：`default` / `send` / `search` / `next` / `go` / `done` |
| confirmtext   | string   | `确定`                                              | 否   | 确定按钮展示文案，最大长度 4，超出不展示                              |

### 新增方法

| 名称        | 参数 | 描述                                          |
| ----------- | ---- | --------------------------------------------- |
| inputtext   | 否   | 拉起输入框蒙层弹窗，可弹出软键盘支持文字输入  |

### 新增事件

| 名称            | 参数                            | 描述                                                                   |
| --------------- | ------------------------------- | ---------------------------------------------------------------------- |
| edittextchange  | `{ text: <string> }`，text 为用户输入的值 | 弹窗输入框文本值变化、弹窗中「确定」按钮点击或弹窗消失时触发            |

### 使用方法

为 `text` 标签创建 `id` 以便调用方法，并用 `value` 绑定变量实现双向绑定。**`text` 标签内部不要放置任何文字或图标**（内部内容显示级别高于 `value`）。

```html
<text
  class="content"
  id="text-input"
  @click="handleClickInput"
  value="{{inputValue}}"
  @edittextchange="handleChangeEdit"
>
</text>
```

在点击函数内通过 `this.$element(id)` 查找元素并调用方法：

```javascript
handleClickInput() {
  this.$element('text-input').inputText()
}
```

> `this.$element` 以 `id` 查找 DOM 节点；若用其他方式获取节点，需在 `onReady` 生命周期后执行。不建议将获取到的节点赋值给 `private` 变量，否则会引起内存占用问题。

取出输入值（弹出或取消输入都会触发 `edittextchange`）：

```javascript
handleChangeEdit(params) {
  this.inputValue = params.text
}
```

> 若不通过「事件 → 改变本地变量」的方式修改值，输入值只存在于 DOM 结构中，数据层不会改变。

### 样式

`text` 标签支持所有卡片 `text` 标签内的样式，建议通过 `maxlength` 或 CSS 控制文本长度。

---

## 来源

- https://developer.honor.com/cn/doc/guides/101285
