import { parse } from "../impl/JSON/parse";
import { stringify } from "../impl/JSON/stringify";
export default this.JSON ? JSON : {
	parse: parse,
	stringify: stringify
};