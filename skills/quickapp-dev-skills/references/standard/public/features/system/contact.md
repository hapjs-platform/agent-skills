# 联系人 contact `1010+`

## 接口声明

```json
{ "name": "system.contact" }
```

## 导入模块

```javascript
import contact from '@system.contact' 或 var contact = require("@system.contact")
```

## 接口定义

### contact.pick(OBJECT)

选择联系人

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名      | 类型   | 说明       |
| ----------- | ------ | ---------- |
| displayName | String | 联系人名称 |
| number      | String | 电话号码   |

#### 示例：

```javascript
contact.pick({
  success: function(data) {
    console.log('contact: name=' + data.displayName + ', number=' + data.number)
  },
  fail: function(data, code) {
    console.log('handling fail, code=' + code)
  }
})
```

### contact.list(OBJECT) `1050+`

获取通讯录所有联系人列表，每次获取都需要用户授权

#### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名      | 类型  | 说明       |
| ----------- | ----- | ---------- |
| contactList | Array | 联系人列表 |

##### 联系人列表项参数：

| 参数名      | 类型   | 说明       |
| ----------- | ------ | ---------- |
| displayName | String | 联系人名称 |
| number      | String | 电话号码   |

#### 示例：

```javascript
contact.list({
  success: function(data) {
    for (const i in data.contactList) {
      console.log(
        `name: ${data.contactList[i].displayName},number:${
          data.contactList[i].number
        }`
      )
    }
  },
  fail: function(data, code) {
    console.log('handling fail, code=' + code)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
