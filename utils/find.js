
export function find(arr,key,value){
	for(var i=0; i<arr.length; i++){
		if(arr[i][key]===value){return arr[i];}
	}
};