$('.addPhoneBtn').click(function(){
    $('.masking').fadeIn(300);
    $('.addItem_box').fadeIn(300);
})

$('.cancelBtn').click(function(){
    $('.masking').fadeOut(300);
    $('.addItem_box').fadeOut(300);
})



/* $(function(){
    var common = {
        pagination :  $(".pagination"),
        seachInput : $(".searchInput"),
        seachBtn : $(".searchBtn"),
        usersDateBox : $(".usersDateBox"),
        navFirstLi : $(".pagination").children("li").first("li"),
        presentPage : 1,
        //请求数据
        getAjax (reqUrl,presentPage) {
            $.get(reqUrl + '?page=' + presentPage +"&pageSize=5", function (res) {
                getUserDate(res)
            });
        },

        //数据渲染
        getUserDate(res){
            var userDatestr = "";
            usersDateBox.html('');
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
            usersDateBox.html(userDatestr);
            //渲染时隐藏管理员删除按钮
            $('.del_hide').hide()
            //删除功能
            this.delUser()
        }
    }
}) */