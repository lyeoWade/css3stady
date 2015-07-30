// JavaScript Document

$(function(){	
	var sData='{"action":"getonestategy","params":{"id":'+getUrlId()+'}}';
	$.ajax({
		type:"post",
		url:"http://hctour.zjtapp.com/info/api", 
		data:"data="+sData,
		success: function(data){
			//console.log(data);	
			var json=$.parseJSON(data);
			var oData=$.parseJSON(json.object);
			var oDate=new Date();
			oDate.setTime(oData.updateTime);
			var sDate=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());
			$('.travel_title_w').html('<h2 class="travel_title fl" tag="'+oData.id+'">'+oData.title+'</h2><span class="fr">发表于：&nbsp;'+sDate+'</span>');
			$('.view_person').html('<span class="view_num">'+oData.counts.readCount+'</span><span class="conment_num">'+oData.counts.commentCount+'</span>');
			//console.log(oData.id);	
			
			
			
			var sHtml='';
			for(var i=0; i<oData.images.length; i++){
				sHtml+='<p><img src="'+oData.images[i].url+'" /></p><p>'+oData.images[i].title+'</p>';
			}
			sHtml+='<p>'+oData.note+'</p>';
			$('.travel_content_warp').html(sHtml);
			
			var oId=oDate.id;
			
			getConments('.travel_title');
			
			
			
			
		},
		onerror:function(data){
			console.log(data)
		}
	});
	
	
	Contents('.travel_title')
	
});



// 获取评论
function getConments(str){
	var oTag=$(str).attr('tag');
	//alert(oTag);
	var sDataPl='{"action":"commentlist","params":{"targerObjectName":"strategy","targerObjectId":'+oTag+'}}';
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
		
		var sDate='{"action":"commentadd","params":{"content":"'+$('.text_box').val()+'","targerObjectId":'+oTag+',"targerObjectName":"strategy","userId":917}}';
		
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





//请求这里的评论的id也是传过来的id
/*$(function(){
	$.ajax({
		type:"POST",
		url:"data/getdata.php",
		data:"act=travelstrategy",
		success: function(data){
			var json=$.parseJSON(data);
			var oData=$.parseJSON(json.objectList);
			
			//console.log(oData)	
			var sHtml='';
			for(var i=0; i<oData.length; i++){
				sHtml+='<li class="clearfix"><div class="Comment_user_box fl"><p><a href=""><img src="'+oData[i].userOtherAvatar+'"/></a></p><p class="username"><a href="#">'+oData[i].userOtherName+'</a></p></div><div class="Comment_content fl"><p>'+oData[i].content+'</p><p class="push_time">2015-12-21</p></div></li>';
			}
			$('.Comment_box_warp ul').html(sHtml);
			
		}	
	});
		
});
*/

