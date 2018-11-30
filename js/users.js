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
		this.currentPage = 2
        this.init()
    }

    init(){
		this.getAjax('http://localhost:3000/api/users');
		//删除功能
		this.delUser()
    }

    getAjax (url) {
		// this.currentPage = this.currentPage || 2
        if(!this.pagination.val()){
            var _this = this;
            $.get(url + "?page=" + _this.currentPage +"&pageSize=5", function (res) {
                if (res.code == 1) {
					_this.getUserDate(res)
                } else {
                    alert(res.msg);
                }
            });
        }
    }
    
    //数据渲染
    getUserDate(res){
		var userDatestr = "";
		var navLiStr = "";
		//清空页面
		this.usersDateBox.html('');
		this.liS =  $('.firstLi').siblings('li').not('.lastLi')
        if(this.liS.length > 0){
            this.liS.remove();
		}
		
		//用户数据
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
		
        //分页数据
		for (var i = 0; i < res.totalPage; i++) {
            navLiStr += `
            <li class="${0 == i ? "active" : ''}"><a href="#">${i + 1}</a></li>
            `
        }
        this.navFirstLi.after(navLiStr); 
        //渲染时隐藏管理员删除按钮
        $('.del_hide').hide();
		

		//点击分页
		$(".pagination li")
		//分页高亮
		$(".pagination li").eq(this.currentPage).addClass('active').siblings().removeClass('active')
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
					_this.currentPage = $('.active').index();
                    _this.getAjax('http://localhost:3000/api/users',_this.currentPage); 
                    // location.reload();
				}else{
					alert(res.msg);
				}
			})
		})
    }
}
