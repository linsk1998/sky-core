# AGENTS.md —— sky-core 测试指南（写给 AI 助手）

本文件告诉 AI 助手如何在本仓库运行与维护测试。请在改完代码后按下文选择合适的测试命令验证，不要凭空猜测命令行为。

## 项目概况

sky-core 是一个浏览器 polyfill 库（core-js 风格）。源码按"分层"组织：

- `impl*/` —— 算法实现（impl / impl-compat / impl-modern / impl-es2015 / impl-legacy）
- `polyfill*/` —— 有副作用的安装模块（往全局挂 polyfill）
- `pure*/` —— 无副作用包装（`native || impl`）
- `utils*/`、`native/`、`helpers*/` —— 工具与原生引用

构建用 rollup，通过 `rollup-plugin-polyfill-inject`（配置在 `tests/conditional-*.js`）**把测试代码里对原生 API 的调用劫持为库内实现**，从而测试的是"我们的实现"而不是 node/浏览器自带的。

三个构建分层（tier）：

| tier | 目标浏览器 | 注入配置 | babel |
|---|---|---|---|
| compat | IE6-8 | conditional-compat.js | 降到 ES3 |
| modern | IE9+ | conditional-modern.js | 降到 ES5 |
| es2015 | 支持 `<script type="module">` 的新浏览器 | conditional-es2015.js | 仅去 ES2019+ |

（conditional-legacy.js 与 legacy tier 属于**开发中未完成**的线路，见"已知问题"。）

## 测试命令一览

| 命令 | 用途 | 默认范围 |
|---|---|---|
| `npm run test:node` | 纯 node 测试，**多人协作/CI 用**，只适合纯算法类测试 | `tests/default-test-globs.js` 的 `node` 数组 |
| `npm run test:local` | 本机浏览器跨端测试（自动开关服务器、收集结果） | 同文件 `local` 数组（`tests/corejs/es/*.js`） |
| `npm run test:corejs` | 只构建三份产物到 `tests/corejs/dest/`，供**手动**开 2.html/3.html 测试或 lambdatest | `tests/corejs/index.js` 手写清单 |
| `npm run test:lambdatest` / `test:saucelabs` | 云端测试（lambdatest 仅在发布前跑，暂未改造） | - |

所有命令都在仓库根目录执行（Windows / pnpm / Node 22 验证通过）。

## npm run test:node（纯 node）

```bash
npm run test:node                                    # 默认范围（纯算法数组）
npm run test:node -- es.math.sum                     # 裸名匹配（支持前缀/后缀/通配）
npm run test:node -- "tests/corejs/es/*.js"          # 相对根目录的 glob（支持 * / ** / ?）
npm run test:node -- --tier=compat                   # 指定构建分层，默认 modern
npm run test:node -- --tier=compat,modern,es2015     # 多 tier 时自动逐个开子进程跑
```

工作原理（不要改变的行为约定）：

1. rollup 内存构建（虚拟入口，**不产生任何临时文件**），产物是 iife 字符串；
2. 加载 `qunitjs@1.9.0`（devDependency，html 页面里引用的也是 `node_modules/qunitjs` 同一份，保证断言语义同构——不要换成 node-qunit，它只接受文件路径且内置 qunit 2.x 会破坏现有 helpers）；
3. 在本进程执行产物，失败时输出明细并以非 0 码退出。

预期基线：默认范围（Math.sumPrecise 的 core-js 移植 + MDN 示例）80/80；`tests/corejs/es/*.js` 全量 2205/2205（modern 与 es2015 tier）。**跑完不符合这个基线说明你改坏了东西，先自查，不要修改测试预期来"凑绿"。**

## npm run test:local（本机浏览器）

```bash
npm run test:local                                        # 全部已安装浏览器
npm run test:local -- es.array.slice                     # 指定测试文件（语法同 npm run test:node）
npm run test:local -- -b "chrome>=60,firefox"            # 浏览器范围
npm run test:local -- -b "chrome=146" -b "firefox=91"    # 多次 -b 会合并
npm run test:local -- -p 8940 -t 180000                  # 端口（默认 8931）/ 单浏览器超时（默认 120s）
```

浏览器范围语法：逗号分隔，`family` / `family>=v` `>` `<` `<=` `=` `==` / `!` 排除；家族名见 `tests/lib/local-browsers.js`（chrome/firefox/opera/safari/webkit/webkitmini，扫描 `D:\App\Browser` 下的安装）。**版本号必须带运算符**（写 `chrome=146`，不要写 `chrome146`）。

流程：rollup 构建三套产物到 `tests/corejs/local/`（已 gitignore）→ 生成与 3.html 同构的测试页（IE 条件注释 + nomodule + module，浏览器自动选对产物）→ local-test-runner 起服务器（QUnit 插件注入结果上报脚本，含失败断言明细）→ 逐浏览器运行并回收结果 → 关服务器 → 有失败则打印明细并退出码 1。

缓存控制（防止浏览器跑到旧构建产物）由 local-test-runner 内建：所有响应默认带 `Cache-Control: no-store` / `Pragma: no-cache` / `Expires: 0`（headers 选项可覆盖）；Chrome 家族通过其 **Chrome preset** 启动（临时 user-data-dir + 一次性空 `--disk-cache-dir` 等）——no-store 只能防止新的缓存写入，救不了已经存在的缓存条目，空缓存目录才能根治。

local-test-runner 以 npm 依赖方式引入（`require("local-test-runner")`）。当前它尚未发布，用 **pnpm link** 临时接入（本机 Volta 不支持 `link --global`，用目录形式）：

```bash
pnpm link ../../test/local-test-runner   # 在 sky-core 目录执行
```

link 会把 `link:` 路径写进 package.json 的 devDependencies（临时状态，发布 sky-core 前会先把 local-test-runner 发到 npm 换成正式版本号），另外还会生成 `pnpm-workspace.yaml` 的 overrides（它会强制 link 解析，发布换正式版时必须删掉）。改过它的 `src/` 后要在其目录里 `npm run build` 重建 dist。

## 如何新增测试

测试目录按**来源**划分，不按功能划分：

- **从 core-js 移植的** → `tests/corejs/`（polyfill 测试放 `es/`，纯函数测试放 `pure/`）
- **参考 MDN 示例移植的** → `tests/mdn/`（文件名用 MDN 页面名，如 `Math.sumPrecise.js`）

**纯算法类**（不依赖浏览器，进 `npm run test:node` 默认范围）：

1. 测试写进上述目录（参考 `tests/corejs/pure/es.math.sum-precise.js` 或 `tests/mdn/Math.sumPrecise.js`），QUnit 风格、import 项目模块；
2. **把文件路径加进 `tests/default-test-globs.js` 的 `node` 数组**（逐文件维护，不用通配）。

**polyfill 类**（需要跨浏览器验证）：

1. 从 core-js 移植到 `tests/corejs/es/`（会被 `local` 数组的 glob 自动纳入 test:local）；
2. 若想出现在 test:corejs 构建的手动测试页里，往 `tests/corejs/index.js` 加一行 import；
3. 新 polyfill 若要让劫持生效，在 `tests/conditional-*.js` 的 polluting/pure 映射里登记（三套按目标浏览器各自取舍）。

写断言用 `tests/corejs/helpers/qunit-helpers.js` 扩展过的方法（`arity/name/same/arrayEqual/epsilon/looksNative...`），helpers 位于 `tests/corejs/helpers/`，**它们被注入插件排除在外**（不会被劫持）。

## 关键文件地图

```
tests/
  default-test-globs.js   # 两个默认范围数组：node（纯算法）/ local（跨浏览器）
  run-node.js             # npm run test:node 入口
  run-local.js            # test:local 入口
  lib/
    select-tests.js       # 参数 → 文件列表（profile: node|local）
    glob.js               # 极简 glob（* / ** / ?，支持字面量路径）
    build-tests.js        # rollup API 构建：内存产物 / 写盘 local 产物
    local-browsers.js     # 浏览器家族清单 + 范围表达式解析
  corejs/
    createConfigs.js      # 三 tier 构建配置工厂（CLI 与脚本共用）
    rollup.config.js      # test:corejs 用，等于 createConfigs()
    conditional-*.js      # 各 tier 的劫持映射（compat/modern/es2015 在用）
    index.js              # 手动测试页（2.html/3.html）的测试清单
    dest/                 # test:corejs 产物，**git 跟踪的构建产物**
    local/                # test:local 产物，gitignore
  mdn/                    # 从 MDN 示例移植的测试

QUnit 运行时统一来自 `qunitjs@1.9.0`（devDependency）：node 侧 `require("qunitjs")`，
html 页面用相对路径引用 `node_modules/qunitjs/qunit/qunit.js`（pnpm 的 junction 链接可被静态服务器正常服务）。
```

## 注意事项与已知问题

- **`tests/corejs/dest/*.js` 是 git 跟踪的产物**：改了库源码或 conditional 配置后，跑 `npm run test:corejs` 重建并一起提交。
- **`npm run test:node` 默认只跑纯算法测试，不会测 compat 的功能**。如果显式用 `--tier=compat` 跑 polyfill 测试（如 `tests/corejs/es/*.js`），在 node/V8 上会有约 63 处断言失败（Symbol/descriptor 类，compat 实现面向 IE 系）——这不是回归信号；compat 的真实判定以老浏览器（test:local / 手动）为准。
- Firefox 140 曾出现"进程起来但不开 URL"的问题，已由 Firefox preset 中更完整的 user.js prefs 解决（禁书签恢复/更新/遥测等），52/91/140 实测均正常。
- **IE 系浏览器（IETester / VirtIE / Lisect / 忽忽浏览器等）只做手动测试，不接入自动化**——不要往 local-browsers 里加它们。低版本 IE 的手动测试方式：打开带 `<meta http-equiv="X-UA-Compatible" content="IE=X">` 的测试页（test:local 生成的页面已含 `IE=edge`，手动复刻一份改 meta 即可）。
- **legacy 线路（`conditional-legacy.js` 与各 `*-legacy/` 目录）是开发中未完成的库功能**，目前没有构建入口；不要删除，也不要当成可用功能依赖。
- mocha/chai 测试体系已删除，**不要重新引入**；新的 node 侧测试一律走 QUnit 体系。
- 手动开 html 测试页（2.html/3.html 等）前必须先 `pnpm install`——页面的 QUnit 走的是 `node_modules/qunitjs` 相对路径，没装依赖会 404。
- `tests/` 下新建文件若含块注释，注意注释里不要出现 `**/`（会提前终结注释导致语法错误）。
- 在某些 shell 包装层里，引号内的 `>` 可能被误解析成重定向——传 `>=` 参数时优先用 `=`/`==` 写法或换 shell。

## 判定标准

- 两个脚本失败时都会：打印失败明细（断言消息 + 期望/实际）→ 非零退出。CI/脚本里**只认退出码**。
- test:local 由 local-test-runner 的 `runQueue`（单浏览器失败不中断队列，allSettled 格式结果）执行，`report` 输出逐浏览器明细与总计，`judge` 裁断：无任务级错误且每个浏览器 `passed === total && total > 0` 才算通过（0 条用例视为失败）。
