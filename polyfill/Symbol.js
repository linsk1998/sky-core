import "./globalThis";
import {Symbol} from "../impl/Symbol";
if(!globalThis.Symbol){
	globalThis.Symbol=Symbol;
}else if(!globalThis.Symbol.iterator){
	globalThis.Symbol.iterator=Symbol("iterator");
}