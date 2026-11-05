// JavaScript Document


var sw;
var sh;
var wid;
var hei;
var isOnload = false;
var flashNode;
var divId = "flashcontent";
var limitW = 1680;
var limitH = 960;
function checkSize()
{
	if(uaObject.ua.isWin && uaObject.ua.isIE)
	{
		//sw = document.body.clientWidth;
		//	sh = document.body.clientHeight;
		sw = document.documentElement.clientWidth;
		sh = document.documentElement.clientHeight;
	}
	else
	{
		sw = window.innerWidth;
		sh = window.innerHeight;
	}
	
	wid = sw;
	hei = sh;
	if(sw > limitW)
	{
		wid = limitW;
	}
	
	if(sh > limitH)
	{
		hei = limitH;
	}
}


function changeSize()
{
	document.getElementById(divId).style.width = wid + "px";
	document.getElementById(divId).style.height = hei + "px";
	document.getElementById(divId).style.top = (sh - hei)/2 + "px";
	document.getElementById(divId).style.left = (sw - wid)/2 + "px";
}

function addResizeEvent()
{
	isOnload = true;
	flashNode = document.getElementById(divId);
	resizeHandler();
	window.onresize = function()
	{
		resizeHandler();
	}
	
	
}


var timer;
var count;
var flg = false;
function resizeHandler()
{
	if(uaObject.ua.isWin && uaObject.ua.isIE)
	{
		count = 0;
		clearInterval(timer);
		flg = false;
		timer = setInterval(resizeChangeSize, 1);
	}
	else
	{
		checkSize();
		changeSize();
	}
}

function resizeChangeSize()
{
	count += 1;
	if(count == 4)
	{
		clearInterval(timer);
	}
	checkSize();
	changeSize();
}


function installFinish()
{
	top.location.reload(true);
}


function writeSwf()
{
	var p = getParams();
	var flashvars = {};
	flashvars.baseurl = document.URL;
	flashvars.tracker_code = "";
	flashvars.wwwhostname = "";
	flashvars.sslhostname = "";
	var param = {allowFullScreen:"true", allowScriptAccess:"always", menu:"false", scale:'noScale', salign:'lt'};
	var attributes = {id:"flashcontent", name:"flashcontent"};
	swfobject.embedSWF("main.swf", "flashcontent", "100%", "100%", "9.0.124", "expressInstall.swf", flashvars, param, attributes);
	if(uaObject.ua.isMac)
	{
		swfmacmousewheel.registerObject(attributes.id);
	}
}


setBaseLoadEvent(addResizeEvent);

//writeSwf();
checkSize();

var cssTxt = '<style type="text/css">'
	+'#'+ divId +'{'
	+'width:' + wid + 'px;'
	+'height:' + hei + 'px;'
	+'position:absolute;'
	+'top:' + (sh - hei)/2 + 'px;'
	+'left:' + (sw - wid)/2 + 'px;'
	+'text-align:center;'
	+'}'
	+'<\/style>';
document.write(cssTxt);





