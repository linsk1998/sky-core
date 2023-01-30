import "./toISOString";
if(!Date.prototype.toJSON || new Date(0).toJSON() !== '1899-12-30T15:54:17.000Z') {
	Date.prototype.toJSON = function(_) {
		if(this.getTime && isNaN(this.getTime())) {
			return null;
		}
		return this.toISOString();
	};
}