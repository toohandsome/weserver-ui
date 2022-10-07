<template>
  <div class="webserver-container">
    <el-tabs type="border-card">
      <el-tab-pane label="服务">服务</el-tab-pane>
      <el-tab-pane label="定时任务">定时任务</el-tab-pane>
      <el-tab-pane label="网卡">网卡</el-tab-pane>
      <el-tab-pane label="时间">时间</el-tab-pane>
      <el-tab-pane label="扩容">扩容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>

const server = ref([]);
const { proxy } = getCurrentInstance();




</script>
