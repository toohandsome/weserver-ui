<template>
  <div class="webserver-container">

    <el-tabs type="border-card">
      <el-tab-pane label="服务概况">info</el-tab-pane>
      <el-tab-pane label="镜像">images</el-tab-pane>
      <el-tab-pane label="容器">container</el-tab-pane>
      <el-tab-pane label="网络">network</el-tab-pane>
      <el-tab-pane label="挂载卷">volumes</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>

const server = ref([]);
const { proxy } = getCurrentInstance();




</script>
