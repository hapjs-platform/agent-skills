# 后台运行 resident `1050+`

为了节省系统资源，通常情况下，快应用切换到后台后将会暂停运行。如果有后台运行的需求，快应用需要在 manifest 中申请，
并使用本接口启动后台运行模式。后台运行详细使用方法参见[后台运行 脚本](../../framework/background-running.md)。

## 接口声明

```
{ "name": "system.resident" }
```

## 导入模块

```
import resident from '@system.resident' 或 const resident = require('@system.resident')
```

## 接口定义

### resident.start(OBJECT)

启动后台运行。  
此接口可多次调用，最后一次调用时的 desc 参数作为描述文案显示到通知栏上(有音乐播放通知时，不显示本通知)。

参数：

| 参数名 | 类型   | 必填 | 说明                   |
| ------ | ------ | ---- | ---------------------- |
| desc   | String | 否   | 更新后台通知的描述信息 |

示例：

```
resident.start({
  desc: '备份进度 30%'
})
```

### resident.stop()

停止后台运行。  
即使 start 调用多次，stop 调用一次即可停止后台运行。

参数：无

示例：

```
resident.stop()
```

## 后台运行限制

无限制。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
