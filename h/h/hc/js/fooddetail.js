$(function(){
	var numList=1;
	var aLlstr='';
	
	var sData='{"action":"getOneBiz","datetime":1437640713556,"params":'+getUrlId()+',"source":"web","targer":"biz"}';
	$.ajax({
		type:"post",
		url:rUrl, 
		beforeSend: function(data){
			$('.mark_bg').css({"display":"block"});
			$('.mark_bg').animate({opacity:0.9});
		},
		data:"data="+sData,
		success: function(data){
			
			$('.mark_bg').animate({opacity:0},function(){
				$('.mark_bg').css({"display":"none"});
			});
			
			
			var json=$.parseJSON(data);
			var obj=$.parseJSON(json.object);
			console.log(obj);
			
			
			
			var oLi='';
			
			for(var i=0; i<obj.imgs.length; i++){
				oLi+='<li><a href=""><img src="'+obj.imgs[i].url+'" /><p class="fd-mark">'+obj.name+'</p></a></li>';	
			}
			//$('.user_name').html(obj.name);
			$('.fd-product-banner-warp ul').html(oLi);
			
			
			var aLi=hc('.fd-product-banner-warp ul li');
			var oPrev=hc('.fd-prev');
			var oNext=hc('.fd-next');
			var oBox=hc('.fd-product-banner-warp');
			//alert(aLi.length)
			bannerchange({
				Li:aLi,
				Prev:oPrev,
				Next:oNext,
				Box:oBox
			});

			
			
			if(obj.price==undefined){
				obj.price='暂无报价';
			};
			
			$('.user_info_line2').html('<span class="address fl">'+obj.address+'</span><span class="tel fr">'+obj.tel+'</span>');
			$('.des_box').html(obj.intro);
			
			$('.fd-price').html('<em>&yen;</em>'+obj.price+'<i>RMB</i>')
			if(obj.price==undefined && obj.price==''){
				$('.how_Arrive').html('暂无描述！');
			}else{
				$('.how_Arrive').html(obj.exfA);
			
			};
			console.log(obj);
			$('.lyxz').html(obj.exfB);
			
			$('.fd-product-box').attr("tag",obj.id);
			
			// 百度地图API功能
			var map = new BMap.Map("allmap");
			var point = new BMap.Point(obj.localLo,obj.localLa);
			map.centerAndZoom(point, 15);
			var opts = {
			  position : point,    // 指定文本标注所在的地理位置
			  offset   : new BMap.Size(14, -25)    //设置文本偏移量
			}
			var label = new BMap.Label(obj.name, opts);  // 创建文本标注对象
				label.setStyle({
					 color : "red",
					 fontSize : "12px",
					 fontFamily:"微软雅黑",
					 borderColor:"#bcbbba",
					 padding:"4px 12px",
					 borderRadius:"5px"
				 });
			map.addOverlay(label);   
		
			var marker = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker);              // 将标注添加到地图中
			
			//评论
			//conment(numList,obj.id);
			getConments('.fd-product-box')
			
					
		},
		error: function(){},
		timeout:10000
	});	
	Contents('.fd-product-box')
	
	//加载评论
	function conment(numList,plId){
		var plStr='{"action":"commentlist","params":{"pagenum":'+numList+',"pagesize":10,"targerObjectId":'+plId+'}}';
			$.ajax({
				type:"post",
				url:"http://hctour.dev.zjtapp.com/info/api", //http://hctour.dev.zjtapp.com/info/api
				data:"data="+plStr,
				success: function(data){
					var json2=$.parseJSON(data);
					var obj2=$.parseJSON(json2.objectList);
					
					//评论数量
					var oNumpl=$.parseJSON(json2.object).count;
					//console.log(obj2);
					$('.Comment_allNum').html('<span>评论量( '+oNumpl+' )</span>');
					
					var sHtml='';
					if(obj2.length==0){
						$('.Comment_box_warp ul').html('<p style="text-align:center; font-size:20px;">暂无评论');
					}else{
						for(var i=0; i<obj2.length; i++){
							sHtml+=' <li class="clearfix"><div class="Comment_user_box fl"><p><a href=""><img src="'+obj2[i].userOtherAvatar+'"/></a></p><p class="username"><a href="#">'+obj2[i].userOtherName+'</a></p></div><div class="Comment_content fl"><p>'+obj2[i].content+'</p><p class="push_time">'+newdate(obj2[i].updateTime)+'</p></div></li>';
						}
						
						aLlstr+=sHtml;
						
						$('.Comment_box_warp ul').html(aLlstr+'<li class="addMore"><a href="javascript:;">加载更多</a></li>');
						
						//console.log(aLlstr);
					};
					
					 // 点击加载更多
					 
					 $('.addMore a').on('click',function(){
							 
							// alert($('.Comment_box_warp ul li').length-1+'---'+oNumpl)
							 if($('.Comment_box_warp ul li').length-1>=oNumpl){
								 $('.addMore a').html('没有更多了！');
								 return false;
								// $('.addMore').css({"display":"none !important"})
							  }else{
								numList++;  
							  }
							// alert(numList)
							 conment(numList,plId);
					 });
				
				},
				error: function(){
					
				},
				timeout:10000
			});	
	};
		
					
	
	
	var oBtn=$('#tour_warp_btn li');
	var oBox=$('#tour_box').children('div');
	oBtn[0].className='active';
	oBox[0].style.display='block';
	
	oBtn.each(function(index, element) {
        
		oBtn.eq(index).on('click',function(){
			
			oBtn.removeClass('active');
			oBox.css({display:'none'});
			
			$(this).addClass('active');
			oBox.eq(index).css({'display':'block'});
		});
		
    });
	
	
	
	
	//景点攻略
	Search_com($('.strategyJs'),
	'{"action":"getliststategy","params":{"pageNum":1,"pagesize":5}}'
	,function(obj){
		 return '<dl class="fl"><dt class=""><a href="TravelStrategy.html?id='+obj.id+'"><img src="'+obj.coverImgUrl+'"></a></dt><dd class="ms_title"><a href="TravelStrategy.html?id='+obj.id+'">'+obj.title+'</a></dd><dd class="strategy_view"><span class="time">'+newdate(obj.createTime)+'</span><span class="cont">'+obj.counts.readCount+'</span></dd></dl>';
	})
	
	
	// 周边住宿
	
	Search_com($('.rooms'),
	'{"action":"getListBiz","params":{"exfE":2,"pagesize":9}}'
	,function(obj){
		//console.log(obj)
		 return '<dl class="fl"><dt><a href="hoteldetail.html?id='+obj.id+'"><img src="'+obj.coverImageUrl+'" /></a></dt><dd class="ms_title"><a href="hoteldetail.html?id='+obj.id+'">'+obj.name+'</a></dd><dd class="phone"><span>'+obj.tel+'</span></dd><dd class="address"><span>'+obj.address+'</span></dd></dl>';
});
Search_com($('.msJs'),'{"action":"getListBiz","params":{"exfE":1,"pagesize":9}}',function(obj){
		//console.log(obj)
		 return '<dl class="fl"><dt><a href="hoteldetail.html?id='+obj.id+'"><img src="'+obj.coverImageUrl+'" /></a></dt><dd class="ms_title"><a href="">'+obj.name+'</a></dd><dd class="ms_price"><span>'+obj.price+'<em>&yen;</em><i>rmb</i></span></dd></dl>'; 
	});
	
	
	
	
	
	
// 获取评论
function getConments(str){
	var oTag=$(str).attr('tag');
	var sDataPl='{"action":"commentlist","params":{"targerObjectName":"view","targerObjectId":'+oTag+'}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.dev.zjtapp.com/info/api",
		data:"data="+sDataPl,
		success: function(data){
			var json=$.parseJSON(data);
			var oData=$.parseJSON(json.objectList);
					
					//评论数量
			var oNumpl=$.parseJSON(json.object).count;
			$('.Comment_allNum').html('<span>评论量( '+oNumpl+' )</span>');
			
			if(oNumpl==0){
				$('.Comment_box_warp ul').html('暂无评论！');
			}
			
			var sHtml='';
			for(var i=0; i<oData.length; i++){
				sHtml+='<li class="clearfix"><div class="Comment_user_box fl"><p><a href=""><img src="'+oData[i].userOtherAvatar+'"/></a></p><p class="username"><a href="#">'+oData[i].userOtherName+'</a></p></div><div class="Comment_content fl"><p>'+oData[i].content+'</p><p class="push_time">'+newdate(oData[i].createTime)+'</p></div></li>';
			}
			$('.Comment_box_warp ul').html(sHtml);
			
		}	
	});
}

// 发布评论
function Contents(str){
	$('.sub_btn').on("click",function(){

		var oTag=$(str).attr('tag');
		var sDate='{"action":"commentadd","params":{"content":"'+$('.text_box').val()+'","targerObjectId":'+oTag+',"targerObjectName":"view","userId":917}}';
		
		//alert(oTag+'-'+$('.text_box').val())
		
		$.ajax({
			type:"POST",
			url:"http://hctour.zjtapp.com/info/api",
			data:"data="+sDate,
			success: function(data){
				//alert(data)
				var json=$.parseJSON(data);
				console.log(json);
				console.log(json.responseCode);
				if(json.responseCode==0 || json.responseCode==1 ){
					alert("发布成功！");	
					getConments(str);
				}
			},
			error: function(){
				alert("发表失败！");	
			}
		});	
	});	
}
	
})