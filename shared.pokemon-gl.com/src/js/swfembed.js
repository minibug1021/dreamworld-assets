var path;
var str;
var api;

function control( pathS, strS, apiS ) 
{
	path = pathS;
	str = strS;
	api = apiS;
	
	var flashvars = { api_host_name:api };
	var param = {
		allowFullScreen:"true",
		allowScriptAccess:"always",
		menu:"false",
		transparent:"opaque",
		scale:"noscale"
	};
	var attributes = { id:"flashcontent" };
	swfobject.embedSWF(
		path+"dummy.swf",
		"flashcontent",
		"250",
		"20",
		"10.0.2",
		path+"expressInstall.swf",
		flashvars,
		param,
		attributes
	)
}

function login( json ) {	
	
	var ini;	
	if( json ) {
		ini = json;
	}
	
	if( navigator.userAgent.indexOf("MSIE") != -1){
		ini = escape( ini );
	}
	
	if (swfobject.hasFlashPlayerVersion("10.0.2"))
	{		
		var para = location.search;
		var s = para.split("&");
		var v = s[0].split("=");
		
		if( s.length > 1 ) {
			var q = s[1].split("=");
		}
		
		var vars1;
		if( v[0] == "?shortcut" ) {
			vars1 = v[1];
		}
		
		var vars2;
		if( v[0] == "?mailto" ) {
			vars2 = v[1];
		}
		
		var vars3;
		if( v[0] == "?rankingto" ) {
			vars3 = v[1];
		}
		
		var vars4;
		if( v[0] == "?infoto" ) {
			vars4 = v[1];
		}
		
		
		var flashvars = { shortcut:vars1, mailto:vars2, rankingto:vars3, infoto:vars4, api_host_name:api, page:str, json:ini, v:"test" };
		var param = {
			allowFullScreen:"true",
			allowScriptAccess:"always",
			menu:"false",
			transparent:"opaque",
			scale:"noscale"
		};
		var attributes = { id:"flashcontent" };
		swfobject.embedSWF(
			path+"main.swf",
			"flashcontent",
			"1003",
			"570",
			"10.0.2",
			path+"expressInstall.swf",
			flashvars,
			param,
			attributes
		)

	}
	else if (swfobject.hasFlashPlayerVersion("6.0.65"))
	{
		// expressinstall
		
		var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
		var playerType = (isIE == true) ? "ActiveX" : "PlugIn";
		var redirectURL = window.location;
		document.title = document.title.slice(0, 47) + " - Flash Player Installation";
		var doctitle = document.title;
		var flashvars = {
			MMredirectURL:redirectURL,
			MMplayerType:playerType,
			MMdoctitle:doctitle
		};
		var param = {
			allowFullScreen:"true",
			allowScriptAccess:"always",
			menu:"false",
			transparent:"opaque",
			scale:"noscale"
		};
		var attributes = { id:"flashcontent" };
		swfobject.embedSWF(
			path+"playerinstall.swf",
			"flashcontent",
			"1003",
			"570",
			"6.0.65",
			path+"expressInstall.swf",
			flashvars,
			param,
			attributes
		)
	}
	else
	{
		// install flash player
		
		document.write("install flash player");
	}
}
	