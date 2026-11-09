import defineProperty from "sky-core/pure/Object/defineProperty";
import { Storage } from "../impl/storage/Storage";

if(!window.localStorage) {
	// Chrome 4 的 localStorage 为 null 且属性只读，只能整体替换
	defineProperty(window, "localStorage", { value: new Storage(), configurable: true });
}
