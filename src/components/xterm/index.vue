<template>
    <div :id="id" class="xterm"></div>
  </template>
  <script>
  import { defineComponent, onMounted, onBeforeUnmount, watch, nextTick, ref } from "vue";
 //  import { initWebSocket, closeWebsocket, sendWebsocket  } from '@/utils/websocket'
 import * as WS from '@/utils/websocket'
 
 //  import { startWith } from "../utils/string";
  //xterm
  import { Terminal } from "xterm";
  import { FitAddon } from "xterm-addon-fit";
  import "xterm/css/xterm.css";
  import "xterm/lib/xterm.js";
  export default defineComponent({
    name: "XTerm",
    props: {
      type: String,
      width: Number,
      data: String,
      url: String,
    },
    setup(props) {
      let xterm = null;
      let type = "";
      let width = ref(0);
      let id = ref("logxterm");
      const fitAddon = new FitAddon();
      type = type ? type : props.type;
      if (type == "log") {
        id.value = "logxterm";
      } else {
        id.value = "shellterm";
      }
      function initTerm() {
        width.value = width.value ? width.value : props.width;
        let rows = width.value / 12;
        xterm = new Terminal({
          rows: parseInt(rows),
          cols: 40,
          cursorStyle: "underline", //光标样式
          cursorBlink: true, // 光标闪烁
          convertEol: true, //启用时，光标将设置为下一行的开头
          disableStdin: true, //是否应禁用输入。
          theme: {
            foreground: "white", //字体
            background: "#334963", //背景色
            cursor: "help", //设置光标
          },
        });
  
        xterm.loadAddon(fitAddon);
        xterm.open(document.getElementById(id.value));
        fitAddon.fit();
        if (!xterm._initialized) {
          xterm._initialized = true;
        }
        if (type == "log") {
          xterm.write("logging--------------------logging\n");
          if (props.data) xterm.write(props.data);
        } else if (type == "shell") {
          xterm.focus();
          //限制和后端交互，只有输入回车键才显示结果
          xterm.prompt = function () {
            xterm.write("\r\n~$ ");
          };
          xterm.prompt();
  
          xterm.writeln("~ Welcome to the command execution window");
          let url = props.url.replace("http", "ws");
          WS.initWebSocket(url);
          let termdata = "";
          let oldtermdata = "";
          let invalidkey = [
            27,
            33,
            34,
            35,
            36,
            37,
            39,
            38,
            40,
            45,
            144,
            9,
            12,
            16,
            17,
            18,
            20,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            175,
            174,
            179,
            173,
            172,
            180,
            170,
          ];
          xterm.onKey(function (e) {
            const printable =
              !e.domEvent.altKey &&
              !e.domEvent.altGraphKey &&
              !e.domEvent.ctrlKey &&
              !e.domEvent.metaKey;
  
            if (e.domEvent.keyCode === 13) {
              //回车
              let data = 0 + termdata + "\n";
              WS.sendWebsocket(data, function () {
                let data = e.data;
                data = data.substr(1); //去掉第一位，值为1
                if (data.startWith(oldtermdata + "\r\n")) {
                  xterm.write(data.replace(oldtermdata, ""));
                } else {
                  xterm.write(data);
                }
              });
              oldtermdata = termdata;
              termdata = "";
            } else if (e.domEvent.keyCode === 8) {
              //删除
              if (xterm._core.buffer.x > 2) {
                if (termdata.length > 0) {
                  xterm.write("\b \b");
                  termdata = termdata.substring(0, termdata.length - 1);
                }
              }
            } else if (printable) {
              if (invalidkey.indexOf(e.domEvent.keyCode) < 0) {
                //不是特殊字符的时候可以执行
                oldtermdata = "";
                termdata = termdata + e.key;
                xterm.write(e.key);
              }
            }
          });
        }
  
        window.addEventListener("resize", function () {
          fitAddon.fit();
        });
      }
      function fit() {
        fitAddon.fit();
      }
      function dispose() {
        xterm.dispose();
      }
      watch(props, (newProps) => {
        type = newProps.type;
        width.value = newProps.type.width;
        if (newProps.type == "log") {
          xterm.write(newProps.data);
          fit();
        } else if (newProps.type == "shell") {
          if (newProps.url) {
            xterm.dispose();
            initTerm();
          }
        }
      });
      onMounted(() => {
        nextTick(() => {
          if (!xterm) initTerm();
        });
      });
      onBeforeUnmount(() => {
        dispose();
        if (type == "shell") WS.closeWebsocket();
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