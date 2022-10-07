<template>
  <div :id="id" class="xterm"></div>
</template>
<script>
import { closeWebsocket, initWebSocket, sendWebsocket } from '@/utils/websocket';
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
// import * as WS from '@/utils/websocket';

//  import { startWith } from "../utils/string";
//xterm
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
export default defineComponent({
  name: "XTerm",
  props: {
    width: Number,
    data: String,
    url: String,
  },
  setup(props) {
    let xterm = null;
    let type = "";
    let width = ref(0);
    let id = ref("shellterm");
    const fitAddon = new FitAddon();

    id.value = "shellterm";
    function initTerm() {
      width.value = width.value ? width.value : props.width;
      let rows = width.value / 12;
      xterm = new Terminal({
        rows: parseInt(rows),
        cols: 40,
        cursorStyle: "underline", //光标样式
        screenKeys: true,
        useStyle: true,
        cursorBlink: true, // 光标闪烁
        convertEol: true, //启用时，光标将设置为下一行的开头
        // disableStdin: true, //是否应禁用输入。
        theme: {
          foreground: "white", //字体
          background: "#334963", //背景色
          cursor: "help", //设置光标
        },
      });

      xterm.open(document.getElementById(id.value));
      xterm.loadAddon(fitAddon);

      if (!xterm._initialized) {
        xterm._initialized = true;
      }
      xterm.focus();
 

      let url = props.url.replace("http", "ws");

      initWebSocket(url);
      xterm.onData(function (data) {
        // console.log("onData: " + data);

        sendWebsocket(data);

      });
      xterm.onResize(({ cols, rows }) => {
        fitAddon.fit();
        console.log("cols: " + cols + ",rows: " + rows);
        sendWebsocket("resize," + cols + "," + rows);
      }

      );
      // xterm.onKey(function (e) {
      //   console.log("onKey: " + e);
      // });
      // 初始化链接
      sendWebsocket({ 'host': '192.168.2.101', 'username': 'root', 'password': 'paidaxing@123' }, function (event) {
        let data = event.data;
        // console.log("wsdata:"+ data);
        xterm.write(data);
      });


      window.addEventListener("resize", function () {
        fitAddon.fit();
        // console.log("cols: " + cols + ",rows: " + rows);
        // sendWebsocket("resize," + cols + "," + rows);

      });
      fitAddon.fit();
    }
    function fit() {
      fitAddon.fit();
    }
    function dispose() {
      xterm.dispose();
    }
    watch(props, (newProps) => {
      // type = newProps.type;
      // width.value = newProps.type.width;
      // if (newProps.type == "log") {
      //   xterm.write(newProps.data);
      //   fit();
      // } else if (newProps.type == "shell") {
      //   if (newProps.url) {
      //     xterm.dispose();
      //     initTerm();
      //   }
      // }
    });
    onMounted(() => {
      nextTick(() => {
        if (!xterm) initTerm();
      });
    });
    onBeforeUnmount(() => {
      dispose();
      closeWebsocket();
    });
    return {
      initTerm,
      fit,
      dispose,
      id,
    };
  },
});
</script>