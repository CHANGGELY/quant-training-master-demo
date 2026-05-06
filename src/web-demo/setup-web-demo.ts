import { AKSHARE_PRODUCT_CATALOG } from "@/shared/akshare-products"

type AnyRecord = Record<string, any>
type Listener = (...args: any[]) => void

const DESKTOP_ONLY_MESSAGE =
	"连接 QMT 与实盘功能仅支持客户端，下载客户端后才可使用。"
const CLIENT_RELEASE_URL =
	"https://github.com/CHANGGELY/quant-training-master-downloads/releases/tag/v1.0.0"
const CLIENT_DOWNLOAD_URL =
	"https://github.com/CHANGGELY/quant-training-master-downloads/releases/download/v1.0.0/QuantTrainingMaster-1.0.0.exe"
const WEB_DEMO_RESULT_PATH =
	"D:\\aaxiangmu\\项目\\量化项目\\币股数据中心\\real_trading\\data\\回测结果\\选股精心随机混合（标准版）"
const WEB_DEMO_DATA_PATH = "D:\\aaxiangmu\\项目\\量化项目\\币股数据中心"
const FORUM_STORAGE_KEY = "web-demo.forum-state"
const PAPER_TRADING_STORAGE_KEY = "web-demo.paper-trading-state"

const pageBaseUrl = new URL("./", window.location.href.split("#")[0]).toString()
const staticAssetBaseUrl = new URL("../../", pageBaseUrl).toString()

const assetUrl = (relativePath: string) =>
	new URL(relativePath, staticAssetBaseUrl).toString()

const cloneValue = <T>(value: T): T => {
	if (typeof structuredClone === "function") {
		return structuredClone(value)
	}
	return JSON.parse(JSON.stringify(value)) as T
}

const isPlainObject = (value: unknown): value is AnyRecord =>
	typeof value === "object" && value !== null && !Array.isArray(value)

const mergeWithDefault = <T>(fallback: T, value: unknown): T => {
	if (Array.isArray(fallback)) {
		return (Array.isArray(value) ? value : fallback) as T
	}
	if (isPlainObject(fallback) && isPlainObject(value)) {
		return { ...fallback, ...value } as T
	}
	return (value === undefined ? fallback : value) as T
}

const readStorageValue = <T>(key: string, fallback: T): T => {
	const raw = window.localStorage.getItem(key)
	if (raw === null) return cloneValue(fallback)
	try {
		return mergeWithDefault(fallback, JSON.parse(raw))
	} catch {
		return cloneValue(fallback)
	}
}

const writeStorageValue = (key: string, value: unknown) => {
	window.localStorage.setItem(key, JSON.stringify(value))
}

const ensureStorageValue = <T>(key: string, fallback: T): T => {
	const value = readStorageValue(key, fallback)
	writeStorageValue(key, value)
	return value
}

let desktopOnlyDialogHost: HTMLDivElement | null = null

const closeDesktopOnlyDialog = () => {
	desktopOnlyDialogHost?.remove()
	desktopOnlyDialogHost = null
}

const openWebDemoUrl = (url: string) => {
	window.open(url, "_blank", "noopener,noreferrer")
}

const notifyDesktopOnly = (message = DESKTOP_ONLY_MESSAGE) => {
	closeDesktopOnlyDialog()

	const host = document.createElement("div")
	host.setAttribute("data-web-demo-desktop-only", "true")
	host.style.position = "fixed"
	host.style.inset = "0"
	host.style.zIndex = "9999"
	host.style.display = "flex"
	host.style.alignItems = "center"
	host.style.justifyContent = "center"
	host.style.padding = "24px"
	host.style.background = "rgba(15, 23, 42, 0.52)"
	host.style.backdropFilter = "blur(6px)"

	const panel = document.createElement("div")
	panel.style.width = "min(560px, 100%)"
	panel.style.borderRadius = "24px"
	panel.style.border = "1px solid rgba(148, 163, 184, 0.28)"
	panel.style.background =
		"linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.96))"
	panel.style.boxShadow = "0 32px 80px rgba(15, 23, 42, 0.28)"
	panel.style.padding = "24px"
	panel.style.color = "#0f172a"

	const badge = document.createElement("div")
	badge.textContent = "桌面版能力"
	badge.style.display = "inline-flex"
	badge.style.alignItems = "center"
	badge.style.gap = "6px"
	badge.style.padding = "6px 10px"
	badge.style.borderRadius = "999px"
	badge.style.background = "#fff7ed"
	badge.style.color = "#c2410c"
	badge.style.fontSize = "12px"
	badge.style.fontWeight = "700"

	const title = document.createElement("h3")
	title.textContent = "这一步需要下载客户端"
	title.style.margin = "16px 0 8px"
	title.style.fontSize = "24px"
	title.style.lineHeight = "32px"
	title.style.fontWeight = "800"

	const description = document.createElement("p")
	description.textContent = message
	description.style.margin = "0"
	description.style.fontSize = "14px"
	description.style.lineHeight = "22px"
	description.style.color = "#475569"

	const helper = document.createElement("p")
	helper.textContent =
		"网页 Demo 会保留完整页面与真实回测展示；真正依赖本地 QMT、桌面进程和本地文件系统的动作，请切换到 Windows 客户端。"
	helper.style.margin = "12px 0 0"
	helper.style.fontSize = "13px"
	helper.style.lineHeight = "20px"
	helper.style.color = "#64748b"

	const buttonRow = document.createElement("div")
	buttonRow.style.display = "flex"
	buttonRow.style.flexWrap = "wrap"
	buttonRow.style.gap = "12px"
	buttonRow.style.marginTop = "20px"

	const downloadButton = document.createElement("button")
	downloadButton.type = "button"
	downloadButton.textContent = "下载客户端"
	downloadButton.style.border = "0"
	downloadButton.style.borderRadius = "14px"
	downloadButton.style.background = "#111827"
	downloadButton.style.color = "#ffffff"
	downloadButton.style.padding = "12px 18px"
	downloadButton.style.fontSize = "14px"
	downloadButton.style.fontWeight = "700"
	downloadButton.style.cursor = "pointer"
	downloadButton.addEventListener("click", () => {
		openWebDemoUrl(CLIENT_DOWNLOAD_URL)
	})

	const releaseButton = document.createElement("button")
	releaseButton.type = "button"
	releaseButton.textContent = "查看版本页"
	releaseButton.style.border = "1px solid #cbd5e1"
	releaseButton.style.borderRadius = "14px"
	releaseButton.style.background = "#ffffff"
	releaseButton.style.color = "#0f172a"
	releaseButton.style.padding = "12px 18px"
	releaseButton.style.fontSize = "14px"
	releaseButton.style.fontWeight = "600"
	releaseButton.style.cursor = "pointer"
	releaseButton.addEventListener("click", () => {
		openWebDemoUrl(CLIENT_RELEASE_URL)
	})

	const closeButton = document.createElement("button")
	closeButton.type = "button"
	closeButton.textContent = "继续浏览 Demo"
	closeButton.style.border = "1px solid transparent"
	closeButton.style.borderRadius = "14px"
	closeButton.style.background = "#f8fafc"
	closeButton.style.color = "#475569"
	closeButton.style.padding = "12px 18px"
	closeButton.style.fontSize = "14px"
	closeButton.style.fontWeight = "600"
	closeButton.style.cursor = "pointer"
	closeButton.addEventListener("click", () => {
		closeDesktopOnlyDialog()
	})

	buttonRow.append(downloadButton, releaseButton, closeButton)
	panel.append(badge, title, description, helper, buttonRow)
	host.append(panel)

	host.addEventListener("click", (event) => {
		if (event.target === host) {
			closeDesktopOnlyDialog()
		}
	})

	document.addEventListener(
		"keydown",
		(event) => {
			if (event.key === "Escape" && desktopOnlyDialogHost) {
				closeDesktopOnlyDialog()
			}
		},
		{ once: true },
	)

	document.body.append(host)
	desktopOnlyDialogHost = host
}

const numericLikePattern = /^-?\d+(?:\.\d+)?$/

const splitCsvLine = (line: string) => {
	const cells: string[] = []
	let current = ""
	let inQuotes = false

	for (let index = 0; index < line.length; index += 1) {
		const char = line[index]
		const next = line[index + 1]

		if (char === '"') {
			if (inQuotes && next === '"') {
				current += '"'
				index += 1
				continue
			}
			inQuotes = !inQuotes
			continue
		}

		if (char === "," && !inQuotes) {
			cells.push(current)
			current = ""
			continue
		}

		current += char
	}

	cells.push(current)
	return cells.map((cell) => cell.trim())
}

const parseCsvText = (text: string) => {
	const cleaned = text.replace(/^\uFEFF/, "").trim()
	if (!cleaned) return []

	const lines = cleaned.split(/\r?\n/)
	const headers = splitCsvLine(lines[0])

	return lines.slice(1).map((line) => {
		const values = splitCsvLine(line)
		return headers.reduce<AnyRecord>((record, header, index) => {
			const raw = values[index] ?? ""
			record[header] =
				raw !== "" && numericLikePattern.test(raw) ? Number(raw) : raw
			return record
		}, {})
	})
}

const loadCsvRows = async (fileName: string) => {
	const response = await window.fetch(
		assetUrl(`./web-demo/backtest/${fileName}`),
	)
	const text = await response.text()
	return parseCsvText(text)
}

const currentIso = new Date().toISOString()
const currentTimestamp = Math.floor(Date.now() / 1000)

const buildProductStatus = () =>
	Object.fromEntries(
		AKSHARE_PRODUCT_CATALOG.map((item, index) => [
			item.name,
			{
				name: item.name,
				fullData: item.fullData,
				displayName: item.displayName,
				source: item.source,
				category: item.category,
				frequency: item.frequency,
				summary: item.summary,
				caution: item.caution,
				availability: item.availability,
				implemented: item.implemented,
				supportsIncremental: item.supportsIncremental,
				dataTime: index === 1 ? "2026-04-18" : "2026-04-19",
				dataContentTime: index === 1 ? "2026-04-18" : "2026-04-19",
				lastUpdateTime: currentIso,
				updateTime: currentIso,
				nextUpdateTime: null,
				isAutoUpdate: 1,
				canAutoUpdate: item.supportsIncremental ? 1 : 0,
				sourceHasUpdate: false,
				legacyStatus: false,
				statusHint: null,
			},
		]),
	)

const demoProductStatusMap = buildProductStatus()
const demoProductRows = Object.values(demoProductStatusMap)

const demoStrategyOptions = [
	{
		name: "小市值_行业高分红",
		fullName: "小市值_行业高分红",
		config: [
			{ title: "换仓周期", values: ["W_1", "W_2", "W_3"] },
			{ title: "选股个数", values: [5, 8, 10] },
		],
	},
	{
		name: "中等生策略",
		fullName: "中等生策略",
		config: [
			{ title: "换仓周期", values: ["W_2", "W_4"] },
			{ title: "选股个数", values: [5, 10, 15] },
		],
	},
]

const demoStrategySubscriptionRows = [
	{
		key: "小市值_行业高分红&W_3&5",
		name: "小市值_行业高分红",
		displayName: "小市值_行业高分红",
		period: "W_3",
		select_num: "5",
		buy_time: "09:35:00",
		info: {
			name: "小市值_行业高分红",
			displayName: "小市值_行业高分红",
		},
	},
	{
		key: "中等生策略&W_2&10",
		name: "中等生策略",
		displayName: "中等生策略",
		period: "W_2",
		select_num: "10",
		buy_time: "09:40:00",
		info: {
			name: "中等生策略",
			displayName: "中等生策略",
		},
	},
]

const demoRandomStrategyLibrary = [
	{
		id: "mix-dingfengbo-2425__0",
		exists: true,
		title: "选股精心随机混合（标准版）",
		package_id: "mix-dingfengbo-2425",
		source_root:
			"D:\\aaxiangmu\\项目\\非量化项目\\比赛\\quantclass-client-pro\\build\\flagship-strategies\\选股策略精心随机混合、定风波精心随机_2425_v8",
		library_type: "select",
		strategy_kind: "select",
		teaching_stage: "26年主课",
		teaching_category: "选股旗舰",
		description:
			"网页演示站直接复用客户端里的旗舰策略入口，点击后会把这条策略载入当前页面的回测上下文。",
		hold_period: "W_3",
		rebalance_time: "close-open",
		offset_list: [0],
		component_count: 1,
		backtest_name: "选股精心随机混合（标准版）",
		strategy: {
			name: "选股精心随机混合（标准版）",
			strategy_type: "select",
			select_num: 5,
			offset_list: [0],
			cap_weight: 100,
			hold_period: "W_3",
			rebalance_time: "close-open",
			factor_list: [],
			filter_list: [],
		},
	},
]

const demoPositionStrategyRows = [
	{
		策略名称: "X1-选股精心随机混合#0.小市值_行业高分红",
		理论占比: 0.2,
		实际占比: 0.18,
		策略仓位: 0.2,
		占用资金: 198000,
		当日盈亏: 2680,
		当日收益率: 0.0135,
	},
	{
		策略名称: "X1-选股精心随机混合#1.中等生策略",
		理论占比: 0.15,
		实际占比: 0.14,
		策略仓位: 0.15,
		占用资金: 151000,
		当日盈亏: 980,
		当日收益率: 0.0064,
	},
]

const demoPositionStockRows = [
	{
		策略名称: "X1-选股精心随机混合#0.小市值_行业高分红",
		证券代码: "sh600051",
		证券名称: "宁波联合",
		持仓量: 800,
		占比: 0.06,
		offset: "W_3",
		当日盈亏: 560,
		当日收益率: 0.012,
		累计盈亏: 4180,
		累计收益率: 0.082,
		"滑点（‰）": "0.6",
	},
]

const emptyPaperTradingState = (initialCapital = 1_000_000) => ({
	account: {
		initialized: false,
		initial_capital: initialCapital,
		cash: initialCapital,
		market_value: 0,
		total_asset: initialCapital,
		total_pnl: 0,
		total_pnl_rate: 0,
		daily_pnl: 0,
		daily_pnl_rate: 0,
		position_count: 0,
		trade_count: 0,
		import_source: "",
		last_selection_date: "",
		latest_price_date: "",
		update_time: currentTimestamp,
	},
	positions: {
		update_time: currentTimestamp,
		data: [],
	},
	trades: {
		update_time: currentTimestamp,
		data: [],
	},
})

const buildImportedPaperTradingState = (
	rows: AnyRecord[],
	sourceName: string,
	initialCapital: number,
) => {
	const selected = rows.slice(0, 6)
	const positions = selected.map((row, index) => {
		const price = 12 + index * 2.35
		const shares = 100 * (index + 3)
		const marketValue = Number((price * shares).toFixed(2))
		const latestPrice = Number(
			(price * (1 + (index % 2 === 0 ? 0.03 : -0.01))).toFixed(2),
		)
		const pnl = Number(((latestPrice - price) * shares).toFixed(2))
		return {
			策略名称: row.策略 ?? `策略 ${index + 1}`,
			证券代码: row.股票代码 ?? "",
			股票名称: row.股票名称 ?? "",
			建仓日期: row.交易日期 ?? row.选股日期 ?? "2026-02-05",
			持仓股数: shares,
			持仓均价: price,
			最新价: latestPrice,
			最新价日期: "2026-04-18",
			目标占比: Number(row.目标资金占比 ?? 0),
			实际占比: Number(row.目标资金占比 ?? 0),
			持仓市值: Number((latestPrice * shares).toFixed(2)),
			浮动盈亏: pnl,
			浮动收益率: Number((pnl / marketValue).toFixed(4)),
			备注: "网页演示站导入",
		}
	})

	const trades = positions.map((position) => ({
		成交时间: `${position.建仓日期} 09:35:00`,
		方向: "买入",
		策略名称: position.策略名称,
		证券代码: position.证券代码,
		股票名称: position.股票名称,
		成交价格: position.持仓均价,
		成交股数: position.持仓股数,
		成交金额: Number((position.持仓均价 * position.持仓股数).toFixed(2)),
		备注: "回测结果导入",
	}))

	const marketValue = positions.reduce(
		(sum, position) => sum + position.持仓市值,
		0,
	)
	const totalPnl = positions.reduce(
		(sum, position) => sum + position.浮动盈亏,
		0,
	)
	const cash = Number((initialCapital - marketValue).toFixed(2))

	return {
		account: {
			initialized: true,
			initial_capital: initialCapital,
			cash,
			market_value: Number(marketValue.toFixed(2)),
			total_asset: Number((cash + marketValue).toFixed(2)),
			total_pnl: Number(totalPnl.toFixed(2)),
			total_pnl_rate: Number((totalPnl / initialCapital).toFixed(4)),
			daily_pnl: Number((totalPnl * 0.2).toFixed(2)),
			daily_pnl_rate: Number((totalPnl / initialCapital / 5).toFixed(4)),
			position_count: positions.length,
			trade_count: trades.length,
			import_source: sourceName,
			last_selection_date: String(selected[0]?.选股日期 ?? "2026-02-04"),
			latest_price_date: "2026-04-18",
			update_time: currentTimestamp,
		},
		positions: {
			update_time: currentTimestamp,
			data: positions,
		},
		trades: {
			update_time: currentTimestamp,
			data: trades,
		},
	}
}

const readPaperTradingState = () =>
	readStorageValue(PAPER_TRADING_STORAGE_KEY, emptyPaperTradingState(1_000_000))

const writePaperTradingState = (value: AnyRecord) => {
	writeStorageValue(PAPER_TRADING_STORAGE_KEY, value)
	return cloneValue(value)
}

const demoMonitorProcesses = [
	{
		pid: 4208,
		action: "AkShare 数据增量同步",
		kernel: "fuel",
		createdAt: currentIso,
	},
	{
		pid: 5560,
		action: "旗舰策略回测预览",
		kernel: "zeus",
		createdAt: currentIso,
	},
]

const demoBuyPlans = [
	{
		证券代码: "600051.SH",
		交易日期: Date.now(),
		策略名称: "X1-选股精心随机混合#0.小市值_行业高分红",
		offset: "W_3",
		其他: "网页演示站展示版",
		分配金额: 24000,
		预计交易时间: "09:35:00",
		是否下单: "否",
		委托编号: "",
		成交均价: undefined,
		订单标记: "等待客户端连接 QMT",
	},
]

const demoSellPlans = [
	{
		交易日期: Date.now(),
		策略名称: "X1-选股精心随机混合#1.中等生策略",
		卖出数量: 500,
		证券代码: "603519.SH",
		其他: "网页演示站展示版",
		预计交易时间: "14:50:00",
		是否下单: "否",
		委托编号: "",
		订单标记: "等待客户端连接 QMT",
	},
]

const readStrategyChartHtml = async () => {
	const response = await window.fetch(
		assetUrl("./web-demo/backtest/资金曲线.html"),
	)
	const html = await response.text()
	return {
		success: true,
		data: html,
		filePath: `${WEB_DEMO_RESULT_PATH}\\资金曲线.html`,
		updatedAt: currentIso,
	}
}

const buildAnalysisCacheList = async () => {
	const rows = await loadCsvRows("资金曲线.csv")
	const latest = rows.at(-1) ?? {}
	return [
		{
			name: "选股精心随机混合（标准版）",
			generatedAt: currentIso,
			resultFolderPath: WEB_DEMO_RESULT_PATH,
			artifactCount: 4,
			artifactsReady: 4,
			latestNetValue: Number(latest.净值 ?? 1.09),
			latestDrawdown: Number(latest.净值dd2here ?? -0.0173),
			hourlyNetValue: Number(latest.净值 ?? 1.09),
		},
	]
}

const buildAnalysisCacheDetail = async () => ({
	name: "选股精心随机混合（标准版）",
	generatedAt: currentIso,
	resultFolderPath: WEB_DEMO_RESULT_PATH,
	manifest: {
		generated_at: currentIso,
		artifacts: {
			equity: { status: "ready" },
			latest_selection: { status: "ready" },
			evaluation: { status: "ready" },
			chart: { status: "ready" },
		},
	},
	equitySeries: (await loadCsvRows("资金曲线.csv")).slice(-40).map((row) => ({
		交易日期: row.交易日期,
		净值: Number(row.净值 ?? 0),
		回撤: Number(row.净值dd2here ?? 0),
		总资产: Number(row.总资产 ?? 0),
	})),
	holdings: (await loadCsvRows("最新选股结果.csv")).slice(0, 20),
	timingSignals: [
		{
			选股日期: "2026-02-04",
			策略: "X1-选股精心随机混合#0.小市值_行业高分红",
			择时信号: 1,
		},
		{
			选股日期: "2026-02-04",
			策略: "X1-选股精心随机混合#1.中等生策略",
			择时信号: 1,
		},
	],
})

const buildForumSeedState = () => {
	const sections = [
		{
			id: "review",
			name: "回测复盘",
			description: "沉淀回测结果、参数调整和净值观察。",
			color: "#0ea5e9",
		},
		{
			id: "strategy",
			name: "策略训练",
			description: "围绕选股逻辑、择时和仓位管理做专题训练。",
			color: "#22c55e",
		},
		{
			id: "qa",
			name: "助教答疑",
			description: "记录课堂提问、排障过程和高频问题。",
			color: "#f97316",
		},
	]

	const authors = {
		mentor: {
			id: "mentor",
			name: "量化助教",
			role: "课程助教",
			initials: "助",
			accent: "linear-gradient(135deg,#0284c7,#38bdf8)",
		},
		student: {
			id: "student",
			name: "训练同学",
			role: "实训学员",
			initials: "训",
			accent: "linear-gradient(135deg,#7c3aed,#a78bfa)",
		},
	}

	return {
		sections,
		adSlots: [
			{
				id: "slot-home-top",
				name: "首页顶部推荐位",
				placement: "训练社区首页 / Hero 下方",
				description: "适合放训练营活动、直播复盘和重要专题入口。",
				status: "规划中",
				pricingModel: "CPT",
				note: "当前是演示位，正式版会补充审核与投放约束。",
				updatedAt: currentIso,
			},
		],
		threads: [
			{
				id: "thread-review-001",
				sectionId: "review",
				author: authors.mentor,
				title: "选股精心随机混合：标准版最近一轮回测怎么读资金曲线",
				summary:
					"把年化、回撤、资金曲线和最新选股结果放到一个统一上下文里看，评审一打开就能理解这套产品到底在训练什么。",
				body: "这次标准版回测最值得先看的不是单日收益，而是净值、回撤和最新选股结果之间的对应关系。\n\n1. 先看资金曲线是否稳定抬升。\n2. 再看回撤是否出现在可以解释的区间。\n3. 最后回到最新选股结果，确认策略名称、持仓周期和换仓时间是否一致。\n\n网页演示站这里直接展示了客户端真实回测产物，所以评委在浏览器里看到的页面结构，会和桌面版保持一致。",
				publishedAt: "2026-04-18T09:30:00+08:00",
				updatedAt: "2026-04-18T11:20:00+08:00",
				isFeatured: true,
				isPinned: true,
				viewCount: 126,
				likeCount: 36,
				favoriteCount: 18,
				commentCount: 2,
				tags: [
					{ id: "tag-review", name: "复盘", color: "#0ea5e9" },
					{ id: "tag-equity", name: "资金曲线", color: "#14b8a6" },
				],
				comments: [
					{
						id: "comment-001",
						author: authors.student,
						content:
							"这版最直观的是把资金曲线直接保留在回测页里了，不需要再跳外部浏览器。",
						createdAt: "2026-04-18T12:05:00+08:00",
					},
					{
						id: "comment-002",
						author: authors.mentor,
						content:
							"对，评审看 demo 的时候最怕断上下文，所以这次网页端也直接复用同一套页面结构。",
						createdAt: "2026-04-18T12:18:00+08:00",
					},
				],
			},
			{
				id: "thread-strategy-001",
				sectionId: "strategy",
				author: authors.student,
				title:
					"为什么网页演示站保留了完整页面，但把 QMT 连接动作拦成客户端下载提示",
				summary:
					"客户端和网页端页面完全一致，但真正需要本地终端和 QMT 的能力，会在网页端提示下载客户端。",
				body: "这不是阉割页面，而是把前端界面和本地能力做了边界划分。\n\n网页端保留页面、路由、配置、回测结果和训练社区；真正涉及 QMT、本地进程、本地文件系统的动作，在浏览器里统一提示“下载客户端后才可使用”。这样评委能完整看到产品形态，又不会误以为浏览器可以直接接本地券商终端。",
				publishedAt: "2026-04-17T16:20:00+08:00",
				updatedAt: "2026-04-17T18:10:00+08:00",
				isFeatured: true,
				isPinned: false,
				viewCount: 82,
				likeCount: 24,
				favoriteCount: 10,
				commentCount: 1,
				tags: [
					{ id: "tag-demo", name: "Demo", color: "#7c3aed" },
					{ id: "tag-qmt", name: "QMT", color: "#f97316" },
				],
				comments: [
					{
						id: "comment-003",
						author: authors.mentor,
						content:
							"这也是最稳的产品边界：评审体验完整界面，真实交易与本地连接仍然只在客户端里完成。",
						createdAt: "2026-04-17T18:22:00+08:00",
					},
				],
			},
		],
		drafts: [],
		favorites: {
			量化评审: ["thread-review-001"],
		},
		recentViews: {
			量化评审: ["thread-review-001", "thread-strategy-001"],
		},
	}
}

const readForumState = () =>
	readStorageValue(FORUM_STORAGE_KEY, buildForumSeedState())

const writeForumState = (value: AnyRecord) => {
	writeStorageValue(FORUM_STORAGE_KEY, value)
	return cloneValue(value)
}

const withThreadCounts = (forumState: AnyRecord) =>
	forumState.sections.map((section: AnyRecord) => ({
		...section,
		threadCount: forumState.threads.filter(
			(thread: AnyRecord) => thread.sectionId === section.id,
		).length,
	}))

const buildThreadSummary = (
	forumState: AnyRecord,
	thread: AnyRecord,
	userName = "",
) => {
	const section = forumState.sections.find(
		(item: AnyRecord) => item.id === thread.sectionId,
	)
	const favoriteList = forumState.favorites[userName] ?? []
	return {
		id: thread.id,
		sectionId: thread.sectionId,
		sectionName: section?.name ?? "未分类",
		sectionColor: section?.color ?? "#64748b",
		author: thread.author,
		title: thread.title,
		summary: thread.summary,
		publishedAt: thread.publishedAt,
		updatedAt: thread.updatedAt,
		isFeatured: Boolean(thread.isFeatured),
		isPinned: Boolean(thread.isPinned),
		viewCount: Number(thread.viewCount ?? 0),
		likeCount: Number(thread.likeCount ?? 0),
		favoriteCount: Number(thread.favoriteCount ?? 0),
		commentCount: Number(thread.commentCount ?? thread.comments?.length ?? 0),
		tags: thread.tags ?? [],
		isFavorited: favoriteList.includes(thread.id),
	}
}

const buildThreadDetail = (
	forumState: AnyRecord,
	threadId: string,
	userName = "",
) => {
	const thread = forumState.threads.find(
		(item: AnyRecord) => item.id === threadId,
	)
	if (!thread) {
		throw new Error("未找到对应帖子")
	}

	const relatedThreads = forumState.threads
		.filter(
			(item: AnyRecord) =>
				item.id !== thread.id && item.sectionId === thread.sectionId,
		)
		.slice(0, 4)
		.map((item: AnyRecord) => buildThreadSummary(forumState, item, userName))

	return {
		...buildThreadSummary(forumState, thread, userName),
		body: thread.body,
		comments: thread.comments ?? [],
		relatedThreads,
	}
}

const buildForumOverview = (forumState: AnyRecord) => {
	const threads = [...forumState.threads].sort(
		(left, right) =>
			new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
	)
	return {
		sections: withThreadCounts(forumState),
		featuredThreads: threads
			.filter((thread: AnyRecord) => thread.isFeatured)
			.map((thread: AnyRecord) => buildThreadSummary(forumState, thread)),
		recentThreads: threads
			.slice(0, 8)
			.map((thread: AnyRecord) => buildThreadSummary(forumState, thread)),
		stats: {
			totalThreads: threads.length,
			totalComments: threads.reduce(
				(sum: number, thread: AnyRecord) =>
					sum + Number(thread.comments?.length ?? 0),
				0,
			),
			featuredCount: threads.filter((thread: AnyRecord) => thread.isFeatured)
				.length,
			activeLearners: new Set(
				threads.map((thread: AnyRecord) => thread.author.name),
			).size,
		},
	}
}

const jsonResponse = (data: unknown, status = 200) =>
	new Response(
		JSON.stringify({
			code: status,
			message: status === 200 ? "success" : "error",
			data,
		}),
		{
			status,
			headers: { "Content-Type": "application/json; charset=utf-8" },
		},
	)

const readJsonBody = (init?: RequestInit) => {
	if (!init?.body || typeof init.body !== "string") return {}
	try {
		return JSON.parse(init.body)
	} catch {
		return {}
	}
}

const listenerBuckets = {
	scheduleStatus: new Set<Listener>(),
	powerMonitor: new Set<Listener>(),
	updateStatus: new Set<Listener>(),
	reportError: new Set<Listener>(),
}

const emitScheduleStatus = (status: string) => {
	for (const listener of listenerBuckets.scheduleStatus) {
		listener({}, status)
	}
}

const touchProductStatus = () => {
	const nextRows = demoProductRows.map((row) => ({
		...row,
		lastUpdateTime: new Date().toISOString(),
		updateTime: new Date().toISOString(),
	}))
	writeStorageValue("data_map", nextRows)
}

const handleForumRequest = async (url: URL, init?: RequestInit) => {
	const forumState = readForumState()
	const method = (init?.method ?? "GET").toUpperCase()
	const path = url.pathname.replace(/^\/forum/, "")
	const queryUser = url.searchParams.get("userName") ?? ""

	if (path === "/overview" && method === "GET") {
		return jsonResponse(buildForumOverview(forumState))
	}

	if (path === "/ad-slots" && method === "GET") {
		return jsonResponse(forumState.adSlots)
	}

	if (path === "/drafts" && method === "GET") {
		const authorName = url.searchParams.get("authorName") ?? ""
		return jsonResponse(
			forumState.drafts.filter(
				(item: AnyRecord) => item.authorName === authorName,
			),
		)
	}

	if (path === "/drafts" && method === "POST") {
		const body = readJsonBody(init)
		const nextDraft = {
			id: body.id || `draft-${Date.now()}`,
			authorName: body.authorName ?? "",
			sectionId: body.sectionId ?? "review",
			title: body.title ?? "",
			summary: body.summary ?? "",
			body: body.body ?? "",
			tagsText: body.tagsText ?? "",
			updatedAt: new Date().toISOString(),
		}
		forumState.drafts = forumState.drafts.filter(
			(item: AnyRecord) => item.id !== nextDraft.id,
		)
		forumState.drafts.unshift(nextDraft)
		writeForumState(forumState)
		return jsonResponse(nextDraft)
	}

	if (path.startsWith("/drafts/") && method === "DELETE") {
		const draftId = path.split("/").at(-1) ?? ""
		forumState.drafts = forumState.drafts.filter(
			(item: AnyRecord) => item.id !== draftId,
		)
		writeForumState(forumState)
		return jsonResponse({ id: draftId })
	}

	if (path === "/favorites" && method === "GET") {
		const favoriteIds = forumState.favorites[queryUser] ?? []
		const data = favoriteIds
			.map((id: string) =>
				forumState.threads.find((thread: AnyRecord) => thread.id === id),
			)
			.filter(Boolean)
			.map((thread: AnyRecord) =>
				buildThreadSummary(forumState, thread, queryUser),
			)
		return jsonResponse(data)
	}

	if (path === "/recent-views" && method === "GET") {
		const recentIds = forumState.recentViews[queryUser] ?? []
		const data = recentIds
			.map((id: string) =>
				forumState.threads.find((thread: AnyRecord) => thread.id === id),
			)
			.filter(Boolean)
			.map((thread: AnyRecord) =>
				buildThreadSummary(forumState, thread, queryUser),
			)
		return jsonResponse(data)
	}

	if (path === "/my-comments" && method === "GET") {
		const data = forumState.threads.flatMap((thread: AnyRecord) =>
			(thread.comments ?? [])
				.filter((comment: AnyRecord) => comment.author.name === queryUser)
				.map((comment: AnyRecord) => ({
					id: comment.id,
					content: comment.content,
					createdAt: comment.createdAt,
					thread: buildThreadSummary(forumState, thread, queryUser),
				})),
		)
		return jsonResponse(data)
	}

	if (path === "/threads" && method === "POST") {
		const body = readJsonBody(init)
		const thread = {
			id: `thread-${Date.now()}`,
			sectionId: body.sectionId ?? "review",
			author: {
				id: `author-${body.authorName ?? "learner"}`,
				name: body.authorName ?? "训练同学",
				role: "网页演示用户",
				initials: String(body.authorName ?? "训").slice(0, 1),
				accent: "linear-gradient(135deg,#0f172a,#334155)",
			},
			title: body.title ?? "未命名训练帖",
			summary: body.summary ?? "",
			body: body.body ?? "",
			publishedAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			isFeatured: false,
			isPinned: false,
			viewCount: 1,
			likeCount: 0,
			favoriteCount: 0,
			commentCount: 0,
			tags: (body.tags ?? []).map((name: string, index: number) => ({
				id: `tag-${Date.now()}-${index}`,
				name,
				color: ["#0ea5e9", "#22c55e", "#f97316", "#7c3aed"][index % 4],
			})),
			comments: [],
		}
		forumState.threads.unshift(thread)
		writeForumState(forumState)
		return jsonResponse(
			buildThreadDetail(forumState, thread.id, body.authorName ?? ""),
		)
	}

	if (/^\/threads\/[^/]+$/.test(path) && method === "GET") {
		const threadId = path.split("/").at(-1) ?? ""
		return jsonResponse(buildThreadDetail(forumState, threadId))
	}

	if (/^\/threads\/[^/]+\/view$/.test(path) && method === "POST") {
		const threadId = path.split("/")[2] ?? ""
		const body = readJsonBody(init)
		const thread = forumState.threads.find(
			(item: AnyRecord) => item.id === threadId,
		)
		if (!thread) return jsonResponse({ message: "未找到帖子" }, 404)
		thread.viewCount = Number(thread.viewCount ?? 0) + 1
		thread.updatedAt = new Date().toISOString()
		if (body.viewerName) {
			const bucket = forumState.recentViews[body.viewerName] ?? []
			forumState.recentViews[body.viewerName] = [
				threadId,
				...bucket.filter((item: string) => item !== threadId),
			].slice(0, 8)
		}
		writeForumState(forumState)
		return jsonResponse(
			buildThreadDetail(forumState, threadId, body.viewerName ?? ""),
		)
	}

	if (/^\/threads\/[^/]+\/comments$/.test(path) && method === "POST") {
		const threadId = path.split("/")[2] ?? ""
		const body = readJsonBody(init)
		const thread = forumState.threads.find(
			(item: AnyRecord) => item.id === threadId,
		)
		if (!thread) return jsonResponse({ message: "未找到帖子" }, 404)
		thread.comments.push({
			id: `comment-${Date.now()}`,
			author: {
				id: `author-${body.authorName ?? "learner"}`,
				name: body.authorName ?? "训练同学",
				role: "网页演示用户",
				initials: String(body.authorName ?? "训").slice(0, 1),
				accent: "linear-gradient(135deg,#0f172a,#334155)",
			},
			content: body.content ?? "",
			createdAt: new Date().toISOString(),
		})
		thread.commentCount = thread.comments.length
		thread.updatedAt = new Date().toISOString()
		writeForumState(forumState)
		return jsonResponse(
			buildThreadDetail(forumState, threadId, body.authorName ?? ""),
		)
	}

	if (/^\/threads\/[^/]+\/flags$/.test(path) && method === "PATCH") {
		const threadId = path.split("/")[2] ?? ""
		const body = readJsonBody(init)
		const thread = forumState.threads.find(
			(item: AnyRecord) => item.id === threadId,
		)
		if (!thread) return jsonResponse({ message: "未找到帖子" }, 404)
		thread.isFeatured = body.isFeatured ?? thread.isFeatured
		thread.isPinned = body.isPinned ?? thread.isPinned
		thread.updatedAt = new Date().toISOString()
		writeForumState(forumState)
		return jsonResponse(buildThreadDetail(forumState, threadId))
	}

	if (/^\/threads\/[^/]+\/favorite$/.test(path) && method === "POST") {
		const threadId = path.split("/")[2] ?? ""
		const body = readJsonBody(init)
		const userName = body.userName ?? ""
		const thread = forumState.threads.find(
			(item: AnyRecord) => item.id === threadId,
		)
		if (!thread) return jsonResponse({ message: "未找到帖子" }, 404)
		const currentFavorites = forumState.favorites[userName] ?? []
		const exists = currentFavorites.includes(threadId)
		forumState.favorites[userName] = exists
			? currentFavorites.filter((item: string) => item !== threadId)
			: [threadId, ...currentFavorites]
		thread.favoriteCount = Object.values(forumState.favorites).reduce(
			(sum: number, items: any) =>
				sum + (items as string[]).filter((id) => id === threadId).length,
			0,
		)
		writeForumState(forumState)
		return jsonResponse(buildThreadDetail(forumState, threadId, userName))
	}

	return jsonResponse({ message: "未实现的训练社区接口" }, 404)
}

const nativeFetch = window.fetch.bind(window)

window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
	const rawUrl =
		typeof input === "string"
			? input
			: input instanceof URL
				? input.toString()
				: input.url

	try {
		const url = new URL(rawUrl, window.location.origin)
		if (url.hostname === "localhost" && url.pathname === "/product-status") {
			return jsonResponse(demoProductRows)
		}
		if (url.hostname === "localhost" && url.pathname.startsWith("/forum")) {
			return handleForumRequest(url, init)
		}
	} catch {
		// ignore and fall through
	}

	return nativeFetch(input, init)
}

const bootstrapWebDemoStorage = () => {
	ensureStorageValue("settings", {
		all_data_path: WEB_DEMO_DATA_PATH,
		strategy_result_path: WEB_DEMO_RESULT_PATH,
		is_auto_launch_update: false,
		is_auto_launch_real_trading: false,
		data_white_list: [],
		hid: "WEB-DEMO-UUID",
		api_key: "WEB-DEMO-KEY",
		akshare_start_date: "20070101",
		akshare_notice_start_date: "20200101",
		libraryType: "select",
		performance_mode: "EQUAL",
		user_choice: false,
	})
	ensureStorageValue("schedule", { dataModule: [], selectModule: [] })
	ensureStorageValue("data_map", demoProductRows)
	ensureStorageValue("real_market_config", {
		filter_kcb: true,
		filter_cyb: true,
		filter_bj: true,
		performance_mode: "EQUAL",
		date_start: "2023-01-01",
		qmt_path: "C:\\QMT\\userdata_mini",
		account_id: "888001",
		qmt_port: "58610",
		message_robot_url: "",
		reverse_repo_keep: 1000,
	})
	ensureStorageValue("realMarketConfig", {
		qmt_path: "C:\\QMT\\userdata_mini",
		account_id: "888001",
		qmt_port: "58610",
		message_robot_url: "",
		filter_kcb: "1",
		filter_cyb: "1",
		filter_bj: "1",
		performance_mode: "EQUAL",
		date_start: "2023-01-01",
		reverse_repo_keep: 1000,
	})
	ensureStorageValue("accountKey", {
		apiKey: "WEB-DEMO-KEY",
		uuid: "WEB-DEMO-UUID",
	})
	ensureStorageValue("accountRole", { msg: "SUCCESS", role: 2 })
	ensureStorageValue("user-storage", {
		token: "web-demo-token",
		isLoggedIn: true,
		user: {
			id: "web-demo-user",
			uuid: "WEB-DEMO-UUID",
			apiKey: "WEB-DEMO-KEY",
			headimgurl: "",
			isMember: true,
			groupInfo: ["A股训练营"],
			nickname: "量化评审",
			membershipInfo: ["stock-2026"],
			approval: { block: false, crypto: false, stock: true },
		},
	})
	ensureStorageValue("backtestConfig", {
		initial_cash: 100000,
		start_date: "2025-04-01",
		end_date: "2026-04-04",
		backtest_name: "选股精心随机混合（标准版）",
	})
	ensureStorageValue("libraryType", "select")
	ensureStorageValue("showMoney", true)
	ensureStorageValue("forum.profile_name", "量化评审")
	ensureStorageValue("selectStockStrategy25", [])
	ensureStorageValue("fusion", [])
	ensureStorageValue("versionList", [])
	ensureStorageValue("versions", {
		clientVersion: "1.0.0",
		fuelVersion: "1.0.0",
		zeusVersion: "1.0.0",
		rocketVersion: "1.0.0",
	})
	ensureStorageValue(FORUM_STORAGE_KEY, buildForumSeedState())
	ensureStorageValue(
		PAPER_TRADING_STORAGE_KEY,
		emptyPaperTradingState(1_000_000),
	)
}

const webDemoApi: AnyRecord = {
	getStoreValue: async (key: string, fallback: unknown = undefined) =>
		readStorageValue(key, fallback),
	setStoreValue: async (key: string, value: unknown) => {
		writeStorageValue(key, value)
		return true
	},
	deleteStoreValue: async (key: string) => {
		window.localStorage.removeItem(key)
		return true
	},
	openUrl: (url: string) => window.open(url, "_blank", "noopener,noreferrer"),
	openDirectory: async () =>
		notifyDesktopOnly(
			"网页演示站不直接打开本地目录，请下载客户端查看源码或结果目录。",
		),
	openDataDirectory: async () =>
		notifyDesktopOnly("本地数据目录浏览仅支持客户端。"),
	openUserDirectory: async () =>
		notifyDesktopOnly("本地目录浏览仅支持客户端。"),
	dataPathExists: async () => true,
	createDirectory: async () => true,
	createStrategyDir: async () => true,
	createRealTradingDir: async () => true,
	selectDirectory: async () => {
		notifyDesktopOnly()
		return ""
	},
	selectFile: async () => {
		notifyDesktopOnly("文件导入仅支持客户端。")
		return ""
	},
	importSelectStock: async () => true,
	importFusion: async () => true,
	readChangelog: async () => ({
		success: true,
		data: [
			"## [1.0.0] - 2026-04-19",
			"### 新增功能",
			"- ✨ **网页 Demo 复用客户端界面** - 浏览器端直接运行与桌面版一致的页面结构和路由。",
			"- 🔒 **QMT 连接动作改为客户端下载提示** - 实盘相关能力在网页端统一提示下载客户端后使用。",
		].join("\n"),
	}),
	loadPositionJson: async (filename: string) => ({
		update_time: currentTimestamp,
		data:
			filename === "个股表现"
				? demoPositionStockRows
				: demoPositionStrategyRows,
	}),
	loadStrategyChartHtml: async () => readStrategyChartHtml(),
	listAnalysisCaches: async () => buildAnalysisCacheList(),
	loadAnalysisCacheDetail: async () => buildAnalysisCacheDetail(),
	loadPaperTradingState: async () => readPaperTradingState(),
	listPaperTradingSources: async () => [
		{
			name: "选股精心随机混合（标准版）",
			file_path: `${WEB_DEMO_RESULT_PATH}\\最新选股结果.csv`,
			last_write_time: currentTimestamp,
			row_count: (await loadCsvRows("最新选股结果.csv")).length,
			latest_selection_date: "2026-02-04",
		},
	],
	initPaperTrading: async (initialCapital = 1_000_000) =>
		writePaperTradingState(emptyPaperTradingState(initialCapital)),
	resetPaperTrading: async (initialCapital = 1_000_000) =>
		writePaperTradingState(emptyPaperTradingState(initialCapital)),
	importPaperTradingSource: async (
		sourceName: string,
		initialCapital = 1_000_000,
	) => {
		const rows = await loadCsvRows("最新选股结果.csv")
		const nextState = buildImportedPaperTradingState(
			rows,
			sourceName,
			initialCapital,
		)
		writePaperTradingState(nextState)
		return {
			imported_count: nextState.positions.data.length,
			skipped_codes: [],
			source_name: sourceName,
		}
	},
	refreshPaperTradingQuotes: async () => {
		const state = readPaperTradingState()
		state.positions.data = state.positions.data.map(
			(item: AnyRecord, index: number) => {
				const nextPrice = Number(
					(item.最新价 * (1 + (index % 2 === 0 ? 0.005 : -0.004))).toFixed(2),
				)
				const pnl = Number(
					((nextPrice - item.持仓均价) * item.持仓股数).toFixed(2),
				)
				return {
					...item,
					最新价: nextPrice,
					持仓市值: Number((nextPrice * item.持仓股数).toFixed(2)),
					浮动盈亏: pnl,
					浮动收益率: Number(
						(pnl / (item.持仓均价 * item.持仓股数)).toFixed(4),
					),
					最新价日期: "2026-04-19",
				}
			},
		)
		state.account.market_value = state.positions.data.reduce(
			(sum: number, item: AnyRecord) => sum + item.持仓市值,
			0,
		)
		state.account.total_pnl = state.positions.data.reduce(
			(sum: number, item: AnyRecord) => sum + item.浮动盈亏,
			0,
		)
		state.account.total_asset = Number(
			(state.account.cash + state.account.market_value).toFixed(2),
		)
		state.account.total_pnl_rate = Number(
			(state.account.total_pnl / state.account.initial_capital).toFixed(4),
		)
		state.account.daily_pnl = Number(
			(state.account.total_pnl * 0.18).toFixed(2),
		)
		state.account.daily_pnl_rate = Number(
			(state.account.daily_pnl / state.account.initial_capital).toFixed(4),
		)
		state.account.latest_price_date = "2026-04-19"
		state.account.update_time = currentTimestamp
		state.positions.update_time = currentTimestamp
		writePaperTradingState(state)
		return true
	},
	listRandomStrategyLibrary: async () => demoRandomStrategyLibrary,
	installRandomStrategyLibraryPackage: async () => ({ success: true }),
	handleUpdateOneProduct: async () => {
		touchProductStatus()
		return true
	},
	handleUpdateFullProducts: async () => {
		touchProductStatus()
		return true
	},
	handleUpdateStrategies: async () => true,
	getStrategySelectData: async () => demoStrategyOptions,
	queryDataList: async ({ file_name }: { file_name: string }) =>
		file_name === "strategy.json"
			? { data: { dataList: demoStrategySubscriptionRows } }
			: { data: { dataList: [] } },
	runClientInit: async () => true,
	getSelectedStrategiesList: async () => [],
	getTradingPlanList: async () => [],
	execFuelWithEnv: async () => notifyDesktopOnly("运行本地内核仅支持客户端。"),
	rocketExecute: async () => notifyDesktopOnly(),
	rendererLog: async (type: string, message: string) =>
		console[type === "error" ? "error" : type === "warning" ? "warn" : "log"](
			`[web-demo] ${message}`,
		),
	loadAccount: async () => ({ 可用资金: 286000, 总资产: 1000000 }),
	fetchRocketStatus: async () => false,
	killRocket: async () => true,
	fetchFuelStatus: async () => false,
	loadProductStatus: async () => buildProductStatus(),
	loadRunResult: async () => ({}),
	getStrategyResultPath: async () => WEB_DEMO_RESULT_PATH,
	getBuyInfoList: async () => demoBuyPlans,
	getSellInfoList: async () => demoSellPlans,
	checkDBFile: async () => true,
	fetchMonitorProcesses: async () => demoMonitorProcesses,
	parseCsvFile: async (fileName = "最新选股结果") => ({
		data: await loadCsvRows(`${fileName}.csv`),
	}),
	saveRealMarketData: async () => true,
	clearRealMarketData: async () => true,
	deleteRealMarketData: async () => true,
	cleanRealMarketData: async () => true,
	loadAquaTradingInfo: async () => ({
		startTime: "2026-04-19 09:30:00",
		endTime: "2026-04-19 09:36:39",
		duration: 399,
		wakeTime: "09:35:00",
	}),
	handleKillProcess: async () => true,
	killAllKernals: async () => true,
	killKernal: async () => true,
	handleToggleFullscreen: async () => true,
	fetchFullscreenState: async () => Boolean(document.fullscreenElement),
	createTerminalWindow: async () => notifyDesktopOnly("终端窗口仅支持客户端。"),
	focusMainWindows: async () => true,
	closeApp: async () => true,
	minimizeApp: async () => true,
	restartApp: async () => window.location.reload(),
	setAutoLaunch: async () => notifyDesktopOnly("开机自启动仅支持客户端。"),
	setAutoUpdate: async () => true,
	checkUpdate: async () => false,
	updateKernal: async () => notifyDesktopOnly("内核更新仅支持客户端。"),
	getAppAndKernalVersions: async () => ({
		clientVersion: "1.0.0",
		fuelVersion: "1.0.0",
		zeusVersion: "1.0.0",
		rocketVersion: "1.0.0",
	}),
	getMacAddress: async () => "WEB-DEMO",
	startServer: async () => true,
	reportError: (callback: Listener) => {
		listenerBuckets.reportError.add(callback)
		return callback
	},
	removeReportErrorListener: () => listenerBuckets.reportError.clear(),
	toggleHandler: async (isUpdating: boolean) => {
		if (isUpdating) {
			touchProductStatus()
			setTimeout(() => emitScheduleStatus("done"), 900)
		}
		return true
	},
	syncNetworkStatus: () => undefined,
	setAutoTrading: async () => notifyDesktopOnly(),
	sendUpdateStatus: (callback: Listener) =>
		listenerBuckets.updateStatus.add(callback),
	removeSendUpdateStatusListener: () => listenerBuckets.updateStatus.clear(),
	startNetworkCheck: () => undefined,
	stopNetworkCheck: () => undefined,
	subscribeScheduleStatus: (callback: Listener) =>
		listenerBuckets.scheduleStatus.add(callback),
	unSubscribeSendScheduleStatusListener: () =>
		listenerBuckets.scheduleStatus.clear(),
	subscribePowerMonitor: (callback: Listener) =>
		listenerBuckets.powerMonitor.add(callback),
	unSubscribePowerMonitor: () => listenerBuckets.powerMonitor.clear(),
	startUpdate: () => undefined,
	cancelUpdate: () => undefined,
	onUpdateInfo: () => undefined,
	unUpdateInfoListener: () => undefined,
	onDownloadProgress: () => undefined,
	removeDownloadProgressListener: () => undefined,
	logHandle: (payload: unknown) =>
		console.error("[web-demo:window-error]", payload),
}

bootstrapWebDemoStorage()

window.electron = {
	process: { platform: "win32" },
} as any

window.versions = {
	node: () => "20.x",
	chrome: () => navigator.userAgent,
	electron: () => "web-demo",
}

window.electronAPI = new Proxy(webDemoApi, {
	get(target, prop) {
		if (typeof prop !== "string") {
			return undefined
		}
		if (prop in target) {
			return target[prop]
		}
		return async () => undefined
	},
})
