# sky-core

sky-core是一个处理浏览器兼容问题的polyfill库和工具库。

## 为什么把polyfill库和工具库写成同个库？

1. 浏览器的许多新增函数本就是工具函数
2. 许多工具函数的封装本就是处理兼容问题
3. 部分新增功能不能完美实现，有时必须使用函数调用

# 特色

* 可打包为 IE9以下专用版、IE9+非IE版、ESM版、通用版 这4个版本。在现代浏览器中就不会载入多余的兼容代码了。
* 包含许多Web API的polyfill。比如document.head等。
* 可以配合Typescript和Babel使用。
* 包含无污染版，和有污染版。如果一个有的库需要polyfill，有的不需要，则可以使用无污染版。

# 安装

```bash
npm i sky-core
```

# 使用

## 直接引入

```javascript
import "sky-core/polyfill/document/head";

console.log(document.head);
```

## 结合rollup插件自动引入polyfill

```javascript
//rollup.config.js
import polyfill from "rollup-plugin-polyfill-inject";

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'iife'
	},
	plugins: [
		polyfill({
			"modules": {
				".includes": [
					"sky-core/polyfill/Array/prototype/includes",
					"sky-core/polyfill/String/prototype/includes"
				],
				"Set":"sky-core/polyfill/Set",
				"Map":"sky-core/polyfill/Map",
			},
		})
	]
}
```

```javascript
//before
console.log([].includes('a'));
```

```javascript
//after
import "sky-core/polyfill/Array/prototype/includes";
import "sky-core/polyfill/String/prototype/includes";

console.log([].includes('a'));
```

## 结合rollup插件只在部分时候无污染引入polyfill

```javascript
//rollup.config.js
import inject from "@rollup/plugin-inject";

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'iife'
	},
	plugins: [
		inject({
			"modules": {
				"XMLHttpRequest":"sky-core/polyfill/XMLHttpRequest"
			},
			include:["**/ajax.js"]
		})
	]
}
```

```javascript
//browser.js
export const isIE6=!window.XMLHttpRequest;
//XMLHttpRequest will NOT replace to polyfill
```

```javascript
//ajax.js
export function get(url){
	//XMLHttpRequest will replace to polyfill
	var xhr=new XMLHttpRequest();
	return new Promise(function(){
		//...
	});
}
```

# 约定

在低版本浏览器下，部分功能是不能完全实现的。因此需要按照以下约定开发从而避免出现浏览器差异。

## 对象的特殊的成员

你的对象不允许占用“\_\_proto\_\_”、“constructor”这2个成员变量。否则原型相关功能可能运行不正确。如：Object.getPrototypeOf。

## Symbol成员表示

本项目将使用“@@”开头表示Symbol。如果您使用在对象中使用“@@”开头的成员，在Object.keys等函数中将被跳过。

## 不可枚举成员表示

本项目将使用“\_\_”开头命名不可枚举成员。如果您使用在对象中使用“\_\_”开头的成员，在Object.keys等函数中将被跳过。

## 不可在业务代码中使用defineProperty

defineProperty无法polyfill，因此不允许在业务代码中使用defineProperty。在框架中可以根据浏览器兼容情况进行降级处理。

# 不支持的功能

* 不支持IE11开发工具仿真IE8及以下版本（真机支持）。
* 不支持伪装成Native函数，函数toString()不会返回“native code”。
* 不支持function .prototype .name。
* 不支持不可枚举
* Symbol WellKnow 只支持hasInstance、iterator