# 表单输入绑定 `1100+`

> 在使用表单组件时，往往需要同时绑定值和 change 事件动态更新数据，当表单交互较多的场景下会有大量与业务无关的代码。快应用在`1100`开始引入 model 指令，使用 model 指令可以在框架内部对值进行绑定与更新，实现双向绑定的效果，简化代码逻辑。

通过本节，你将学会：

- 在表单组件上使用 model 指令
- 在自定义组件上使用 model 指令

注意：使用 model 指令需要引擎版本>=1100 且 hap-toolkit 版本>=1.9.5。

## 基础用法

model 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定，它会根据控件类型自动选取正确的方法来更新元素。

model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- input type=text 和 textarea 元素使用 value 属性和 change 事件；
- input type=checkbox 和 type=radio 使用 checked 属性和 change 事件；
- select 使用 change 事件。

### 传统表单组件使用场景

传统快应用开发使用表单组件时，我们往往需要同时绑定一个属性和 change 事件，如：

```html
<template>
  <input type="text" value="{{value}}" @change="updateValue"></input>
</template>

<script>
  export default {
    data: {
      value: "input value"
    },
    updateValue(e) {
      this.value = e.target.attr.value
    }
  }
</script>
```

当有多个表单组件时，开发者需要在 data 中定义多个 “value” 和分别绑定 change 事件来完成相关的业务开发。表单组件越多，这些非业务逻辑的代码也会越多，此时开发者可以使用 model 指令对该场景进行优化。

### 使用 model 指令实现双向绑定

对于上面的例子，我们可以通过 model 指令，从而使用更简洁的代码来实现相同的功能：

```html
<template>
  <input type="text" model:value="{{newValue}}"></input>
</template>

<script>
  export default {
    data: {
      newValue: "input value"
    }
  }
</script>
```

使用了 model 指令，当用户输入时，newValue 的值会自动更新，当代码中对 newValue 的值进行修改时，修改的值也会自动更新到屏幕上。类似的其他表单组件和不同类型的 input 都可以如此使用 model 指令。

model 指令本质上是一个语法糖，原理是在编译时为组件自动绑定了 change 事件，通过 change 事件为双向绑定的数据更新变更后的值，如以下代码：

```html
<template>
  <input type="text" value="{{ value }}" @change="changeValue"></input>
</template>

<script>
  export default {
    private: {
      value: ''
    },
    changeValue(e) {
      this.value = e.target.attr.value
    }
  }
</script>
```

**所以请勿在使用 model 指令时，再为组件手动绑定 change 事件，如果同时使用 toolkit 编译时只会保留开发者定义的 change 事件，导致 model 指令失效。**

### model 指令语法

如上图所示，我们可以使用以下三步来标识一个 model 指令：

1. 使用`model:`固定前缀，标识该属性为双向数据绑定属性
2. `model:`后面填写绑定的属性名
3. 最后填写属性绑定的值，必须为动态数据变量

### 多个复选框

当有多个复选框时，可以为 model:value 绑定一个数组，该数组将包含所有选中的 checkbox 的 value 值。下面是一个实例：

```html
<template>
  <div class="item-container">
    <text>多个复选框，绑定到同一个数组：</text>
    <div>
      <input type="checkbox" id="jack" value="Jack" model:value="{{checkedNames}}"></input>
      <label target="jack">Jack</label>
    </div>
    <div>
      <input type="checkbox" id="john" value="John" model:value="{{checkedNames}}"></input>
      <label target="john">John</label>
    </div>
    <div>
      <input type="checkbox" id="mike" value="Mike" model:value="{{checkedNames}}"></input>
      <label target="mike">Mike</label>
    </div>
    <text>Checked names: {{ checkedNames }}</text>
  </div>
</template>

<script>
  export default {
    private: {
      checkedNames: []
    }
  }
</script>
```

运行此段代码，当选中第 1、2 个 checkbox 时，打印 checkedNames 的值可以看到输出为 `['Jack', 'John']`

## 值绑定

对于单选按钮和选择框，开发者可以使用插值动态的修改绑定的值。而对于复选框来说，快应用提供了 true-value 和 false-value 属性来控制被选中/未选中时的值。

```html
<template>
  <div>
    <input
      type="checkbox"
      model:value="{{toggle}}"
      true-value="yes"
      false-value="no"
    ></input>
    <input type="button" value="获取 toggle 的值" @click="getToggle"></input>
  </div>
</template>

<script>
  export default {
    data: {
      toggle: 'yse'
    },
    getToggle() {
      console.log(this.toggle) // 当选中时输出为 yes，没有选中时输出为 no
    }
  }
</script>
```

## 在组件上使用 model

在自定义组件上开发者也可以使用 model 指令，下面是一个使用示例：

首先定义一个含有表单元素的自定义组件，在 input 的 change 时，触发 update:sampleName 事件将值向父级传递。
其中 `update:` 为固定前缀，`sampleName` 为当前组件和父级双向绑定的属性名称。

```html
<!-- com.ux -->
<template>
  <input type="text" value="{{sampleName}}" @change="$emit('update:sampleName', evt.value)"></input>
</template>

<script>
  export default {
    props: ['sampleName']
  }
</script>
```

然后在其他页面中正常引入组件，并使用 `model:sample-name` 即可完成自定义组件的 `sampleName` 属性双向绑定。

```html
<!-- index.ux -->
<import name="model-sample" src="./com.ux"></import>

<template>
  <div>
    <text>sampleName: {{name}}</text>
    <model-sample model:sample-name="{{name}}"></model-sample>
  </div>
</template>

<script>
  export default {
    data: {
      name: "demo sample"
    }
  }
</script>
```
