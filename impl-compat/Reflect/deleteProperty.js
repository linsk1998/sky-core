export function deleteProperty(target, prop){
	delete target["@@desc:"+prop];
	delete target[prop];
};