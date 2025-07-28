<script setup>
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from "naive-ui";
</script>
<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
    <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>