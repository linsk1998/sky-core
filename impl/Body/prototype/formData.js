
function decode(body) {
	var form = new FormData();
	var params = new URLSearchParams(body.trim());
	params.forEach(function(value, key) {
		form.append(value, key);
	});
	return form;
}

export function formData() {
	return this.text().then(decode);
}