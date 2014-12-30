// Starts the process once the user has clicked the extension.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.insertCSS(null, {file: "css/dig-iframe.css"});
    chrome.tabs.executeScript(null, {file: "js/init.js"});
});
