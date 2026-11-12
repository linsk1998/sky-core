import {prefixIntrger3} from "./prefixIntrger3"
export function prefixIntrger4(number) {
	if(number<1000){
		return '0'+prefixIntrger3(number);
	}
	return number;
};
