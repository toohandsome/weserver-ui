<template>
   <div class="app-container">
       <FileTop></FileTop>
   </div>
</template>
 

<script>
import { list as initData } from "@/api/monitor/online";
import { ArrowRight, CaretLeft, Refresh } from '@element-plus/icons-vue';
import FileTop from '@/components/FileTop'
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
         searchPath:"",
         
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
.pathButGroup .el-button {
   margin-left: 0px;
   border-radius: 0px;
   padding: 2px;
   border: 0.5px;
   background-color: #f5f7fa;
   margin-top: 1.5px;
   height: 29.5px;
   // border: 0px;
}


:deep .el-input__prefix {
   transform: translateX(35px) !important;
}

:deep .el-input__inner {
   padding-left: 6px !important;
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