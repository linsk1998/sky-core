import "./defineProperty";
import "./keys";
import { defineProperties } from "../../impl/Object";
if(!Object.defineProperties){
	Object.defineProperties=defineProperties;
}