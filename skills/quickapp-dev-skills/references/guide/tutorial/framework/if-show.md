# 条件指令

> 通过本节，你将知道条件指令有2 种：if/elif/else 和 show。
> 它们的区别在于：if 为 false 时，组件会从 VDOM 中移除，而 show 仅仅是渲染时不可见，组件依然存在于 VDOM 中;

## if指令

if 条件指令，是指 if/elif/else 这 3 个相关指令，用于控制是否增加或者删除组件；

if/elif/else 节点必须是相邻的兄弟节点

```html
<template>
  <div>
    <text if="{{display}}">Hello-1</text>
    <text elif="{{display}}">Hello-2</text>
    <text else>Hello-3</text>
  </div>
</template>

<script>
  export default {
    // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
    private: {
      display: false
    }
  }
</script>
```

## show指令

show 指令，是指是否显示组件，用于控制组件的显示状态，并不会从 DOM 结构中删除;

show等同于 visible=none, 主要用于在原生组件上声明；

show 指令开始支持在自定义组件上进行声明`1050+`，当这样使用时，等同于在该自定义子组件的根节点上使用 show 指令；

对于之前版本，自定义组件不支持 show 指令的需求，可以通过 props 传入参数，在自己内部使用 show 来控制是否可见；

```html
<template>
  <text show="{{visible}}">Hello</text>
</template>

<script>
  export default {
    // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
    private: {
      visible: false
    }
  }
</script>
```

## if与show区别

- 当 if/elif 指令的值为 false 时，节点会从页面中移除，当 if/elif 指令值为 true，组件会动态插入节点中；

- 当 show 指令的值为 true 时，节点可见， 当其值为 false 时，组件不可见，但节点仍会保留在页面 DOM 结构中

