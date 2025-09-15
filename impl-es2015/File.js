class File extends Blob {
	constructor(chunks, name, opts) {
		opts = opts || {};
		super(chunks, opts);
		var names = name.split(/(\/|\\)/);
		this.name = names[names.length - 1];
		this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
		this.lastModified = +this.lastModifiedDate;
	}
}