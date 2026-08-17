# 原生广告`1060+`

**注意：原生广告已停止支持，请使用原生自渲染2.0广告**

## 接口定义

### ad.createNativeAd(object)

创建 native 广告组件，如果已经创建过 native 广告组件，则返回已创建的广告组件

#### 参数
| 参数     | 类型   | 是否必填 | 说明           |
| :------- | :----- | :------- | :------------- |
| adUnitId | String | 是       | 原生广告位标识 |

代码示例：

``` javascript
let nativeAd = ad.createNativeAd({
    adUnitId: 'xxx'
})
```

#### 返回值
原生广告组件

### nativeAd.load()

拉取广告数据，成功回调 onLoad，失败回调 onError

### nativeAd.reportAdShow()

上报广告曝光，一个广告只有一次上报有效，adId 为 load 方法获取的广告数据的 adId 字段

#### 参数
| 参数 | 类型   | 是否必填 | 说明                           |
| :--- | :----- | :------- | :----------------------------- |
| adId | String | 是       | 广告信息标识，由 load 接口返回 |

代码示例：

``` javascript
nativeAd.reportAdShow({
    adId: "xxx"
})
```
### nativeAd.reportAdClick()

上报广告点击，一个广告只有一次上报有效，adId 为 load 方法获取的广告数据的 adId 字段

#### 参数
| 参数 | 类型   | 是否必填 | 说明                           |
| :--- | :----- | :------- | :----------------------------- |
| adId | String | 是       | 广告信息标识，由 load 接口返回 |

代码示例：

``` javascript
nativeAd.reportAdClick({
    adId: "xxx"
})
```

### nativeAd.onLoad(function callback)

设置广告加载成功回调
#### 参数
| 参数   | 类型  | 是否必填 | 说明         |
| :----- | :---- | :------- | :----------- |
| adList | Array | 是       | 广告详细信息 |

返回广告数据 adList 是一个 Array 对象，其中 item 数据格式为：

| 参数            | 类型          | 说明                                                         |
| :-------------- | :------------ | :----------------------------------------------------------- |
| adId            | String        | 广告标识，用来上报曝光与点击                                 |
| title           | String        | 广告标题                                                     |
| desc            | String        | 广告描述                                                     |
| icon            | String        | 推广应用的Icon图标                                           |
| imgUrlList      | Array<String> | 广告图片                                                     |
| logoUrl         | String        | “广告”标签图片                                               |
| clickBtnTxt     | String        | 点击按钮文本描述                                             |
| creativeType    | Number        | 获取广告类型，取值说明：0：无 1：纯文字 2：图片 3：图文混合 4：视频 |
| interactionType | Number        | 获取广告点击之后的交互类型，取值说明： 0：无 1：浏览类 2：下载类 3：浏览器（下载中间页广告） 4：打开应用首页 5：打开应用详情页 |

代码示例：
```javascript
nativeAd.onLoad(function(res) {
  console.log("原生广告加载" , res.adList)
})
```

### nativeAd.offLoad(function callback)

移除原生广告加载成功监听

### nativeAd.onError(function callback)

监听原生广告错误事件

代码示例：

``` javascript
nativeAd.onError((err)=>{
  console.log(err)
})
```
### nativeAd.offError(function callback)

移除原生广告错误监听

### nativeAd.destroy()

销毁原生广告