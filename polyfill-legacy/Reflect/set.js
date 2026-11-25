import { Reflect } from "../../polyfill/Reflect";
import { accessor } from "../../support/accessor";
import { set } from "../../impl/Reflect/set";
import { set$es3 } from "../../impl/Reflect/set$es3";

// legacy 线存在无 __defineSetter__ 的浏览器（defineProperty 兜底为 $es3 的 @@desc: 存储）：
// 必然无原生 Reflect，按访问器有无在通用链式版与 set$es3 之间二选一
Reflect.set = accessor ? set : set$es3;
