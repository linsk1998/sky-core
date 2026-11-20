// enumIteratorHelper: 公共的迭代器遍历 helper 壳
// s/n/e/f 四方法统一实现；enumIterableHelper / enumSetLikeHelper 各自负责拿到迭代器对象再调用本函数
export function enumIteratorHelper(it) {
	if(it === null || (typeof it !== 'object' && typeof it !== 'function')) {
		throw new TypeError('Iterator is not an object');
	}
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
