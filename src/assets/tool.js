function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    CSV += ReportTitle + '\r\n\n';
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            row += index + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }
    //Generate a file name  
    var fileName = "";
    fileName += ReportTitle.replace(/ /g, "_");
    var uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(CSV); //解决导出乱码的问题
    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
function rawExcel(data,columns) {
    var tmp = [];
    var text = getText(columns);
    var keys = Object.keys(text); //获取对象键值的方法
    for (var i = 0; i < data.length; i++) {
        var sub = {};
        for (var j = 0; j < keys.length; j++) {
            if (text[keys[j]]) {
                sub[text[keys[j]]] = data[i][keys[j]];
            }
        }
        tmp.push(sub);
    }  
    return tmp;
}
//根据columns整理对应关系
function getText(columns) {
    var s={};
    for(var i=0;i<columns.length;i++){
        if(!columns[i]['children']){
            s[columns[i]['key']]=columns[i]['title'];
        }else {
            var a=columns[i]['children'];
             for(var j=0;j<a.length;j++){
                s[a[j]['key']]=a[j]['title'];
             }
        }
    }
    return s;
}
// 解析活动中的开始时间和结束时间
function getActTimes(actname){
  let startIndex = actname.indexOf('(');
  let endIndex = actname.indexOf(')');
  let s = actname.slice(startIndex + 1, endIndex);
  let arr = s.split('到');
  return arr
}
export {
    JSONToCSVConvertor,rawExcel,getActTimes
}
