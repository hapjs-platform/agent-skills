# provide & inject

先前，快应用在深层嵌套组件传值方面，能力有所欠缺，需要通过 props 逐级往下传递数据，或者通过事件的发布订阅获取数据，操作较繁琐，不够灵活。现提供 provide/inject 功能，专门用于解决深层嵌套组件传值问题。


**注意**：版本支持如下：

- 联盟：`1400+`
- OPPO：`1143+`


## manifest 配置

```json
{
  "package": "com.xxx.xxx",
  "name": "demo",
  "versionName": "1.0.0",
  "versionCode": 1,
  "minPlatformVersion": 1143
}
```

由于 provide/inject 是新功能，低版本引擎不支持该功能，出于兼容性考虑，为了防止使用了该功能的快应用或卡片运行在低版本引擎时表现异常，需要合理设置 `minPlatformVersion`：

- 需兼容联盟引擎：建议设置为 `1400` 或以上
- 仅面向 OPPO：可设置为 `1143` 或以上

若 `minPlatformVersion` 低于目标引擎支持版本，则该功能无法生效。

## 类型说明

**provide**：`Object | () => Object`

**inject**：`Array<string> | { [key: string]: string | Symbol | Object }`

## 详细说明

provide / inject 需要配套使用，祖先组件通过 `provide` 向其所有子孙组件注入数据，不论组件层次有多深，子孙组件都可以通过 `inject` 接收数据，并在其上下游关系成立的时间里始终生效。

`provide` 选项应该是一个对象或返回一个对象的函数。

`inject` 选项应该是：

- 一个字符串数组
- 或者是一个对象，对象的 key 是本地的绑定名，value 是：
  - 在可用的注入内容中搜索用的 key (字符串或 Symbol)
  - 亦或者是一个对象，该对象支持的属性为：
    - **`from`** : 是在可用的注入内容中搜索用的 key (字符串或 Symbol)
    - **`default`** : 默认值，当未找到上级组件注入的内容时，就会使用该默认值

> 注意：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

## 示例代码

```html
<!-- parent（祖先组件） -->
<import name="child" src="./child.ux"></import>

<template>
  <div class="parent-wrapper">
    <child></child>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: '祖先组件',
        dataObj: {
          name: '响应式对象'
        }
      }
    },
    // 向后代注入以下数据
    provide() {
      return {
        // 无响应式，后续祖先组件的 title 更改，子孙组件接收的title 不会跟着改变
        title: this.title,
        // 由于传递的是一个响应式对象，所以子孙组件接收到的也是响应式对象
        // 后续 dataObj 的 name 属性发生改变,子孙组件接收到的 dataObj.name 也会跟着改变
        dataObj: this.dataObj
      }
    }
  }
</script>
```

祖先组件，通过 provide，往后代注入内容。

```html
<!-- child.ux（中间组件） -->
<import name="grandson" src="./grandson.ux"></import>

<template>
  <div class="child-wrap">
    <!-- 无需做任何显示的数据传递操作 -->
    <grandson></grandson>
  </div>
</template>
<script>
  export default {}
</script>
```

处于中间的组件，若无需要，可不接收父级传递的 provide，此时无需任何显示的数据传递操作。

```html
<!-- grandson.ux（深层次组件） -->
<template>
  <div class="grandson-wrap">
    <!-- 通过 inject 接收的数据，可直接用于模板 -->
    <text class="title">{{ title }}</text>
    <text class="name">{{ dataObj.name }}</text>
  </div>
</template>
<script>
  export default {
    // 接收祖先组件通过 provide 注入的数据
    inject: ['title', 'dataObj'],
    data() {
      return {
        // inject 接收的数据可在data中使用，也可在 props 及 computed 中使用
        childTitle: this.title
      }
    },
    onInit() {
      console.log(this.title) // 打印 '祖先组件'
      console.log(JSON.stringify(this.dataObj)) // 打印 '{"name":"响应式对象"}'
    }
  }
</script>
```

深层次的组件，可通过 inject，接受祖先组件通过 provide 注入的内容。
