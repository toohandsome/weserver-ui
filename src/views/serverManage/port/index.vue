<template>
  <div class="app-container">
     
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
              <el-button v-show="showPasteOpt"  @click="handleStop">结束</el-button>
              
           </el-button-group>
        </div>
     </div>
     <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
        @select="handleSelection" @select-all="handleSelectionselectall" size="small" row-contextmenu="rowContextmenu"
        row-dblclick="rowDblclick">
        <el-table-column type="selection" width="55" />
        <el-table-column property="pid" width="65" label="PID"  sortable>
        </el-table-column>
        <el-table-column property="processName" label="进程"  width="150" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column property="startTime" label="启动时间"  width="150"  sortable />
        <!-- <el-table-column property="runTime" label="运行时间"  sortable /> -->
        <el-table-column property="port" label="端口"  show-overflow-tooltip  width="70"  sortable />
        <el-table-column property="men" label="内存"   width="70"  sortable />
        <el-table-column property="cpu" label="CPU"  width="70"  sortable />
        <el-table-column property="path" label="路径" show-overflow-tooltip  sortable />
        <el-table-column property="cmd" label="cmd" show-overflow-tooltip  sortable />
        <!-- <el-table-column property="onwer" label="文件"  show-overflow-tooltip sortable /> -->
        <el-table-column label="操作" align="right">

           <template #default="scope">
              <el-button-group>
                 <el-button size="small" @click="handleStop(scope.$index, scope.row)">结束</el-button>
                 <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>

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

     <el-table ref="multipleTableRef" :data="portTableData" style="width: 100%" @selection-change="handleSelectionChange"
        @select="handleSelection" @select-all="handleSelectionselectall" size="small" row-contextmenu="rowContextmenu"
        row-dblclick="rowDblclick">
        <el-table-column type="selection" width="55" />
        <el-table-column property="protocol" width="70" label="协议"  sortable>
        </el-table-column>
        <el-table-column property="localAddr" label="本地地址"  width="150" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column property="remoteAddr" label="外部地址"  width="150" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column property="pid" label="PID"  show-overflow-tooltip  width="65"  sortable />
        <el-table-column property="process" label="进程" show-overflow-tooltip   width="150"  sortable />
        <el-table-column property="status" label="状态"  width="100"  sortable />
        <el-table-column property="path" label="路径" show-overflow-tooltip  sortable />
        <!-- <el-table-column property="runTime" label="运行时间"  sortable /> -->
        
        <el-table-column label="操作" align="right">

           <template #default="scope">
              <el-button-group>
                 <el-button size="small" @click="handleStop(scope.$index, scope.row)">结束</el-button>
                 <el-button size="small" @click="handleDetail(scope.$index, scope.row)">详情</el-button>

              </el-button-group>
           </template>

        </el-table-column>

     </el-table>

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
              "pid": "20819",
              "processName": "redis-server",
              "startTime": "2017-09-14 22:11:45",
              "path": "/opt/webserver/middleWare/redis",
              "port": "63791",
              "men":"309 MB",
              "cpu":"15.6%",
              "cmd":"/opt/webserver/middleWare/redis/src/redis-server",
           },
           {
              "pid": "208569",
              "processName": "redis-server",
              "startTime": "2017-09-14 22:11:45",
              "path": "/opt/webserver/middleWare/redis",
              "port": "6379",
              "men":"309 MB",
              "cpu":"15.6%",
              "cmd":"/opt/webserver/middleWare/redis/src/redis-server",
           },
           {
              "pid": "2089",
              "processName": "redis-server",
              "startTime": "2017-09-14 22:11:45",
              "path": "/opt/webserver/middleWare/redis",
              "port": "6379",
              "men":"309 MB",
              "cpu":"15.6%",
              "cmd":"/opt/webserver/middleWare/redis/src/redis-server",
           }
        ],
        portTableData: [
           {
              "protocol": "tcp",
              "localAddr": "127.0.0.1:9877",
              "remoteAddr": "192.168.2.9:27271",
              "pid": "7521",
              "process": "webserver.jar",
              "path":"/opt/webserver/server/webserver.jar",
              "status":"监听"
           },
           {
            "protocol": "tcp",
              "localAddr": "127.0.0.1:9877",
              "remoteAddr": "192.168.2.9:27271",
              "pid": "75211",
              "process": "webserver.jar",
              "path":"/opt/webserver/server/webserver.jar",
              "status":"监听"
           },
           {
            "protocol": "tcp",
              "localAddr": "127.0.0.1:9877",
              "remoteAddr": "192.168.2.9:27271",
              "pid": "752221",
              "process": "webserver.jar",
              "path":"/opt/webserver/server/webserver.jar",
              "status":"监听"
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
 
</style>