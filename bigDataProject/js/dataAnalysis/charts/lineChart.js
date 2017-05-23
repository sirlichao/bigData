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
    };
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
                        data:data.metric,
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
                                    formatter: '{b}\n{c}'
                                }
                            }
                        }
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
                    data:[120, 132, 101, 134, 90, 230, 210],
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
                                formatter: '{b}\n{c}'
                            }
                        }
                    }
                }
            ]
        };
        myChart.setOption(option)
    });
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
    });
});