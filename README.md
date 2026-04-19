# 量化培训大师 Demo Site

这是“量化培训大师”的公开演示站仓库，用于 GitHub Pages 免费部署，面向比赛评审、外部体验和产品展示。

## 这个仓库包含什么

- 量化培训大师的网页 Demo 站前端代码
- 真实客户端界面截图
- 真实回测产物中的资金曲线 HTML
- 真实策略评价摘要
- 真实最新选股结果节选

## 这个仓库不包含什么

- 客户端核心源码
- 本地执行内核
- 真实策略实现细节
- QMT 接入链路
- 本地数据中心与任务调度逻辑

换句话说，这个公开仓库只承担“展示层”和“评审体验层”，不公开核心竞争力部分。

## 站点定位

Demo 站解决的是“让评委和外部用户快速理解产品”的问题，而不是替代桌面客户端。

### 网页版适合展示的内容

- 数据订阅能力展示
- 策略库与训练流程讲解
- 真实回测结果展示
- 真实资金曲线体验
- 最新选股结果展示
- Web 与桌面版边界说明

### 必须继续使用桌面版的内容

- 需要连接本地 QMT 的场景
- 需要访问本地数据目录的场景
- 需要调用本地 Python 内核执行任务的场景
- 需要落盘回测结果与本地调度的场景

## 本地开发

依赖：

- Node.js 24 或更高版本
- npm

在 PowerShell 中执行，当前目录切到：

`D:\aaxiangmu\项目\非量化项目\比赛\quant-training-master-demo`

安装依赖：

```powershell
Set-Location "D:\aaxiangmu\项目\非量化项目\比赛\quant-training-master-demo"
npm install
```

启动开发环境：

```powershell
Set-Location "D:\aaxiangmu\项目\非量化项目\比赛\quant-training-master-demo"
npm run dev
```

构建静态站点：

```powershell
Set-Location "D:\aaxiangmu\项目\非量化项目\比赛\quant-training-master-demo"
npm run build
```

成功标志：

- 控制台出现 `built in ...`
- 生成目录 `dist`

## GitHub Pages 部署

仓库内已经包含 Pages 工作流：

- 推送到 `main` 分支后自动构建
- 自动发布到 GitHub Pages

如果仓库名为 `quant-training-master-demo`，默认访问地址会是：

`https://changgely.github.io/quant-training-master-demo/`

## 声明

本项目聚焦 A 股量化职业技能训练与产品演示，不承诺投资收益。网页展示的回测结果仅用于说明产品能力，不代表未来表现。
