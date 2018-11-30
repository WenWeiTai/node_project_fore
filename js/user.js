window.onload = function(){
    obj = {
        pagination :  $(".pagination"),
        seachInput : $(".searchInput"),
        seachBtn : $(".searchBtn"),
        usersDateBox : $(".usersDateBox"),
        navFirstLi : $(".pagination").children("li").first("li"),
    }
    new OperationDate(obj);
    

}

class OperationDate {
    constructor(obj){
        this.pagination = obj.pagination;
        this.seachInput = obj.seachInput;
        this.seachBtn = obj.seachBtn;
        this.usersDateBox = obj.usersDateBox;
        this.navFirstLi = obj.navFirstLi;
        this.init()
    }

    init(){
        this.getAjax();
    }

    getAjax () {
        if(!this.pagination.val()){
            // console.log(1)
            var _this = this;
            $.get("http://localhost:3000/api/users", function (res) {
                if (res.code == 1) {
                    _this.getUserDate(res);
                   
                    _this.getNavLiData(res);
                } else {
                    alert(res.msg);
                }
            });
        }
        //搜索  =============== 没做分页
        var _this = this;
        this.seachBtn.click(function(){
            $.get('http://localhost:3000/api/search',{nickname : _this.seachInput.val()},function(res){
                _this.getUserDate(res);
            })
        })
        
    }
    
    //用户数据渲染
    getUserDate(res){
        var userDatestr = "";
        this.usersDateBox.html('');
        for (var i = 0; i < res.data.length; i++) {
            userDatestr += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${res.data[i].username}</td>
                <td>${res.data[i].nickname}</td>
                <td>${res.data[i].phone}</td>
                <td>${res.data[i].sex}</td>
                <td>${res.data[i].age}</td>
                <td>${res.data[i].isAdmin == true ? "是" : "否"}</td>
                <td>
                <a class="td-update" href="##">修改</a>&ensp;&ensp;<a class="${res.data[i].isAdmin  ? 'del_hide' : 'td-del'}" href="javascript:;">删除</a>
                </td>
            </tr>
            `;
        }
        this.usersDateBox.html(userDatestr);
        //渲染时隐藏管理员删除按钮
        $('.del_hide').hide()
        //删除功能
        this.delUser()
    }

    //分页渲染
    getNavLiData(res){
        var navLiStr = "";
        this.liS =  $('.firstLi').siblings('li').not('.lastLi')
        if(this.liS.length > 0){
            this.liS.remove();
        }
		for (var i = 0; i < res.totalPage; i++) {
            navLiStr += `
            <li class="${0 == i ? "active" : ''}"><a href="#">${i + 1}</a></li>
            `
        }
        this.navFirstLi.after(navLiStr); 
        this.clickNavLi();
    }

    //分页操作
    clickNavLi(){
        //获取渲染后分页(包括前后)的li数量
        var navLiS = $(".pagination li")
		//保存每次点击的下标
        var clickIndex = 1;
        var _this = this;
		this.pagination.on('click','li',function(){
			//获取点击的下标
			var index = $(this).index()
			//前
			if(index < 1){
				clickIndex = clickIndex - 1 < 1 ? 1 : clickIndex - 1;
				_this.clickNavAjax(navLiS,clickIndex);
			//后
			}else if(index == navLiS.size() - 1){
				clickIndex = clickIndex + 1 > navLiS.size() - 2 ? navLiS.size() - 2 : clickIndex + 1;
				_this.clickNavAjax(navLiS,clickIndex);
				
			//数字页
			}else{
				clickIndex = index;
				_this.clickNavAjax(navLiS,clickIndex);
			}
		})
    }

    //分页数据请求
    clickNavAjax(navLiS,clickIndex){
        var _this = this;
        $.get("http://localhost:3000/api/users?page="+ clickIndex +"&pageSize=5",function(res){
            _this.getUserDate(res)
        });
        navLiS.eq(clickIndex).addClass('active').siblings().removeClass('active')
    }

    //删除
    delUser(){
        var _this = this;
		this.usersDateBox.on('click','.td-del',function(){
            var username = $(this).parent().parent().children().eq(1).html();
			$.get('http://localhost:3000/api/delete',{user : username},function(res){
				if(res.code == 1){
                    // alert(res.msg);
                    //重新渲染数据
                    _this.getAjax(); 
                    // location.reload();
				}else{
					alert(res.msg);
				}
			})
		})
    }
}
