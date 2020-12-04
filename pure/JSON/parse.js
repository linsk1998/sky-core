import { parse as json_parse } from "../../impl/JSON/parse";
export var parse = globalThis.JSON ? JSON.parse : json_parse;