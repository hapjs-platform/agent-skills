# Wi-Fi `1020+`

## 接口声明

```json
{ "name": "system.wifi" }
```

## 导入模块

```javascript
import wifi from '@system.wifi' 或 const wifi = require('@system.wifi')
```

## 接口定义

### 方法

#### wifi.connect(OBJECT)

连接 Wi-Fi。若已知 Wi-Fi 信息，可以直接利用该接口连接。

##### 权限要求

粗略设备定位

##### 参数：

| 参数名   | 类型     | 必填 | 说明                                |
| -------- | -------- | ---- | ----------------------------------- |
| SSID     | String   | 是   | Wi-Fi 设备的 SSID                   |
| BSSID    | String   | 是   | Wi-Fi 设备的 BSSID                  |
| password | String   | 否   | Wi-Fi 设备密码                      |
| success  | Function | 否   | 成功回调，此时 Wi-Fi 已经成功连接上，但是不表示当前请求数据使用的是Wi-Fi网络，如需在耗流量操作前确认当前是否使用Wi-Fi联网，请使用[network接口](network.md) |
| fail     | Function | 否   | 失败回调                            |
| complete | Function | 否   | 执行结束后的回调                    |

##### fail 返回错误代码：

| 错误码 | 说明                   |
| ------ | ---------------------- |
| 500    | 应用在后台无法进行操作 |
| 1000   | Wi-Fi 密码错误         |
| 1001   | 连接超时               |
| 1002   | 重复连接 Wi-Fi         |
| 1003   | 未打开 Wi-Fi 开关      |
| 1005   | 无效 SSID              |

##### 示例：

```javascript
wifi.connect({
  SSID: '',
  BSSID: '',
  success: function() {
    console.log('connect wifi success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### wifi.scan(OBJECT)

请求获取 Wi-Fi 列表，在 onscanned 事件中返回 Wi-Fi 列表数据。

##### 权限要求

粗略设备定位

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 扫描请求发起成功 |
| fail     | Function | 否   | 扫描请求发起失败 |
| complete | Function | 否   | 执行结束后的回调 |

##### fail 返回错误代码：

| 错误码 | 说明                                                                                                |
| ------ | --------------------------------------------------------------------------------------------------- |
| 500    | 应用在后台无法进行操作                                                                              |
| 1003   | 未打开 Wi-Fi 开关                                                                                   |
| 1004   | 未打开位置服务开关。Android 6.0 及以上版本，没有打开位置服务开关会导致无法正常扫描周边的 Wi-Fi 信息 |

##### 示例：

```javascript
wifi.scan({
  success: function() {
    console.log('scan success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

#### wifi.getConnectedWifi(OBJECT)

获取已连接中的 Wi-Fi 信息

##### 权限要求

粗略设备定位

##### 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调         |
| fail     | Function | 否   | 失败回调         |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数           | 类型    | 说明           |
| -------------- | ------- | -------------- |
| SSID           | String  | Wi-Fi 的 SSID  |
| BSSID          | String  | Wi-Fi 的 BSSID |
| secure         | Boolean | Wi-Fi 是否安全 |
| signalStrength | Number  | Wi-Fi 信号强度 |

##### fail 返回错误代码：

| 错误码 | 说明                   |
| ------ | ---------------------- |
| 200    | 当前没有 Wi-Fi 连接    |
| 500    | 应用在后台无法进行操作 |
| 1003   | 未打开 Wi-Fi 开关      |

##### 示例：

```javascript
wifi.getConnectedWifi({
  success: function(data) {
    console.log(`handling success: ${data.SSID}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### 事件

#### wifi.onscanned = function(data)

监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。

##### 权限要求

粗略设备定位

##### 返回参数说明：

| 参数     | 类型  | 说明           |
| -------- | ----- | -------------- |
| wifiList | Array | Wi-Fi 列表数据 |

##### Wi-Fi 列表项说明：

| 参数           | 类型    | 说明           |
| -------------- | ------- | -------------- |
| SSID           | String  | Wi-Fi 的 SSID  |
| BSSID          | String  | Wi-Fi 的 BSSID |
| secure         | Boolean | Wi-Fi 是否安全 |
| signalStrength | Number  | Wi-Fi 信号强度 |

##### 示例：

```javascript
wifi.onscanned = function(data) {
  for (const i in data.wifiList) {
    console.log(`wifi: ${data.wifiList[i].SSID}`)
  }
}
```

#### wifi.onstatechanged = function(data)

监听连接和断开 Wi-Fi 的事件。

##### 权限要求

粗略设备定位

##### 返回参数说明：

| 参数           | 类型    | 说明                                               |
| -------------- | ------- | -------------------------------------------------- |
| state          | Number  | Wi-Fi 是否连接的状态标识。连接断开：0；连接成功：1。连接成功不表示当前请求数据使用的是Wi-Fi网络，仅表示Wi-Fi的连接状态，如需在耗流量操作前确认当前是否使用Wi-Fi联网，请使用[network接口](network.md) |
| SSID           | String  | Wi-Fi 的 SSID。连接成功时有效                      |
| BSSID          | String  | Wi-Fi 的 BSSID。连接成功时有效                     |
| secure         | Boolean | Wi-Fi 是否安全。连接成功时有效                     |
| signalStrength | Number  | Wi-Fi 信号强度。连接成功时有效                     |

##### 示例：

```javascript
wifi.onstatechanged = function(data) {
  console.log(`handling wifi state changed: ${data.state}`)
}
```

## 后台运行限制
禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。