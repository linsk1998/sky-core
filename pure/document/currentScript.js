// 纯净版无法在加载前于 document 上安装 getter，也就无从得知"当前"脚本，
// 恒为 null。需要此功能请用 polyfill 版（污染 document）或 rollup 插件的
// getter 注入模式（sky-core/utils/getCurrentScript）
export default null;
