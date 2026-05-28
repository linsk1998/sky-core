# sky-core

sky-core是一个处理浏览器兼容问题的polyfill库和工具库。

## 为什么把polyfill库和工具库写成同个库？

1. 浏览器的许多新增函数本就是工具函数
2. 许多工具函数的封装本就是处理兼容问题
3. 部分新增功能不能完美实现，有时必须使用函数调用

# 特色

* 专为按条件打包而设计，按照不同的浏览器分5个版本。在现代浏览器中就不会载入多余的兼容代码了。
* 包含许多Web API的polyfill。比如document.head等。
* 可以配合Typescript和Babel使用。
* 包含无污染版，和有污染版。如果一个有的库需要polyfill，有的不需要，则可以使用无污染版。

# 不同条件的兼容性

| 代号 | 支持特性 | 浏览器 |
| ----- | ----- | ----- |
| jscript | IE9以下 | IE5.5~IE8 |
| legacy | 除了上面的以外，所有不支持document.currentScript的浏览器 | IE9~11, Firefox2~3.6, Chrome4~28, Safari3.1~7.1, Opera10~15 |
| classic | 支持document.currentScript，但不支持module的浏览器 | Chrome29~62, Safari8~11.0, Edge12~18, Firefox4~66, Opera16~49 |
| since18 | 支持module | Chrome63+, Safari11.1+, Firefox67+, Edge79+, Opera50+ |
| 开发中 | 支持top-level-await | Chrome89+, Safari27+, Firefox90+, Edge89+, Opera75+ |

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
const polyfill = require("rollup-plugin-polyfill-inject");

module.exports = {
	plugins: [
		polyfill({
			polluting: {
				".includes": [
					"sky-core/polyfill/Array/prototype/includes",
					"sky-core/polyfill/String/prototype/includes"
				],
				"Set":"sky-core/polyfill/Set",
				"Map":"sky-core/polyfill/Map",
			},
			exclude: ["**/node_modules/sky-core/**"]
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
const polyfill = require("rollup-plugin-polyfill-inject");

module.exports = {
	plugins: [
		polyfill({
			pure: {
				"XMLHttpRequest":"sky-core/pure/XMLHttpRequest"
			},
			exclude: ["**/node_modules/sky-core/**"]
		})
	]
}
```

```javascript
// before
export const isIE6=!window.XMLHttpRequest;
export function get(url){
	var xhr=new XMLHttpRequest();
	return new Promise(function(){
		//...
	});
}
```

```javascript
// after
import injectXMLHttpRequest from "sky-core/pure/XMLHttpRequest";

export const isIE6=!window.XMLHttpRequest; //window.XXX和typeof XXX不会改变
export function get(url){
	var xhr=new injectXMLHttpRequest();
	return new Promise(function(){
		//...
	});
}
```


## 结合rollup插件以getter、setter方式引入polyfill

```javascript
//rollup.config.js
const polyfill = require("rollup-plugin-polyfill-inject");

module.exports = {
	plugins: [
		polyfill({
			getter: {
				"document.currentScript": ["sky-core/utils/getCurrentScript", 'getCurrentScript'],
				"window.innerWidth": ["sky-core/utils/getInnerWidth", 'getInnerWidth'],
				"innerWidth": ["sky-core/utils/getInnerWidth", 'getInnerWidth'],
			}
			exclude: ["**/node_modules/sky-core/**"]
		})
	]
}
```

```javascript
// before
console.log(innerWidth)
console.log(window.innerWidth)
```

```javascript
// after
import { getInnerWidth } from "sky-core/utils/getInnerWidth";

console.log(getInnerWidth())
console.log(getInnerWidth())
```

## 结合rollup插件在setTimeout、setInterval使用超过3个参数时才引入polyfill

```javascript
//rollup.config.js
const polyfill = require("rollup-plugin-polyfill-inject");

module.exports = {
	plugins: [
		polyfill({
			timer: {
				"setTimeout": "sky-core/pure/setTimeout",
				"setInterval": "sky-core/pure/setInterval"
			}
			exclude: ["**/node_modules/sky-core/**"]
		})
	]
}
```

```javascript
// before
let args = [0, 1, 2];
setTimeout(function() { }, 0);
setTimeout(function() { });
setTimeout(function() { }, ...args);
setTimeout.apply(window, args);
console.log(setTimeout);
```

```javascript
// after
import argsSetTimeout from "sky-core/pure/setTimeout";

let args = [0, 1, 2];
setTimeout(function() { }, 0);
setTimeout(function() { });
argsSetTimeout(function() { }, ...args);
argsSetTimeout.apply(window, args);
console.log(argsSetTimeout);
```

# 约定

在低版本浏览器下，部分功能是不能完全实现的。因此需要按照以下约定开发从而避免出现浏览器差异。

## 对象的特殊的成员

你的对象不允许占用“\_\_proto\_\_”、“constructor”这2个成员变量。否则原型相关功能可能运行不正确。如：Object.getPrototypeOf。

## Symbol成员表示

本项目将使用“@@”开头表示Symbol。如果您使用在对象中使用“@@”开头的成员，在Object.keys等函数中将被跳过。

## 不可枚举成员表示

本项目将使用“\_\_”开头命名不可枚举成员。且Symbol作key必须是不可枚举的。如果您使用在对象中使用“\_\_”开头的成员或Symbol，在Object.keys等函数中将被跳过。

## 不可在业务代码中使用defineProperty

defineProperty无法polyfill，因此不允许在业务代码中使用defineProperty。在框架中可以根据浏览器兼容情况进行降级处理。

# 不支持的功能

* 不支持IE11开发工具仿真IE8及以下版本（真机支持）。
* 不支持伪装成Native函数，函数toString()不会返回“native code”。（不影响使用）
* 不支持function.prototype.name。（这要rollup、Babel、Teser共同作用才能实现）
* 不支持不可枚举。（浏览器限制本来无法实现）
* Symbol WellKnow 只支持hasInstance、iterator。（浏览器限制本来无法实现）

# 参考项目

* [core-js](https://www.npmjs.com/package/core-js)
* [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch)
* [Blob.js](https://github.com/eligrey/Blob.js)
* [cookie-store](https://github.com/markcellus/cookie-store)

# 特性以及建议使用方式

+ 修复原生功能的，不提供pure功能

| 特性 | 建议使用方式 | 原因 |
| ----- | ----- | ----- |
| RegExp | polyfill | 修复原生功能 |
| Event | pure | DOM相关 |
| Error | polyfill | 修复原生功能 |
