import {prefixIntrger2} from "./prefixIntrger2"
export function prefixIntrger3(number) {
	if(number<100){
		return '0'+prefixIntrger2(number);
	}
	return number;
};