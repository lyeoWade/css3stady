
// 资讯内容

$(function(){
		
	var sData='{"action":"onenews","params":{"id":'+getUrlId()+'}}';
	
	$(function(){
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
				
				console.log(json);
				var jsonData=$.parseJSON(json.object);
				$('.a_title').html('<h2 class="fl">'+jsonData.title+'</h2><span class="fr">'+newdate(jsonData.updateTime)+'</span>');
				$('.a_content').html('<p>'+jsonData.content+'</p>');
				$('.active_img').html('<img src="'+jsonData.coverImageUrl+'" />');
				
				
			},
			error: function(){},
		});
	});
});



