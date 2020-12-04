import { toLocaleFormat } from "../../../impl/Date/prototype/toLocaleFormat";
if(!Date.prototype.toLocaleFormat) {//部分浏览器支持
	Date.prototype.toLocaleFormat = toLocaleFormat;
}