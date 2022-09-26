<template>

  <div style="display:flex;width: 100%;">

    <div style="width: calc(80% - 10px);margin-right: 10px;">

      <!-- 后退 -->

      <el-button :icon="caretLeft" @click="backClick" @mouseenter="backMouseenter" @mouseleave="backMouseout"
        :type="backType" />


      <!-- 前进 -->

      <el-button :icon="caretRigth" @click="backClick" @mouseenter="backMouseenter" @mouseleave="backMouseout"
        :type="backType" />


      <!-- 向上 -->

      <el-button :icon="caretTop" @click="backClick" @mouseenter="backMouseenter" @mouseleave="backMouseout"
        :type="backType" />

      <!-- 路径输入框 -->
      <el-input v-model="inputPath" @focus="pathInputFocus" @blur="pathInputBlue">

        <!-- 路径按钮 -->
        <template>
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
    <div style="width: 20%">
      <!-- 搜索框 -->
      <el-input v-model="searchPath">
      </el-input>
      <!-- 搜索按钮 -->
      <el-button :icon="search" />

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
      searchPath: ""
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