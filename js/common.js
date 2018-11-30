$('.addPhoneBtn').click(function(){
    $('.masking').fadeIn(300);
    $('.addItem_box').fadeIn(300).find('h2').html('新增手机');
})

$('.cancelBtn').click(function(){
    $('.masking').fadeOut(300);
    $('.addItem_box').fadeOut(300);
})

