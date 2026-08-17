# 通知消息 notification

## 接口声明

```json
{ "name": "system.notification" }
```

## 导入模块

```javascript
import notification from '@system.notification' 或 const notification = require('@system.notification')
```

## 接口定义

### notification.show(OBJECT)

显示通知

####参数：

| 参数名       | 类型   | 必填 | 说明                     |
| ------------ | ------ | ---- | ------------------------ |
| contentTitle | String | 否   | 标题                     |
| contentText  | String | 否   | 内容                     |
| clickAction  | Object | 否   | 通知点击后触发动作的信息 |

##### clickAction:

| 参数名 | 类型   | 必填 | 说明                                                                                                                                                                                                                                                                                                                    |
| ------ | ------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| uri    | String | 是   | 点击通知后跳转的页面地址。支持的格式包括：<ol><li> 以"/"开头的应用内页面的路径；例：/about</li><li> 以非"/"开头的应用内页面的名称；例：About</li><li>特殊的，如果 uri 的值是"/"，则跳转到 path 为"/"的页，没有则跳转到首页</li></ol>可以通过"?param1=value1"的方式添加参数，参数可以在目标页面中通过`this.param1`的方式使用。使用`this.param1`变量时，需要在目标页面中在 `public`（应用外传参）或 `protected` (应用内传参)下定义 key 名相同的属性 |

#### 示例：

```javascript
notification.show({
  contentTitle: 'title',
  clickAction: {
    uri: '/index.html?index=1'
  }
})
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
