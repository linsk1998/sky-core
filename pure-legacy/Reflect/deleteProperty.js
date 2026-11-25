import { accessor } from "../../support/accessor";
import { deleteProperty } from "../../impl/Reflect/deleteProperty";
import { deleteProperty$es3 } from "../../impl/Reflect/deleteProperty$es3";

// legacy 线必然无原生 Reflect，且存在无 __defineSetter__ 的浏览器，按访问器有无二选一；
// 无访问器时必须用 $es3 版清掉 @@desc: 记录
export default accessor ? deleteProperty : deleteProperty$es3;
