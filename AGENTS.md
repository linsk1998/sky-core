# AGENTS.md —— sky-core 测试指南（写给 AI 助手）

本文件告诉 AI 助手如何在本仓库运行与维护测试。请在改完代码后按下文选择合适的测试命令验证，不要凭空猜测命令行为。

## 项目概况

sky-core 是一个浏览器 polyfill 库（core-js 风格）。源码按"分层"组织：

- `impl*/` —— 算法实现（impl / impl-compat / impl-modern / impl-es2015 / impl-legacy）
- `polyfill*/` —— 有副作用的安装模块（往全局挂 polyfill）
- `pure*/` —— 无副作用包装（`native || impl`）
- `utils*/`、`native/`、`helpers*/` —— 工具与原生引用

构建用 rollup，通过 `rollup-plugin-polyfill-inject`（配置在 `tests/conditional-*.js`）**把测试代码里对原生 API 的调用劫持为库内实现**，从而测试的是"我们的实现"而不是 node/浏览器自带的。

四个构建分层（tier）：

| tier | 目标浏览器 | 注入配置 | babel |
|---|---|---|---|
| compat | IE6-8 | conditional-compat.js | 降到 ES3 |
| legacy | 非 IE 低版本（Firefox<10 Chrome<30 Safari<7 Opera<17） | conditional-legacy.js | 降到 ES3 |
| modern | IE9+ / 不支持 module 的浏览器 | conditional-modern.js | 降到 ES5 |
| es2015 | 支持 `<script type="module">` 的新浏览器 | conditional-es2015.js | 仅去 ES2019+ |

## 测试命令一览

| 命令 | 用途 | 默认范围 |
|---|---|---|
| `npm run test:node` | **纯 node 测试，只跑纯算法类测试**（多人协作/CI 用） | `tests/default-test-globs.js` 的 `node` 数组 |
| `npm run test:local` | 本机浏览器跨端测试（自动开关服务器、收集结果） | 同文件 `local` 数组（`tests/corejs/es/*.js`） |
| `npm run build:corejs-test` | 构建四份产物到 `tests/corejs/dest/`，供**真人**开 2.html/3.html 测试或 lambdatest | `tests/corejs/index.js` 手写清单 |
| `npm run test:lambdatest` / `test:saucelabs` | 云端测试（lambdatest 仅在发布前跑，暂未改造） | - |

所有命令都在仓库根目录执行（Windows / pnpm / Node 22 验证通过）。

## npm run test:node（纯算法）

```bash
npm run test:node                                    # 默认范围（纯算法数组）
npm run test:node -- es.math.sum                     # 裸名匹配（支持前缀/后缀/通配）
npm run test:node -- "tests/corejs/es/*.js"          # 相对根目录的 glob（支持 * / ** / ?）
```

注入配置来自 `tests/impl-inject.js`（与 `conditional-*.js` 同款机制，但无 tier 分层，直接映射到 `impl/` 算法实现）。新功能在此登记后测试代码即可用裸名引用。

工作原理（不要改变的行为约定）：

1. rollup 内存构建（虚拟入口，**不产生任何临时文件**），产物是 iife 字符串；
2. 加载 `qunitjs@1.9.0`（devDependency，html 页面里引用的也是 `node_modules/qunitjs` 同一份，保证断言语义同构——不要换成 node-qunit，它只接受文件路径且内置 qunit 2.x 会破坏现有 helpers）；
3. 在本进程执行产物，失败时输出明细并以非 0 码退出。

预期基线：默认范围（Math.sumPrecise 的 core-js 移植 + MDN 示例）80/80。**跑完不符合这个基线说明你改坏了东西，先自查，不要修改测试预期来"凑绿"。**

## npm run test:local（本机浏览器）

```bash
npm run test:local                                        # 全部已安装浏览器
npm run test:local -- es.array.slice                     # 指定测试文件（语法同 npm run test:node）
npm run test:local -- -b "chrome>=60,firefox"            # 浏览器范围
npm run test:local -- -b "chrome=146" -b "firefox=91"    # 多次 -b 会合并
npm run test:local -- -p 8940 -t 180000                  # 端口（默认 8931）/ 单浏览器超时（默认 120s）
```

浏览器范围语法：逗号分隔，`family` / `family>=v` `>` `<` `<=` `=` `==` / `!` 排除。匹配名只有 **chrome / firefox / opera / safari / ie**（webkit/webkitmini 不作为匹配名——Safari 的 WebKit 目录直接以版本命名：`MiniBrowser(10.0~12.1)` 与 `Playwright(13.2+)`，`safari` 按版本命中，用版本区间区分两种实现）。`ie` 走 Edge 的 IE 模式（EdgeIEMode preset + EmulateIE 插件按 `?ie=X` 注入 meta），版本即文档模式：`ie=5/7/8/9/10/11`，`ie=8` 及以下跑 compat 产物、`ie=9` 以上跑 modern 产物。家族定义见 `tests/lib/local-browsers.js`（扫描 `D:\App\Browser` 下的安装，各家族有最低版本过滤）。**版本号必须带运算符**（写 `chrome=146`，不要写 `chrome146`）。执行策略：同一家族串行（runQueue），不同家族并行（Promise.allSettled），大矩阵总耗时约等于最慢家族的串行总时长。

流程：rollup 构建四套产物（compat / legacy / modern / es2015，**内存字符串，全程不落盘**）→ local-test-runner 起服务器，通过插件钩子提供虚拟资源：`loadHtml` 产生测试页（IE 条件注释 + onmouseenter 检测分流 legacy/modern + type=module 分流 es2015），`configureServer` 拦截四套产物 js 请求直接返回内存内容（QUnit 插件注入结果上报脚本，含失败断言明细）→ 逐浏览器运行并回收结果 → 关服务器 → 有失败则打印明细并退出码 1。

缓存控制（防止浏览器跑到旧构建产物）由 local-test-runner 内建：所有响应默认带 `Cache-Control: no-store` / `Pragma: no-cache` / `Expires: 0`（headers 选项可覆盖）；Chrome 家族通过其 **Chrome preset** 启动（临时 user-data-dir + 一次性空 `--disk-cache-dir` 等）——no-store 只能防止新的缓存写入，救不了已经存在的缓存条目，空缓存目录才能根治。

local-test-runner 以 npm 依赖方式引入（`require("local-test-runner")`）。当前它尚未发布，用 **pnpm link** 临时接入（本机 Volta 不支持 `link --global`，用目录形式）：

```bash
pnpm link ../../test/local-test-runner   # 在 sky-core 目录执行
```

link 会把 `link:` 路径写进 package.json 的 devDependencies（临时状态，发布 sky-core 前会先把 local-test-runner 发到 npm 换成正式版本号），另外还会生成 `pnpm-workspace.yaml` 的 overrides（它会强制 link 解析，发布换正式版时必须删掉）。改过它的 `src/` 后要在其目录里 `npm run build` 重建 dist。

## 如何新增测试

### 第一步：找参考

从 **core-js** 和 **MDN** 找测试参考：

- core-js 仓库：`tests/tests/es.math.sum-precise.js`（polyfill 测试）、`tests/unit-pure/`（纯函数测试）
- MDN 文档：[Math.sumPrecise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise) 等页面的"Try it"和示例代码

两个来源各移植一份，放不同目录：

| 来源 | 目录 | 文件命名 |
|---|---|---|
| core-js 移植 | `tests/corejs/` | `es.math.sum-precise.js`（core-js 原名） |
| MDN 示例 | `tests/mdn/` | `Math.sumPrecise.js`（MDN 页面名） |

### 第二步：判断特性类型，注册注入配置，运行测试

**纯算法类**（不依赖浏览器 DOM/引擎特性）：

```bash
# 1. 在 tests/impl-inject.js 里登记注入映射（如 "Math.sumPrecise": "sky-core/impl/Math/sumPrecise"）
# 2. 跑 node 测试
npm run test:node es.math.sum          # core-js 移植版
npm run test:node Math.sumPrecise      # MDN 示例版
# 3. 通过后加进 tests/default-test-globs.js 的 node 数组（逐文件维护）
```

**无论是否纯算法，都需要浏览器测试**（polyfill 必须跨浏览器验证）：

```bash
# 1. 在 tests/conditional-*.js 里登记注入映射（四套按目标浏览器各自取舍）
# 2. 跑浏览器测试
npm run test:local es.math.sum         # core-js 移植版
npm run test:local Math.sumPrecise     # MDN 示例版
```

polyfill 类测试放 `tests/corejs/es/`（被 `local` 数组 glob 自动纳入）。

### 第三步：选择浏览器范围（AI 自主决策）

**不要每次都跑全量 70 浏览器**。根据改动情况自行决定要测的版本：

| 改动情况 | 建议浏览器范围 |
|---|---|
| 新增 polyfill（新特性） | 一两个新旧代表：`-b chrome=146 -b firefox=91 -b ie=11` |
| 修改了 compat 分层的代码 | 重点老浏览器：`-b ie=8 -b ie=9`（compat 只在 IE≤8 生效） |
| 修改了 legacy 分层的代码 | 老非 IE：`-b firefox=31 -b chrome=30 -b safari=11.0` |
| 修改了 modern 分层的代码 | IE9~Chrome 60 区间：`-b ie=9 -b chrome=30 -b chrome=60` |
| 修改了 es2015 分层的代码 | 新浏览器：`-b chrome=100 -b firefox=120 -b safari=16.4` |
| 修改了共享 impl / utils | 按目标浏览器覆盖范围选各档代表 |
| 只改测试文件 / helpers | 同 tier 任选一个浏览器确认即可 |
| 发布前全量验证 | `npm run test:local`（全部浏览器，约 1 分钟） |

判断依据：看 `conditional-*.js` 里这个特性登记在哪个 tier 的映射里，以及 `polyfill-*/` 目录下哪个分层有对应实现文件。改动影响哪个 tier 就重点测哪个 tier 对应的浏览器区间。

### 断言写法

用 `tests/corejs/helpers/qunit-helpers.js` 扩展过的方法（`arity/name/same/arrayEqual/epsilon/looksNative...`），helpers 位于 `tests/corejs/helpers/`，**它们被注入插件排除在外**（不会被劫持）。

## 关键文件地图

```
tests/
  default-test-globs.js   # 两个默认范围数组：node（纯算法）/ local（跨浏览器）
  impl-inject.js          # 纯算法测试的注入映射（无 tier，直接指向 impl/）
  run-node.js             # npm run test:node 入口
  run-local.js            # test:local 入口
  lib/
    select-tests.js       # 参数 → 文件列表（profile: node|local）
    glob.js               # 文件匹配（tinyglobby 遍历 + picomatch 模式匹配）
    build-tests.js        # rollup API 构建：内存产物
    local-browsers.js     # 浏览器家族清单 + 范围表达式解析 + 最低版本过滤
  corejs/
    createConfigs.js      # 四 tier 构建配置工厂（CLI 与脚本共用）
    rollup.config.js      # build:corejs-test 用，等于 createConfigs()
    conditional-*.js      # 各 tier 的劫持映射（compat/legacy/modern/es2015 在用）
    index.js              # 真人测试页（2.html/3.html）的测试清单
  mdn/                    # 从 MDN 示例移植的测试

QUnit 运行时统一来自 `qunitjs@1.9.0`（devDependency）。
```

## 注意事项

- **IETester / VirtIE / Lisect / 忽忽浏览器等独立 IE 工具是真人测试工具**，不要往 local-browsers 里加它们。
- **legacy 线路（`conditional-legacy.js` 与各 `*-legacy/` 目录）是开发中未完成的库功能。**
- `tests/` 下新建文件若含块注释，注意注释里不要出现 `**/`（会提前终结注释导致语法错误）。
- 在某些 shell 包装层（尤其后台执行经 cmd 转发时）里，引号内的 `>` / `<` 会被误解析成重定向，`>=30` 这类参数会直接炸掉命令——优先用逐版本精确写法（`-b chrome=30 -b chrome=31 ...`）或 `=`/`==`，或换 shell。

## 判定标准

- 两个脚本失败时都会：打印失败明细（断言消息 + 期望/实际）→ 非零退出。CI/脚本里**只认退出码**。
- test:local 由 local-test-runner 的 `runQueue`（单浏览器失败不中断队列，allSettled 格式结果）执行，`report` 输出逐浏览器明细与总计，`judge` 裁断：无任务级错误且每个浏览器 `passed === total && total > 0` 才算通过（0 条用例视为失败）。
