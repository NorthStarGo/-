// 所有的ajxa在发送到服务器之前都会进行处理
$.ajaxPrefilter(function(options) {
	options.url = 'http://ajax.frontend.itheima.net' + options.url;
});
