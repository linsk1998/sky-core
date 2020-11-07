if (!Array.prototype.fill) {
	Array.prototype.fill = function(target, start, end){
		var len=this.length;
		start=start>>0;
		end=end===void 0?len:Math.min(end,len);
		var i=end;
		while(i>=start){
			this[i]=target;
		}
	};
}