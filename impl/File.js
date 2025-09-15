export function createFileFactory() {
	try {
		return new Function("class File extends Blob {" +
			"constructor(chunks, name, opts) {" +
			"opts = opts || {};" +
			"super(chunks, opts || {});" +
			"var names = name.split(/(\\/|\\\)/);" +
			"this.name = names[names.length - 1]" +
			"this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();" +
			"this.lastModified = +this.lastModifiedDate;" +
			"}};" +
			"return new File([], \"\"), File"
		);
	} catch(e) {
		return function(Blob) {
			return function File(b, d, c) {
				var blob = new Blob(b, c);
				var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();

				var names = d.split(/(\/|\\)/);
				blob.name = names[names.length - 1];
				blob.lastModifiedDate = t;
				blob.lastModified = +t;
				blob.toString = function() {
					return "[object File]";
				};

				return blob;
			};
		};
	}
}
