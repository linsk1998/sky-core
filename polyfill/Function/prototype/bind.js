import { bind } from "../../../impl/Function/prototype/bind";

if(!Function.prototype.bind) {
	Function.prototype.bind = bind;
}