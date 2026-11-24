// 数组代理的公共基座：方法挂在 ProxyArray.prototype 上，全部实例共享；
// 每个实例只携带 @@target / @@handler / length。
// es5 版（defineProperty 实现）与 es3 版共用此原型方法。
// instanceof Array 的识别由 helpers-*/instanceof（babel 编译 instanceof
// 运算符时注入）处理；Array.isArray 的识别在其 polyfill（impl/Array/isArray）
// 里经 @@target 标记维护。
export var arrayMethods = [
	'entries', 'every', 'forEach', 'keys', 'values', '@@iterator',
	'at', 'find', 'findIndex', 'findLast', 'findLastIndex', 'includes', 'indexOf', 'lastIndexOf', 'some',
	'join', 'map', 'reduce', 'reduceRight', 'toLocaleString', 'toString', 'valueOf',
	'concat', 'copyWithin', 'filter', 'flat', 'flatMap', 'slice', 'toReversed', 'toSorted', 'toSpliced', 'with',
	'fill', 'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift',
];

export var TARGET_KEY = '@@target';
export var HANDLER_KEY = '@@handler';

// 会写入 length 的方法：调用后长度变化经 set 陷阱报告
var lengthWriteMethods = {
	push: 1, pop: 1, shift: 1, unshift: 1, splice: 1
};

export function ProxyArray() { /* empty */ }
var proto = ProxyArray.prototype;
(function() {
	var i = arrayMethods.length;
	while(i--) {
		proto[arrayMethods[i]] = proxyArrayMethod(arrayMethods[i]);
	}
})();

// 数组操作一律在目标对象上执行（见 es5 版 proxyArrayMethod 的说明）；
// es3 版额外同步 length：放弃截持，创建时取自 target，每次方法调用后刷新
function proxyArrayMethod(key) {
	var writesLength = !!lengthWriteMethods[key];
	return function() {
		var me = this;
		var target = me[TARGET_KEY];
		var handler = me[HANDLER_KEY];
		var method = handler.get ?
			handler.get(target, key, me) :
			target[key];
		var len = target.length;
		if(!writesLength && handler.get) {
			// 读取类方法：触发 length 读陷阱（近似：实际执行仍按真实 length）
			handler.get(target, "length", me);
		}
		var r = method.apply(target, arguments);
		if(writesLength && target.length !== len) {
			if(handler.set) {
				if(handler.set(target, "length", target.length, me) === false) {
					throw new TypeError("'set' on proxy: trap returned falsish for property 'length'");
				}
			}
			me.length = target.length;
		}
		return r;
	};
}
