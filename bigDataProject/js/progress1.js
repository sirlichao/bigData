$(document).ready(function(){
    $(".wait,.progress,.img").hide();
});
function subimt(){
    $('.wait').show();
    $("body").css("background","#ddd");
    $('.progress').hide();
}
function error(){
    $('.img').show();
    $("body").css("background","#FEFEFE");
    $('.pro1,.wait').hide();
}
function success(){
    $('.wait').show();
    $(".submit").attr("aria-valuenow", "50");
    $(".submit").css("width", "50");
    $(".span").html('50');
    $('.pro1').show();

    $("body").css("background","#ddd");
    $('.img').hide();
}
$(".btn1").on("click",function(){
    subimt();
})
$(".btn2").on("click",function(){
    success();
})
$(".btn3").on("click",function(){
    error();
})