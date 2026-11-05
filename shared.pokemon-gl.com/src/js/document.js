var isVista = (navigator.userAgent.match(/Win(dows )?NT 6\.0/)) ? true : false;
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.indexOf("Win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var isWinSafari = ( navigator.appVersion.indexOf("Safari") != -1 && isWin ) ? true : false; // version Safari/525.13.3
var versionStr = "";
var tempArray;
var tempString;
var versionArray;
var versionMajor = 0;
var versionMinor = 0;
var versionRevision = 0;
var versionString;
var versionNum;

function JSGetSwfVer(i){
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			descArray = flashDescription.split(" ");
			tempArrayMajor = descArray[2].split(".");
			versionMajor = tempArrayMajor[0];
			versionMinor = tempArrayMajor[1];
			if ( descArray[3] != "" ) {
				tempArrayMinor = descArray[3].split("r");
			} else {
				tempArrayMinor = descArray[4].split("r");
			}
			versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
			flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		} else {
			flashVer = -1;
		}
	}
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else {
		flashVer = -1;
	}
	return flashVer;
}

document.write('<scr' + 'ipt language="VBScript" type="text/vbscript">\n');
document.write('<!--\n');
document.write('Function VBGetSwfVer(i)\n');
document.write('on error resume next\n');
document.write('Dim swControl, swVersion\n');
document.write('swVersion = 0\n');
document.write('set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i))\n');
document.write('if (IsObject(swControl)) then\n');
document.write('swVersion = swControl.GetVariable("$version")\n');
document.write('end if\n');
document.write('VBGetSwfVer = swVersion\n');
document.write('End Function\n');
document.write('-->');
document.write('</SCR' + 'IPT\> \n');


for (var i=25;i>0;i--) {
	if (isIE && isWin && !isOpera) {
		versionStr = VBGetSwfVer(i);
	} else {
		versionStr = JSGetSwfVer(i);
	}
	if (versionStr == -1 ) {
		break;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			tempArray         = versionStr.split(" ");
			tempString        = tempArray[1];
			versionArray      = tempString .split(",");
		} else {
			versionArray      = versionStr.split(".");
		}
		versionMajor      = versionArray[0];
		versionMinor      = versionArray[1];
		versionRevision   = versionArray[2];

		versionString     = versionMajor + "." + versionRevision;   // 7.0r24 == 7.24
		versionNum        = parseFloat(versionString);

		break;
	}
}
if( isNaN(versionNum) ) versionNum = 0;

var fp_ver = parseInt( versionMajor );
var htmldata = '';
if ( fp_ver >= 9 ) {
	htmldata = '<div id="start"><a alt="start" href="main.html" onClick="startContent(); return false">start</a></div>';
} else {
	htmldata = '<div id="install"><a alt="install" href="http://www.adobe.com/go/getflashplayer_jp">INSTALL</a></div>';
}
window.onload = function()
{
	var element = document.getElementById("enter_center");
	element.innerHTML = htmldata;
}

