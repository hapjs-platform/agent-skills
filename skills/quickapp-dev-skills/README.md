# quickapp-dev-skills

快应用（QuickApp）开发助手 — AI 技能仓库。提供完整的快应用开发文档索引、脚本工具和最佳实践，帮助开发者高效创建、校验和构建快应用项目。

## 目录结构

```
.
├── SKILL.md                        # 技能定义文件 — 供 AI 加载的技能指令
├── evals/                          # 评估数据（evals.json）
│   └── evals.json
├── references/                     # 快应用开发文档
│   ├── index.md                    # 文档索引 — 主题到文件路径的映射
│   ├── best-practices/             # 最佳实践（代码组织、接口规范、样式规范）
│   ├── common-pitfalls/            # 常见编码误区与避坑指南
│   ├── guide/                      # 开发指南（IDE 使用、教程、工具链）
│   │   ├── changelog/              # 各版本变更日志
│   │   ├── ide/                    # IDE 使用文档（调试、编译、打包、上传等）
│   │   ├── tools/                  # 工具链文档
│   │   └── tutorial/               # 入门教程
│   ├── performance/                # 性能优化（渲染性能、包体积、网络优化）
│   ├── standard/public/            # 框架 API 参考（组件、系统接口、语法）
│   └── standard/honor/            # 荣耀快应用专有 API 参考（能力扩展）
└── scripts/                        # 辅助脚本
    ├── quickapp-init.js            # 项目脚手架生成器（基于 hap init）
    ├── quickapp-gen-page.js        # 页面/组件 .ux 文件骨架生成器
    ├── hap-validate.js             # 统一代码校验（基于 hap-toolkit 编译）
    └── quickapp-find-docs.js       # 文档关键词搜索脚本
```