# 量化培训大师 Web Demo

这是“量化培训大师”的公开网页 Demo 仓库。

它不是一套另外写的介绍站，而是把桌面客户端当前使用的同一套页面结构直接发布成浏览器可访问版本，方便比赛评审、项目申报和外部体验。

## 这个仓库现在是什么

- GitHub Pages 静态发布仓
- 发布的是浏览器可运行产物，不是开发源码仓
- 页面结构与桌面客户端保持一致
- 回测页、训练社区、数据页、实盘页都会直接展示

## 网页版与客户端的区别

两者界面基本一致，核心区别只有一条：

- 需要连接本地 QMT、调用本地进程、访问本地文件系统的功能，网页版会提示“下载客户端后才可使用”

也就是说：

- 网页版负责评审展示、页面体验、真实回测结果展示
- 客户端负责 QMT 连接、实盘执行、本地任务调度和本地数据中心能力

## 公开仓库里包含什么

- 浏览器可直接访问的静态页面
- 真实回测产物对应的网页展示资源
- GitHub Pages 自动部署工作流

## 公开仓库里不包含什么

- Electron 主工程源码
- 本地 Python 内核源码
- QMT 接入链路
- 本地执行与调度能力

## 默认访问方式

仓库开启 GitHub Pages 后，默认访问地址：

https://changgely.github.io/quant-training-master-demo/

如果根地址未自动跳转，也可以直接访问：

https://changgely.github.io/quant-training-master-demo/src/web-demo/index.html#/

## 客户端下载

桌面客户端 Release 页面：

https://github.com/CHANGGELY/quant-training-master-downloads/releases/tag/v1.0.0

安装包直链：

https://github.com/CHANGGELY/quant-training-master-downloads/releases/download/v1.0.0/QuantTrainingMaster-1.0.0.exe

## 说明

本项目聚焦 A 股量化训练与产品演示，网页展示中的回测结果仅用于说明产品能力，不构成任何收益承诺。
