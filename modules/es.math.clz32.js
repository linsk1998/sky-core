
if(!Math.clz32){
	Math.clz32=function(x) {
		return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	}
}