import { enumIterableHelper } from "../../impl/Iterator/enumIterableHelper";

// createForOfIteratorHelper: 对外暴露的 for-of 遍历入口
// 这里直接复用 enumIterableHelper 的 default export 语义
export default enumIterableHelper;
