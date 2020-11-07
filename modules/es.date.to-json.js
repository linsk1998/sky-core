import "./es.date.to-iso-string";
if(!Date.prototype.toJSON){
	Date.prototype.toJSON=Date.prototype.toISOString;
}