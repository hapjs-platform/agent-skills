# Agent Skills

AI 编码助手的技能集合。技能是打包好的指令和脚本，用于扩展 AI 助手的开发能力。

技能遵循 [Agent Skills](https://agentskills.io/) 格式。

## 可用技能

### quickapp-dev-skills

快应用（QuickApp）开发助手 — 提供完整的快应用开发文档索引、辅助脚本和最佳实践，帮助开发者高效创建、校验和构建快应用项目。

**涵盖范围：**

- **框架语法** — 生命周期、数据绑定、事件处理、样式布局
- **组件体系** — 容器组件、基础组件、表单组件、媒体组件、画布组件、扩展组件、第三方组件
- **系统能力** — 网络、存储、设备、传感器、厂商服务、第三方服务接口
- **IDE 工具链** — 新建项目、调试、编译、打包、上传、模拟器使用
- **开发流程** — 入门教程、项目结构、开发指南、工具链
- **适配与优化** — 深色模式、多语言、渲染性能、包体积、网络优化
- **打包发布** — 完整发布流程、签名、上架

**何时使用:**

- 用户询问快应用开发相关问题（框架、组件、API）
- 用户要求编写快应用代码（.ux 文件、manifest.json 配置）
- 涉及快应用联盟手机厂商原生应用开发、hap 包、rpk 包
- 需要创建快应用项目脚手架、生成页面/组件骨架
- 排查快应用兼容性问题、性能优化

**包含的辅助脚本：**

| 脚本 | 说明 |
|------|------|
| `quickapp-init.js` | 项目脚手架生成器（基于 hap init） |
| `quickapp-gen-page.js` | 页面/组件 .ux 文件骨架生成器 |
| `hap-validate.js` | 统一代码校验（基于 hap-toolkit 编译） |
| `quickapp-find-docs.js` | 文档关键词搜索脚本 |

## 安装及使用

```bash
# 指定安装 quickapp-dev-skills
npx skills add hapjs-platform/agent-skills --skill quickapp-dev-skills
```

技能安装后会自动生效。当 AI 助手检测到相关任务时，会自动加载对应的技能指令来提供帮助。

**示例场景：**

```
帮我创建一个快应用项目，包名 com.example.app，应用名"我的应用"
```

## 技能结构

每个技能包含以下内容：

- `SKILL.md` — 供 AI 助手加载的技能指令和核心策略
- `scripts/` — 辅助自动化脚本（可选）
- `references/` — 配套文档资料（可选）

## 创建新技能

创建新的技能的参考方案

### 技能结构

每个技能包含以下内容：

```
skill-name/
├── SKILL.md          # 技能定义文件（必需）
├── scripts/          # 辅助脚本（可选）
├── references/       # 参考文档（可选）
└── assets/           # 资源文件，如模板、图标（可选）
```

### 快速创建

使用 `skill-creator` 技能提供的脚手架工具初始化新技能：

```bash
# 先添加 skill-creator
npx skills add https://github.com/anthropics/skills --skill skill-creator

# 在 AI Coding 工具中使用 skill-creator 创建技能。不同工具使用方法各异，可针对性查询
/skill-creator
```

### 关键规则

- **SKILL.md 必需**：必须包含 YAML 前置元数据（`name` + `description`），这是 AI 助手判断何时触发技能的依据
- **简洁优先**：指令保持精简，详细参考资料放入 `references/` 目录
