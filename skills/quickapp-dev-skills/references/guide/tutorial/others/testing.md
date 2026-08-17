# 自动化测试

> 测试是软件开发中必不可少的一个环节，程序化测试能够加快研发速度，提高协作效率，减少产品故障。

通过本节，你将学会：

- [传统测试的分类](#传统测试的分类)
- [如何测试快应用](#如何测试快应用)
- [方案实现原理](#方案实现原理)
- [代码覆盖率](#代码覆盖率)
- [其它参考](#其它参考)

## 传统测试的分类

传统前端项目的测试，可以从两个维度去做分类：

### 粗细粒度的角度

从粗细粒度的角度看，测试分为以下几类：

- 单元测试

主要针对JS中的某些方法（不包括ux中的定义），这些方法独立性强，不强依赖于外部环境；

这类需求有明确的输入输出要求，通过常规的测试框架即可完成，如：`mocha`、`Jest`；

- 集成测试

主要针对功能比较完整的模块或者组件，它们是多个单元/模块的组装与业务结合；

这类需求希望面对常见的业务应用场景，能够得到正确的界面渲染与数据结构；

在当前的快应用平台中，如果用到自定义组件或者底层接口（如：`@system.fetch`），需要依赖于真机环境进行测试确认结果；

当然，部分开发者希望能够提供一个模拟环境（如：NodeJS）的快应用平台，方便在PC上完成测试，目前这个能力仅团队内部使用，考虑到更新频次较高，暂没有对外开放；

实际上，优先推荐开发者使用真机环境通过自动化的方式完成确认，这样可以确保多手机厂商设备下对功能的统一能力确认；

针对这类测试的实现，开发者可以考虑在快应用项目中建立新的能力测试页面，引入待测试的自定义组件与模块，通过`mocha`、`Jest`等工具完成断言；

- e2e测试

主要针对项目与页面级别的测试，确保项目的基本功能畅通，是对项目上线的一个主要保障；

这类需求的原理就是通过真实的浏览器去运行每个页面，模拟用户行为操作，确保界面的一致性，功能正确；

对于WEB的前端开发者通过`Karma`、`Selenium`等工具，完成对浏览器操作的自动化封装，最终测试页面与后端服务器的正确配合；

对于快应用的前端开发者，需要借助于一些接口与简单类库封装，来承载页面的加载、切换等测试任务；

### 功能覆盖的角度

从功能覆盖的角度，测试可以分为几类：

- 接口测试

主要针对底层为前端开发者提供的接口，确保这些接口在跨设备上行为和输出正确；如：`@system.storage`；

- 界面测试

主要针对页面局部的UI布局渲染正确，确定：文本、对话框、滑动等节点存在，位置正确；

- 功能测试

主要针对某些行为操作下的功能表现正确，或者小到一个模块、一个方法的输出正确；

## 如何测试快应用

在快应用的项目中，如果开发者仅仅只是JS文件中方法的单元测试的话（不需要引入底层接口），完全可以通过自己引入`mocha`等工具，然后运行在PC的NodeJS环境来实现，这块实现简单，本文不赘述；

当前快应用的实现中，框架为开发者提供了一套e2e的测试框架，这类测试需要运行在真实的手机设备中，然后配合`@system.router`接口完成页面之间的切换与内容测试，后面介绍原理；

开发者可以通过以下步骤来为项目引入e2e的测试能力（当前使用的`hap-toolkit`工具版本为：`0.6.8`）；

### 1. 新建示例项目

使用命令行新建一个自定义项目，名称为：`quickapp-demo-quality`

```
  npx hap init quickapp-demo-quality
```

当前，开发者也可以使用自己已有的项目，用于增加测试能力；

提示：为了方便开发者理解并使用，快应用官方的[Github站点](https://github.com/quickappcn)提供了[示例项目](https://github.com/quickappcn/quickapp-demo-quality/)；

### 2. 添加并编写测试用例

在项目中，创建`test`目录，与`src`目录同级，该文件夹用于存放所有的页面测试用例；

其中针对每个页面的测试用例的文件路径需要与`src`目录中对应页面的路径保持一致；

当前项目我们添加`Demo`、`DemoDetail`、`About`三个页面的测试用例。结构如下:

其中针对`Demo`页面的测试用例，举例如下，其它测试用例的文件内容类似:

```javascript
/**
* @param vm 代表页面的ViewModel实例
*/
export default function(vm) {
  // 其中describe, it, expect函数来自于对 mocha, chai的引入；
  describe(`Demo`, function() {
    it(`测试Detail页面vm属性`, function(done) {
      expect(2).to.equal(3)
      done()
    })

    it(`测试Detail页面vm方法`, function(done) {
      done()
    })
  })
}
```

### 3. 生成要测试的页面

在`test`目录下创建一个JS文件`autocase.js`，表示所有要测试的页面文件列表，其内容如下:

代码中描述了本次要测试的页面为：`Demo`、`DemoDetail`、`About`；

```javascript

const autoCaseList = [
  'Demo',
  'DemoDetail',
  'About'
]

export {
  autoCaseList
}

```

该文件供下面的测试汇总页面使用，声明哪些页面需要进行`e2e`测试。

### 4. 增加测试汇总页面与自动化能力

上一步仅代表哪些页面需要进行测试，并测试页面中的哪些能力；

这一步主要完成两件事：

1) 增加测试汇总页面，记录测试结果；

2) 将各测试页面的结果与切换连接起来，形成自动化；

在`src`目录下创建一个测试汇总的页面`Summary`并在`manifest.json`中声明路由；

页面内容中的JS代码部分举例如下：

```html
<script>
  import router from '@system.router'

  import {
    autoCaseList
  } from '../../test/autocase'

  /**
   * 获取下一个自动测试的page
   */
  function findNextTestPage() {
    const list = global.loadData('pageNameList')
    const item = list.shift()
    global.saveData('pageNameList', list)
    return item
  }

  function waitForOK(time = 100) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }

  export default {
    private: {
      // 包含自动测试脚本的case列表
      pageNameList: [],
      pageTestList: [],
      shouldTestAll: false,
      showCompletedText: false,
      isRunningTest: false
    },
    onInit() {
      this.pageNameList = autoCaseList
      // 初始化自动化测试相关数据
      if (global.loadData) {
        global.saveData('pageNameList', this.pageNameList)
      }
    },
    onShow() {
      // 更新pageTestList
      this.pageTestList = (global.loadData('pageTestList') || []).map(item => {
        item.showPageTestDetail = false
        item.tests.forEach(itemCase => {
          itemCase.showPageTestErrDetail = false
        })
        return item
      })
      this.shouldTestAll && this.startNextTestPage()
    },
    /**
     * 重启整个所有测试
     */
    restartTestProcess() {
      // 防止连续多次点击
      if (!this.isRunningTest) {
        this.isRunningTest = true
        global.saveData('pageNameList', this.pageNameList)
        global.saveData('pageTestList', [])

        // 重置测试结束文本的显示状态
        this.showCompletedText = false
        // 自动跑测试下一个测试用例
        this.shouldTestAll = true
        // 启动下个测试用例
        this.startNextTestPage()
      }
    },
    /**
     * 启动下个测试用例
     */
    async startNextTestPage() {
      const pageItem = findNextTestPage()
      console.info(`下个测试用例：${pageItem}`)
      if (pageItem) {
        await waitForOK(1000)
        console.info(`开始测试页面：${pageItem}`)
        router.push({
          uri: pageItem
        })
      } else {
        this.isRunningTest = false
        console.info(`测试用例列表执行完毕`)
        this.showCompletedText = true
        this.shouldTestAll = false
      }
    },
    gotoPage(path, params) {
      // 单个页面的点击跳转：不会在测试后，自动返回
      params = Object.assign({
        back: 'false'
      }, params)

      router.push({
        uri: path,
        params
      })
    },
    togglePageTestDetailStatus($item) {
      $item.showPageTestDetail = !$item.showPageTestDetail
    },
    togglePageErrStackStatus($item) {
      $item.showPageTestErrDetail = !$item.showPageTestErrDetail
    }
  }
</script>
```

提示：开发者可以在[官方站点的示例项目](https://github.com/quickappcn/quickapp-demo-quality)中查看[该页面全部内容](https://github.com/quickappcn/quickapp-demo-quality/blob/master/src/Summary/index.ux)，路径为：`src/Summary/index.ux`

### 5. 构建自动化测试的RPK文件

在项目目录下，执行构建命令 `npm run build:test`，并运行在快应用平台，即可完成自动化测试；

扫码打开页面并点击按钮`点击重新测试`，完成一整套自动化测试过程。

最终的示例效果如下：

## 方案实现原理

上面这种e2e的测试方式，并不需要修改框架运行时，即：不需要前端框架配合修改某些代码；

相反，它的实现主要是通过：上面的开发者代码与`hap-toolkit`编译时工具在启用参数`--enable-e2e`构建后注入的代码配合完成的；

下面从编译时、运行时两个方面，介绍实现原理，方便开发者理解，并进行更深程度的定制与改造；

### 编译时

1. 开发者执行构建命令`npm run build:test`，将会启用参数`--enable-e2e`来创建RPK文件；开发者可以通过`package.json`查看细节；

2. 该参数启用后，`hap-toolkit`将会完成以下几件事，其中前两步可以通过`build/app.js`文件查看细节，后两部通过`build`目录下对应的页面JS查看细节；

3. 向项目的`app.ux`中，注入测试相关类库：`hybrid-mocha`、`hybrid-chai`，他们分别是对类库`mochajs`、`chaijs`的简单适配的封装；

4. 向项目的`app.ux`中，注入一些全局函数：`loadData(key)`、`saveData(key, value)`提供给每个页面调用，这两个函数分别用于向JS内存中全局获取数据与保存数据；

5. 向项目的页面级ux文件中，关联引入`test`目录中对应的测试用例文件（相对路径保持一致的JS文件）；

6. 向项目的页面级ux文件中，注入`mocha`实例化与运行的代码，伪代码如：`const mocha = new Mocha(); mocha.run();`；

7. `hap-toolkit`走正常流程，编译每个页面，如：`汇总页面 Summary`，并生成RPK文件；

### 运行时

1. 快应用启动时，先加载RPK中的`app.js`，即：源码中的`app.ux`；

2. 上一步接着会向全局环境注入`mocha`、`assert`、`expect`、`should`测试类库，与全局函数`loadData(key)`、`saveData(key, value)`；

3. 接着根据`manifest.json`的定义，加载首页`Summary`，呈现汇总页面的初始状态，此时还没有执行任何的页面测试；

4. 开发者点击页面中的按钮`点击重新测试`，就会执行对应的方法`restartTestProcess()`，该方法将会依次加载变量`autoCaseList`中每个页面，直到测试完成；

5. 在拥有测试用例的每个页面中，会依次实例化`mocha`，并完成`test`目录下对应的测试JS文件的执行，并得到测试结果，最后返回到汇总页面`Summary`；

6. 所有页面测试完成之后，返回到汇总页面`Summary`，此时会展现每个页面的执行结果；开发者可以点击每条记录，查看正确与出错的测试详情；

## 代码覆盖率

有些开发者，希望能够对快应用项目中的源码在做测试的同时，也能够看到代码执行的覆盖率，比如：使用 `istanbul工具`；

因此，介绍快应用中使用`Istanbul`的步骤：

### 1. 编译时携带参数：`--enable-istanbul`（`hap-toolkit@0.6.13开始支持该参数`）；

编译时会对源码进行处理，增加`Istanbul`相关代码监测（行数、块级、分支）的改造，最终生成编译后的JS文件；

参考`示例项目quickapp-demo-quality`中`package.json`的`build:test:istanbul`命令；

### 2. 运行快应用中的各个页面，并将结果记录在全局变量`__coverage__`中；

此时，所有页面的执行结果都会保存下来，变量`__coverage__`为普通的JS对象，每个属性代表各页面的路径，对应的值代表页面运行结果；

参考`示例项目quickapp-demo-quality`中`build目录`下生成的各页面JS代码，搜索关键字`__coverage__`；

### 3. 快应用页面中保存运行结果；

此时，开发者在页面`src/Summary/Index.ux`中点击按钮`保存代码覆盖率数据`，事件通过`fetch`接口，将记录数据发送到PC上的快应用NodeJS服务器，并以JSON格式保存数据在项目根目录下的`.nyc_output`文件夹中；

参考`示例项目quickapp-demo-quality`中`src/Summary/index.ux页面`的`saveIstanbulCoverageData()`方法；

### 4. 转换上一步的JSON记录数据为易读的各类report格式；

此时，开发者在根目录下运行：`nyc report`，它会读取根目录下的配置文件`nyc.config.js`完成转换，并保存在文件夹`coverage`中；

参考`示例项目quickapp-demo-quality`中已经安装的依赖`类库nyc`，或者使用`npx nyc report`也可以达到同样效果；

### 5. 浏览器打开`coverage`目录中的`index.html`页面即可查看全部页面的结果；

下图展示：记录的页面JS文件的表格数据：

下图展示：记录某个页面JS文件的详细数据：

## 其它参考

- [Github测试示例项目：quickapp-demo-quality](https://github.com/quickappcn/quickapp-demo-quality)
- [mochajs官网](https://mochajs.org/)
- [chaijs官网](https://www.chaijs.com/)
- [探索istanbul/nyc代码覆盖工具的原理](https://zhuanlan.zhihu.com/p/88524418)

## 总结

当前快应用的测试方式与程序化能力，辅助开发者完成功能等上的保证，从而确定项目的稳定性，提升维护性。
