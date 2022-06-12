export function querySelector(selector,e){
	if(!e){
		e=document;
	}
	return e.querySelector(selector);
};