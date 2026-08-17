# 分享 share

## 接口声明

```json
{ "name": "system.share" }
```

## 导入模块

```javascript
import share from '@system.share' 或 const share = require('@system.share')
```

## 接口定义

### share.share(OBJECT)

分享数据到其他 app

#### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                                                                                                                                                                                                                    |
| -------- | -------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | String   | 是   | 数据的 MIME TYPE，要求字母全小写                                                                                                                                                                                                                                                        |
| data     | String   | 是   | 分享的数据：1. 如果 type 是 text/开头的 mimetype（如 text/plain），则 data 是要分享的文本内容；2. 如果 type 是其他值，则 data 是要分享的文件路径。支持三种文件路径：1. 通过 fetch.fetch 下载的文件路径；2. 通过 file.save 或 file.list 获得的文件路径；3. 以/开头的应用内部的资源文件。 |
| success  | Function | 否   | 成功回调。因为大部分 android app 都没有正确的返回分享状态，所以即使分享成功了，也可能执行 cancel 回调，而不是 success 回调。                                                                                                                                                            |
| fail     | Function | 否   | 失败回调                                                                                                                                                                                                                                                                                |
| cancel   | Function | 否   | 取消回调                                                                                                                                                                                                                                                                                |
| complete | Function | 否   | 执行结束后的回调                                                                                                                                                                                                                                                                        |

#### 示例：

```javascript
share.share({
  type: 'text/html',
  data: '<b>bold</b>',
  success: function(data) {
    console.log('handling success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
