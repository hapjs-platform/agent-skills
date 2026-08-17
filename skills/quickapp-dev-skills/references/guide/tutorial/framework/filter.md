# 过滤器

在 hap-toolkit 0.4.0 之后，允许自定义过滤器，可用于文本格式化。

过滤器在双花括号中使用，以函数的形式在页面导出的对象中定义。使用过滤器时，应该添加到表达式的尾部，由管道符号指示。 和`vue` 过滤器类似，其形式如下：

```javascript
 {{ message | capitalize }}
```

在页面自定义一个过滤器 `capitalize`:

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
过滤器函数接收表达式的值作为第一个参数。在上述例子中，`capitalize` 过滤器函数将会收到 `message`的值作为第一个参数。

过滤器可以串联：

```javascript
{{ message | filterA | filterB }}
```

在这个例子中，`filterA` 被定义为接收单个参数的过滤器函数，表达式 `message` 的值将作为参数传入到函数中。然后继续调用同样被定义为接收单个参数的过滤器函数 `filterB`，将 `filterA` 的结果传递到 `filterB` 中。

过滤器可以接收参数：

```javascript
{{ message | filterA('arg1', arg2) }}
```

这里，`filterA` 被定义为接收三个参数的过滤器函数。其中 `message` 的值作为第一个参数，普通字符串 `'arg1'` 作为第二个参数，表达式 `arg2` 的值作为第三个参数。

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