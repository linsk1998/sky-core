import { Date } from "../../../native/Date";
import { toLocaleFormat } from "../../../impl/Date/prototype/toLocaleFormat";

//部分浏览器支持
definePrototype(Date, 'toLocaleFormat', toLocaleFormat);