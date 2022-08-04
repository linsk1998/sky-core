import { Number } from "../../native/Number";
if(Number.EPSILON === undefined) {
	Number.EPSILON = Math.pow(2, -52);
}