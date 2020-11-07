
if(!Array.prototype.lastIndexOf){
	Array.prototype.lastIndexOf = function(e, fromIndex) {
		var i=isNaN(fromIndex)?this.length:fromIndex+1;
		while(i--){
			var j=this[i];
			if(j===e){return i;}
		}
		return -1;
	};
}