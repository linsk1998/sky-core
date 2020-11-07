import {prefixIntrger2 as pad2} from "../../../utils/prefixIntrger2";
if(!Date.prototype.toLocaleFormat){//部分浏览器支持
	Date.prototype.toLocaleFormat = function(format) {
		var Y=this.getFullYear();
		var M=pad2(this.getMonth()+1);
		var D=pad2(this.getDate());
		var h=pad2(this.getHours());
		var m=pad2(this.getMinutes());
		var s=pad2(this.getSeconds());
		var o={
			"%x":Y+"/"+M+"/"+D,
			"%X":h+":"+m+":"+s,
			"%Y":Y,
			"%y":pad2(this.getYear()%100),
			"%m":M,
			"%e":this.getDate(),
			"%d":D,
			"%H":h,
			"%i":pad2(this.getHours()%12),
			"%M":m,
			"%S":s,
			"%p":this.getHours()%12>1?"PM":"AM",
			"%%":"%"
		};
		o["%T"]=o["%X"];
		return format.replace(/%[xXTYymedHiMSp%]/g,function(word){
			for(var k in o){
				if(k==word){
					return o[k];
				}
			}
			return word;
		});
	};
}