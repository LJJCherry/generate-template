### 用法

1、全局安装

```
npm i ljj-generate-template -g
ljj-generate-template
```

2、使用 npx

```
npx ljj-generate-template
```
就会把[项目模板](https://github.com/LJJCherry/create-react-app-template)拷贝到当前目录的新建的test目录下（ps:test是写死的）
### 用到的库

- [commander](https://github.com/tj/commander.js)：node.js command-line interfaces made easy。
  命令行框架，提供了用户命令行输入和参数解析强大功能，commander.js 中文文档
- [download-git-repo](https://www.npmjs.com/package/download-git-repo): Download and extract a git repository (GitHub, GitLab, Bitbucket) from node。
  从 GitHub, GitLab, Bitbucket 下载一个 git 仓库
- [chalk](https://github.com/chalk/chalk):Terminal string styling done right。
  用于修改控制台字符串的样式，包括字体样式（加粗），颜色以及背景颜色等。

- [Inquirer](https://github.com/SBoudrias/Inquirer.js): A collection of common interactive command line user interfaces。
  交互式命令行工具

* [fs-extra](https://github.com/jprichardson/node-fs-extra):adds file system methods that aren't included in the native fs
  fs 方法的扩充库

* [ora](https://github.com/sindresorhus/ora/blob/master/readme.md): Elegant terminal spinner

### 常见问题

1、'git clone' failed with status 128

github 地址

```
https://github.com/LJJCherry/create-react-app-template.git
```

download 配置地址：

```
https://github.com:LJJCherry/create-react-app-template#master
```
