import {keys} from "sky-core/pure/Object/keys";
export function entries(obj) {
	var ownProps = keys(obj),
		i = ownProps.length,
		resArray = new Array(i); // preallocate the Array
	while (i--)
		resArray[i] = [ownProps[i], obj[ownProps[i]]];

	return resArray;
}