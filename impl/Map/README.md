# impl/Map

Map 的各环境实现与修复。`create_Map` 用于没有可用 Map 的环境整体替换；`fix_Map*` 系列基于原生 Map 生成修复后的子类；`$` 后缀区分传参方式或目标环境：`$arg` 表示被修复的 Map 由参数传入，`$v8` 表示 V8 专用问题。

## 浏览器版本问题对照

| 浏览器及版本 | Map 状况与问题 |
| --- | --- |
| IE 8-10 | 无 Map |
| IE 11 | 有 Map，既无 `iterator` 也无 `@@iterator`，完全不可迭代 |
| Firefox 3.x | 无 Map |
| Firefox 13-16 | 有 Map，无迭代入口 |
| Firefox 13-18 | `size` 是方法 `size()` |
| Firefox 13-18 | 无 `clear` |
| Firefox 13-32 | `set` 不返回 `this` |
| Firefox 17-24 | 无 `forEach` |
| Firefox 17-26 | `iterator()` 返回 Firefox 专有迭代器 |
| Chrome 21-37 | 无 Symbol |
| Chrome 21-37 | `@@iterator` 为字符串键 |
| Chrome 21-37 | `set` 不返回 `this` |
| Chrome 21-37 | `-0` 键处理异常（运行时检测确认） |
| Chrome 38-41 | `new Map(iterator)` 中断时不调用 `iterator.return` |
| Chrome 38-41 | 5 个及以上元素时 `-0` 键异常（Chromium 42-） |
| Safari 8 | 无 Symbol |
| Safari 8 | Map 无 `@@iterator` |
| Safari 9 | 无 `Symbol.iterator` |
| Opera 9-12（Presto） | 无 Map |
| 其它 ES3 浏览器 | 无 Map |
