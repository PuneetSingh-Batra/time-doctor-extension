$(document).ready(function(){
	$("#authenticate").click(function(){
    var CLIENT_ID = '741_20atolbhuhq8wwsgk8kwowc888wocgwkk8o4gsw8os408owkc4';
    var REDIRECT_URI = 'https://example.com/auth';
    var url = 'https://webapi.timedoctor.com/oauth/v2/auth?client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI + '&response_type=token';
    chrome.tabs.create({url: url});
	});
});
