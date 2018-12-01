$('.addPhoneBtn').click(function(){
    //更换确定按钮的class
    $('.addItem_box').find('.changeBtn').removeClass('changeBtn').addClass('sureBtn');
    $('.masking').fadeIn(300);
    $('.addItem_box').fadeIn(300).find('h2').html('新增手机');
})

$('.cancelBtn').click(function(){
    $('.masking').fadeOut(300);
    $('.addItem_box').fadeOut(300);
})

