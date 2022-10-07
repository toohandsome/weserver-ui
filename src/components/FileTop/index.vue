<template>

  <div style="display:flex;width: 100%;">

    <div style="width: 70%;margin-right: 10px;">

      <div style="display:flex;width: 100%;">
        <div style="width: 76px;">
          <!-- 导航 -->
          <el-button-group>
            <!-- 后退 -->
            <el-button :icon="caretLeft" @click="leftClick" @mouseenter="leftBtnMouseenter"
              @mouseleave="leftBtnMouseleave" />
            <!-- 前进 -->
            <el-button :icon="caretRight" @click="rightClick" @mouseenter="rightBtnMouseenter"
              @mouseleave="rightBtnMouseleave" />
            <!-- 向上 -->
            <el-button :icon="caretTop" @click="topClick" @mouseenter="topBtnMouseenter"
              @mouseleave="topBtnMouseleave" />
          </el-button-group>
        </div>
        <div style="width: calc(100% - 76px);">

          <!-- 路径输入框 -->
          <el-input v-model="inputPath" @focus="pathInputFocus" @blur="pathInputBlue">

            <!-- 路径按钮 -->
            <template #prefix>
              <div v-for="(path, i) in pathArr" :key="i" class="pathButGroup" v-show="showPathBut">
                <el-button @click="backClick" width="100px">
                  {{path}}
                </el-button>
                <el-button @click="backClick" width="5px" :icon="arrowRight">
                </el-button>
              </div>
            </template>

            <!-- 刷新按钮 -->
            <template #append>
              <el-button :icon="refresh" />
            </template>

          </el-input>
        </div>
      </div>
    </div>

    <div style="width: 20% ;display:flex;">
      <!-- 搜索框 -->
      <el-input v-model="searchPath">

        <template #append>
          <!-- 搜索按钮 -->
          <el-dropdown>
            <el-button :icon="search">
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>高级</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </template>
      </el-input>


    </div>

  </div>

</template>

<script>

import { ArrowRight, CaretLeft, CaretRight, CaretTop, Refresh, Search } from '@element-plus/icons-vue';

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
      caretRight: CaretRight,
      caretTop: CaretTop,
      search: Search,
      searchPath: ""
    }
  },
  methods: {
    backClick(){
      console.log("backClick");
    },

    pathInputFocus() {
      this.showPathBut = false;
      console.log("pathInputFocus", this.showPathBut, this);
    },
    pathInputBlue() {
      this.showPathBut = true;
      console.log("pathInputBlue", this.showPathBut);
    },
    leftClick() {
      console.log("leftClick");
    }, rightClick() {
      console.log("rightClick");
    }, topClick() {
      console.log("topClick");
    },
    leftBtnMouseenter() {
      console.log("鼠标划入");
      this.backType = "primary"
    },
    leftBtnMouseleave() {
      console.log("按钮松开");
      this.backType = "default"
    },
    rightBtnMouseenter() {
      console.log("鼠标划入");
      this.backType = "primary"
    },
    rightBtnMouseleave() {
      console.log("按钮松开");
      this.backType = "default"
    },
    topBtnMouseenter() {
      console.log("鼠标划入");
      this.backType = "primary"
    },
    topBtnMouseleave() {
      console.log("按钮松开");
      this.backType = "default"
    }
  }
}
</script>

<style lang='scss' scoped>
.el-button-group .el-button {
  padding: 8px 5px
}

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
  transform: translateX(-11px) !important;
}

:deep .el-input__inner {
  padding-left: 6px !important;
}
</style>