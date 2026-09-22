import { iterator } from "../../../impl/String/prototype/@@iterator";
if(!String.prototype['@@iterator']) {
	String.prototype['@@iterator'] = iterator;
}
