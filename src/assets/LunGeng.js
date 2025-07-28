


let unitSets = reactive([
	{
		value: 1,
		label: '地区'
	},
	{
		value: 2,
		label: '中心'
	},
	{
		value: 3,
		label: '部门'
	}, {
		value: 4,
		label: '个人'
	}
]);

var columns = [{
	key: 'RowId',
	title: '序号',
	width: 60
},
{
	key: 'UnitId',
	title: 'ID',
	width: 120,
	sorter:true,
	titleAlign: "center"
}, {
	key: 'UnitName',
	title: '名称',
	sorter:true,
	titleAlign: "center",
	width: 150
} , {
	key: 'avgPerson',
	title: '平均人数',
	width: 120,
	sorter:true,
	align: 'right',
	titleAlign: 'center'
} , {
	key: 'fxh',
	title: '指标集合',
	titleAlign: 'center',
	children: [
		{ key: 'sourceNum', title: 'A', width: 120, align: 'right', titleAlign: "center" ,sorter:true},
		{ key: 'SmallTransIsNewRate', title: 'B', width: 150, align: 'right', titleAlign: "center",sorter:true },
		{ key: 'prcess', title: 'C', width: 120, align: 'right', titleAlign: "center",sorter:true },
		{ key: 'ALLOC_CallNum', title: 'D', width: 120, align: 'right', titleAlign: "center",sorter:true },
		{ key: 'ALLOC_CallNumRate', title: 'E', width: 120, align: 'right', titleAlign: "center",sorter:true },
		{ key: 'ALLOC_CallNumValid', title: 'F', width: 150, align: 'right', titleAlign: "center" ,sorter:true},
		{ key: 'ALLOC_CallNumValidRate', title: 'G', width: 150, align: 'right', titleAlign: "center" ,sorter:true}
	]
}];
 
var columns1 = columns.concat();
columns1.splice(3, 0, {
	key: 'deptName',
	title: '部门',
	width:150,
	titleAlign: 'center'
})

export {
	columns, columns1, unitSets
}