import {Set as SetImpl} from "../impl/Set";
if(!globalThis.Set){
	globalThis.Set=MapImpl;
}