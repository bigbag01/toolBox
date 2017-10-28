(function(){
	$('body').bootstrapMaterialDesign();
	$('#QR').click(function(){
		if(!checkContent()) return;
		var qrcode = new QRCode(document.getElementById("new_area"), {
			text: $('#content').val(),
			width: 180,
			height: 180,
			correctLevel : QRCode.CorrectLevel.H
		});
		$('#new_area').attr('title','点击下载图片');
	});
	$('#new_area').delegate('img','mouseenter',function(){
		if(!$(this).data('mouseenter')){
			wrap.call(this);
			$(this).data('mouseenter',true);
		}
		return false;
	})
	$('#remove').click(function(){
		$('#content').val('');
	})
	$('#content').click(function(){
		$('#content').select();
	})
	$('#params').click(function(){
		if(!checkContent()) return;
		var paramHtml=getAllQueryParams($('#content').val());
		$('#new_area').append(paramHtml);
	});
	$('#encode').click(function(){
		encode();
	})
	$('#decode').click(function(){
		decode();
	})
	$('#toAscii').click(function(){
		if(!checkContent()) return;
		var char=$('#content').val();
		var asciiVal=char.charCodeAt();
		var asciiStr='\\x'+asciiVal.toString(16);
		$('#new_area').append('<p>对应的ascii值为: <b>'+asciiVal+'</b></p>');
		$('#new_area').append('<p>对应的ascii字符为: <b>'+asciiStr+'</b></p>');
	})
	$('#asciiTo').click(function(){
		if(!checkContent()) return;
		var ascii=$('#content').val();
		var patt=/\\x/g;
		if(patt.test(ascii))
			ascii='0'+ascii.substring(1);
		var s=String.fromCharCode(ascii);
		$('#new_area').append('<p>对应的字符为: <b>'+s+'</b></p>');
	})
})()
// 检查是否已输入内容
function checkContent(){
	var url=$('#content').val();
	if(url==''){
		message("请先输入内容");
		return false;
	}
	else {
		$('#new_area').empty();
		$('#new_area').removeAttr('title');
		return true;
	}
}

// 提示
function message(content){
	var html="<p><i>"+content+"</i></p>";
	$('#new_area').prepend(html);
}

// 检查输入是否为合法URI
function checkUrl(str) { 
	var RegUrl = new RegExp(); 
	RegUrl.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
	if (!RegUrl.test(str)) { 
		message("请输入正确的URL");
		return false; 
	} 
	return true; 
} 
// 为图片包裹下载链接
function wrap(){
	var src=$('img').attr('src');
	$('img').wrap("<a href='"+src+"' download='二维码.png' ></a>");
}

// 获取URL中所有参数
function getAllQueryParams(url){
	if(!checkUrl(url)) return;
	var index=url.indexOf('?');
	url=url.substr(index+1);
	var pairs=url.split("&");
	if (pairs.length<=1){
	 	message("没有参数")
	 	return "";
	}
	var html="<ul class='list-group'>"
	for(var p of pairs){
		var kv=p.split("=");
		html+="<li class='list-group-item'><b>"+kv[0]+":</b><br>"+decodeURI(kv[1])+"</li>"
	}
	html+="</ul>";
	return html;
}

function encode(){
	if(!checkContent()) return;
	url=encodeURI($('#content').val());
	$('#new_area').append(url);
}

function decode(){
	if(!checkContent()) return;
	url=decodeURI($('#content').val());
	$('#new_area').append(url);
}