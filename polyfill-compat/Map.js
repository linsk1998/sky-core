import {Map as MapImpl} from "../impl/Map";
if(!globalThis.Map){
	globalThis.Map=MapImpl;
}