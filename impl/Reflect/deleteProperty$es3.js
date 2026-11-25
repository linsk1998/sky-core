// es3 降级实现（无访问器环境）：defineProperty$es3 把描述符存在 "@@desc:" 前缀键上，
// 删除属性时需一并清掉描述符记录
export function deleteProperty$es3(target, propertyKey) {
	delete target["@@desc:" + propertyKey];
	delete target[propertyKey];
	return true;
};
