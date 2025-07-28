<template>
   <div>
      <n-tree     
      block-line
      :data="treeData"  
      virtual-scroll
      style="height: 90vh;"
      key-field="id"
      label-field="text"
      :default-expanded-keys="defaultExpandedKeys"
      :default-selected-keys="[9]"
      @update:selected-keys="fn"
    />
   </div>
</template>
<script setup>
import { onBeforeMount } from 'vue'
import { request } from '@/api/request'
let emit=defineEmits(['handleFn'])
let fn=(keys)=>{ 
    emit("handleFn", keys[0])
}
const treeData=ref([]); //这块不能是null 会报错
let defaultExpandedKeys=ref([9,91,94])
onBeforeMount(()=>{     
    request.get("/api/gettreedata").then((res)=>{  
        console.log(res);
          
        if(res.msg=='OK'){
            treeData.value=res.data      
        }
       
    }).catch(err=>console.log(err))
})
</script>