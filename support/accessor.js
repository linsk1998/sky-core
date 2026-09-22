import { defineProperties } from "../native/Object/defineProperties";
import { __defineSetter__ } from "./__defineSetter__";

export var accessor = !!defineProperties || __defineSetter__;