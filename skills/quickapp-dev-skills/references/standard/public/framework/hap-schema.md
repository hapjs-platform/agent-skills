# hap链接

hap链接 指在router模块中支持的以hap://开头的uri，使用场景见[页面路由](../features/system/router.md)。

目前支持两种类型的hap链接 :

- hap://app/
- hap://settings/

## hap://app/

支持打开指定的快应用，格式如下：

`hap://app/<package>/[path][?key=value]`

参数说明：

- package: 应用包名，必选
- path: 应用内页面的 path，可选，默认为首页
- key-value: 希望传给页面的参数，可选，可以有多个

备注：

- 不同的厂商对该能力可能有不同限制，使用前请和相应厂商确认。

## hap://settings/ `1040+`

支持打开手机系统设置的指定页面，目前支持以下类型的跳转：

- hap://settings/location_source_manager，跳转到手机系统的位置管理界面

- hap://settings/wlan_manager，跳转到手机系统的wifi设置管理界面

- hap://settings/bluetooth_manager，跳转到手机系统的蓝牙设置管理界面

- hap://settings/5g, `1080+` 跳转到手机系统的5G网络设置管理界面

- hap://settings/nfc_manager, `1100+` 跳转到手机系统的NFC设置管理界面

- hap://settings/permissions, `1100+` 跳转到本快应用的权限管理页面
