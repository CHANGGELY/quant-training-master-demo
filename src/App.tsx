import { Helmet, HelmetProvider } from "react-helmet-async"
import {
  ArrowUpRight,
  ChartLine,
  Database,
  Download,
  FolderLock,
  LaptopMinimal,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import "./App.css"

const projectName = "量化培训大师"
const companyName = "杭州加密量化科技有限公司"

const webReadyModules = [
  {
    title: "数据订阅展示",
    detail: "用网页形态展示数据目录、订阅能力、更新时间解释和产品清单，适合评委快速理解数据底座。",
    icon: Database,
  },
  {
    title: "策略库与训练流程",
    detail: "把选股策略、仓位管理、训练步骤、研究缓存和成果沉淀做成可讲解、可浏览、可演示的产品化页面。",
    icon: Sparkles,
  },
  {
    title: "回测结果与资金曲线",
    detail: "直接挂载真实回测产物，展示资金曲线、策略评价和最新选股结果，让体验更接近真实软件。",
    icon: ChartLine,
  },
]

const desktopOnlyModules = [
  "需要连接本地 QMT 的功能，继续保留桌面版形态。",
  "依赖本地文件系统、策略目录和 Python 内核任务调度的能力，继续保留桌面版。",
  "需要读取本地数据中心、执行长任务或调用本地券商环境的场景，统一提示下载桌面版体验。",
]

const productHighlights = [
  {
    title: "真实客户端已完成",
    value: "桌面端原型可运行",
    detail: "不是概念页，当前已有数据中心、回测、研究缓存、模拟盘等页面。",
  },
  {
    title: "真实回测可验",
    value: "12/12 旗舰策略已跑通",
    detail: "评委可以直接查看真实资金曲线和策略评价，而不是只看口头描述。",
  },
  {
    title: "核心能力受保护",
    value: "仅公开 Demo 外壳",
    detail: "GitHub Pages 只承载展示层，核心内核、策略实现和本地执行链路不公开。",
  },
]

const journeySteps = [
  {
    step: "01",
    title: "先在网页里理解产品",
    detail: "通过网页快速看懂数据、策略、回测、研究缓存和产品边界。",
  },
  {
    step: "02",
    title: "直接体验真实回测结果",
    detail: "在网页里查看真实资金曲线、策略评价和最新选股结果。",
  },
  {
    step: "03",
    title: "需要本地执行时切换桌面版",
    detail: "凡是涉及 QMT、本地数据目录或本地任务调度的能力，统一进入桌面版。",
  },
]

const evaluationMetrics = [
  { label: "累积净值", value: "1.09" },
  { label: "年化收益", value: "8.72%" },
  { label: "最大回撤", value: "-1.73%" },
  { label: "年化收益/回撤比", value: "5.04" },
  { label: "胜率（去 0）", value: "59.07%" },
  { label: "单周期最大盈利", value: "0.60%" },
  { label: "单周期最大亏损", value: "-0.99%" },
  { label: "收益率标准差", value: "0.21%" },
]

const latestSelections = [
  {
    date: "2026-02-05",
    name: "华能水电",
    code: "sh600025",
    strategy: "X1-选股精心随机混合#2.低波大市值",
    cycle: "W_3",
    ratio: "1%",
  },
  {
    date: "2026-02-05",
    name: "工商银行",
    code: "sh601398",
    strategy: "X1-选股精心随机混合#2.低波大市值",
    cycle: "W_3",
    ratio: "1%",
  },
  {
    date: "2026-02-05",
    name: "中国建筑",
    code: "sh601668",
    strategy: "X1-选股精心随机混合#2.低波大市值",
    cycle: "W_3",
    ratio: "1%",
  },
  {
    date: "2026-02-05",
    name: "京沪高铁",
    code: "sh601816",
    strategy: "X1-选股精心随机混合#2.低波大市值",
    cycle: "W_3",
    ratio: "1%",
  },
  {
    date: "2026-02-05",
    name: "宁波联合",
    code: "sh600051",
    strategy: "X1-选股精心随机混合#0.小市值_行业高分红",
    cycle: "W_3",
    ratio: "候选",
  },
  {
    date: "2026-02-05",
    name: "我乐家居",
    code: "sh603326",
    strategy: "X1-选股精心随机混合#0.小市值_行业高分红",
    cycle: "W_3",
    ratio: "候选",
  },
  {
    date: "2026-02-05",
    name: "众源新材",
    code: "sh603527",
    strategy: "X1-选股精心随机混合#1.中等生策略",
    cycle: "W_3",
    ratio: "候选",
  },
  {
    date: "2026-02-05",
    name: "中科三环",
    code: "sz000970",
    strategy: "X1-选股精心随机混合#1.中等生策略",
    cycle: "W_3",
    ratio: "候选",
  },
]

const asset = (relativePath: string) => `${import.meta.env.BASE_URL}${relativePath}`

function App() {
  return (
    <HelmetProvider>
      <div className="min-h-screen overflow-x-hidden bg-[#07111d] text-white">
        <Helmet>
          <title>量化培训大师 Demo Site｜A股量化职业技能实训平台</title>
          <meta
            name="description"
            content="量化培训大师 Demo Site：面向比赛评审与外部体验的产品演示站，展示真实界面、真实回测结果、真实资金曲线与 Web/桌面版产品边界。"
          />
        </Helmet>

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-14%] top-[-12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18),rgba(245,158,11,0)_68%)]" />
          <div className="absolute right-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),rgba(34,211,238,0)_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-15" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,29,0.18),rgba(7,17,29,0.96)_78%)]" />
        </div>

        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111d]/82 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <img src={asset("logo/lockup-b.svg")} alt="量化培训大师标识" className="h-8 invert" />
              <div className="hidden text-sm text-white/56 lg:block">{companyName}</div>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <a href="#proof" className="transition hover:text-white">
                真实界面
              </a>
              <a href="#curve" className="transition hover:text-white">
                资金曲线
              </a>
              <a href="#selection" className="transition hover:text-white">
                最新选股
              </a>
              <a href="#desktop" className="transition hover:text-white">
                桌面版边界
              </a>
            </nav>
          </div>
        </header>

        <main>
          <section className="mx-auto flex max-w-7xl flex-col gap-12 px-5 pb-18 pt-16 lg:flex-row lg:items-end lg:px-8 lg:pb-24 lg:pt-24">
            <div className="max-w-4xl flex-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/22 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-50">
                <Sparkles className="h-4 w-4" />
                GitHub Pages 免费演示站｜仅公开 Demo 展示层
              </div>
              <h1 className="max-w-5xl text-5xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                {projectName}
                <span className="mt-3 block text-[0.42em] font-semibold tracking-[-0.03em] text-white/84">
                  把桌面量化实训软件，转换成评委可访问、可体验、可验证的网页 Demo
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">
                这个站点面向比赛评审与外部体验，展示真实界面、真实回测结果、真实资金曲线和真实选股结果。
                需要连接本地 QMT 或调用本地执行环境的能力，仍然保留桌面版形态。
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#curve"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:translate-y-[-1px]"
                >
                  立即体验真实资金曲线
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#desktop"
                  className="inline-flex items-center gap-2 rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-white/86 transition hover:border-white/42 hover:text-white"
                >
                  查看桌面版边界
                  <LaptopMinimal className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid w-full max-w-xl gap-4 sm:grid-cols-3">
              {productHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[28px] border border-white/12 bg-white/6 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur"
                >
                  <div className="text-sm text-white/52">{item.title}</div>
                  <div className="mt-3 text-2xl font-bold text-white">{item.value}</div>
                  <p className="mt-4 text-sm leading-7 text-white/66">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {webReadyModules.map((item) => {
                const Icon = item.icon
                return (
                  <article
                    key={item.title}
                    className="rounded-[28px] border border-cyan-300/12 bg-[#0d1827]/84 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
                  >
                    <div className="inline-flex rounded-2xl border border-cyan-200/18 bg-cyan-200/10 p-3 text-cyan-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-white/66">{item.detail}</p>
                  </article>
                )
              })}
            </div>
          </section>

          <section id="proof" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <div className="text-sm uppercase tracking-[0.28em] text-amber-200/72">Real Screens</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                评委打开链接，看到的不是概念草图，而是真实产品界面
              </h2>
              <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">
                当前公开的是 Demo 展示层，所以重点展示最能说明产品完成度的几个页面：
                设置中枢、研究缓存看板和复盘详情。
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
              <article className="overflow-hidden rounded-[30px] border border-white/12 bg-[#0f1725]/88 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                <img
                  src={asset("showcase/settings-page-wide.png")}
                  alt="量化培训大师设置中枢截图"
                  className="w-full rounded-[22px] object-cover"
                />
                <div className="mt-4 px-2 pb-2">
                  <div className="text-lg font-semibold text-white">设置中枢</div>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    统一管理数据目录、运行内核、版本信息和产品开关，说明项目已经具备完整的客户端壳层和实际运行入口。
                  </p>
                </div>
              </article>

              <div className="grid gap-6">
                <article className="overflow-hidden rounded-[28px] border border-white/12 bg-white/6 p-4">
                  <img
                    src={asset("showcase/analysis-cache-panel-wide.png")}
                    alt="研究缓存看板截图"
                    className="w-full rounded-[20px] object-cover"
                  />
                  <div className="mt-4 px-1 pb-1">
                    <div className="text-lg font-semibold text-white">研究缓存看板</div>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      展示训练结果沉淀、关键指标和复盘入口，强调这不是只讲概念的教学页面，而是可沉淀成果的训练平台。
                    </p>
                  </div>
                </article>

                <article className="overflow-hidden rounded-[28px] border border-white/12 bg-white/6 p-4">
                  <img
                    src={asset("showcase/analysis-cache-detail.png")}
                    alt="复盘详情截图"
                    className="w-full rounded-[20px] object-cover"
                  />
                  <div className="mt-4 px-1 pb-1">
                    <div className="text-lg font-semibold text-white">复盘详情页</div>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      从净值、持仓到信号细节都能展开说明，让训练结果可验证、可讲解、可保留。
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="curve" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-10 max-w-4xl">
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">Live Backtest</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                直接体验真实回测生成的资金曲线
              </h2>
              <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">
                这里挂载的是本地回测实际生成的静态 HTML 产物，评委不需要安装软件，也能直接拖拽查看资金曲线、指数对比和回撤区间。
              </p>
            </div>

            <div className="rounded-[32px] border border-white/12 bg-[#0f1725]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
              <iframe
                title="量化培训大师真实资金曲线"
                src={asset("showcase/equity-curve.html")}
                className="h-[780px] w-full rounded-[24px] bg-white"
              />
              <div className="mt-5 flex flex-wrap gap-4 px-2 pb-2">
                <a
                  href={asset("showcase/equity-curve.html")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:translate-y-[-1px]"
                >
                  新窗口打开资金曲线
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm text-white/70">
                  <ShieldCheck className="h-4 w-4" />
                  数据来自真实回测产物，仅用于展示产品能力，不构成收益承诺
                </span>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-white/45">Strategy Evaluation</div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  真实策略评价摘要
                </h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {evaluationMetrics.map((item) => (
                    <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-white/52">{item.label}</div>
                      <div className="mt-3 text-2xl font-bold text-white">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[30px] border border-amber-300/14 bg-amber-300/8 p-7">
                <div className="text-sm uppercase tracking-[0.28em] text-amber-100/70">Web vs Desktop</div>
                <h2 className="mt-4 text-3xl font-bold text-white">这个 Demo 站负责展示，桌面版负责执行</h2>
                <div className="mt-6 space-y-4">
                  {desktopOnlyModules.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4 text-sm leading-7 text-white/72">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-5 text-sm leading-8 text-white/70">
                  这也是为什么我们采用 GitHub Pages 来承载比赛版 Demo：
                  公开展示的是产品理解层和静态体验层，核心策略逻辑、本地内核与 QMT 接入链路继续保留在桌面版。
                </div>
              </div>
            </div>
          </section>

          <section id="selection" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="mb-10 max-w-4xl">
              <div className="text-sm uppercase tracking-[0.28em] text-cyan-200/72">Latest Selection</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                最新选股结果也可以直接在网页里看
              </h2>
              <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">
                这里展示的是真实回测产物中的部分最新选股结果。这样评委不打开客户端，也能理解项目最终输出的到底是什么。
              </p>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[#0f1725]/90 shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-white/78">
                  <thead className="bg-white/6 text-xs uppercase tracking-[0.22em] text-white/52">
                    <tr>
                      <th className="px-5 py-4">交易日期</th>
                      <th className="px-5 py-4">股票名称</th>
                      <th className="px-5 py-4">股票代码</th>
                      <th className="px-5 py-4">策略</th>
                      <th className="px-5 py-4">持仓周期</th>
                      <th className="px-5 py-4">目标资金占比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestSelections.map((row) => (
                      <tr key={`${row.code}-${row.strategy}`} className="border-t border-white/8">
                        <td className="px-5 py-4 text-white/66">{row.date}</td>
                        <td className="px-5 py-4 font-medium text-white">{row.name}</td>
                        <td className="px-5 py-4 text-cyan-100/78">{row.code}</td>
                        <td className="px-5 py-4 text-white/70">{row.strategy}</td>
                        <td className="px-5 py-4 text-white/70">{row.cycle}</td>
                        <td className="px-5 py-4 text-white/70">{row.ratio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.28em] text-amber-200/72">Experience Path</div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  比赛版 Demo 的最佳体验路径
                </h2>
                <div className="mt-8 space-y-4">
                  {journeySteps.map((item) => (
                    <div key={item.step} className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl font-black text-amber-200">{item.step}</div>
                        <div>
                          <div className="text-lg font-semibold text-white">{item.title}</div>
                          <p className="mt-2 text-sm leading-7 text-white/66">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside
                id="desktop"
                className="rounded-[32px] border border-cyan-300/14 bg-cyan-300/8 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
              >
                <div className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">Desktop Required</div>
                <h2 className="mt-4 text-3xl font-bold text-white">什么时候一定要用桌面版</h2>
                <div className="mt-6 space-y-4 text-sm leading-8 text-white/72">
                  <div className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4">
                    当需要连接 QMT、读取本地券商环境或执行本地交易链路时，必须切换桌面版。
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4">
                    当需要访问本地数据中心、运行长任务、管理策略目录或调度 Python 内核时，必须切换桌面版。
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/12 px-5 py-4">
                    当需要把研究结果真正落盘、沉淀到本地回测目录或接入后续实盘流程时，必须切换桌面版。
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://github.com/CHANGGELY/quant-training-master-demo"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:translate-y-[-1px]"
                  >
                    查看 Demo 仓库
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#curve"
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 px-5 py-3 text-sm font-semibold text-white/86 transition hover:border-white/36 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    先体验网页版 Demo
                  </a>
                </div>
              </aside>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-black/35 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-white/54 lg:px-8">
            <div className="flex items-center gap-4">
              <img src={asset("logo/lockup-b.svg")} alt="量化培训大师标识" className="h-6 invert opacity-85" />
              <div>{projectName} Demo Site</div>
            </div>
            <div>主体单位：{companyName}</div>
            <div className="inline-flex items-center gap-2">
              <FolderLock className="h-4 w-4" />
              核心策略实现、本地执行内核与 QMT 接入链路不在本公开仓库中。
            </div>
            <div>声明：本网站聚焦产品展示与职业技能训练演示，不承诺投资收益，回测结果不代表未来表现。</div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  )
}

export default App
