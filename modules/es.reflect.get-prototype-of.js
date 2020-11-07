import "core-js/modules/es.global-this";
import "core-js/modules/es.object.get-property-of";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.getPrototypeOf){
	Reflect.getPrototypeOf=Object.getPrototypeOf;
}