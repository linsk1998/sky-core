import { groupBy } from "../../impl/Map/groupBy";

var Map = globalThis.Map;
if(!Map.groupBy) {
	Map.groupBy = groupBy;
}