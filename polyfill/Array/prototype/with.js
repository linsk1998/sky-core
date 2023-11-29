import { withAt } from "../../../impl/Array/prototype/with";
if(!Array.prototype.with) {
	Array.prototype.with = withAt;
}