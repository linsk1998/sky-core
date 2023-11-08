import { Promise } from "../Promise";
import { allSettled } from "../../impl/Promise/allSettled";
if(!Promise.allSettled) {
	Promise.allSettled = allSettled;
}