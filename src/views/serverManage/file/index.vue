<template>
   <div class="app-container">
      <div>
         <el-input v-model="inputPath" @focus="pathInputFocus" @blur="pathInputBlue">
            <template #prepend>

               <el-button :icon="CaretLeft" @click="backClick" @mouseenter="backMouseenter" @mouseout="backMouseout"
                  :type="backType" />
            </template>
            <template #prefix>
               <!-- <el-button-group> -->
               <div v-for="(path, i) in pathArr" :key="i" class="pathButGroup">
                  <el-button @click="backClick" width="100px" :type="backType" :v-show="showPathBut">
                     {{path}}
                  </el-button>
                  <el-button @click="backClick" width="5px" :icon="ArrowRight">
                  </el-button>
               </div>
               <!-- </el-button-group> -->



            </template>
            <template #append>
               <el-button :icon="Refresh" />
            </template>

         </el-input>
      </div>
   </div>
</template>

<script setup name="Online">
import { list as initData } from "@/api/monitor/online";
import { ArrowRight, CaretLeft, Refresh } from '@element-plus/icons-vue';
const { proxy } = getCurrentInstance();

const onlineList = ref([]);
const loading = ref(true);
var showPathBut = true;
const total = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const inputPath = ref("/root/abc/123/nnn");
var backType = ref("");
const queryParams = ref({
   ipaddr: undefined,
   userName: undefined
});
var pathArr = ["\xa0\xa0根目录", "root", "abc", "123", "nnn"];
/** 查询登录日志列表 */
function getList() {
   loading.value = true;
   initData(queryParams.value).then(response => {
      onlineList.value = response.rows;
      total.value = response.total;
      loading.value = false;
   });
}
function backClick() {
   console.log("back");
}
function backMouseenter() {
   console.log("鼠标划入");
   backType = "primary"
}
function backMouseout() {
   console.log("按钮松开");
   backType = "default"
}
function pathInputFocus() {
   console.log("pathInputFocus");
   showPathBut = false;
}
function pathInputBlue() {
   console.log("pathInputBlue");
   showPathBut = true;
}
</script>
<style lang='scss' scoped>
.pathButGroup .el-button {
   margin-left: 0px;
   border-radius: 0px;
   padding: 2px;
   border:0.5px;
   background-color: #f5f7fa;
   margin-top: 1.5px;
   height: 29.5px;
   // border: 0px;
}
::v-deep .el-input__prefix{
   transform: translateX(35px) !important;
}


// .input-with-select .el-input-group__prepend {
//   background-color: var(--el-fill-color-blank);
// }
// .el-button--backType.is-active,
// .el-button--backType:active {
//   background: #20B2AA;
//   border-color: #20B2AA;
//   color: #fff;
// }

// .el-button--backType:focus,
// .el-button--backType:hover {
//   background: #48D1CC;
//   border-color: #48D1CC;
//   color: #fff;
// }

// .el-button--backType {
//   color: #FFF;
//   background-color: #20B2AA;
//   border-color: #20B2AA;
// }
</style>