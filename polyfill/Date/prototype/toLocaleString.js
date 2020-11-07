import "./Date.prototype.toLocaleFormat";
//部分非IE浏览器的toLocaleString未国际化
if(new Date().toLocaleString().match(/[a-z]/i)){
	Date.prototype.toLocaleString = function() {
		return this.toLocaleFormat("%Y-%m-%d %H:%M:%S");
	};
	Date.prototype.toLocaleDateString = function() {
		return this.toLocaleFormat("%Y-%m-%d");
	};
	Date.prototype.toLocaleTimeString = function() {
		return this.toLocaleFormat("%H:%M:%S");
	};
}