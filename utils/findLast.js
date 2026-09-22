
export function findLast(arr,key,value){
	for(var i=arr.length-1; i>=0; i--){
		if(arr[i][key]===value){return value;}
	}
};