splitnameinfo={};//保存分割的列
$(".tab-list>li").on("click",function(){
    $(this).addClass("active").siblings().removeClass("active");
});
//初始化datatable
function initDataTable_(){
    var param={};
    var sqlanme_=mergeSqlStr(tabcols_);
    //初始化表单的action
    $("#crrayParamId").attr("action",getConfig().addDataSource);
    //拿到需要的参数
    $("#crrayParamId").find("input.html").each(function(i,val){
        param[$(val).attr("name")]=$(val).val();
    });
    //这是列分隔的信息
    var splitName=$("#splitNameId").val();
    param["splitName"]=splitName;
    param['sqlName']=sqlanme_;
    $("#sqlNmeId").val(sqlanme_);
    var dataTable_=$('#table_id_example').dataTable( {
        "paging":   false,
        "ordering": false,
        "info":     false,
        "searching": false,
        "sort":false,
        "columnDefs": [
            {
                className: "my_class_",
                "defaultContent": "null",
                "targets": "_all"
            },
            { "type": "time", "targets": 2 }
        ],
        "columns":generateColumns(),
        "ajax": {
            url: getConfig().dataUrl,
            dataType: "json",
            async: true,
            data: param,
            type: "post",
        }
    } );

//   var sqlanme_=mergeSqlStr(tabcols_,true);
// 	 $("#sqlNmeId").val(sqlanme_);//重新构建tableviewFinal的sql语句


    //操作表头
    var  dataTableApi=dataTable_.api();
    dataTableApi.columns().indexes().flatten().each(function (i) {
        var column = dataTableApi.column(i);
        var text_=$(column.header()).text();
        $(column.header()).html("");
        var html_=[];
        html_.push('<div class="btn-group" >');
        html_.push('<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">');
        html_.push(text_);
        html_.push("&nbsp;&nbsp;&nbsp;");
        html_.push('<span class="caret"></span>');
        html_.push('</a>' );
        html_.push('<ul class="dropdown-menu">');
        html_.push('<li><a tabindex="-1" href="#" onclick="deleteCol_(\''+text_+'\''+',\''+i+'\')"><span class="glyphicon glyphicon-trash">&nbsp;</span>删除</a>');
        html_.push('</li> ');
        if(json_col_type_split[text_]!='split'){//TODO 这里还需要进一步的加强json_col_type_split[text_]!="int" ||
            //如果列不是数字类型是可以进行进行拆分的
            html_.push('<li>');
            html_.push('<a tabindex="-1" href="#" data-toggle="modal" data-target="#myModal" onclick="setSplitColName(\''+text_+'\''+',\''+i+'\')"><span class="glyphicon glyphicon-list-alt">&nbsp;</span>自定义拆分</a>');
            html_.push( '</li>');
        }
        html_.push('</ul></div>');
        var $span = $(html_.join("")).appendTo($(column.header()));
    });
    return dataTable_;
};


//拼接sql语句的形式，执行数据预览和保存的时候，生成sql语句的形式不一样
function mergeSqlStr(clos,save){//这条sql语句是查询，需要预览的数据，不包含分割的列
    var  sqlname=[];
    //拼接sql语句的形式
    for(var i=0;i<tabcols_.length;i++){
        if(tabcols_[i]["name"] && !tabcols_[i]["split"] || save){
            sqlname.push(""+tabcols_[i]["name"]+""+"	as "+""+tabcols_[i]["asName"]+"");
        }
    }
    var sqlanme_=sqlname.join("	,");
    return sqlanme_;
}

//删除列
function deleteCol_(text_,index){
    if(col_source_split[text_]&&col_source_split[text_]["num"]>0){//如果删除列，含有
        $('#point-del').show();
        $('.del-close').on('click',function(){
            $('#point-del').hide();
        });
        return;
    }
    //如果是要删除 拆分列的时候  需要修改  col_source_split num  信息
    for(var tmpv in col_source_split){
        var tmpJson=col_source_split[tmpv];
        if(tmpJson[text_]){
            tmpJson["num"]=tmpJson["num"]-1;//修改原始列 基础之上拆分了好多列
            break;
        }
    }
    delete json_col_type_split[text_];//删除
    var tmp=new Array();
    $(tabcols_).each(function(index,el){
        if(el['name']!=text_){
            tmp.push(tabcols_[index]);
        }
    });
    tabcols_=tmp;//重新赋值
    var splitinfoStr="";//删除已列的时候需要重新构建，这个分割列字符串的哦
    $(tmp).each(function(index,el){
        if(el['split']){
            if(splitinfoStr!=""){
                splitinfoStr+="-1"+el["original"]+":"+el["count_col"]+":"+el["delim"];
            }
            else{
                splitinfoStr+=el["original"]+":"+el["count_col"]+":"+el["delim"];
            }
        }
    });
    $("#splitNameId").val(splitinfoStr);
    dataTableInstance_.fnSetColumnVis(index,false,false);
    var sqlanme_=mergeSqlStr(tabcols_);
    $("#sqlNmeId").val(sqlanme_);//重新构建tableview的sql语句
    delete splitnameinfo[text_];
};

//添加表頭
function drawTableHeader(){
    var table=[];
    table.push('<table id="table_id_example" class="table table-striped table-bordered hover" >');
    table.push('<thead>');
    table.push('<tr>');
    $(tabcols_).each(function(index,el){
        table.push('<th>');
        table.push(el['name']);
        table.push('</th>');
    });
    table.push('</tr>');
    table.push('</thead>');
    table.push('</table>');
    $(table.join("")).appendTo($("#tabDivId"));
}

//这里需要保存拆分的原始列，为 了以后删除做好准备，如果删除列 涉及到拆分的话是不能删除的哦
// {"name":{
// 			"name_1":1
// 		}
// }
col_source_split={};
//拆分列的时候 确认的时候 触发事件的
function sureSplit(){
    var splitName=new_splitName;
    var count_col=$("#count_col_id").val();
    var del=$("#split_del_id").val()?$("#split_del_id").val():",";
    if(splitnameinfo[splitName+"_"+count_col]){//已经分隔的列不能再分了
        $('#myModal').modal('hide');
        $('#notSplit').show();
        $('.split-close').on('click',function(){
            $('#notSplit').hide();
        });
        return ;
    }
    var new_split_colum={
        "alias":splitName+"_"+count_col,
        "asName":splitName+"_"+count_col,
        "measure":1,
        "name":splitName+"_"+count_col,
        "type": "varchar",
        "split":true,
        "delim":del,
        "count_col":count_col,
        "original":splitName
    };

    var tmpVal=splitName+":"+count_col+":"+del;
    $("#splitNameId").val($("#splitNameId").val()==""?tmpVal:$("#splitNameId").val()+"-1"+tmpVal);
    //相当于插入排序
    for(var index=tabcols_.length-1;index>global_index;index--){
        tabcols_[index+1]=tabcols_[index];
    }
    tabcols_[index+1]=new_split_colum;
    json_col_type_split[splitName+"_"+count_col]='split';//如果 列已经拆分 这在也不能被拆分了
    $('#myModal').modal('hide');
    dataTableInstance_.fnDestroy(true);
    drawTableHeader();
    dataTableInstance_=initDataTable_();
    splitnameinfo[splitName+"_"+count_col]=true;
    var tmpjson=col_source_split[splitName];
    if(!tmpjson){
        tmpjson={};
        col_source_split[splitName]=tmpjson;
        tmpjson["num"]=0;
    }
    tmpjson[splitName+"_"+count_col]=1;
    tmpjson["num"]=tmpjson["num"]+1;
}

//设置 需要拆分的列
function setSplitColName(obj,index){
    new_splitName=obj;
    global_index=index;
}

//生成datatable的 columns 选项
function generateColumns(){
    var columns=[];
    $(tabcols_).each(function(index,el){
        var json={};
        json["data"]=el['name'];
        columns.push(json);
    });
    return columns;
}
$("#back_id_").unbind("click");
$("#back_id_").bind("click",function(){
    $("#back_form_id_").attr("action",getConfig().back);
    $("#back_form_id_").submit();
});