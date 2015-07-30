//*------------------------------*//
var rUrl="http://hctour.dev.zjtapp.com/info/InfoServlet";

// 导航


$(function(){
	$('.nav li').each(function(index, element) {
       
	   var obj=$(this).children('div');
	   
	   var oIcon=$(this).children('b');
	   
	   $(this).mouseenter(function(){
		    if( obj){
			   obj.css("display","block");
			   oIcon.css("display","none");
			}
		});
		
		$(this).mouseleave(function(){
			if( obj){
			   obj.css("display","none");
			   oIcon.css("display","block");
			}
		})
    });
});


// 补0

function toZero(n){
	return n<10?'0'+n:n;
}






function getPos(obj)
{
	var l=0;
	var t=0;
	while(obj) // 循环
	{
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent; // 找父级绝对位置
			
	}
	return {left:l,top:t};
};




////////////选择器
function getEle(str, aParent)
{
	var arr=str.match(/\S+/g);
	var aParent=aParent||[document];
	var aChild=[];
	for(var i=0;i<arr.length;i++)
	{
		aChild=_getByStr(aParent, arr[i]);
		aParent=aChild;
	};
	return aChild;
};

function getByClass(oParent, sClass)
{
	
	if(document.addEventListener)
	{
		return oParent.getElementsByClassName(sClass);
	};
	
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b');
	var result=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	};

	return result;
};
function _getByStr(aParent, str)
{
	var aChild=[];	//结果
	
	for(var i=0;i<aParent.length;i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				var obj=document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:
				//li.box
				if(/^\w+\.\w+$/.test(str))
				{
					var aStr=str.split('.');
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					
					for(var j=0;j<arr.length;j++)
					{
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						};
					};
				}
				//li#li1
				else if(/^\w+#\w+$/.test(str))
				{
					var aStr=str.split('#');
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//input[type=bbxxx]
				else if(/^\w+\[\w+=.+\]$/.test(str))
				{
					var aStr=str.split(/\[|=|\]/g);
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//input:first	li:eq(12)
				else if(/^\w+:[a-z]+(\(.+\))?$/.test(str))
				{
					var aStr=str.split(/:|\(|\)/g);
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					switch(aStr[1])
					{
						case 'eq':
							var n=parseInt(aStr[2]);
							
							aChild.push(arr[n]);
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'odd':
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
					}
				}
				
				//li
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
				break;
		}
	};
	return aChild;
};

function hc(arg)
{
	var elements=[],bSelect;	
	switch(typeof arg)
	{
		case 'function':	
			hc.tool.ready(arg);
			break;
		case 'string':	 
			elements=hc.browser.ie678?getEle(arg):document.querySelectorAll(arg);
			break;
		case 'object':		
			if(arg instanceof Array)
			{
				elements=arg;
			}
			else
			{
				elements.push(arg);
			};
			break;
	};
	if(elements.length==1)
	{
		return elements[0];
		if(bSelect==window.frameElement)hc.tool.ask();
	};
	return elements;
};


//////////// 浏览器检测相关

hc.browser={};
hc.browser.userAgent=window.navigator.userAgent.toLowerCase();
hc.browser.ie=!!document.all;
hc.browser.ie6=!window.XMLHttpRequest;
hc.browser.ie678=!document.getElementsByClassName;
hc.browser.ie9=hc.browser.userAgent.indexOf('msie 9')!=-1;
hc.browser.ie6789=hc.browser.ie678||hc.browser.ie9;
hc.browser.ie10=hc.browser.userAgent.indexOf('msie 10')!=-1;
hc.browser.ie11=hc.browser.userAgent.indexOf('trident')!=-1&&hc.browser.userAgent.indexOf('rv:11')!=-1;
hc.browser.chrome=hc.browser.userAgent.indexOf('chrome')!=-1;
hc.browser.ff=hc.browser.userAgent.indexOf('firefox')!=-1;



function addClass(obj,sClass)
{
	var aClass=obj.className.split('');
	if(!aClass[0])
	{
		obj.className=sClass;
		return
	}
	for(var i=0;i<aClass.length;i++)
	{
		if(aClass[i]==sClass)
		{
			return;
		}
	}
	obj.className+=' '+sClass;
}


function removeClass(obj,sClass){
	
	var aClass = obj.className.split(' ');
	if(!aClass[0])return;
	
	for(var i=0; i<aClass.length; i++){
		if(aClass[i]==sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(' ');
			return;
		}	
	}		
}

hc.effct={};
/* 隔行变色 */
hc.effct.changeColor=function(id){
	
	var oList=hc(id).children;
	for(var i=0; i<oList.length; i++){
		if(i%2==1){
			oList[i].style.background="#f7f7f9";
		}else{
			oList[i].style.background="#fff";
		}	
	}
}
hc.effct.oTermini=function(){
	
	var oBtn=hc('.tra-left-list ol li');
	var oBox=hc('.tra-right-box');
	var iCon=hc('.car-icon a');
	// 1,2,3,4
	// ['qiche','zijia','hangban','gongjiao']
	
	var oTag=window.location.href.split('?')[1];//[1].split('=')[1]||'qiche';
	
	
	if(oTag==undefined){
		oTag=1;
	}else{
		oTag=parseInt(oTag.split('=')[1]);
	}
	iCon[oTag-1].style.display='block';
	oBox[oTag-1].style.display='block';
	addClass(oBtn[oTag-1],'active');
	for(var i=0; i<oBtn.length; i++){
		oBtn[i].index=i;
		oBtn[i].onclick=function(){
			for(var i=0; i<oBtn.length; i++){
				removeClass(oBtn[i],'active');
				oBox[i].style.display='none';
				iCon[i].style.display='none';
			}
			addClass(this,'active');
			oBox[this.index].style.display='block';
			iCon[this.index].style.display='block';
		}
	};
	
};

hc.effct.scrollBar=function(box,bar,speed){
	var oBox=hc(box);
	var oSc=oBox.children[0];
	
	var oBarBox=hc(bar);
	var oBar=oBarBox.children[0];
	
	function Scroll(l){
		if(l<0)l=0;
		if(l>oBarBox.offsetHeight-oBar.offsetHeight)l=oBarBox.offsetHeight-oBar.offsetHeight;

		startMove(oBar,{top:l});
		var scale=l/(oBarBox.offsetHeight-oBar.offsetHeight);	
		
		startMove(oSc,{top:-(oSc.offsetHeight-oBox.offsetHeight)*scale});
		
	}
	
	wheel(oSc,function(down){
		if(down){
			var l=oBar.offsetTop+speed;
			Scroll(l);
			
		}else{
			var l=oBar.offsetTop-speed;
			Scroll(l);
		}
	})
};




function wheel(obj,fn)
{
	if(window.navigator.userAgent.indexOf('Firefox')!=-1)
	{	
		obj.addEventListener('DOMMouseScroll',wheelFn,false);
	}
	else
	{
		obj.onmousewheel=wheelFn;
	};
	
	function wheelFn(ev)
	{
		var oEvent=ev||event;
        var down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		//true 向下滚
		
		fn&&fn(down);
		ev&&ev.preventDefault(); 
		return false;
		
	};
};



//运动


function getStyle(obj,name){ return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name]}

function getCur(obj,name)
{

	
	if(name=='opacity')
	{
		var child=Math.round(parseFloat(getStyle(obj,name))*100)
	}else
	{
		var child=parseInt(getStyle(obj,name));
	}
	
	if(isNaN(child))
	{
		switch(name)
		{
			case 'top':
			return obj.offsetTop;
			case 'left':
			return obj.offsetLeft;
			case 'width':
			return obj.offsetWidth;
			case 'height':
			return obj.offsetHeight;
		}
	}
	return child;
	
}
function startMove(obj,json,options)
{
	options =options||{};
	options.time=options.time ||700;
	options.type=options.type ||'buffer';	
	var timer={
		veryslow:5000,
		slow:3000,
		normal:2000,
		fast:1000,
		veryfast:500
		}
	
	if(typeof options.time=='string')
	{
		if(timer[options.time])
		{
			options.time=timer[options.time];
		}else
		{
			options.time=1000;
		}
	}
	
	var first={}
	var count=parseInt(options.time/30);
	var dis={};
	
	for(var i in json)
	{
		first[i]=getCur(obj,i);
		dis[i]=json[i]-first[i];
	}
	
	clearInterval(obj.timer);
	var n=0;
	window.speedX=0;
	window.elaType=0;
	obj.timer=setInterval(function(){
			n++
			var wade;
			
			for(var i in json)
			{
				switch (options.type)
				{
					case  'linear':
					wade=first[i]+dis[i]*n/count;
					break;
					case 'buffer':
					var a=1-n/count;
					wade=first[i]+dis[i]*(1-a*a*a);
					break;
					case 'StoF':
					var a=n/count;
					wade=first[i]+dis[i]*(a*a*a);
					break;
					case 'TX':
					speedX+=(json[i]-elaType)/5;
					speedX*=0.7;
					elaType+=speedX;
					wade=Math.round(elaType);
					break;
				}
				
				if(i=='opacity')
				{
					obj.style.opacity=wade/100;
					obj.style.filter='alpha(opacity='+wade*100+')';
				}else
				{
					obj.style[i]=wade+'px';
				}
			}
			if(options.type=='TX')
			{
				if(Math.round(elaType)==json[i] && Math.round(speedX)==0)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}else
			{
				if(count==n)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}
			
			
		
		},30)
}



// 下拉 住宿二级页面导航
function navsecend(){
	$(function(){
		
		var aLi=$('.food-nav-box ul li');
		
		aLi.each(function(index, element) {
            aLi.eq(index).on("mouseenter",function(){
				
				$(this).find('.food-nav-drop').css({display:'block'});
				
				$(this).find('i').addClass('active');
			});
			aLi.eq(index).on("mouseleave",function(){
				
				$(this).find('.food-nav-drop').css({display:'none'});
				$(this).find('i').removeClass('active');
			});
        });	
	});

};





//旅游贴士提示
Tip("roll_list1",2600);
Tip("roll_list2",3600);
function Tip(id,time){
	var oOl=document.getElementById(id).getElementsByTagName('ol')[0];
	var oLi=oOl.children;

	var iNow=0;
	
	setInterval(run,time);
	
	function run(){
		if(iNow>=oLi.length-1){
			iNow=0;	
		}else{
			iNow++;	
		}
		
		startMove(oOl,{top:-oLi[0].offsetHeight*iNow});
	}
};



















// getUrlId

function getUrlId(){
	return parseInt(window.location.href.split('?')[1].split('=')[1]);
};

function getUrlId2(){
	return window.location.href.split('?')[1].split('=')[1];
};

// date

function newdate(times){
	var oDate=new Date();
	
	oDate.setTime(times);
	
	return 	oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());
}





//////////////////////////////////////ajax////////////////////////////////////

/* 导航 */



// 导航 // 


// 导航  目的地
$(function(){
	
	
	// 目的地 您可能想去
	var oMddRmJson={"action":"getviewslist","params":{"categoryId":64,"pagenum":1,"pagesize":3}};
	oMddRmData=JSON.stringify(oMddRmJson);
	$.ajax({
		type:"post",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+oMddRmData,
		beforeSend: function () { 
			$('.youwantJs').html('<span style="color:#fff;">玩命加载中...</span>');
		},
		success: function(data){
			var json=$.parseJSON(data);
			var oDataObj=$.parseJSON(json.objectList);
			//console.log(oDataObj);
			var sHtml='';
			for(var i=0; i<oDataObj.length; i++){
				sHtml+='<div class="show-news-line"><a href="destination.html?id='+oDataObj[i].id+'"><img src="'+oDataObj[i].coverImageUrl+'" /><div class="show-mark"><p>'+oDataObj[i].name+'</p></div></a></div>';
			}
			
			$('.youwantJs').html(sHtml);
		},
		error: function(){},
		timeout:10000
	});	
	
	
	// 区内
	var oQnNum=1;
	var oQnObj='.quneiJs .water-list';
	
	oMdd(oQnObj,65);
	function oMdd(str,oTargetNum){
		var oMddQnJson={"action":"getviewslist","params":{"categoryId":oTargetNum,"pagenum":oQnNum,"pagesize":6}};
		oMddQnData=JSON.stringify(oMddQnJson);
		$.ajax({
			type:"post",
			url:"http://hctour.zjtapp.com/info/api", //http://hctour.dev.zjtapp.com/info/api
			data:"data="+oMddQnData,//main-ad
			beforeSend: function () { 
				$(str).html('<span style="color:#fff;">玩命加载中...</span>');
			},
			success: function(data){
				var json=$.parseJSON(data);
				var oDataObj=$.parseJSON(json.objectList);
				//console.log(oDataObj);
				var sHtml='';
				for(var i=0; i<oDataObj.length; i++){
					sHtml+='<a href="destination.html?id='+oDataObj[i].id+'">'+oDataObj[i].name+'</a>';
				}
				$(str).html(sHtml);
			},
			error: function(){
				$(str).html('加载失败，刷新一下吧！');
			},
			timeout:10000
		});	
	};
	
	$('.quneiJs .Recommend-btn span').on("click",function(){
		oQnNum>=3?oQnNum=0:oQnNum++; //pagenum 测出来最大值为3  
		oMdd(oQnObj,65);
	});
	
	
	// 近郊
	var oJjObj='.jinjiaoJs .water-list';
	oMdd(oJjObj,66);
	$('.jinjiaoJs .Recommend-btn span').on("click",function(){
		oQnNum>=3?oQnNum=0:oQnNum++; //pagenum 测出来最大值为3  
		oMdd(oJjObj,66);
	});
	
	//远郊
	var oYjObj='.yuanjiaoJs .water-list';
	oMdd(oYjObj,67);
	$('.yuanjiaoJs .Recommend-btn span').on("click",function(){
		oQnNum>=3?oQnNum=0:oQnNum++; //pagenum 测出来最大值为3  
		oMdd(oYjObj,67);
	});
	
});

// 导航  精彩发现
$(function(){
	var oMddRmJson='{"action":"getlistlink","params":{"categoryId":68,"pagenum":1,"pagesize":3}}';
	//alert(oMddRmJson)
	$.ajax({
		type:"post",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+oMddRmJson,
		beforeSend: function () { 
			$('.zdJs').html('<span style="color:#fff;">玩命加载中...</span>');
		},
		success: function(data){
			var json=$.parseJSON(data);
			if(json==0){
				$('.zdJs').html('<span style="color:#fff;">暂无数据...</span>');
			}else{
				
				var oDataObj=$.parseJSON(json.objectList);
				
				if(oDataObj.length==0){
					$('.zdJs').html('<span style="color:#fff;">暂无数据...</span>');
				}else{
					var sHtml='';
					for(var i=0; i<oDataObj.length; i++){
						sHtml+='<div class="show-news-line"><a href="lineDetail.html?id='+oDataObj[i].id+'"><img src="'+oDataObj[i].coverImageUrl+'" /><div class="show-mark"><p>'+oDataObj[i].title+'</p></div></a></div>';
					}
					$('.zdJs').html(sHtml);
				}
				
			}
			
		}
	})	
});




$(function(){
	var oNum=1;
	var objStrjp='.jpyJs'
	wantGo(objStrjp,69);
	var objStrqs='.qsyJs'
	wantGo(objStrqs,70);
	var objStrxc='.xcyJs'
	wantGo(objStrxc,71);
	var objStrjh='.jhyJs'
	wantGo(objStrjh,72);
	
	// 精彩发现 几个类型
	
	function wantGo(str,num){
		var oMddRmJson='{"action":"getlistlink","params":{"categoryId":'+num+',"pagenum":'+oNum+',"pagesize":6}}';
		$.ajax({
			type:"post",
			url:"http://hctour.zjtapp.com/info/api",
			data:"data="+oMddRmJson,
			beforeSend: function () { 
				$(str).find('.Boutique-list').html('<span style="color:#fff;">玩命加载中...</span>');
			},
			success: function(data){
				var json=$.parseJSON(data);
				if(json.responseCode==0){
					$(str).find('.Boutique-list').html("暂无数据");
				}else{
					var oDataObj=$.parseJSON(json.objectList);
					var objctNum=$.parseJSON(json.object);
					if(objctNum.count<=6){
						$(str).find('.Recommend-btn').html(' ');
					};
					var sHtml='';
					for(var i=0; i<oDataObj.length; i++){
						sHtml+='<a href="lineDetail.html?id='+oDataObj[i].id+'">'+oDataObj[i].title+'</a>';
					}
					$(str).find('.Boutique-list').html(sHtml);
				}
				
			}
		})	
	}
	
	
	// 精品游和乡村游需要换一换 
	$('.jpyJs .Recommend-btn span').on("click",function(){
		oNum>=2?oNum=1:oNum++; //count/6=num------ 限制3次就可以了  
		wantGo(objStrjp,69);
	});
	
	$('.xcyJs .Recommend-btn span').on("click",function(){
		oNum>=2?oNum=1:oNum++; //count/6=num------ 限制3次就可以了  
		wantGo(objStrxc,71);
	});
	
});

// 合川咨询


$(function(){
	
	var sData='{"action":"newslist","params":{"pageNum":1,"pagesize":5}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sData,
		success: function(data){
			var json=$.parseJSON(data);
			var jsonData=$.parseJSON(json.objectList);
			//console.log(jsonData);

			var zxHtml='';
			var n=5;
			if(jsonData.length<n)n=jsonData.length;

			for(var i=0; i<n; i++){
				
				var oDate=new Date();
				oDate.setTime(jsonData[i].updateTime);
				var sDate=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());		
	
				zxHtml+='<div class="tour-news-all-list-line"><p><a href="information.html?id='+jsonData[i].id+'">'+jsonData[i].title+'</a></p><p class="t-time">'+sDate+'</p></div>';	
			}
			$('.hczx').html(zxHtml);
		},
		error: function(){
			$('.hczx').html('请求失败');	
		}
	});	
});
// 相关资讯
$(function(){
	
	var sData='{"action":"newslist","params":{"pageNum":1,"pagesize":5}}';
	
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sData,
		success: function(data){
			var json=$.parseJSON(data);
			var jsonData=$.parseJSON(json.objectList);
			console.log(jsonData);

			var zxHtml='';
			for(var i=0; i<jsonData.length; i++){
				
				
				zxHtml+='<li class="clearfix"><a href="information.html?id='+jsonData[i].id+'" class="fl">'+jsonData[i].title+'</a><span class="fr">'+newdate(jsonData[i].updateTime)+'</span></li>';
			}
			$('.new_list_ul').html(zxHtml);
		},
		error: function(){
			$('.new_list_ul').html('请求失败');	
		}
	});	
});



// 最新资讯
$(function(){
	
	var sData='{"action":"newslist","params":{"isTop":1,"pageNum":1,"pagesize":2}}';
	
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sData,
		success: function(data){
			var json=$.parseJSON(data);
			var jsonData=$.parseJSON(json.objectList);
			//console.log(jsonData);

			var zxHtml='';
			for(var i=0; i<jsonData.length; i++){
				
				zxHtml+='<div class="tour-news-photo-line"><a href="information.html?id='+jsonData[i].id+'"><img src="'+jsonData[i].coverImageUrl+'" /><div class="tour-mark"><p>'+jsonData[i].title+'</p><p class="t-time">'+newdate(jsonData[i].updateTime)+'</p></div></a></div>';	
			}
			$('.tour-news-photo-list').html(zxHtml);
		},
		error: function(){
			$('.tour-news-photo-list').html('请求失败');	
		}
	});	
});



// 美食推荐 

// 美食推荐---- 人气最高
$(function(){
	hot(1,'.thjxJs',2)
	hot(1,'.rqzg',1);
	hot(0,'.yemaozibiquzhidi'); // 夜猫子必去的地儿
	function hot(opt,obj,num){
		if(opt==1){
			var oGlData ='{"action":"getBizList","params":{"exfE":"'+num+'","isHot":"1"},"source":"web","targer":"biz"}';
		}else{
			var oGlData ='{"action":"getBizList","params":{"isHot":"1"},"source":"web","targer":"biz"}';
		}
		
		
		$.ajax({
			type:"POST",
			url:rUrl,
			data:"data="+oGlData,
			success: function(data){
				var json=eval('['+data+']');
				if(json[0].responseCode==1){
					var sjson=eval('['+json[0].object+']');
					var rqzgHtml='';
					var aLlnum=3;
					if(sjson[0].length<3){
						aLlnum=sjson[0].length;
					}
					for(var i=0; i<aLlnum; i++){
						rqzgHtml+='<div class="show-news-line"><a href="hoteldetail.html?id='+sjson[0][i].id+'"><img src="'+sjson[0][i].coverImageUrl+'"><div class="show-mark">'+sjson[0][i].name+'</div></a></div>';
					}
					$(obj).html(rqzgHtml);
				}else if(json[0].responseCode==0){
					$(obj).html('暂无数据-');
				}	
			}
		})
	}
	
});

// 合川非吃不可  等等。。。。
$(function(){
	
	// 非吃不可
	ms("合川非吃不可",'.fcbk',1);
	ms("顶级私房菜",'.sssfc',1);
	ms("优质美食商家",'.yzmssj',1);
	
	function ms(tag,sclass,num){

			var oGlData='{"action":"getBizList","params":{"exfA":"'+tag+'","exfE":"'+num+'"},"source":"web","targer":"biz"}';

		
		$.ajax({
			type:"POST",
			url:rUrl,
			data:"data="+oGlData,
			success: function(data){
				var json=eval('['+data+']');
				var more=$(sclass).eq(0).parents('.col-md-2').find('.Recommend-btn').html('<a href="food.html">查看更多</a>');
				if(json[0].responseCode==1){
					var sjson=eval('['+json[0].object+']');	
					var rqzgHtml='';
					var Allnum=6;
					
					if(sjson[0].length<6){
						Allnum=sjson[0].length;
						more.css('display','none');
					}else{
						more.css('display','block');
					}
					for(var i=0; i<Allnum; i++){
						rqzgHtml+='<a href="fooddetail.html?id='+sjson[0][i].id+'">'+sjson[0][i].name+'</a>';
					}
					$(sclass).html(rqzgHtml);
				}else if(json[0].responseCode==0){
					$(sclass).html('暂无数据-');
					more.css('display','none');
				}
			}
		})
	};
});




// // 休闲住宿  等等。。。。
$(function(){
	// 休闲住宿
	ms(1,"商务星级酒店",'.shangwuji',2);
	ms(1,"主题型酒店",'.zhutixing ',2);
	ms(1,"经济型酒店",'.jingjixing',2);
	ms(1,"度假型酒店",'.dujiaxing',2);
	
	//
	ms(0,"休闲娱乐",'.xiuxianyule');
	
	ms(0,"美味夜宵",'.meiweixiaoye');
	function ms(opt,tag,sclass,num){
		if(opt==1){
			var oGlData='{"action":"getBizList","params":{"exfA":"'+tag+'","exfE":"'+num+'"},"source":"web","targer":"biz"}';
		}else{
			var oGlData='{"action":"getBizList","params":{"exfA":"'+tag+'",},"source":"web","targer":"biz"}';
		}
		
		$.ajax({
			type:"POST",
			url:rUrl,
			data:"data="+oGlData,
			success: function(data){
				var json=eval('['+data+']');
				var more=$(sclass).eq(0).parents('.col-md-2').find('.Recommend-btn').html('<a href="food.html">查看更多</a>');
				if(json[0].responseCode==1){
					var sjson=eval('['+json[0].object+']');	
					var rqzgHtml='';
					var Allnum=6;
					
					if(sjson[0].length<6){
						Allnum=sjson[0].length;
						more.css('display','none');
					}else{
						more.css('display','block');
					}
					for(var i=0; i<Allnum; i++){
						rqzgHtml+='<a href="hoteldetail.html?id='+sjson[0][i].id+'">'+sjson[0][i].name+'</a>';
					}
					$(sclass).html(rqzgHtml);
				}else if(json[0].responseCode==0){
					$(sclass).html('暂无数据-');
					more.css('display','none');
				}
			}
		})
	};
});


$(function(){
	getHotel(119,'.meiweixiaoye');//美味宵夜
	//getHotel(118,'.fcbk');//非吃不可
	
	function getHotel(cid,sclass){
		var oGlData='{"action":"getListBiz","params":{"categoryId":'+cid+',"pagesize":6}}';
		$.ajax({
			type:"POST",
			url:"http://hctour.zjtapp.com/info/api",
			data:"data="+oGlData,
			success: function(data){
				
				var json=$.parseJSON(data);
				console.log(json);
				if(json.responseCode==1){
					var sjson=$.parseJSON(json.objectList);	
					var rqzgHtml='';
					for(var i=0; i<sjson.length; i++){
						
						rqzgHtml+=' <a href="hoteldetail.html?id='+sjson[i].id+'">'+sjson[i].name+'</a>';
					}
					$(sclass).html(rqzgHtml);
				}else if(json.responseCode==0){
					$(sclass).html('暂无数据。。。');	
					
					$(sclass).parents('.col-md-2').find('.Recommend-btn').css({"display":"none"});
				}
				
			}
		})
	}
	
});

//休闲娱乐

// 夜猫子

// 进行中的活动
$(function(){
	var oGlData='{"action":"getListActivity","params":{"activityStatusId":1}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+oGlData,
		success: function(data){
			var json=$.parseJSON(data);
			var sjson=$.parseJSON(json.objectList);	
			//console.log(sjson)	;
			var n=6;
			if(sjson.length>6){
				sjson.length=6;
			}
			var rqzgHtml='';
			for(var i=0; i<sjson.length; i++){
				
				rqzgHtml+=' <a href="active.html?id='+sjson[i].id+'">'+sjson[i].title+'</a>';
			}
			$('.huodonging').html(rqzgHtml);
		}
	})
});
// 一结束的的活动
$(function(){
	var oGlData='{"action":"getListActivity","params":{"activityStatusId":2}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+oGlData,
		success: function(data){
			var json=$.parseJSON(data);
			var sjson=$.parseJSON(json.objectList);	
			//console.log(sjson)	;
			var n=6;
			if(sjson.length>6){
				sjson.length=6;
			}
			var rqzgHtml='';
			for(var i=0; i<sjson.length; i++){
				
				rqzgHtml+=' <a href="active.html?id='+sjson[i].id+'">'+sjson[i].title+'</a>';
			}
			$('.huodongend').html(rqzgHtml);
		}
	})
});


// 周边住宿  酒店
// 攻略


function Search_com(obj,url,fn){
	
	$(function(){
		//<!-- 攻略 -->
		var oGlData=url;
		$.ajax({
			type:"POST",
			url:"http://hctour.zjtapp.com/info/api",
			data:"data="+oGlData,
			success: function(data){
				var jsondata=$.parseJSON(data);
				var arrData=$.parseJSON(jsondata.objectList);
				//console.log(arrData)
				var shtml='';
				for(var i=0; i<arrData.length; i++){
					
					if(arrData[i].price=='' || arrData[i].price==undefined)arrData[i].price='未定';
					if(arrData[i].tel=='' || arrData[i].tel==undefined)arrData[i].tel='暂无';
					if(arrData[i].address=='' || arrData[i].address==undefined)arrData[i].address='暂无';
					shtml+=fn(arrData[i]);
					//shtml+=; 
				}
				obj.html(shtml);
			}	
		});
	});	
}




// banner


function bannerchange(opt){

	var aLi=opt.Li;
	var oPrev=opt.Prev;
	var oNext=opt.Next;
	var oBox=opt.Box;
	
	var sBys=true;
	//alert(aLi.innerHTML)
	if(aLi.length==undefined){ 
		return false;
		alert(123)
	}
	
	var oW=aLi[0].offsetWidth;
	
	for(var i=1; i<aLi.length; i++)
	{
		aLi[i].style.left=oW+'px'
	}
	var iNow=0;
	
	var timer=null;
	timer=setInterval(comfn,8000);
	oNext.onclick=function()
	{
		comfn();
	}
	// 移入
	oBox.onmouseover=function()
	{
		clearInterval(timer)
		startMove(oPrev,{ opacity:100,left:20 },{time:300});
		startMove(oNext,{ opacity:100,right:20 },{time:300});
	}
	//移出
	oBox.onmouseout=function()
	{
		timer=setInterval(comfn,8000);
		startMove(oPrev,{ opacity:0,left:-80 },{time:300});
		startMove(oNext,{ opacity:0,right:-80 },{time:300});
	}
	function comfn(){
		if(sBys){
			sBys=false;
			if(iNow==aLi.length-1)
			{
				iNow=0
				for(var i=0; i<aLi.length-1; i++)
				{
					aLi[i].style.left=oW+'px'
				}
				
				startMove(aLi[aLi.length-1],{ left:-oW },{time:300,fn:function(){
					//alert(213)
					aLi[aLi.length-1].style.left=oW+'px';
					sBys=true;
				}});
				startMove(aLi[0],{ left:0 },{time:300});
			}else{
				startMove(aLi[iNow],{ left:-oW },{time:300});
				startMove(aLi[iNow+1],{ left:0},{time:300,fn:function(){
					sBys=true;
				}});
				iNow++
			};
		}
	}
	oPrev.onclick=function()
	{
		if(sBys){
			sBys=false;
			if(iNow==0)
			{
				(iNow)=aLi.length-1
				aLi[aLi.length-1].style.left=-oW+'px'
				startMove(aLi[0],{ left:oW },{time:300});
				startMove(aLi[iNow],{ left:0},{time:300,fn:function(){
					sBys=true;
				}});
			}else{
				for(var i=0; i<iNow; i++)
				{
					aLi[i].style.left=-oW+'px'
				}
				startMove(aLi[iNow],{ left:oW },{time:300});
				startMove(aLi[iNow-1],{ left:0},{time:300,fn:function(){
					sBys=true;	
				}});
				iNow--
			};
		}
	};
};





//吸顶条
xdt();
function xdt(){
			
	var oBox=document.getElementById('nav_bar');
	var oPos=document.getElementById('pos');
	var t=getPos(oBox).top;
	
	window.onscroll=function()
	{
		var _scroll=document.documentElement.scrollTop||document.body.scrollTop;
		
		if(_scroll>=t)
		{
			oBox.style.position='fixed';
			oBox.style.top='0';
			oBox.style.left='50%';
			oBox.style.marginLeft='-600px';
			oPos.style.display='block';	
		}
		else
		{
			oBox.style.position='';
			oBox.style.marginLeft='';
			oPos.style.display='none';	
		}
			
	};
}


// 房间预订提示
$(function(){
	$("a:contains('预订')").on("click",function(){
		$(this).attr("href","javascript:;")
		alert("敬请期待！");	
	});	
});





