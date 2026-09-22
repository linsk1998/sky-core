import { Object } from "../../native/Object";
import { groupBy } from "../../impl/Object/groupBy";

if(!Object.groupBy) {
	Object.groupBy = groupBy;
}