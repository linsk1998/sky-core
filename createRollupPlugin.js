
const fs = require("fs");
const path = require("path");

var tiers = {
	compat: ["compat", "modern", "es2015"],
	legacy: ["legacy", "modern", "es2015"],
	modern: ["modern", "es2015"],
	es2015: ["es2015"]
};

function createRollupPlugin(browser) {
	if(!browser) {
		return {
			resolveId(id) {
				var prefix = "sky-core/";
				if(id.startsWith(prefix)) {
					return path.resolve(__dirname, "./" + id.substring(prefix.length, id.length) + ".js");
				}
			}
		};
	}
	var list = tiers[browser] || [browser];
	return {
		resolveId(id) {
			var suffix, bid;
			var prefix;
			prefix = "sky-core/utils/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				bid = resolveTier("utils", suffix, list);
				if(bid) {
					return bid;
				}
			}
			prefix = "sky-core/polyfill/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				bid = resolveTier("polyfill", suffix, list);
				if(bid) {
					return bid;
				}
			}
			prefix = "sky-core/pure/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				bid = resolveTier("pure", suffix, list);
				if(bid) {
					return bid;
				}
			}
			prefix = "@babel/runtime/helpers/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				if(suffix.startsWith("esm/")) {
					suffix = suffix.substring(4, suffix.length);
				}
				bid = resolveTier("helpers", suffix, list);
				if(bid) {
					return bid;
				}
			}
		}
	};
}
function resolveTier(type, suffix, list) {
	var i, bid;
	for(i = 0; i < list.length; i++) {
		bid = path.resolve(__dirname, "./" + type + "-" + list[i] + "/" + suffix + ".js");
		if(fs.existsSync(bid)) {
			return bid;
		}
	}
	bid = path.resolve(__dirname, "./" + type + "/" + suffix + ".js");
	if(fs.existsSync(bid)) {
		return bid;
	}
	return null;
}
createRollupPlugin.default = createRollupPlugin;
module.exports = createRollupPlugin;
