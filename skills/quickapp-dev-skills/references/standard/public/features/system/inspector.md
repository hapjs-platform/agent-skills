# Inspector `1080+`

## 接口定义

接口定义和 Node.js https://nodejs.org/dist/latest-v12.x/docs/api/inspector.html#inspector_session_connect 保持一致 

接口定义:
Session为全局对象

### session.connect()
建立Session后，进行连接
### session.disconnect()
断开session
### session.post(method[, params][, callback])
| 参数名   | 类型     | 必填 | 说明                                                                       |
| -------- | -------- | ---- | -------------------------------------------------------------------------- |
| method      | String   | 是   | Inspector protocol方法名称
| params  | Object  | 否   | Inspector protocol方法参数                                      |
| callback    | Function   | 否   | 方法回调                  |

往inspector发送消息。
```js
session.post('Runtime.evaluate', { expression: '2 + 2' },
             (error, { result }) => console.log(result));
// Output: { type: 'number', value: 4, description: '4' }
```

最新的 V8 Inspector protocol 参考 https://chromedevtools.github.io/devtools-protocol/v8/

## 示例代码

```javascript
require('@system.prompt').showToast({message: "start profile"})
const session = new Session()
session.connect()
session.post('Profiler.enable', () => {
session.post('Profiler.start', () => {
    this.append()
    setTimeout(() => {
    session.post('Profiler.stop', (error, { profile }) => {
        console.warn(`pp`, profile)
        require('@system.prompt').showToast({message: "finish Profile"})
        const p = JSON.stringify(profile)
        session.disconnect()
        // 用文件存起，存到internal mass, 然后用adb取出来， 用Chrome devtools的`Performance`面板查看
        // adb命令示例， `com.application.demo`换成当前使用的快应用包名
        // adb pull /storage/emulated/0/Android/data/org.hapjs.mockup/files/com.application.demo/profile.cpuprofile
        file.writeText({
        uri: 'internal://mass/profile.cpuprofile',
        text: p,
        success: function () {
            require('@system.prompt').showToast({ message: 'handling success' })
        },
        fail: function (data, code) {
            require('@system.prompt').showToast({ message: `handling fail, code = ${code}` })
        },
        })

    })
    }, 2 * 1000)
})

```