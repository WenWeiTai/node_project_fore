window.onload = function(){
    var usersDateBox = $('.usersDateBox');
    var navFirstLi = $('.pagination').children('li').first('li');
    var navLastLi = $('.pagination').children('li').last('li');
    console.log(navLastLi)
    //发送请求拿到所有数据
    $.get('http://localhost:3000/api/users',function(res){
        var userDatestr = '';
        var navLiStr = '';
        console.log(res)
        if(res.code === 1){

            //遍历页面显示数据
            for(var i = 0; i < res.data.length; i++){
    
                 userDatestr += 
                    `
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${res.data[i].username}</td>
                        <td>${res.data[i].nickname}</td>
                        <td>${res.data[i].phone}</td>
                        <td>${res.data[i].sex}</td>
                        <td>${res.data[i].age}</td>
                        <td>${res.data[i].isAdmin == true ? '是' : '否'}</td>
                        <td>
                        <a class="td-update" href="##">修改</a>&ensp;&ensp;<a
                            class="td-del"
                            href="##"
                            >删除</a
                        >
                        </td>
                    </tr>
                    `;
            }
            usersDateBox.html(userDatestr);
    
            //遍历分页
            for(var i = 0; i < res.totalPage; i++){
                navLiStr += 
                    `
                    <li class=${0 == i ? 'active' : ''}><a href="#">${i+1}</a></li>
                    `
            }
            navFirstLi.after(navLiStr);
            
        } else {
            alert(res.msg);
        }
    })
}