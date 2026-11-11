// 移植自 MDN Date() 构造函数与 Date.parse() 文档中的 ISO 日期时间字符串示例
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
//
// 覆盖 ES 的日期时间字符串格式（Date Time String Format）：
//   YYYY-MM-DDTHH:mm:ss.sssZ / YYYY-MM-DDTHH:mm:ss.sss±HH:mm / 省略毫秒 / 省略时区

QUnit.test('Date constructor ISO string (MDN)', assert => {
	// Date(): const birthday = new Date("1995-12-17T03:24:00");
	// 不带时区的时间串按本地时间解析
	assert.same(new Date("1995-12-17T03:24:00").getTime(), new Date(1995, 11, 17, 3, 24, 0).getTime(), 'omit zone = local time');
	assert.same(new Date("1995-12-17T03:24:00Z").toISOString(), '1995-12-17T03:24:00.000Z', 'Z = UTC');
	assert.same(new Date("1995-12-17T03:24:00.250Z").toISOString(), '1995-12-17T03:24:00.250Z', 'fractional seconds');
	assert.same(new Date("1995-12-17T03:24:00+08:00").toISOString(), '1995-12-16T19:24:00.000Z', 'positive offset');
	assert.same(new Date("1995-12-17T03:24:00-05:30").toISOString(), '1995-12-17T08:54:00.000Z', 'negative offset');
	assert.same(new Date("2011-11-11T11:11:11.111Z").getTime(), 1321009871111, 'fixed timestamp');

	// Date.parse(): "Using Date.parse()" 的前三个调用都返回 1546300800000
	assert.same(Date.parse("2019-01-01"), 1546300800000, 'date-only implies UTC');
	assert.same(Date.parse("2019-01-01T00:00:00.000Z"), 1546300800000, 'explicit UTC');
	assert.same(Date.parse("2019-01-01T00:00:00.000+00:00"), 1546300800000, 'explicit +00:00');
	// 有日期和时间但没时区，按本地时间
	assert.same(Date.parse("2019-01-01T00:00:00"), new Date(2019, 0, 1).getTime(), 'date-time without zone = local time');

	// Date.parse() demo: const unixTimeZero = Date.parse("1970-01-01T00:00:00Z");
	assert.same(Date.parse("1970-01-01T00:00:00Z"), 0, 'unix epoch');

	// MDN 不变量：毫秒为 0 的日期，valueOf() 应等于 Date.parse(toISOString())
	const date = new Date(2019, 4, 23, 10, 30, 0);
	assert.same(Date.parse(date.toISOString()), date.valueOf(), 'toISOString round-trip');
	// new Date(str) 与 Date.parse(str) 等价
	assert.same(new Date("2019-01-01T00:00:00.000Z").getTime(), Date.parse("2019-01-01T00:00:00.000Z"), 'constructor equals parse');
});
