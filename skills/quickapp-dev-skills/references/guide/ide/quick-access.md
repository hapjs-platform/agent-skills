# 快捷入口

> 快捷入口

## 打开功能

- 可以通过点击左侧功能面板的 「**快捷入口**」执行功能。

- 快捷入口有 4 个内置功能：新建快应用工程、新建快应用组件、键盘快捷方式和导入代码片段。其他快捷入口功能，由插件实现。

## 开发该功能

- 用户开发的插件，也可以添加快捷入口功能。只需要在插件的激活函数 `activate` 中，向 IDE 发送 `extension.setCustomizableFeatures` 命令。所需参数请参考示例：

  ```javascript
  // 插件激活函数
  export function activate(context) {
    // 执行命令
    vscode.commands.executeCommand('extension.setCustomizableFeatures', {
      name: '', // 插件名称
      icon: '', // 插件icon，可以是本地路径或者网络图片，没有则显示 ide 默认的 icon 图标
      commandList: [
        {
          // 命令数组，当前版本仅支持一个插件发送一个命令
          name: '', // 命令名，需要执行的命令
          description: '', // 描述，命令功能名
          parameters: {} // 命令参数，可传入一个对象Object
        }
      ]
    })
  }
  ```

  **注意：** 只有在插件激活的时候，才会将插件的功能添加至快捷入口，开发插件时请注意插件激活的时机。
