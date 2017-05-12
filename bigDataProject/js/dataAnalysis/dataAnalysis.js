$(function(){
    function clone(obj){
        var o;
        if(typeof obj == "object"){
            if(obj === null){
                o = null;
            }else{
                if(obj instanceof Array){
                    o = [];
                    for(var i = 0, len = obj.length; i < len; i++){
                        o.push(clone(obj[i]));
                    }
                }else{
                    o = {};
                    for(var k in obj){
                        o[k] = clone(obj[k]);
                    }
                }
            }
        }else{
            o = obj;
        }
        return o;
    }
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
                        //以下为是否显示，显示位置和显示格式的设置了
//                        label: {
//                            show: true,
//                            position: 'top',
////                             formatter: '{c}'
//                            formatter: '{b}\n{c}'
//                        }
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
    }
    function changeBar(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var data = $.ajax("../../json/chart.json").done(function (data) {
            console.log(r.length, r1.length);
            if (data.code == 200) {
                if (r.length > 0) {
                    option.title.text = data.title;
                    option.xAxis[0].type = 'value';
                    option.yAxis[0].type = 'category';
                    option.yAxis[0].data = data.dimension;
                    //option.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                } else {
                    option.yAxis[0].data = [];
                }
                if (r1.length > 0) {
                    option.series[0].data = data.metric;
                } else {
                    option.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    option.xAxis[0].data = data.dimension;
                }
                myChart.setOption(option);
                if (r.length == 0 && r1.length == 0) {
                    $('.drag-content').draggable({'disabled': false});
                    $('.drag-show-view').hide();
                    $('.analyseResult').show();
                    $('#freqently>div').css({'background':'#F2F2F2'})

                } else {
                    $('.analyseResult').hide();
                    $('.drag-show-view').show();
                }


            }
        });
    }
    $('#changeBar').on('click',function(){
        changeBar();
    });
    //点击饼图时出现饼图
    $('#pie').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var data = $.ajax("../../json/chart.json").done(function (data) {
            var option={
                title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['']
                },
                series : [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        center: ['50%', '60%'],
                        data:[
                            {value:'', name:''},
                        ],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '18',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                        '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                        '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                //以下为是否显示，显示位置和显示格式的设置了
                                label: {
                                    show: true,
                                    position: 'top',
//                             formatter: '{c}'
                                    formatter: '{b}\n{c}'
                                }
                            }
                        }
                    }
                ]
            }
            if(data.code == 200){
                var data = data;
                option.title.text = data.title;
                option.tooltip.trigger = data.trigger;
                option.legend.data = data.dimension;
                option.series[0].data=[];
                for(var i=0;i<data.metric.length; i++) {
                    option.series[0].data.push( {value:data.metric[i], name:data.dimension[i]});
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
                }


            }
        });
    });
    //折线图  虚拟数据
    $('#line').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var data = $.ajax("../../json/chart_line.json").done(function (data) {
            var option={
                title: {
                    text: data.title
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['维度']
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
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: data.dimension0
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'维度',
                        type:'line',
                        stack: '总量',
                        data:data.metric1
                    }
                ]
            }
            if(data.code == 200){
                if(r.length > 0){

                }else{

                }
                if(r1.length == 1){

                }else if(r1.length > 1){
                    var xAxis = [], series = [];
                    for(var i = 0; i < r1.length; i++){
                        var xAxisObj = clone(option.xAxis);
                        xAxisObj.data = data['dimension' + i];
                        // if(i == 0){
                        //     var newData = [];
                        //    var data =  xAxisObj.data;
                        //    for(var j = 0; j < 12; j++){
                        //        newData = newData.concat(data);
                        //    }
                        //     xAxisObj.data = newData;
                        //     console.log(newData);
                        // }
                        xAxis.push(xAxisObj)
                        var seriesObj = {
                            name:'维度',
                            type:'line',
                            stack: '总量',
                            data:data['metric' + i]
                        }
                        series.push(seriesObj)

                    }
                    option.xAxis = xAxis;
                    option.series = series;
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
                }


            }
        });
    });
    $('#stepLine').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var data = $.ajax("../../json/chart.json").done(function (data) {
            var option={
                title: {
                    text: data.title
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['Step Start']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
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
                xAxis: {
                    type: 'category',
                    data: data.dimension
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'Step Start',
                        type:'line',
                        step: 'start',
                        data:data.metric
                    }
                ]
            }
            if(data.code == 200){
                if(r.length > 0){

                }else{

                }
                if(r1.length >0){

                }else{

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
                }


            }
        });
    });
    $('#scatter').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        //console.log(r.html());
        var r1=$('.list-view .ui-draggable-handle');
        //console.log(r1.html());
        var data = $.ajax("../../json/scatter.json").done(function (data) {
            console.log(data);
            var option = {
                title: {
                    text: data.title,
                    x: 'center',
                    y: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                tooltip: {
                    formatter: 'Group {a}: ({c})'
                },
                xAxis: {
                    min: 0,
                    max: 12
                },
                yAxis: {
                    min: 0,
                    max: 120
                },
                series: [
                    {
                        name: 'I',
                        type: 'scatter',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data.metric
                    }
                ]
            };
            if(data.code == 200){
                if(r.length == 1){

                }else if(r.length > 1){
                    var grid = [], xAxis = [], yAxis = [], series = [];
                    for(var i = 0; i < r.length; i++){
                        var gridItem = {
                            width: '100%',
                            height: 100/(r.length　+ 1) + '%'
                        };
                        if(i !== 0){
                            gridItem['y' + (i+1)] = '7%';
                        }else{
                            gridItem.y = '7%';
                        }
                        grid.push(gridItem);
                        var seriesObj = clone(option.series[0]);
                        var xAxisObj = clone(option.xAxis);
                        var yAxisObj = clone(option.yAxis);
                        xAxisObj.gridIndex = i;
                        yAxisObj.gridIndex = i;
                        seriesObj.name=i == 0 ? 'I' : 'II';
                        seriesObj.xAxisIndex = i;
                        seriesObj.yAxisIndex = i;
                        xAxis.push(xAxisObj);
                        yAxis.push(yAxisObj);
                        series.push(seriesObj);
                    }

                    option.grid = grid;
                    option.xAxis = xAxis;
                    option.yAxis = yAxis;
                    option.series = series;
                }else{

                }
                if(r1.length >0){

                }else{

                }
                console.log(option);
                myChart.setOption(option);
                if(r.length == 0 && r1.length == 0) {
                    $('.drag-content').draggable({'disabled':false});
                    $('.drag-show-view').hide();
                    $('.analyseResult').show();
                    $('#freqently>div').css({'background':'#F2F2F2'})

                } else {
                    $('.analyseResult').hide();
                    $('.drag-show-view').show();
                }


            }
        });
    });

    $('#stackLine').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        //console.log(r.html());
        var r1=$('.list-view .ui-draggable-handle');
        //console.log(r1.html());
        var data = $.ajax("../../json/scatter.json").done(function (data) {
            console.log(data);
            var option = {
                title: {
                    text: data.title,
                    x: 'center',
                    y: 0
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                tooltip: {
                    formatter: 'Group {a}: ({c})'
                },
                xAxis: {
                    min: 0,
                    max: 12
                },
                yAxis: {
                    min: 0,
                    max: 120
                },
                series: [
                    {
                        name: 'I',
                        type: 'scatter',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data.metric
                    }
                ]
            };
            if(data.code == 200){
                if(r.length > 0){

                }else if(r.length > 1){
                    var grid = [];
                    for(var i = 0; i < r.length; i++){
                        var gridItem = {
                            width: '100%',
                            height: 100/r.length + '%'
                        };
                        grid.push(gridItem);
                    }
                    option.grid = grid;
                }else{

                }
                if(r1.length >0){

                }else{

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
                }


            }
        });
    });


    $('#bar').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        //console.log(r.html());
        var r1=$('.list-view .ui-draggable-handle');
        //console.log(r1.html());
        var data = $.ajax("../../json/chart_line.json").done(function (data) {
            console.log(r.length, r1.length);
            if(data.code == 200){
                if(r.length > 0){
                    option.title.text=data.title;
                    option.yAxis[0].type = 'value';
                    option.xAxis[0].type = 'category';
                    option.xAxis[0].data = data.dimension0;
                    //option.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                }else{
                    option.xAxis[0].data = [];
                }

                if(r1.length == 1){
                    option.series[0].data = data.metric0;
                }else if(r1.length > 1){
                    var xAxis = [], series = [], legend = {
                        data: []
                    };
                    for(var i = 0; i < r1.length; i++){
                        var xAxisObj = {
                            type : 'category',
                            data : data['dimension' + i]
                        };
                        if(i == 1){
                            var newData = [];
                            var xAxisdata =  xAxisObj.data;
                            for(var j = 0; j < 12; j++){
                                newData = newData.concat(xAxisdata);
                            }
                            xAxisObj.data = newData;
                            xAxisObj.axisTick = {
                                interval:  0,
                                length: 2
                            };
                            xAxisObj.axisLabel = {
                                rotate: 45
                            };
                            console.log(newData);
                        }
                        xAxis.push(xAxisObj)
                        var seriesObj = {
                            name:'201' + i,
                            type:'bar',
                            data:data['metric' + i]
                        }
                        console.log(seriesObj.data);
                        series.push(seriesObj)
                        legend.data.push(seriesObj.name);
                    }
                    option.legend = legend;
                    option.calculable = true;
                    option.xAxis = xAxis;
                    option.series = series;
                }else{
                    option.series[0].data = [0,0,0,0,0,0,0,0,0,0,0,0];
                    option.xAxis[0].data = data.dimension0;
                }
                console.log(option);
                myChart.setOption(option);
                if(r.length == 0 && r1.length == 0) {
                    $('.drag-content').draggable({'disabled':false});
                    $('.drag-show-view').hide();
                    $('.analyseResult').show();
                    $('#freqently>div').css({'background':'#F2F2F2'})

                } else {
                    $('.analyseResult').hide();
                    $('.drag-show-view').show();
                }


            }
        });
    });

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
    //Y轴柱状图叠加
    $('#bar_compositionY').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: '搜索引擎',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        myChart.setOption(option);
    })
    //X轴 柱状图叠加
    $('#bar_compositionX').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'邮件营销',
                    type:'bar',
                    stack: '广告',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'bar',
                    stack: '广告',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'bar',
                    stack: '广告',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'搜索引擎',
                    type:'bar',
                    data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                    markLine : {
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        },
                        data : [
                            [{type : 'min'}, {type : 'max'}]
                        ]
                    }
                },
                {
                    name:'百度',
                    type:'bar',
                    barWidth : 5,
                    stack: '搜索引擎',
                    data:[620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name:'谷歌',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name:'必应',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name:'其他',
                    type:'bar',
                    stack: '搜索引擎',
                    data:[62, 82, 91, 84, 109, 110, 120]
                }
            ]
        };
        myChart.setOption(option);
    })
    //折线堆叠图
    $('#pileLine').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                }
            ]
        };
        myChart.setOption(option)
    })
    $('#pileLineM').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            title: {
                text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        myChart.setOption(option)
    })
    //漏斗图
    $('#louDou').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            title: {
                text: '',
                left: 'left',
                top: 'bottom'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                orient: 'vertical',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            calculable: true,
            series: [
                {
                    name: '漏斗图',
                    type: 'funnel',
                    data:[]
                },
            ]
        };
        $.ajax('../../json/chart.json').done(function (data){
            var data = data;
            console.log(data)
            option.title.text = data.title;
            option.legend.data = data.dimension;
            option.series[0].data=[];
            for(var i=0;i<data.metric.length; i++) {
                option.series[0].data.push( {value:data.metric[i], name:data.dimension[i]});
            }
            myChart.setOption(option)
        })
    })
    //玫瑰图
    $('#meiGui').on('click',function(){
        var myChart=echarts.init(document.getElementById('show'),'infographic')
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            title : {
                text: '南丁格尔玫瑰图',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:[]
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [20, 110],
                    center : ['25%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[]
                },
                {
                    name:'面积模式',
                    type:'pie',
                    radius : [30, 110],
                    center : ['75%', '50%'],
                    roseType : 'area',
                    data:[]
                }
            ]
        };
        $.ajax('../../json/chart.json').done(function (data){
            var data = data;
            console.log(data)
            option.title.text = data.title;
            option.legend.data = data.dimension;
            option.series[0].data=[];
            for(var i=0;i<data.metric.length;i++){
                option.series[0].data.push({value:data.metric[i],name:data.dimension[i]})
                option.series[1].data.push({value:data.metric[i],name:data.dimension[i]})
            }
            myChart.setOption(option)
        })
    })
    //仪表盘
    $('#gaue').on('click',function(){
        var myChart = echarts.init(document.getElementById('show'),'infographic');
        var r=$('.row-view .ui-draggable-handle');
        var r1=$('.list-view .ui-draggable-handle');
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 50, name: '完成率'}]
                }
            ]
        };

        setInterval(function () {
            option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            myChart.setOption(option, true);
        },2000);
        myChart.setOption(option)
    })
})
