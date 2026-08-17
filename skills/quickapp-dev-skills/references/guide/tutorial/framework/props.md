# Props

通过本节，你将学会：

- [Prop 写法](#Prop-写法-1010)
- [Prop 属性默认值](#属性默认值-1010)
- [Prop 数据单向性](#数据单向性)
- [Prop 属性校验](#属性校验-1010)

## Prop 写法 `1010+`

Prop 属性名称使用 camelCase(驼峰命名法)命名是，在外部传递数据时请转化为以 kebab-case (短横线分隔命名) propObject 转换为 prop-object。

```html
<!-- 子组件 -->
<template>
  <div class="child-demo">
    <text>{{ propObject.name }}</text>
  </div>
</template>
<script>
  export default {
    props: ['propObject']
  }
</script>
```

```html
<!-- 父组件 -->
<import name="comp" src="./comp"></import>
<template>
  <div class="parent-demo">
    <comp prop-object="{{obj}}"></comp>
  </div>
</template>
<script>
  export default {
    private: {
      obj: {
        name: 'child-demo'
      }
    }
  }
</script>
```

## 属性默认值 `1010+`

子组件声明属性时，可以设置默认值。当调用子组件没有传入该数据时，将会自动设为默认值。

如果需要设置默认值，`props` 属性的写法必须要要写成 Object 形式，**不能**写成 Array 形式。

**示例如下：**

```html
<script>
  // 子组件
  export default {
    props: {
      prop1: {
        default: 'Hello' //默认值
      },
      prop2Object: {} //不设置默认值
    },
    onInit() {
      console.info(`外部传递的数据：`, this.prop1, this.prop2Object)
    }
  }
</script>
```

## 数据单向性

父子间的数据传输是单向性的，父组件 prop 数据更新，子组件的数据会刷新为最新值;子组件的 prop 值发生改变，并不会改变父组件中值。

但是**prop 类型事数组或者对象，自组件变化会影响到父组件的值**，这意味着你不应该在一个子组件内部改变 prop 的值，这是危险性操作。

常见的三种操作 prop 值的方法：

**1.将 prop 传入的值作为初始值，用 data 接收**

```html
<script>
  export default {
    props: ['say', 'propObject'],
    data() {
      return {
        obj: this.propObject.count
      }
    },
    onInit() {
      console.info(`外部传递的数据：`, this.say, this.propObject)
    }
  }
</script>
```

**提示：**

- 如果你想用 data 直接接收 propObject 这个对象，可以采用**JSON.parse(JSON.stringify(propObject))**，将 prop 深度克隆。

**2.\$watch 监控数据改变**

如果是监听对象中的属性，参数请使用`.`分割，如：`$watch(xxx.xxx.xxx, methodName)`

```html
<script>
  export default {
    props: ['say', 'propObject'],
    data() {
      return {
        propSay: this.say
      }
    },
    onInit() {
      // 监听数据变化
      this.$watch('prosayp1', 'watchPropsChange')
      this.$watch('propObject.name', 'watchPropsChange')
    },
    /**
     * 监听数据变化，你可以对数据处理后，设置值到data上
     * @param newV
     * @param oldV
     */
    watchPropsChange(newV, oldV) {
      console.info(`监听数据变化：`, newV, oldV)
      this.propSay = newV && newV.toUpperCase()
    }
  }
</script>
```

**3.computed 属性** `1050+`

我们在 `1050+` 版本新增了计算属性，详见[计算属性](./computed.md)。

```html
<script>
  export default {
    props: [
      'say',
      'propObject'
    ],
    computed:{
      obj(){
          return this.say.toUpperCase()
      }
    }
  }
</script>
```

## 属性校验 `1010+`

子组件声明属性时，可以指定校验规格。如果传入的数据不符合规格，devtool 会发出警告。当组件给其他开发者使用时，这将会很有用处。

校验方式包括必填项检查、类型检查和函数检查。验证顺序是 必填项检查 -> 类型检查 -> 函数检查，如有警告，仅报告最前置的检查项目。

类型检查支持的类型包括 [`String`、`Number`、`Boolean`、`Function`、`Object`、`Array`]。

如果需要设置验证规格，`props` 属性的写法必须要要写成 Object 形式，**不能**写成 Array 形式。

```html
<script>
  // 子组件
  export default {
    props: {
      prop1: Number, // 仅类型检查
      prop2Object: {
        type: String, // 类型检查
        required: true, // 必填项检查
        validator: function(value) {
          //函数检查
          // 这个值必须匹配下列字符串中的一个
          return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
      }
    },
    onInit() {
      console.info(`外部传递的数据：`, this.prop1, this.prop2Object)
    }
  }
</script>
```
