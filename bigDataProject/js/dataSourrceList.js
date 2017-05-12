function dataTolist(array){
    if(!array||array==[]){return;}
    var template=array.join('</div><div class="col-md-3"><input.html type="checkbox" onclick="check()"/>&nbsp;&nbsp;');
    template='<div class="col-md-3"><input.html type="checkbox" onclick="check()"/>&nbsp;&nbsp;'+template+'</div>';
    return template;
}
var dataAry=[
    "产品列表",
    "利润列表",
    "员工列表",
    "工资列表",
    "考勤列表",
    "日期表",
    "月份表",
    "事务表",
    "生产表",
    "污染系数表",
    "员工列表",
    "工资列表",
    "考勤列表",
    "质量检测"
];
$('.dataCon').append(dataTolist(dataAry));
//全选
//    $('.allCheck').bind('click', function () {
//        if($(this).is(':checked')){
//            $('.dataCon input.html').prop('checked', true);
//        }else{
//            $('.dataCon input.html').prop('checked', false);
//        }
//        check();
//    });
(function(){
    var count=0;
    $('input.html').on('ifChecked',function(event){
        ++count;
        if(count<10){
            if ($("input.html[type='checkbox']").is(':checked')) {
                $('.btn-info').removeAttr('disabled');
                return true;
            } else {
                $('.btn-info').attr('disabled', true);
                return false;
            }
        }else{
                $(".mask").css("height",$(window).height());
                $(".mask").css("width",$(window ).width());
                $(".mask").fadeIn(500);
                $("#model").fadeIn(500);
            setTimeout(function () {
                $(".icheckbox_square-blue").not(".checked").find('input.html').iCheck('disable');
            });
        }
    });
    $('input.html').on('ifUnchecked',function(event){
        --count;
        if(count < 10){
            $(".icheckbox_square-blue").not(".checked").find('input.html').iCheck('enable');
        }
        if ($("input.html[type='checkbox']").is(':checked')) {
            $('.btn-info').removeAttr('disabled');
            return true;
        } else {
            $('.btn-info').attr('disabled', true);
            return false;
        }
    })
    $('input.html').iCheck({
        labelHover : false,
        cursor : true,
        checkboxClass : 'icheckbox_square-blue',
        radioClass : 'iradio_square-blue',
        increaseArea : '20%'
    });
    $('#btn').on('click',function(){
        $('#model').fadeOut(500);
        $('.mask').fadeOut(500);
    });
    $('.search').on('click',function(){
        var val_=$('#sourrceList').val();
        $('div.dataCon>div').hide().filter(":contains('"+val_+"')").show();
    })
})()