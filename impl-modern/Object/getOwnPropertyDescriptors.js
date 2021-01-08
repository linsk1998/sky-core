
export function getOwnPropertyDescriptors(obj) {
	var ownKeys = Object.keys(obj);
	var i = ownKeys.length;
	var descs = {};
	while(i-- > 0) {
		var key = ownKeys[i];
		var set = obj.__lookupSetter__(key);
		var get = obj.__lookupGetter__(key);
		if(set || get) {
			var desc = {
				enumerable: true,
				configurable: true
			};
			desc.set = set;
			desc.get = get;
			descs[key] = desc;
		}
	}
	return descs;
}