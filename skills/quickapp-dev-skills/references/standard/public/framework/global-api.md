# 全局方法

## 框架全局方法

快应用框架层提供了前端开发中常用的若干全局方法，包括 setTimeout、setInterval、clearTimeout、clearInterval `1000+`、TextDecoder `1080+` 等。

### setTimeout 等 `1000+`

setTimeout、setInterval、clearTimeout、clearInterval 与浏览器上用法一致，示例如下：

```javascript
let myFunction = setTimeout(() => {
  console.log(`等待 3s 执行`)
}, 3 * 1000)

clearTimeout(myFunction) // 清除定时函数
```

### TextDecoder `1080+`

由快应用框架层提供的全局类 TextDecoder ，用于将字节流解码为字符串，使用方法与浏览器上一致。详情请参考[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder/TextDecoder)

#### new TextDecoder([encoding], [params])

| 参数     | 类型   | 默认值         | 必填 | 描述               |
| -------- | ------ | -------------- | ---- | ------------------ |
| encoding | String | 'utf-8'        | 否   | 解码器所用编码格式 |
| params   | Object | 见`params`定义 | 否   | 解码器参数         |

params 定义：

| 参数      | 类型    | 默认值 | 必填 | 描述              |
| --------- | ------- | ------ | ---- | ----------------- |
| fatal     | Boolean | false  | 否   | 是否显示致命错误  |
| ignoreBOM | Boolean | false  | 否   | 是否忽略 BOM 标记 |

示例代码：

```javascript
let u8arr = new Uint8Array([229, 191, 171, 229, 186, 148, 231, 148, 168])
let utf8decoder = new TextDecoder()
console.log(utf8decoder.decode(u8arr)) // '快应用'
```

注意：

安卓 5 机型可能存在部分特殊字符 textDecoder 解码异常情况，请开发者留意。
