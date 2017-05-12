$(function(){
    //数据重命名 item-rename
    function rename(e){
        console.log(e);
        e.stopPropagation();
        console.log(e.target);
        console.log(target);
        var $elem=$(target).parents('li.list-drag').find('.dsg-myData')
        $elem.hide();
        $(target).parents('li.list-drag').find('.drag-rename').show().find('.text').val($elem.text());
        $('.sure').on('click',function(e){
            e.stopPropagation();
            $(this).parent('.drag-rename').hide();
            var cc = $(this).parent('.drag-rename').find(".text").val();
            $(this).parent().parent().children().children('.dsg-myData').html(cc).show();
        });
    }
    //数据删除
    function deleteData(e){
        console.log(target);
        $(target).parents('li.list-drag').remove();
    }
    //维度与量度的数据重命名
    function publicRename(e){
        //e.stopPropagation();
        var $a=$(target).parents('.group-item');
        $a.hide();
        $a.siblings('.group-item-form').show().find('.group-item-txt').val($a.find('.drag-content').html());
        $('.list-sure').on('click',function(e){
            e.stopPropagation();
            var form=$(this).parent('.group-item-form');
            form.hide();
            var val_1=form.find('.group-item-txt').val();
            form.siblings('.group-item').show();
            form.siblings('.group-item').find('.drag-content').html(val_1);
        });
    }
    //维度和度量的删除
    function publicDel(e){
        //e.stopPropagation();
        $(target).parents('li.group-second-body').remove();
    }
    $('.title-remove').on('click',function(){
        $('.edit').fadeOut(1000);
    })
    //创建参数字段
    function parameter(e){
        $(target).parents('body').find('.edit').fadeIn(1000);
    }
    // 动态生成下拉菜单
    var btn_,target;
    function handleClick(e,menuHtml){
        var ck;
        if(target){
            $(target).attr('ck',true);
        }
        $(btn_).remove();
        var xx= e.pageX;
        var yy= e.pageY;
        if($(e.target).attr("ck")){
            ck = $(e.target).attr("ck");
        }else{
            ck = true;
        }
        console.log(ck);
        if(ck){
            btn_=$(menuHtml);
            btn_.css({'position':'absolute',"top":(yy+5)+'px',"left":xx+'px'});
            $('body').append(btn_);
            $('.item-rename').bind('click',rename);
            $('.item-delete').bind('click',deleteData);
            $('.dimension-rename').bind('click',publicRename);
            $('.mensure-rename').bind('click',publicRename);
            $('.dimension-delete').bind('click',publicDel);
            $('.mensure-delete').bind('click',publicDel);
            $('.creat-parameter-filed').bind('click',parameter);
            $('.relevance').bind('click',function(){
                $("#association").css({'display':'block'});
            })
            $('.creat-count-field').bind('click',function(){
                $('.modal-dialog').fadeIn(1000);
            })
            target = e.target;
            ck=false;
        }else{
            $('.list-down').remove();
            ck=true;
        }
        $(e.target).attr("ck",ck);
        e.stopPropagation();
    }
    var menu1 = '<ul class="list-down">' +
        '<li><a href="#" class="item-rename">' +
        '<span class="glyphicon glyphicon-pencil">&nbsp;</span>重命名</a></li>' +
        '<li><a href="#" class="relevance">' +
        '<span class="glyphicon glyphicon-link">&nbsp;</span>关联</a></li>' +
        '<li><a href="#" class="item-delete">' +
        '<span class="glyphicon glyphicon-trash">&nbsp;</span>删除</a></li>' +
        '</ul>';
    var menu2='<ul class="list-down">' +
        '<li><a href="#" class="creat-count-field" onclick="">创建计算字段</a></li>' +
        '<li><a href="#" class="creat-parameter-filed" onclick="">创建参数字段</a></li>' +
        '</ul>';
    var menu3='<ul class="list-down">' +
        '<li><a href="#" class="dimension-rename" onclick="">' +
        '<span class="glyphicon glyphicon-pencil">&nbsp;</span>重命名</a></li>' +
        '<li><a href="#" class="dimension-change" onclick="">' +
        '<span class="glyphicon glyphicon-refresh">&nbsp;</span>转化为度量</a></li>' +
        '<li><a href="#" class="dimension-delete" onclick="">' +
        '<span class="glyphicon glyphicon-trash">&nbsp;</span>删除</a></li>' +
        '</ul>';

    var menu4='<ul class="list-down">' +
        '<li><a href="#" class="creat-count-field" onclick="">创建计算字段</a></li>' +
        '</ul>';

    var menu5='<ul class="list-down">' +
        '<li><a href="#" class="mensure-rename" onclick="">' +
        '<span class="glyphicon glyphicon-pencil">&nbsp;</span>重命名</a></li>' +
        '<li><a href="#" class="mensure-change" onclick="">' +
        '<span class="glyphicon glyphicon-refresh">&nbsp;</span>转化为维度</a></li>' +
        '<li><a href="#" class="mensure-delete" onclick="">' +
        '<span class="glyphicon glyphicon-trash">&nbsp;</span>删除</a></li>' +
        '</ul>';
    function creat(){

        $('.data-down').on('click',function(e){
            handleClick(e, menu1);
        });
        $('.dimension-down').on('click',function(e){
            handleClick(e, menu2);
        });
        $(".downList").on('click',function(e){
            handleClick(e, menu3);
        });
        $('.measure-down').on('click',function(e){
            handleClick(e, menu4);
        });
        $('.measure-downList').on('click',function(e){
            handleClick(e, menu5);
        });
        $('body').on('click',function(){
            if(target){
                $(target).attr('ck',true);
            }
            $(btn_).remove();

        });
    }
    creat();
})