# 数据存储 storage

## 接口声明

```json
{ "name": "system.storage" }
```

## 导入模块

```javascript
import storage from '@system.storage' 或 const storage = require('@system.storage')
```

## 接口定义

### 方法

#### storage.get(OBJECT)

读取存储内容

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                        |
| -------- | -------- | ---- | --------------------------------------------------------------------------- |
| key      | String   | 是   | 索引                                                                        |
| default  | String   | 否   | 如果 key 不存在，返回 default。如果 default 未指定，返回长度为 0 的空字符串 |
| success  | Function | 否   | 成功回调                                                                    |
| fail     | Function | 否   | 失败回调                                                                    |
| complete | Function | 否   | 执行结束后的回调                                                            |

##### success 返回值：

key 对应的存储内容

##### 示例：

```javascript
storage.get({
  key: 'A1',
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### storage.set(OBJECT)

修改存储内容

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                                             |
| -------- | -------- | ---- | ---------------------------------------------------------------- |
| key      | String   | 是   | 索引                                                             |
| value    | String   | 否   | 新值。如果新值是长度为 0 的空字符串，会删除以 key 为索引的数据项 |
| success  | Function | 否   | 成功回调                                                         |
| fail     | Function | 否   | 失败回调                                                         |
| complete | Function | 否   | 执行结束后的回调                                                 |

##### 示例：

```javascript
storage.set({
  key: 'A1',
  value: 'V1',
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### storage.clear(OBJECT)

清空存储内容

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### 示例：

```javascript
storage.clear({
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### storage.delete(OBJECT)

删除存储内容

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| key      | String   | 是   | 索引             |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### 示例：

```javascript
storage.delete({
  key: 'A1',
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### storage.key(OBJECT) `1050+`

返回存储中某个 index 的键名

##### 参数：

| 参数名   | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| index    | Number   | 是   | 要查询的键名对应的索引 |
| success  | Function | 否   | 成功回调               |
| fail     | Function | 否   | 失败回调               |
| complete | Function | 否   | 执行结束后的回调       |

##### success 返回值：

index 对应的键名

##### 示例：

```javascript
storage.key({
  index: 1,
  success: function(data) {
    console.log(`handling success, key = ${data}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### 属性

| 名称             | 参数类型 | 是否可读 | 是否可写 | 描述                 |
| ---------------- | -------- | -------- | -------- | -------------------- |
| length `1050+`　 | Number   | 是       | 否       | 存储里的数据项的数量 |

#### 示例：

```javascript
let length = storage.length
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。