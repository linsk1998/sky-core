import { stringify as json_stringify } from "../../impl/JSON/stringify";
export var stringify = globalThis.JSON ? JSON.stringify : json_stringify;