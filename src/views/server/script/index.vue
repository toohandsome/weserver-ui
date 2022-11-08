<template>
  <div class="webserver-container">
    <el-button size="small" @click="dialogVisible = true"> 新建 </el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="列表">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange"
          @select="handleSelection" @select-all="handleSelectionselectall" size="small" row-contextmenu="rowContextmenu"
          row-dblclick="rowDblclick">
          <el-table-column type="selection" width="55" />
          <el-table-column property="name" label="名称" sortable>
          </el-table-column>
          <el-table-column property="type" label="类型" width="150" sortable />
          <el-table-column property="repeat" label="循环次数" width="150" />
          <el-table-column property="cron" label="周期" width="150" />
          <el-table-column property="nextTime" label="下次执行时间" width="240" sortable />
          <el-table-column property="remark" label="备注" show-overflow-tooltip />
          <el-table-column label="操作" align="right">

            <template #default="scope">
              <el-button-group>
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" @click="handleRun(scope.$index, scope.row)">运行</el-button>
                <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>

        </el-table>

      </el-tab-pane>
      <el-tab-pane label="命令">telnet,curl,wget,</el-tab-pane>
      <el-tab-pane label="jdk">jdk</el-tab-pane>
      <el-tab-pane label="python">python</el-tab-pane>
      <el-tab-pane label="node">node</el-tab-pane>
    </el-tabs>
    <el-dialog draggable v-model="dialogVisible" width="50%"  >
      <el-form :model="form" label-width="120px">
        <el-form-item label="脚本名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="脚本类型">
          <el-select v-model="form.type" placeholder="选择类型">
            <el-option label="shell" value="shell" />
            <el-option label="python" value="python" />
            <el-option label="js" value="js" />
          </el-select>
        </el-form-item>
        <el-form-item label="脚本内容">
          <el-input v-model="form.scriptText" type="textarea" />
        </el-form-item>
        <el-form-item label="参数">
          <el-input v-model="form.param" />
        </el-form-item>
        <el-form-item label="循环次数">
          <el-input-number v-model="form.repeat" :min="1" />
        </el-form-item>
        <el-form-item label="运行周期">
          <el-input v-model="form.cron" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
const dialogVisible = ref(false)

// do not use same name with ref
const form = reactive({
  name: '',
  scriptText: '',
  repeat: 1,
  cron: '',
  remark: "",
  type: "shell",
  param:""
})
const tableData = [
  {
    name: '数据库备份',
    type: 'shell 脚本',
    repeat: 1,
    cron: '30 * * * *',
    nextTime: '2022-10-06 00:30:00',
    remark: '备份所有数据库'
  },
  {
    name: '数据库备份',
    type: 'shell 脚本',
    repeat: 5,
    cron: '30 * * * *',
    nextTime: '2022-10-06 00:30:00',
    remark: '备份所有数据库'
  },
  {
    name: '数据库备份',
    type: 'shell 脚本',
    repeat: 6,
    cron: '30 * * * *',
    nextTime: '2022-10-06 00:30:00',
    remark: '备份所有数据库'
  }
]


function handleEdit(i, row) {
  console.log(i, row);
  dialogVisible.value =true;
}
function handleDel(i, row) {
  console.log(i, row);
  
}
function handleRun(i, row) {
  console.log(i, row);
  
}
function onSubmit( ) {
  console.log("onSubmit");
}

</script>
