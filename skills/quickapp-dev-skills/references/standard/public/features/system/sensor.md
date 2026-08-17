# 传感器 sensor

## 接口声明

```json
{ "name": "system.sensor" }
```

## 导入模块

```javascript
import sensor from '@system.sensor' 或 const sensor = require('@system.sensor')
```

## 接口定义

### sensor.subscribeAccelerometer(OBJECT)

监听重力感应数据。如果多次调用，仅最后一次调用生效

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                        |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+` | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| interval `1060+` | String| 否 | 监听加速度数据回调函数的执行频率，默认normal |
| callback         | Function | 是   | 重力感应数据变化后会回调此函数。                                                            |

interval 的合法值：

| 值 | 说明 |
| --- | --- |
| game | 适用于更新游戏的回调频率，在 20ms/次 左右 |
| ui | 适用于更新 UI 的回调频率，在 60ms/次 左右 |
| normal | 普通的回调频率，在 200ms/次 左右 |

##### callback 返回值：

| 参数名 | 类型    | 说明     |
| ------ | ------- | -------- |
| x      | Integer | x 轴坐标 |
| y      | Integer | y 轴坐标 |
| z      | Integer | z 轴坐标 |

#### 示例：

```javascript
sensor.subscribeAccelerometer({
  callback: function(ret) {
    console.log(`handling callback, x = ${ret.x}, y = ${ret.y}, z = ${ret.z}`)
  }
})
```

### sensor.unsubscribeAccelerometer()

取消监听重力感应数据

#### 参数：

无

#### 示例：

```javascript
sensor.unsubscribeAccelerometer()
```

### sensor.subscribeCompass(OBJECT)

监听罗盘数据。如果多次调用，仅最后一次调用生效

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                        |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+` | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| callback         | Function | 是   | 罗盘数据变化后会回调此函数。                                                                |

##### callback 返回值：

| 参数名    | 类型   | 说明           |
| --------- | ------ | -------------- |
| direction | Number | 表示设备的y轴和地球磁场北极之间的角度，当面朝北，角度为0；朝南角度为π；朝东角度π/2；朝西角度-π/2 |
| accuracy `1080+` | Number | 精度           |

| 值 | 说明          |
| --- | ----------- |
| 3  | 高精度        |
| 2  | 中等精度      |
| 1  | 低精度        |
| -1 | 不可信，传感器失去连接 |
| 0  | 不可信，原因未知 |

#### 示例：

```javascript
sensor.subscribeCompass({
  callback: function(ret) {
    console.log(`handling callback, direction = ${ret.direction}`)
  }
})
```

### sensor.unsubscribeCompass()

取消监听罗盘数据

#### 参数：

无

#### 示例：

```javascript
sensor.unsubscribeCompass()
```

### sensor.subscribeProximity(OBJECT)`1000+`

监听距离感应数据。如果多次调用，仅最后一次调用生效。

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                        |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+` | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| callback         | Function | 是   | 距离感应数据变化后会回调此函数。                                                            |

##### callback 返回值：

| 参数名   | 类型   | 说明                  |
| -------- | ------ | --------------------- |
| distance | Number | 手机距离，单位为 cm。 |

##### fail 返回错误代码

| 错误码 | 说明                     |
| ------ | ------------------------ |
| 203   | 当前设备不支持距离传感器 |

#### 示例：

```javascript
sensor.subscribeProximity({
  callback: function(ret) {
    console.log(`handling callback, distance = ${ret.distance}`)
  }
})
```

### sensor.unsubscribeProximity()`1000+`

取消监听距离感应数据。

#### 参数：

无

#### 示例：

```javascript
sensor.unsubscribeProximity()
```

### sensor.subscribeLight(OBJECT)`1000+`

监听光线感应数据。如果多次调用，仅最后一次调用生效。

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                        |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+` | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| callback         | Function | 是   | 光线感应数据变化后会回调此函数。                                                            |

##### callback 返回值：

| 参数名    | 类型   | 说明                 |
| --------- | ------ | -------------------- |
| intensity | Number | 光线强度，单位为 lux |

#### 示例：

```javascript
sensor.subscribeLight({
  callback: function(ret) {
    console.log(`handling callback, intensity = ${ret.intensity}`)
  }
})
```

### sensor.unsubscribeLight()`1000+`

取消监听光线感应数据。

#### 参数：

无

#### 示例：

```javascript
sensor.unsubscribeLight()
```

### sensor.subscribeStepCounter(OBJECT)`1050+`

监听计步传感器数据。如果多次调用，仅最后一次调用生效。

#### 参数：

| 参数名           | 类型     | 必填 | 说明                                                                                        |
| ---------------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| reserved `1050+` | Boolean  | 否   | 是否持久化订阅，默认为 false。机制：设置为 true，页面跳转，不会自动取消订阅，需手动取消订阅 |
| callback         | Function | 是   | 计步传感器数据变化后会回调此函数。                                                          |
| fail             | Function | 否   | 失败回调                                                                                    |

##### callback 返回值：

| 参数名 | 类型   | 说明                                                                      |
| ------ | ------ | ------------------------------------------------------------------------- |
| steps  | Number | 计步传感器当前累计记录的步数。每次手机重启，这个值就会从 0 开始重新计算。 |

##### fail 返回错误代码

| 错误码 | 说明                     |
| ------ | ------------------------ |
| 1000   | 当前设备不支持计步传感器 |

#### 示例：

```javascript
sensor.subscribeStepCounter({
  callback: function(ret) {
    console.log(`handling callback, steps = ${ret.steps}`)
  },
  fail: function(data, code) {
    console.log(`handling fail, code = ${code}`)
  }
})
```

### sensor.unsubscribeStepCounter()`1050+`

取消监听计步传感器数据。

#### 参数：

无

#### 示例：

```javascript
sensor.unsubscribeStepCounter()
```

## 后台运行限制

无限制。
后台运行详细用法参见[后台运行 脚本](../../framework/background-running.md)。
