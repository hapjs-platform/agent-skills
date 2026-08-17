# 配置文件检查

> 了解 manifest.json 文件中部分字段的规则

## 检查

IDE 会自动检测 manifest 文件部分字段的规则，并给予提示：

- 不为空字段：package、name、icon、versionCode、config、router。

- package：推荐采用 com.company.module 的格式，如：com.example.demo。

- name：应用名称，String 类型，20 个字节以内。

- versionName：应用版本名称，如："1.0.0"。

- versionCode：应用版本号，从 1 自增，推荐每次重新上传包时 versionCode + 1。

- minPlatformVersion：建议升级至 1070 以上版本（绝大部分机型已覆盖），以避免不必要问题。

- icon：应用图标使用 png 格式，尺寸：512\*512 像素，图标大小不能超过 1M。

- features：features 中的每一个 object 需要至少有一个 name 属性。

- config：

  - string 类型 (打印日志等级，分为 off, error, warn, info, log, debug)
  - designWidth: 整数类型 (页面设计基准宽度，根据实际设备宽度来缩放元素大小)。

- router：
  - 应该有 pages 或 widgets 配置, 且不能为空。
  - 只能有一个 entry, 而且必须为 string。
  - entry 的值必须为 pages 中的一个。
  - 每一个页面必须有一个 component, 且 component 不为空。
  - component 内容必须为 string。
- display：

  - backgroundColor：string 类型
  - titleBarBackgroundColor：string 类型
  - fullScreen：boolean 类型
  - titleBar：boolean 类型
  - titleBarTextColor：string 类型
  - titleBarText：string 类型
  - menu：boolean 类型
