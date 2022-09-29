
let ws = null
let weboscket_callback = null

//获取 websocket 推送的数据
let websocketonmessage = e => {
  return weboscket_callback(e)
}

// 连接成功
let websocketonopen = () => {
  console.log('连接 websocket 成功')
}

// 连接失败时重新连接
let websocketonerror = () => {
  initWebSocket()
}

// 断开链接后报错
let websocketclose = e => {
  console.log('断开连接', e)
}

// export function initWebSocket(wsurl) {
//   //初始化 websocket
//   ws = new WebSocket(wsurl)
//   ws.onmessage = websocketonmessage
//   ws.onopen = websocketonopen
//   ws.onerror = websocketonerror
//   ws.onclose = websocketclose
// }


// // 发送数据
// export function sendWebsocket(data, callback) {
//   weboscket_callback = callback
//   //  判断 data 数据类型
//   if (typeof data == 'string') {
//     data = data
//   } else {
//     data = JSON.stringify(data)
//   }

//   //  判断 websocket 的状态
//   if (ws.readyState === ws.OPEN) {
//     // 已经打开,可以直接发送
//     ws.send(data)
//   } else if (ws.readyState === ws.CONNECTING) {
//     // 正在开启状态中,则 1 秒后重新发送
//     setTimeout(() => {
//       ws.send(data)
//     }, 1000)
//   } else {
//     // 未打开，则开启后重新调用
//     initWebSocket()
//     sendWebsocket(data, callback)
//   }
// }

// // 手动关闭 websocket
// export function closewebsocket() {
//   ws.close()
// }
export default {
  initWebSocket(wsurl) {
    //初始化 websocket
    ws = new WebSocket(wsurl)
    ws.onmessage = websocketonmessage
    ws.onopen = websocketonopen
    ws.onerror = websocketonerror
    ws.onclose = websocketclose
  },
  sendWebsocket(data, callback) {
    weboscket_callback = callback
    //  判断 data 数据类型
    if (typeof data == 'string') {
      data = data
    } else {
      data = JSON.stringify(data)
    }
  
    //  判断 websocket 的状态
    if (ws.readyState === ws.OPEN) {
      // 已经打开,可以直接发送
      ws.send(data)
    } else if (ws.readyState === ws.CONNECTING) {
      // 正在开启状态中,则 1 秒后重新发送
      setTimeout(() => {
        ws.send(data)
      }, 1000)
    } else {
      // 未打开，则开启后重新调用
      initWebSocket()
      sendWebsocket(data, callback)
    }
  },
  closewebsocket() {
    ws.close()
  }
}
