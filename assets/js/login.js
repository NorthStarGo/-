$(function() {
	//给去注册账号添加点击事件，点击的时候 登录容器隐藏 注册容器显示
	$('#link_reg').on('click', function() {
		$('.login-box').hide();
		$('.reg-box').show();
	});
	//给去登录添加点击
	$('#link_login').on('click', function() {
		$('.login-box').show();
		$('.reg-box').hide();
	});

	//自定义校验规则
	// 语法有二种写法
	layui.form.verify({
		//我们既支持上述函数式的方式，也支持下述数组的形式
		//数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
		//  \s一个空格 \S非空格
		pwd: [ /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格123' ],
		repwd: function(value) {
			if ($('.reg-box [name="password"]').val() != value) {
				return '确认密码不正确, 请重新输入!';
			}
		}
	});

	//监听注册表单的提交事件

	$('#form_reg').on('submit', function(e) {
		//1.阻止默认提交 行为
		e.preventDefault();
		console.log(123);
		var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() };
		$.post('/api/reguser', data, function(res) {
			if (res.status !== 0) {
				return leyer.msg('很抱歉出现了未知情况,注册失败');
			} else {
				layer.msg('注册成功,请登录!');
				$('#link_login').click();
			}
		});
	});

	$('#form_login').submit(function(e) {
		//阻止跳转行为
		e.preventDefault();
		//请求接口数据
		$.ajax({
			url: '/api/login',
			type: 'post',
			//serialize() 用于序列化表单值
			data: $(this).serialize(),
			success: function(res) {
				if (res.status != 0) return layer.msg('登录失败');
				//将获取到的token 凭证(令牌存储到本地存储中)
				localStorage.setItem('token', res.token);
				location.href = '/index.html';
			}
		});
	});
});
