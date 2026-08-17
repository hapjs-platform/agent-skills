# 使用 async

> 使用`async`语法开发业务，代码以更整洁优雅的方式替代 Callback 与 Promise

通过本节，你将学会：

- [如何配置`async`语法的 babel 编译支持](#如何配置-async-语法的-babel-编译支持)
- [使用`async`, `await`语法](#使用-async-await-语法)
- [在 native 接口中使用`async`](#在-native-接口中使用-async)

## 如何配置 async 语法的 babel 编译支持

注：在 1040 及以上版本的快应用引擎，因其内置的 V8 版本已完全支持 async await。 所以，若开发者设置`manifest.json`的`minPlatformVersion`为`1040`或以上版本号，则可在代码中直接使用`async`与`await`，亦无需学习此小节教程。

以下是原有的`1000`到`1030`引擎的适配教程：

传统前端开发中，异步的处理方式有：Callback、Promise、Generator；这几种代码的书写方式，后者往往比前者可读性好很多；ECMA 规范中新的语法方式`async`以一种更优雅的方式来处理异步

当前应用平台本身仅支持`ES5`的语法，所以要支持它必须借助`babel`之类的语法分析转换工具，同时还要在代码中注入`polyfill`

那么开发者可以把`@babel/runtime/regenerator`注入到`app.ux`中，因为这个文件是所有页面脚本执行前都会执行的

**示例如下：**

```javascript
// 脚本：regenerator.js
// 注意：仅用于注入类库函数，不允许存储页面组件等数据
const injectRef = Object.getPrototypeOf(global) || global

// 注入regeneratorRuntime
injectRef.regeneratorRuntime = require('@babel/runtime/regenerator')
// 如果使用的 hap-toolkit 版本低于0.0.38(babel 版本低于 7)，则按下面的方式引入
// injectRef.regeneratorRuntime = require('babel-runtime/regenerator')
```

在`app.ux`中引入这个脚本文件，就可以注入对`async`的支持（在项目编译后的`build/app.js`中搜索`regeneratorRuntime`即可发现注入成功）

## 使用 async, await 语法

async 与 await 的学习请参考[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)与[入门教程](http://exploringjs.com/es2016-es2017/ch_async-functions.html)，以下是示例代码

**示例如下：**

```html
<script>
  export default {
    private: {},
    onInit () {
      this.$page.setTitleBar({ text: '支持AsyncAwait' })
    },
    onReady () {
      this.testAsync()
    },
    /**
     * 测试Async
     */
    testAsync () {
      async function bar () {
        return 'bar'
      }
      async function foo() {
        const ret1 = await bar();
        console.info('PAGE: foo: ', ret1)
      }
      foo()
    }
  }
</script>
```

## 在 native 接口中使用 async

### Native 接口直接返回 Promise `1010+`

该方法仅支持平台版本为 `1010+` 的异步接口。

关于异步接口的更多信息，详见文档 [接口](../../features/index.md)

**示例如下：**

```HTML
<script>
  import fetch from '@system.fetch'

  export default {
   async onReady () {
      // 成功示例
        try {
          const response = await fetch.fetch({
              url: 'https://statres.quickapp.cn/quickapp/quickapptool/release/platform/quickapp_platform.json',
          })
          console.info('fetch 成功 code: ', response.data.code)
          console.info('fetch 成功 data: ', response.data.data)
          console.info('fetch 成功 headers: ', JSON.stringify(response.data.headers))
        } catch(err) {
          console.info('fetch 失败 code: ', err.code)
          console.info('fetch 失败 data: ', err.data)
        }

        // 失败示例
        try {
          const response = await fetch.fetch({
              url: 'http://www.Its_A_Wrong_URL.com/',
          })
          console.info('fetch 成功 code: ', response.data.code)
          console.info('fetch 成功 data: ', response.data.data)
          console.info('fetch 成功 headers: ', JSON.stringify(response.data.headers))
        } catch(err) {
          console.info('fetch 失败 code: ', err.code)
          console.info('fetch 失败 data: ', err.data)
        }
    }
  }
</script>
```

### Native 接口返回 callback

对于 platformVersion 低于 1010 的设备，以及非异步回调的方法，要想以 `async` 的方式使用 native 接口，需要对 native 接口进行改造，从`返回callback`方式到`返回Promise`方式，同时定义`async`方法返回。

我们同样以 fetch 接口为例

**示例如下：**

```javascript
// asyncNatives.js
import nativeFetch from '@system.fetch'

const natives = {
  /**
   * 网络请求
   * @param options
   * @return {Promise}
   */
  async fetch(options) {
    const p1 = new Promise((resolve, reject) => {
      options.success = function(data, code) {
        resolve({ data, code })
      }
      options.fail = function(data, code) {
        reject({ data, code })
      }
      nativeFetch.fetch(options)
    })
    return p1
  }
}

export { natives }
```

改造 fetch 接口，暴露`natives`变量到`app`对象上；

调用`async`版本的 fetch 接口的示例代码如下：

```html
<script>
  export default {
    onReady () {
      this.testMockNatives()
    },
    /**
     * 测试async的native接口
     */
    async testMockNatives () {
      const { natives } = this.$app.$def
      // 成功示例
      const ret1 = await natives.fetch({
        url: 'https://statres.quickapp.cn/quickapp/quickapptool/release/platform/quickapp_platform.json',
      })
      console.info('fetch成功结果: ', JSON.stringify(ret1))
      // 失败示例
      const ret2 = await natives.fetch({
        url: 'http://www.Its_A_Wrong_URL.com/'
      })
      console.info('fetch失败结果: ', JSON.stringify(ret2))
    }
  }
</script>
```

## 总结

本节不是开发的必须部分，只是为开发者提供一种更优雅的异步处理方式，推荐感兴趣的同学使用
