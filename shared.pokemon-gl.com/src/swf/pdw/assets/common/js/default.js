// JavaScript Document

////////////////////////////////////////////////////

/*
* onLoad eventの登録
*/

function setBaseLoadEvent(func)
{
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
paramaterの取得
*/
function getParams()
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


////////////////////////////////////////////////////








