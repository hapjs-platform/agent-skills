# 弹窗 prompt

## 接口声明

```json
{ "name": "system.prompt" }
```

## 导入模块

```javascript
import prompt from '@system.prompt' 或 const prompt = require('@system.prompt')
```

## 接口定义

### prompt.showToast(OBJECT)

显示 Toast

#### 参数：

| 参数名   | 类型   | 必填 | 说明                       |
| -------- | ------ | ---- | -------------------------- |
| message  | String | 是   | 要显示的文本               |
| duration | Number | 否   | 0 为短时，1 为长时，默认 0 |

#### 示例：

```javascript
prompt.showToast({
  message: 'message'
})
```

### prompt.showDialog(OBJECT)

显示对话框

#### 参数：

| 参数名             | 类型     | 必填 | 说明                                                                                                                                                                                                                    |
| ------------------ | -------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title              | String   | 否   | 标题                                                                                                                                                                                                                    |
| message            | String   | 否   | 内容                                                                                                                                                                                                                    |
| buttons            | Array    | 否   | 按钮的数组，按钮结构：{text:'text',color:'#333333'}，color 可选：buttons 的第 1 项为 positive button；buttons 的第 2 项（如果有）为 negative button；buttons 的第 3 项（如果有）为 neutral button。最多支持 3 个 button |
| autocancel `1060+` | Boolean  | 否   | 是否在点击遮罩时关闭对话框，默认为true                                                                                                                                                                                  |
| success            | Function | 否   | 成功回调                                                                                                                                                                                                                |
| cancel             | Function | 否   | 取消回调                                                                                                                                                                                                                |
| complete           | Function | 否   | 执行结束后的回调                                                                                                                                                                                                        |

##### success 返回值：

| 参数名 | 类型    | 说明                            |
| ------ | ------- | ------------------------------- |
| index  | Integer | 选中按钮在 buttons 数组中的序号 |

#### 示例：

```javascript
prompt.showDialog({
  title: 'title',
  message: 'message',
  buttons: [
    {
      text: 'btn',
      color: '#33dd44'
    }
  ],
  success: function(data) {
    console.log('handling callback')
  },
  cancel: function() {
    console.log('handling cancel')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### prompt.showContextMenu(OBJECT)

显示上下文菜单

#### 参数：

| 参数名    | 类型     | 必填 | 说明             |
| --------- | -------- | ---- | ---------------- |
| itemList  | Array    | 是   | 按钮的文字数组   |
| itemColor | HexColor | 否   | 按钮颜色         |
| success   | Function | 否   | 成功回调         |
| cancel    | Function | 否   | 取消回调         |
| complete  | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名 | 类型    | 说明                             |
| ------ | ------- | -------------------------------- |
| index  | Integer | 选中按钮在 itemList 数组中的序号 |

#### 示例：

```javascript
prompt.showContextMenu({
  itemList: ['item1', 'item2'],
  itemColor: '#ff33ff',
  success: function(data) {
    console.log('handling success')
  },
  cancel: function() {
    console.log('handling cancel')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
