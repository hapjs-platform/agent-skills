# 动态组件

> 通过本节，你将学会如何使用动态组件，减少模板的代码量

绝大数情况下推荐在模板上使用`if`等指令进行逻辑判断，改变视图结构。

**示例如下：**

```html
<import src="./part1.ux" name="part1"></import>
<import src="./part2.ux" name="part2"></import>
<import src="./part3.ux" name="part3"></import>
<template>
  <div>
    <part1 if="{{status === 1}}"></part1>
    <part2 elif="{{status === 2}}"></part2>
    <part3 else></part3>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: 1
      }
    }
  }
</script>
```

这种情况下，我们可以通过修改`status`的值达到控制指定组件渲染的目的。

然而一旦引入的组件过多，就需要在模板引入大量代码，导致项目的可维护性变差。

**示例如下：**

```html

<import src="./part1.ux" name="part1"></import>
<import src="./part2.ux" name="part2"></import>
<import src="./part3.ux" name="part3"></import>
<import src="./part4.ux" name="part4"></import>
<import src="./part5.ux" name="part5"></import>
<import src="./part6.ux" name="part6"></import>

<template>
  <div>
    <part1 if="{{status === 1}}"></part1>
    <part2 if="{{status === 2}}"></part2>
    <part3 if="{{status === 3}}"></part3>
    <part4 if="{{status === 4}}"></part4>
    <part5 if="{{status === 5}}"></part5>
    <part6 if="{{status === 6}}"></part6>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: 1
      }
    }
  }
</script>

```

这种情况下引入动态组件就能有效地减少代码量。

**示例如下：**

```html
<import src="./part1.ux" name="part1"></import>
<import src="./part2.ux" name="part2"></import>
<import src="./part3.ux" name="part3"></import>
<import src="./part4.ux" name="part4"></import>
<import src="./part5.ux" name="part5"></import>
<import src="./part6.ux" name="part6"></import>

<template>
  <div>
    <component is="{{'part' + status}}"></component>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: 1
      }
    }
  }
</script>
```

`is`的值表示组件名，通过修改`status`的值即可达到动态修改组件的目的。