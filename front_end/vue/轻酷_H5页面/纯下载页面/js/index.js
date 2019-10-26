$(function () {
	//判断浏览器终端类型
	var agent = navigator.userAgent;
	//Android终端
	var is_android = agent.indexOf('Android') != -1 || agent.indexOf('Adr') != -1 || agent.indexOf('Linux') != -1;
	//IOS终端
	var is_ios = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	//微信终端
	var is_wx = agent.toLowerCase().indexOf('micromessenger') != -1;

	//遮罩点击消失
	$('.tip').click(function () {
		$(this).hide();
	})

	//android下载
	$('.android').click(function () {
		//是否微信终端
		if (is_wx) {
			$('.tip').show();
		} else {
			window.location.href = 'https://shop.technologyle.com/public/upload/appfile/qingku-2.0.2.apk';
		};
	});

	//ios下载
	$('.ios').click(function () {
		//是否微信终端
		if (is_wx) {
			$('.tip').show();
		} else {
			window.location.href = 'https://apps.apple.com/cn/app/%E8%BD%BB%E9%85%B7/id1464121739';
		};
	})
})