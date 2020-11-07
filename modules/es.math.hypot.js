
if(!Math.hypot){
	Math.hypot=function(value1, value2) {
		var sum = 0;
		var i = 0;
		var aLen = arguments.length;
		var larg = 0;
		var arg, div;
		while (i < aLen) {
			arg = Math.abs(arguments[i++]);
			if (larg < arg) {
				div = larg / arg;
				sum = sum * div * div + 1;
				larg = arg;
			} else if (arg > 0) {
				div = arg / larg;
				sum += div * div;
			} else sum += arg;
		}
		return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	}
}