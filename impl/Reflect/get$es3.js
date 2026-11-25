// es3 降级实现（无访问器环境）：直接读 defineProperty$es3 存在 "@@desc:" 前缀键上的描述符，
// 不沿原型链逐层查描述符，读不到时按普通属性读取（原生语义本身会沿链）
export function get$es3(target, propertyKey, receiver) {
	if(receiver === void 0) { receiver = target; }
	var desc = target["@@desc:" + propertyKey];
	if(desc) {
		if(desc.get) {
			return desc.get.call(receiver);
		}
		return desc.value;
	}
	return target[propertyKey];
};
