<!--日志-->
<template>
   <div class="xterm-container">
      <XTerm :data="logtermdata" type="log" ref="logxterm" class="term" :width="width"></XTerm>
   </div>
   <el-dialog v-model="visible" title="终端" width="800px">
      <div class="xterm-container">
         <XTerm v-if="termVisible" type="shell" ref="shellterm" class="term" :width="width" :url="websocketUrl"></XTerm>
      </div>
   </el-dialog>
</template>
<script>
import {  ref } from "vue"
import XTerm from '../../../components/xterm/index.vue';
export default {
   setup() {
      const width = ref(500)
      const visible = ref(false)
      const logxterm = ref(null)
      function open() {
         visible.value = true;
         nextTick(() => {
            //计算宽度
            width.value = document.getElementsByClassName("term")[0].offsetWidth;
            //初始化
            logxterm.value.initTerm();
         });
      }
      return {
         width,
         visible,
         logxterm,
         open
      }
   },
   components: {
      XTerm,
   }
}
</script>