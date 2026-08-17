# 组件 slot

类似于其他框架的内容分发，在快应用中也实现了一套内容分发的 API，我们可以使用 `slot` 组件作为承载分发内容的出口。

## 插槽内容

在子组件 `part1` 中，我们使用了 `slot` 组件来承载父组件中定义的内容

```html
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

运用 `slot` 组件可以让我们的组件变得更加灵活，可定制。

在父组件 `index` 中，我们引入了子组件 `part1`，并且在里面定义了分发内容。在渲染时，`part1` 中的 `slot` 组件将会被父组件中的分发内容替换。

```html
<import name="part1" src="./part1.ux"></import>

<template>
  <div>
    <part1>
      <text>dynamic content form parent</text>
    </part1>
  </div>
</template>
```

## 默认内容 `1050+`

`slot` 组件中可以设置默认内容

```html
<template>
  <div>
    <slot>
      <text>default content form part1</text>
    </slot>
  </div>
</template>
```

在父组件 `index` 中，如果没有内容需要分发到 `part1` 组件。此时子组件 `part1` 中的 `slot` 组件将会渲染该组件下的默认内容

```html
<div>
  <part1>
  </part1>
</div>
```

同时，如果父组件中设置的分发内容但因为设置了 `if` 或其他原因没有实际的节点渲染，那么子组件 `part1` 中的 `slot` 组件也将渲染 `slot` 组件下的默认内容

```html
<import name="part1" src="./part1.ux"></import>

<template>
  <div>
    <part1>
      <text if="{{showContent}}">dynamic content form parent</text>
    </part1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContent: false
    }
  }
}
</script>
```

## 编译作用域 `1050+`

父级模板里的所有内容都是在父级作用域中编译；子模板里的所有内容都是在子作用域中编译。

父组件 `index`

```html
<import name="part1" src="./part1.ux"></import>

<template>
  <div>
    <part1>
      <!-- {{context}} 的编译作用域在父组件 -->
      <text>dynamic content form {{context}}</text>
    </part1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: 'parentVm'
    }
  }
}
</script>
```

子组件 `part1`

```html
<template>
  <div>
    <slot>
      <!-- {{context}} 的编译作用域在子组件 -->
      <text>default content form {{context}}</text>
    </slot>
  </div>
</template>

<script>
export default{
  data() { //运用 slot 组件可以让我们的组件变得更加灵活，可定制。
    return {
      context: 'childVm'
    }
  }
}
</script>
```

## 具名插槽 `1050+`

在子组件中，我们定义具有不同 `name` 属性的 `slot` 组件。如果没有设置，则默认的 `name` 属性为 `default`。

```html
<template>
  <div>
    <div class="header">
      <!-- 我们希望把头部放这里 -->
      <slot name="header"></slot>
    </div>

    <div class="main">
      <!-- 我们希望把主要内容放这里 -->
      <slot name="main"></slot>
    </div>

    <div class="footer">
      <!-- 我们希望把尾部放这里 -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

在父组件中，通过设置 `slot` 属性，如果没有设置，则默认的 `slot` 属性为 `default`。然后根据 `name` 和 `slot` 的匹配，将内容分发到对应的 `slot` 组件。

```html
<import name="part1" src="./part1.ux"></import>

<template>
  <div>
    <part1>
      <text slot="header">header content</text>
      <text slot="main">main content</text>
      <text slot="footer">footer content</text>
    </part1>
  </div>
</template>
```

> 注意：目前 `name` 和 `slot` 属性均不支持动态数据，如果使用可能导致实际渲染和预期不一致。

```html
<template>
  <div>
    <!-- slotName 设置无效 -->
    <slot name="{{slotName}}">
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slotName: 'slot1'
    }
  }
}
</script>
```
## 总结

运用 slot 组件可以让我们的组件变得更加灵活，可定制。
