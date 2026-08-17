# 自定义指令 `1100+`

> 在快应用中，有些情况下我们需要对 DOM 元素进行访问，或者在元素创建、更新、销毁过程中处理相应的业务逻辑，此时可以使用自定义指令。

通过本节，你将学会：

- [定义全局、页面、组件自定义指令](#定义全局、页面、组件自定义指令)
- [自定义指令钩子函数和回调参数](#自定义指令钩子函数和回调参数)
- [组件上使用自定义指令](#组件上使用自定义指令)
- [自定义指令注意事项](#自定义指令注意事项)

注意：使用 自定义指令 需要引擎版本>=1100 且 hap-toolkit 版本>=1.9.5。

## 定义全局、页面、组件自定义指令

快应用支持全局、页面、组件级别的自定义指令。页面、组件会继承全局指令，组件不会继承父页面和父组件的指令。**如果全局和页面、组件中都定义了同名的指令，页面、组件的指令会覆盖全局指令**。

### 全局指令定义

当我们需要在多个页面或组件中使用某个自定义指令时，可以在 `app.ux` 中定义 `directives` 对象，`directives` 对象中可以定义多个自定义指令。定义后，在该应用下的所有页面、组件中，都可以使用这个指令。

示例如下：

```html
<script>
  export default {
    directives: {
      focus: {
        mounted(el) {
          // 获取到el对象，在原生插入到父节点后执行focus方法获得焦点
          el.focus()
        }
      },
      // ...其他全局指令定义
    }
  }
</script>
```

上面的例子，我们在 `app.ux` 中定义了一个全局 focus 的指令。在页面或组件中，只需要在元素上增加 `dir:focus`（`dir:` 为自定义指令固定前缀，`focus` 为全局中定义的指令名称）就能应用该指令，当页面加载后， `input` 元素将会自动获得焦点。示例如下：

```html
<template>
  <div>
    <input dir:focus></input>
  </div>
</template>
```

### 页面、组件指令定义

页面、组件的指令定义和全局定义方式一致，同样是增加 `directives` 对象进行自定义指令定义。示例如下：

```html
<template>
  <div>
    <text dir:textmounted="{{ message }}">message: "{{ message }}"</text>
  </div>
</template>

<script>
  export default {
    directives: {
      textmounted: {
        mounted(el, binding) {
          console.log(el) // text的DOM对象
          console.log(binding) // text绑定的指令信息：{name: "textmounted", data: "Hello"}
        }
      }
    },
    data: {
      message: 'Hello'
    }
  }
</script>
```

## 组件上使用自定义指令

自定义指令在组件中使用和正常的元素一致，示例如下：

```html
<import name="sub-component" src="./sub-component.ux"></import>

<template>
  <div>
    <component dir:report="{{ pageName }}" is="{{ dynamicComponent }}"></component>
    <sub-component dir:report="{{ pageName }}"></sub-component>
  </div>
</template>

<script>
  export default {
    directives: {
      report: {
        mounted(el, binding) {
          // 页面指令实现逻辑
        }
      }
    },
    data: {
      pageName: '页面',
      dynamicComponent: 'sub-component'
    }
  }
</script>
```

子组件：

```html
<template>
  <div dir:subReport="{{ pageName }}">
    <text>子组件</text>
  </div>
</template>

<script>
export default {
  directives: {
    subReport: {
      mounted(el, binding) {
        // 子组件指令实现逻辑
      }
    }
  },
  data: {
    pageName: '子组件'
  }
}
</script>
```

## 指令钩子函数

自定义指令定义对象可以提供如下的钩子函数（均为可选）：

| 钩子函数名称 | 类型     | 说明                                                                                                                                           |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| mounted      | Function | 所在元素创建并且插入父节点之后调用                                                                                                             |
| update       | Function | 所在元素更新时调用。如果元素同时更新了 N 个次（如同时更新了元素的 N 个属性、或 N 个样式），会调用 N 次，并且每次回调参数中都会有相应的更新信息 |
| destroy      | Function | 所在元素销毁后调用                                                                                                                             |

## 指令回调参数

### mounted 钩子回调参数

| 参数值  | 类型       | 说明                                                                                     |
| ------- | ---------- | ---------------------------------------------------------------------------------------- |
| el      | DomElement | 指令所在元素 DOM 对象，可以执行元素的原生方法或绑定[通用事件](/widgets/common-events.md) |
| binding | Object     | 自定义指令 binding 信息                                                                  |

**mounted binding 参数说明：**
| 参数值 | 类型 | 说明 |
| -------- | -- | -- |
| name | string | 指令名，指令名称会被转成小写，如：`inputFocus`指令会返回`inputfocus` |
| data | any | 指令的绑定值，例如：`dir:report="{{1 + 1}}"` 中，绑定值为 `2` |

**例子：**

```html
<template>
  <div>
    <text dir:report="{{ name }}">用户名称: {{ name }}</text>
  </div>
</template>

<script>
  export default {
    directives: {
      report: {
        mounted(el, binding) {
          console.log(el) // text的DOM对象
          console.log(binding) // text绑定的指令信息：{name: "report", data: "小白"}
        }
      }
    },
    data: {
      name: '小白'
    }
  }
</script>
```

### update 钩子回调参数

| 参数值  | 类型       | 说明                                                                                     |
| ------- | ---------- | ---------------------------------------------------------------------------------------- |
| el      | DomElement | 指令所在元素 DOM 对象，可以执行元素的原生方法或绑定[通用事件](/widgets/common-events.md) |
| binding | Object     | 自定义指令 binding 信息                                                                  |

**update binding 参数说明：**
| 参数值 | 类型 | 说明 |
| -------- | -- | -- |
| name | string | 指令名，指令名称会被转成小写，如：`inputFocus`指令会返回`inputfocus` |
| data | any | 指令的绑定值，例如：`dir:report="{{1 + 1}}"` 中，绑定值为 `2` |
| type | string | 元素更新类型： `attr/style` |
| key | string | 元素更新内容的 key，如更新的属性名称 `name`，或 更新样式名称 `borderBottom` |
| newValue | any | 元素更新后的值 |
| oldValue | any | 元素更新前的值 |

**例子：**

```html
<template>
  <div>
    <text dir:report="{{ name }}" id="{{ id }}" style="font-size: {{size}}">用户名称: {{ name }}</text>
  </div>
</template>

<script>
  export default {
    directives: {
      report: {
        update(el, binding) {
          console.log(binding)
        }
      }
    },
    data: {
      id: 'user',
      name: '',
      size: '30px'
    },
    onReady() {
      this.id = 'user1'
      this.name = '小白'
      this.size = '40px'
    }
  }
</script>
```

如上例子，由于我们手动更新了 text 节点的 id、样式和 text 的 value 属性（value 属性是控制 text 标签内容区的属性）。所以 update 钩子函数会触发三次，分别得到如下的三个 binding 对象：

**id 更新 binding 对象：**

```json
{
  "name": "report",
  "data": "小白",
  "key": "id",
  "type": "attr",
  "newValue": "user1",
  "oldValue": "user"
}
```

**value 更新 binding 对象：**

```json
{
  "name": "report",
  "data": "小白",
  "key": "value",
  "type": "attr",
  "newValue": "用户名称: 小白",
  "oldValue": "用户名称: "
}
```

**style 更新 binding 对象：**

```json
{
  "name": "report",
  "data": "小白",
  "key": "fontSize",
  "type": "style",
  "newValue": "40px",
  "oldValue": "30px"
}
```

### destroy 钩子回调参数

**destroy 钩子在绑定元素销毁后调用，所以回调参数中无法得到元素的 dom 对象，也无法取得指令的 binding 信息。**

**例子：**

```html
<template>
  <div>
    <text if="{{ show }}" dir:report="{{ name }}">用户名称: {{ name }}</text>
  </div>
</template>

<script>
  export default {
    directives: {
      report: {
        destroy() {
          console.log('text节点销毁了')
        }
      }
    },
    data: {
      show: true,
      name: '小白'
    },
    onReady() {
      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  }
</script>
```

## 自定义指令注意事项

**子组件的根节点使用指令时，不要与父组件引入组件标志位上使用同名的自定义指令。**

下面是错误使用例子：

父组件中引入了 `sub-component` 组件，并在组件上使用了父组件中定义的 report 指令。同时子组件的根节点使用了子组件中定义的 report 指令。由于自定义组件标志位上的自定义指令和属性信息，最终都会传递到组件根节点上，所以指令名称重复，会导致快应用无法区分指令触发的环境是父组件还是子组件。

```html
<!-- 父组件引入子组件 -->
<import name="sub-component" src="./sub.ux"></import>

<template>
  <sub-component dir:report="{{ data }}"></sub-component>
</template>

<script>
export default {
  directives: {
    report: {
      mounted(el, binding) {
        console.log('父组件定义的report指令')
      }
    }
  }
}
</script>

<!-- 子组件 -->
<template>
  <div dir:report="{{ data }}">
    <text>子组件</text>
  </div>
</template>

<script>
export default {
  directives: {
    report: {
      mounted(el, binding) {
        console.log('子组件定义的report指令')
      }
    }
  }
}
</script>
```
