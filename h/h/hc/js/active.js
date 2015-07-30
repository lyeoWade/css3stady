// JavaScript Document



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
				
				rqzgHtml+=' <li class="clearfix"><a href="active.html?id='+sjson[i].id+'" class="fl">'+sjson[i].title+'</a><span class="fr">'+newdate(sjson[i].updateTime)+'</span></li>';
			}
			$('.huodonging2').html(rqzgHtml);
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
				
				//rqzgHtml+=' <a href="active.html?id='+sjson[i].id+'">'+sjson[i].title+'</a>';
				rqzgHtml+=' <li class="clearfix"><a href="active.html?id='+sjson[i].id+'" class="fl">'+sjson[i].title+'</a><span class="fr">'+newdate(sjson[i].updateTime)+'</span></li>';
			}
			$('.huodongend2').html(rqzgHtml);
		}
	})
});


// 获取一条活动

$(function(){

	var oGlData='{"action":"getOneActivity","params":{"id":'+getUrlId()+'}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+oGlData,
		beforeSend: function(data){
			$('.mark_bg').css({"display":"block"});
			$('.mark_bg').animate({opacity:0.9});
		},
		success: function(data){
			$('.mark_bg').animate({opacity:0},function(){
					$('.mark_bg').css({"display":"none"});
				});
			var json=$.parseJSON(data);
			var sjson=$.parseJSON(json.object);	
			
			$('.a_title ').html('<h2 class="fl">'+sjson.title+'</h2><span class="fr">'+newdate(sjson.updateTime)+'</span>');
			//console.log(sjson.exfA.split('?')[1]);
			//console.log('http://'+sjson.exfA.split('?')[1].substring(5));
			var oUrlActive='http://'+sjson.exfA.split('?')[1].substring(5);
			$('.enlist a').attr({"href":oUrlActive});
			$('.active_img').html('<img src="'+sjson.coverImgUrl+'" />');
			$('.a_content').html(sjson.note);
		}
	})
});