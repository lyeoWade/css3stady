
/* banner */

// banner

$(function(){

	// 特产
	var sDatabanner='{"action":"getlistbanner","params":{"categoryId":1,"pagenum": 1,"pagesize": 6}}';
	var tarArr=['合川自古人杰地灵，民尚习文，兴学重教之风源远流长。城东嘉陵江岸学士山上，有北宋理学家周敦颐讲学之所养心堂。1939年，伟大的人民教育家陶行知先生在草街古圣寺创办了蜚声中外的育才学校。建校一个多世纪的合川中学，其前身更可上溯到明嘉靖十年的合宗书院。','合川古名垫江(原为亵江，取嘉、涪二江在城北鸭咀的汇合之水如衣重叠之意，《汉书·地理志》误记为垫江并沿袭至今)，在巴人入川前是濮族人主要居住地，合川古城邑“巴子城”(今城区铜梁山下)曾是巴国别都。公元前314年始设垫江县，县域辖今合川、武胜、铜梁、安岳、岳池县地，隶属巴郡...','南宋淳二年(1242年)，四川安抚制置史兼重庆知府余玠始筑钓鱼城。1258年，蒙哥大汗挟西征欧亚非40余国的威势，分兵三路伐宋。蒙哥亲率的一路军马进犯四川，于次年2月兵临合川钓鱼城。蒙哥铁骑东征西讨，所向披靡,然而在钓鱼城主将王坚与副将张珏的顽强抗击下，却不能越雷池半步...','合川人文历史厚重。是巴文化发源地之一，建制历史2300多年。理学家周敦颐、“天下廉吏第一”于成龙曾在合为官，人民教育家陶行知、无产阶级革命家赵君陶曾在合创业。合川孕育了川东蚕桑之父张森楷、被毛主席誉为“中国民族工业四个不能忘记”之一的卢作孚...','合川钓鱼城，位于重庆合川城区嘉陵江南岸钓鱼山上，占地2.5平方千米。山上有一块平整巨石，传说有一巨神于此钓嘉陵江中之鱼，以解一方百姓饥馑，山由此得名。钓鱼城峭壁千寻，...','打造中国知名旅游城市品牌，打造“钓鱼城旅游文化节”城市名片，进一步扩大内需、促进消费，提升合川旅游知名度和美誉度，提升合川区域性中心大城市辐射力和影响力...'];
	
	var bannerArr=['images/banner/1.jpg','images/banner/2.jpg','images/banner/3.jpg','images/banner/4.jpg','images/banner/5.jpg','images/banner/6.jpg'];
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sDatabanner,
		success: function(data){
			var json=$.parseJSON(data);
			var objdata=$.parseJSON(json.objectList);
			var bstr='';
			
			for(var i=0; i<objdata.length; i++){
				bstr+='<li><a href="'+ objdata[i].linkUrl +'"><img class="bigimg" src="'+objdata[i].coverImgUrl+'"></a><div class="banner-mark"><a href=""></a><div class="clearfix banner-mark-warp"><a href="">';
                bstr+='</a><div class="video-pci fl"><a href=""></a><a target="_blank" href="video.html?id='+i%4+'"><img src="'+bannerArr[i%4]+'"></a></div><div class="banner-des fl"><h2>'+objdata[i].title+'</h2><p class="banner-des-content">'+tarArr[i]+'</p><p class="more-des"><a href="about.html?id='+(i+1)+'">了解更多</a></p></div></div></div></li>';
			}
			$('.banner-box ul').html(bstr);
			//主页banner的切换
			var aLi=hc('.banner-box ul li');
			var oPrev=hc('.prev');
			var oNext=hc('.next');
			var oBoxBanner=hc('.banner-box');
			
			bannerchange({
				Li:aLi,
				Prev:oPrev,
				Next:oNext,
				Box:oBoxBanner
			})

		}
	});	
});

function isChild(oParent,obj)
{
	while(obj)
	{
		if(obj==oParent) //如果找到的目的地 
		{
			return true;
		}
		obj=obj.parentNode;
		//并且让obj=obj.parentNode
	}
	return false;  //没找到
};




/*   热门景点推荐	 */


// 景点推荐


$(function(){
	//Scenery  热门景点推荐  Scenery spots
	
	var sData='{"action":"getviewslist","params":{"pagenum":1,"isHot":1,"pagesize":12}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		beforeSend: function(){
			$('.hc-nominate-list').eq(0).find('ul').html('<p style="text-align:center; font-size:18px; color:#09F; padding-top:100px;">数据加载中...</p>')	
		},
		data:"data="+sData,
		success: function(data){
			var jsonObj=$.parseJSON(data);
			var objList=$.parseJSON(jsonObj.objectList);
			var n=6;
			//var scale=objList.length%6;
			var oUl1=$('.hc-nominate-list').eq(0).find('ul');
			var shtml1='';
			//console.log(objList);
			for(var i=0; i<n; i++){
				shtml1+='<li><a href="destination.html?id='+objList[i].id+'"><img src="'+objList[i].coverImageUrl+'" /> <p>'+objList[i].name+'</p></a><div class="nominate-share"><!-- JiaThis Button BEGIN --><div class="jiathis_style_24x24"><a class="jiathis_button_weixin weixin"></a><a class="jiathis_button_cqq qq"></a></div><script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script><!-- JiaThis Button END --></div></li>';
			}
			
			oUl1.html(shtml1);
			
			var Allnum=12;
			
			if(objList.length<12){
				Allnum=objList.length;
			}
			
			var oUl2=$('.hc-nominate-list').eq(1).find('ul');
			var shtml2='';
			for(var i=n; i<Allnum; i++){
				shtml2+='<li><a href="destination.html?id='+objList[i].id+'"><img src="'+objList[i].coverImageUrl+'" /> <p>'+objList[i].name+'</p></a><div class="nominate-share"><!-- JiaThis Button BEGIN --><div class="jiathis_style_24x24"><a class="jiathis_button_weixin weixin"></a><a class="jiathis_button_cqq qq"></a></div><script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script><!-- JiaThis Button END --></div></li>';
				
			}
			
			oUl2.html(shtml2);
			//console.log(objList);
			
			// 效果		
				var oBtn=$('.hc-nominate-dotBtn a');
				var oBox=$('.hc-nominate-list');
				var oPrev=$('.hc-nominate-prev');
				var oNext=$('.hc-nominate-next');
				var zIndex=2;
				var iNow=0;
				oBox.eq(0).css({"zIndex":2,"opacity":100});
				oBtn.each(function(index, element) {
					oBtn.eq(index).on("click",function(){
						 if(iNow==index)return;
						 iNow=index;
						 paly();
						 
					});
				});
				function paly(){
					oBtn.removeClass('active');	
					oBtn.eq(iNow).addClass('active');	
					
					for(var i=0; i<oBtn.length; i++){
						oBox.eq(i).animate({opacity:"0"});
					}
					
					oBox.eq(iNow).css({"zIndex":zIndex++});
					oBox.eq(iNow).animate({opacity:"100"	});	
				}
				
				oPrev.on("click",function(){
					
					if(iNow==oBtn.length-1){
						iNow=0;
					}else{
						iNow++;	
					}
					paly();
				});
				
				oNext.on("click",function(){
					
					if(iNow==0){
						iNow=oBtn.length-1;
					}else{
						iNow--;	
					}
					paly();
				});
		}	
	});
	
});


// 线路
$(function(){
	
	var oGlData='{"action":"getlistlink","params":{"pagenum":1,"isHot":1,"pagesize":5}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+oGlData,
		beforeSend: function(){
			$('.col-lg-list-data').html('<div style="text-align:center; font-size:18px; color:#09F; padding-top:100px;">数据加载中...</div>');
		},
		success: function(data){
			var json=$.parseJSON(data);
			var sdata=$.parseJSON(json.objectList);
			
			var oList=$('.col-lg-list-data');
			
			for(var i=0; i<sdata.length; i++){
				oList.eq(i).html('<a href="lineDetail.html?id='+sdata[i].id+'"><img src="'+sdata[i].coverImageUrl+'"><p>'+sdata[i].title+'</p></a><div class="hot-nominate"><a href="javascript:;" class="jian"></a><a href="javascript:;" class="hoticon"></a></div>');
			};
			
			
			
		}
	})
		
});

//攻略

Search_com(
	$('.strategy-list'),'{"action":"getliststategy","params":{"pageNum":1,"pagesize":4}}',function(obj){
		 return '<dl class="clearfix"><dt><a href="TravelStrategy.html?id='+obj.id+'"><img src="'+obj.coverImgUrl+'" /></a><div class="strategy-user"><a href="TravelStrategy.html?id='+obj.id+'"></a></div></dt><dd><h3><a href="TravelStrategy.html?id='+obj.id+'">'+obj.title+'</a></h3><p> <time>'+newdate(obj.createTime)+'</time><i>'+obj.counts.commentCount+'</i> </p></dd></dl>';
	}
)


// 合川美食  Local food   商家

$(function(){
	ts('.hcjxms','精选美食');
	ts('.hctcJs','当地特产');
	ts('.biz','优质商家');
	function ts(obj,tagname){
		
		var sData='{"action":"getBizList","params":{"exfA":"'+tagname+'"},"source":"web","targer":"biz"}';
		$.ajax({
			type:"POST",
			url:rUrl,
			data:"data="+sData,
			success: function(data){
				var json=eval('['+data+']')
				
				if(json[0].responseCode==1){
					var objdata=eval('['+json[0].object+']')[0];
					console.log(objdata);
					var Bhtml='';
					var aLlNum=4;
					
					if(objdata.length<4){
						aLlNum=objdata.length;
					}
					
					for(var i=0; i<aLlNum; i++){
						Bhtml+='<li><a href="hoteldetail.html?id='+objdata[i].id+'"><img src="'+objdata[i].coverImageUrl+'"><div class="meishi-lyear " style="bottom: -140px;"><h3>'+objdata[i].name+'</h3><p class="clearfix"><span class="comment fl">'+0+'</span><span class="views fr">'+0+'</span></p></div></a></li>';
					}
					$(obj).html(Bhtml);
					
					
					
					var oBox=$(".main-meishi-list");
					oBox.each(function(index, element) {
						
						var aLi=oBox.eq(index).find('li');
						
						
						aLi.each(function(i, element) {
							aLi.eq(i).find('.meishi-lyear').addClass('meishibg'+(index+1)+'');
							aLi.eq(i).mouseenter(function(){
								$(this).find('.meishi-lyear').stop().animate({
									bottom: "-80px"	
								});
							});
							aLi.eq(i).mouseleave(function(){
								$(this).find('.meishi-lyear').stop().animate({
									bottom: "-140px"	
								});
							});
						});	
					});
				}else if(json[0].responseCode==0){
					$(obj).html('<span class="comtip">暂无数据</span>');	
					var lh=$('.comtip').height();
					$('.comtip').css('line-height',lh+'px')
				}
				
			}
		});
		
			
	}
	
});


