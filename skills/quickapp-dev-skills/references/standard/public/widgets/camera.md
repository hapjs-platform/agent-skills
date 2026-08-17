# camera `1040+`

## 概述

相机组件

## 子组件

不支持，同一页面只能插入一个 camera 组件

## 属性

支持[通用属性](common-attributes.md)

| 名称                         | 类型       | 默认值 | 必填 | 描述                                              |
| ---------------------------- | ---------- | ------ | ---- | ------------------------------------------------- |
| deviceposition               | `<string>` | back   | 否   | 前置或后置，值为 front，back                      |
| flash                        | `<string>` | auto   | 否   | 闪光灯，值为 auto，on，off，torch(手电筒常亮模式) |
| framesize `1080+`            | `<string>` | normal | 否   | 相机帧数据尺寸，值为 low，normal，high            |
| autoexposurelock `1080+`     | boolean    | false  | 否   | 曝光锁定                                          |
| autowhitebalancelock `1080+` | boolean    | false  | 否   | 白平衡锁定                                        |

## 样式

支持[通用样式](common-styles.md)

## 事件

支持[通用事件](common-events.md)

| 名称                   | 参数   | 描述                                                                                                                                                                                   |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error                  | -      | 用户不允许使用摄像头时触发                                                                                                                                                             |
| cameraframe `1080+`    | Object | 返回内容 object.data 类型 ArrayBuffer 图像像素点数据，一维数组，每四项表示一个像素点的 rgba，object.width 类型 number 图像数据矩形的宽度，object.height 类型 number 图像数据矩形的高度 |
| camerainitdone `1080+` | Object | 相机初始化完成时触发                                                                                                                                                                   |

## 方法

| 名称                                 | 参数                                                                                                                                | 描述                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| takePhoto                            | { quality : 'high',<br>success(data){成功回调},<br>fail(data){失败回调},<br>complete(){执行结束后回调}}                             | quality 图片质量，值为 high, normal, low，默认 normal 拍照，成功则返回图片 uri 对应图片地址，失败返回错误码 code 为 201                                                                                                                                                                                                                                                                                                                  |
| startRecord `1090+`                            | { quality : 'high',<br>compressed : false,<br>maxduration : 60,<br>success(data){成功回调},<br>fail(data){失败回调},<br>timeoutCallback(data){视频录制超时回调，默认10min，返回 uri 视频文件路径地址，thumbPath 视频首帧缩略图路径地址},<br>complete(){执行结束后回调}}                             | quality 图片质量，值为 high, normal, low，默认 normal,<br>compressed 是否压缩, 默认 false<br>maxduration 视频录制超时时长，默认 10min，单位 s <br>开始录制视频                                                                                                                                                                                                                                                                                                                 |
| stopRecord `1090+`                            | { success(data){成功回调，返回 uri 视频文件路径地址，thumbPath 视频首帧缩略图路径地址},<br>fail(data){失败回调},<br>complete(){执行结束后回调}}                             | 停止录制视频                                                                                                                                                                                                                                                                                                                 |
| setSceneMode `1080+`                 | { scenemode : 'auto'，<br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}}                        | 场景模式， 不同手机不一定支持以下所有模式，不支持情况返回错误，默认为空<br>auto，自动模式<br>action，动作模式<br>portrait， 竖屏模式<br>landscape，横屏模式<br>night，夜晚模式<br>night-portrait，晚间运动模式<br>theatre，剧院模式<br>beach，海滩模式<br>snow，雪景模式<br>sunset，日落模式<br>steadyphoto，稳定模式<br>fireworks，烟花模式<br>sports，运动模式<br>party，派对模式<br>candlelight，烛光模式<br>barcode 条码模式 |
| setPreviewFpsRange `1080+`           | { previewfpsrange : {min:number,max:number}，<br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}} | 设置预览帧率的最大和最小值，范围必须从支持预览帧率范围内获取                                                                                                                                                                                                                                                                                                                                                                     |
| getSupportedPreviewFpsRange `1080+`  | { <br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}}                                            | 获取支持的预览帧率范围，成功情况返回类似数组[{"min":15000,"max":15000},{"min":7000,"max":30000}]                                                                                                                                                                                                                                                                                                                                 |
| getPreviewFpsRange `1080+`           | { <br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}}                                            | 获取设置的预览帧率范围，成功情况返回类似 {"min":20000,"max":20000}                                                                                                                                                                                                                                                                                                                                                               |
| setExposureCompensation `1080+`      | { exposurecompensation : number <br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}}              | 设置曝光值，范围必须在当前支持的曝光值范围                                                                                                                                                                                                                                                                                                                                                                                       |
| getExposureCompensationRange `1080+` | { <br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}}                                            | 获取曝光值范围，成功情况返回类似 {"min":number,"max": number}                                                                                                                                                                                                                                                                                                                                                                    |
| getExposureCompensation `1080+`      | { <br>success(data){成功回调}，<br>fail(data){失败回调}，<br>complete(){执行结束后回调}}                                            | 获取当前设置的曝光值，成功情况返回类似 {"exposurecompensation":0}                                                                                                                                                                                                                                                                                                                                                                |

## camera &nbsp; 示例代码

查看[示例代码](https://github.com/quickappcn/sample/blob/master/src/component/media/camera/index.ux)
