$(function() {
	//锚点跳转滑动效果  
	$('a[href*=#],area[href*=#]').click(function() {
		console.log(this.pathname)
		if(location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
						scrollTop: targetOffset
					},
					1000);
				return false;
			}
		}
	});
})

//@导航动画
//@导航动画
$(function() {
	$('#phone_show').click(function() {
		$('.left_warp').css({
			"right": "0px"
		});
		$('.zz').fadeIn();
	});
	$('.zz').click(function() {
		$('.left_warp').css({
			"right": "-210px"
		});
		$('.zz').fadeOut();
	});
});

//封装的tab使用
function tab_click(click, tab) {
	$(tab).eq(0).show();
	$(click).click(function() {
		$(this).addClass('on').siblings().removeClass('on');
		$(tab).eq($(this).index()).fadeIn().siblings().hide();
	});
}

//封装验证码倒计时
//nub = 秒，obj = 对象dome;
function yzm(nub, obj) {
	var nu = nub;
	var s = setInterval(function() {
		nu--;
		$(obj).val('剩余' + nu + '秒');
		$(obj).attr("disabled", "disabled"); //使按钮不能被点击
		if(nu < 0) {
			$(obj).val('发送手机验证码');
			clearInterval(s);
			nu = obj;
			$(obj).removeAttr("disabled"); //使按钮能够被点击 
			return;
		}

	}, 1000);
}