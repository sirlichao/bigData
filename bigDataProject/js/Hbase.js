$(function() {
    $("input.html").on("click",function(){
        $(".img>div").hide();
        switch($(this).attr("name")){
            case "myDataSourrce":
                $(".img>img").attr("src","../images/mysql/mysql_right2.png")
                break;
            case "realmName":$(".img>img").attr("src","../images/mysql/mysql_right3.png")
                break;
            case "dataPort":$(".img>img").attr("src","../images/mysql/mysql_right4.png")
                break;
            case "userName":$(".img>img").attr("src","../images/mysql/mysql_right5.png")
                break;
            case "pwd":$(".img>img").attr("src","../images/mysql/mysql_right6.png")
                break;
            case "dataName":$(".img>img").attr("src","../images/mysql/mysql_right7.png")
                break;
            case "tableName":$('.img>img').attr("src","../images/mysql/mysql_right1.png")
                break;
        }

    });

$('.mySql_user input.html').bind('keyup', judgeInputNotEmpty);

$('.footer .btn-info').bind('click', function () {
    if(!judgeInputNotEmpty())return;
});

function judgeInputNotEmpty() {
    var val1=$("#myDataSourrce").val();
    var val2=$("#realmName").val();
    var val3=$("#dataPort").val();
    var val4=$("#userName").val();
    var val5=$("#pwd").val();
    var val6=$("#dataName").val();
    if(val1!=""&&val2!=""&&val3!=""&&val4!=""&&val5!=""&&val6!=""){
        $(".btn-info").removeAttr("disabled");
        return true;
    }else{
        $(".btn-info").attr("disabled", true);
        return false;
    }

};
    $('input.html[value="是"]').on('click',function(){
        $('.Hbase').show();
        $('.mySql').css('height','720px');
    });
    $('input.html[value="否"]').on('click',function(){
        $('.Hbase').hide();
        $('.mySql').css('height','600px');
    });
});