$(function () {
    var username = $('input[name=username]');
    var password = $('input[name=password]');
    var valReg = /^\S/;
    $('.btn').click(function () {
        //判断用户名密码不为空
        if (valReg.test(username.val()) && valReg.test(password.val())) {
            $.post('http://localhost:3000/api/login', {
                username: username.val(),
                password: password.val()
            }, function (res) {
                // console.log(res);
                //1、登录成功设置localStorage(两个值：nickname用于登录后用户显示，isAdmin用于判断是否管理员)
                if (res.code === 1) {
                    var isAdmin = res.data.isAdmin;
                    var nickname = res.data.nickname;
                    localStorage.isAdmin = isAdmin;
                    localStorage.nickname = nickname;
                    //2、跳转到首页
                    location.href = './index.html';
                } else {
                    alert(res.msg);
                }
            })
        } else {
            alert('账号或密码不能为空')
        }
    })
})