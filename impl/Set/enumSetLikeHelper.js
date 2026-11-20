// form utils/createIteratorHelper
// 用于遍历 set-like 对象的 keys 迭代器
export function enumSetLikeHelper(o) {
	var it = o.keys();

	if(it === null || (typeof it !== 'object' && typeof it !== 'function')) {
		throw new TypeError('Set-like object keys method must return an object');
	}

	// 提前读取 next，等价于规范中先取迭代器记录、再复制 this 的顺序
	var next = it.next;

	var normalCompletion = true,
		didErr = false,
		err;

	return {
		s: function() {},
		n: function() {
			var step = next.call(it);
			if(step === null || (typeof step !== 'object' && typeof step !== 'function')) {
				throw new TypeError('Iterator result is not an object');
			}
			normalCompletion = step.done;
			return step;
		},
		e: function(e) {
			didErr = true;
			err = e;
		},
		f: function() {
			try {
				if(!normalCompletion && it['return'] != null) {
					it['return']();
				}
			} finally {
				if(didErr) throw err;
			}
		},
	};
}
