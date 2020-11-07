if(!Math.atanh){
	Math.atanh=function(x){
		return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	}	
}