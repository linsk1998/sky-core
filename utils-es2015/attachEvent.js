export function attachEvent(ele, type, func, useCapture) {
	ele.addEventListener(type, func, useCapture);
};