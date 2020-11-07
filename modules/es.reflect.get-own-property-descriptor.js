import "core-js/modules/es.global-this";
import "core-js/modules/es.object.get-own-property-descriptor";
if(!globalThis.Reflect){
	globalThis.Reflect=new Object();
}
if(!Reflect.getOwnPropertyDescriptor){
	Reflect.getOwnPropertyDescriptor=Object.getOwnPropertyDescriptor;
}