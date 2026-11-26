// compat（IE6~8）无访问器，无法在 document 上安装 currentScript 的 getter，
// 不做安装。保留此空文件挡住回落链，避免 base 入口的 impl（stack 探测机制）被打进 compat 产物
