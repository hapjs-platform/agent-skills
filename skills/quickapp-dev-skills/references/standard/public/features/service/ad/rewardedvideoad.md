# 激励视频广告 `1070+`
激励视频广告组件是由客户端原生的图片、文本、视频控件组成的，层级最高，会覆盖在普通组件上，该方法返回的是一个单例，该实例仅对当前页面有效，不允许跨页面使用。

## 接口定义

### ad.createRewardedVideoAd(object)

创建激励视频广告组件，该广告页面单例，不允许跨页面使用。

#### 参数
|参数|类型|是否必填|说明|
|:-------|:-------|:-------|:-------|
|adUnitId| String | 是 | 激励视频广告位标识 |

代码示例：

``` javascript
let rewardedVideoAd = ad.createRewardedVideoAd({
    adUnitId: 'xxx'
})
```

#### 返回值
激励视频广告组件

### rewardedVideoAd.load()

加载激励视频广告。
#### 返回值
#### Promise
激励视频广告显示操作的结果。

### rewardedVideoAd.show()

显示激励视频广告。激励视频广告将从屏幕下方推入。

#### 返回值
#### Promise
激励视频广告显示操作的结果。

### rewardedVideoAd.onLoad(function callback)
监听激励视频广告加载事件。
#### 参数
##### function callback
激励视频广告加载事件的回调函数

### rewardedVideoAd.offLoad(function callback)
取消监听激励视频广告加载事件

#### 参数
##### function callback
激励视频广告加载事件的回调函数

### rewardedVideoAd.onClose(function callback)
监听用户点击`关闭广告` 按钮的事件
#### 参数
##### function callback
|参数|类型|说明|
|:-------|:-------|:-------|
|isEnded| Boolean |视频是否是在用户完整观看的情况下被关闭的|

### rewardedVideoAd.offClose(function callback)
取消监听用户点击`关闭广告`按钮的事件
#### 参数
##### function callback
用户点击`关闭广告`按钮的事件的回调函数

### rewardedVideoAd.onError(function callback)
监听激励视频错误事件。
#### 参数
##### function callback
激励视频错误事件的回调函数

### rewardedVideoAd.offError(function callback)
取消监听激励视频广告错误
#### 参数
##### function callback
激励视频错误事件的回调函数