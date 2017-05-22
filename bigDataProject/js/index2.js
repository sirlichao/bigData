/**
 * Created by Administrator on 2016/11/3.
 */
    //模态框的选中的js
$('#img1').click(function(){
    $(this).attr("src","../images/yzwc.png");
    $("#img2").attr("src","../images/xjsjy.png");
    $("#btn-p").removeAttr("disabled");
});
$('#img2').click(function(){
    $(this).attr("src","../images/yzwc.png");
    $("#img1").attr("src","../images/yysjy.png");
    $("#btn-p").removeAttr("disabled");
    $("#btn-p").click(function(){
        $("#myModal2").modal('hide');
        $("#img2").attr("src","../images/xjsjy.png");
        $("#img1").attr("src","../images/yysjy.png");
        //window.
    });
    $("#btn-q").click(function(){
        console.log('ahsakshaks');
        $("#img2").attr("src","../images/xjsjy.png");
        $("#img1").attr("src","../images/yysjy.png");
    });
});

//重命名设置
$(".rename").click(function(e){
    $(".backImg2").trigger('click');
    $(e.target).parent().find('.title').hide();
    $(e.target).parent().find('.form_1').show();

});
$(".backImg2").click(function(e){
    $(this).parent().parent().find(".title").show();
    $(this).parent().hide();
});
$(".backImg1").click(function(e){
    var val_1=$(this).parent().find(".dataName")[0].value;
    console.log($(this).parent().find(".title"));
    $(this).parent().parent().find(".title").html(val_1).show();
    $(this).parent().hide();
});
$('.antion').bind('click',function(){
    window.location.href="dataAnalysis.html"
});
//删除的设置
///动画效果
$(function(){
    $('.pro_1').hover(function(){
        $(this).find(".span3").css({
            'animation':'gao 800ms linear'
        });
    },function(){
        $(this).find(".span3").css({
            'animation':'none'
        });
    });
});
$(function(){
    $('.pro_1').hover(function(){

        $(this).find(".span2").css({
            'animation':'zhong 800ms linear'
        });
    },function(){
        $(this).find(".span2").css({
            'animation':'none'
        });
    });
});
$(function(){
    $('.pro_1').hover(function(){

        $(this).find(".span1").css({
            'animation':'ai 800ms linear'
        });
    },function(){
        $(this).find(".span1").css({
            'animation':'none'
        });
        ;
    });
});
var flag = true;
function dele(e) {
    var e = window.event || event;
    var tid = $(e.target).attr('id');
    $("#sure_remove").click(function(){
        $('#myModal3').modal('hide')
        flag = true;
        if(flag) {
            $('#'+tid).parent().parent().parent().remove();
            var liLen = $(".pro_1").length;
            if(liLen==1) {
                $(".pro").show();
            } else {
                $(".pro").hide();
            }
            flag=false;
        }
    });

}
$(function() {
    $("#dropDown").click(function() {
        if($(this).prev("input.html").val() != "") {
            $.get("../json/search.json",function(data) {
                if(data.code ==200) {
                    var data = data.data;
                    $(".all span").text(data.all);
                    $(".li span").text(data.li);
                    $(".datasource span").text(data.datasource);
                    $(".dashboard span").text(data.dashboard);
                    $(".chart span").text(data.chart);
                    console.log(data);
                    $(".searchHead").css({
                        'display': 'block'
                    });

                }
            })
        }

    });
    var upFlag = true;
    $("#up").click(function() {
        if(upFlag) {
            $(".down").slideUp(200);
            upFlag = false;
            $(this).find("span").text(">展开");
        } else {
            $(".down").slideDown(500);
            upFlag = true;
            $(this).find("span").text("^收起");
        };
    });
});