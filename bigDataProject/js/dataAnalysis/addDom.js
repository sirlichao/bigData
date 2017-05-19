/**
 * Created by lc on 2017/5/18.
 */
    //var myData,dimension,dimensionData,measure,measureData;
function addData(dataName,dimTpl,metricTpl){
    var template=['<li class="list-drag">',
    '<div type="button" class="dragName"data-parent="#accordion" data-toggle="collapse" data-target="#demo" aria-expanded="true" aria-controls="demo">',
    '<span class="icon-table" style="margin-left: 3px;color: #fff;"></span>',
    '<div class="dsg-myData">'+dataName+'</div>',
    '</div>',
    '<form action="" class="drag-rename">',
    '<input type="text" style="width:150px;height: 25px;line-height: 25px;padding-right: 16px" name="text" class="text"/>',
    '    <img src="../../images/yzwc.png" class="sure" style="width: 14px;" alt=""/>',
    '</form>',
    '<div class="btn-group dataName">',
    '<span class="caret data-down" style="color: #fff;"></span>',
    '<span class="icon-refresh refresh" style="color: #fff; display: inline-block;"></span>',
    '</div>',
    '<ul class="collapse in coll" id="demo">',
        +dimTpl+metricTpl+
    '</ul>',
    '</li>',
].join(' ');
return template;
}
function addDimension(dimT){
    var template =['<li>',
        '<span style="font-size: 14px;font-weight: bold;position: relative;top: 0px;left: 3px;">维度</span>',
        '<div class="btn-group">',
        '<span class="caret dimension-down"></span>',
        '</div>',
        '<ul>',
        +dimT+
        '</ul>',
        '</li>'].join(" ");
    return template;
};
function dimenC(paramD){
    var dimenTemp =[
        '<li class="group-second-body">',
        '<span class="icon glyphicon glyphicon-time"></span>',
        '<div class="group-item">',
        '<a href="#" class="drag-content" data-value="1">'+paramD+'</a>',
        '<div class="btn-group btnG">',
        '<span class="caret downList"></span>',
        '</div>',
        '</div>',
        '<form action="" class="group-item-form">',
        '<input type="text" class="group-item-txt" />',
        '<span class="glyphicon glyphicon-ok list-sure"></span>',
        '</form>',
        '</li>'
    ].join(" ");
    return dimenTemp;
}
function addMetric(metrT){
    var template =['<li>',
        '<span style="font-size: 14px;font-weight: bold;position: relative;top: 0px;left: 3px;">量度</span>',
        '<div class="btn-group">',
        '<span class="caret measure-down"></span>',
        '</div>',
        '<ul>',
        +metrT+
        '</ul>',
        '</li>'].join(" ");
    return template;
}
function metricC(paramM){
    var metTemp = [
        '<li class="group-second-body">',
        '<span class="icon glyphicon glyphicon-time"></span>',
        '<div class="group-item">',
        '<a href="#" class="drag-content" data-value="7">'+paramM+'</a>',
        '<div class="btn-group btnG">',
        '<span class="caret measure-downList"></span>',
        '</div>',
        '</div>',
        '<form action="" class="group-item-form">',
        '<input type="text" class="group-item-txt" />',
        '<span class="glyphicon glyphicon-ok list-sure"></span>',
        '</form>',
        '</li>',
    ].join(" ");
    return metTemp;
};
$.ajax({
    type:"POST",
    url:"../json/dataAnalysisJson/addDom.json",
    data:"{ value: value }",
    dataType:"json",
    success:function(data){
        console.log(data);
        var dataTable = data.dataTable;
        for(var i=0;i<dataTable.length;i++){
            var myData = dataTable[i].tableName;
            for(var j = 0;j<dataTable[i].tableDimension.length;j++){
                var dimT = dimenC(dataTable[i].tableDimension[j]);
            };
            for(var k = 0;k<dataTable[i].tableMetric.length;k++){
                var metrT = metricC(dataTable[i].tableMetric[k]);
            }
            //var dimensionData = dataTable[i].tableDimension;
            var dimTpl = addDimension(dimT);
            //var metricData = dataTable[i].tableMetric;
            var metricTpl = addMetric(metrT);
            $('body').append(addData(myData,dimTpl,metricTpl));
        };
    }
});



















