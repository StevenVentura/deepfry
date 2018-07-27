
  var fs = require('fs');
  var os = require('os'); os.tmpDir = os.tmpdir;
const {clipboard} = require('electron')
//load up HTMLUnit JK u have to use selenium for javascript
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
//https://stackoverflow.com/questions/22426273/chromeoptions-causes-reference-error-using-selenium-chromedriver-for-node-js
//https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/chrome/ChromeOptions.html

//LEFT OFF HERE
////var options = new chrome.Options();
////console.log(options.getOwnPropertyNames())
////options.setHeadless(true);




//https://sites.google.com/a/chromium.org/chromedriver/capabilities
//https://stackoverflow.com/questions/26894071/chromedriver-selenium-automate-downloads?noredirect=1&lq=1
/*var dc = DesiredCapabilities.CHROME
dc['loggingPrefs'] = {'browser': 'ALL'}

var chrome_profile = webdriver.ChromeOptions()
var profile = {"download.default_directory": "C:\\SeleniumTests\\PDF",
           "download.prompt_for_download": False,
           "download.directory_upgrade": True,
           "plugins.plugins_disabled": ["Chrome PDF Viewer"]}
chrome_profile.add_experimental_option("prefs", profile)

const chromeCapabilities = webdriver.Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {args: ['--headless']});
*/
//https://developers.google.com/web/updates/2017/04/headless-chrome#drivers

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var deepfryurl = "https://deepfriedmemes.com/";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function frymeme()
{
	var driver = new webdriver.Builder()
    //.withCapabilities(chromeCapabilities)
    .withCapabilities(webdriver.Capabilities.chrome())
	//https://stackoverflow.com/questions/46637063/selenium-webdriver-nodejs-equivalent-to-java-code-for-desiredcapabilities
	//.withCapabilities(
	/*{
						'browserName': 'chrome', 
						'name':'Rhodesia', 
						'prefs': {
						"download.default_directory": "C:\\Users\\Velentium\\Desktop\\steven\\dumpster",
						"download.prompt_for_download": false,
						"download.directory_upgrade": true,
						"plugins.plugins_disabled": ["Chrome PDF Viewer"]}
						,'detatch':true
						}*/
	//					options.toCapabilities())
	//https://sites.google.com/a/chromium.org/chromedriver/capabilities
    .build();
//https://seleniumhq.github.io/selenium/docs/api/java/org/openqa/selenium/chrome/ChromeOptions.html
	//document.activeElement
    driver.get(deepfryurl);
	console.log("waiting for window to open");
	var query = await driver.wait(webdriver.until.elementLocated(webdriver.By.id("imageLoader")), 300000);
	
	console.log("it opened");
	//https://stackoverflow.com/questions/36771005/simulate-key-press-in-selenium-webdriverjs
	//driver.executeScript("document.execCommand('Paste');");
	//https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/input_exports_Key.html
	
	//var x = document.activeElement
	//browser.switchTo().activeElement().sendKeys('Test')
	/*
	
	https://stackoverflow.com/questions/9726005/how-to-click-on-input-type-file-across-browsers-using-selenium-webdriver
	
	The proper way to upload a file on any OS is to

Find the <input type='file'> element. You need not to worry about different implementations and exact positioning. Just find the element for example by xpath //input[@type='file']
sendKeys() or type() (or whatever method writes text into elements in your language) the path to file to that input element.
Sample Java code:

// find the input element
WebElement elem = driver.findElement(By.xpath("//input[@type='file']"));
// 'type' the file location to it as it were a usual <input type='text' /> element
elem.sendKeys("C://path/To/File.jpg");
This works on every OS and browser in WebDriver.

$('imageLoader').sendKeys('C:\Users\Velentium\Desktop\nevro.jpg'))

	1:14pm 7/20/2018
	https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
	var event = new KeyboardEvent(document.activeElement, {
		ctrlKey: true,
		key: "e"
		
	});
	
	
	
	document.activeElement.dispatchEvent((() => {var e = document.createEvent('ClipboardEvent'); e.initEvent('paste',true,true); return e}))
	https://github.com/xolvio/chimp/issues/385
function triggerPasteEvent(element) {
    var pasteEvent = document.createEvent('ClipboardEvent')
    pasteEvent.initEvent('paste', true, true)
    element.dispatchEvent(pasteEvent)
}
	https://stackoverflow.com/questions/8789975/fire-a-paste-event-in-javascript
Try using document.createEvent and the necessary arguments to imitate the "paste" action (e.g. CTRL-V).

There is likely also a "paste" event which can be created and dispatched but browser support may (will!) vary.


	*/
	
	
	/*var image = null;
	clipboard.writeImage(image);
	fs.writeFile('C:\\Users\\Velentium\\Desktop\\nevro2.jpg',, (err3) =>
	{
		
	});
	*/
	await driver.findElement(webdriver.By.id("imageLoader")).then(
	async function (pasteToMe) {
		
		pasteToMe.sendKeys(process.argv[2]).then(//clipboard.readText())
		async function (pass1){
			
		},
		async function (err2){
			console.log("failed btw");
			console.log(err2);
		});
	
	}, function (err1){});
	
	
	//driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
	
	



	
	//click on button
	await driver.findElement(webdriver.By.id("dl-btn")).then(
	
	async function(button) {
		//https://stackoverflow.com/questions/40258039/how-to-scroll-to-element-with-selenium-and-node-js-driving-firefox
		
		var clickAgain = true;
		while(clickAgain == true) {
		
		await driver.executeScript("arguments[0].scrollIntoView()", button);
		
		button.click().then(async function (passed) {
			clickAgain = false;
		}, async function (failed) {
			clickAgain = true;
		});
		}
		
	}, async function (err3){
		console.log(err3);
	});
	
	
	
}

frymeme();




/*
7/26/18
making it better
var imageHandle = by.getElementByID("canvas");
var imageData = imageHandle.toDataURL();
save the thing
https://stackoverflow.com/questions/10257781/can-i-get-image-from-canvas-element-and-use-it-in-img-src-tag/19672059
var image = new Image();
image.id = "pic"
image.src = imageData;
document.getElementById('image_for_crop').appendChild(image);

so like

CURRENTLY 7/26/18 11:02AM:
i am using Java to put the "unfried" image onto my clipboard
[](really i should be using an ahk binding)

i am using javascript to open selenium, paste the image, and click on the download button

Now i can:
run AHK script that uses a button press (ctrl+shift+alt+d) to put image on clipboard & run nodejs program; maybe the nodejs program source could fit in the .exe somehow?
use this nodejs source to 


ugh i can just do an offline thing because you can just save the webpage onto disc













*/