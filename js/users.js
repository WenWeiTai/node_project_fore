window.onload = function () {
	var pagination = $(".pagination");
	var navFirstLi = $(".pagination").children("li").first("li");
	var navLastLi = $(".pagination").children("li").last("li");

	//发送请求拿到所有数据
	var pro = new Promise(function (resolve, reject) {
		$.get("http://localhost:3000/api/users", function (res) {
			if (res.code == 1) {
				resolve(res);
			} else {
				reject(res.msg);
			}
		});
		return pro;
	});

	pro.then(
		function (res) {
			//遍历页面显示数据
			writeDate(res);
			//遍历分页
			var navLiStr = "";
			for (var i = 0; i < res.totalPage; i++) {
				navLiStr += `
				   <li class=${0 == i ? "active" : ""}><a href="#">${i + 1}</a></li>
				   `;
			}
			navFirstLi.after(navLiStr); 
			// return res;
		},
		function (rej) {
			alert(rej);
		}
	).then(
		function(){
			//获取渲染后分页(包括前后)的li数量
			var navLiS = $(".pagination li")
			//保存每次点击的下标
			var clickIndex = 1;
			pagination.on('click','li',function(){
				//获取点击的下标
				var index = $(this).index()
				//前
				if(index < 1){
					clickIndex = clickIndex - 1 < 1 ? 1 : clickIndex - 1;
					$.get("http://localhost:3000/api/users?page="+ clickIndex +"&pageSize=5",function(res){
						writeDate(res);
					});
					navLiS.eq(clickIndex).addClass('active').siblings().removeClass()
				//后
				}else if(index == navLiS.size() - 1){
					clickIndex = clickIndex + 1 > navLiS.size() - 2 ? navLiS.size() - 2 : clickIndex + 1;
					$.get("http://localhost:3000/api/users?page="+ clickIndex +"&pageSize=5",function(res){
						writeDate(res);
					});
					navLiS.eq(clickIndex).addClass('active').siblings().removeClass()
					
				//其他页数
				}else{
					clickIndex = index;
					$.get("http://localhost:3000/api/users?page="+ clickIndex +"&pageSize=5",function(res){
						writeDate(res);
					});
					$(this).addClass('active').siblings().removeClass();
				}

			})
		}
	)
};

//遍历页面显示数据
function writeDate(res){
	var usersDateBox = $(".usersDateBox");
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
			   <a class="td-update" href="##">修改</a>&ensp;&ensp;<a class="td-del" href="##">删除</a>
			   </td>
		   </tr>
		   `;
	}
	usersDateBox.html(userDatestr);
}
