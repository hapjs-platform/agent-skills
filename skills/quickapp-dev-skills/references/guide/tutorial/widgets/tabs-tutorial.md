# 使用 tabs

> 了解如何使用 tabs 组件完成选项卡页签的布局，灵活组合组件，配置属性，优化性能

通过本节，你将学会：

- [div 组件模拟选项卡](#div-组件模拟选项卡)
- [使用 tabs 组件](#使用-tabs-组件)
- [页签内容使用自定义子组件](页签内容使用自定义子组件)
- [页签内容懒加载](#页签内容懒加载)
- [tabs 仅包含 tab-content](#tabs-仅包含-tab-content)

## div 组件模拟选项卡

`选项卡`效果常见于传统 H5 开发中，开发者一般使用`div和js代码`控制布局交互得以实现

在框架中，开发者也可以使用`div组件`实现简单的效果，示例代码如下：

```html
<template>
  <div class="tutorial-page">
    <!-- div组件模拟选项卡功能 -->
    <div class="div-tabs">
      <!-- tabs的head部分 -->
      <div class="div-tabbar">
        <text onclick="showContent(1)">menu1</text>
        <text onclick="showContent(2)">menu2</text>
        <text onclick="showContent(3)">menu3</text>
      </div>
      <!-- tabs的body部分 -->
      <div class="div-tabcontent">
        <div class="div-tabcontent-section" show="{{type === 'content_1'}}">
          <text>content1</text>
        </div>
        <div class="div-tabcontent-section" show="{{type === 'content_2'}}">
          <text>content2</text>
        </div>
        <div class="div-tabcontent-section" show="{{type === 'content_3'}}">
          <text>content3</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex: 1;
    flex-direction: column;
    .div-tabs {
      flex: 1;
      flex-direction: column;
      .div-tabbar {
        height: 100px;
        text {
          margin: 10px;
          flex-grow: 1;
          text-align: center;
          border: 1px solid #eeeeee;
        }
      }
      .div-tabcontent {
        flex: 1;
        background-color: #eeeeee;
        .div-tabcontent-section {
          flex: 1;
          justify-content: center;
          margin: 10px;
          background-color: #ffffff;
          text {
            color: #FF0000;
            text-align: center;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    private: {
      type: 'content_1'
    },
    onInit () {
      this.$page.setTitleBar({ text: 'div组件模拟选项卡' })
    },
    showContent (num) {
      this.type =  'content_' + num
    }
  }
</script>
```

使用`div组件`实现的`选项卡`效果，功能还是有限，为了带来最佳用户体验，建议使用框架提供的`tabs组件`完成需求

## 使用 tabs 组件

`tabs`中封装了常见功能和效果：页签支持横向滚动，支持手势滑动切换内容页等

`tabs`内部仅支持子组件`tab-bar`和`tab-content`，也可以只包含一个子组件，使用说明如下：

- `tab-bar组件`用来包含所有页签的标题，属性`mode`用来配置是否可滚动，详情请参考文档：`组件 -> 容器组件 -> tab-bar`
- `tab-content组件`用来包含所有页签的内容，详情请参考文档：`组件 -> 容器组件 -> tab-content`
- `tab-bar组件`的第 n 个直接子节点对应`tab-content`中第 n 个直接子节点，具有联动效果

示例代码如下：

```html
<template>
  <div class="tutorial-page">
    <!-- tabs组件 -->
    <tabs>
      <tab-bar class="tab-bar">
        <text>menu1</text>
        <text>menu2</text>
        <text>menu3</text>
      </tab-bar>
      <tab-content class="tab-content">
        <div class="tab-content-section">
          <text>content1</text>
        </div>
        <div class="tab-content-section">
          <text>content2</text>
        </div>
        <div class="tab-content-section">
          <text>content3</text>
        </div>
      </tab-content>
    </tabs>
  </div>
</template>
```

注意：

- `tabs`内不能再嵌套`tabs`，如有此类需求，请参考教程第一部分`div组件模拟选项卡`

## 页签内容使用自定义子组件

为了更好的组织页面代码，提升代码可维护性。开发者可以将页签内容通过`自定义子组件`来渲染

关于如何开发子组件详见[父子组件通信](../framework/parent-child-component-communication.md)，本小节仅做简单引入使用

示例代码如下：

```html
<import name="tab-content-item" src="./tabitem"></import>
<template>
  <!-- tabs组件 -->
  <div class="tutorial-page">
    <tabs onchange="onChangeTabIndex">
      <tab-bar class="tab-bar">
        <text>menu1</text>
        <text>menu2</text>
        <text>menu3</text>
      </tab-bar>
      <tab-content class="tab-content">
        <tab-content-item index="0" itemdata="{{list[0]}}" current-index="{{currentIndex}}"></tab-content-item>
        <tab-content-item index="1" itemdata="{{list[1]}}" current-index="{{currentIndex}}"></tab-content-item>
        <tab-content-item index="2" itemdata="{{list[2]}}" current-index="{{currentIndex}}"></tab-content-item>
      </tab-content>
    </tabs>
  </div>
</template>

<style>
  .tutorial-page {
    flex: 1;
    flex-direction: column;
  }
  .tab-bar {
    height: 100px;
    border: 0px solid #eeeeee;
    border-bottom-width: 1px;
  }
  .tab-bar text {
    flex-grow: 1;
    text-align: center;
    margin: 10px;
  }
  .tab-content {
    flex: 1;
    background-color: #eeeeee;
  }
</style>

<script>
  export default {
    private: {
      list: [
        {title: 'content1'},
        {title: 'content2'},
        {title: 'content3'}
      ],
      currentIndex: 0
    },
    onInit () {
      this.$page.setTitleBar({ text: '页签内容使用自定义子组件' })
    },
    onChangeTabIndex (evt) {
      this.currentIndex = evt.index
    }
  }
</script>
```

在`tabitem.ux`文件中：

```html
<template>
  <div class="tab-section">
    <text>{{itemdata.title}}</text>
  </div>
</template>

<style>
  .tab-section {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    margin: 10px;
  }
  .tab-section text {
    color: #FF0000;
    text-align: center;
  }
</style>

<script>
  export default {
    props: [
      'index',
      'itemdata',
      // 驼峰式在赋值时使用-连接
      'currentIndex'
    ],
    onInit () {
      // 监听属性变化
      this.$watch('currentIndex', 'watchCurrentIndex')
    },
    /**
     * 监听用户选择的索引，选中当前时触发业务逻辑
     * @param newValue
     * @param oldValue
     */
    watchCurrentIndex (newValue, oldValue) {
      if (parseInt(this.index) === this.currentIndex) {
        console.info(`当前用户选择了这个标签：${this.index}, ${newValue}, ${oldValue}`)
      }
    }
  }
</script>
```

## 页签内容懒加载

一个内容丰富的`选项卡`，通常会包含许多页签内容。如新闻类应用中，可能会包括：推荐、热点、视频、段子、汽车、社会、娱乐等

直接使用`tabs`默认会加载所有页签内容，导致 JS 线程持续忙于渲染每个页签，无法响应用户点击事件等，造成体验困扰

为了解决这类问题，开发者可以让页签内容在用户点击时延迟渲染（而不是整个页面初始化时渲染），这项功能可以通过`if指令`完成

示例代码如下：

```html
<template>
  <div class="tutorial-page">
    <tabs onchange="onChangeTabIndex">
      <tab-bar class="tab-bar" mode="scrollable">
        <text for="{{tabHeadList}}" class="{{currentIndex === $idx ? 'active' : ''}}">{{$item.title}}</text>
      </tab-bar>
      <tab-content class="tab-content">
        <div class="tab-content-section" for="{{tabHeadList}}">
          <!-- 初始化时，if为false，默认不渲染；页签被首次点击时，对应页签内容的if由false改为true -->
          <text if="{{$item.render}}">{{$item.title}}</text>
        </div>
      </tab-content>
    </tabs>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tab-bar text{
      padding: 0 25px;
      text-align: center;
      font-size: 34px;
    }
    .tab-bar .active {
      color: #FF0000;
    }
    .tab-content {
      flex: 1;
      background-color: #eeeeee;
      .tab-content-section {
        flex: 1;
        margin: 10px;
        background-color: #ffffff;
        justify-content: center;
        text {
          text-align: center;
          color: #FF0000;
        }
      }
    }
  }
</style>

<script>
  export default {
    private: {
      tabHeadList: [
        { title: '推荐', render: false },
        { title: '热门', render: false },
        { title: '视频', render: false },
        { title: '段子', render: false },
        { title: '汽车', render: false },
        { title: '社会', render: false },
        { title: '娱乐', render: false },
        { title: '军事', render: false },
        { title: '体育', render: false },
        { title: '财经', render: false }
      ],
      currentIndex: 0
    },
    onInit () {
      this.$page.setTitleBar({ text: '页签内容懒加载' })
    },
    /**
     * 修改列表中对应索引的数据项
     * @param index
     */
    modifyListItemData (index) {
      this.tabHeadList[index].render = true
    },
    /**
     * 监听tabs组件index的改变，index默认为0
     * @param evt
     */
    onChangeTabIndex (evt) {
      this.currentIndex = evt.index
      this.modifyListItemData(evt.index)
    }
  }
</script>
```

## tabs 仅包含 tab-content

`tabs`内部可以仅包含`tab-bar`或者`tab-content`

假设开发者有如下需求：开发一个简化的社交主页，其中，用户图标和搜索图标为跳转按钮，点击跳转页面；聊天、发现、通讯录为页签，与内容页联动，效果如下：

由于`tabs`仅支持子组件`tab-bar`与`tab-content`，且`tab-bar`与`tab-content`的直接子元素都被当做页签或内容页。因此，仅使用`tabs`无法实现两个图标按钮

所以开发者可以这样实现：

1. `tabs`中，仅使用`tab-content`，包含`选项卡`的所有内容页
2. `tabs`外，使用`div`包含`选项卡`页签标题及图标按钮，模拟`tab-bar`
3. 在 js 代码中，动态绑定`tabs`的`index属性`，监听`tabs`的`change事件`，实现页签与内容页的联动

示例代码如下：

```html
<template>
  <div class="tutorial-page">
    <!-- 灵活使用tabs组件 -->
    <div class="flexible-tabs">
      <!-- 自定义tab-bar组件 -->
      <div class="flexible-tabbar">
        <image src="./img/user.png" onclick="routePage('personal')"></image>
        <text class="{{currentIndex === 0 ? 'active' : ''}}" onclick="clickTabBar(0)">聊天</text>
        <text class="{{currentIndex === 1 ?  'active' : ''}}" onclick="clickTabBar(1)">发现</text>
        <text class="{{currentIndex === 2 ? 'active' : ''}}" onclick="clickTabBar(2)">通讯录</text>
        <image src="./img/search.png" onclick="routePage('search')"></image>
      </div>
      <!-- 监听change事件，触发时动态修改tabs的index属性 -->
      <tabs onchange="changeTabactive" index="{{currentIndex}}">
        <tab-content class="flexible-tab-content">
          <div class="tab-content-section">
            <text>聊天</text>
          </div>
          <div class="tab-content-section">
            <text>发现</text>
          </div>
          <div class="tab-content-section">
            <text>通讯录</text>
          </div>
        </tab-content>
      </tabs>
    </div>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex: 1;
    .flexible-tabs {
      flex: 1;
      flex-direction: column;
      .flexible-tabbar {
        height: 100px;
        padding: 0 30px;
        background-color: #f1f1f1;
        align-items: center;
        text {
          flex-grow: 1;
          height: 100px;
          margin: 0 30px;
          text-align: center;
          border: 0px solid #f1f1f1;
          border-bottom-width: 5px;
        }
        image {
          height: 50px;
          width: 50px;
          resize-mode: contain;
        }
        .active {
          color: #0faeff;
          border-bottom-color: #0faeff;
        }
      }
      .flexible-tab-content {
        flex: 1;
        .tab-content-section {
          flex: 1;
          background-color: #ffffff;
          justify-content: center;
        }
      }
    }
  }
</style>

<script>
  import router from '@system.router'

  export default {
    private: {
      currentIndex: 0
    },
    onInit () {
      this.$page.setTitleBar({ text: 'tabs仅包含tab-content' })
    },
    changeTabactive (evt) {
      this.currentIndex = evt.index
    },
    clickTabBar (index) {
      this.currentIndex = index
    },
    routePage (param) {
      router.push({
        uri: 'ComponentTabs/complex/' + param
      })
    }
  }
</script>
```

## 总结

选项卡需求很常见，熟悉 tabs 组件的使用，有助于：提升用户体验、减少加载时间、优化页面性能
