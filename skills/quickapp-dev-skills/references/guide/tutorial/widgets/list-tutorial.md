# 使用 list

> 了解如何正确使用 list，优化列表渲染性能，灵活实现需求

通过本节，你将学会：

- [适用场景](#适用场景)
- [性能优化](#性能优化)
- [效果展示：吸顶](#效果展示：吸顶)

## 适用场景

### 简单场景

开发者在页面中实现`长列表`或者`屏幕滚动`等效果时，习惯使用`div组件`做循环遍历

**示例如下：**

假设开发者要这样的效果：一个结构简单的商品列表

使用 div 组件的代码如下：

```html
<template>
  <!-- div实现 -->
  <div class="tutorial-page">
    <!-- 商品列表 -->
    <block for="productList">
      <div class="content-item" onclick="route($item.url)">
        <image class="img" src="{{$item.img}}"></image>
        <div class="text-wrap">
          <div class="top-line">
            <text class="text-name">{{$item.name}}</text>
            <text class="text-price">{{$item.price}}</text>
          </div>
          <text class="bottom-line">{{$item.brief}}</text>
        </div>
      </div>
    </block>

    <!-- 加载更多，监听通用事件appear，出现时加载更多数据 -->
    <div class="load-more" onappear="loadMoreData">
      <progress type="circular"></progress>
      <text>加载更多</text>
    </div>
  </div>
</template>
```

然而，当 DOM 结构复杂时，滚动页面会出现卡顿现象，因为 Native 无法复用 div 组件实现的列表元素

为了得到流畅的列表滚动体验，**推荐**开发者使用`list组件`替代`div组件`实现长列表布局，因为 Native 会复用相同`type属性`的`list-item`

使用 list 组件的代码如下：

```html
<template>
  <!-- 列表实现 -->
  <list class="tutorial-page" onscrollbottom="loadMoreData">
    <!-- 商品列表 -->
    <block for="productList">
      <list-item type="product" class="content-item" onclick="route($item.url)">
        <image class="img" src="{{$item.img}}"></image>
        <div class="text-wrap">
          <div class="top-line">
            <text class="text-name">{{$item.name}}</text>
            <text class="text-price">{{$item.price}}</text>
          </div>
          <text class="bottom-line">{{$item.brief}}</text>
        </div>
      </list-item>
    </block>

    <!-- 加载更多，type属性自定义命名为loadMore -->
    <list-item type="loadMore" class="load-more">
      <progress type="circular"></progress>
      <text>加载更多</text>
    </list-item>
  </list>
</template>
```

要实现 DOM 片段的复用，要求相同`type属性`的 DOM 结构完全相同。所以，**设置相同`type属性`的`list-item`是优化列表滚动性能的关键**

**注意：**

- `list-item`内不能再嵌套`list`
- `list-item`的`type属性`为必填属性
- `list-item`内部需谨慎使用`if指令`或`for指令`，因为相同`type属性`的`list-item`的 DOM 结构必须完全相同，而使用`if指令`或`for指令`会造成 DOM 结构差异

**提示：**

若遇到类似**xxx cannot be cast to xxx at ...list**的错误，请检查`list-item组件`是否存在如下情形：

- 未设置`type属性`。解决方案：设置`type属性`
- 内部使用了`if指令`。解决方案：使用`show指令`代替`if指令`，或设置不同的`type属性`
- 设置为相同的`type属性`，但 DOM 结构不一致。解决方案：设置不同的`type属性`

### 复杂场景

实现简单的商品列表，了解`list组件`的基本用法和优化性能的关键后，接下来通过实现多种列表元素类型的复杂列表，进一步了解`list组件`

**示例如下：**

假设开发者要实现这样的效果：一个商品列表页，图片位于左边和图片位于右边的商品交错显示

列表中的列表元素可以分为三类，设置三种不同`type属性`的`list-item`。分别为：

- 图片在左，文字在右的`list-item`，`type属性`自定义命名为`productLeft`
- 图片在右，文字在左的`list-item`，`type属性`自定义命名为`productRight`
- 加载更多的`list-item`，`type属性`自定义命名为`loadMore`

示例代码如下：

```html
<template>
  <!-- list中可以划分为三种类型的DOM结构，对应三种type属性的list-item -->
  <list class="tutorial-page" onscrollbottom="loadMoreData">
    <block for="{{productList}}">
      <!-- 图片在左，文字在右的list-item，type属性自定义命名为productLeft -->
      <list-item type="productLeft" class="content-item" if="{{$idx%2 === 0}}" onclick="route($item.url)">
        <image class="img" src="{{$item.img}}"></image>
        <div class="text-wrap">
          <div class="top-line">
            <text class="text-name">{{$item.name}}</text>
            <text class="text-price">{{$item.price}}</text>
          </div>
          <text class="bottom-line">{{$item.brief}}</text>
        </div>
      </list-item>

      <!-- 图片在右，文字在左的list-item，type属性自定义命名为productRight -->
      <list-item type="productRight" class="content-item" if="{{$idx%2 === 1}}" onclick="route($item.url)">
        <div class="text-wrap">
          <div class="top-line">
            <text class="text-name">{{$item.name}}</text>
            <text class="text-price">{{$item.price}}</text>
          </div>
          <text class="bottom-line">{{$item.brief}}</text>
        </div>
        <image class="img" src="{{$item.img}}"></image>
      </list-item>
    </block>

    <!-- 加载更多的list-item，type属性自定义命名为loadMore -->
    <list-item type="loadMore" class="load-more">
      <progress type="circular"></progress>
      <text>加载更多</text>
    </list-item>
  </list>
</template>
```

## 性能优化

当 DOM 结构复杂时，为了得到流畅的列表滚动体验，`list组件`的性能优化必不可缺

`list组件`的性能优化分为`精简DOM层级`、`复用list-item`、`细粒度划分list-item`、`关闭scrollpage`四个方面

其中，`精简DOM层级`、`复用list-item`是使用`list组件`必须遵循的优化原则，`细粒度划分list-item`、`关闭scrollpage`适用于部分场景，详见下文

### 精简 DOM 层级

精简 DOM 层级，即减少 DOM 树的级数和分支上的 DOM 节点数。层级越少、数量越少，布局和绘制就会越快

因此，开发者需要尽量剔除 list 中无意义的包裹类标签和层级

### 复用 list-item

复用`list-item`，即列表中相同的 DOM 结构设置为同一`type属性`的`list-item`，这是优化列表滚动体验的关键

### 细粒度划分 list-item

细粒度划分`list-item`，即列表中相同的 DOM 结构划分为尽可能小的列表元素（即`list-item`）

**示例如下：**

假设开发者要实现这样的效果：商品按类别分类，展示多种类别

从业务角度，可按类别划分为不同`type属性`的`list-item`

然而，当`list-item`复杂时，会出现卡顿现象。**推荐**抛开业务逻辑，划分为尽可能小的列表元素

示例代码如下：

```html
<template>
  <list class="tutorial-page" onscrollbottom="loadMoreData">
    <!-- 细粒度划分list-item -->
    <block for="productList">
      <!-- title -->
      <list-item type="title" if="$item.title" class="title {{$idx>0?'margin-top':''}}">
        <text>{{$item.title}}</text>
      </list-item>
      <!-- banner -->
      <list-item type="banner" if="$item.bannerImg" class="banner">
        <image src="{{$item.bannerImg}}"></image>
      </list-item>
      <!-- productMini -->
      <list-item type="{{'productMini'+$item.productMini.length}}" if="$item.productMini" class="product-mini-wrap">
        <!-- 在当前list-item中使用了for指令，因此需要动态设置list-item的type属性。确保相同type属性的list-item的DOM结构完全一致 -->
        <div for="value in $item.productMini" class="product-mini">
          <image src="{{value.img}}" class="product-mini-img"></image>
          <text>{{value.name}}</text>
          <text class="product-mini-brief">{{value.brief}}</text>
          <text class="product-mini-price">{{value.price}}</text>
        </div>
      </list-item>
      <!-- textHint -->
      <list-item type="textHint" if="$item.textHint" class="text-hint">
        <text>{{$item.textHint}} ></text>
      </list-item>
    </block>
    <!-- list底部的加载更多 -->
    <list-item type="loadMore" class="load-more">
      <progress type="circular"></progress>
      <text>加载更多</text>
    </list-item>
  </list>
</template>
```

### 关闭 scrollpage

`list组件`支持属性`scrollpage`，默认关闭，标志是否将顶部页面中非`list`的元素随`list`一起滚动。开启`scrollpage`会降低`list`渲染性能

因此，在开发者开启`scrollpage`前，**推荐**先尝试将顶部页面中非`list`的元素，作为一种或多种`type属性`的`list-item`，移入`list`中，从而达到关闭`scrollpage`提高渲染性能的目的

**示例如下：**

假设开发者要实现这样的效果：顶部 banner，banner 下方为常见列表，需要整屏滚动

开发者一般会将页面划分为 banner 和 list 两部分，然后开启`list`的`scrollpage`属性，实现整屏滚动

然而，开启`scrollpage`会降低`list`渲染性能，**推荐**将顶部 banner 作为一种特殊`type属性`的`list-item`，移入`list`中，关闭`scrollpage`

示例代码如下：

```html
<template>
  <!-- 列表实现，监听列表的scrollbottom事件，列表滚动到底部时加载更多数据 -->
  <list class="tutorial-page" onscrollbottom="loadMoreData">
    <list-item type="banner" class="banner">
      <image src="../../Common/img/demo_large.png"></image>
    </list-item>

    <!-- 商品列表 -->
    <block for="productList">
      <list-item type="product" class="content-item" onclick="route($item.url)">
        <image class="img" src="{{$item.img}}"></image>
        <div class="text-wrap">
          <div class="top-line">
            <text class="text-name">{{$item.name}}</text>
            <text class="text-price">{{$item.price}}</text>
          </div>
          <text class="bottom-line">{{$item.brief}}</text>
        </div>
      </list-item>
    </block>

    <!-- list-item实现的加载更多，type属性自定义命名为loadMore -->
    <list-item type="loadMore" class="load-more">
      <progress type="circular"></progress>
      <text>加载更多</text>
    </list-item>
  </list>
</template>
```

### list-item 懒加载

懒加载，简称`lazyload`，本质上是按需加载

在传统的页面中，常用`lazyload`优化网页的性能：

- 实现：不加载全部页面资源，当资源即将呈现在浏览器`可视区域`时，再加载资源
- 优点：加快渲染的同时避免流量浪费

在框架中，开发者也可使用`lazyload`概念优化列表的渲染：

- 实现：提前 fetch 请求足够的列表数据保存在内存变量`memList`中，当`list`滚动到底部时，从`memList`中提取部分数据来渲染`list-item`。当`memList`中数据不足时，提前 fetch 请求数据，填充`memList`
- 优点：每次网络请求与页面渲染的数据量不一致，减少首屏渲染占用的 JS 执行时间，减少渲染后续`list-item`的等待时间

**示例如下：**

假设开发者要实现这样的效果：一个商品列表，每次渲染 10 个商品

- 渲染首屏时，请求数据保存在内存变量`memList`中，从`memList`中提取部分数据渲染列表
- 加载更多时，首先检查`memList`中是否有足够数据，有则直接从`memList`中提取部分数据渲染，而不是直接进行网络请求，减少时间消耗。当`memList`中数据不足时，提前请求数据

示例代码如下：

```html
<template>
  <!-- 列表实现，监听列表的scrollbottom事件，列表滚动到底部时加载更多数据 -->
  <list class="tutorial-page" onscrollbottom="renderMoreListItem">
    <!-- 商品列表 -->
    <block for="productList">
      <list-item type="product" class="content-item">
        <image class="img" src="{{$item.img}}"></image>
        <div class="text-wrap">
          <div class="top-line">
            <text class="text-name">{{$item.name}}</text>
            <text class="text-price">{{$item.price}}</text>
          </div>
          <text class="bottom-line">{{$item.brief}}</text>
        </div>
      </list-item>
    </block>

    <list-item type="loadStatus" class="load-status">
      <progress type="circular" show="{{hasMoreData}}"></progress>
      <text show="{{hasMoreData}}">加载更多</text>
      <text show="{{!hasMoreData}}">没有更多了~</text>
    </list-item>
  </list>
</template>

<script>
  import {dataComponentListLazyload} from '../../Common/js/data'

  // 模拟fetch请求数据
  function callFetch (callback) {
    setTimeout(function () {
      callback(dataComponentListLazyload)
    }, 500)
  }

  // 内存中存储的列表数据
  let memList = []

  export default {
    private: {
      productList: [],
      hasMoreData: true,
      // 每次渲染的商品数
      size: 10,
      // 是否正在fetch请求数据
      isLoadingData: false
    },
    onInit () {
      this.$page.setTitleBar({ text: 'list-item懒加载' })
      // 获取数据并渲染列表
      this.loadAndRender()
    },
    /**
     * 请求并渲染
     */
    loadAndRender (doRender = true) {
      this.isLoadingData = true
      // 重新请求数据并根据模式判断是否需要渲染列表
      callFetch(function (resList) {
        this.isLoadingData = false
        if (!resList) {
          console.error(`数据请求错误`)
        }
        else if (!resList.length) {
          this.hasMoreData = false
        }
        else {
          memList = memList.concat(resList)
          if (doRender) {
            this._renderList()
          }
        }
      }.bind(this))
    },
    _renderList () {
      // 渲染列表
      if (memList.length > 0) {
        const list = memList.splice(0, this.size)
        this.productList = this.productList.concat(list)
      }
      if (memList.length <= this.size) {
        // 提前请求新的数据
        this.loadAndRender(false)
      }
    },
    /**
     * 滑动到底部时加载更多
     */
    renderMoreListItem () {
      if (!this.isLoadingData) {
        this._renderList()
      }
    }
  }
</script>
```

**注意：**避免在`ViewModel`的数据属性中定义`memList`。因为在`ViewModel`的数据属性中定义变量会触发`set/get数据驱动定义`，而`memList`作为暂时保存数据的变量，不需监听数据变化

## 效果展示：吸顶

本部分非必读，旨在为有以下需求之一的开发者提供参考：

- 需要判断页面滚动位置
- 需要了解`appear事件`和`disappear事件`

### 传统页面的实现思路

`吸顶`是传统 web 页面中的一种比较老的交互方式：

- `吸顶元素`的初始位置一般靠近页面顶部，但与顶部有一定的距离
- 当手指向上滑动超过`吸顶元素`的初始位置时，把`吸顶元素`固定在顶部
- 当手指向下滑动到达`吸顶元素`的初始位置时，取消`吸顶元素`在顶部的固定

`吸顶`在传统 web 页面中的实现思路是监听`scroll事件`，当页面滚动到一定位置时，做一些事情来改变`吸顶元素`在窗口中的位置

### 框架的实现思路

然而，与传统 web 页面不同，在框架中，`scroll事件`仅适用于`list组件`，且获取的值是滚动的相对坐标值，在使用时，需要通过累加来获取当前滚动位置的绝对坐标

此外，`scroll事件`在列表滚动时会被高频触发，存在潜在性能问题

因此，在框架中，**推荐**开发者使用`appear事件`和`disappear事件`来实现`吸顶`效果，`appear事件`在组件出现时触发，`disappear事件`在组件消失时触发

`appear事件`和`disappear事件`是组件的通用事件，文档中标有支持通用事件的组件都支持这两个事件，包括`div组件`、`list-item组件`等

灵活使用`appear事件`和`disappear事件`，能实现大部分需要判断滚动位置的需求

### 框架的具体实现与代码

接下来，对应在`list组件`中实现`吸顶`效果的示例代码，具体分析实现思路

首先，了解`顶部元素`和`吸顶元素`：

- 列表中的`顶部元素`：`type属性`为`top`的`list-item`
- 列表中的`吸顶元素`：`type属性`为`ceiling`的`list-item`

然后，分析`吸顶`效果实现方案：

- 使用`stack组件`做为整个页面的容器，`stack组件`的特性为：每个直接子组件按照先后顺序依次堆叠，覆盖前一个子组件
- 在`stack组件`中增加一个排在最后的子组件，作为`mask`遮挡之前的子组件，显示效果为一直固定在顶部，这个`mask`与`吸顶元素`渲染效果完全一致
- 当`吸顶元素`需要`吸顶`时，显示对应的`mask`，实现吸顶的效果；当`吸顶元素`不需要`吸顶`时，隐藏对应的`mask`

最后，判断`吸顶`条件：

- 当页面向下滚动到`顶部元素`消失在视野时，`吸顶元素`需要固定在顶部，因此，监听`顶部元素`的`disappear事件`，显示`mask`
- 当页面向上滚动到`顶部元素`出现在视野时，`吸顶元素`需要取消固定，因此，监听`顶部元素`的`appear事件`，隐藏`mask`

示例代码如下：

```html
<template>
  <!-- 利用stack组件，使"列表中的吸顶元素对应的Mask"覆盖列表 -->
  <stack class="tutorial-page">
    <list class="list">
      <!-- 通过监听"列表中的顶部元素"的元素的appear和disappear事件，控制"列表中的吸顶元素对应的Mask"的显示 -->
      <list-item type="top" ondisappear="showMask" onappear="hideMask">
        <div class="height-300 bg-blue">
          <text>列表中的顶部元素</text>
        </div>
      </list-item>
      <!-- 列表中的吸顶元素 -->
      <list-item type="ceiling">
        <div class="height-300 bg-red">
          <text>列表中的吸顶元素</text>
        </div>
      </list-item>
      <!-- 普通列表元素 -->
      <list-item for="list" type="common" class="list-item">
        <text class="text">{{$item}}</text>
      </list-item>
    </list>

    <!-- 列表中的吸顶元素对应的Mask -->
    <div show="{{maskShow}}">
      <div class="height-300 bg-red">
        <text>列表中的吸顶元素</text>
      </div>
    </div>
  </stack>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
    .list {
      width: 750px;
      flex-grow: 1;
      .list-item {
        height: 150px;
        border-bottom-width: 1px;
        border-bottom-color: #0faeff;
        .text {
          flex: 1;
          text-align: center;
        }
      }
    }
    .height-300 {
      height: 300px;
    }
    .bg-red {
      flex-grow: 1;
      justify-content: center;
      background-color: #f76160;
    }
    .bg-blue {
      flex-grow: 1;
      justify-content: center;
      background-color: #0faeff;
    }
  }
</style>

<script>
  export default {
    private: {
      maskShow: false,
      appearCount: 0,
      list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    },
    onInit(){
      this.$page.setTitleBar({ text: '效果展示：吸顶' })
    },
    showMask () {
      this.maskShow = true
    },
    hideMask () {
      // 加载页面时，所有元素的appear事件都会被触发一次。因此，需要过滤第一次的appear事件
      if (this.appearCount) {
        this.maskShow = false
      } else {
        ++this.appearCount
      }
    }
  }
</script>
```

## 总结

了解 list 组件的特点，可以更好的提升页面性能，避免后期开发过程中引起的性能问题
