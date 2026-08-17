# 蓝牙 bluetooth `1040+`

## 接口声明

```json
{ "name": "system.bluetooth" }
```

## 导入模块

```javascript
import bluetooth from '@system.bluetooth' 或 var bluetooth = require("@system.bluetooth")
```

## 接口定义

### bluetooth.openAdapter(OBJECT)

初始化蓝牙模块

#### 参数：

| 参数名         | 类型     | 必填 | 说明                                                                                            |
| -------------- | -------- | ---- | ----------------------------------------------------------------------------------------------- |
| operateAdapter | Boolean  | 否   | 是否打开系统蓝牙开关。设置为 true，在系统蓝牙开关关闭的情况下会弹框提示是否打开。默认值 false。 |
| success        | Function | 否   | 成功回调。                                                                                      |
| fail           | Function | 否   | 失败回调。                                                                                      |
| complete       | Function | 否   | 执行结束后的回调。                                                                              |

#### 示例：

```javascript
bluetooth.openAdapter({
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.closeAdapter(OBJECT)

关闭蓝牙模块。调用该方法将断开所有已建立的连接并释放系统资源。建议在使用蓝牙流程后，与 bluetooth.openAdapter 成对调用。

#### 参数：

| 参数名         | 类型     | 必填 | 说明                                                                        |
| -------------- | -------- | ---- | --------------------------------------------------------------------------- |
| operateAdapter | Boolean  | 否   | 是否关闭系统蓝牙开关。设置为 true，调用时会关闭系统蓝牙开关。默认值 false。 |
| success        | Function | 否   | 成功回调。                                                                  |
| fail           | Function | 否   | 失败回调。                                                                  |
| complete       | Function | 否   | 执行结束后的回调。                                                          |

#### 示例：

```javascript
bluetooth.closeAdapter({
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.getAdapterState(OBJECT)

获取本机蓝牙适配器状态。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明             |
| -------- | -------- | ---- | ---------------- |
| success  | Function | 否   | 成功回调。       |
| fail     | Function | 否   | 失败回调。       |
| complete | Function | 否   | 执行结束后的回调 |

##### success 返回值：

| 参数名      | 类型    | 描述               |
| ----------- | ------- | ------------------ |
| available   | Boolean | 蓝牙适配器是否可用 |
| discovering | Boolean | 是否正在搜索设备   |

#### 示例：

```javascript
bluetooth.getAdapterState({
  success: function(data) {
    console.log(
      `handling adapter state, available = ${data.available}, discovering = ${
        data.discovering
      }`
    )
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.onadapterstatechange = function(data)

监听蓝牙适配器状态变化事件

#### data 返回值：

| 参数名      | 类型    | 描述                       |
| ----------- | ------- | -------------------------- |
| available   | Boolean | 蓝牙适配器是否可用         |
| discovering | Boolean | 蓝牙适配器是否处于搜索状态 |

#### 示例：

```javascript
bluetooth.onadapterstatechange = function(data) {
  console.log('adapterState changed, now is', data.available)
}
```

### bluetooth.startDevicesDiscovery(OBJECT)

开始搜寻附近的蓝牙外围设备。**此操作比较耗费系统资源，请在搜索并连接到设备后调用 bluetooth.stopDevicesDiscovery 方法停止搜索。**

#### OBJECT 参数：

| 参数名             | 类型     | 必填 | 说明                                                                                                                                                                                              |
| ------------------ | -------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| services           | String[] | 否   | 要搜索的主 service 的 uuid 列表。某些蓝牙设备会广播自己的主 service 的 uuid。如果设置此参数，则只搜索广播包有对应 uuid 的主服务的蓝牙设备。建议主要通过该参数过滤掉周边不需要处理的其他蓝牙设备。 |
| allowDuplicatesKey | Boolean  | 否   | 默认值为 false。是否允许重复上报同一设备。如果允许重复上报，则 bluetooth.ondevicefound 方法会多次上报同一设备，但是 RSSI 值会有不同。                                                             |
| interval           | Number   | 否   | 单位毫秒，默认值为 0。上报设备的间隔。0 表示找到新设备立即上报，其他数值根据传入的间隔上报。                                                                                                      |
| success            | Function | 否   | 成功回调。                                                                                                                                                                                        |
| fail               | Function | 否   | 失败回调。                                                                                                                                                                                        |
| complete           | Function | 否   | 执行结束后的回调。                                                                                                                                                                                |

#### 示例：

```javascript
bluetooth.startDevicesDiscovery({
  services: ['FEE7'],
  success: function() {
    console.log('success')
  }
})
```

### bluetooth.stopDevicesDiscovery(OBJECT)

停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明               |
| -------- | -------- | ---- | ------------------ |
| success  | Function | 否   | 成功回调。         |
| fail     | Function | 否   | 失败回调。         |
| complete | Function | 否   | 执行结束后的回调。 |

#### 示例：

```javascript
bluetooth.stopDevicesDiscovery({
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.getDevices(OBJECT)

获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明               |
| -------- | -------- | ---- | ------------------ |
| success  | Function | 否   | 成功回调。         |
| fail     | Function | 否   | 失败回调。         |
| complete | Function | 否   | 执行结束后的回调。 |

##### success 返回值：

| 参数名  | 类型     | 描述                             |
| ------- | -------- | -------------------------------- |
| devices | Object[] | 蓝牙模块生效期间已发现的蓝牙设备 |

##### devices 返回值：

| 参数名               | 类型        | 说明                                                                                                                 |
| -------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| name                 | String      | 蓝牙设备名称，某些设备可能没有                                                                                       |
| deviceId             | String      | 用于区分设备的 id                                                                                                    |
| RSSI                 | Number      | 当前蓝牙设备的信号强度                                                                                               |
| advertisData         | ArrayBuffer | 当前蓝牙设备的广播数据段中的 ManufacturerData 数据段                                                                 |
| advertisServiceUUIDs | String[]    | 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段                                                                     |
| localName            | String      | 当前蓝牙设备的广播数据段中的 LocalName 数据段                                                                        |
| serviceData          | Object      | 当前蓝牙设备的广播数据段中的 ServiceData 数据段，key 为 uuid 的 String 值，value 为对应的 ServiceData 的 ArrayBuffer |

#### 示例：

```javascript
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
bluetooth.getDevices({
  success: function(data) {
    console.log('get device list has founded')
    data.devices.forEach(device => {
      console.log(`handling devive:${JSON.stringify(device)}`)
      console.log(`handling advertisData = ${ab2hex(device.advertisData)}`)
      for (let key in device.serviceData) {
        console.log(
          `handling serviceData: uuid = ${key}, serviceData = ${ab2hex(
            device.serviceData[key]
          )}`
        )
      }
    })
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.ondevicefound = function(data)

监听寻找到新设备的事件

#### data 返回值：

| 参数名  | 类型     | 描述                                            |
| ------- | -------- | ----------------------------------------------- |
| devices | Object[] | 新搜索到的设备列表，devices 返回值见 getDevices |

#### 示例：

```javascript
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
bluetooth.ondevicefound = function(data) {
  console.log('new device list has founded')
  data.devices.forEach(device => {
    console.log(`handling find new devive:${JSON.stringify(device)}`)
    console.log(`handling advertisData = ${ab2hex(device.advertisData)}`)

    for (let key in device.serviceData) {
      console.log(
        `handling serviceData: uuid = ${key}, serviceData = ${ab2hex(
          device.serviceData[key]
        )}`
      )
    }
  })
}
```

### bluetooth.getConnectedDevices(OBJECT)

根据 uuid 获取处于已连接状态的设备。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明                            |
| -------- | -------- | ---- | ------------------------------- |
| success  | Function | 否   | 成功回调。                      |
| fail     | Function | 否   | 失败回调。                      |
| complete | Function | 否   | 执行结束后的回调。              |
| services | String[] | 是   | 蓝牙设备主 service 的 uuid 列表 |

##### success 返回值：

| 参数名  | 类型     | 描述                        |
| ------- | -------- | --------------------------- |
| devices | Object[] | uuid 对应的的已连接设备列表 |

##### devices 返回值：

| 参数名   | 类型   | 说明                           |
| -------- | ------ | ------------------------------ |
| name     | String | 蓝牙设备名称，某些设备可能没有 |
| deviceId | String | 用于区分设备的 id              |

#### 示例：

```javascript
bluetooth.getConnectedDevices({
  success: function(data) {
    console.log(data)
    if (data.devices[0]) {
      console.log(data.devices[0].name)
    }
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.createBLEConnection(OBJECT)

连接低功耗蓝牙设备。若快应用有搜索过某个蓝牙设备，并成功建立连接，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明                                |
| -------- | -------- | ---- | ----------------------------------- |
| deviceId | String   | 是   | 用于区分设备的 id                   |
| timeout  | Number   | 否   | 超时时间，单位 ms，不填表示不会超时 |
| success  | Function | 否   | 成功回调。                          |
| fail     | Function | 否   | 失败回调。                          |
| complete | Function | 否   | 执行结束后的回调。                  |

#### 示例：

```javascript
bluetooth.createBLEConnection({
  deviceId: deviceId,
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.closeBLEConnection (OBJECT)

断开与低功耗蓝牙设备的连接。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明               |
| -------- | -------- | ---- | ------------------ |
| deviceId | String   | 是   | 用于区分设备的 id  |
| success  | Function | 否   | 成功回调。         |
| fail     | Function | 否   | 失败回调。         |
| complete | Function | 否   | 执行结束后的回调。 |

#### 示例：

```javascript
bluetooth.closeBLEConnection({
  deviceId: deviceId,
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.getBLEDeviceServices(OBJECT)

获取蓝牙设备所有服务(service)。

#### OBJECT 参数：

| 参数名   | 类型     | 必填 | 说明               |
| -------- | -------- | ---- | ------------------ |
| deviceId | String   | 是   | 蓝牙设备 id        |
| success  | Function | 否   | 成功回调。         |
| fail     | Function | 否   | 失败回调。         |
| complete | Function | 否   | 执行结束后的回调。 |

##### success 返回值：

| 参数名   | 类型     | 描述         |
| -------- | -------- | ------------ |
| services | Object[] | 设备服务列表 |

##### services 返回值：

| 参数名    | 类型    | 说明                |
| --------- | ------- | ------------------- |
| uuid      | String  | 蓝牙设备服务的 uuid |
| isPrimary | Boolean | 该服务是否为主服务  |

#### 示例：

```javascript
bluetooth.getBLEDeviceServices({
  deviceId: deviceId,
  success: function(data) {
    data.services.forEach(service => {
      console.log(
        `handling device services: uuid = ${service.uuid}, isPrimary = ${
          service.isPrimary
        }`
      )
    })
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.getBLEDeviceCharacteristics(OBJECT)

获取蓝牙设备某个服务中所有特征值(characteristic)。

#### OBJECT 参数：

| 参数名    | 类型     | 必填 | 说明                                              |
| --------- | -------- | ---- | ------------------------------------------------- |
| success   | Function | 否   | 成功回调。                                        |
| fail      | Function | 否   | 失败回调。                                        |
| complete  | Function | 否   | 执行结束后的回调。                                |
| deviceId  | String   | 是   | 蓝牙设备 id                                       |
| serviceId | String   | 是   | 蓝牙服务 uuid，需要使用 getBLEDeviceServices 获取 |

##### success 返回值：

| 参数名          | 类型     | 描述         |
| --------------- | -------- | ------------ |
| characteristics | Object[] | 设备服务列表 |

##### characteristics 返回值：

| 参数名     | 类型   | 说明                   |
| ---------- | ------ | ---------------------- |
| uuid       | String | 蓝牙设备特征值的 uuid  |
| properties | Object | 该特征值支持的操作类型 |

##### properties 返回值：

| 参数名   | 类型    | 说明                           |
| -------- | ------- | ------------------------------ |
| read     | Boolean | 该特征值是否支持 read 操作     |
| write    | Boolean | 该特征值是否支持 write 操作    |
| notify   | Boolean | 该特征值是否支持 notify 操作   |
| indicate | Boolean | 该特征值是否支持 indicate 操作 |

#### 示例：

```javascript
bluetooth.getBLEDeviceCharacteristics({
  deviceId: deviceId,
  serviceId: serviceId,
  success: function(data) {
    data.characteristics.forEach(characteristic => {
      console.log(
        `handling device characteristic : uuid = ${
          characteristic.uuid
        }, can read = ${characteristic.properties.read}`
      )
    })
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.readBLECharacteristicValue(OBJECT)

读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用。

#### OBJECT 参数：

| 参数名           | 类型     | 必填 | 说明                      |
| ---------------- | -------- | ---- | ------------------------- |
| deviceId         | String   | 是   | 蓝牙设备 id               |
| serviceId        | String   | 是   | 蓝牙特征值对应服务的 uuid |
| characteristicId | String   | 是   | 蓝牙特征值的 uuid         |
| success          | Function | 否   | 成功回调。                |
| fail             | Function | 否   | 失败回调。                |
| complete         | Function | 否   | 执行结束后的回调。        |

#### 示例：

```javascript
bluetooth.readBLECharacteristicValue({
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId: deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId: serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId: characteristicId,
  success: function() {
    // 执行操作成功，读取的值会在onblecharacteristicvaluechange 接口中上报
    console.log('success')
  }
})
```

### bluetooth.writeBLECharacteristicValue(OBJECT)

向低功耗蓝牙设备特征值中写入二进制数据。注意：必须设备的特征值支持 write 才可以成功调用。

#### OBJECT 参数：

| 参数名           | 类型        | 必填 | 说明                         |
| ---------------- | ----------- | ---- | ---------------------------- |
| deviceId         | String      | 是   | 蓝牙设备 id                  |
| serviceId        | String      | 是   | 蓝牙特征值对应服务的 uuid    |
| characteristicId | String      | 是   | 蓝牙特征值的 uuid            |
| value            | ArrayBuffer | 是   | 蓝牙设备特征值对应的二进制值 |
| success          | Function    | 否   | 成功回调。                   |
| fail             | Function    | 否   | 失败回调。                   |
| complete         | Function    | 否   | 执行结束后的回调。           |

#### 示例：

```javascript
bluetooth.writeBLECharacteristicValue({
  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound接口中获取
  deviceId: deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId: serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId: characteristicId,
  // 这里的value是ArrayBuffer类型
  value: buffer,
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.notifyBLECharacteristicValueChange(OBJECT)

启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值。注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用。另外，必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件

#### OBJECT 参数：

| 参数名           | 类型     | 必填 | 说明                      |
| ---------------- | -------- | ---- | ------------------------- |
| deviceId         | String   | 是   | 蓝牙设备 id               |
| serviceId        | String   | 是   | 蓝牙特征值对应服务的 uuid |
| characteristicId | String   | 是   | 蓝牙特征值的 uuid         |
| state            | Boolean  | 是   | 是否启用 notify           |
| success          | Function | 否   | 成功回调。                |
| fail             | Function | 否   | 失败回调。                |
| complete         | Function | 否   | 执行结束后的回调。        |

#### 示例：

```javascript
bluetooth.notifyBLECharacteristicValueChange({
  // 启用 notify 功能
  state: true,
  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
  deviceId: deviceId,
  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
  serviceId: serviceId,
  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
  characteristicId: characteristicId,
  success: function() {
    console.log('success')
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  },
  complete: function() {
    console.log('complete')
  }
})
```

### bluetooth.onblecharacteristicvaluechange = function(data)

监听低功耗蓝牙设备的特征值变化。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。

#### data 返回值：

| 参数名           | 类型        | 描述                      |
| ---------------- | ----------- | ------------------------- |
| deviceId         | String      | 蓝牙设备 id               |
| serviceId        | String      | 蓝牙特征值对应服务的 uuid |
| characteristicId | String      | 蓝牙特征值的 uuid         |
| value            | ArrayBuffer | 特征值最新的值            |

#### 示例：

```javascript
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function(bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}
bluetooth.onblecharacteristicvaluechange = function(data) {
  console.log(
    `handling characteristic value change: deviceId = ${
      data.deviceId
    }, serviceId = ${data.serviceId}, characteristicId = ${
      data.characteristicId
    }, value = ${ab2hex(data.value)}`
  )
}
```

### bluetooth.onbleconnectionstatechange = function(data)

监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等

#### data 返回值：

| 参数名    | 类型    | 描述               |
| --------- | ------- | ------------------ |
| deviceId  | String  | 蓝牙设备 id        |
| connected | Boolean | 是否处于已连接状态 |

#### 示例：

```javascript
bluetooth.onbleconnectionstatechange = function(data) {
  console.log(
    `handling device state change: deviceId = ${data.deviceId}, connected = ${
      data.connected
    }`
  )
}
```

## 状态码

| 错误码 | 错误信息             | 描述                        |
| ------ | -------------------- | --------------------------- |
| 0      | ok                   | 正常                        |
| 10000  | not init             | 未初始化蓝牙适配器          |
| 10001  | not available        | 当前系统蓝牙未打开          |
| 10002  | no device            | 没有找到指定设备            |
| 10003  | connection fail      | 连接失败                    |
| 10004  | no service           | 没有找到指定服务            |
| 10005  | no characteristic    | 没有找到指定特征值          |
| 10006  | no connection        | 当前连接已断开              |
| 10007  | property not support | 当前特征值不支持此操作      |
| 10008  | system error         | 其余所有系统上报的异常      |
| 10009  | system not support   | 系统版本低于 4.3 不支持 BLE |
| 10010 `1060+`  | location not turned on  | 定位开关未打开     |

## 后台运行限制

禁止使用。  
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
