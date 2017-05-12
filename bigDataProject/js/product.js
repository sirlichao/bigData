/**
 * Created by 大帅比 on 2016/11/1.
 */
$(".img1").click(function () {
    $(".dbSelect1 img").css('display','block');
    $(".dbSelect2 img").css('display','none');
    $(".dbSelect3 img").css('display','none');
    $(".dbSelect4 img").css('display','none');
});
$(".img2").click(function () {
    $(".dbSelect2 img").css('display','block');
    $(".dbSelect1 img").css('display','none');
    $(".dbSelect3 img").css('display','none');
    $(".dbSelect4 img").css('display','none');

});
$(".img3").click(function () {
    $(".dbSelect3 img").css('display','block');
    $(".dbSelect1 img").css('display','none');
    $(".dbSelect2 img").css('display','none');
    $(".dbSelect4 img").css('display','none');

});
$(".img4").click(function () {
    $(".dbSelect4 img").css('display','block');
    $(".dbSelect1 img").css('display','none');
    $(".dbSelect2 img").css('display','none');
    $(".dbSelect3 img").css('display','none');
});