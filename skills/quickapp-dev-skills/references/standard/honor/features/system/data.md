# 卡片与安卓通信 data

> 该接口为**荣耀快应用引擎专有**接口，用于卡片查询安卓原生 APP 暴露的数据源（基于 Android ContentProvider）。需要**卡片侧（JS）**与**安卓原生 APP 侧（ContentProvider）**配合实现。

> **支持版本**
> - 卡片：`6032+`
> - 快应用 App：不支持

## 接口声明

```json
{ "name": "system.data" }
```

## 导入模块

```javascript
import data from '@system.data'
// 或
const data = require('@system.data')
```

## 接口定义

### data.config(OBJECT)

配置目标 APP 的数据源（用于一次性下发配置参数）。

#### 参数：

| 参数名    | 类型     | 必填 | 说明                       |
| --------- | -------- | ---- | -------------------------- |
| pkg       | String   | 是   | 目标数据源的所属应用包名   |
| authority | String   | 是   | 目标数据源的域名           |
| path      | String   | 否   | 目标数据源的路径           |
| params    | String   | 是   | 对目标数据源设置的配置参数 |
| success   | Function | 否   | 成功回调                   |
| fail      | Function | 否   | 失败回调                   |
| complete  | Function | 否   | 执行结束后的回调           |

##### success 返回值：

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| msg    | String | 执行成功的消息 |

##### fail 返回错误代码：

| 错误码 | 说明                          |
| ------ | ----------------------------- |
| 200    | 通用错误                      |
| 202    | 参数错误                      |
| 203    | 无匹配的数据源或数据源未返回结果 |
| 804    | 无权使用该功能                |
| 2001+  | 数据源自定义错误码            |

#### 示例：

```javascript
data.config({
  pkg: 'com.example.helloworld',
  authority: 'com.example.helloworld.provider',
  params: '{}',
  success: function (data) {
    console.log(`handling success: ${JSON.stringify(data)}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}, errorMsg = ${data}`)
  }
})
```

### data.query(OBJECT)

查询目标 APP 的数据源，返回 JSON 结果字符串。

#### 参数：

| 参数名    | 类型     | 必填 | 说明                       |
| --------- | -------- | ---- | -------------------------- |
| pkg       | String   | 是   | 目标数据源的所属应用包名   |
| authority | String   | 是   | 目标数据源的域名           |
| path      | String   | 是   | 目标数据源的路径           |
| params    | String   | 是   | 对目标数据源设置的查询参数 |
| success   | Function | 否   | 成功回调                   |
| fail      | Function | 否   | 失败回调                   |
| complete  | Function | 否   | 执行结束后的回调           |

##### success 返回值：

| 参数名 | 类型   | 说明                   |
| ------ | ------ | ---------------------- |
| data   | String | 返回的 JSON 结果字符串 |

##### fail 返回错误代码：

错误码与 `data.config` 一致：`200`、`202`、`203`、`804`、`2001+`。

#### 示例：

```javascript
data.query({
  pkg: 'com.example.helloworld',
  authority: 'com.example.helloworld.provider',
  path: '/',
  params: '{}',
  success: function (data) {
    console.log(`handling success: ${JSON.stringify(data)}`)
  },
  fail: function (data, code) {
    console.log(`handling fail, code = ${code}, errorMsg = ${data}`)
  }
})
```

## 原生 APP 侧实现（ContentProvider）

卡片侧调用 `data.query` / `data.config` 时，引擎会向目标 APP 的 ContentProvider 发起请求，因此安卓原生 APP 需要暴露对应的 Provider：

**1. 在 AndroidManifest 中声明 Provider**

```xml
<provider
    android:name="自定义 ContentProvider 类的全限定名"
    android:authorities="自定义 URI 授权方（与卡片侧 authority 对应）"
    android:exported="true" />
```

> - Provider 类返回的 Cursor / Bundle 中**必须包含 `code` 与 `msg`/`data` 字段**供卡片解析，否则 `query` 接口不生效。
> - `authorities` 可自定义，需与卡片侧 `authority` 参数一致。

**2. 实现 query（对应卡片 `data.query`）**

```java
@Override
public Cursor query(Uri uri, String[] projection, String selection,
                    String[] selectionArgs, String sortOrder) {
    // 校验快应用引擎包名，防止非快应用卡片调用
    if (!"com.hihonor.quickengine".equals(getCallingPackage())) {
        return createResultCursor(2001, "calling app not acceptable");
    }
    // 校验 rpk 包名，防止无关卡片调用
    String cardPackage = uri.getQueryParameter("cardPackage");
    if (!"com.datamanager.demo".equals(cardPackage)) {
        return createResultCursor(2002, "calling card not acceptable");
    }
    // 卡片侧入参 params
    String params = uri.getQueryParameter("params");
    // 返回数据：第一列为 code，第二列为实际数据
    return createResultCursor(0, "{\"hello\":\"world\"}");
}

private Cursor createResultCursor(int code, String data) {
    MatrixCursor cursor = new MatrixCursor(new String[]{"code", "data"});
    cursor.addRow(new Object[]{code, data});
    return cursor;
}
```

**3. 实现 call（对应卡片 `data.config`）**

```java
@Nullable
@Override
public Bundle call(@NonNull String method, @Nullable String arg, @Nullable Bundle extras) {
    if ("config".equals(method)) {
        return config(arg, extras);
    }
    return createCallResult(2003, "unsupported method");
}

private Bundle config(String params, Bundle extras) {
    Log.i(TAG, "config isComing");
    if (extras == null) {
        return createCallResult(2004, "extras is null");
    }
    String callingPackage = getCallingPackage();
    String cardPackage = extras.getString("cardPackage");
    extras.getString("path");
    // 快应用引擎包名校验，防止非快应用类卡片调用 provider
    if (!"com.hihonor.quickengine".equals(callingPackage)) {
        return createCallResult(2001, "calling app not acceptable");
    }
    // rpk 包名校验，防止无关快应用卡片调用
    if (!"com.datamanager.demo".equals(cardPackage)) {
        return createCallResult(2002, "calling card not acceptable");
    }
    // 入参校验
    if (TextUtils.isEmpty(params)) {
        return createCallResult(2004, "params is empty");
    }
    // 返回消息
    return createCallResult(0, "success: " + params);
}

private Bundle createCallResult(int code, String msg) {
    Bundle bundle = new Bundle();
    bundle.putInt("code", code);
    bundle.putString("msg", msg); // 或 NotificationCompat.CATEGORY_MESSAGE
    return bundle;
}
```

---

## 来源

- https://developer.honor.com/cn/doc/guides/101519
