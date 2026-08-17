# banner广告`1060+`

## 接口定义

### ad.createBannerAd(object)

创建 Banner 广告组件，如果已经创建过 Banner 广告组件，则返回已创建的广告组件

#### 参数
|参数|类型|是否必填|说明|
|:-------|:-------|:-------|:-------|
|adUnitId| String | 是 | Banner 广告位标识 |
|style| Object | 否 | Banner 广告组件的样式 |

代码示例：

``` javascript
let bannerAd = ad.createBannerAd({
    adUnitId: 'xxx',
    style:{
        left:0,
        top: 800,
        width:1080
    }
})
```

#### style的结构
|属性|类型|是否必填|说明|
|:-------|:-------|:-------|:-------|
|left| Number | 否 | banner 广告组件的左上角横坐标 |
|top| Number | 否 | banner 广告组件的左上角纵坐标 |
|width| Number | 否 | banner 广告组件的宽度 |
|height| Number | 否 | banner 广告组件的高度 |

#### style说明
Banner 广告组件的尺寸会根据开发者设置的宽度，即 style.width 进行等比缩放，缩放的范围是 **designWidth * 50%** 到 **屏幕宽度**。
开发者在创建 BannerAd 时设置宽高，也可以在创建后设置，如：
```javascript
  bannerAd.style.width = 1000
```
当 style.width 小于 designWidth * 50% 时，会取作 designWidth * 50%。
当 style.width 大于屏幕宽度时，会取作屏幕宽度。 在组件内部会以此值为基准，根据 Banner 广告的标准尺寸，进行缩放。
每当缩放发生且缩放后的尺寸不同时，通过 BannerAd.onResize() 注册的回调函数就会执行。回调函数的参数是一个包含 BannerAd 缩放后的宽和高的对象。BannerAd 的 style.realWidth 和 style.realHeight 到经过缩放后的宽和高。

```javascript
bannerAd.onResize(res => {
    console.log(res.width, res.height)
    console.log(bannerAd.style.realWidth, bannerAd.style.realHeight)
})

```
Banner广告不设置位置，默认在屏幕底部。

#### 返回值
Banner广告组件

### Promise bannerAd.show()

加载展示banner广告，出错的时候回调 onError，分为加载和展示两个阶段，加载成功回调onLoad

#### 返回值
#### Promise
banner 广告显示操作的结果

### Promise bannerAd.hide()

隐藏 banner 广告
#### 返回值
#### Promise
banner 广告隐藏操作的结果

### bannerAd.onError(function callback)

监听 banner 广告错误事件

代码示例：

``` javascript
bannerAd.onError((err)=>{
	console.log(err)
})
```
#### err:Object错误参数，其他广告类型相同
|参数|类型|是否必填|说明|
|:-------|:-------|:-------|:-------|
|errMsg| String | 是 | 错误信息 |
|errCode| Number | 是 | 错误码 |

### bannerAd.offError(function callback)

移除 banner 广告错误监听

### bannerAd.onLoad(function callback)

监听 banner 广告加载事件，多个素材，每次加载新素材，都会进入这个回调

### bannerAd.offLoad(function callback)

移除 banner 广告展示监听

### bannerAd.onClose(function callback)

监听 banner 广告关闭事件

### bannerAd.offClose(function callback)

移除 banner 关闭回调

### bannerAd.onResize(function callback)
监听 banner 广告尺寸变化事件
#### 参数
##### function callback
banner 广告尺寸变化事件的回调函数

###### 回调参数
Object res：

|属性|类型|说明|
|:-------|:-------|:-------|
|width| Number | 缩放后的宽度 |
|height| Number | 缩放后的高度 |

### bannerAd.offResize(function callback)
取消监听 banner 广告尺寸变化事件
#### 参数
##### function callback
banner 广告尺寸变化事件的回调函数，可以为空

### bannerAd.destroy()

销毁 banner 广告
