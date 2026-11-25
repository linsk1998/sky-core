// es3 降级实现（无访问器环境）：写 defineProperty$es3 存在 "@@desc:" 前缀键上的描述符，
// 无描述符记录时按普通属性写入
export function set$es3(target, propertyKey, value, receiver) {
	if(receiver === void 0) { receiver = target; }
	var desc = target["@@desc:" + propertyKey];
	if(desc) {
		if(desc.set) {
			try {
				desc.set.call(receiver, value);
				return true;
			} catch(e) {
				return false;
			}
		}
		desc.value = value;
		return true;
	}
	target[propertyKey] = value;
	return true;
};
