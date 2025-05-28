const { Builder, By, until } = require('selenium-webdriver');

const sauceOption = {
	name: 'core-js',
	build: '0.17.0',
	tags: ["sky-core"]
};

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;

const hubUrl = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.us-west-1.saucelabs.com/wd/hub`;

function sleep(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, ms);
	});
}

async function corejsTest(capabilities) {
	return seleniumTest(
		'http://raw.githack.com/linsk1998/sky-core/master/docs/tests/corejs/3.html',
		capabilities
	);
}
async function seleniumTest(url, capabilities) {

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
			await driver.executeScript('sauce:job-result=passed');
		} else {
			console.log(`Some QUnit tests failed. Passed: ${passedCount}, Failed: ${failedCount}`);
			throw new Error("tests failed");
		}
	} catch(err) {
		console.log("test failed with reason " + err.message);
		await driver.executeScript('sauce:job-result=failed');
		throw err;
	} finally {
		await driver.quit();
	}
}
Promise.resolve().then(
	() => corejsTest({ browserName: "Internet Explorer", browserVersion: "11", platformName: 'Windows 10', "sauce:options": sauceOption })
).then(
	() => sleep(3000)
).then(
	() => corejsTest({ browserName: 'Chrome', browserVersion: '87', platformName: 'Windows 10', 'sauce:options': sauceOption })
).then(() => {
	process.exit(0);
}, (e) => {
	// 进行一些错误报告
	console.error(e);
	process.exit(1);
});