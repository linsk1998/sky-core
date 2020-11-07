
export function pluck(arr,key){
	return arr.map(function(item){
		return item[key];
	});
};