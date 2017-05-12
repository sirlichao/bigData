$('.img').click(function(e){
    $(".dbSelect").hide();
    $(e.target).parent().find('.dbSelect').show();
    $('.btnNext').css('background','#009EDB');
    $(".btnNext").removeAttr("disabled");
});