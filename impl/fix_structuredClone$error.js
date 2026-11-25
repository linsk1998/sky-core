// 火狐等浏览器的原生 structuredClone 克隆 Error 时不保留原型与自定义字段，
// 传入原生函数，返回先手工克隆修复 Error、其余委派原生的包装版
export function fix_structuredClone$error(base) {
	function structuredClone(obj) {
		if(typeof obj === "object" && obj instanceof Error) {
			var r = Object.create(Object.getPrototypeOf(obj));
			r.message = obj.message;
			r.stack = obj.stack;
			if('cause' in obj) {
				r.cause = obj.cause;
			}
			if('errors' in obj) {
				r.errors = arrayClone(obj.errors);
			}
			return r;
		}
		return base.apply(this, arguments);
	}
	function arrayClone(obj) {
		var r = new Array(obj.length);
		var keys = Object.keys(obj);
		for(var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			r[key] = structuredClone(obj[key]);
		}
		return r;
	}
	return structuredClone;
}
