// JavaScript Document

// ~~~~~~~~  线路  ~~~~~~~~

$(function(){
	
	var sData='{"action":"getonelink","params":{"id":'+getUrlId()+'}}';
	var allStr='';
	var arr=[];
	$.ajax({
		type:"post",
		url:"http://hctour.zjtapp.com/info/api", //http://hctour.dev.zjtapp.com/info/api
		data:"data="+sData,
		beforeSend: function(data){
			$('.mark_bg').css({"display":"block"});
			$('.mark_bg').animate({opacity:0.9});
			
		},
		success: function(data){
			
			
			$('.mark_bg').animate({opacity:0},function(){
				$('.mark_bg').css({"display":"none"});
			});
			
			var json=$.parseJSON(data);
			var obj=$.parseJSON(json.object);
			
			$('.dayNum_des span').html(obj.day+'天')
			$('.bestway_des').html(obj.exfB);
			$('.line_head_top h2').html(obj.title);
			$('.howmoney_des').html(obj.exfC);
			$('.besttime_des').html(obj.exfD);
			// 途中的景点
			var inViews='';
			for(var i=0; i<obj.views.length; i++){
				inViews+='<a href="destination.html?id='+obj.views[i].id+'">'+obj.views[i].name+'</a>';
			}
			$('.linepoint_des').html(inViews);
			
			//console.log(obj)
			
			
			// 获取天数 根据 obj.day 判断 找到一条具体线路确定天数  
			//在每一天下面找到景点列表  然后循环
			var day='{"action":"getlistlinkday","params":{"lineId":'+obj.id+'}}'
			$.ajax({
				type:"post",
				url:"http://hctour.zjtapp.com/info/api", //http://hctour.dev.zjtapp.com/info/api
				data:"data="+day,
				success: function(data){
					var jsonS=$.parseJSON(data);
					var objS=$.parseJSON(jsonS.objectList);
					//console.log(objS);
					var dayhtml='';
					var llll='';
					for(var k=objS.length-1; k>=0; k--){		
						(function(kk){
							
							//console.log(objS[kk].viws);
							
							var strlist='';
							var oImgstr='';
							for(var j=0; j<objS[kk].viws.length; j++){
								//console.log(strlist)
								var num=objS[kk].id;
								
								if(objS[kk].viws[j]==null)continue;
								// 控制描述的字数
								//alert(objS[kk].viws[j].intro.length)
								if(objS[kk].viws[j].intro.length>=320){
									var endstr=objS[kk].viws[j].intro.substring(0,320);	
								}else{
									var endstr=objS[kk].viws[j].intro;
								};
								//控制票价
								if(objS[kk].viws[j].price=='')objS[kk].viws[j].price='待定';	
								if(objS[kk].viws[j].price==undefined)objS[kk].viws[j].price='待定';	
								
								arr.push(objS[kk].viws[j].id); //得到每个景点的id
								/*<div class="line_mark">文字</div>*/
								strlist+='<div class="linepoint_list clearfix"><div class="lineleft_photo fl"><div class="lineleft_photo_big"><img src="'+objS[kk].viws[j].coverImageUrl+'" /></div><div class="clearfix lineleft_photo_s"><div class="fl lineleft_photo_smll"><img src="'+objS[kk].viws[j].coverImageUrl+'" /></div><div class="fl lineleft_photo_smll"><img src="'+objS[kk].viws[j].coverImageUrl+'" /></div></div></div>';
								strlist+='<div class="lineright_des fl"><div class="view_name"><span>'+objS[kk].viws[j].name+'</span></div><div class="view_des">'+endstr+'</div><div class="view_price"><span>'+objS[kk].viws[j].price+'<em>&yen;</em><i>rmb</i></span></div><div class="view_tel">'+objS[kk].viws[j].tel+'</div><div class="view_addres">'+objS[kk].viws[j].address+'</div><div class="view_more"><a href="destination.html?id='+objS[kk].viws[j].id+'">了解详情</a></div></div></div>';
							}
							
							dayhtml+='<div class="line_days_warp"><div class="linepoint_box"><div class="linepoint_box_warp"><h3>'+objS[kk].title+'</h3><div class="allstr">'+strlist+'</div></div></div></div>';
						})(k);
					};
					
					$('.days_box').html(dayhtml);
					
					// 加载完成 换位置
					$(function(){
						
						for(var i=0; i<$('.line_days_warp').length; i++){
							if(i%2==1){
								$('.line_days_warp').eq(i).find('.lineright_des').addClass('lineright_des_sec');
								$('.line_days_warp').eq(i).find('.lineleft_photo').removeClass('fl').addClass('fr');	
								$('.line_days_warp').eq(i).find('.linepoint_box_warp').addClass('secend');;
							}	
						};
						
						var strArr=[];
						var imagesHtml='';
						$('.lineleft_photo').empty();
						
						var timer=null;
						
						for(var t=arr.length-1; t>=0; t--){
							(function(ind){
								
								var day='{"action":"getoneviews","params":{"id":'+arr[ind]+'}}'
								$.ajax({
									type:"post",
									url:"http://hctour.zjtapp.com/info/api", //http://hctour.dev.zjtapp.com/info/api
									data:"data="+day,
									success: succ
								});
								
								function succ(data){
									var jsonOne=$.parseJSON(data);
									var objOne=$.parseJSON(jsonOne.object);
									strArr.push(objOne.imgs);
									//console.log(strArr[strArr.length-1]);
									//console.log(strArr);
									//console.log(strArr.length);
									//alert(ind)
									$('.lineleft_photo').eq(ind).html('<div class="lineleft_photo_big"><img src="'+strArr[strArr.length-1][0].url+'" /></div><div class="clearfix lineleft_photo_s"><div class="fl lineleft_photo_smll"><img src="'+strArr[strArr.length-1][1].url+'" /></div><div class="fl lineleft_photo_smll"><img src="'+strArr[strArr.length-1][2].url+'" /></div>');
									
								}
								
								
							})(t)
							
							
							
						}
						
						
							
								
	
					});
					
				},
				error: function(xhr, ajaxOptions, thrownError) {
                    me.recieve(context);
                }
			})
		},
		error: function(){
  			$('.mark_bg div').html("无数据,马上返回！");
			history.go(-1);
		},
		timeout:10000
	});	 
});


/*

$(function(){
	var imagesHtml='';
	arr=[221, 222, 224, 225]
	for(var y=0; y<arr.length; y++){
		
		var day='{"action":"getoneviews","params":{"id":'+arr[y]+'}}'
		$.ajax({
			type:"post",
			url:"http://hctour.zjtapp.com/info/api", //http://hctour.dev.zjtapp.com/info/api
			data:"data="+day,
			success: function(data){
				var jsonOne=$.parseJSON(data);
				var objOne=$.parseJSON(jsonOne.object);
				var count=3;
				if(objOne.imgs.length<3){
					count=objOne.imgs.length;
				}
				for(var i=0; i<count; i++){
					imagesHtml+='<div class="lineleft_photo_big"><img src="'+objOne.imgs[i].url+'" /><div class="line_mark">文字</div></div><div class="clearfix lineleft_photo_s"><div class="fl lineleft_photo_smll"><img src="'+objOne.imgs[i].url+'" /><div class="line_mark">文字</div></div><div class="fl lineleft_photo_smll"><img src="'+objOne.imgs[i].url+'" /><div class="line_mark">文字</div></div>';
					console.log(objOne.imgs[i].url);
				}
				
				$('.lineleft_photo').html(imagesHtml);
				
			}
			
		})
	}
	
		
});
*/

/*
<div class="lineleft_photo_big"><img src="'+objS[kk].viws[j].coverImageUrl+'" /><div class="line_mark">文字</div></div><div class="clearfix lineleft_photo_s"><div class="fl lineleft_photo_smll"><img src="'+objS[kk].viws[j].coverImageUrl+'" /><div class="line_mark">文字</div></div><div class="fl lineleft_photo_smll"><img src="'+objS[kk].viws[j].coverImageUrl+'" /><div class="line_mark">文字</div></div>
*/

