# AGENTS.md —— sky-core 开发与测试指南（写给 AI 助手）

本文件告诉 AI 助手本项目的**设计意图**、**开发方式**与**测试方式**。AI 助手要理解本文，按本文要求编写功能、编写测试、选择合适的测试命令验证，不要凭空猜测命令行为。

## 项目原理

sky-core 是一个浏览器 polyfill 库（core-js 风格）。最大特色是按浏览器能力分层（tier）：

| tier   | 目标浏览器                                             | 注入配置              | babel       |
| ------ | ------------------------------------------------------ | --------------------- | ----------- |
| compat | IE6-8                                                  | conditional-compat.js | 降到 ES3    |
| legacy | 非 IE 低版本（Firefox<10 Chrome<30 Safari<7 Opera<17） | conditional-legacy.js | 降到 ES3    |
| modern | 除 compat、legacy 外 / 不支持 module 的浏览器          | conditional-modern.js | 降到 ES5    |
| es2015 | 支持 `<script type="module">` 的新浏览器               | conditional-es2015.js | 降到 ES2017 |

### 为什么要分层

不同浏览器需要不同的修复。如果只出一套产物，要么体积膨胀（高版本浏览器被迫加载低版本的修复），要么兼容性缺失（低版本浏览器缺少必需的修复）。分成四个 tier 各自构建，每个浏览器只下载自己需要的部分，达到最小体积。

### 目录结构与回落链

源码按功能分目录：

```
impl*/          算法实现
polyfill*/      有副作用的安装模块（往全局挂 polyfill）
pure*/          无副作用包装（native || impl）
helpers*/       优化 babel-runtime helpers
utils*/         工具入口
native/         原生引用
```

每类目录中，**不带后缀的基目录是通用版**，`-compat` / `-legacy` / `-modern` / `-es2015` 是按目标浏览器裁剪的变体。构建时按以下顺序查找，找到即停：

| 构建      | 查找顺序（以 polyfill 为例）                          |
| --------- | ----------------------------------------------------- |
| compat    | `polyfill-compat/` → `polyfill-modern/` → `polyfill/` |
| legacy    | `polyfill-legacy/` → `polyfill-modern/` → `polyfill/` |
| modern    | `polyfill-modern/` → `polyfill/`                      |
| es2015    | `polyfill-es2015/` → `polyfill/`                      |
| 不带 tier | `polyfill/`                                           |

`utils` / `pure` / `helpers` 同理，换前缀即可。

回落链的作用是**减少源码文件数量**：如果某个 tier 没有专属变体，构建时会自动使用回落链上一层的实现。因此编写代码时应优先只写通用版，测试确认某个 tier 确实需要不同实现时再拆分变体。

### 决定某个 tier 是否需要专属变体

常见场景：

| 场景 | 做法 |
|---|---|
| 所有 tier 的实现完全相同 | 只写一个通用版（基目录），所有 tier 回落即可 |
| es2015+ 已原生支持，低版本没有 | 只写一个通用版；conditional-es2015 不配置（es2015 构建不会引入）；compat/legacy/modern 缺省回落到通用版 |
| es2015+ 已原生支持，compat 需 IE 专属实现 | conditional-es2015 不配置；compat 用 IE 专属实现；modern 用标准实现；legacy 缺省用 modern。检查两种实现能否合并为通用版 |
| 某些 tier 有浏览器专属 bug | 写变体文件（命名如 `xxx$ff.js`、`xxx$jscript.js`），只放进有 bug 的 tier 目录 |

**核心原则：能不建 tier 变体就不建。建之前先想想能否通过回落链省掉。**

当前**故意不建**的目录（与上层相同，回落即可）：`polyfill-compat/`、`polyfill-legacy/`、`polyfill-es2015/`、`pure-compat/`、`pure-legacy/`、`pure-es2015/`。

### impl 层也会被注入

以 `Object.defineProperty` 为例：impl 中需要使用它时直接写 `Object.defineProperty`。低版本（如 Firefox 3.6）的 conditional 配置了此注入，构建时插件会自动替换为 polyfill 依赖；高版本没配置，就不会注入。这样高版本浏览器在原生支持的情况下不会多打包一份依赖。同时插件配置要排除 `native/` 目录，避免循环依赖。

构建用 rollup，通过 `rollup-plugin-polyfill-inject`（配置在 `tests/conditional-*.js`）**把测试代码里对原生 API 的调用劫持为库内实现**，从而测试的是"我们的实现"而不是 node/浏览器自带的。

## 功能开发流程（写 polyfill / pure 入口前必读）

1. **写通用实现**：在 `impl/`、`polyfill/`、`pure/` 的基目录里编写通用版本
2. **更新 README**：按浏览器支持情况插入到 README.md 的特性表中
3. **配置注入映射**：查浏览器支持情况，配置到 `tests/conditional-*.js`。已经原生支持的 tier 不配置。**要激进地省略——优先不配置，只有十足把握该浏览器确实不支持时才配置**
4. **浏览器测试**：用真实浏览器跑 test:local，修正配置和实现。变体实现命名习惯为 `特性$变体.js`（如 `xxx$ff.js`）
5. **迭代**：重复第 4 步直到测试通过，记录不同浏览器的问题
6. **裁剪**：根据不同浏览器的问题，看不同 tier 是否需要专属变体
7. **合并**：如果几个 tier 的问题相同，看能否利用回落链省略部分 tier 的变体

### 功能编写注意事项

- **pure 与 polyfill 的关系**：逻辑一致，只是输出位置不同。polyfill 输出到全局变量，pure 输出到模块导出。两者不相互引入。
- **特性判断放哪**：放在 pure / polyfill 中，不放 impl 中。impl 只做纯实现。
- **impl 之间的依赖**：
  - 如果能确保依赖的环境是当前环境的超集（即当前环境必然有该依赖），使用**相对路径**引用。例：`xxx$es3` 依赖 `yyy$jscript` → 用相对路径
  - 否则写**全局变量名**，让注入插件决定是否替换。例：`Object.defineProperties` 依赖 `Object.defineProperty` → 直接写 `Object.defineProperty`（在不同 tier 下可能指向不同实现）
- **pure / polyfill 引用 impl 和 native**：一律用相对路径。
- **子特性挂载**：polyfill 中子特性要挂到主特性时，如果主特性本身可能是 polyfill（native 不存在），应当从主特性的 polyfill 模块导出命名空间对象，子特性挂到这个对象上。例：`Reflect` 的 polyfill 导出命名空间对象，`Reflect.apply` 挂到这个对象。

### 已踩过的坑（别再踩）

- 给四个 tier 各写一份一模一样的文件——忘了回落链。**先写通用版，测试确认需要差异时再拆分。**

## 测试命令一览

| 命令                                         | 用途                                                                              | 默认范围                                      |
| -------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------- |
| `npm run test:node`                          | **纯 node 测试，只跑纯算法类测试**（多人协作/CI 用）                              | `tests/default-test-globs.js` 的 `node` 数组  |
| `npm run test:local`                         | 本机浏览器跨端测试（自动开关服务器、收集结果）                                    | 同文件 `local` 数组（`tests/corejs/es/*.js`） |
| `npm run build:corejs-test`                  | 构建四份产物到 `tests/corejs/dest/`，供**真人**开 2.html/3.html 测试或 lambdatest | `tests/corejs/index.js` 手写清单              |
| `npm run test:lambdatest` / `test:saucelabs` | 云端测试（lambdatest 仅在发布前跑，暂未改造）                                     | -                                             |

所有命令都在仓库根目录执行（Windows / pnpm / Node 22 验证通过）。

## npm run test:node（纯算法）

```bash
npm run test:node                                                # 默认范围（纯算法数组）
npm run test:node -- tests/corejs/es/es.math.sum-precise.js     # 指定测试文件（路径或 glob）
npm run test:node -- "tests/corejs/es/*.js"                      # glob（支持 * / ** / ?）
```

注入配置来自 `tests/impl-inject.js`（与 `conditional-*.js` 同款机制，但无 tier 分层，直接映射到 `impl/` 算法实现）。

工作原理（不要改变的行为约定）：

1. rollup 内存构建（虚拟入口，**不产生任何临时文件**），产物是 iife 字符串；
2. 加载 `qunitjs@1.9.0`（devDependency，html 页面里引用的也是 `node_modules/qunitjs` 同一份，保证断言语义同构——不要换成 node-qunit，它只接受文件路径且内置 qunit 2.x 会破坏现有 helpers）；
3. 在本进程执行产物，失败时输出明细并以非 0 码退出。

预期基线：默认范围（Math.sumPrecise 的 core-js 移植 + MDN 示例）80/80。**跑完不符合这个基线说明你改坏了东西，先自查，不要修改测试预期来"凑绿"。**

## npm run test:local（本机浏览器）

```bash
npm run test:local                                        # 全部已安装浏览器
npm run test:local -- tests/corejs/es/es.array.slice.js  # 指定测试文件（语法同 npm run test:node）
npm run test:local -- -b "chrome=60~"                     # 浏览器范围（60 及以上）
npm run test:local -- -b "chrome=146" -b "firefox=91"    # 多次 -b 会合并
npm run test:local -- -p 8940 -t 180000                   # 端口（默认 8931）/ 单浏览器超时（默认 120s）
```

浏览器范围语法：逗号分隔，`family` / `family=V`（精确）/ `family=A~B`（区间，整数边界按主版本 A~B 闭区间；边界带小数时精确到完整版本号，如 `firefox=3.5~3.6`）/ `family=A~`（下界）/ `family=~B`（上界）/ `!family` 排除。匹配名只有 **chrome / firefox / opera / safari / ie**。`ie` 走 Edge 的 IE 模式，版本即文档模式：`ie=5/7/8/9/10/11`，`ie=8` 及以下跑 compat 产物、`ie=9` 以上跑 modern 产物。家族定义见 `tests/lib/local-browsers.js`（扫描 `D:\App\Browser` 下的安装）。执行策略：同一家族串行（runQueue），不同家族并行（Promise.allSettled）。

流程：rollup 构建四套产物（compat / legacy / modern / es2015，**内存字符串，全程不落盘**）→ local-test-runner 起服务器，通过插件钩子提供虚拟资源：`loadHtml` 产生测试页（IE 条件注释 + onmouseenter 检测分流 legacy/modern + type=module 分流 es2015），`configureServer` 拦截四套产物 js 请求直接返回内存内容（QUnit 插件注入结果上报脚本，含失败断言明细）→ 逐浏览器运行并回收结果 → 关服务器 → 有失败则打印明细并退出码 1。

缓存控制（防止浏览器跑到旧构建产物）由 local-test-runner 内建：所有响应默认带 `Cache-Control: no-store` / `Pragma: no-cache` / `Expires: 0`；Chrome 家族通过其 Chrome preset 启动（临时 user-data-dir + 一次性空 `--disk-cache-dir` 等）。

local-test-runner 以 npm 依赖方式引入（`require("local-test-runner")`）。当前它尚未发布，用 **pnpm link** 临时接入：

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

| 来源         | 目录            | 文件命名                                           |
| ------------ | --------------- | -------------------------------------------------- |
| core-js 移植 | `tests/corejs/` | `es/es.math.sum-precise.js`（core-js 原名）        |
| MDN 示例     | `tests/mdn/`    | `Math/sumPrecise.js`（按 MDN 页面的对象/方法路径） |

### 第二步：判断特性类型，注册注入配置，运行测试

**纯算法类**（不依赖浏览器 DOM/引擎特性）：

```bash
# 1. 在 tests/impl-inject.js 里登记注入映射
# 2. 跑 node 测试
npm run test:node -- tests/corejs/es/es.math.sum-precise.js
npm run test:node -- tests/mdn/Math/sumPrecise.js
# 3. 通过后加进 tests/default-test-globs.js 的 node 数组
```

**无论是否纯算法，都需要浏览器测试**（polyfill 必须跨浏览器验证）：

```bash
# 1. 在 tests/conditional-*.js 里登记注入映射（四套按目标浏览器各自取舍）
# 2. 跑浏览器测试
npm run test:local -- tests/corejs/es/es.math.sum-precise.js
npm run test:local -- tests/mdn/Math/sumPrecise.js
```

polyfill 类测试放 `tests/corejs/es/`（被 `local` 数组 glob 自动纳入）。

### 第三步：选择浏览器范围（AI 自主决策）

**不要每次都跑全量 70 浏览器。**根据改动情况自行决定要测的版本。

### 断言写法

用 `tests/corejs/helpers/qunit-helpers.js` 扩展过的方法（`arity/name/same/arrayEqual/epsilon/looksNative...`），helpers 位于 `tests/corejs/helpers/`，**它们被注入插件排除在外**（不会被劫持）。

## 关键文件地图

```
tests/
  default-test-globs.js   # 两个默认范围数组：node（纯算法）/ local（跨浏览器）
  impl-inject.js          # 纯算法测试的注入映射（无 tier，直接指向 impl/）
  run-node.js             # npm run test:node 入口
  run-local.js            # test:local 入口
  corejs/                 # 从 core-js 移植的测试
    es/
    web/
  mdn/                    # 从 MDN 示例移植的测试

QUnit 运行时统一来自 `qunitjs@1.9.0`（devDependency）。
```

## 注意事项

- **IETester / VirtIE / Lisect / 忽忽浏览器等独立 IE 工具是真人测试工具**，不要往 local-browsers 里加它们。
- **legacy 线路（`conditional-legacy.js` 与各 `*-legacy/` 目录）是开发中未完成的库功能。**
- `tests/` 下新建文件若含块注释，注意注释里不要出现 `**/`（会提前终结注释导致语法错误）。
- 在某些 shell 包装层（尤其后台执行经 cmd 转发时）里，引号内的 `>` / `<` 会被误解析成重定向。浏览器范围语法已改用波浪号（`~`）和等号（`=`），不再涉及这些特殊字符。

## 判定标准

- 两个脚本失败时都会：打印失败明细（断言消息 + 期望/实际）→ 非零退出。CI/脚本里**只认退出码**。
- test:local 由 local-test-runner 的 `runQueue`（单浏览器失败不中断队列，allSettled 格式结果）执行，`report` 输出逐浏览器明细与总计，`judge` 裁断：无任务级错误且每个浏览器 `passed === total && total > 0` 才算通过（0 条用例视为失败）。
