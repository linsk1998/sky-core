import { definePrototype } from "sky-core/utils/definePrototype";
import { Promise } from "../../Promise";
import promise_finally from "../../../impl/Promise/finally";

definePrototype(Promise, 'finally', promise_finally);
