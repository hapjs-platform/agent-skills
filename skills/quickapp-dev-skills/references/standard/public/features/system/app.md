# 应用上下文 app

## 接口声明

无需声明

## 导入模块

```javascript
import app from '@system.app' 或 const app = require('@system.app')
```

## 接口定义

### app.getInfo()

获取当前应用信息

#### 参数：

无

#### 返回值：

| 参数名              | 类型    | 说明         |
| ------------------- | ------- | ------------ |
| packageName `1050+` | String  | 应用包名     |
| icon `1050+`        | String  | 应用图标路径 |
| name                | String  | 应用名称     |
| versionName         | String  | 应用版本名称 |
| versionCode         | Integer | 应用版本号   |
| logLevel            | String  | log 级别     |
| source              | Object  | 应用来源     |

##### source

| 参数名      | 类型   | 说明                                                                                       |
| ----------- | ------ | ------------------------------------------------------------------------------------------ |
| packageName | String | 来源 app 的包名，一级来源                                                                  |
| type        | String | 来源类型，二级来源，值为 `shortcut`、`push`、`url`、`barcode`、`nfc`、`bluetooth`、`other` |
| extra       | Object | 来源其他信息，与 type 相关，不同的 type，extra 中的字段会不同                              |

###### extra

- type=shortcut
  - scene：三级来源，表示快捷方式创建的场景，值为 `dialog`（平台内部策略 Dialog 弹窗创建）、`api`（[API 接口调用创建](shortcut.md)）、`web`（H5 站接入流量切换，浏览时创建）、`other`
  - original：原始来源 source，表示快捷方式创建时的来源

#### 示例：

```javascript
console.log(JSON.stringify(app.getInfo()))
```

```json
// console 值打印
{
  // 应用包名
  "packageName": "com.example.demo",
  // 应用名称
  "name": "demo",
  // 应用版本名称
  "versionName": "1.0.0",
  // 应用版本号
  "versionCode": 1,
  // 应用图片
  "icon": "/Common/logo.png",
  // log 级别
  "logLevel": "debug",
  // 应用来源
  "source": {
    // 来源app的包名
    "packageName": "org.hapjs.mockup",
    // 来源类型
    "type": "other",
    // 来源其他信息
    "extra": {}
  }
}
```

### app.createQuickAppQRCode() `1070+`

生成快应用分享二维码

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                                                |
| -------- | -------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| path     | String     | 否   | 页面路径，可携带参数                                            |
| success  | Function   | 否   | 成功回调                                                        |
| fail     | Function   | 否   | 失败回调                                                        |

#### success 返回值

| 参数名  | 类型    | 说明                                               |
| ------- | ------- | -------------------------------------------------- |
| uri | String | 二维码文件地址 |

#### fail 返回错误代码：

| 错误码 | 说明                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 200    | 运行错误                           |

#### 示例：

```javascript
  app.createQuickAppQRCode({
    path: ‘/component/basic/image?key1=value1&key2=value2’,
    success: function(data) {
      console.log(`handling success: ${data.uri}`)
    },
    fail: function(data, code) {
      console.log(`handling fail, code = ${code}`)
    }
  })
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
