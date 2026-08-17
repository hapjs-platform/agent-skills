# 页面切换及参数传递

> 了解如何打开页面、回退，并传递参数

通过本节，你将学会：

- [通过组件 a 切换页面和传递参数](#通过组件-a-切换页面和传递参数)
- [通过接口 router 切换页面和传递参数](#通过接口-router-切换页面和传递参数)
- [接收参数](#接收参数)
- [回传参数](#回传参数)

## 通过组件 a 切换页面和传递参数

### 切换页面

组件 a 可通过配置 href 属性跳转到应用内的页面

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <!-- 以'/'开头的应用内页面的路径 -->
    <a href="/PageParams/receiveparams">跳转到接收参数页面</a>
    <!-- 以非'/'开头的应用内页面的名称 -->
    <a href="PageParams/receiveparams">跳转到接收参数页面</a>
    <!-- 特殊的,如果uri的值是'/',则跳转到path为'/'的页,没有则跳转到首页-->
    <a href="/">跳转到首页</a>
  </div>
</template>
```

此外，组件 a 还提供调起电话、短信、邮件的功能和加载网页的能力

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <!-- 包含完整schema的uri -->
    <a href="tel:10086">调起电话</a>
    <a href="sms:10086">调起短信</a>
    <a href="mailto:example@xx.com">调起邮件</a>
    <!-- 打开webview加载网页 -->
    <a href="https://www.baidu.com/">打开网页</a>
  </div>
</template>
```

### 传递参数

通过组件 a 实现页面切换时，可以通过'?key=value'的方式添加参数，支持参数为变量

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <!-- 添加参数 -->
    <a href="/PageParams/receiveparams?key=Hello, world!">携带参数key1跳转</a>
    <!-- 添加变量参数 -->
    <a href="/PageParams/receiveparams?key={{title}}">携带参数key2跳转</a>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    margin-top: 75px;
    font-size: 30px;
    color: #09ba07;
    text-decoration: underline;
  }
</style>

<script>
  export default {
    private: {
      title: 'Hello, world!'
    },
    onInit () {
      this.$page.setTitleBar({ text: '组件a切换页面并传递参数' })
    }
  }
</script>
```

## 通过接口 router 切换页面和传递参数

### 切换页面

router 接口在使用前，需要先导入模块

router.push(OBJECT)支持的参数 uri 与组件 a 的 href 属性完全一致

router.replace(OBJECT)的支持的参数 uri 不支持调起电话、短信、邮件，其他与 push 一致

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <input class="btn" type="button" value="跳转到接收参数页面" onclick="routePagePush"></input>
    <input class="btn" type="button" value="跳转到接收参数页面，当前页面无法返回" onclick="routePageReplace"></input>
    <input class="btn" type="button" value="返回上一页" onclick="routePageBack"></input>
    <input class="btn" type="button" value="清空页面记录，仅保留当前页面" onclick="routePageClear"></input>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn {
    width: 550px;
    height: 86px;
    margin-top: 75px;
    border-radius: 43px;
    background-color: #09ba07;
    font-size: 30px;
    color: #ffffff;
  }
</style>

<script>
  // 导入模块
  import router from '@system.router'

  export default {
    onInit () {
      this.$page.setTitleBar({ text: '接口router切换页面' })
    },
    routePagePush () {
      // 跳转到应用内的某个页面
      router.push({
        uri: '/PageParams/receiveparams'
      })
    },
    routePageReplace () {
      // 跳转到应用内的某个页面，当前页面无法返回
      router.replace({
        uri: '/PageParams/receiveparams'
      })
    },
    routePageBack () {
      // 返回上一页面
      router.back()
    },
    routePageClear () {
      // 清空所有历史页面记录，仅保留当前页面
      router.clear()
    }
  }
</script>
```

### 传递参数

router 接口的参数 params 可配置页面跳转时需要传递的参数

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <input class="btn" type="button" value="携带参数跳转页面" onclick="routePagePushWithParams"></input>
    <input class="btn" type="button" value="携带参数跳转页面，当前页面无法返回" onclick="routePageReplaceWithParams"></input>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn {
    width: 550px;
    height: 86px;
    margin-top: 75px;
    border-radius: 43px;
    background-color: #09ba07;
    font-size: 30px;
    color: #ffffff;
  }
</style>

<script>
  // 导入模块
  import router from '@system.router'

  export default {
    private: {
      title: 'Hello, world!'
    },
    onInit () {
      this.$page.setTitleBar({ text: '接口router切换页面并传递参数' })
    },
    routePagePushWithParams () {
      // 跳转到应用内的某个页面
      router.push({
        uri: '/PageParams/receiveparams',
        params: { key: this.title }
      })
    },
    routePageReplaceWithParams () {
      // 跳转到应用内的某个页面，当前页面无法返回
      router.replace({
        uri: '/PageParams/receiveparams',
        params: { key: this.title }
      })
    }
  }
</script>
```

## 接收参数

现在，开发者已经掌握了通过组件 a 和接口 router 在页面之间传递参数的方法，如何接收参数呢？

其实很简单，组件 a 和接口 router 传递的参数的接收方法完全一致：在页面的 ViewModel 的`protected属性`中声明使用的属性

**注意：**

- protected 内定义的属性，允许被应用内部页面请求传递的数据覆盖，不允许被应用外部请求传递的数据覆盖
- 若希望参数允许被应用外部请求传递的数据覆盖，请在页面的 ViewModel 的`public属性`中声明使用的属性

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <text>page</text>
    <!-- template中显示页面传递的参数 -->
    <text>{{key}}</text>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
  export default {
    protected: {
      key: ''
    },
    onInit () {
      this.$page.setTitleBar({ text: '接收参数' })

      // js中输出页面传递的参数
      console.info('key: ' + this.key)
    }
  }
</script>
```

## 回传参数

开发者可能会遇到需要在页面之间回传参数的需求

**示例如下：**

假设存在页面 A 和页面 B，先从页面 A 跳转至页面 B，然后从页面 B 返回到页面 A 时，需要传递参数

此时，组件 a 和接口 router 传参不能满足需求，可以借助于 app 实现：

在 app 中增加缓存的数据，并提供读写缓存数据的能力。app 实现代码如下：

```html
<script>
  export default {
    onCreate () {
      // 初始化 app 缓存的数据
      this.dataCache = {}
    },
    /**
     * 获取 app 缓存的数据
     * @param key
     */
    getAppData (key) {
      return this.dataCache[key]
    },
    /**
     * 设置 app 缓存的数据
     * @param key
     * @param val
     */
    setAppData (key, val) {
      this.dataCache[key] = val
    }
  }
</script>
```

页面 A 和页面 B 通过 app 缓存数据传递参数：

在页面 A 中，当页面显示时，读取 app 缓存数据，获取参数。页面 A 实现代码如下：

```html
<template>
  <div class="tutorial-page">
    <a href="/PageParams/returnParams/pageb">跳转到页面B</a>
    <text>{{msg}}</text>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    margin-top: 75px;
    font-size: 30px;
    color: #09ba07;
    text-decoration: underline;
  }
</style>

<script>
  export default {
    private: {
      msg: ''
    },
    onInit () {
      this.$page.setTitleBar({ text: '页面A' })
    },
    onShow () {
      // 页面被切换显示时，从数据中检查是否有页面B传递来的数据
      const data = this.$app.getAppData('dataFromB')
      if (data && data.destPageName === 'pageA') {
        // 获取回传给本页面的数据
        this.msg = data.params && data.params.msg
      }
    }
  }
</script>
```

在页面 B 中，当页面隐藏时，设置 app 缓存数据，写入参数。页面 B 实现代码如下：

```html
<template>
  <div class="tutorial-page">
    <text>页面B</text>
    <input style="width: 450px;" placeholder="请输入回传给页面A的信息" onchange="updateMsg"/>
  </div>
</template>

<style>
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
  export default {
    private: {
      msg: ''
    },
    onInit () {
      this.$page.setTitleBar({ text: '页面B' })
    },
    onHide () {
      // 页面被切换隐藏时，将要传递的数据对象写入
      this.$app.setAppData('dataFromB', {
        destPageName: 'pageA',
        params: {
          msg: this.msg
        }
      })
    },
    updateMsg (evt) {
      // 更新input输入的信息文本
      this.msg = evt.text
    }
  }
</script>
```

## 总结

掌握页面切换和参数传递，开发者就能游刃有余的开发多页面应用了
