import { Object } from "../../native/Object";
import { seal } from "../../impl/Object/seal";

if(!Object.seal) {
	Object.seal = seal;
}