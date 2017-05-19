$(function() {
    //数据关联的模态框处理
    $('.modal-hide').on('click',function(){
        $("#association").hide();
    })
    $('#association-fadeIn').on('click',function(){
        $("#association").hide();
    })
    $.ajax("../../json/dataAnalysisJson/dataRelevance.json").done(function (data) {
        var _data = data;
        console.log(_data);

        $(_data.dataList).each(function(index,val){
            $('.dsg-list-group').append($('<div class="list-group">' +
                '<span data-value="'+index+'">'+_data.dataList[index].listName+'</span>' +
                '</div>'));
        });
        $('.list-group').draggable({
            cursor: "move",
            revert: "invalid",
            helper: "clone",
            stop: function () {
                $('.dropContainer').css({'border': '1px dotted #ccc'});
            }
        });
        $('.dropContainer').droppable({
            activeClass: "active",
            accept: ".list-group",
            hoverClass: "hover",
            drop: function (event, ui) {
                var _helper = ui.helper;
                var drop = _helper[0];
                //console.log(drop.attr("data-value"))
                var dropedList = $('.dropContainer .dropMove1 span');
                var dropBox = _helper.find('span');
                var isHave = false;
                for (var i = 0; i < dropedList.length; i++) {
                    if ($(dropedList[i]).attr('data-value') == dropBox.attr('data-value')) {
                        isHave = true;
                    }
                }
                if (isHave) {
                    return false;
                }
                var _drop = $(drop).clone().removeAttr("class").removeAttr("style").addClass("dropMove1");
                if (dropedList.length > 0){
                    $('.relative-wrap').append('<div id="line-node"><i></i><em id="em"></em><i></i></div>')
                }
                $(_drop).appendTo('.relative-wrap');
                $('.drop-info').hide();
            }
        });

        //删除容器的内容
        $('.dsg-remove').on('click', function () {
            $('.relative-wrap').html('');
            $('.drop-info').show();
        });
        //自动生成删除编辑
        var btn_, target;
        function handleClick(e, menuHtml) {
            var ck;
            if (target) {
                $(target).attr('ck', true);
            }
            $(btn_).remove();
            var xx = e.pageX;
            var yy = e.pageY;
            if ($(e.target).attr("ck")) {
                ck = $(e.target).attr("ck");
            } else {
                ck = true;
            }
            console.log(ck);
            if (ck) {
                btn_ = $(menuHtml);
                btn_.css({'position': 'absolute', "top": (yy-30) + 'px', "left": (xx - 30) + 'px'});
                $('body').append(btn_);
                $('.menu-remove').bind('click',function(e){
                    $(target).parents('#line-node').remove();
                });
                //小模态框
                $('.menu-eidt').bind('click',function(e){
                    console.log(target);
                    var $elem=$(target).parent();
                    var _prev = $($elem).prev();
                    var _next = $($elem).next();
                    console.log(_prev.children('span').attr('data-value'),_next.children('span').attr('data-value'));
                    var pdataVal = _prev.children('span').attr('data-value');
                    var ndataVal = _next.children('span').attr('data-value');
                    $('[name="table1"]').append($('<option selected>'+_prev.text()+'</option>'));
                    $('[name="table2"]').append($('<option selected>'+_next.text()+'</option>'));
                    for(var k =0;k<_data.dataList[pdataVal].listDimension.length;k++){
                        $('[name="field1"]').append($('<option value="'+k+'">'+_data.dataList[pdataVal].listDimension[k]+'</option>'))
                    }
                    for(var j =0;j<_data.dataList[ndataVal].listDimension.length;j++){
                        $('[name="field2"]').append($('<option value="'+j+'">'+_data.dataList[ndataVal].listDimension[j]+'</option>'))
                    }
                    $('#autoRelativeDialog').show();
                });
                target = e.target;
                ck = false;
            } else {
                $('.list-down').remove();
                ck = true;
            }
            $(e.target).attr("ck", ck);
            e.stopPropagation();
        }
        var menu = '<div class="line-menu-list">' +
            '<a class="icon-trash menu-remove" title="删除"></a>' +
            '<a class="icon-pencil menu-eidt" title="编辑"></a>' +
            '</div>';

        function creat() {
            $('.relative-wrap').delegate('em', 'click', function (e) {
                handleClick(e, menu);
            });
            $('body').on('click', function () {
                if (target) {
                    $(target).attr('ck', true);
                }
                $(btn_).remove();

            });
        }

        creat();
        $('.close').on('click',function(){
            console.log("akjajaj")
            $('[name*="table"]>option').remove();
            $('[name*="field"]>option').remove();
            $('#autoRelativeDialog').hide();
        });
        $('.line-type-item').on('click',function(){
            $(this).addClass('current').siblings().removeClass('current');
        });
        $('.line-field-wrap').delegate('.line-field-remove','click',function(){
            //console.log(target)
            $(this).parent().remove();
        });
//        $('.line-add-field').on('click',function(){
//            var addline = $('<div class="line-field-item"><div class="line-field-field"><select name="field1"><option value="">===请选择===</option><option value="6575285">正课</option></select> </div><div class="line-field-gap">=</div><div class="line-field-field"><select name="field2"><option value="">===请选择===</option><option value="6575297">正课:</option></select> </div> <a href="javascript:;" class="line-field-remove icon-remove" title="删除此行"></a> </div>')
//            $('.line-field-wrap').append(addline);
//        });
        //点击保存
        $('.dsg-btn-1').on('click',function(){
            //$('#autoRelativeDialog').hide();
            var dataVal = $('.current').attr('data-value');
            console.log(dataVal)
            var selOptVal1 = $('[name="table1"]>option:selected').val();
            var selOptVal2 = $('[name="table2"]>option:selected').val();
            console.log(selOptVal1,selOptVal2);
            var selOptValF1 = $('[name="field1"]>option:selected').attr('value');
            var selOptValF2 = $('[name="field2"]>option:selected').attr('value');
            console.log(selOptValF1,selOptValF2);
            //$('.dsg-grop-table').show();
            if(dataVal = 'inner'){
                console.log("inner")
            }else if(dataVal = 'left'){
                console.log("left")
            }else if(dataVal = 'right'){
                console.log('right');
            }else{
                console.log('full')
            }
            $('#autoRelativeDialog').hide();
            $('.dsg-grop-table').show();
        })
    });
    //点击保存

})