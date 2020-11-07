import "./toISOString";
if(!Date.prototype.toJSON){
	Date.prototype.toJSON=Date.prototype.toISOString;
}