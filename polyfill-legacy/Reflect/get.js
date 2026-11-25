import { Reflect } from "../../polyfill/Reflect";
import { accessor } from "../../support/accessor";
import { get } from "../../impl/Reflect/get";
import { get$es3 } from "../../impl/Reflect/get$es3";

// legacy 线存在无 __defineSetter__ 的浏览器（defineProperty 兜底为 $es3 的 @@desc: 存储）：
// 必然无原生 Reflect，按访问器有无在通用链式版与 get$es3 之间二选一
Reflect.get = accessor ? get : get$es3;
