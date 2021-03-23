window.onload=function(){
     loadcss();
}; 
function loadcss(){
    var flag = IsPC();
    if(flag==true){
    	$("#mobilecss").remove();
        // document.getElementsByTagName("link")[0].href="css/pc.css";
     }else{
        // document.getElementsByTagName("link")[0].href="css/mobile.css";
        $("#pccss").remove();
     }
};
function step1() 
{
    var a = document.getElementById("bds").offsetTop+2, b = document.getElementById("bds").offsetLeft-10;
    document.getElementById("mouse").style.top = parseFloat(document.getElementById("mouse").style.top) + a  / 250 + "px", 
    document.getElementById("mouse").style.left = parseFloat(document.getElementById("mouse").style.left) + b  / 250 + "px", 
    parseFloat(document.getElementById("mouse").style.top) > a + 2 && (clearInterval(interval), setTimeout('document.getElementById("bds").focus();', 
    300), interval = setInterval("step2()", 60))
};
function step2() 
{
	document.getElementById("bds").style.cssText="border:1px solid #38f";
	document.getElementsByClassName("btn")[0].style.cssText="border-left:1px solid #38f";
    document.getElementById("instructions").innerHTML = "然后，输入你想要知道的内容", document.getElementById("bds").value += sstr[document.getElementById("bds").value.length], 
    (document.getElementById("bds").value.length == sstr.length || "\n" == sstr) && (clearInterval(interval), 
    setTimeout("interval=setInterval('step3()',10);", 500))
};
function step3() 
{
    document.getElementById("instructions").innerHTML = "点击“百度一下”";
    var a,b;
	a = document.getElementById("bds").offsetTop-120, b = document.getElementsByClassName("btn_wr")[0].offsetLeft-60;
    document.getElementById("mouse").style.top = parseFloat(document.getElementById("mouse").style.top) + a  / 2500 + "px", 
    document.getElementById("mouse").style.left = parseFloat(document.getElementById("mouse").style.left) + b  / 250 + "px",
    parseFloat(document.getElementById("mouse").style.left) > b + 100 && (clearInterval(interval), document.getElementById("instructions").innerHTML = "这对你来说有那么难吗？", 
	document.getElementById("bds").style.cssText="border:1px solid #b8b8b8",
	document.getElementsByClassName("btn")[0].style.cssText="border-left:1px solid #e8e8e8",
    setTimeout("document.getElementsByClassName('btn')[0].style.backgroundPosition='-136px -43px';", 1700),
    setTimeout("location.href='https://www.baidu.com/s?wd='+str;", 500))
};
if(GetRequest("q")!=undefined&&GetRequest("q")!="undefined"){
	str=GetRequest("q");
	for(var i=0;i<document.getElementsByTagName("*").length;i++){
		document.getElementsByTagName("*").item(i).style.cursor="none";
	}
	document.getElementById("mouse").style.display="block";
	document.getElementById("bds").readOnly=true;
	document.getElementById("instructions").style.display="block";
	var sstr = decodeURIComponent(str), interval = setInterval("step1()", 5);
}else{
	for(var i=0;i<document.getElementsByTagName("*").length;i++){
		document.getElementsByTagName("*").item(i).style.cursor="default";
	}
	document.getElementById("bds").style.cursor="text";
	document.getElementById("bds").style.readonly="false";
	document.getElementById("bds").readOnly=false;
	document.getElementById("mouse").style.display="none";
	document.getElementsByClassName("btn")[0].style.cursor="pointer";
	document.getElementById("instructions").style.display="none";
	document.getElementsByClassName("btn")[0].onclick=function(){
		var val=document.getElementById("bds").value;
		if(val!=""){
			handleresult(val);
		}
	}
	document.getElementById("bds").onkeydown=function(e){
      if(e.keyCode==13){
    	  var val=document.getElementById("bds").value;
	  		if(val!=""){
	  			handleresult(val);
	  		}
      }
	}
}
function handleresult(val){
//	location.href="?q="+val;
	document.getElementById("url_box").style.cssText="display:block";
	
//	alert(location.protocol+"//"+location.host+"?q="+val);
	var ajax = new XMLHttpRequest();
    ajax.open("POST","Getshorturl?url=" + encodeURIComponent(val));
    ajax.send();
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            var data=ajax.responseText;
            var json = JSON.parse(data);
            var result=json.url;
            if(result==undefined||result=="undefined"){
            	document.getElementById("url_input").value="暂停服务";
            }else{
			  	document.getElementById("url_input").value=json.url;
            }
        }
    }
}
function GetRequest(key){
	var str = function (a) 
	{
	    var b = location.search.replace(/^\?/, ""), c = {};
	    if (!b) {
	        return void 0 === a ? c : void 0;
	    }
	    b = b.split("&");
	    for (var d, e = 0, f = b.length; f > e; e++) {
	        d = b[e].indexOf("="), d > 0 ? c[b[e].substring(0, d)] = b[e].substring(d + 1) : c[b[e]] = "";
	    }
	    return void 0 === a ? c : c[a]
	}
	(key);
   return str;
}
function closeframe(){
	document.getElementById("url_box").style.cssText="display:none";
}
function IsPC(){
	var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";//判断是否为iPad
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";//判断是否为iPhone用户
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
 
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
      return true;
    }else{
	  return false;
	}
}
