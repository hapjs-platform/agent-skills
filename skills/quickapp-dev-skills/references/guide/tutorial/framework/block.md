# block

block 组件是表达逻辑区块的组件，没有对应的`Native组件`。可以使用`<block>`实现更为灵活的"列表/条件渲染"。如在`<block>`上使用 for 指令和 if 指令

**示例如下：**

```html
<template>
  <div class="tutorial-page">
    <text onclick="toggleCityList">点击：控制是否显示城市</text>
    <div class="city" for="city in cities" if="{{showCityList === 1}}">
      <text>城市：{{city.name}}</text>
      <block if="{{city.showSpots}}" for="{{city.spots}}">
        <text>景点：{{$item.name}}</text>
      </block>
    </div>
  </div>
</template>

<style lang="less">
  .tutorial-page {
    flex-direction: column;
  }
  .city {
    flex-direction: column;
  }
</style>

<script>
  import {dataDirective} from '../../Common/js/data'

  export default {
    private: {
      showCityList: 1,
      cities: dataDirective
    },
    onInit () {
      this.$page.setTitleBar({ text: '组件block' })
    },
    toggleCityList () {
      this.showCityList = this.showCityList === 1 ? 0 : 1
    }
  }
</script>
```

这个示例有点复杂，综合了前述的知识点。对示例中的变量解释如下：

- showCityList 用于控制是否在页面中生成列表元素即城市的列表
- cityList 数组代表需要列表渲染的城市列表数据
- cityList 数组的每个元素中的 showSpots，决定了是否显示当前 city 的 spots 数据

读者可以看到，通过这些组合，可以表达复杂的业务逻辑
