import { JSON } from "../native/JSON";
import { nonEnumerable } from "../support/nonEnumerable";
import stringify from "./JSON/stringify";
import parse from "./JSON/parse";

export default JSON && nonEnumerable ? JSON : {
	parse: parse,
	stringify: stringify
};