
/*
////////////////////////////////////////////////////
//
//   general.js
//   version 1.0.0
//   
//   [class name]    [instance name]     [summary]
//   Utility         :UT                 :便利機能系クラス
//   UA              :UA                 :userAgentの情報を解析するクラス
//   LinkWindow      :LW                 :外部リンクのウィンドウを操作するクラス
//   BaseRollover    :BaseRollover       :画像のロールオーバー機能を追加するクラス
//   
////////////////////////////////////////////////////
*/



///class/////////////////////////////////////////////////

/*
* Utility
* 便利機能クラス
*/

function Utility()
{
	/*
	* onLoad event の追加
	*/
	this.addLoadEvent = function(func)
	{
		//alert("at Utility addLoadEvent()");
		var oldonLoad = window.onload;
		if(typeof window.onload != "function")
		{
			window.onload = func;
		}
		else
		{
			window.onload = function()
			{
				oldonLoad();
				func();
			}
		}
	}
	
	/*
	* onresize event の追加
	*/
	this.addResizeEvent = function(func)
	{
		//alert("at Utility addLoadEvent()");
		var oldonResize = window.onload;
		if(typeof window.onresize != "function")
		{
			window.onresize = func;
		}
		else
		{
			window.onresize = function()
			{
				oldonResize();
				func();
			}
		}
	}
	
	/*
	* get paramater の取得
	*/
	this.getParams = function()
	{
		var params = new Object();
		var query = location.search.substring(1);
		var pairs = query.split("&");
		for(var i=0; i<pairs.length; i++)
		{
			var pos = pairs[i].indexOf("=");
			if(pos == -1)
			{
				continue;
			}
			var paramName = pairs[i].substring(0, pos);
			var value = pairs[i].substring(pos+1);
			params[paramName] = [paramName, value];
		}
	
		return params;
	}
}

var UT = new Utility();


///class/////////////////////////////////////////////////

/*
* UA
* userAgentとFlashPlayerを判別するクラス
*
* safari3以外のsafariのバージョンの取得はできない。
*/

function UA()
{
	var nav = navigator;
	var doc = document;
	var win = window;
	var userA = navigator.userAgent.toLowerCase();
	var app = navigator.appVersion;
	var appNM = navigator.appName;
	this.ua = {};
	this.ua.isWinNT = (userA.indexOf("windows nt 4.0") != -1);
	this.ua.isWin2000 = (userA.indexOf("windows nt 5.0") != -1);
	this.ua.isWinXP = (userA.indexOf("windows nt 5.1") != -1);
	this.ua.isWinVista = (userA.indexOf("windows nt 6.0") != -1);
	this.ua.isWin7 = (userA.indexOf("windows nt 6.1") != -1);
	this.ua.isMacX = (userA.indexOf("mac os x") != -1);
	this.ua.isMacIntel = false;
	this.ua.isMacPPC = false;
	this.ua.isWin = (app.indexOf("Win") != -1);
	this.ua.isMac = (app.indexOf("Mac") != -1);
	this.ua.isLinux = (userA.indexOf("x11") != -1);
	this.ua.isIE = (userA.indexOf("msie") != -1);
	this.ua.isGecko = (userA.indexOf("gecko") != -1);
	this.ua.isFF = (userA.indexOf("firefox") != -1);
	this.ua.isSafari = (userA.indexOf("safari") != -1);
	this.ua.isOpera = (userA.indexOf("opera") != -1);
	this.ua.isChrome = (userA.indexOf("chrome") != -1);
	this.ua.isWebKit = (userA.indexOf("webkit") != -1);
	this.ua.winVersion = 0;
	this.ua.isWinOverXP = false;
	if(this.ua.isChrome)
	{
		this.ua.isSafari = false;
	}
	this.sw;  //ブラウザのコンテンツ領域の横幅
	this.sh;  //ブラウザのコンテンツ領域の縦幅
	this.wid;  //最大サイズを考慮した横幅
	this.hei;  //最大サイズを考慮した横幅
	this.limitW = 0;  //横幅の最大設定値
	this.limitH = 0;  //縦幅の最大設定値
	
	
	//mac
	if(this.ua.isMacX)
	{
		if(navigator.platform == "MacIntel")
		{
			this.ua.isMacIntel = true;
		}
		else if(navigator.platform == "MacPPC")
		{
			this.ua.isMacPPC = true;
		}
	}
	
	
	//windows
	if(this.ua.isWin)
	{
		var n = userA.indexOf("windows nt");
		if(n == -1)
		{
			this.ua.isWinOverXP = false;
		}
		else
		{
			var pf = userA.substring(n, userA.indexOf(";", n));
			var version = pf.split(" ")[2];
			this.ua.winVersion = version;
			if(version >= 5.1)  //over XP
			{
				this.ua.isWinOverXP = true;
			}
			else  //2000 or NT4.0
			{
				this.ua.isWinOverXP = false;
			}
		}
	}
	
	/*
	* user agent version
	*/
	this.ua.rev = [];
	if(this.ua.isIE)
	{
		var num = userA.indexOf("msie")+1;
		var toNum = userA.indexOf(";", num);
		var str = userA.substring(userA.indexOf(" ", num) + 1, toNum);
		this.ua.rev = str.split(".");
	}
	else if(this.ua.isChrome)
	{
		var num = userA.indexOf("chrome");
		var fromNum = userA.indexOf("/", num) + 1;
		var toNum = userA.indexOf("safari");
		var str = userA.substring(fromNum, toNum);
		this.ua.rev = str.split(".");
	}
	else if(this.ua.isFF)
	{
		//mozilla/5.0 (windows; u; windows nt 5.1; ja; rv:1.9.1.7) gecko/20091221 firefox/3.5.7 (.net clr 3.5.30729)
		var num = userA.indexOf("firefox")+1;
		var str = userA.substring(userA.indexOf("/", num) + 1);
		var str2 = str.split(" ")[0];
		this.ua.rev = str2.split(".");
		//alert(userA);
		//alert(str);
		//alert(this.ua.rev);
	}
	else if(this.ua.isSafari)  //ver3 UP
	{
		if(userA.indexOf("version") != -1)  //ver3 UP
		{
			var arr = userA.split("/");
			var toNum = arr[3].indexOf(" ");
			var str = arr[3].substring(0, toNum);
			this.ua.rev = str.split(".");
		}
		else
		{
			
		}
		
	}
	else if(this.ua.isOpera)
	{
		var fromNum = userA.indexOf("/") + 1;
		var toNum = userA.indexOf(" ");
		var str = userA.substring(fromNum, toNum);
		this.ua.rev = str.split(".");
	}
	
	
	/*
	* flash version
	*/
	var SHOCKWAVE_FLASH = "Shockwave Flash";
	var SHOCKWAVE_FLASE_AX  = "ShockwaveFlash.ShockwaveFlash";
	var FLASH_MIME_TYPE = "application/x-shockwave-flash";
	this.flaRev = [];
	var desc = null;
	var isCrash = false;
	var ax = null;
	if(typeof navigator.plugins != "undefined" && typeof navigator.plugins[SHOCKWAVE_FLASH] == "object")
	{
		desc = navigator.plugins[SHOCKWAVE_FLASH].description.toLowerCase();
		var plugin = navigator.mimeTypes[FLASH_MIME_TYPE].enabledPlugin;
		if(desc && plugin && plugin.description)
		{
			var p = plugin.description.toLowerCase();
			var num = p.indexOf("flash");
			var fromNum = p.indexOf(" ", num) + 1;
			var flaStr = p.substring(fromNum);
			var num4 = flaStr.indexOf(".");
			var mejor = flaStr.substring(0, num4);
			this.flaRev[0] = mejor;
			var mainor = flaStr.substring(num4+1);
			var num2 = mainor.indexOf(" ");
			this.flaRev[1] = mainor.substring(0, num2);
			var num3 = mainor.indexOf("r") + 1;
			this.flaRev[2] = mainor.substring(num3);
		}
	}
	else if(typeof window.ActiveXObject != "undefined" )  //for IE
	{
		try
		{
			ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		}
		catch(e)
		{
			try
			{
				ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				this.flaRev = [6,0,21];
				ax.AllowScriptAcess = "always";
			}
			catch(e)
			{
				if(this.flaRev[0] == 6)
				{
					isCrash = true;
				}
			}
			if(!isCrash)
			{
				try
				{
					ax = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				}
				catch(e)
				{
					
				}
			}
		}
		
		if(!isCrash && ax)
		{
			try
			{
				var p = ax.GetVariable("$version");
				var str = p.substring(p.indexOf(" ") + 1);
				this.flaRev = [];
				this.flaRev = str.split(",");
				this.flaRev.pop();
			}
			catch(e)
			{
				
			}
		}
	}
	
	
	/*
	* flashplayerのバージョンを文字列で取得する　mejorversion.minorversion.revision　の順番でドット区切りで取得
	*/
	this.getPlayerVersion = function()
	{
		return this.flaRev[0] + "." + this.flaRev[1] + "." + this.flaRev[2];
	};
	
	
	/*
	* dot区切りのプレイヤーバージョンを文字列で渡すとそのプレイヤ以上ならtrue 以下ならfalseを返す。
	* ex)hasPlayer("9.0.45")
	*/
	this.hasPlayer = function(pStr)
	{
		var versions = pStr.split(".");
		//alert(versions);
		//var len = Math.min(versions.length, 3);
		return this.getCheckVersion(versions, 0)
	}
	
	this.getCheckVersion = function(versions, num)
	{
		//alert("check " + versions[num] + " | " + this.flaRev[num]);
		if(Number(versions[num]) < this.flaRev[num])
		{
			//alert("over " + versions[num] + " | " + this.flaRev[num]);
			return true;
		}
		else if(Number(versions[num]) == this.flaRev[num])
		{
			if(versions[num + 1] == undefined)
			{
				//alert("equal " + versions[num] + " | " + this.flaRev[num]);
				return true;
			}
			else
			{
				//alert("== num " + num);
				return this.getCheckVersion(versions, num+1);
			}
		}
		else
		{
			//alert("under " + versions[num] + " | " + this.flaRev[num]);
			return false;
		}
	}
	
	
	/*
	* ユーザー環境を文字列で取得する　OS ブラウザ revision　の順番で取得
	*/
	this.getEnvironment = function()
	{
		if(this.ua.isWin)
		{
			var os = "windows"
		}
		else if(this.ua.isMac)
		{
			var os = "mac";
		}
		if(this.ua.isIE)
		{
			var browser = "IE";
		}
		else if(this.ua.isChrome)
		{
			var browser = "Chrome";
		}
		else if(this.ua.isFF)
		{
			var browser = "FireFox";
		}
		else if(this.ua.isSafari)
		{
			var browser = "Safari";
		}
		else if(this.ua.isOpera)
		{
			var browser = "Opera";
		}
		
		var revision = "";
		for(var i = 0; i<this.ua.rev.length; i++)
		{
			if(i == this.ua.rev.length - 1)
			{
				revision += this.ua.rev[i];
			}
			else
			{
				revision += this.ua.rev[i] + ".";
			}
		}
		var str = os + " " + browser + " " + revision;
		
		return str;
	};
	
	this.getUAName = function()
	{
		var browser = "";
		if(this.ua.isIE)
		{
			browser = "IE";
		}
		else if(this.ua.isChrome)
		{
			browser = "Chrome";
		}
		else if(this.ua.isFF)
		{
			browser = "FireFox";
		}
		else if(this.ua.isSafari)
		{
			browser = "Safari";
		}
		else if(this.ua.isOpera)
		{
			browser = "Opera";
		}
		else
		{
			browser = "other";
		}
		
		return browser;
	};
	
	this.getUAVersion = function()
	{
		if(this.ua.rev != undefined)
		{
			var n = Math.min(this.ua.rev.length, 2);
			var revision = "";
			for(var i = 0; i<n; i++)
			{
				if(i == n - 1)
				{
					revision += this.ua.rev[i];
				}
				else
				{
					revision += this.ua.rev[i] + ".";
				}
			}
			
			return Number(revision);
		}
		else
		{
			return -1;
		}
	};
	
	this.getMacPC = function()
	{
		if(this.ua.isMac)
		{
			if(this.ua.isMacIntel)
			{
				return "intelMac";
			}
			else if(this.ua.isMacPPC)
			{
				return "powerPC";
			}
			else
			{
				return "other";
			}
		}
		else
		{
			return "notMac";
		}
	};
	
	
	/*
	* screen(ブラウザのコンテンツ領域)サイズの取得
	*/
	this.checkScreenSize = function()
	{
		if(this.ua.isWin && this.ua.isIE)
		{
			//this.sw = document.body.clientWidth;
			//this.sh = document.body.clientHeight;
			this.sw = document.documentElement.clientWidth;
			this.sh = document.documentElement.clientHeight;
		}
		else
		{
			this.sw = window.innerWidth;
			this.sh = window.innerHeight;
		}
		
		this.wid = this.sw;
		this.hei = this.sh;
		if(!(this.limitW <= 0 || this.limitW == undefined || this.limitW == null))
		{
			if(this.sw > this.limitW)
			{
				this.wid = this.limitW;
			}
		}
		if(!(this.limitH <= 0 || this.limitH == undefined || this.limitH == null))
		{
			if(this.sh > this.limitH)
			{
				this.hei = this.limitH;
			}
		}
		//alert("checkScreenSize()");
	};
	
	
}

var UA = new UA();
UA.checkScreenSize();

///class/////////////////////////////////////////////////
/*
* LinkWindow
* 
* 
*/

function LinkWindow()
{
	var scope = this;
	
	/*
	* フルスクリーンで開くためのclassnameを登録する
	*/
	this.initialize = function(classname)
	{
		var key = classname;
		var nodes = document.getElementsByTagName("a");
		if(!document.getElementById)
		{
			return false;
		}
		for(var i = 0; i<nodes.length; i++)
		{
			if(nodes[i].getAttribute("class") == key)
			{
				nodes[i].onclick = function()
				{
					//alert("onClick");
					scope.openFullScreen(this.getAttribute("href"));
					//LW.openFullScreen(this.getAttribute("href"));
					return false;
				}
			}
		}
	}
	
	/*
	* popupで開くためのclassnameを登録する
	*/
	this.initializePopup = function(classname, w, h)
	{
		//alert("initializePopup");
		var wid = w;
		var hei = h;
		if(w == undefined)
		{
			wid = 800;
		}
		if(h == undefined)
		{
			hei = 600;
		}
		var key = classname;
		var nodes = document.getElementsByTagName("a");
		if(!document.getElementById)
		{
			return false;
		}
		for(var i = 0; i<nodes.length; i++)
		{
			if(nodes[i].getAttribute("class") == key)
			{
				nodes[i].onclick = function()
				{
					//alert("onClick");
					scope.popup(this.getAttribute("href"), wid, hei);
					//LW.openFullScreen(this.getAttribute("href"));
					return false;
				}
			}
		}
	}
	
	/*
	* fullscreen
	*/
	this.openFullScreen = function(strURI)
	{
		//alert("at LinkWindow openFullScreen");
		if(UA.ua.isWin)  //Win
		{
			switch(UA.getUAName())
			{
				case "IE":
				if(UA.getUAVersion() >= 6)
				{
					if(UA.ua.isWinOverXP) //WindowsXP
					{
						//alert("WIN over XP | IE over 6");
						//alert(screen.availWidth + " | " + screen.availHeight + " | " + screen.width + " | " + screen.height);
						fullWindow = window.open(strURI ,"full","width=" + (screen.availWidth-4) + ",height=" + (screen.availHeight+1) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,top=0,left=0");
						fullWindow.resizeTo(screen.availWidth, screen.availHeight);
						//fullWindow.moveTo(0,0);
						//fullWindow.focus();
					}
					else //Not WindowsXP
					{
						alert("WIN under XP | IE over 6");
						fullWindow = window.open(strURI ,"full","width=" + (screen.availWidth-4) + ",height=" + (screen.availHeight+1) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,top=0,left=0");
					}
				}
				else if(UA.getUAVersion() >= 4) //IEversion more 4
				{
					fullWindow = window.open("" ,"full","fullscreen=1,width=" + (screen.availWidth+3) + ",height=" + (screen.availHeight+1) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1");
					fullWindow.resizeTo(Math.ceil(screen.availWidth+3),Math.ceil(screen.availHeight+1));
					fullWindow.moveTo  (0,0);
					fullWindow.document.open("text/html", "replace");
					fullWindow.document.write("<html><style type='text/css'>\n");
					fullWindow.document.write("body{ border: 1px solid #000000; overflow: hidden; margin: 0pt;}");
					fullWindow.document.write("#stillloadingDiv{ position: absolute; left: 0px; top: 0px; width: 100%px; height: 19px; z-index: 1; background-color: #C0C0C0; layer-background-color: #C0C0C0; clip:rect(0,100%,19,0);}");
					fullWindow.document.write("</style>\n");
					fullWindow.document.write("<body onload=\"top.document.location.replace('"+strURI+"')\" topmargin=0 leftmargin=0 marginwidth=0 marginheight=0 scroll='no'>");
					fullWindow.document.write("<div ID='stillloadingDiv'></div>");
					fullWindow.document.write("</body></html>");
					fullWindow.document.close();
					fullWindow.focus();
				}
				else //IEversion under 4
				{
					fullWindow = window.open(strURI,"full","width=" + (screen.availWidth+1) + ",height=" + (screen.availHeight-21) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,left=0,top=0,screenX=0,screenY=0",true);
				}
				break;
				
				case "Chrome":
				fullWindow = window.open("","full","scrollbars=0,resizable=0,width=" + screen.availWidth +",height=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,0);
				fullWindow.resizeTo(screen.availWidth, screen.availHeight);
				fullWindow.location.href = strURI;
				break;
				
				case "FireFox":
				fullWindow = window.open("","full","scrollbars=0,resizable=0,outerWidth=" + screen.availWidth +",outerheight=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,-10);
				fullWindow.location.href = strURI;
				break;
				
				case "Safari":
				fullWindow = window.open("","full","scrollbars=0,resizable=0,width=" + screen.availWidth +",height=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,0);
				fullWindow.location.href = strURI;
				break;
				
				case "Opera":
				fullWindow = window.open("","full","scrollbars=0,resizable=0,width=" + screen.availWidth +",height=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,0);
				fullWindow.resizeTo(screen.availWidth, screen.availHeight);
				fullWindow.location.href = strURI;
				break;
				
				case "other":
				fullWindow = window.open("","full","scrollbars=0,resizable=0,width=" + screen.availWidth +",height=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,0);
				fullWindow.location.href = strURI;
				break;
			}
		}
		else if(UA.ua.isMac)  //Mac
		{
			switch(UA.getUAName())
			{
				case "Chrome":
				fullWindow=window.open("","full","scrollbars=0,resizable=1,width=" + (screen.availWidth) +",height=" + (screen.availHeight));
				fullWindow.moveTo(-10,0);
				fullWindow.location.href=strURI;
				break;
				
				case "FireFox":
				fullWindow=window.open("","full","scrollbars=0,resizable=1,width=" + (screen.availWidth) +",height=" + (screen.availHeight-30));
				fullWindow.moveTo(-10,0);
				fullWindow.location.href=strURI;
				break;
				
				case "Safari":
				fullWindow=window.open("","full","scrollbars=0,resizable=1,width=" + (screen.availWidth) +",height=" + (screen.availHeight-18));
				fullWindow.moveTo(0,0);
				fullWindow.location.href=strURI;
				break;
				
				case "Opera":
				fullWindow=window.open("","full","scrollbars=0,resizable=1,width=" + (screen.availWidth) +",height=" + (screen.availHeight-30));
				fullWindow.moveTo(-10,0);
				fullWindow.location.href=strURI;
				break;
				
				case "IE":
				fullWindow = window.open(strURI,"full","alwaysLowered=0,alwaysRaised=0,channelmode=0,dependent=1,directories=0,fullscreen=1,hotkeys=1,location=0,menubar=0,resizable=1,scrollbars=0,status=0,titlebar=0,toolbar=0,z-lock=0,screenX=0,screeny=0,left=0,top=0");
				fullWindow.resizeTo(screen.availWidth,screen.availHeight);
				break;
				
				case "other":
				fullWindow=window.open("","full","scrollbars=0,resizable=1,width=" + (screen.availWidth) +",height=" + (screen.availHeight-30));
				fullWindow.moveTo(-10,0);
				fullWindow.location.href=strURI;
				break;
			}
		}
		else  //other OS
		{
			fullWindow=window.open("","full","scrollbars=0,resizable=1,width=" + (screen.availWidth) +",height=" + (screen.availHeight-30));
			fullWindow.moveTo(-10,0);
			fullWindow.location.href=strURI;
		}
	}
	
	/*
	* popupwindow
	*/
	this.popup = function(strURI, wid, hei)
	{
		popupWin = window.open(strURI,"popupwindow","width=" + wid + ",height=" + hei + ",scrollbars=yes");
		popupWin.focus();
	}
}

var LW = new LinkWindow();

///class/////////////////////////////////////////////////

/*
* BaseRollover
* 画像のロールオーバーを設定するクラス
*/

function BaseRollover()
{
	
}

BaseRollover.prototype.initialize = function(clses)
{
	//alert("at BR initialize");
	var len = clses.length;
	this.storedImg = new Array();
	var elems = new Array();
	
	for(var k=0; k<len; k++)
	{
		elems = elems.concat(this.getElementsByClassName("img", clses[k]));
		elems = elems.concat(this.getElementsByClassName("input", clses[k]));
	}
	
	len = elems.length;
	for(var i=0; i<len; i++)
	{
		
		var elem = elems[i];
		var imgSrc = elem.src;
		
		if(imgSrc.indexOf("_cur.")>-1)
		{
			continue;
		}
		var ovrStr = this.imgOvrReplace(imgSrc, true);
		this.storedImg[imgSrc] = new Image();
		this.storedImg[imgSrc].src = ovrStr;
		
		elem.ins = this;
		elem.onmouseover = this.mouseOverEvent;
		elem.onmouseout = this.mouseOutEvent;
		
	}
}

BaseRollover.prototype.getElementsByClassName = function(pTagName, pClassName)
{
	//alert("at BR getElementsByClassName");
	var res = new Array();
	var tags = document.getElementsByTagName(pTagName);
	var len = tags.length;
	for(var i=0; i<len; i++)
	{
		var classes = tags[i].className;
		//alert("at BR " + classes);
		if(classes.indexOf(pClassName)>-1)
		{
			res[res.length] = tags[i];
		}
	}
	return res;
}

BaseRollover.prototype.mouseOverEvent = function()
{
	//alert("mouseOver");
	this.src = this.ins.imgOvrReplace(this.src, true);
}

BaseRollover.prototype.mouseOutEvent = function()
{
	this.src = this.ins.imgOvrReplace(this.src, false);
}

BaseRollover.prototype.imgOvrReplace = function(pSrc, pIsOvr)
{
	var srcStr = pSrc;
	if(pIsOvr)
	{
		if(srcStr.indexOf("_on")>-1)
		{
			return srcStr;
		}
		srcStr = this.strReplace(srcStr, ".gif", "_on.gif");
		srcStr = this.strReplace(srcStr, ".jpg", "_on.jpg");
		srcStr = this.strReplace(srcStr, ".png", "_on.png");
	}
	else
	{
		srcStr = this.strReplace(srcStr, "_on.gif", ".gif");
		srcStr = this.strReplace(srcStr, "_on.jpg", ".jpg");
		srcStr = this.strReplace(srcStr, "_on.png", ".png");
	}
	return srcStr;
}

BaseRollover.prototype.strReplace = function(pStr, pKey, pAlt)
{
	return pStr.split(pKey).join(pAlt);
}

var BaseRollover = new BaseRollover();

////////////////////////////////////////////////////

function openFullScreen(url)
{
	LW.openFullScreen(url);
}

function popup(url, w, h)
{
	LW.popup(url, w, h);
}

function initialize()
{
	//alert("at initialize");
	LW.initialize("fullscreen");
	LW.initializePopup("popup", 1024, 768);
	BaseRollover.initialize("rollover");
	UA.checkScreenSize();
	setElementHeight("container", 1054);
	//alert(UA.wid + " | " + UA.hei);
}

UT.addLoadEvent(initialize);


////////////////////////////////////////////////////









