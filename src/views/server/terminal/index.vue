<!--日志-->
<template>
   <div class="webserver-container">
      <div>
         <el-dropdown size="small">
            <el-button size="small" type="primary">
               深圳<el-icon class="el-icon--right">
                  <arrow-down />
               </el-icon>
            </el-button>
            <template #dropdown>
               <el-dropdown-menu>
                  <el-dropdown-item>机器 1</el-dropdown-item>
                  <el-dropdown-item>机器 2</el-dropdown-item>
                  <el-dropdown-item>机器 3</el-dropdown-item>
                  <el-dropdown-item>机器 4</el-dropdown-item>
                  <el-dropdown-item>机器 5</el-dropdown-item>
               </el-dropdown-menu>
            </template>
         </el-dropdown>
         <el-button size="small" @click="visible = true"> 临时终端 </el-button>
         <el-button size="small" @click="visible = true"> 文件 </el-button>
         
         <el-button size="small"> 香港4H8G </el-button>
         <el-button size="small"> centos </el-button>
         <el-button size="small"> Ubuntu </el-button>
         <el-button size="small"> raspberry </el-button>

         
      </div>

      <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
         <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            {{ item.content }}
         </el-tab-pane>
      </el-tabs>

      <div class="xterm-container term">
         <XTerm type="shell" ref="shellterm" :width="width" :url="websocketUrl">
         </XTerm>
      </div>
      <div style="padding-top: 5px;">
         <el-button type="info" disabled size="small"> 快捷命令 </el-button>
         <el-button size="small"> ps java </el-button>
         <el-button size="small"> ps nginx </el-button>
         <el-button size="small"> kill reids </el-button>
         <el-button size="small"> restart webserve </el-button>
      </div>
   </div>
</template>
<script>
import { ref } from "vue";
import XTerm from '../../../components/xterm/index.vue';
export default {
   setup() {
      // window.getComputedStyle(document.querySelector("#app")).fontSize
      const width = ref(500)
      const websocketUrl = ref("http://127.0.0.1:8080/webssh")
      const visible = ref(false)
      const termVisible = ref(true)
      const logxterm = ref(null)
      console.log("term", document.getElementsByClassName("term").length);
      // width.value = document.getElementsByClassName("term")[0].offsetWidth;
      //       console.log(width.value );
      let tabIndex = 2
      const editableTabsValue = ref('2')
      function open() {
         visible.value = true;
         termVisible.value = true;
         nextTick(() => {
            //计算宽度
            width.value = document.getElementsByClassName("term")[0].offsetWidth;
            console.log(width.value);
            //初始化
            logxterm.value.initTerm();
         });

      }

      const editableTabs = ref([
         {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content',
         },
         {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content',
         },
      ])
      const handleTabsEdit = (targetName, action) => {
         if (action === 'add') {
            const newTabName = `${++tabIndex}`
            editableTabs.value.push({
               title: 'New Tab',
               name: newTabName,
               content: 'New Tab content',
            })
            editableTabsValue.value = newTabName
         } else if (action === 'remove') {
            const tabs = editableTabs.value
            let activeName = editableTabsValue.value
            if (activeName === targetName) {
               tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                     const nextTab = tabs[index + 1] || tabs[index - 1]
                     if (nextTab) {
                        activeName = nextTab.name
                     }
                  }
               })
            }

            editableTabsValue.value = activeName
            editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
         }
      }

      // window.onkeydown = function (e) {
      //    console.log('e.keyCode :'+e.keyCode )  
      //    // tab
      //    if (e.keyCode==9) {     


      //    } 
      // }


      return {
         width,
         visible,
         logxterm,
         open,
         websocketUrl,
         editableTabs,
         handleTabsEdit,
         editableTabsValue
      }
   },
   components: {
      XTerm,
   }
}
</script>
<style scoped>
:deep .el-button--small {
   margin-right: -5px;
   padding-right: 1px;
   padding-left: 1px;
}
</style>
