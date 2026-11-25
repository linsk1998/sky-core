import { accessor } from "../../support/accessor";
import { get } from "../../impl/Reflect/get";
import { get$es3 } from "../../impl/Reflect/get$es3";

// legacy 线必然无原生 Reflect，且存在无 __defineSetter__ 的浏览器，按访问器有无二选一
export default accessor ? get : get$es3;
