window.onload = function() {
  var obj = {
    user: $(".username"),
    pwd: $(".pwd"),
    nickname: $(".nickname"),
    phone: $(".phone"),
    age: $("input[name=age]"),
    // sex: $("input[name=sex]"),
    // isAdmin: $("input[name=isAdmin]"),
    surePwd: $(".surePwd"),
    lookpwd: $(".lookpwd"),
    looksurepwd: $(".looksurepwd"),
    registerBtn: $(".registerBtn"),

    reg_user: /^([\u4e00-\u9fa5]|\w){4,10}$/,
    reg_pwd: /^[a-zA-Z]\w{3,11}$/,
    reg_nickname: /^[\u4e00-\u9fa5]{2,4}$/,
    reg_phone: /^1[3-8]\d{9}$/
  };
  new RegRegister(obj);
};

class RegRegister {
  constructor(obj) {
    this.user = obj.user;
    this.pwd = obj.pwd;
    this.nickname = obj.nickname;
    this.phone = obj.phone;
    this.age = obj.age;
    // this.sex = obj.sex;
    // this.isAdmin = obj.isAdmin;
    this.surePwd = obj.surePwd;
    this.lookpwd = obj.lookpwd;
    this.looksurepwd = obj.looksurepwd;
    this.registerBtn = obj.registerBtn;
    this.reg_user = obj.reg_user;
    this.reg_pwd = obj.reg_pwd;
    this.reg_nickname = obj.reg_nickname;
    this.reg_phone = obj.reg_phone;

    this.flag = false;
    this.init();
  }

  init() {
    this.regUser();
    this.regPwd();
    this.regNickname();
    this.regPhone();
    this.surePassword(this.surePwd);
    // this.checkSubmit();
    this.checkRegisterBtn();

    this.lookPwd(this.lookpwd, this.pwd);
    this.lookPwd(this.looksurepwd, this.surePwd);
  }

  regUser() {
    this.checkIpu(this.user, this.reg_user);
  }

  regPwd() {
    this.checkIpu(this.pwd, this.reg_pwd);
  }

  regNickname() {
    this.checkIpu(this.nickname, this.reg_nickname);
  }

  regPhone() {
    this.checkIpu(this.phone, this.reg_phone);
  }

  //两次密码确认
  surePassword(iptName) {
    var _this = this;
    iptName.blur(function() {
      if (_this.pwd.val()) {
        if (_this.pwd.val() == $(this).val()) {
          $(this)
            .next("p")
            .html("密码一致")
            .css({ color: "green" });
          _this.flag = true;
        } else {
          $(this)
            .next("p")
            .html("两次密码不一致，请重新输入")
            .css({ color: "red" });
          _this.flag = false;
        }
      } else {
        _this.flag = false;
      }
    });
  }

  //查看密码
  lookPwd(ele, iptName) {
    var _this = this;
    ele.click(function() {
      var type = iptName.attr("type");
      if (type == "password") {
        iptName.attr("type", "text");
      } else {
        iptName.attr("type", "password");
      }
    });
  }

  //文本验证方法
  checkIpu(iptName, iptReg) {
    var _this = this;
    iptName.blur(function() {
      // debugger;
      if (iptReg.test($(this).val())) {
        $(this)
          .next("p")
          .html("输入正确")
          .css({ color: "green" });
        $(this).css({ borderColor: "" });
        _this.flag = true;
      } else {
        $(this)
          .next("p")
          .html("输入有误,请重新输入")
          .css({ color: "red" });
        $(this)
          .focus()
          .css({ borderColor: "red" });
        _this.flag = false;
      }
    });
  }

  //表单submit验证
  checkSubmit() {
    var _this = this;
    $("form").submit(function() {
      if (
        _this.flag &
        (_this.user.val() != "") &
        (_this.pwd.val() != "") &
        (_this.nickname.val() != "") &
        (_this.phone.val() != "") &
        (_this.surePwd.val() != "") &
        (_this.surePwd.val() == _this.pwd.val())
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  //button注册
  checkRegisterBtn() {
    var _this = this;
    this.registerBtn.click(function() {
      if (
        _this.flag &
        (_this.user.val() != "") &
        (_this.pwd.val() != "") &
        (_this.nickname.val() != "") &
        (_this.phone.val() != "") &
        (_this.surePwd.val() != "") &
        (_this.surePwd.val() == _this.pwd.val())
      ) {
        //注册
        var params = {
          username: _this.user.val(),
          password: _this.pwd.val(),
          nickname: _this.nickname.val(),
          phone: _this.phone.val(),
          age: _this.age.val(),
          sex: $("input[name=sex]:checked").val(),
          isAdmin:  $("input[name=isAdmin]:checked").val()
        };
        $.post(
          "'http://localhost:3000/api/register",
          params,
          function(res) {
            if(res.code === 1){
              alert('注册成功，返回登录页');
              location.href = '../page/login.html';
            }else{
              alert(res.msg);
            }
          }
        );
      } else {
        alert("您输入的信息不完整");
      }
    });
  }
}
