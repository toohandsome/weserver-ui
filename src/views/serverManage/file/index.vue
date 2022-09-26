<template>
   <div class="app-container">
      <FileTop></FileTop>
      <el-divider />
      <div style="display:flex;width: 100%;">
         <div style="width: 70%;margin-bottom: 5px;    margin-top: -10px;">
            <el-button> 上传 </el-button>
            <el-dropdown>
               <el-button :icon="search">
                  新建
                  <el-icon class="el-icon--right">
                     <arrow-down />
                  </el-icon>
               </el-button>
               <template #dropdown>
                  <el-dropdown-menu>
                     <el-dropdown-item>文件</el-dropdown-item>
                     <el-dropdown-item>文件夹</el-dropdown-item>
                  </el-dropdown-menu>
               </template>
            </el-dropdown>
            <el-button> 终端 </el-button>
         </div>
         <div style="width: 30%; ">
            <el-button-group>
               <el-button type="primary" :icon="ArrowLeft">图标模式</el-button>
               <el-button type="primary">
                  列表模式  
               </el-button>
            </el-button-group>
         </div>
      </div>
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55" />
         <el-table-column property="fileName" label="文件名" show-overflow-tooltip>
         </el-table-column>
         <el-table-column property="onwer" label="所有者/权限" width="150" />
         <el-table-column property="size" label="大小" width="150" />
         <el-table-column property="upTime" label="修改时间" width="240" />
         <el-table-column label="操作" align="right">

            <template #default="scope">
               <el-button-group>
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">打开</el-button>

                  <el-dropdown>
                     <el-button :icon="search" size="small">
                        复制
                        <el-icon class="el-icon--right">
                           <arrow-down />
                        </el-icon>
                     </el-button>
                     <template #dropdown>
                        <el-dropdown-menu>
                           <el-dropdown-item>剪切</el-dropdown-item>
                           <el-dropdown-item>重命名</el-dropdown-item>
                           <el-dropdown-item type="danger">删除</el-dropdown-item>
                           <el-dropdown-item type="danger">压缩</el-dropdown-item>
                        </el-dropdown-menu>
                     </template>
                  </el-dropdown>


                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">下载</el-button>

                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">属性</el-button>

               </el-button-group>
            </template>

         </el-table-column>

      </el-table>

       <div class="block">
         <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" background
            layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
      </div>

   </div>
</template>
 

<script>
import { ArrowRight, CaretLeft, Refresh } from '@element-plus/icons-vue';
export default {
   data() {
      return {
         pathArr: ["\xa0\xa0根目录", "root", "abc", "123", "nnn"],
         showPathBut: true,
         backType: '',
         inputPath: "/root/abc/123/nnn",
         arrowRight: ArrowRight,
         caretLeft: CaretLeft,
         refresh: Refresh,
         searchPath: "",
         tableData: [
            {
               "fileName": "1.txt",
               "onwer": "755/root",
               "size": "9.65 KB",
               "upTime": "2020-01-01 09:23:22"
            },
            {
               "fileName": "YXD-LOG.txt",
               "onwer": "777/root",
               "size": "109 MB",
               "upTime": "2022-11-11 23:46:52"
            },
            {
               "fileName": "wps.exe",
               "onwer": "755/root",
               "size": "145 MB",
               "upTime": "2022-05-08 19:32:27"
            }
         ]
      }
   },
   methods: {
      pathInputFocus() {
         this.showPathBut = false;
         console.log("pathInputFocus", this.showPathBut, this);
      },
      pathInputBlue() {
         this.showPathBut = true;
         console.log("pathInputBlue", this.showPathBut);
      },
      backClick() {
         console.log("back");
      },
      backMouseenter() {
         console.log("鼠标划入");
         this.backType = "primary"
      },
      backMouseout() {
         console.log("按钮松开");
         this.backType = "default"
      }
   }
}
</script>

<style lang='scss' scoped>
// .pathButGroup .el-button {
//    margin-left: 0px;
//    border-radius: 0px;
//    padding: 2px;
//    border: 0.5px;
//    background-color: #f5f7fa;
//    margin-top: 1.5px;
//    height: 29.5px;
//    // border: 0px;
// }


// :deep .el-input__prefix {
//    transform: translateX(35px) !important;
// }

// :deep .el-input__inner {
//    padding-left: 6px !important;
// }


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