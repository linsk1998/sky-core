
if (!Math.trunc) {
	Math.trunc = function(it) {
		return (it > 0 ? Math.floor : Math.ceil)(it);
	}
}