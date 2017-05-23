$(function(){
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
    });
})