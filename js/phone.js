window.onload = function(){
    obj = {
        pagination :  $(".pagination"),
        seachInput : $(".searchInput"),
        seachBtn : $(".searchBtn"),
        usersDateBox : $(".usersDateBox"),
        navFirstLi : $(".pagination").children("li").first("li"),
        addPhoneBtn : $('.addPhoneBtn'),
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
        this.phoneDate = $('.phoneDate');
        this.addPhoneBtn = obj.addPhoneBtn;
        this.init()
    }

    init(){
        this.getAjax();
        this.delUser();
        this.addPhone();
    }


    getAjax () {
        var _this = this;
        $.get("http://localhost:3000/api/phoneDate", function (res) {
            if (res.code == 1) {
                _this.getUserDate(res);
                _this.getNavLiData(res);
            } else {
                alert(res.msg);
            }
        });
    }
    
    //用户数据渲染
    getUserDate(res){
        var userDatestr = "";
        this.phoneDate.html('');
        console.log(res)
        for (var i = 0; i < res.data.length; i++) {
            userDatestr += `
            <tr _id="${res.data[i]._id}">    
                <th class="setTDLineH" scope="row">${i + 1}</th>
                <td>
                    <img
                    class="setSize"
                    src="${res.data[i].imgSrc}"
                    alt="iphoneX"
                    />
                </td>
                <td class="setTDLineH">${res.data[i].model}</td>
                <td class="setTDLineH">${res.data[i].brand}</td>
                <td class="setTDLineH">${res.data[i].price}</td>
                <td class="setTDLineH">${res.data[i].secondHand}</td>
                <td class="setTDLineH">
                    <a class="td-update" href="##">修改</a>&ensp;&ensp;<a
                    class="td-del"
                    href="##""
                    >删除</a
                    >
                </td>
            </tr>
            `;
        }
        this.phoneDate.html(userDatestr);
    }

    //删除
    delUser(){
        var _this = this;
        this.phoneDate.on('click','.td-del',function(){
            var id = $(this).parent().parent().attr('_id');
            
            $.get('http://localhost:3000/api/phoneDelete',{id : id},function(res){
                console.log(res)
                if(res.code == 1){
                    _this.getAjax ()
                }else{
                    alert(res.msg);
                }
            })

        })
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
        $.get("http://localhost:3000/api/phoneDate?page="+ clickIndex +"&pageSize=3",function(res){
            _this.getUserDate(res)
        });
        navLiS.eq(clickIndex).addClass('active').siblings().removeClass('active')
    }

    //添加手机
    addPhone(){
        var _this = this;
        $('.sureBtn').click(function(e){
            e.preventDefault();
            //拿到所有值
            var pNameVal = $('.pName').val();
            var pBrandVal = $('.pBrand').val();
            var pPriceVal = $('.pPrice').val();
            var pSecondPriceVal = $('.pSecondPrice').val();
            var pFile = document.getElementById('pFile').files[0];


            if(pNameVal && pBrandVal && pPriceVal && pSecondPriceVal && pFile){
                var obj = new FormData();
                obj.append('imgFile',pFile);
                obj.append('pName',pNameVal);
                obj.append('pBrand',pBrandVal);
                obj.append('pPrice',pPriceVal);
                obj.append('pSecondPrice',pSecondPriceVal);

                $.ajax({
                    type : 'post',
                    url : 'http://localhost:3000/api/addPhone',
                    data : obj,
                    contentType : false,
                    processData : false,
                    success : function(res){
                        if(res.code == 1){
                            $('.cancelBtn').click();
                            alert('添加手机成功');
                            _this.getAjax()
                        }
                    }
                })
            }
            console.log(pNameVal,pBrandVal,pPriceVal,pSecondPriceVal,pFile)
        })
    }
}
