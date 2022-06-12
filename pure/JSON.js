import { JSON } from "../native/JSON";
import { parse } from "../impl/JSON/parse";
import { stringify } from "../impl/JSON/stringify";
export default JSON ? JSON : {
	parse: parse,
	stringify: stringify
};