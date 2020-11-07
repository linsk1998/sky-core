import {getCurrentScript} from "../utils-compat/getCurrentScript";
if(!Object.defineProperties){
	Object.defineProperty(document,"currentScript",{
		get:getCurrentScript
	});
}