var JSON = this.JSON;
if(!JSON) {
	this.JSON = JSON = new Object();
}
if(!JSON.parse) {
	JSON.parse = new Function("json", "return eval('(' + json + ')')");
}