# H5 点击组件

网页开发者可以在其 H5 页面中使用快应用官方推荐的点击组件，用于跳转指定快应用。使用点击组件时，必须由用户主动点击方可发起跳转快应用请求。

`vivo快应用不支持该能力`

点击组件样式可自定义，可在页面中使用多个点击组件，具体使用方式如下：

首先在网页嵌入如下 js：

```xml
<script type="text/javascript" src="//statres.quickapp.cn/quickapp/js/qa_router.min.js"></script>
```

## 判断当前环境是否支持组件跳转快应用

channelReady(callback)

### 参数：

| 参数名   | 类型     | 必填 | 说明                                                                                |
| -------- | -------- | ---- | ----------------------------------------------------------------------------------- |
| callback | function | 是   | 平台上快应用能力检测的回调函数，如支持快应用服务则返回 true 值，否则则返回 false 值 |

### 示例

```js
channelReady(function(bAvailable) {
  alert('是否存在框架服务：' + bAvailable)
})
```

### 支持明细

| 厂商   | 支持版本 | 备注                                                                                                                                                                                                                                    |
| ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 小米   | 1000+    | 需 MIUI 稳定版 v9.5+ 或 开发版 8.2+                                                                                                                                                                                                     |
| 中兴   | -        | -                                                                                                                                                                                                                                       |
| 华为   | -        | 华为暂不支持能力检测，所有安卓设备 channelReady  都会返回  true  值，并且不是所有设备都支持组件跳转，所以请开发者务必作好 fallback，在跳转不能正常的情况下，H5 页面能够继续为用户提供服务。（注：非麒麟芯片的华为手机均不支持组件跳转） |
| 金立   | -        | -                                                                                                                                                                                                                                       |
| 联想   | -        | -                                                                                                                                                                                                                                       |
| 魅族   | -        | -                                                                                                                                                                                                                                       |
| 努比亚 | -        | -                                                                                                                                                                                                                                       |
| OPPO   | 1000+    | 需 ColorOS 2.1 以上支持                                                                                                                                                                                                                 |
| vivo   | -    | vivo 设备不支持 H5 点击组件                                                                                                                                                                                                           |
| 一加   | 1040+    | 需 Android 10+ 支持                                                                                                                                                                                                                     |
| 海信   | 1030 　  | -                                                                                                                                                                                                                                       |

## 定制组件 UI 样式

在页面合适位置插入 `<qa-router-button>` 标签。

```html
<qa-router-button
  data-package-name="com.hybrid.demo.sample"
  data-page="/"
  data-params='{"id": 1}'
  data-design-params='{"fontSize": 16,"designWidth": 1080}'
  data-click-event='{"eventName": "handleClickEvent", "eventParams": "anyString"}'
  data-expose-event='{"eventName": "handleExposeEvent", "eventParams": "anyString"}'
  style="height: 2rem"
>
  <templates>
    <!-- <templates> 中插入布局元素，以下仅为示例，开发者可根据业务需要定制 DOM 及 样式 -->
    <div id="container">
      <button>秒开</button>
    </div>
  </templates>
  <styles>
    <!-- <styles> 中插入样式 -->
    #container { ... }
    img { ... }
    button { ... }
  </styles>
</qa-router-button>
<script>
  function handleClickEvent() { /* 点击回调执行的方法 */ }
  function handleExposeEvent() { /* 组件曝光时执行的方法 */ }
</script>
```

### 参数：

| 参数名             | 类型   | 必填 | 说明                                                                                                                                                                                                                                                                          |
| ------------------ | ------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-package-name  | String | 是   | 配置跳转快应用的包名，包名和 manifest.json 的"package"属性保持一致。                                                                                                                                                                                                          |
| data-page          | String | 否   | 配置跳转的页面路径，对应 manifest.json 中 router 下 page 的 path 字段。<br>如果不传 path 值或 path 值为空字符串，跳转时会打开首页 <br> 详情请参见[manifest 文档](https://doc.quickapp.cn/framework/manifest.html)的"router.page"一节                                          |
| data-params        | String | 否   | 配置透传给快应用页面的参数。<br>通过 params 传入的参数值，会赋值到当前快应用页面的 public 同名字段 <br> 详情请参见[deeplink 文档](https://doc.quickapp.cn/tutorial/platform/deeplink.html)中"快应用获取 key-value"一节                                                        |
| data-design-params | String | 否   | 用于指定设计稿宽度及默认 font-size 大小，以适配使用不同宽度屏幕。开发者可根据设计稿所标尺寸与默认 font-size 计算出元素 rem 单位值。点击组件会根据实际屏幕宽度、 `designWidth` 值及开发者指定的元素 rem 值重新计算元素实际大小。不填默认 fontSize 为 16、designWidth 为 1080。 |
| data-click-event   | String | 否   | 配置用户点击后回调执行的方法，可用于数据上报；eventName: click 事件回调执行的方法名称；eventParams: 回调方法传入的参数                                                                                                                                                        |
| data-expose-event  | String | 否   | 配置点击组件曝光时回调执行的方法，eventName: 曝光时回调执行的方法名称；eventParams: 回调方法传入的参数                                                                                                                                                                        |

### 支持明细

| 厂商   | 支持版本 | 备注                    |
| ------ | -------- | ----------------------- |
| 小米   | 1000+    | -                       |
| 中兴   | -        | -                       |
| 华为   | 1010+    | 需 EMUI 8.2+；          |
| 金立   | -        | -                       |
| 联想   | -        | -                       |
| 魅族   | -        | -                       |
| 努比亚 | 1000+    | -                       |
| OPPO   | 1000+    | 需 ColorOS 2.1 以上支持 |
| vivo   | -    | vivo 设备不支持 H5 点击组件                       |
| 一加   | 1040+    | 需 Android 10+ 支持     |
| 海信   | 1030 　  | -                       |

## 组件内允许使用的标签和样式列表

### 标签

组件内允许使用的标签见下表。所有标签均支持 `id`、`style`、`class` 通用属性；`img` 标签除上述通用属性外，还支持 `src` 属性。所有标签均不允许使用事件。

|     |     |     |      |        |     |     |     |     |     |
| --- | --- | --- | ---- | ------ | --- | --- | --- | --- | --- |
| div | p   | img | span | button | a   | br  | ol  | ul  | li  |
| dl  | dt  | dd  | h1   | h2     | h3  | h4  | h5  | h6  |

### 样式

组件内允许使用的样式如下表：

|                            |                            |                         |                           |                           |                           |                            |                          |                           |
| -------------------------- | -------------------------- | ----------------------- | ------------------------- | ------------------------- | ------------------------- | -------------------------- | ------------------------ | ------------------------- |
| width                      | height                     | min-width               | min-height                | max-width                 | max-height                | margin                     | margin-block             | margin-block-end          |
| margin-block-start         | margin-bottom              | margin-inline           | margin-inline-end         | margin-inline-start       | margin-left               | margin-right               | margin-top               | border                    |
| border-block               | border-block-color         | border-block-end        | border-block-end-color    | border-block-end-style    | border-block-end-width    | border-block-start         | border-block-start-color | border-block-start-style  |
| border-block-start-width   | border-block-style         | border-block-width      | border-bottom             | border-bottom-color       | border-bottom-left-radius | border-bottom-right-radius | border-bottom-style      | border-bottom-width       |
| border-collapse            | border-color               | border-end-end-radius   | border-end-start-radius   | border-image              | border-image-outset       | border-image-repeat        | border-image-slice       | border-image-source       |
| border-image-width         | border-inline              | border-inline-color     | border-inline-end         | border-inline-end-color   | border-inline-end-style   | border-inline-end-width    | border-inline-start      | border-inline-start-color |
| border-inline-start-style  | border-inline-start-width  | border-inline-style     | border-inline-width       | border-left               | border-left-color         | border-left-style          | border-left-width        | border-radius             |
| border-right               | border-right-color         | border-right-style      | border-right-width        | border-spacing            | border-start-end-radius   | border-start-start-radius  | border-style             | border-top                |
| border-top-color           | border-top-left-radius     | border-top-right-radius | border-top-style          | border-top-width          | border-width              | padding                    | padding-block            | padding-block-end         | padding-block-start |
| padding-bottom             | padding-inline             | padding-inline-end      | padding-inline-start      | padding-left              | padding-right             | padding-top                | background               | background-color          | background-image |
| background-size            | background-repeat          | background-position     | background-attachment     | box-shadow                | cursor                    | color                      | opacity                  | display                   |
| visibility                 | flex                       | flex-grow               | flex-shrink               | flex-basis                | flex-direction            | align-items                | align-self               | align-content             |
| content                    | pointer-events             | user-select             | filter                    | white-space               | justify-content           | position                   | left                     | top                       |
| right                      | bottom                     | z-index                 | text-align                | line-height               | font-size                 | font-style                 | font-weight              | font-family               | float |
| letter-spacing             | vertical-align             | text-decoration         | text-transform            | list-style                | list-style-type           | list-style-image           | list-style-position      | overflow                  |
| overflow-y                 | overflow-x                 | overflow-clip-margin    | overflow-inline           | overflow-wrap             | overflow-anchor           | overflow-block             | outline                  | outline-color             |
| outline-offset             | outline-style              | outline-width           | offset-anchor             | offset-distance           | offset-path               | offset-rotate              | overscroll-behavior      | overscroll-behavior-block |
| overscroll-behavior-inline | overscroll-behavior-x      | overscroll-behavior-y   | appearance                | box-sizing                | object-fit                | transform-origin           | transform                | animation                 |
| animation-name             | animation-delay            | animation-duration      | animation-iteration-count | animation-timing-function | animation-fill-mode       | animation-direction        | transition               | transition-property       |
| transition-duration        | transition-timing-function | transition-delay        | src                       |

上述标签或样式中，如可以发起网络请求，只支持 `https` 协议加载，如使用 `http` 加载资源，会自动升级至 `https`。

## 补充

在通用框架使用点击组件需做少量配置：

### Vue

```javascript
// Vue 2.x
Vue.config.ignoredElements = [/^qa-router-button|templates|styles/]
```

开发者可以在点击组件中动态传值，控制传入的参数或 DOM 结构：

```html
// xxx.vue
<div v-for="(item, index) in items">
  <qa-router-button
    :data-package-name="item.name"
    :data-page="item.page"
    :data-params="item.params"
    data-design-params='{"fontSize": 16,"designWidth": 1080}'
    data-click-event='{"eventName": "handleClickEvent", "eventParams": "anyString"}'
    data-expose-event='{"eventName": "handleExposeEvent", "eventParams": "anyString"}'
    style="height: 2rem"
  >
    <templates>
      <!-- <templates> 中插入布局元素，以下仅为示例，开发者可根据业务需要定制 DOM 及 样式 -->
      <div id="container">
        <button>秒开</button>
      </div>
    </templates>
    <styles>
      <!-- <styles> 中插入样式 -->
      #container { ... }
      img { ... }
      button { ... }
    </styles>
  </qa-router-button>
</div>
```

```html
// index.html
<script>
  function handleClickEvent() { /* 点击回调执行的方法 */ }
  function handleExposeEvent() { /* 组件曝光时执行的方法 */ }
</script>
```

### React

React 中使用点击组件时，`<styles>` 标签不可用，可在 `<templates>` 中遵循 JSX 语法，使用变量指定样式。

```js
// JSX 语法，使用变量指定点击组件样式
class H5ClickDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        container: {
          display: 'flex'
        },
        btn: {
          backgroundColor: 'red'
        }
      }
    }
  render() {
    return (
      <div className="App">
        <qa-router-button
          data-package-name="com.hybrid.demo.sample"
          data-page="/"
          data-params='{"id": 1}'
          data-design-params='{"fontSize": 16,"designWidth": 1080}'
          data-click-event='{"eventName": "handleClickEvent", "eventParams": "anyString"}'
          data-expose-event='{"eventName": "handleExposeEvent", "eventParams": "anyString"}'
          style={{ height: '2rem' }}
        >
          <templates is="x3d">
            <div id="container" style={ this.state.style.container } >
              <button style={ this.state.style.btn }>秒开</button>
            </div>
          </templates>
        </qa-router-button>
      </div>
    )
  }
}
```

```html
// index.html
<script>
  function handleClickEvent() { /* 点击回调执行的方法 */ }
  function handleExposeEvent() { /* 组件曝光时执行的方法 */ }
</script>
```

## H5 点击组件示例代码

查看[示例代码](https://github.com/quickappcn/h5-click-router-sample)

## FAQ

Q1: 点击组件宽高是通过什么方式计算的？

A: 点击组件宽高由开发者传入的标签及样式计算确定，与普通页面开发过程一致，开发者需要自行做好移动端适配。

Q2: 点击组件宽高计算过程中组件有瞬间闪动如何解决？

A: 可能是组件宽高变化导致组件闪动。建议将在 `qa-router-button` 上设置宽高样式，将该标签宽高设置为最终展示的宽高。或在 `templates` 和 `styles` 节点增加样式 `display: none`

Q3: 点击组件是否支持动态修改包名？

A: 组件不支持动态修改包名，如需切换跳转的快应用，建议使用多个组件并动态切换。

Q4: 是否可以将官方点击组件代码集成到开发者自己的服务器？

A: 不可以。快应用引擎会对点击组件发起的快应用请求进行校验，如使用开发者自己服务器的组件，将无法通过引擎校验。

Q5: 小程序 webview 环境如何使用点击组件？

A: 可在小程序后台将下面的点击组件域名添加到小程序业务域名白名单中：`statres.quickapp.cn` 。
如仍不可用，可联系快应用联盟技术支持（微信号: kuaiyingyongguanKF），申请将小程序生成的校验文件放置到点击组件根目录下，以在联盟侧增加对应小程序的校验。
