# 插屏广告`1060+`

## 接口声明

### ad.createInterstitialAd(object)

创建插屏广告组件，同一个 adUnitId，如果已经创建，并且未 destroy，会复用之前的对象，创建后会加载广告素材，素材创建后会自动拉取
#### 参数
|参数|类型|是否必填|说明|
|:-------|:-------|:-------|:-------|
|adUnitId| String | 是 | 插屏广告位标识 |

代码示例：

``` javascript
let interstitialAd = ad.createInterstitialAd({
  adUnitId: 'xxx'
})
```

#### 返回值
插屏广告组件

### interstitialAd.show()

插屏广告组件默认是隐藏的，调用 show 方法展示广告。
#### 返回值
#### Promise
插屏广告显示操作的结果。

### interstitialAd.onLoad(function callback)

监听视频广告加载成功事件

代码示例：

``` javascript
interstitialAd.onLoad(()=> {
  console.log("插屏广告加载成功");
  interstitialAd.show();
})
```

### interstitialAd.offLoad(function callback)

移除插屏广告加载成功监听

### interstitialAd.onClose(function callback)

监听插屏广告隐藏事件

### interstitialAd.offClose(function callback)

移除插屏广告隐藏监听

### interstitialAd.onError(function callback)

监听插屏广告出错事件

代码示例：

``` javascript
interstitialAd.onError((err)=> {
  console.log(err);
})
```

### interstitialAd.offError(function callback)

移除插屏广告出错监听

### interstitialAd.destroy()

销毁插屏广告组件
