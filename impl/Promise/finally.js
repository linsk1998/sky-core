
export default function(onCompleted) {
	return this.then(onCompleted, onCompleted);
};