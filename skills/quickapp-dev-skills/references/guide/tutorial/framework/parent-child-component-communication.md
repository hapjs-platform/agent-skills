# 组件

> 熟悉自定义组件的开发，了解父子组件之间的通信方式，如：props，data，$dispatch()，$broadcast()

通过本节，你将学会：

- [组件自定义](#组件自定义)
- [组件引入](#组件引入)
- [父子组件通信](#父子组件通信)
- [兄弟/跨级组件通信](#兄弟/跨级组件通信)

## 组件自定义

开发页面时开发者必须用到 Native 组件，如：`text`、`div`，这些组件是由各平台 Native 底层渲染出来的；如果开发一个复杂的页面，开发者把所有的 UI 部分写在一个文件的`<template>`，那代码的可维护性将会很低，并且模块之间容易产生不必要的耦合关系

为了更好的组织逻辑与代码，可以把页面按照功能拆成多个模块，每个模块负责其中的一个功能部分，最后页面将这些模块引入管理起来，传递业务与配置数据完成代码分离，那么这就是`自定义组件`的意义

自定义组件是一个开发者编写的组件，使用起来和 Native 一样，最终按照组件的`<template>`来渲染；同时开发起来又和页面一样，拥有 ViewModel 实现对数据、事件、方法的管理

这么来看，页面也是一种特殊的自定义组件，无需引入即可使用，同时服务于整个页面

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <text class="tutorial-title">自定义组件:</text>
    <text>{{ say }}</text>
    <text>{{ obj.name }}</text>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
    padding-top: 20px;

    .tutorial-title {
      font-weight: bold;
    }
  }
</style>

<script>
  // 子组件
  export default {
    data: {
      say: 'hello',
      obj: {
        name: 'quickApp'
      }
    },
    /*
      data（）{
      return {
          say:'hello',
          obj:{
            name:'quickApp'
          }
      }
      },
    */
    onInit() {
      console.log('我是子组件')
    }
  }
</script>
```

自定义组件中数据模型只能使用**data 属性**，data 类型可以是 Object 或 Function。如果是函数，返回结果必须是对象。

## 组件引入

快应用中是通过`<import>标签`引入组件,如下面代码所示

```html
<import name="XXX" src="XXX"></import>
```

`<import>标签`中的的`src`属性指定自定义组件的地址，`name`属性指定在父组件中引用该组件时使用的**标签名称**

**示例如下：**

```html
<import name="comp-part1" src="./part1"></import>

<template>
  <div class="tutorial-page">
    <text class="tutorial-title">引入组件：</text>
    <comp-part1></comp-part1>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
    padding: 20px 10px;

    .tutorial-title {
      font-weight: bold;
    }
  }
</style>

<script>
  // 父组件
  export default {
    private: {},
    onInit() {
      this.$page.setTitleBar({ text: '引入组件' })
    }
  }
</script>
```

## 父子组件通信

### 父组件通过 Prop 向子组件传递数据

父组件向子组件传递数据，通过在子组件的`props`属性中声明对外暴露的属性名称，然后在`组件引用标签`上声明传递的父组件数据，详见[Props](./props.md)

**示例如下：**

```html
<!-- 子组件 -->
<template>
  <div class="child-demo">
    <text class="title">子组件:</text>
    <text>{{ say }}</text>
    <text>{{ propObject.name }}</text>
  </div>
</template>
<script>
  export default {
    props: ['say', 'propObject'],
    onInit() {
      console.info(`外部传递的数据：`, this.say, this.propObject)
    }
  }
</script>
```

```html
<!-- 父组件 -->
<import name="comp" src="./comp"></import>
<template>
  <div class="parent-demo">
    <comp say="{{say}}" prop-object="{{obj}}"></comp>
  </div>
</template>
<script>
  export default {
    private: {
      say:'hello'
      obj:{
        name:'child-demo'
      }
    }
  }
</script>
```

### 子组件对父组件通信

当子组件对数据进行改造后，把最终数据交给父组件甚至往上，往往有三种办法

- 父组件传递的数据本身就是对象，子组件**直接修改对象中的属性**，父组件的值也会发生改变，不推荐这种;
- 子组件通过`$dispatch()`触发自定义事件，父组件通过`$on()`监控自定义事件的触发，如：del；
- 子组件通过`$emit()`触发在节点上绑定的自定义事件来执行父组件的方法，如：add；

**示例如下：**

```html
 <!-- 父组件 -->
<import name="comp1" src="./comp1.ux"></import>
<import name="comp2" src="./comp2.ux"></import>
<import name="comp3" src="./comp3.ux"></import>
<template>
  <div class="parent-demo">
    <text>我是父组件count:{{count}}</text>
    <comp1 count="{{count}}" onemit-evt="emitEvt"></comp1>

    <text>我是父组件num:{{num}}</text>
    <comp2 num="{{num}}"></comp2>

    <text>我是父组件age:{{age}}</text>
    <input type="button" onclick="evtTypeEmit" value="触发$broadcast()"></input>
    <comp3></comp3>
  </div>
</template>

<script>
  export default {
    private:{
        count:20,
        num:20,
        age:18
    },
    onInit(){
      this.$on('dispatchEvt',this.dispatchEvt)
    },
    emitEvt(evt){
        this.count = evt.detail.count
    },
    dispatchEvt(evt){
        this.num = evt.detail.num
    },
    evtTypeEmit(){
       this.$broadcast('broadevt',{
         age:19
       })
    },
  }
</script>
```

```html
<!-- comp1 -->
<template>
  <div class="child-demo">
    <text>我是子组件一count:{{compCount}}</text>
    <input type="button" onclick='addHandler' value='add'></input>
  </div>
</template>
<script>
  export default {
    props: ['count'],
    data(){
        return{
            compCount:this.count
        }
    },
    addHandler(){
        this.compCount ++
        this.$emit('emitEvt',{
            count:this.compCount
        })
    },
  }
</script>
```

```html
<!-- comp2 -->
<template>
  <div class="child-demo">
    <text>我是子组件二num:{{compNum}}</text>
    <input type="button" onclick='delHandler' value='del'></input>
  </div>
</template>
<script>
  export default {
    props: ['num'],
    data(){
        return{
            compNum:this.num
        }
    },
    delHandler(){
        this.compNum --
        this.$dispatch('dispatchEvt',{
            num:this.compNum
        })
    },
  }
</script>
```

```html
<!-- comp3 -->
<template>
  <div class="child-demo">
    <text>我是子组件三age:{{compAge}}</text>
  </div>
</template>
<script>
  export default {
    props:[],
    data(){
        return{
            compAge:null
        }
    },
    onInit(){
      this.$on('broadevt',this.broadevt)
    },
    broadevt(evt){
      this.compAge = evt.detail.age
    }
  }
</script>
```

所以，框架向开发者提供了双向的事件传递

- 向下传递：父组件触发，子组件响应；调用`parentVm.$broadcast()`完成向下传递，如：broadevt
- 向上传递：子组件触发，父组件响应；调用`childVm.$dispatch()`完成向上传递，如：evtType2

**提示：**

- 触发时传递参数，再接收时使用`evt.detail`来获取参数
- 当传递结束后，可以调用`evt.stop()`来结束传递,否则会一直传递下去

## 兄弟/跨级组件通信

传统的兄弟组件通信、跨父子组件通信，可以通过 Publish/Subscribe 模型来完成，这里提供两种实现思路：

1) 开发者实现一个 Pub/Sub 模型完成通信：

开发者单独写一个 JS 文件，提供发布订阅的能力；然后各个 `ViewModel` 引入这个JS文件；或者将其挂载在页面级别的 `ViewModel`，子组件通过 `$root` 引用到页面级别的 `ViewModel`；

```javascript
/**
 * @file pubsub.js 提供发布订阅的能力
 */

/**
 * 提供Publish-Subscribe模型
 */
export default class Pubsub {
  constructor(name) {
    this.name = name
    this.eventMap = {}
  }

  /**
   * 订阅事件
   * @param type {string} 事件名称
   * @param fn {function} 响应函数
   * @param options {object} 暂时保留
   * @return {*}
   */
  subscribe(type, fn, options) {
    if (options && options.once) {
      const fnOnce = args => {
        fn(args)
        this.remove(type, fnOnce)
      }
      return this.subscribe(type, fnOnce)
    }

    this.eventMap[type] = this.eventMap[type] || []

    if (typeof fn === 'function') {
      const list = this.eventMap[type]
      if (list.indexOf(fn) === -1) {
        list.push(fn)
      }
    }
  }

  /**
   * 发布事件
   * @param type {string} 事件名称
   * @param args {array} 事件触发时的参数
   * @return {*}
   */
  publish(type, args) {
    let lastRet = null
    const list = this.eventMap[type] || []
    for (let i = 0, len = list.length; i < len; i++) {
      lastRet = list[i](args, lastRet)
    }
    return lastRet
  }

  /**
   * 删除事件订阅
   * @param type {string} 事件名称
   * @param fn {function} 响应函数
   */
  remove(type, fn) {
    if (!this.eventMap[type]) return
    const list = this.eventMap[type]
    const index = list.indexOf(fn)
    if (index > -1) {
      list.splice(index, 1)
    }
  }
}

// 实例缓存
const modelCache = {}

/**
 * 用于创建或获取一个指定名称的Pubsub模型的实例
 * @param name {string} 通过名称创建不同的实例
 * @return {*}
 */
export function createOrRetrieveInst (name) {
  if (!modelCache[name]) {
    modelCache[name] = new Pubsub(name)
  }

  return modelCache[name]
}
```

接着，UX文件中引入进来，绑定在`ViewModel`上面，例如：

```html
<script>
  import {
    createOrRetrieveInst
  } from './pubsub.js'

  export default {
    onReady () {
      // 1. 实例化：并绑定在VM上
      this.pubsubModel = createOrRetrieveInst()

      // 2. 订阅：其它VM也可以调用
      this.pubsubModel.subscribe('count-add', function (vArg0, vArg1){ ... })

      // 3. 发布：其它VM也可以调用
      this.pubsubModel.publish('count-add', ['arg0', 'arg1'])
    }
  }
</script>
```
子组件通过 `$root` 引用，例如：
```html
<script>
  export default {
    onReady () {
      // 1. 订阅
      this.$root.pubsubModel.subscribe('count-add', function (vArg0, vArg1){ ... })

      // 2. 发布
      this.$root.pubsubModel.publish('count-add', ['arg0', 'arg1'])
    }
  }
</script>
```
开发者通过上面的方式完成解耦，示例代码仅供参考；

2) 利用框架本身提供的事件绑定接口：

在业务逻辑相对简单的情况下，也可以使用`ViewModel`本身的事件绑定来处理：`$on()`，`$emit()`。

**示例如下：**

子组件定义了 Sub 端的逻辑处理，有`processMessage()`、`customEventInVm2()`，后者同使用`$on`效果一致

```html
<template>
  <div class="tutorial-page">
    <text class="tutorial-title">自定义组件2:</text>
    <text>处理消息：{{msg}}</text>
    <text>事件内容：{{eventDetail}}</text>
  </div>
</template>

<style lang="less"></style>

<script>
  // 子组件: part2
  export default {
    props: [],
    data() {
      return {
        msg: null,
        eventDetail: null
      }
    },
    processMessage(msg) {
      const now = new Date().toISOString()
      this.msg = `${now}: ${msg}`
    },
    /**
     * 通过events对象：绑定事件
     */
    events: {
      customEventInVm2(evt) {
        const now = new Date().toISOString()
        this.eventDetail = `${now}: ${evt.detail}`
      }
    }
  }
</script>
```

另外一个兄弟组件可以通过**父组件中建立相互引用**达到相互持有`ViewModel`的目的，通过在`生命周期onReady()`中`执行establishRef()`实现，如下代码所示：

```html
<!-- 父组件 -->
<import name="comp-part2" src="./part2"></import>
<import name="comp-part3" src="./part3"></import>

<template>
  <div class="tutorial-page">
    <!-- 兄弟VM通信 -->
    <comp-part2 id="sibling1"></comp-part2>
    <comp-part3 id="sibling2"></comp-part3>
  </div>
</template>

<style lang="less"></style>

<script>
  export default {
    onReady() {
      this.establishRef()
    },
    /**
     * 建立相互VM的引用
     */
    establishRef() {
      const siblingVm1 = this.$vm('sibling1')
      const siblingVm2 = this.$vm('sibling2')

      siblingVm1.parentVm = this
      siblingVm1.nextVm = siblingVm2
      siblingVm2.parentVm = this
      siblingVm2.previousVm = siblingVm1
    }
  }
</script>
```

那么另外一个子组件的 Pub 端定义就很简单了，执行`sendMesssage()`即可完成触发，如下代码所示：

```html
<template>
  <div class="tutorial-page">
    <text class="tutorial-title">自定义组件3:</text>
    <text onclick="sendMesssage">点击发送消息</text>
  </div>
</template>

<style lang="less"></style>

<script>
  // 子组件: part3
  export default {
    sendMesssage() {
      if (this.previousVm) {
        // Way1. 调用方法
        this.previousVm.processMessage('兄弟之间通信的消息内容')
        // Way2. 触发事件
        this.previousVm.$emit('customEventInVm2', '兄弟之间通信的消息内容')
      }
    }
  }
</script>
```

## 总结

自定义组件有助于更好的组织代码逻辑，结构更清晰；了解父子组件之间的数据通信，是开发自定义组件的必备技能
