import "sky-core/polyfill/Array/prototype/@@iterator";
import "sky-core/polyfill/String/prototype/@@iterator";
import iterator from "sky-core/pure/Symbol/iterator";

// form babel helper
// 这是个简化版的createIteratorHelper，没有ArrayLike支持，用于遍历可迭代对象
export function createIteratorHelper(o) {
	var it = o[iterator];

	if(!it) return null;

	var normalCompletion = true,
		didErr = false,
		err;

	// "it" is being reassigned multiple times to reduce the variables (bundle size)
	// thus TypeScript can't infer the correct type of the "it"
	return {
		s: function() {
			it = it.call(o);
		},
		n: function() {
			var step = it.next();
			normalCompletion = step.done;
			return step;
		},
		e: function(e) {
			didErr = true;
			err = e;
		},
		f: function() {
			try {
				if(!normalCompletion && it.return != null) {
					it.return();
				}
			} finally {
				if(didErr) throw err;
			}
		},
	};
}