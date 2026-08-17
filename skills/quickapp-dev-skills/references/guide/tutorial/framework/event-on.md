# 事件绑定

## 格式

```html
<text onclick="{{press}}"></text>
```

可以简写为：

```html
<text @click="{{press}}"></text>
```

事件回调支持的写法（其中{% raw %}{{}}{% endraw %}可以省略）：

```html
<text @click="press"></text>
```

"fn"：fn 为事件回调函数名（在`<script>`中有对应的函数实现），上例中press为事件回调函数。

## 传参

### 常量

```html
<template>
    <div class="demo-page">
        <text for="{{list}}" key="{{$idx}}" onclick="handle($idx,$item)">{{$item}}</text>
    </div>
</template>

<script>
    export default {
        private: {
            list:[1,2,3,4,5]
        },
        handle(idx,item,$evt){
            console.log(idx)
            console.log(item)
            console.log($evt)
        }
    }
</script>
```

**示例图：**

### 变量

`<script>`中定义的页面的数据变量(前面不用写 this)

```html
<template>
    <div class="demo-page">
        <text for="{{list}}" key="{{$idx}}" onclick="handle(total,$item)"> {{$item}}</text>
    </div>
</template>

<script>
    export default {
        private: {
            list:[1,2,3,4,5],
            total:0
        },
        handle(total,num,$evt){
            console.log(total)
            console.log(num)
            console.log($evt)
        }
    }
</script>
```

**示例图：**

**注意：**
> 回调函数被调用时，会在参数列表末尾自动添加一个 evt 参数，通过 evt 参数访问回调事件相关上下文数据。
