
export function values(target, varArgs) {
	var ownProps = Object.keys(obj),
		i = ownProps.length,
		resArray = new Array(i); // preallocate the Array
	while(i--)
		resArray[i] = obj[ownProps[i]];

	return resArray;
}