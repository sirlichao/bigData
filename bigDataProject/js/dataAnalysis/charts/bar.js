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
    });
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
    });
});