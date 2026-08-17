# 模拟器 devtools

> 模拟器的 devtools 有 7 个功能面板：UX、Console、Source、Network、Data、Application 和 Mock。其中，UX、Data、Mock 是模拟器特有的功能，本节将对其进行介绍。

通过本节你将学会：

- [UX 面板](#ux-面板)
- [Data 面板](#data-面板)
- [Mock 面板](#mock-面板)

## UX 面板

- UX 面板，可以查看模拟器的页面元素。如图，鼠标移动到 UX 面板的元素上时，模拟器可以显示其尺寸。

- 选择 UX 面板上的元素，可以查看元素的样式。还可以修改元素样式，并在模拟器中查看效果。

  **注意**：只支持修改当前元素的样式，修改 class 上的样式，其他有同样 class 的元素不会生效。

- 点击 devtools 上的「**检查元素**」按钮，可在模拟器上移动鼠标检查页面元素，快速定位页面元素对应的 UX 代码。

## Data 面板

- Data 面板，显示当前页面的数据。可以修改数据，并在模拟器上查看效果。

- Data 面板，不会自动检测页面数据的变化，你可以打开自动刷新，定时刷新数据。或者点击「**手动刷新**」按钮，获取新数据。（建议手动刷新）

## Mock 面板

### 新建规则

- 点 + 新建规则，可以新建一条规则

- 规则示例

  运行以下代码：

  ```js
  fetch.fetch({
    url: 'https://www.example.com',
    responseType: 'text',
    method: 'GET',
    success: function(response) {
      console.log('---回调success---: ', response)
    },
    fail: function(data, code) {
      console.log('---回调fail---: ', data, code)
    },
    complete: function(a, b, c) {
      console.log(`---回调complete---: `, a, b, c)
    }
  })
  ```

  命中上面的 mock 规则，返回数据如下：

- 注意事项

  - 选择接口：不能为空，不能填写列表外的接口。
  - 参数匹配规则：

    - 代码传入的参数满足正则时，使用当前 mock 规则。
    - 点 + 可以添加参数，有多个参数时，需同时满足。
    - 对象/数组使用多层级匹配，例如，参数名 `data[1].name`，对应参数 `data` 数组第 2 项的 `name` 字段。比如，上面的示例，增加参数 `data[1].name`：

      则，原来的代码不再命中 mock 规则。而下面的代码，可以命中 mock 规则：

      ```js
      fetch.fetch({
        url: 'https://www.example.com',
        data: [{ name: '111' }, { name: 'aaa' }], // data[1].name，匹配正则 /^a/
        responseType: 'text',
        method: 'GET',
        success: function(response) {
          console.log('---回调success---: ', response)
        },
        fail: function(data, code) {
          console.log('---回调fail---: ', data, code)
        },
        complete: function(a, b, c) {
          console.log(`---回调complete---: `, a, b, c)
        }
      })
      ```

  - 数据生成：可以选择数据模版，以模拟复杂的数据结构。数据模版的写法请参考[数据模版语法规范](https://github.com/nuysoft/Mock/wiki/Syntax-Specification)。

### 删除规则

- 在规则名称处，点击鼠标右键，选择「**删除**」，即可删除 mock 规则。

### 调整规则优先级

- 一个接口配置多个 mock 规则时，位于上面的规则优先匹配。

- 可拖动 mock 规则的名称，调整规则顺序，改变其优先级。

