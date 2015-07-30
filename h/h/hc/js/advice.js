


var check={
	email:/^[a-z0-9][\w\.]*@[a-z0-9\-]+(\.[a-z]{2,4}){1,2}$/i,
	phone:/^1[3|4|5|8][0-9]\d{8}$/
};



$(function(){
	
	c('#email');
	function c(id){
		var obj=$(id);
		obj.blur(function(){checkfn(obj);});
	};
	
	
	function checkfn(obj){
		var oTag=obj.attr("tag");
		var oTip=obj.next('span');
		if(oTag=="邮箱"){
			var re=check['email'].test(obj.val());
		}
		if(re){
			obj.removeClass('error').addClass('success');
			oTip.removeClass('error').addClass('success').html("输入正确");
			return true;
		}else{
			obj.removeClass('success').addClass('error');
			oTip.removeClass('success').addClass('error').html("请输入正确"+oTag);
			return false;
		}	
	}
	
	$('.advice_btn').on("click",function(){
		var area=$('.textarea');
		var e=$('#email');
		var p=$('#phone');
		var n=0;
		var timer=null;
		if(area.val()==''){
			timer=setInterval(function(){
				if(n%2==1){
					area.css({background:"#36c1e5"});
				}else{
					area.css({background:"#fff"});
				}
				n++;
				if(n>=5){
					clearInterval(timer);
					area.val("请您填写内容！");
				}
			},70);
			return false;
		}
		if(checkfn(e)==true){
			var sData='{"action":"addFeedback","datetime":1433343116918,"params":{"source":"web","categoryId":80,"content":"'+area.val()+'","email":"'+e.val()+'","source":"ios","tel":"'+p.val()+'"}}'
			$.ajax({
				type:"POST",
				url:"http://hctour.zjtapp.com/info/api",
				data:"data="+sData,
				success: function(data){
					var json=$.parseJSON(data);
					if(json.responseCode==1){
						alert('提交成功');
					}else{
						alert('responseCode='+json.responseCode+'--->');
					}
				},
				error:function(){}
			});
				
		}
	});
	
	
	
});











