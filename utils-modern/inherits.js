
// import "core-js/modules/es.object.set-prototype-of";
// import "core-js/modules/es.object.create";
export function inherits(clazz,superClazz){
	Object.setPrototypeOf(clazz,superClazz);
	clazz.prototype=Object.create(superClazz.prototype);
	clazz.prototype.constructor=clazz;
}