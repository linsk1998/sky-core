import { Array } from "../../native/Array";
import { fromAsync } from "../../impl/Array/fromAsync";
if(!Array.fromAsync) {
	Array.fromAsync = fromAsync;
}
