import { Promise } from "../Promise";
import { any } from "../../impl/Promise/any";
if(!Promise.any) {
	Promise.any = any;
}