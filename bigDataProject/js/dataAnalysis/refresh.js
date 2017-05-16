/**
 * Created by lc on 2017/5/16.
 */
$(function(){
    $('.refresh').on('click',function(e){
        if($("#popover").is(":hidden")){
            //如果隐藏组织冒泡
            e.stopPropagation();
        };
        //获取元素相对于body的位置
        var x = $(this).offset().top;
        var y = $(this).offset().left;
        $('#popover').css({
            'display':'block',
            'position':'absolute',
            'top':(x-92)+'px',
            'left':(y+27)+'px'
        });
    })
    $('#remove').on('click',function(){
        $('#popover').hide();
        $('input[name="refresh"]').each(function(index,elem){
            elem.checked =false;
        });
    });
    $(document).on('click',function(e){
        e = window.event||e;//兼容IE7
        obj = $(e.srcElement || e.target);
        if($(obj).is("#popover")){

        }else{
            $('#popover').hide();
            $('input[name="refresh"]').each(function(index,elem){
                elem.checked =false;
            });
        }

    });
    $('#popover').on('click',function(e){
        e.stopPropagation();
    });
    $('#btnRefresh').on('click',function(){
        $.ajax({});//发送请求
        //获取选中input的value值
        var refVal = $('input:checked').val();
        $('input[name="refresh"]').each(function(index,elem){
            elem.checked =false;
        });
        $('#popover').hide();
    });
})