import mockJs from "mockjs"
const userList=mockJs.mock({
    'maindata|50':[{
         "ALLOC_CallNum": '@integer(50, 200)',
         "ALLOC_CallNumRate": "@float(1, 100, 2, 2)",
         "ALLOC_CallNumValid": "@integer(1, 50)",
        'ALLOC_CallNumValidRate': "@float(1, 100, 2, 2)"
        ,'Class_Today_B3': "@integer(1, 50)"
        ,'Goal': "@float(1, 100, 2, 2)"
        ,'NewTransNum': "@integer(1, 50)"
        ,'NowValue': "@integer(1, 50)"
        ,'RowId|+1': 1 //自增的写法
        ,'SmallTransIsNewRate': "@float(1, 100, 2, 2)"
        ,'UnitId': '@integer(1500, 5000)'
        ,'UnitName': "@ctitle"
        ,'avgCallNum': "@float(1, 100, 2, 2)"
        ,'avgClass_B1_Change': "@float(1, 100, 2, 2)"
        ,'avgClass_B_Change': "@float(1, 100, 2, 2)"
        ,'avgNewTransNum': "@float(1, 100, 2, 2)"
        ,'avgNowPersonNum': "@float(1, 100, 2, 2)"
        ,'avgPerson': "@float(1, 100, 2, 2)"
        ,'avgResourceNum': "@float(1, 100, 2, 2)"
        ,'avgSumHold': "@float(1, 100, 2, 2)"
        ,'b1Rate': "@float(1, 100, 2, 2)"
        ,'call_7dayRate': "@float(1, 100, 2, 2)"
        ,'deptName': "@ctitle"
        ,'gkeeperid': -1
        ,'orderNum': "@integer(100, 300)"
        ,'prcess': "@float(1, 100, 2, 2)"
        ,'sourceNum': "@integer(100, 500)" 
    }]
})

let treeData=[{
     id: 9, 
     text: '地区一',
     children:[    
        { 
             id: 91, 
             text: '中心一',
             children:[              
              {id: 21, text: '部门一'},
              {id: 22, text: '部门二'},
              {id: 23, text: '部门三'},
              {id: 24, text: '部门四'},
              {id: 25, text: '部门五'},
              {id: 26, text: '部门六'}
             ]
        },
        {
            id: 91, text: '中心二',
              children:[              
              {id: 27, text: '部门七'},
              {id: 28, text: '部门八'},
              {id: 29, text: '部门九'},
              {id: 30, text: '部门十'},
              {id: 31, text: '部门十一'},
              {id: 32, text: '部门十二'}
             ]

        }
     ]

}];

let actdata=[
    {
        ActId:287,
        ActName:'活动一(2025-01-02到2025-02-05)'
    },
     {
        ActId:241,
        ActName:'活动二(2025-03-02到2025-05-05)'
    }
]


export default [
    {
        method:"get",
        url:'/api/users',
        response:(body)=>{
           return {
            code:200,
            msg:'OK',
            data:actdata
           }
        }
    },
     {
        method:"get",
        url:'/api/getdata',
        response:(body)=>{
           console.log(body.query);
           return {
            code:200,
            msg:'OK',
            rows:userList.maindata,
            total:50
           }
        }
    },{
        method:'get',
        url:'/api/gettreedata',
        response:(body)=>{
            return {
                code:200,
                msg:'OK',
                data:treeData
            }
        }
    }
]