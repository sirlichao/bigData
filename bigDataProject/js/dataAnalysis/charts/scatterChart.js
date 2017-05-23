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
                        data: data.metric,
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
});