
if(!('finally' in Promise.prototype)){
	Promise.prototype['finally']=function(onCompleted){
		return this.then(onCompleted,onCompleted);
	};
}