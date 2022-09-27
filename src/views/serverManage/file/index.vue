<template>
   <div class="app-container">
      <FileTop></FileTop>
      <el-divider />
      <div style="display:flex;width: 100%;margin-bottom: 5px;    margin-top: -10px;">
         <div style="width: 70%;">
            <el-button @click="dialogUploadVisible = true"> 上传 </el-button>
            <el-dropdown>
               <el-button >
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

            <el-button-group style="    float: right;">
               <el-button v-show="showPasteOpt"  @click="handlePaste">粘贴</el-button>
               <el-button v-show="showBatchOpt">复制</el-button>
               <el-button v-show="showBatchOpt">剪切</el-button>
               <el-button v-show="showBatchOpt">压缩</el-button>
               <el-button v-show="showBatchOpt">权限</el-button>
               <el-button v-show="showBatchOpt">删除</el-button>
               <el-button type="primary" :icon="ArrowLeft">图标模式</el-button>
               <el-button type="primary">
                  列表模式
               </el-button>
            </el-button-group>
         </div>
      </div>
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
         @select="handleSelection" @select-all="handleSelectionselectall" size="small" row-contextmenu="rowContextmenu"
         row-dblclick="rowDblclick">
         <el-table-column type="selection" width="55" />
         <el-table-column property="fileName" label="文件名" show-overflow-tooltip sortable>
         </el-table-column>
         <el-table-column property="upTime" label="修改时间" width="240" sortable />
         <el-table-column property="type" label="类型" width="150" sortable />
         <el-table-column property="size" label="大小" width="150" sortable />
         <el-table-column property="onwer" label="所有者/权限" width="150" sortable />
         <el-table-column label="操作" align="right">

            <template #default="scope">
               <el-button-group>
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">打开</el-button>

                  <el-dropdown>
                     <el-button   size="small"  @click="handleCopy(scope.$index, scope.row)">
                        复制
                        <el-icon class="el-icon--right">
                           <arrow-down />
                        </el-icon>
                     </el-button>
                     <template #dropdown>
                        <el-dropdown-menu>
                           <el-dropdown-item @click="handleCut(scope.$index, scope.row)">剪切</el-dropdown-item>
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

       <div style="    float: right;margin-top: 10px">
         <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4"
            :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" background
            layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange" />
      </div>

      <el-dialog v-model="dialogUploadVisible" title="上传" draggable>

         <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            multiple style="width: 100%;">
            <el-icon class="el-icon--upload">
               <upload-filled />
            </el-icon>
            <div class="el-upload__text">
               拖动到此处 或 <em>点击 上传</em>
            </div>
            <!-- <template #tip>
            <div class="el-upload__tip">
               jpg/png files with a size less than 500kb
            </div>
         </template> -->
         </el-upload>

      </el-dialog>

   </div>
</template>
 

<script>
import { Search } from '@element-plus/icons-vue';
import FileUpload from '../../../components/FileUpload/index.vue';
export default {
   data() {
      return {
         pathArr: ["  根目录", "root", "abc", "123", "nnn"],
         showPathBut: true,
         search:Search,
         backType: "",
         inputPath: "/root/abc/123/nnn",
         
         searchPath: "",
         showBatchOpt: false,
         showPasteOpt:false,
         dialogUploadVisible: false,
         tableData: [
            {
               "fileName": "1.txt",
               "onwer": "755/root",
               "size": "9.65 KB",
               "type": "txt",
               "upTime": "2020-01-01 09:23:22"
            },
            {
               "fileName": "YXD-LOG.txt",
               "onwer": "777/root",
               "size": "109 MB",
               "type": "txt",
               "upTime": "2022-11-11 23:46:52"
            },
            {
               "fileName": "wps.exe",
               "onwer": "755/root",
               "size": "145 MB",
               "type": "exe",
               "upTime": "2022-05-08 19:32:27"
            }
         ]
      };
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
      
      backMouseenter() {
         console.log("鼠标划入");
         this.backType = "primary";
      },
      backMouseout() {
         console.log("按钮松开");
         this.backType = "default";
      },
      handlePageSizeChange() {
         console.log("handlePageSizeChange");
      },
      handleSelectionChange() {
         console.log("handleSelectionChange");
         let arr = this.$refs.multipleTableRef.getSelectionRows()
         if (arr && arr.length == 0) {
            this.showBatchOpt = false;
         } else {
            this.showBatchOpt = true;
         }


      },
      handleSelection() {
         this.showBatchOpt = true;
         console.log("handleSelection");
      },
      handleSelectionselectall() {

         console.log("handleSelectionselectall");
         let arr = this.$refs.multipleTableRef.getSelectionRows()
         if (arr && arr.length == 0) {
            this.showBatchOpt = false;
         } else {
            this.showBatchOpt = true;
         }
      },
      handleCopy(){
         console.log("handleCopy");
         this.showPasteOpt = true;
      },
      handleCut(){
         console.log("handleCut");
         this.showPasteOpt = true;
      },
      handlePaste(){
         console.log("handlePaste");
         this.showPasteOpt = false;
      }
   },
   components: { FileUpload }
}
</script>

<style lang='scss' scoped>
:deep .el-dialog__body {
   display: flex;
   justify-content: center;
   align-items: center;
}

:deep .el-upload-dragger {
   width: 100%;
}

:deep .el-upload {
   width: 100%;
}

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