"use strict";

/**
 * local-test-runner 的 HTML 插件：
 * 往测试页注入一段 ES3 脚本，收集 QUnit 结果并 POST 回服务器。
 *
 * 相比 local-test-runner 自带的 QUnit 插件，额外收集失败断言明细
 * （测试名 / 消息 / 期望值 / 实际值），供命令行在收尾时输出。
 * 兼容 IE6+ / Firefox1.5+ / 老 Presto Opera：不用 JSON、不用 ES5。
 */

var apiScript = [
	"(function(){",
	"var fails = [];",
	"var current = '';",
	"function fmt(v){",
	"	var t;",
	"	try { t = String(v); } catch(e) { t = '?'; }",
	"	if(t.length > 300) { t = t.substring(0, 300) + '...'; }",
	"	return t;",
	"}",
	"QUnit.testStart(function(t){ current = (t && t.name) || ''; });",
	"QUnit.log(function(d){",
	"	if(d && d.result === false){",
	"		fails.push(current + ' :: ' + fmt(d.message) + ' (expected: ' + fmt(d.expected) + ', actual: ' + fmt(d.actual) + ')');",
	"	}",
	"});",
	"function finish(result){",
	"	setTimeout(function(){",
	"		var form = document.createElement('form');",
	"		form.method = 'POST';",
	"		form.action = '/';",
	"		form.style.display = 'none';",
	"		function add(name, value){",
	"			var input = document.createElement('input');",
	"			input.name = name;",
	"			input.value = value;",
	"			form.appendChild(input);",
	"		}",
	"		add('total', result.total);",
	"		add('passed', result.passed);",
	"		add('runtime', result.runtime);",
	"		add('failures', fails.length);",
	"		for(var i = 0; i < fails.length && i < 50; i++){ add('fail' + i, fails[i]); }",
	"		document.body.appendChild(form);",
	"		form.submit();",
	"	}, 300);",
	"}",
	"QUnit.done ? QUnit.done(finish) : (QUnit.done = finish);",
	"})();"
].join("\n");

var plugin = {
	transformHtml: function() {
		return [{
			injectTo: 'body',
			tag: 'script',
			children: apiScript
		}];
	}
};

module.exports = plugin;
