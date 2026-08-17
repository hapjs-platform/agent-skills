# intelligent_config 文件

intelligent_config.json 为意图配置文件，开发者在云侧注册意图时需要上传。

## intelligent_config

| 属性                      | 类型                         | 默认值 | 必填   | 描述                                           |
| ------------------------- |----------------------------|-------|------|----------------------------------------------|
| intelligentIntents        | Array\<IntelligentIntent\> | -     | 是    | 当前应用可响应的意图列表，IntelligentIntent为意图注册数据结构，说明见下 |

IntelligentIntent说明：

| 属性          | 类型   | 默认值   | 必填 | 描述                                                          |
|---------------|--------|-----------|----|-------------------------------------------------------------|
| intentName    | String | -         | 是  | 意图名称，名称应当遵循意图框架规范，当前仅支持预置垂域意图，不允许自定义。应用内意图名称唯一，不允许出现相同的名称定义 |
| intentVersion | String | -         | 是  | 意图体系定义的意图版本号, 如"1.0.0"。开发者选择，不可随意填写。                        |
| executeEntry  | String | -         | 否  | 意图调用的响应入口，可选（如果入口为卡片则必填）。入口为卡片时需以“/widgets”开头，后面加卡片唯一标识     |
| description   | Array  | -         | 否  | 用于意图框架推荐描述                                                  |

示例代码：

```json
{
  "intelligentIntents": [
    {
      "intentName": "Music.PlayMusic",
      "intentVersion": "1.0.0",
      "executeEntry": "/widgets/PlayMusicCard",
      "description": ["音乐播放"]
    },
    {
      "...": "..."
    }
  ]
}
```