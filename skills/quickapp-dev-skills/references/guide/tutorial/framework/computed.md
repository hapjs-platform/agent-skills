# 计算属性 `1050+`

> 了解计算属性，学会如何使用计算属性

通过本节，你将学会：

- [计算属性的基本使用](#计算属性的基本使用)
- [设置计算属性 setter 函数](#设置计算属性setter函数)
- [计算属性的缓存](#计算属性的缓存)

## 计算属性的基本使用

我们经常会在模版内使用表达式，合理使用表达式可以提升我们的开发效率。但是在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<text> {{ message.split('').reverse().join('') }} </text>
```

在这个地方，模板不再是简单的声明式逻辑。如果我们在很多地方用上这样的表达式，有可能让模版的可读性降低，并且重复使用同一表达式逻辑会让代码变得冗余，不易维护。对此，我们可以使用计算属性：

```html
<div>
  <text>Original message: "{{ message }}"</text>
  <text>Comtextuted reversed message: "{{ reversedMessage }}"</text>
</div>
```

```js
export default {
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage() {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  },
  onReady() {
    console.log(this.reversedMessage) // olleH

    this.message = 'Goodbye'

    console.log(this.reversedMessage) // eybdooG
  }
}
```

这里我们声明了一个计算属性 `reversedMessage`。我们提供的函数将用作属性 `vm.reversedMessage` 的 getter 函数，这时 `vm.reversedMessage` 的值始终取决于 `vm.message` 的值。

你可以像绑定普通属性一样在模板中绑定计算属性。组件实例知道 `vm.reversedMessage` 依赖于 `vm.message`，因此当 `vm.message` 发生改变时，所有依赖 `vm.reversedMessage` 的绑定也会更新。

## 设置计算属性 `setter` 函数

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```js
export default {
  data: {
    firstName: 'Quick',
    lastName: 'App'
  },
  computed: {
    fullName: {
      get() {
        return `${this.firstName} ${this.lastName}`
      },
      set(value) {
        const names = value.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  onReady() {
    console.log(this.fullName) // Quick App
    this.fullName = 'John Doe'
    console.log(this.firstName) // John
    console.log(this.lastName) // Doe
  }
}
```

## 计算属性的缓存

你可能已经注意到我们可以通过在表达式中调用方法来达到同样的效果：

```html
<text>Reversed message: "{{ reversedMessage() }}"</text>
```

```js
// 在组件中
export default {
  data: {
    message: 'Hello'
  },
  reversedMessage () {
    return this.message.split('').reverse().join('')
  }
}
```

我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数。

这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```js
computed: {
  now () {
    return Date.now()
  }
}
```

相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

我们为什么需要缓存？假设我们有一个性能开销比较大的计算属性 A，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 A 。如果没有缓存，我们将不可避免的多次执行 A 的 getter！如果你不希望有缓存，请用方法来替代。

## 总结

合理使用计算属性可以简化我们的模版，并提升我们的开发效率，利用计算属性的缓存功能还能减少表达式的计算次数，提升应用性能。计算属性是框架中一个很好的特性，我们应该学会灵活使用。