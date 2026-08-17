# 日志打印 console

## 接口声明

无需声明

## 导入模块

无需导入

## 接口定义

### console.debug/log/info/warn/error(message)

打印一段文本

#### 参数：

| 参数    | 类型   | 必填 | 说明                                                          |
| ------- | ------ | ---- | ------------------------------------------------------------- |
| message | String | 是   | 要打印的文本，也可以是格式化文本，规则与浏览器的 console 相同 |

#### 示例：

```javascript
console.log('log:我是log')
console.debug('debug:我是debug')
console.info('info:我是info')
console.warn('warn:我是warn')
console.error('error:我是error')
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
