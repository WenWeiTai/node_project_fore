$(function(){
    operationDate.init();
})


var operationDate = (function(){
    //分页ul
    var pageUl =  $(".pagination");
    //用户数据tbody
    var phoneDateTbody = $(".phoneDate");
    //分页第一个li
    var navFirstLi = $(".pagination").children("li").first("li"); 
    //添加手机按钮
    var addPhoneBtn = $('.addPhoneBtn');
    //确定按钮
    var sureBtn = $('.sureBtn');
    //当前页
    var currentPage = 1;
    //数据id
    var _id = null;
    //一页显示数据数量
    var pageSize = 3;

    var navLiS = null;

    return {
        //初始化
        init(){
            this.event();
            this.getDate(currentPage,pageSize)
        },
        //获取数据
        getDate(currentPage,pageSize){
            var _this = this;
            //请求数据
            $.get("http://localhost:3000/api/brandDate?page="+ currentPage + "&pageSize=" + pageSize, function (res) {
                if (res.code == 1) {
                    //获取数据后渲染用户数据和分页
                    _this.setDate(res)
                } else {
                    alert(res.msg);
                }
            });
        },

        //渲染数据
        setDate(res){
            //用户数据模版
            var userDatestr = "";
            //分页数据模版
            var navLiStr = "";
            
            //====用户数据渲染
            //渲染用户数据
            for (var i = 0; i < res.data.length; i++) {
                userDatestr += `
                <tr _id=${res.data[i]._id}>
                    <th class="setTDLineH_brand" scope="row">${i + 1}</th>
                    <td><img src="${res.data[i].imgSrc}" alt="iphone" /></td>
                    <td class="setTDLineH_brand">${res.data[i].brand}</td>
                    <td class="setTDLineH_brand">
                        <a class="td-update" href="##">修改</a>&ensp;&ensp;<a
                        class="td-del"
                        href="##"
                        >删除</a
                        >
                    </td>
                </tr>
                `;
            }
            phoneDateTbody.html(userDatestr);
            //管理员没有删除按钮
            $('.del_hide').remove();

            //====分页数据渲染
            //获取分页
            var liS =  $('.firstLi').siblings('li').not('.lastLi');
            //每次重新渲染前清空
            if(liS.length > 0){
                liS.remove();
            }
            //渲染分页
            for (var i = 0; i < res.totalPage; i++) {
                navLiStr += `
                <li class="${currentPage == i + 1 ? "active" : ''}"><a href="#">${i + 1}</a></li>
                `
            }
            //在第一个li后面插入
            navFirstLi.after(navLiStr);
            //获取渲染后分页(包括前后)的li数量
            navLiS = $(".pagination li")
        },

        //事件
        event(){
            var _this = this;

            //分页点击功能
            pageUl.on('click','li',function(){
                //获取点击的下标
                var index = $(this).index()
                //前
                if(index == 0){
                    currentPage = currentPage - 1 < 1 ? 1 : currentPage - 1
                //后
                }else if(index == navLiS.size() - 1){
                    currentPage = currentPage + 1 > navLiS.size() - 2 ? navLiS.size() - 2 : currentPage + 1
                //数字页
                }else{
                    currentPage = index
                }
                //渲染当前页数据
                _this.getDate(currentPage,pageSize)
            })

            //删除
            phoneDateTbody.on('click','.td-del',function(){
                //获取id
                _id = $(this).parent().parent().attr('_id');
                //获取当前页
                currentPage = pageUl.find('.active').index();
                $.get('http://localhost:3000/api/brandDelete',{_id : _id},function(res){
                    if(res.code == 1){
                        alert(res.msg);
                        //重新渲染数据
                        _this.getDate(currentPage,pageSize)
                    }else{
                        alert(res.msg);
                    }
                })
            })

            //添加品牌
            sureBtn.click(function(e){
                e.preventDefault();
                //拿到所有值
                var pBrandVal = $('.pBrand').val();
                var pFile = document.getElementById('pFile').files[0];

                if(pBrandVal && pFile){
                    var obj = new FormData();
                    obj.append('imgFile',pFile);
                    obj.append('pBrand',pBrandVal);
    
                    $.ajax({
                        type : 'post',
                        url : 'http://localhost:3000/api/addbrand',
                        data : obj,
                        contentType : false,
                        processData : false,
                        success : function(res){
                            if(res.code == 1){
                                $('.cancelBtn').click();
                                alert('添加手机成功');
                                _this.getDate(currentPage,pageSize)
                            }
                        }
                    })
                }
            })
        }
    }
})()
