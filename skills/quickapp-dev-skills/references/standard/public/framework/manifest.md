# manifest 文件

manifest.json 文件中包含了应用描述、接口声明、页面路由信息

## manifest

| 属性                      | 类型    | 默认值 | 必填 | 描述                                                                                                                                    |
| ------------------------- | ------- | ------ | ---- | --------------------------------------------------------------------------------------------------------------------------------------- |
| package                   | String  | -      | 是   | 应用包名，**确认与原生应用的包名不一致**，推荐采用 com.company.module 的格式，如：com.example.demo                                      |
| name                      | String  | -      | 是   | 应用名称，**6 个汉字以内，与应用商店保存的名称一致**，用于在桌面图标、弹窗等处显示应用名称                                              |
| icon                      | String  | -      | 是   | 应用图标，提供 192x192 大小的即可                                                                                                       |
| versionName               | String  | -      | 否   | 应用版本名称，如：`"1.0"`                                                                                                               |
| versionCode               | Integer | -      | 是   | 应用版本号，从`1`自增，**推荐每次重新上传包时`versionCode`+1**                                                                          |
| minPlatformVersion        | Integer | -      | 否   | 支持的最小平台版本号，**兼容性检查，避免上线后在低版本平台运行并导致不兼容**；如果不填按照内测版本处理                                  |
| features                  | Array   | -      | 否   | 接口列表，绝大部分接口都需要在这里声明，否则不能调用，详见每个接口的文档说明                                                            |
| config                    | Object  | -      | 是   | 系统配置信息，详见下面说明                                                                                                              |
| router                    | Object  | -      | 是   | 路由信息，详见下面说明                                                                                                                  |
| display                   | Object  | -      | 否   | UI 显示相关配置，详见下面说明                                                                                                           |
| subpackages `1040+`       | Array   | -      | 否   | 定义并启用分包加载，详见下面说明                                                                                                        |
| trustedSslDomains `1060+` | Array   | -      | 否   | 可信的 https 站点列表，如：`"www.quickapp.cn"`。当 web 组件在访问这些站点出现证书过期或无效时，会提供继续访问的选项，允许用户继续访问。 |

### config

用于定义系统配置和全局数据。

| 属性               | 类型    | 默认值 | 描述                                                         |
| ------------------ | ------- | ------ | ------------------------------------------------------------ |
| logLevel           | String  | log    | 打印日志等级，分为 off,error,warn,info,log,debug             |
| designWidth        | Integer | 750    | 页面设计基准宽度，根据实际设备宽度来缩放元素大小             |
| data               | Object  | -      | 全局数据对象，属性名不能以$或\_开头，在页面中可通过 this 进行访问；如果全局数据属性与页面的数据属性重名，则页面初始化时，全局数据会覆盖页面中对应的属性值 |
| background `1050+` | Object  | -      | 后台运行配置信息，可使用 features 字段申请需要在后台使用的接口（同时仍需在最外层的 features 字段中声明）。可申请的接口为：<p>system.audio<p>system.geolocation<p>system.record<p>system.request 等。<p>详细用法参见[后台运行 脚本](background-running.md)。 |
| network `1060+`    | Object  | -      | 网络超时时间配置选项，详见下面说明                           |
| grayMode `1100+`   | Object  | -      | 页面饱和度为零的显示模式，用以响应特殊事件，详见下面说明<br />可通过[configuration接口动态配置](../features/system/configuration.md#configuration.setGrayMode(OBJECT) -1100)覆盖该配置项 |

#### config.network

| 参数名         | 类型   | 默认值 | 单位 | 必填 | 描述         |
| -------------- | ------ | ------ | ---- | ---- | ------------ |
| connectTimeout | Number | 30000  | ms   | 否   | 连接超时时间 |
| readTimeout    | Number | 30000  | ms   | 否   | 读取超时时间 |
| writeTimeout   | Number | 30000  | ms   | 否   | 写入超时时间 |

#### config.grayMode `1100+`

| 参数名       | 类型   | 默认值 | 必填 | 描述                     |
| ------------ | ------- | ---- |---- | -------------------------- |
| enable       | Boolean |false| 否   | 是否开启灰色模式           |
| duration     | Object  | -   | 否   | 灰色模式需要启动的日期     |
| excludedPage | Array  | -    | 否   | 需要禁用灰色模式的页面列表 |

##### config.grayMode.duration `1100+`

| 参数名       | 类型   | 默认值 | 必填 | 描述                     |
| ------------ | ------- | ---- |---- | -------------------------- |
| regular   | Array | -      | 否   | 每年固定的日期，日期格式为MM/dd        |
| temporary | Array | -      | 否   | 一次性的临时日期，日期格式为yyyy/MM/dd |

示例代码：

```json
"grayMode": {
    "enable": true,
    "duration": {
        "regular": ["12/13", "09/18"],
        "temporary": ["2020/04/04", "2018/05/12"]
    },
    "excludedPages": ["/WelcomePage"]
}
```

### router

用于定义页面的组成和相关配置信息，如果页面没有配置路由信息，则在编译打包时跳过。

| 属性              | 类型   | 默认值 | 必填 | 描述                                                                                                                  |
| ----------------- | ------ | ------ | ---- | --------------------------------------------------------------------------------------------------------------------- |
| entry             | String | -      | 是   | 首页名称；使用分包功能时，建议将首页定义在基础包中                                                                    |
| pages             | Object | -      | 是   | 页面配置列表，key 值为页面名称（对应页面目录名，例如 Hello 对应'Hello'目录），value 为页面详细配置 page，详见下面说明 |
| errorPage `1060+` | String | -      | 否   | 自定义错误页面的 key 值，需要提供一个在 pages 项里已经配置的 key 值                                                   |

示例代码：

```json
"router": {
  "entry": "Demo",
  "errorPage": "ErrorPage",
  "pages": {
    "Demo": {
      "component": "index"
    },
    "ErrorPage": {
      "component": "index"
     },
  }
}
```

#### router.pages

用于定义单个页面路由信息。

| 属性               | 类型   | 默认值      | 必填 | 描述                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ------ | ----------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| component          | String | -           | 是   | 页面对应的组件名，与 ux 文件名保持一致，例如'hello' 对应 'hello.ux'                                                                                                                                                                                                                                                                     |
| path               | String | /<页面名称> | 否   | 页面路径，例如“/user”,不填则默认为/&lt;页面名称&gt;。<br/>path 必须唯一,不能和其他 page 的 path 相同。<br/>下面 page 的 path 因为缺失,会被设置为“/Index”：<br>`"Index": {"component": "index"}`                                                                                                                                         |
| filter             | Object | -           | 否   | 声明页面可以处理某种请求                                                                                                                                                                                                                                                                                                                |
| launchMode `1050+` | String | standard    | 否   | 声明页面的启动模式，支持"singleTask"，"standard"两种页面启动模式。<br/>标识为"singleTask"模式时每次打开目标页面都会打开已有的目标页面并回调 onRefresh 生命周期函数，清除该页面上打开的其他页面，没有打开过此页面时会创建新的目标页面实例。<br/>标识为"standard"模式时会每次打开新的目标页面（多次打开目标页面地址时会存在多个相同页面） |

#### router.pages.filter

匹配页面某种请求，如请求 uri 和 filter 中 uri 匹配成功，则在匹配页面打开。

filter 匹配原则是按照 manifest.json 中 router.pages 中页面顺序自上往下逐一匹配，uri 匹配成功即会在该页面中使用，故不建议多页面采用相同 uri 匹配规则，可能会导致页面跳转出错。

filter 的结构如下：

```json
"filter": {
  "<action>": {
    "uri": "<pattern>"
  }
}
```

| 属性   | 类型    | 默认值 | 必填 | 描述                                                                                         |
| ------ | ------- | ------ | ---- | -------------------------------------------------------------------------------------------- |
| action | String  | -      | 是   | 请求的动作，目前仅支持 view 这一种                                                           |
| uri    | Pattern | -      | 是   | 请求的数据的匹配规则。必须是正则表达式。如`https?://.*`可以匹配所有 http 和 https 类型的网址 |

可以处理所有 http 和 https 请求的 filter 定义如下：

```json
"filter": {
  "view": {
    "uri": "https?://.*"
  }
}
```

#### router.errorPage `1060+`

当页面跳转异常时，快应用默认将会跳转到 sdk 的默认错误页，同时前端 app.ux 也会收到 onPageNotFound 回调

此参数可提供给开发者配置自定义错误页面

参数：自定义错误页面的参数，需要提供一个在 pages 项里已经配置好的 key 值

注意：开发者自定义错误页面的时候，推荐在 script 标签加入以下这段代码。按照这样设置，当用户 deeplink 跳转进快应用报错时，点击返回键，可以跳到当前快应用的首页，继续浏览快应用的页面。

```javascript
import router from '@system.router'
export default {
  onBackPress() {
    // 由deep-link等方式进来，异常发生时，一进来首页就是Error Page
    // 则此时返回需要手动修改，使其跳转到首页
    if (router.getLength() === 1) {
      router.replace({
        // 返回首页
        path: '/'
      })
      return true
    }
  }
}
```

### display

用于定义与 UI 显示相关的配置。

如果在 display 对象下定义以下属性值，则生效范围为此快应用全部页面；

如果在 display.pages 对象里的页面 key 值下定义以下属性值，则生效范围仅为此页面；并且，此处指定的页面 display 属性值，优先级高于上述的全局范围的属性值

| 属性                               | 类型                          | 默认值    | 描述                                                                                                                                                                                                                                                         |
| ---------------------------------- | ----------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| backgroundColor                    | String                        | #ffffff   | 窗口背景颜色                                                                                                                                                                                                                                                 |
| fullScreen                         | Boolean                       | false     | 是否是全屏模式，默认不会同时作用于 titleBar，titleBar 需要继续通过 titleBar 控制                                                                                                                                                                             |
| titleBar                           | Boolean                       | true      | 是否显示 titleBar                                                                                                                                                                                                                                            |
| titleBarBackgroundColor            | String                        | #000000   | 标题栏背景色                                                                                                                                                                                                                                                 |
| titleBarTextColor                  | String                        | -         | 标题栏文字颜色                                                                                                                                                                                                                                               |
| titleBarText                       | String                        | -         | 标题栏文字(也可通过页面跳转传递参数(titleBarText)设置)                                                                                                                                                                                                       |
| menu                               | Boolean                       | false     | 1000~1060 版本用于配置是否显示标题栏右上角菜单按钮，true 显示，false 隐藏。<br>**注意：**当`menu`值设为 true 时，方可在 1000~1060 版本点击菜单按钮，或 1070 版本点击`menuBar`左边菜单按钮时，触发前端的`onMenuPress`回调（若前端已实现此回调方法）           |
| windowSoftInputMode `1030+`        | adjustPan &#124; adjustResize | adjustPan | 软键盘弹出时为保证输入框可见，页面的调整方式。　 adjustPan:上移页面； adjustResize:压缩页面显示区域，当页面全屏时，此设置不生效                                                                                                                              |
| pages                              | Object                        | -         | 各个页面的显示样式，key 为页面名（与路由中的页面名保持一致），value 为窗口显示样式，页面样式覆盖 default 样式                                                                                                                                                |
| orientation `1040+`                | String                        | portrait  | 页面显示横屏还是竖屏<br>portrait:竖屏 <br>landscape:横屏                                                                                                                                                                                                     |
| statusBarImmersive `1050+`         | Boolean                       | false     | 是否显示沉浸式状态栏，显示沉浸式状态需要隐藏 titleBar                                                                                                                                                                                                        |
| statusBarTextStyle `1050+`         | light &#124; dark &#124; auto | auto      | 状态栏文字样式，有亮、暗和自动，当为自动时会根据状态栏背景色调整                                                                                                                                                                                             |
| statusBarBackgroundColor `1050+`   | String                        | -         | 状态栏背景色，默认值同标题栏背景色                                                                                                                                                                                                                           |
| statusBarBackgroundOpacity `1050+` | float(0-1.0)                  | false     | 状态栏背景色不透明度，默认值同标题栏背景色不透明度                                                                                                                                                                                                           |
| fitCutout `1060+`                  | String                        | -         | 是否在异形区域绘制内容。竖屏下只有在 fullScreen 为 true 时才会生效 <br>none:不会在异形区域绘制，异形区域加黑处理 <br>portrait:竖屏下内容会在异形区域绘制 <br>landscape:横屏下内容会在异形区域绘制 <br>portrait&#124;landscape:竖屏和横屏下都会在异形区域绘制 |
| textSizeAdjust `1060+`             | none &#124; auto              | none      | 系统字体大小变化时，文本类型组件字体大小的调整方式 <br>none:不跟随系统字体大小变化 auto:跟随系统字体大小变化                                                                                                                                                 |
| themeMode `1070+`                  | Number                        | -1        | 主题模式配置值，非必填，默认值为 -1（跟随系统主题模式）。现在支持 3 个值： -1（跟随系统主题模式）、 0（固定日间模式）、1（固定夜间模式）                                                                                                                     |
| menuBarData `1070+`                | Object                        | -         | menuBar 显示相关配置，详见下面说明                                                                                                                                                                                                                           |
| forceDark `1070+`                  | Boolean                       | true      | `应用级别`的夜间模式自动反色开关（仅 Android 10+系统支持），非必填，默认值为 true（开启自动反色）                                                                                                                                                            |
| pageCache `1080+`                  | Boolean                       | false     | 是否缓存当前页面，开启缓存后可提高重复打开该页面的打开速度，仅支持在 display 对象下的 pages 对象的 key 值下定义此属性                                                                                                                                        |
| cacheDuration `1080+`              | Number                        | 3600000   | 定义页面缓存的失效时间，仅在`pageCache`值为 true 时生效，单位为毫秒(ms)，默认值为一个小时。仅支持在 display 对象下的 pages 对象的 key 值下定义此属性                                                                                                         |
| pageAnimation `1100+`              | Object                        | -         | pageAnimation配置，详见下面说明                                                                                                        |
| tabBar `1200+`                     | Object                        | -         | tabBar 显示相关配置，详见下面说明                                                                                                                                                                                                                           |
| fitWidthScreenMode `1200+`          | String                        | -         | 仅支持在 display 对象下定义以上属性值，不支持 display.pages 对象。 <br> 共有三种模式：<br>1.original：原始模式，框架不对快应用做任何处理，由开发者根据设备屏幕宽度进行适配；<br>2.fitScreen: 框架在屏幕中间选择合适大小的区域展示快应用,两侧留白，不需要开发者做任何处理；<br>3.fillScreen: 对快应用进行全屏拉伸，开发者需要使用列表等布局优化拉伸后的显示样式。|

### subpackages `1040+`

用于定义分包的相关配置。分包的详细使用方法参见[分包加载](subpackage.md)。

| 属性     | 类型   | 含义     | 描述                                                                                                                                                                                  |
| -------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | String | 分包名称 | 分包的名称，用于区分不同分包。只能是字母数字和下划线，不允许包含其他符号，"base"作为基础包的保留名称(无需为基础包定义分包配置)                                                        |
| resource | String | 资源目录 | 分包资源根目录，相对于源码目录"src"的相对路径。只能是字母数字以及"\_"、"-"、"/"组成，第一个字符不允许为"-"和"/"，不允许包含其他符号。编译时会把该目录下的所有资源都打包到这个分包中去 |

### 示例代码：

除了以下示例代码，亦可参考官方示例的[manifest.json](https://github.com/quickappcn/sample/blob/master/src/manifest.json)文件入门

```json
{
  "package": "com.company.unit",
  "name": "appName",
  "icon": "/Common/icon.png",
  "versionName": "1.0",
  "versionCode": 1,
  "minPlatformVersion": 1000,
  "features": [{ "name": "system.network" }],
  "permissions": [{ "origin": "*" }],
  "config": {
    "logLevel": "off",
    "background": {
      "features": [
        "system.audio",
        "system.record",
        "system.request",
        "system.geolocation"
      ]
    },
    "network": {
      "connectTimeout": 10000,
      "readTimeout": 10000,
      "writeTimeout": 10000
    }
  },
  "router": {
    "entry": "Hello",
    "pages": {
      "Hello": {
        "component": "hello",
        "path": "/",
        "filter": {
          "view": {
            "uri": "https?://.*"
          }
        }
      },
      "PackageA/Page1": {
        "component": "page1"
      },
      "PackageA/Page2": {
        "component": "page2"
      }
    }
  },
  "display": {
    "backgroundColor": "#ffffff",
    "fullScreen": false,
    "fitWideScreenMode":"original",
    "titleBar": true,
    "titleBarBackgroundColor": "#000000",
    "titleBarTextColor": "#fffff",
    "statusBarImmersive": false,
    "statusBarTextStyle": "auto",
    "statusBarBackgroundColor": "#000000",
    "themeMode": -1,
    "pages": {
      "Hello": {
        "backgroundColor": "#eeeeee",
        "fullScreen": true,
        "titleBarBackgroundColor": "#0000ff",
        "titleBarText": "Hello",
        "forceDark": false,
        "orientation": "landscape",
        "pageCache": true,
        "cacheDuration": 2400000
      }
    }
  },
  "subpackages": [
    {
      "name": "pkgA",
      "resource": "PackageA"
    }
  ],
  "trustedSslDomains": ["www.quickapp.cn", "m.quickapp.cn"]
}
```

### menuBarData `1070+`

用于定义 menuBar 的相关配置。

| 属性             | 类型    | 含义                   | 描述                                                                                                                                                                               |
| ---------------- | ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| menuBar          | Boolean | 是否显示               | 配置 menuBar 是否显示，默认是否显示请查看[厂商支持表格](#menubar-支持明细-1070)。当`fullScreen`属性为 true 或视频全屏状态下，若`menuBar`不显式设置为 true，则 menuBar 会自动隐藏。 |
| menuBarStyle     | String  | 样式                   | menuBar 样式，默认黑色图标 icon 样式，dark，可以设置 light 浅色                                                                                                                    |
| shareTitle       | String  | 分享标题               | menuBar 中分享功能对应 标题，默认当前快应用名称                                                                                                                                    |
| shareDescription | String  | 分享描述               | menuBar 中分享功能对应描述，默认当前快应用描述                                                                                                                                     |
| shareIcon        | String  | 分享图片               | menuBar 中分享功能对应图片，默认当前快应用 icon                                                                                                                                    |
| shareCurrentPage | Boolean | 是否分享当前页面       | menuBar 中是否分享当前页面，默认 false 分享首页, 设置 true 后可以分享当前页面 `1080+`<br>[注意：设置 true 时, 不要在页面参数中添加敏感信息，如账号密码等涉及到安全类的信息字段内容]                                                                                          |
| shareParams      | Object  | 分享当前页面的透传参数 | menuBar 中分享当前页面的透传参数，示例 {"key":value} 类型 `1080+`                                                                                                                                    |
| shareUrl         | String  | 页面配置备用分享链接   | menuBar 中备用分享链接，不支持跳转快应用设备时, 分享跳转到此链接页面 `1080+`                                                                                                       |
| usePageParams         | Boolean  | 是否添加当前页面参数到分享参数中   | menuBar 中分享参数是否添加页面参数, 未配置时由 shareCurrentPage 决定是否添加页面参数到分享参数中`1100+`                                                                                                  |

注意：对于使用 shareParams 或者页面参数的情况下，页面参数的接收必须在相应页面对字串内容中的 key 值 {"key": value}显式声明 public 才可以接收到，参见 https://doc.quickapp.cn/framework/seo.html?h=%E9%A1%B5%E9%9D%A2%E5%8F%82%E6%95%B0

示例：

```javascript
*页面中需要声明参数变量名称，注意参数名称需要和 shareParams 中的 key-value 的 key 值名称对应，对于 usePageParams 或者 shareCurrentPage 为 true 情况，也要对应页面参数声明对应的 key 值接收参数*

public: {

    key: null

  },

如果快应用当前页面和打开的分享页面不同，在打开快应用时候，跳转到分享页时，分享参数可以在 onInit 中接收到

onInit() {

console.log('onInit share param page :  ' + JSON.stringify(this.key))

}

如果快应用当前页面和打开的分享页面相同，在打开快应用时候，跳转到分享页时，分享参数可以在 onRefresh 接收到

onRefresh(data){

console.log('onRefresh share param page :  ' + JSON.stringify(data.key))

}
```

## menuBar 快速适配教程

现在，快应用联盟大力推广开发者使用 menuBar。使用 menuBar，开发者无需再重复实现分享，添加到桌面，关于页等功能，减少工作量。

开发者可以按照以下步骤，检查并优化代码，实现快应用项目对 menuBar 的适配：

1. 在`manifest.json`下`display`属性下，去掉所有的`menu`配置项

2. 在`manifest.json`下`display`属性下，若开发者不手动添加`menubarData`项，则全部快应用页面显示 menubar，可保持不变

3. 若有需要手动关闭 menubar 的页面，在 `display` 的 `pages` 子项，对应页面 key 值下设置 `menuBarData` 的 `menubar` 参数为 `false`

4. 删除所有页面的 `onMenuPress` 生命周期的代码。

5. 检查页面布局，为 menuBar 留出空间放置。

### menuBar 示例：

注意：实际代码中 json 文件不能包含注释行，此处注释仅为说明用

```json
{
  "display": {
    "menuBarData": {
      // 全局配置
      "menuBar":true,
      "menuBarStyle":"dark",
      "shareTitle":"分享标题",
      "shareDescription":"分享描述",
      "shareIcon":"分享url"
    },
    "pages": {
      "Hello": {
        // 页面配置，默认使用页面menuBarData配置，页面无配置使用全局menuBarData配置
        "menuBarData": {
          "menuBar" true,
          "menuBarStyle":"dark",
          "shareTitle":"子页面分享标题",
          "shareDescription":"分页面享描述",
          "shareIcon":"页面分享url",
          "shareCurrentPage":true,
          "shareUrl":"https://www.quickapp.cn/",
          "shareParams":"{key:1,id:2})"
         }
      }
    }
}
```

## menuBar 支持明细 `1070+`

如果以下没有特别备注，则 menuBar 在此厂商手机 1070+的 sdk 上会默认显示。同时，开发者可通过配置`menuBarData.menuBar`决定是否显示。

| 厂商       |  支持   | 备注                                                              |
| ---------- | :-----: | ----------------------------------------------------------------- |
| **预览版** | **YES** |                                                                   |
| OPPO       | **YES** |                                                                   |
| 小米       | **YES** |                                                                   |
| vivo       | **YES** | 默认显示，且不可以通过设置关闭menuBar                                                                 |
| 华为       | **YES** | 默认显示，且不可以通过设置关闭 menuBar                            |
| 一加       | **YES** |                                                                   |
| 魅族       | **YES** | 1070 版本默认隐藏，可设置`menuBarData.menuBar`参数为`true` 来显示 |
| 中兴       | **YES** |                                                                   |
| 努比亚     | **YES** |                                                                   |
| 金立       | **YES** | 1070 版本默认隐藏，可设置`menuBarData.menuBar`参数为`true` 来显示 |
| 联想       | **YES** | 1070 版本默认隐藏，可设置`menuBarData.menuBar`参数为`true` 来显示 |

### pageAnimation `1100+`

用于配置页面切换动画。除了下面示例中的两种动画配置方法之外，在 [router.push](..//features/system/router.html#routerpushobject) 时可以通过 `___PARAM_PAGE_ANIMATION___` 配置页面切换动画。配置生效优先级 `___PARAM_PAGE_ANIMATION___` > `display.pages.pageAnimation` > `display.pageAnimation`,注意高优先级 pageAnimation 配置会覆盖低优先级 pageAnimation 配置。

| 属性             | 类型    | 默认                   | 描述                                                                                                                                                                               |
| ---------------- | ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| openEnter          | String | slide               | 打开进入当前页时当前页动画，可选值 slide， none |
| closeEnter          | String | slide               | 关闭返回当前页时当前页动画，可选值 slide， none |
| openExit          | String | slide               | 打开下一页，退出当前页时当前页动画，可选值 slide， none |
| closeExit          | String | slide               | 返回上一页，退出当前页时当前页动画，可选值 slide， none |

slide 模式在各动作下的动画变化详情如下：

|  页面动作  |           动画变化           | 动画时长 |
| :--------: | :--------------------------: | :------: |
| openEnter  |        x from 100%~0         |  300ms   |
| closeEnter | x from -25%~0, alpha 0.6~1.0 |  300ms   |
|  openExit  | x from 0~-25%, alpha 1.0~0.6 |  300ms   |
| closeExit  |        x from 0~100%         |  300ms   |

#### 示例：

```json
{
  "display": {
      "entry": "Form",
      "pageAnimation": {
          "openEnter":"none",
          "closeEnter":"none",
          "openExit":"none",
          "closeExit":"none"
      },
      "pages": {
          "Demo": {
            "component": "index",
            "pageAnimation": {    //页面配置了 pageAnimation，display 中的配置不再生效
                "openEnter":"none",
                "closeEnter":"none",
                "openExit":"none"
                //"closeExit":"none" 缺省配置，默认 slide
            }
          }
      }
  }
}
```
### tabBar `1200+`

* 注：oppo侧暂不支持manifest.json中配置tabBar

用于定义 tabBar 的相关配置。
tabBar 组件适用于首页显示场景，只在已经配置了 tabBar 页面路由路径的页面显示 tabBar 组件。

| 属性             | 类型    | 含义                   | 描述                                                                                                                                                                               |
| ---------------- | ------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color          | String | 文字颜色               | 默认 #000000 |
| selectedColor     | String  | 选中文字颜色                   | 默认 #000000 |
| tabbarBackgroundColor       | String  | 背景颜色               | 默认 #FFFFFF |
| pagePath | String  | 页面路由路径               | list 内页面路由路径配置 |
| pageParams        | String  | 页面参数               |  list 内页面参数配置     |
| iconPath | String | 图标链接地址       | list 内图标链接地址配置  |
| selectedIconPath      | String  | 选中图标链接地址 | list 内选中图标链接地址配置  |
| text         | String  | 文字内容   | list 内文字内容配置  |

### tabBar 示例：

注意：实际代码中 json 文件不能包含注释行，此处注释仅为说明用

```json
{
  "display": {
    "tabBar": {
        "color": "#000000",          //文字颜色
        "selectedColor": "#008000",        //选中文字颜色
        "tabbarBackgroundColor": "#FFFFFF",    //组件背景
          "list": [{
            "pagePath": "/home",  //页面路由路径
            "pageParams":"{test: 'test1'}" ,  //页面参数
            "iconPath": "/Common/home.png", //图标
            "selectedIconPath": "/Common/home_active.png", //选中图标
            "text": "首页"    //文字内容
            },
            {
            "pagePath": "/mine",
            "pageParams":"{test: 'test2'}",
            "iconPath": "/Common/mine.png",
            "selectedIconPath": "/Common/mine_active.png",
            "text": "我的"
            }]
            }
}
```
