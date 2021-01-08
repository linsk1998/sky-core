// https://github.com/samthor https://gist.github.com/64b114e4a4f539915a95b91ffd340acc
// 这个会解决 10.3 版本同时加载 nomodule 脚本的 bug，但是仅限于外部脚本，对于内联的是没用的
// fix 的核心就是利用 document 的 beforeload 事件来阻止 nomodule 标签的脚本加载
(function () {
	var check = document.createElement('script');
	if (!('noModule' in check) && 'onbeforeload' in check) {
		var support = false;
		document.addEventListener('beforeload', function (e) {
			if (e.target === check) {
				support = true;
			} else if (!e.target.hasAttribute('nomodule') || !support) {
				return;
			}
			e.preventDefault();
		}, true);

		check.type = 'module';
		check.src = '.';
		document.head.appendChild(check);
		check.remove();
	}
}());