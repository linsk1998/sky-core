// class 语法直写版（仅可解析 class 的环境使用，es2015 tier）：与 impl/File 的
// createFileFactory 运行时双模式版能力等价，省去 new Function 探测
export class File$class extends Blob {
	constructor(chunks, name, opts) {
		opts = opts || {};
		super(chunks, opts);
		var names = name.split(/(\/|\\)/);
		this.name = names[names.length - 1];
		this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
		this.lastModified = +this.lastModifiedDate;
	}
}
