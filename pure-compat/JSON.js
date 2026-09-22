import { JSON } from "../native/JSON";
import stringify from "./JSON/stringify";
import parse from "./JSON/parse";

export default JSON ? JSON : {
	parse: parse,
	stringify: stringify
};