<template>
  <div style="height: 100vh; position: relative">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px; padding:24px  " bordered>
        <n-form ref="formRef" inline :label-width="auto" :model="formValue" size="small" label-placement="left">
          <n-form-item label="活动列表" path="name">
            <n-select v-model:value="formValue.actId" :options="options" label-field="ActName" value-field="ActId"
              style="width: 300px;" @update:value="changeSelect" />
          </n-form-item>
          <n-form-item label="日期范围" path="age">
            <n-date-picker v-model:value="formValue.timeRange" type="daterange" style="width: 300px;" />
          </n-form-item>
          <n-form-item label="统计范围">
            <n-radio-group v-model:value="formValue.mode" @update:value="handleChange">
              <n-space>
                <n-radio v-for="song in unitSets" :key="song.value" :value="song.value">
                  {{ song.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item>
            <n-button attr-type="button" @click="getData" type="primary" style="width: 100px;"> {{ btnText }}</n-button>
          </n-form-item>
        </n-form>
        <n-button style="position: absolute; right:10px;top:25px" size="small" type="warning"
          @click="downloadCsv">下载CSV</n-button>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px;">
        <n-layout-sider bordered content-style="padding: 5px,0; " :collapsed-width="10" show-trigger="arrow-circle">
          <StaffTree v-once  @handle-fn="getDepartId" />
        </n-layout-sider>
        <n-layout content-style="padding: 5px;">
          <n-pagination v-bind="pagination" style="float: right;" />
          <n-data-table :columns="columns" :data="Tdata.data" :bordered="false" size="small" ref="tableRef"
            :row-class-name="changeClass" :loading="Tdata.loading" :single-line="false" flex-height
            :style="{ height: wheight + 'px' }" @update:sorter="handleSorterChange">
          </n-data-table>
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>
<script setup>
import StaffTree from "./StaffTree.vue"
import { request } from '@/api/request'
import { columns as cols, columns1 as cols1, unitSets } from '../assets/LunGeng'
import { JSONToCSVConvertor, rawExcel, getActTimes } from '@/assets/tool.js'
import axios from 'axios';
let controller;
const tableRef = ref();
let btnText = ref('查询');
let wheight = ref(null);  // 表格的高度
let treeId = ref(9);
let options = ref([]);
let columns = ref(cols)

//查询项
let formValue = ref({
  actId: '',
  timeRange: null, //不能是空数组
  mode: 2,
  start: 1,
  end: 50,
  sort: '',
  order: ''
});

//数据表格
let Tdata = ref({
  loading: false,
  data: [], //一定要是数组类型
  total: 0
})

//获取树的id
let getDepartId = (departId) => {
  treeId.value = departId
}
const changeSelect = (value, option) => {
  let actName = option['ActName'];
  formValue.value.timeRange = getActTimes(actName);
}
const downloadCsv = () => {
  JSONToCSVConvertor(rawExcel(Tdata.value.data, cols1), '测试数据', true)
};
 
//radio事件
let handleChange = (val) => {
  formValue.value.mode = val;
  Tdata.value.data = [];
  if (val == 4) {
    columns.value = cols1;
  } else {
    columns.value = cols;
  }
}

//列的变化
let changeClass = (rowdata, i) => {
  if (rowdata.RowId === '-1') {
    return "sumbg";
  }
}
//sort排序
let handleSorterChange = (options) => {
  formValue.value.sort = options.columnKey;
  formValue.value.order = options.order == 'descend' ? 'desc' : 'asc';
  getData();
}


let pagination = reactive({
  page: 1, //受控模式下的当前页
  pageSize: 50, //受控模式下的分页大小,每一页的数据大小
  pageSizes: [50, 100, 200, 1000], //pagesizes
  showSizePicker: true, //pagesize
  itemCount: 0, //总条数
  onUpdatePage: page => { //切换第几页时
    formValue.value.start = (page - 1) * pagination.pageSize + 1;
    formValue.value.end = page * pagination.pageSize;
    pagination.page = page;
    getData();
  },
  onUpdatePageSize: pageSize => {
    //这个时候，pagination.pageSize还是老的
    pagination.pageSize = pageSize;
    pagination.page = 1;
    formValue.value.start = 1;
    formValue.value.end = pageSize;
    getData();
  },
  suffix: function () { //后缀
    return `共 ${pagination.itemCount} 条数据`
  }
})
//获取活动列表
onBeforeMount(() => {
  request.get("/api/users").then(res => {
    if (res.msg == 'OK') {
      options.value = res.data;
      formValue.value.actId = res.data[0]['ActId'];
      formValue.value.timeRange = getActTimes(res.data[0]['ActName']);
    }
  })
  wheight.value = window.innerHeight - 110;
})
//获取主数据
let getData = () => {
  if (btnText.value == '查询') {
    controller = new AbortController();
    btnText.value = '取消查询'
    Tdata.value.loading = true;
    request.get("/api/getdata", {
      signal: controller.signal,
      params: {
        startDate: formValue.value.timeRange[0].replace(/-/gi, ''),
        endDate: formValue.value.timeRange[1].replace(/-/gi, ''),
        actId: formValue.value.actId,
        mode: formValue.value.mode,
        unitId: treeId.value,
        start: formValue.value.start,
        end: formValue.value.end,
        sort: formValue.value.sort,
        order: formValue.value.order
      }
    }).then(res => {
      if (res.msg == 'OK') {
        Tdata.value.loading = false
        Tdata.value.data = res.rows;
        pagination.itemCount = res.total;
        btnText.value = '查询'
      }
    }).catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        btnText.value = '查询'
        Tdata.value.loading = false
        console.log('Request canceled', thrown.message);
      }
    })
  }
  else {
    btnText.value = '查询'
    controller.abort()
  }
}
</script>
<style scoped>
  :deep(.sumbg td) {
    color: blue;
  }
/*
:deep() 是一个深度选择器，用于穿透组件的样式隔离。
:deep() 是 Vue 3 引入的语法，在 Vue 2 中需要使用 /deep/ 或 >>>，不过这两种在某些预处理器（如 Sass、Less）中可能不被支持。
*/
</style>
