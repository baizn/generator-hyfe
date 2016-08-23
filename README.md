# generator-hyfe
通用React项目脚手架

## Getting Started
### Installation
```
$ npm install -g yo
$ npm install -g generator-hyfe
```

**说明：**generator-hyfe未发布到npm上时候，进入到generator-hyfe目录后，执行```npm link```，npm会将该目录链接到全局目录。

### Usage
```
$ yo hyfe [--force]
```

**说明：**force选项可自动处理冲突，也可以选择手动处理。

执行yo hyfe指令后，根据提示输入或选择相应的参数内容。

**参数说明：**

- Your Project Name: 项目名
- 项目类型: 可选React服务端渲染或客户端渲染
- Git repository: git地址
- Description: 项目描述
- Author: 开发者姓名
- Keywords: 关键词
- Are you sure you create the project now: 选择y，则开始创建项目

创建成功后，控制台会显示对应的提示信息。

### 项目技术栈
- express
- react
- redux
- webpack
- postcss
- scss
- gulp
- babel
- superagent
- immutable
