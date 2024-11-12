
const fs = require("fs");
const path = require("path");

function createRollupPlugin(browser) {
	if(!browser) {
		return {
			resolveId(id) {
				var prefix = "sky-core/";
				if(id.startsWith(prefix)) {
					return path.resolve(__dirname, "./" + id.substring(prefix.length, id.length));
				}
			}
		};
	}
	return {
		resolveId(id) {
			var suffix, bid;
			var prefix = "sky-core/utils/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				bid = path.resolve(__dirname, "./utils-" + browser + "/" + suffix + ".js");
				if(fs.existsSync(bid)) {
					return bid;
				} else {
					return path.resolve(__dirname, "./utils/" + suffix + ".js");
				}
			}
			prefix = "sky-core/polyfill/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				bid = path.resolve(__dirname, "./polyfill-" + browser + "/" + suffix + ".js");
				if(fs.existsSync(bid)) {
					return bid;
				} else {
					return path.resolve(__dirname, "./polyfill/" + suffix + ".js");
				}
			}
			prefix = "sky-core/pure/";
			if(id.startsWith(prefix)) {
				suffix = id.substring(prefix.length, id.length);
				bid = path.resolve(__dirname, "./pure-" + browser + "/" + suffix + ".js");
				if(fs.existsSync(bid)) {
					return bid;
				} else {
					return path.resolve(__dirname, "./pure/" + suffix + ".js");
				}
			}
		}
	};
}
createRollupPlugin.default = createRollupPlugin;
module.exports = createRollupPlugin;