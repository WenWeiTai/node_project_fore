//获取localStorage数据
var nickname = localStorage.getItem('nickname');
var isAdmin = localStorage.getItem('isAdmin');
var isLogin = $('.h-right').find('p');
var quitBtn = $('.quitBtn');
var adminShow = $('.adminShow')

//如果localStorage不存在用户,直接跳到登录页
if(!nickname){
    location.href = '../page/login.html';
}else{
    if(JSON.parse(isAdmin) === false){
        isLogin.html(`欢迎您 - ${nickname}`);
        adminShow.hide();
    }else{
        isLogin.html(`欢迎您 - ${nickname}(管理员)`);
    }
}

//退出跳回登录页,清空localStorage
quitBtn.click(function(){
    localStorage.clear();
    location.href = '../page/login.html';
})