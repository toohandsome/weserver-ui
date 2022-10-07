<template>
  <div class="webserver-container">

    <el-tabs type="border-card">
      <el-tab-pane label="iptables">iptables</el-tab-pane>
      <el-tab-pane label="命令">telnet,curl,wget,</el-tab-pane>
      <el-tab-pane label="jdk">jdk</el-tab-pane>
      <el-tab-pane label="python">python</el-tab-pane>
      <el-tab-pane label="node">node</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>

const server = ref([]);
const { proxy } = getCurrentInstance();




</script>
