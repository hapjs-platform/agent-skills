# Deeplink `1000+`

框架支持通过链接从外部打开应用。

## deeplink 支持的格式：

- `http://hapjs.org/app/<package>/[path][?key=value]`
- `https://hapjs.org/app/<package>/[path][?key=value]`
- `hap://app/<package>/[path][?key=value]`

### 参数说明：

备注：快应用内只支持通过 hap 链接打开快应用，http 和 https 链接将被当成 web 页面打开

- package: 应用包名，必选
- path: 应用内页面的 path，可选，默认为首页
- key-value: 希望传给页面的参数，可选，可以有多个

### 快应用中调用 `deeplink` 打开另一个快应用 示例：

```javascript
import router from '@system.router'

router.push({
  // 快应用内只能使用hap链接
  uri: 'hap://app/com.example.quickapp/page?key=value'
})
```

### 原生 App 中调用 `deeplink` 打开快应用 示例：

```java
Intent intent = new Intent(Intent.ACTION_VIEW);
// 原生App中可以使用hap、http、https三种链接
intent.setData(Uri.parse("hap://app/com.example/Detail?key1=value1&key2=value2"));
context.startActivity(intent);
```

### 快应用获取 key-value

快应用通过`public`定义 key 名相同的属性获取外部参数;如果参数 key 未被声明，public 不会新增这个属性，即获取不到参数值。

```javascript
export default {
  public: {
    key: null
  },
  onShow() {
    console.log(this.key)
  }
}
```

### 备注：

- 不同的厂商对该能力可能有不同限制，使用前请和相应厂商确认。
