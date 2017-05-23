$(function(){
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
    });
});