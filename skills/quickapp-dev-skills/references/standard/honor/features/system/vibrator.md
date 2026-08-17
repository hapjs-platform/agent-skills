# 卡片震动 vibrator（荣耀专有同名）

> 该接口与公共接口 [`@system.vibrator`](../../../public/features/system/vibrator.md) 同名但实现独立——公共接口仅提供 `vibrate({mode})`，荣耀卡片版本提供 `create` / `start` / `stop` 与 HE 效果对象，支持持续震动与简短震动的组合效果曲线。

> **支持版本**
>
> - 卡片：荣耀引擎 `6052+`
> - 快应用 App：不支持

## 接口声明

```json
{ "name": "system.vibrator" }
```

## 导入模块

```javascript
import vibrator from "@system.vibrator";
```

## 接口定义

### vibrator.create(params)

创建震动，并根据机型返回震动能力支持结果。

#### 参数：

| 参数名 | 类型   | 必填 | 说明                               |
| ------ | ------ | ---- | ---------------------------------- |
| params | Object | 是   | HE 效果对象，见下方「HE 对象格式」 |

#### 返回值：

| 字段    | 类型   | 说明        |
| ------- | ------ | ----------- |
| code    | Number | 返回码      |
| message | String | code 码描述 |

##### 错误码描述：

| code   | message                  | 说明               |
| ------ | ------------------------ | ------------------ |
| 100080 | create VIBRATE error     | 创建震动失败       |
| 100081 | create VIBRATE is empty  | 创建的震动为空     |
| 100082 | support VIBRATE error    | 查询支持震动异常   |
| 100083 | support VIBRATE is empty | 查询支持震动为空   |
| 100084 | VIBRATE is support       | 支持震动，创建成功 |
| 100085 | VIBRATE is not support   | 不支持震动         |

#### HE 对象格式

| 属性     | 类型   | 必填 | 说明                              |
| -------- | ------ | ---- | --------------------------------- |
| Metadata | Object | 是   | 震动描述部分，见「Metadata 对象」 |
| Pattern  | Array  | 是   | 震动效果片段，包含若干 event 对象 |

**Metadata 对象：**

| 属性    | 类型   | 必填 | 说明           |
| ------- | ------ | ---- | -------------- |
| Version | String | 是   | 震动效果的版本 |

**效果片段（Pattern）对象：**

| 属性         | 类型   | 必填 | 说明                                                        |
| ------------ | ------ | ---- | ----------------------------------------------------------- |
| Type         | String | 是   | 事件类型：`continuous`（持续震动）、`transient`（简短震动） |
| RelativeTime | Number | 是   | 相对开始时间，单位 ms                                       |
| Duration     | Number | 否   | 持续震动类型必填，持续时间，单位 ms，最大 `10s`，超过不执行 |
| Parameters   | Object | 是   | 见下方                                                      |

**Parameters 对象：**

| 属性      | 类型   | 必填 | 说明                                                                                                                   |
| --------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------- |
| Intensity | Number | 是   | 震动强度，整数，`[0,100]`。`0` 为平台最小值，`100` 为平台最大值                                                        |
| Frequency | Number | 是   | 震动频率，整数，`[0,100]`。`0` 为平台最小值，`100` 为平台最大值                                                        |
| Curve     | Array  | 否   | 持续震动类型必填，持续震动类型参数：平滑曲线。最多 4 段；数组头部 time 必须为 0、尾部必须为 duration；首尾强度必须为 0 |

**Curve 数组元素：**

| 属性      | 类型   | 必填 | 说明                                                                  |
| --------- | ------ | ---- | --------------------------------------------------------------------- |
| Time      | Number | 是   | 相对于外部 RelativeTime 的相对时间                                    |
| Intensity | Number | 是   | 震动强度，`[0,1]`，与 Parameters.Intensity 相乘                       |
| Frequency | Number | 是   | 修饰 Parameters.Frequency，`[-100,100]`，与 Parameters.Frequency 相加 |

#### 示例：

```javascript
const result = vibrator.create({
  Metadata: {
    Version: 1,
    Description: "game haptic",
  },
  Pattern: [
    {
      Event: {
        Type: "continuous",
        RelativeTime: 0,
        Duration: 3000,
        Parameters: {
          Intensity: 80,
          Frequency: 50,
          Curve: [
            { Time: 0, Intensity: 0, Frequency: 0 }, // 起点
            { Time: 1000, Intensity: 0, Frequency: 0 },
            { Time: 2000, Intensity: 0.75, Frequency: 0 },
            { Time: 3000, Intensity: 0, Frequency: 0 }, // 终点
          ],
        },
      },
    },
    {
      Event: {
        Type: "transient",
        RelativeTime: 4000,
        Parameters: { Intensity: 80, Frequency: 40 },
      },
    },
  ],
});
```

### vibrator.start()

开启当前震动模式。

```javascript
vibrator.start();
```

### vibrator.stop()

停止当前震动模式。**建议在卡片 `onHide` 时主动调用**。

```javascript
vibrator.stop();
```

## 震动优先级

1. 系统自带震动优先级高于卡片震动。
2. 多个震动同时触发时，会优先暂停上一个震动而播放下一个震动。

---

## 来源

- https://developer.honor.com/cn/doc/guides/101442
