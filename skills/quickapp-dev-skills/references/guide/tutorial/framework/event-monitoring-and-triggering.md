# 事件监听与触发

> 了解事件监听 API，如何触发 ViewModel 的事件、组件节点的事件

通过本节，你将学会，在当前页面中：

- [监听与移除监听事件：`$on()`、`$off`](#监听与移除监听事件)
- [触发`ViewModel`事件：`$emit()`](#触发ViewModel事件)
- [监听原生组件事件](#监听原生组件事件)
- [触发原生组件事件：`$emitElement()`](#触发原生组件事件)
- [使用原生组件的冒泡功能](#使用原生组件的冒泡功能)

注：本节描述的均为当前页面实例中的事件监听与触发，如需了解父子组件实例间事件监听与触发，可参见[组件](./parent-child-component-communication.md)。

## 监听与移除监听事件

`$on` 用于监听自定义事件；`$off`移除对应的事件监听

### $on(evtName, fnHandler)

在当前页面注册监听事件， 可监听当前页面中使用`$emit()`、 `$dispatch()`、 `$broadcast()`等触发的自定义事件，不能用于注册组件节点的事件响应

**示例如下：**

```javascript
export default {
  onInit() {
    this.$on('customEvtType1', this.customEvtType1Handler)
  },
  customEvtType1Handler(evt) {
    // 事件类型，事件参数
    console.info(
      `触发事件：类型：${evt.type}, 参数： ${JSON.stringify(evt.detail)}`
    )
  }
}
```

### $off(evtName, fnHandler)

移除事件监听，参数 `fnHandler` 为可选，传递仅移除指定的响应函数，不传递则移除此事件的所有监听

**示例如下：**

```javascript
export default {
  removeEventHandler() {
    // 不传递fnHandler：移除所有监听
    this.$off('customEvtType1')
    // 传递fnHandler：移除指定的监听函数
    this.$off('customEvtType1', this.customEvtType1Handler)
  }
}
```

## 触发`ViewModel`事件

页面的交互中可能会遇到一些非手动触发的需求，`$emit()` 通过触发当前实例上的事件达到动态触发事件的行为

### $emit(evtName, evtDetail)

触发当前实例监听事件函数，与 `$on()` 配合使用

**注意：**在当前实例中，`$emit()` 目前只触发 `$on` 所监听的事件

**示例如下：**

```javascript
export default {
  emitEvent() {
    this.$emit('customEvtType1', { params: '参数内容' })
  }
}
```

## 监听原生组件事件

原生组件支持一系列事件，如通用事件（如：click, disappear）、组件专有事件（如：focus）；

很多开发者希望能够在事件回调函数中，获取到当前触发事件的组件信息，并进行进一步的操作，那么办法有以下多种，如下代码所示：

1. 在响应函数执行时通过 target 获取，如：`onClickHandler`
2. 在响应函数绑定时传递参数，如：`onClickHandler2`

### 通用事件简写

如：onclick,onchange 可简写成 @click,@change

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <text id="elNode1" class="{{ elClassName + 1 }}" disabled="false" onclick="onClickHandler">组件节点1</text>
    <text id="elNode2" class="class-static-1 {{ elClassName + 2 }}" onclick="onClickHandler2('参数1', argName)">组件节点2</text>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
  }
</style>

<script>
  export default {
    private: {
      elClassName: 'class-dynamic',
      argName: '动态参数'
    },
    onClickHandler (evt) {
      // 事件类型，参数详情
      console.info(`触发事件：类型：${evt.type}, 详情： ${JSON.stringify(evt.detail)}`);

      if (evt.target) {
        console.info(`触发事件：节点：${evt.target.id}, ${evt.target.attr.disabled}`)
      }
    },
    onClickHandler2 (arg1, arg2, evt) {
      // 事件类型，事件参数，target
      console.info(`触发事件：类型：${evt.type}, 参数： ${arg1}, ${arg2}`);
    }
  }
</script>
```

## 触发原生组件事件

除了用户手动操作触发事件，响应回调之外；开发者可以在代码中通过`$emitElement()`完成事件的动态触发

### $emitElement(evtName, evtDetail, id)

可以触发指定组件 id 的事件，通过`evt.detail`获取传递的参数；该方法对自定义组件无效

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <text onclick="emitElement">触发组件节点的事件：click</text>
    <text id="elNode1" class="{{ elClassName + 1 }}" disabled="false" onclick="onClickHandler">组件节点1</text>
    <text id="elNode2" class="class-static-1 {{ elClassName + 2 }}" onclick="onClickHandler2('参数1', argName)">组件节点2</text>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
  }
</style>

<script>
  export default {
    private: {
      elClassName: 'class-dynamic',
      argName: '动态参数'
    },
    onClickHandler (evt) {
      // 事件类型，参数详情
      console.info(`触发事件：类型：${evt.type}, 详情： ${JSON.stringify(evt.detail)}`);

      if (evt.target) {
        console.info(`触发事件：节点：${evt.target.id}, ${evt.target.attr.disabled}`)
      }
    },
    onClickHandler2 (arg1, arg2, evt) {
      // 事件类型，事件参数，target
      console.info(`触发事件：类型：${evt.type}, 参数： ${arg1}, ${arg2}`);
    },
    emitElement () {
      // 注意：通过此类方式的事件不会携带target属性，开发者可以通过detail参数实现
      this.$emitElement('click', { params: '参数内容' }, 'elNode1')
    }
  }
</script>
```

## 使用原生组件的冒泡功能

我们在 `1040+` 版本对某些通用事件开放了冒泡功能，详见[通用事件](/widgets/common-events.md)。

在未支持冒泡功能之前，开发者仅可以使用 `target` 属性，指向事件触发的节点。

在已支持冒泡功能之后，开发者可以同时使用 `target` 与 `currentTarget`，具体的指向与web规范保持一致；前者指向事件目标节点，后者指向事件触发节点。

**为了兼容已经发布的快应用，以上更新，需要开发者在 `manifest.json` 中将 `minPlatformVersion` 设置为 `1040` 或以上，请开发者注意区别，做好后向兼容。**

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <div id="parentNode" class="outer" onclick="onParentClickHandler">
      <text class="inner" id="childNode1" onclick="onChildClickHandler">子组件1</text>
      <text class="inner" id="childNode2">子组件2</text>
    </div>
  </div>
</template>

<style>
  .outer {
    width: 750px;
    height: 500px;
    background-color: #eeeeee;
  }

  .inner {
    flex: 1;
    margin: 100px;
    background-color: skyblue;
  }
</style>

<script>
  export default {
    onParentClickHandler (evt) {
      // 事件类型
      console.info(`触发父组件事件：类型：${evt.type}`);
    },
    onChildClickHandler (evt) {
      // 事件类型
      console.info(`触发子组件事件：类型：${evt.type}`)
    }
  }
</script>
```

**打印结果**
```
触发子组件事件：类型：click

触发父组件事件：类型：click
```

事件分为捕获冒泡阶段，事件流的方向为 捕获 -> 冒泡 (父节点 -> 子节点 -> 父节点)，详细可查看[事件触发](https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow-bubbling).

通过上例，可以看出先触发子组件的click事件，冒泡触发父子件的click事件。

### 阻止事件冒泡

通过原生组件实现滑动的元素，开始滑动后，默认将阻止冒泡，例如`list/swiper/progress`等；

事件从里层往外层冒泡，采用`event.stopPropagation`阻止事件冒泡；

目前只有`touch`事件支持捕获冒泡，**其他不支持**，`touch`事件包含`touchstart`，`touchmove`，`touchcancel`，`touchend`，`click`，`longpress`

**示例代码:**
```html
<template>
  <div class="tutorial-page">
    <div id="parentNode" class="outer" onclick="onParentClickHandler">
      <text class="inner" id="childNode1" onclick="onChildClickHandler">子组件1</text>
      <text class="inner" id="childNode2">子组件2</text>
    </div>
  </div>
</template>

<style>
  .outer {
    width: 750px;
    height: 500px;
    background-color: #eeeeee;
  }

  .inner {
    flex: 1;
    margin: 100px;
    background-color: skyblue;
  }
</style>

<script>
  export default {
    onParentClickHandler (evt) {
      console.info(`触发父组件事件：类型：${evt.type}`);
    },
    onChildClickHandler (evt) {
      console.info(`触发子组件事件：类型：${evt.type}`)
      // 阻止事件冒泡
      evt.stopPropagation()
    }
  }
</script>
```

**打印结果**
```
触发子组件事件：类型：click
```
只触发子组件的click事件，并未触发父组件的click事件，阻止事件继续传播往上传播。

## 总结

掌握监听与触发事件能够更好的分离业务逻辑，减少方法响应上的耦合
