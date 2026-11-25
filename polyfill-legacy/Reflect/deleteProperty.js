import { Reflect } from "../../polyfill/Reflect";
import { accessor } from "../../support/accessor";
import { deleteProperty } from "../../impl/Reflect/deleteProperty";
import { deleteProperty$es3 } from "../../impl/Reflect/deleteProperty$es3";

// legacy 线存在无 __defineSetter__ 的浏览器（defineProperty 兜底为 $es3 的 @@desc: 存储）：
// 必然无原生 Reflect，按访问器有无二选一；无访问器时必须用 $es3 版清掉 @@desc: 记录，
// 否则残留的描述符会让后续 get 读到已删除的值
Reflect.deleteProperty = accessor ? deleteProperty : deleteProperty$es3;
