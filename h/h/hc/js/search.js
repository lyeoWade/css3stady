// JavaScript Document
/*window.onload=function(){
	
	var oSe=document.getElementById('s1');
	var oBox=document.getElementById('box');
	var oSpan=oBox.children[0];
	var oUl=oBox.children[1];
	var aLi=oUl.children;
	var b=true;
	oSpan.onclick=function()
	{
		if(b)
		{
			oUl.style.display='block';
			b=false;
		}	
		else
		{
			oUl.style.display='none';
			b=true;
		};
		
		return false;
	};

	oSpan.onmousedown=function()
	{
		return false;
	};
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			oSpan.innerHTML=this.innerHTML;
			oUl.style.display='none';
			b=true;
			oSe.selectedIndex=this.index;
		};	
	}
};
*/



$(function(){
	$('.search_list_box').css({"display":"none"});
	var oSe=$('#s1');
	var oBox=$('#box');
	var oSpan=$('#box span');
	var oUl=$('#box ul');
	var aLi=$('#box ul li');
	var b=true;
	
	oSpan.on("click",function(){
		if(b)
		{
			oUl.css({"display":"block"});
			b=false;
		}	
		else
		{
			oUl.css({"display":"none"});
			b=true;
		};
		
		return false;
	});
	
	var oVal=$('#box span').html();
	
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi.eq(i).on('click',function(){
			oSpan.html(this.innerHTML)
			oUl.css({"display":"none"});
			b=true;
			var oVal=$('#box span').html();
			se(oVal);
		});
	}
	se(oVal);
	function se(oVal){
		
		var oUrl='';
		
		$('.searchBtn').on("click",function(){
		
			$('.search_num').css({"display":"block"});
			$('.search_list_box .search_classify').css({"display":"block"}).html('加载中...');
			
			var oText=$('.serach_text').val();
			
			
			switch(oVal){
				case '景点':
				var sData='{"action":"getviewslist","params":{"pagenum":1,"name":"'+oText+'","pagesize":20}}';
				oUrl='destination.html';
				break;
				case '美食':
				var sData='{"action":"getListBiz","params":{"exfE":1,"name":"'+oText+'","pagesize":20}}';
				oUrl='hoteldetail.html';
				break;
				case '商家':
				var sData='{"action":"getListBiz","params":{"pagesize":20,"name":"'+oText+'"}}';
				oUrl='hoteldetail.html';
				break;
				case '线路':
				var sData='{"action":"getlistlink","params":{"pagenum":1,"name":"'+oText+'","pagesize":20}}';
				oUrl='lineDetail.html';
				//var name='title';
				break;
			}
			
			$.ajax({
				type:"POST",
				url:"http://hctour.zjtapp.com/info/api",
				data:"data="+sData,
				success: function(data){
					var json=$.parseJSON(data);
					console.log(json);
					var jsonc=$.parseJSON(json.object);
					$('.search_num span').html('共有'+jsonc.count+'条数据');
					if(json.responseCode==0){
						$('.search_list_box').css({"display":"none"});
						$('.search_none').css({"display":"block"});
						$('.search_num span').html('共有0条数据');
					}else if(json.responseCode==1){
						$('.search_list_box').css({"display":"block"});
						$('.search_none').css({"display":"none"});
						var jsonData=$.parseJSON(json.objectList);
						var str='';
						console.log(jsonData);
						//var oName;
						
						//if(jsonData[i].name==undefined){
						//	oName=jsonData[i].title;
						//}else if(jsonData[i].title==undefined){
						//	oName=jsonData[i].name;
						//}
						
						
						
						for(var i=0; i<jsonData.length; i++){
							
							if(jsonData[i].name)
							{
								var oName=jsonData[i].name;
							}else{
								var oName=jsonData[i].title;
							}
							str+='<dl class="clearfix"><dt><a href="'+oUrl+'?id='+jsonData[i].id+'"><img src="'+jsonData[i].coverImageUrl+'" /></a></dt><dd class="title"><a href="'+oUrl+'?id='+jsonData[i].id+'">'+oName+'</a></dd><dd class="desc">'+oName+'</dd></dl>';
						}
						$('.search_parent .search_classify').html(str);
						
					}
				},
				error:function(){
					$('.search_parent').html('请求错误！')	;
					$('.search_num span').html('共有0条数据');	
				}
			});
			
				
		});
	}
});


$(function(){
	var sData='{"action":"getviewslist","params":{"pagenum":1,"pagesize":20}}';
	$.ajax({
		type:"POST",
		url:"http://hctour.zjtapp.com/info/api",
		data:"data="+sData,
		success: function(data){
			var json=$.parseJSON(data);
			if(json.responseCode==0){
				$('.search_parent .search_classify').html('无数据')	;
				$('.search_num span').html('共有0条数据');
			}else if(json.responseCode==1){
				var jsonData=$.parseJSON(json.objectList);
				
				var str='';
				console.log(jsonData);
				for(var i=0; i<jsonData.length; i++){
					str+='<dl class="clearfix"><dt><a href="destination.html?id='+jsonData[i].id+'"><img src="'+jsonData[i].coverImageUrl+'" alt="" /></a></dt><dd class="search-title"><a href="destination.html?id='+jsonData[i].id+'">'+jsonData[i].name+'</a></dd><dd class="serch-desc">'+jsonData[i].name+'</dd></dl>';
				}
				$('.hot-search-parent').html(str);		
			}
		}
	});
});





