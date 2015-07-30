// JavaScript Document


// 所有商家类型

$(function(){
	
	var iNow=1;
	list(iNow);
	var Allstr='';
	function list(iNow){
		
		if(window.location.href.split('?')[1]==undefined){
			var sData='{"action":"getListBiz","params":{"pagenum":'+iNow+',"pagesize":18}}';
		}else if(!isNaN(getUrlId())){
			var sData='{"action":"getListBiz","params":{"pagenum":'+iNow+',"pagesize":18,"categoryId":"'+getUrlId()+'"}}';
		}else if(decodeURI(getUrlId2())=="西路" || decodeURI(getUrlId2())=="北城" || decodeURI(getUrlId2())=="南城"){
			var sData='{"action":"getListBiz","params":{"pagenum":'+iNow+',"pagesize":18,"region":"'+decodeURI(getUrlId2())+'"}}';
		}else if(decodeURI(getUrlId2())=="美食"){
			var sData='{"action":"getListBiz","params":{"exfE":1,"pagesize":18}}';	
		}else if(decodeURI(getUrlId2())=="酒店"){
			var sData='{"action":"getListBiz","params":{"exfE":2,"pagesize":18}}';	
		}else if(decodeURI(getUrlId2())=="其他"){
			var sData='{"action":"getListBiz","params":{"exfE":3,"pagesize":18}}';	
			
		}
		$.ajax({
			type:"POST",
			url:"http://hctour.zjtapp.com/info/api",
			data:"data="+sData,
			beforeSend: function(){
				$('.mark_bg').css({"display":"block"});
				$('.mark_bg').animate({opacity:0.9});
			},
			success: function(data){
				$('.mark_bg').animate({opacity:0},function(){
					$('.mark_bg').css({"display":"none"});
				});
				
				var json=$.parseJSON(data);
				if(json.responseCode==0){
					$('.addmore a').html('暂无数据');
					$('.food-allNum').html('共0条数据');
				}else if(json.responseCode==1){
					
					var objdata=$.parseJSON(json.objectList);
					var a=$.parseJSON(json.object);
					var All=Math.ceil(a.count/18);
					
					console.log(a.count);
					
					$('.food-allNum').html('共'+objdata.length+'条数据');
					
					var aLlBiz='';
					$('.foot-list-x').empty();
					for(var i=0; i<objdata.length; i++){
						
						if(objdata[i].tel==''){objdata[i].tel='暂无'}
						
						aLlBiz+='<dl class="clearfix"><dt><a href="hoteldetail.html?id='+objdata[i].id+'"><img src="'+objdata[i].coverImageUrl+'" /></a></dt><dd class="food-userName"><a href="hoteldetail.html?id='+objdata[i].id+'" title="'+objdata[i].name+'">'+objdata[i].name+'</a></dd><dd class="food-tel"><span title="'+objdata[i].tel+'">'+objdata[i].tel+'</span></dd><dd class="food-address"><span title="'+objdata[i].address+'">'+objdata[i].address+'</span></dd><dd class="food-order"><a href="javascript:;">预订</a></dd><em class="food-hot"></em></dl>';
					}
					Allstr+=aLlBiz;
					$('.foot-list-x').html(Allstr);
					$('.addmore a').html('点击加载更多');
					
					$('.addmore a').on("click",function(){
						$('.addmore a').html('加载中...请稍后');
						 if(iNow>=All){
							 $('.addmore a').html('没有更多了！');
							 return false;
						  }else{
							iNow++;  
						  };
						  
						  list(iNow);
					});
				}
				
				
			},
			error: function(){
				$('.mark_bg').css({"display":"block"});
				$('.mark_bg').animate({opacity:0.9});
				$('.mark_bg_child').html('数据出错,马上返回！');
				history.go(-1);	
			}
		});
		
	}
});

// 获取类型

$(function(){
	var sData='{"action":"getalltype","params":{"targerObjectName":"biz"}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sData,
		success: function(data){
			var json=$.parseJSON(data);
			var objdata=$.parseJSON(json.objectList);
			//console.log(objdata);
			var typehtml='';
			for(var i=0; i<objdata.length; i++){
				typehtml+='<a class="2" href="food.html?id='+objdata[i].id+'">'+objdata[i].title+'</a>';
			}
			$('.typeJs').html(typehtml);
		}
	});
});

/*
$(function(){
	var sData='{"action":"getListBiz","params":{"area":"文峰古街"}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sData,
		success: function(data){
			var json=$.parseJSON(data);
			var objdata=$.parseJSON(json.objectList);
			//console.log(objdata);
	
		}
	})
});


*/
/*
	
	$(function(){
		var now_page=window.location.hash||'#1'; //获取hash  最开始默认第一个
		now_page=parseInt(now_page.substring(1));
		
	
		var oDiv=$("#pages");
		  $.ajax({
				type:"POST",
				url:"phpdata/get_arclist.php",
				success:function(data){
					var str=$.parseJSON(data);
					
					var num=Math.ceil(str.result.length/5);  //取页码数根据每一页分多少条
					
					
					getpage(now_page);
					
					function getpage(now_page){
						
						//设置class 样式
						$('.page-list a').removeClass('active');
						$('.page-list a').eq(now_page-1).addClass('active');
						
						
					
						
						var n=(now_page-1)*5; // 设置初始值 变化值
						// now_page 是当前页码  1开始的  n用于循环要从0开始 所以要-1
						$('.content-box-warp').html(' '); //清空
						//alert()
						var html='';
						
						var number=5; // 每一页显示的条数
						
						if((str.result.length-n)<5){ //如果总条数减去截止条数小于5 那么不足了
							//alert(number+'---'+n)
							number=str.result.length%5;
						}; //处理多余的不足5条的
						
						//1 2 3
						//5 10 15
						for(var i=n; i<n+number; i++){
							
							var obj=eval('('+str.result[i]+')');
							
							html+='<section class="content-list"><h2><a href="">'+obj.title+'</a></h2><div class="descripion"><p class="des">'+obj.des+'</p><p class="des-more"><a href="#">查看更多</a></p><p><img src="'+obj.img+'"/></p></div></section>';					
						};
						$('.content-box-warp').html(html);
						
					};
					page(oDiv,now_page,num)
					
					function page(oDiv,nowNum,allNum){
						
						if(nowNum>=4 && allNum>=6){
							var oA=document.createElement('a');
							oA.href="#1";
							oA.innerHTML="首页";
							oDiv.append(oA);	
						}
						
						if(nowNum>=2){
							var oA=document.createElement('a');
							oA.href="#"+(nowNum-1);
							oA.innerHTML="上一页";
							oDiv.append(oA);	
						}
						
						
						if(allNum<=5){
							for(var i=1; i<=allNum; i++){
								var aA=document.createElement('a');
								if(nowNum==i){
									aA.innerHTML= i ;
								}else{
									aA.innerHTML='['+ i +']';
								}
								aA.href="#"+i;
								oDiv.append(aA);	
							}	
						}else{
							for(var i=1; i<=5; i++){
								var aA=document.createElement('a');
								
								if(nowNum==1 || nowNum==2){
									
									aA.href="#"+i;
									if(nowNum==i){
										aA.innerHTML=i;
									}
									else{
										aA.innerHTML='['+ i +']';
									}
									
								}else if((allNum - nowNum)==0 || (allNum-nowNum)==1){// 倒数第一和第二 特殊处理
									
									
									aA.href="#"+ (allNum - 5 + i);
									
									if( (allNum - nowNum) ==0 && i==5){ //倒数第一项
										
										aA.innerHTML= (allNum - 5 + i);
										
									}else if((allNum - nowNum) ==1 && i==4){ //倒数第二项
										
										aA.innerHTML= (allNum - 5 + i);;
										
									}else{
										aA.innerHTML='['+ (allNum - 5 + i) +']';
									}
									
									
									
								}else{
									
									if(i==3){
										aA.innerHTML= ( nowNum-3+i ) ;
									}else{
										aA.innerHTML='['+ ( nowNum-3+i ) +']';
									}
									
									aA.href="#"+(nowNum-3+i);
									
								}
								//alert(typeof aA)
								oDiv.append(aA);	
							}	
						}
						if((allNum-nowNum)>=1){
							var oA=document.createElement('a');
							oA.href="#"+(nowNum+1);
							oA.innerHTML="下一页";
							oDiv.append(oA);
						}
						
						if((allNum-nowNum)>=3){
							var oA=document.createElement('a');
							oA.href="#"+allNum;
							oA.innerHTML="尾页";
							oDiv.append(oA);
						}
						
						var oBtn=$("#pages a")//oDiv.getElementsByTagName('a');
					
						for(var i=0; i<oBtn.length; i++){
							oBtn[i].onclick=function(){
								var Num=parseInt(this.getAttribute('href').substring(1));
								oDiv.html("");
								
								now_page=Num;
								getpage(now_page);
								
								page(oDiv,Num,num);
								
							}
						};
					}	
				}
				
			});
	});
	*/