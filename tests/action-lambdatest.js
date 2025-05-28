const { Builder, By, until } = require('selenium-webdriver');

const ltOption = {
	name: 'core-js',
	build: '0.17.0',
	project: "sky-core"
};

// username: Username can be found at automation dashboard
const username = process.env.LT_USERNAME;

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const accessKey = process.env.LT_ACCESS_KEY;

const hubUrl = 'https://' + username + ':' + accessKey + '@hub.lambdatest.com/wd/hub';

async function corejsTest(capabilities) {
	return seleniumTest(
		'http://raw.githack.com/linsk1998/sky-core/master/docs/tests/corejs/3.html',
		capabilities
	);
}
async function seleniumTest(url, capabilities) {
	// Setup Input capabilities, Know more about LamdbdaTest Capabilities: https://www.lambdatest.com/capabilities-generator/

	// const hubUrl = 'http://192.168.190.1:4444/wd/hub';

	// Setup and build selenium driver object
	// 配置WebDriver以连接到Selenium Hub  
	let driver = await new Builder()
		.withCapabilities(capabilities)
		.usingServer(hubUrl)
		.build();

	try {
		// Navigate to a URL, click on the first and second list items and add a new one in the list.
		await driver.get(url);
		// 等待 QUnit 测试完成，确保结果区域加载出来
		let resultPanel = await driver.wait(until.elementLocated(By.id('qunit-testresult')), 10000);

		const [passed, failed] = await Promise.all([
			driver.wait(until.elementTextMatches(
				resultPanel.findElement(By.className('passed')),
				/\d+/)
			).getText(),
			driver.wait(until.elementTextMatches(
				resultPanel.findElement(By.className('failed')),
				/\d+/)
			).getText()
		]);
		let passedCount = parseInt(passed, 10);
		let failedCount = parseInt(failed, 10);

		if(failedCount === 0 && passedCount > 0) {
			console.log(`All QUnit tests passed! Passed: ${passedCount}`);
			await driver.executeScript('lambda-status=passed');
		} else {
			console.log(`Some QUnit tests failed. Passed: ${passedCount}, Failed: ${failedCount}`);
			throw new Error("tests failed");
		}
	} catch(err) {
		console.log("test failed with reason " + err.message);
		await driver.executeScript('lambda-status=failed');
		throw err;
	} finally {
		await driver.quit();
	}
}

// { browserName: "Chrome", browserVersion: "latest", "LT:Options": { platformName: "Windows 10", ...ltOption } },
// { browserName: "Chrome", browserVersion: "61", "LT:Options": { platformName: "Windows 10", ...ltOption } },
// { browserName: "Internet Explorer", browserVersion: "11", "LT:Options": { platformName: "Windows 7", ...ltOption } },
// { browserName: "Internet Explorer", browserVersion: "10", "LT:Options": { platformName: "Windows 7", ...ltOption } },
Promise.all([
	corejsTest({ browserName: "Chrome", browserVersion: "61", "LT:Options": { platformName: "Windows 10", ...ltOption } }),
	corejsTest({ browserName: "Internet Explorer", browserVersion: "10", "LT:Options": { platformName: "Windows 7", ...ltOption } }),
]).then(() => {
	process.exit(0);
}, (e) => {
	// 进行一些错误报告
	console.error(e);
	process.exit(1);
});