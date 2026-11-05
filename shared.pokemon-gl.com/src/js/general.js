
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

function gfLoadContents(url, w, h){
	enterContents(url, w, h);
}


function enterContents(url, w, h){

	var slvl = 0;
	if(enableWindowsize(924,633)){//1024*733
		slvl = 1;
	}

	switch(slvl){
		case 0:
			//alert("本コンテンツをご覧いただくには " + w + " × " + h + " 以上のモニター解像度が必要です。\n\n申し訳ございませんがモニター解像度の設定をご確認ください。");
			alert("本コンテンツをご覧いただくには 1024 × 768 以上のモニター解像度が必要です。\n\n申し訳ございませんがモニター解像度の設定をご確認ください。");
			break;
		case 1:
			bfpfullscreen(url,false);
			break;
	}

}


function enableWindowsize(w,h){
	var sw = screen.availWidth;
	var sh = screen.availHeight;
//alert([sw,sh]);
	return (sw >= w && sh >= h);
}
function openAttention(w,h){
	var aw,ah;
	aw = screen.availWidth;
	ah = screen.availHeight;
	if(w && h){
	}else{
		w = 510;
		h = 620;
	}
	attentionWin = window.open("attention.html","attentionWin","width=" + w + ",height=" + h + ",scrollbars=no");
//	attentionWin.moveTo((aw-w)/2,(ah-h)/2);
	attentionWin.focus();
}
function ChangeImage(objName,chgObj){
	if(document.images){
		document.images[objName].src = eval(chgObj + ".src");
	}
}
function DownloadAfp(){
	afpWin = window.open("http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash&Lang=Japanese&P8_Language=Japanese","afpWin");
}
function installFinish(){
	top.location.reload(true);
}
function installFlash(){
	top.dummy.location.href = "index.html?pt=install";
}
function ___bfpfullscreen(strURI,isWindowClose){
	var aw = screen.availWidth;
	var ah = screen.availHeight;

	newWin = window.open(strURI,"newWin","width="+aw+",height="+ah);
//	newWin = window.open(strURI,"newWin","width=1012,height=676");
//	newWin.moveTo(Math.floor((aw - 1012)/2),Math.floor((ah - 676)/2));
	newWin.moveTo(0,0);
}


function bfpfullscreen(strURI, isWindowClose)
{
	var strAppVer = navigator.appVersion;
	var strAppNM  = navigator.appName;
	var intPos    = strAppVer.indexOf("MSIE",0);
	var msg = "申し訳ございませんが、あなたのご利用のブラウザでは\n\n本コンテンツをご覧いただくことができません。\n\nMicrosoft Internet Explorerや\n\nSafari等のブラウザをご利用の上、再度お試しください。";

	//if(document.domain!="test.bfp.co.jp" && document.domain!="www.bfp.co.jp") return;
	if(strAppVer.indexOf("Win")>=0) //OS--Windows
	{
		if(strAppNM.indexOf("Microsoft")>=0) //Browser--InternetExplorer
		{
			if (strAppNM == "Microsoft Internet Explorer" && parseInt(strAppVer)>=4) //IEversion more 4
			{
				if(parseInt(strAppVer.slice(intPos+5,intPos+6))>=6)
				{
					if(parseInt(strAppVer.indexOf("Windows NT 5.1",0)) > 0) //WindowsXP
					{
						fullWindow = window.open(strURI ,"full","width=" + (screen.availWidth-4) + ",height=" + (screen.availHeight+1) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
						//fullWindow.moveTo(-5,-32);
						if(isWindowClose==true)
						{
							window.close();
						}
						//fullWindow.focus();
					}
					else //Not WindowsXP
					{
						fullWindow = window.open(strURI ,"full","width=" + (screen.availWidth-4) + ",height=" + (screen.availHeight+1) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
						//fullWindow.moveTo(-5,-24);
						if(isWindowClose==true)
						{
							window.close();
						}
						//fullWindow.focus();
					}
				}
				else
				{
					fullWindow = window.open("" ,"full","fullscreen=1,width=" + (screen.availWidth+3) + ",height=" + (screen.availHeight+1) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0");
					//fullWindow.resizeTo(Math.ceil(screen.availWidth+3),Math.ceil(screen.availHeight+1));
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
					if(isWindowClose==true)
					{
						window.close();
					}
					fullWindow.focus();
				}
			}
			else //IEversion under 4
			{
				fullWindow = window.open(strURI,"full","width=" + (screen.availWidth+1) + ",height=" + (screen.availHeight-21) + ",toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,left=0,top=0,screenX=0,screenY=0",true);
				if(isWindowClose==true)
				{
					window.close();
				}
			}
		}
		else if(strAppNM.indexOf("Netscape")>=0) //Browser--NetscapeNavigator
		{
			if(navigator.userAgent.indexOf("Chrome")>=0)
			{
				fullWindow = window.open("","full","scrollbars=0,resizable=0,width=" + screen.availWidth +",height=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,0);
				fullWindow.resizeTo(screen.availWidth, screen.availHeight);
				fullWindow.location.href = strURI;
			}
			else if ( isWinSafari ) 
			{
				fullWindow = window.open("","full","scrollbars=0,resizable=0,width=" + screen.availWidth +",height=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,0);
				fullWindow.location.href = strURI;
			}
			else
			{
				fullWindow = window.open("","full","scrollbars=0,resizable=0,outerWidth=" + screen.availWidth +",outerheight=" + screen.availHeight +",top=0,left=0");
				fullWindow.moveBy(0,-10);
				fullWindow.location.href = strURI;
			}

			if(isWindowClose==true)
			{
				window.close();
			}
		}
		else //Browser-- 3rdParty
		{
			alert(msg);
		}
	}
	else if(strAppVer.indexOf("Mac")>=0) //OS-Machintosh
	{
		if(strAppVer.indexOf("Safari")>=0) //Brower--Safari
		{
			fullWindow=window.open("","full","scrollbars=0,resizable=0,width=" + (screen.availWidth) +",height=" + (screen.availHeight-18));
			fullWindow.moveTo(0,0);
			fullWindow.location.href=strURI;
			if(isWindowClose==true)
			{
				window.close();
			}
		}
		
		else
		{
			if(strAppNM.indexOf("Microsoft")>=0) //Browser--InternetExplorer
			{
				fullWindow = window.open(strURI,"full","alwaysLowered=0,alwaysRaised=0,channelmode=0,dependent=1,directories=0,fullscreen=1,hotkeys=1,location=0,menubar=0,resizable=0,scrollbars=0,status=0,titlebar=0,toolbar=0,z-lock=0,screenX=0,screeny=0,left=0,top=0");
				fullWindow.resizeTo(screen.availWidth,screen.availHeight);
				if(isWindowClose==true)
				{
					window.close();
				}
			}
			else if(strAppNM.indexOf("Netscape")>=0) //Browser--NetscapeNavigator
			{
				//fullWindow=window.open("","full","scrollbars=0,resizable=0,width=" + (screen.availWidth-12) +",height=" + (screen.availHeight-30));
				fullWindow=window.open("","full","scrollbars=0,resizable=0,width=" + (screen.availWidth) +",height=" + (screen.availHeight-30));
				//fullWindow.moveTo(0,0);
				fullWindow.moveTo(-10,0);
				fullWindow.location.href=strURI;
				if(isWindowClose==true)
				{
					window.close();
				}
			}
			else //Browser-- 3rdParty
			{
				alert("お使いのブラウザでは、ご覧いただけません。");
				/*
				location.replace("alert.html");
				if(isWindowClose==true){
					window.close();
				}
				*/
			}
		}
	}
	else
	{
		alert(msg);
	}
}