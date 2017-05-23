$(function(){
    var  option = {
        title : {
            text: '某地区蒸发量和降水量',
            subtext: '纯属虚构'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['维度','量度']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar','pie','radar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                name:"维度",
                axisLIne:{
                    show:true,
                    lineStyle:{
                        color:new echarts.graphic.LinearGradient(0,0,0,1,[
                            {offset:0,color:'red'},{offset:1,color:'blue'}
                        ],false)
                    }
                },
                axisTick:{show:false}
            }

        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'维度',
                type:'bar',
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                itemStyle: {
                    normal: {
                        //定义一个list，然后根据所以取得不同的值，这样就实现了，
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ],
                    lineStyle:{
                        normal:{
                            color:'red'
                        }
                    }
                }
            }
        ]
    };
    function showChart() {
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var data = $.ajax("../../json/chart.json").done(function (data) {
            console.log(r.length, r1.length);
            if(data.code == 200){
                if(r.length > 0){
                    option.title.text=data.title;
                    option.xAxis[0].data = data.dimension;
                    //option.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                }else{
                    option.xAxis[0].data = [];
                }
                if(r1.length >0){
                    option.series[0].data = data.metric;
                }else{
                    option.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                    option.xAxis[0].data = data.dimension;
                }
                myChart.setOption(option);
                if(r.length == 0 && r1.length == 0) {
                    $('.drag-content').draggable({'disabled':false});
                    $('.drag-show-view').hide();
                    $('.analyseResult').show();
                    $('#freqently>div').css({'background':'#F2F2F2'})

                } else {
                    $('.analyseResult').hide();
                    $('.drag-show-view').show();
                    $('#freqently>div').css({'background':'#F2F2F2'})
                }

            }
        });
    };
    $( ".drag-content" ).draggable({
        cursor: "move",
        containment:$(".dsg-mian")[0],
        scorll:false,
        revert: "invalid",
        helper: function(obj){
            $('.row-content').css('border','1px dashed blue')
            var txt=obj.target.firstChild.data;
            var i = $(this).attr('data-value');
            return "<div class='move' data-value='"+i+"' style='opacity: 0;'>"+txt+"</div>";
        },
        start:function(event,ui){
            $(this).parents('.list-drag').siblings()
                .children('.drag-content').draggable({'disabled':true});
            //$('.heightAll').css('overflow','visible');
            $(ui.helper).css({'text-overflow':'inherit','width':'outo'})
            $(this).parents('.list-drag').siblings().find("li .drag-content").draggable({'disabled':true});
            var x = event.pageX;
            var y = event.pageY;
            console.log(x,y);
            //var txt=ui.target.firstChild.data;
            console.log($(this).html());
            var btn_=$('<div class="move"></div>');
            btn_.html($(this).html());
            btn_.css({'position':'absolute',"top":(y-15)+'px','left':(x-75)+'px'});
            //$('.move').remove();
            $('body').append(btn_);
        },
        drag:function(event,ui){
            //console.log(ui.helper);
            event.stopPropagation();
            var x = event.pageX;
            var y = event.pageY;
            $('.move').css({'position':'absolute',"top":(y-15)+'px','left':(x-75)+'px'});
            //console.log(x,y);
        },
        stop:function(event,ui){
            $('.move').remove();
        }

    });
    $( ".row-view" ).droppable({
        activeClass: "active",
        accept: ".drag-content",
        hoverClass: "hover",
        drop: function( event, ui ) {
            var helper=ui.helper;
            var cc=helper[0];
            var dropedList = $('.row-content .dropMove');
            var dropbox = $('.move');
            var isHave = false;
            for (var i = 0; i < dropedList.length; i++) {
                if($(dropedList[i]).attr('data-value') == dropbox.attr('data-value')){
                    isHave = true;
                }
            }
            if (isHave) {return false;}
            var cc1=$(cc).clone().removeAttr("class").removeAttr("style")
                .addClass('dropMove');
            $(cc1).appendTo(".row-view");
            $(cc1).draggable({
                cursor: "move",
                start: function (event,ui){
                    $(this).css({"z-index":"1000","opacity":0});
                    var x = event.pageX;
                    var y = event.pageY;
                    console.log(x,y);
                    console.log($(this).html());
                    var btn_=$('<div class="dropDrag"></div>');
                    btn_.html($(this).html());
                    btn_.css({'position':'absolute',"top":(y-15)+'px','left':(x-75)+'px'});
                    //$('.move').remove();
                    $('body').append(btn_);

                },
                drag:function(e,ui){
                    //console.log(ui.helper);
                    e.stopPropagation();
                    $(this).css({"position":"absolute","z-index":100000})
                    var x = e.pageX;
                    var y = e.pageY;
                    $('.dropDrag').css({'position':'absolute',"top":(y-13)+'px','left':(x-50)+'px'});
                    //console.log(x,y);
                    $('.list-view').css({"height":"30px"});
                },
                stop: function( event, ui ) {
                    $(ui.helper[0]).remove();
                    $('.dropDrag').remove();
                    showChart();
                    //写元素脱出行时显示
                    //console.log("hehehhehehe")
                }
            });
            //$('.heightAll').css('overflow','auto');
            showChart();

            //console.log("stop");
        },
        activate:function(event, ui ){
            //console.info("activate");

        },
        create:function(event, ui){
            //console.info("===========================");
        },
        deactivate:function(event, ui){
            $('.row-content').css('border','1px dashed #ddd')
            //console.info("-------------------------------");
            //$('.heightAll').css('overflow','auto');
        },
        out:function(event, ui){
            //showChart();
            //console.info("777777777777777777777777777777777");

        },
        over:function(event,ui){
            //console.log("over")
            var rowL=$('.row-view .ui-draggable-handle').length;

            if(rowL<1){
                $('.row-view').css({"height":"30px"});
            }else if(rowL>3){
                $('.row-view').css({"height":"auto","z-index":1000});
            }

        },
        tolerance: "touch"
    });

    $( ".list-view" ).droppable({
        activeClass: "active",
        accept: ".drag-content",
        hoverClass: "hover",
        drop: function( event, ui ) {
            var helper=ui.helper;
            var cc=helper[0];
            console.log(cc);
            //去掉重复的
            var dropedList = $('.row-content .dropMove');
            var dropbox = $('.move');
            var isHave = false;
            for (var i = 0; i < dropedList.length; i++) {
                if($(dropedList[i]).attr('data-value') == dropbox.attr('data-value')){
                    isHave = true;
                }
            }
            if (isHave) {return false;}
            var cc1=$(cc).clone().removeAttr("class").removeAttr("style").addClass('dropMove');
            $(cc1).appendTo(".list-view");
            $(cc1).draggable({
                cursor: "move",
//				revert: "invalid",
                start: function (event, ui) {
                    $(this.target).css({"z-index":"1000","opacity":0});
                    var x = event.pageX;
                    var y = event.pageY;
                    console.log(x,y);
                    console.log($(this).html());
                    var btn_=$('<div class="dropDrag"></div>');
                    btn_.html($(this).html());
                    btn_.css({'position':'absolute',"top":(y-15)+'px','left':(x-75)+'px'});
                    //$('.move').remove();
                    $('body').append(btn_);
                    $('.list-view').css({"height":"30px"});
                },
                drag:function(e,ui){
                    //console.log(ui.helper);
                    e.stopPropagation();
                    $(this).css({"position":"absolute","z-index":100000})
                    var x = e.pageX;
                    var y = e.pageY;
                    $('.dropDrag').css({'position':'absolute',"top":(y-13)+'px','left':(x-50)+'px'});
                    //console.log(x,y);
                },
                stop: function( event, ui ) {
                    $(ui.helper[0]).remove();
                    $('.dropDrag').remove();
                    showChart();
                    //写元素脱出行时显示
                    //console.log("hehehhehehe")
//				 	alert("======================");
                }
            });
            // $('.heightAll').css('overflow','auto');
            showChart();


            //console.log("stop");
        },
        activate:function(event, ui ){
            //console.info("activate");

        },
        create:function(event, ui){
            //console.info("===========================");
        },
        deactivate:function(event, ui){
            //console.info("-------------------------------");
            //$('.heightAll').css('overflow','auto');
        },
        out:function(event, ui){
//                    console.log(r.length);
//                    console.log($(ui.helper[0]).remove());
//                    console.log($(ui.helper).length);
//                    showChart();

        },
        over:function(event,ui){
            //console.log("over")
            var listL=$('.list-view .ui-draggable-handle').length;

            if(listL<1){
                $('.list-view').css({"height":"30px"});
            }else if(listL>3){
                $('.list-view').css({"height":"auto","z-index":1000});
            }
        },
        tolerance: "touch"
    });
    $('.row-view').mouseover(function(){
        var rowL=$('.row-view .ui-draggable-handle').length;

        if(rowL<1){
            $('.row-view').css({"height":"30px"});
        }else if(rowL>3){
            $('.row-view').css({"height":"auto","z-index":1000});
        }
    }).mouseout(function(){
        $(this).css({"height":"30px"})
    });
    $('.list-view').mouseover(function(){
        var listL=$('.row-view .ui-draggable-handle').length;
        if(listL<1){
            $(this).css({"height":"30px"});
        }else if(listL>3){
            $(this).css({"height":"auto","z-index":1000});
        }
    }).mouseout(function(){
        $(this).css({"height":"30px"})
    });
})
