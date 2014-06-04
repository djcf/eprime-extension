var ext_status = true;
/** When the button is clicked we need to tell the current page scripts that the extension has been toggled **/
function tellContentScripts(status) {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, {estatus: status});
	});
}

/** Allow the extension to be toggled at will **/
chrome.browserAction.onClicked.addListener(function() {
	if (ext_status) {
		ext_status = false;
		chrome.browserAction.setIcon({path:"icons/eprime-disabled.png"});
		chrome.browserAction.setTitle({ "title": "Enable E' text highlighting"});

		tellContentScripts(ext_status);
	} else {
		ext_status = true;
		chrome.browserAction.setIcon({path:"icons/eprime-19.png"});
		chrome.browserAction.setTitle({ "title": "Disable E' text highlighting"});

		tellContentScripts(ext_status);
	}
});

/** When a page loads, it needs to ask the extension if it is currently ext_status or not.
Here we'll get a message from a page and reply with our current status **/
chrome.extension.onMessage.addListener( function (request, sender, sendResponse) {
    if (request.query == "isEEnabled") {
        sendResponse(ext_status); //Tell the page script our current status
    }
});

/** When the user switches tab, our current status should be propagated to the
content scripts on that page. **/
chrome.tabs.onActivated.addListener(function(activeInfo) {
	tellContentScripts(ext_status)
});