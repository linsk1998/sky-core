import { toJSON } from "../../../impl/Date/prototype/toJSON";

if(!('toJSON' in Date.prototype) || new Date(0).toJSON() !== '1970-01-01T00:00:00.000Z') {
	Date.prototype.toJSON = toJSON;
}