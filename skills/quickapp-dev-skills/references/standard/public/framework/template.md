# template 模板

类似 HTML 的标签语言，结合基础组件、自定义组件、事件，构建出页面的结构

**注意：模板中只能有 1 个根节点，如：div；请不要在`<template>`下存在多个根节点，也不要使用 block 作为根节点**

## 数据绑定

```html
<template>
  <text>{{message}}</text>
</template>

<script>
  export default {
    // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
    private: {
      message: 'Hello'
    }
  }
</script>
```

## 事件绑定

```html
<template>
  <div>
    <!-- 正常格式 -->
    <text onclick="press"></text>
    <!-- 缩写 -->
    <text @click="press"></text>
  </div>
</template>

<script>
  export default {
    press(e) {
      this.title = 'Hello'
    }
  }
</script>
```

事件回调支持的写法（其中{% raw %}{{}}{% endraw %}可以省略）：

"fn"：fn 为事件回调函数名（在`<script>`中有对应的函数实现）

"fn(a,b)"：函数参数例如 a，b 可以是常量，或者是在`<script>`中定义的页面的数据变量(前面不用写 this)

"a+b"：表达式，其中 a,b 数据类型与上面相同

回调函数被调用时，会在参数列表末尾自动添加一个 evt 参数，通过 evt 参数访问回调事件相关上下文数据（数据内容具体参看组件回调事件说明），例如点击事件的点击位置 x,y

## 列表渲染

```html
<template>
  <div>
    <div for="{{list}}" tid="uniqueId">
      <text>{{$idx}}</text>
      <text>{{$item.uniqueId}}</text>
    </div>
  </div>
</template>

<script>
  export default {
    // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
    private: {
      list: [
        {
          uniqueId: 1
        },
        {
          uniqueId: 2
        }
      ]
    }
  }
</script>
```

`for指令`根据源数据数组渲染列表，支持的写法如下（其中{% raw %}{{}}{% endraw %}可以省略）：

- for="{% raw %}{{list}}{% endraw %}"：`list`为源数据数组，默认的数组元素名为`$item`
- for="{% raw %}{{value in list}}{% endraw %}"：`value`为自定义的数组元素名，默认的数组元素索引名为`$idx`
- for="{% raw %}{{(index, value) in list}}{% endraw %}"：`index`为自定义的数组元素索引名，`value`为自定义的数组元素名

`for指令`的`tid属性`用于指定数组元素的唯一 Id，若未指定，默认使用数组索引(`$idx`)作为唯一 Id。`tid属性`的作用在于元素节点重用，优化 for 循环的重绘效率

示例代码中，tid="uniqueId"表示使用数组`list`的数组元素`$item.uniqueId`作为数组元素的唯一 Id，且必须保证 uniqueId 这个属性值在每个数组元素都不一样。

使用`tid属性`时应注意：

- `tid属性`指定的数据属性必须存在，否则可能导致运行异常
- `tid属性`指定的数据属性要保证唯一，否则可能导致性能问题
- `tid属性`目前不支持表达式。

## 条件渲染

分为 2 种：if/elif/else 和 show。它们的区别在于：if 为 false 时，组件会从 VDOM 中移除，而 show 仅仅是渲染时不可见，组件依然存在于 VDOM 中;

if/elif/else 节点必须是相邻的兄弟节点，否则无法通过编译

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

show 等同于 visible=none, 主要用于在原生组件上声明；

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

## 逻辑控制块

可以使用`<block>`实现更为灵活的循环/条件渲染； 注意`<block>`目前只支持 for 和 if/elif/else 属性，如果没有指定任何属性，`<block>`则在构建时被当作“透明”节点对待，其子节点被添加到`<block>`的父节点上

```html
<template>
  <list>
    <block for="cities">
      <list-item type="city">
        <text>{{$item.name}}</text>
      </list-item>
      <list-item type="spot" for="$item.spots">
        <text>{{$item.address}}</text>
      </list-item>
    </block>
  </list>
</template>

<script>
  export default {
    // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
    private: {
      cities: [
        {
          name: 'beijing',
          spots: [
            {
              address: 'XXX'
            }
          ]
        },
        {
          name: 'shanghai',
          spots: [
            {
              address: 'XXX'
            },
            {
              address: 'XXX'
            }
          ]
        }
      ]
    }
  }
</script>
```

## 引入自定义组件

```html
<import name="comp" src="./comp"></import>
<template>
  <div>
    <comp
      prop1="xxxx"
      onevent1="bindParentVmMethod1"
      @event-type1="bindParentVmMethod1"
    ></comp>
  </div>
</template>
```

如果没有设置 name 属性，则默认采用 src 的文件名作为组件名

src 属性指定组件 ux 文件位置，可以省略.ux 后缀

注意：

- 组件名不区分大小写，默认统一采用小写
- 通过`(on|@)event1`语法绑定自定义子组件的`event1`事件，触发事件`childVm.$emit('event1', { params: '传递参数' })`时执行父组件的方法：`bindParentVmMethod1`
- 标签上声明事件名称采用`-`连接，不要使用`驼峰式`，来做响应与方法的关联，即：使用`event-type1`表示绑定`eventType1`事件

## app.ux中引入全局自定义组件 `1090+`

在app.ux中引入自定义组件可注册全局组件,全局组件可供开发者在多个页面公共使用。打包需要 `hap-toolkit` 版本 >= 1.8.0。

```html
<!-- app.ux -->
<import src="./components/app-part1.ux" name="app-part1"></import>
<script>
  export default {
  }
</script>
```

在页面中使用全局组件:

```html
<template>
  <div>
    <app-part1></app-part1>
  </div>
</template>
```

注意：

- 不要在app.ux中和普通页面中重复声明相同名字的自定义组件

## 插入自定义组件

组件中通过<slot>标签来定义子组件插入位置，例如

组件 com-a 的模板定义为：

```html
<template>
  <div>
    <text>header</text>
    <slot></slot>
    <text>footer</text>
  </div>
</template>
```

在页面使用组件 comA，定义如下：

```html
<import name="comp-a" src="./comp-a"></import>
<template>
  <com-a>
    <text>body</text>
  </com-a>
</template>
```

则在页面渲染时，组件 comA 变为：

```html
<div>
  <text>header</text>
  <text>body</text>
  <text>footer</text>
</div>
```

## 动态组件 `1070+`

动态组件允许开发者灵活控制模板中要渲染的是哪个自定义组件；

在不支持该功能时，开发者往往通过`if/elif/else`指令来解决需求；

如下面代码所示，通过`component`逻辑组件与对应的`is`属性来判断运行时到底渲染哪个组件；

```html
<import src="./part1.ux" name="part1"></import>
<import src="./part2.ux" name="part2"></import>
<import src="./part3.ux" name="part3"></import>

<template>
  <div>
    <component is="{{'part' + index}}"></component>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index: 1
      }
    },
    onReady () {
      // 3秒后渲染其他组件
      setTimeout(() => {
        this.index = 3
      }, 3e3)
    }
  }
</script>
```

## 过滤器

在 hap-toolkit 0.4.0 之后，允许自定义过滤器，可用于文本格式化。

过滤器是一个函数，在页面导出的对象中定义，如下面的 capitalize:

```html
<script>
  export default {
    private: {
      message: 'hello'
    },
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
</script>
```

使用过滤器时，应该添加到表达式的尾部，由管道符号指示。 和 vue 过滤器类似，其形式如下：

```html
{{ message | capitalize }}
```

过滤器函数接收表达式的值作为第一个参数。在上述例子中，capitalize 过滤器函数将会收到 message 的值作为第一个参数。

过滤器可以串联：

```html
{{ message | filterA | filterB }}
```

在这个例子中，filterA 被定义为接收单个参数的过滤器函数，表达式 message 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 filterB，将 filterA 的结果传递到 filterB 中。

过滤器可以接收参数：

```html
{{ message | filterA('arg1', arg2) }}
```

这里，filterA 被定义为接收三个参数的过滤器函数。其中 message 的值作为第一个参数，普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数。

完整示例如下：

```html
<template>
  <div>
    <text>{{ message | capitalize }}</text>
  </div>
</template>

<script>
  export default {
    private: {
      message: 'hello'
    },
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
</script>
```
