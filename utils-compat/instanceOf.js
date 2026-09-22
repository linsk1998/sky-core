export function instanceOf(left, right) {
	if(typeof left!=="object"){
		return false;
	}
	if(typeof Symbol!=="undefined"){
		if(left instanceof Symbol){
			return false;
		}
		if(right!=null && right[Symbol.hasInstance]){
			return !!right[Symbol.hasInstance](left);
		}
	}
	var r=left instanceof right;
	if(r) return true;
	if(left instanceof Object){
		return false;
	}
	var proto=left;
	do{
		proto=Object.getPrototypeOf(left);
		if(proto===right.prototype){
			return true;
		}
	}while(proto && proto!==Object.prototype);
	return false;
}