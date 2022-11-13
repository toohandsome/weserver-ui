import request from '@/utils/request'

// 家目录
export function getUserHome() {
  return request({
    url: '/file/getUserHome',
    method: 'get'
  })
}

// 目录跳转
export function jumpTo(data) {
  return request({
    url: '/file/jumpTo',
    method: 'post',
    data: data
  })
}

// TODO
// 文件上传
export function upload(data) {
  return request({
    url: '/file/upload',
    method: 'post',
    data: data
  })
}


// TODO
// 目录跳转
export function download(data) {
  return request({
    url: '/file/download',
    method: 'post',
    data: data
  })
}


// 创建文件
export function newFile(data) {
  return request({
    url: '/file/newFile',
    method: 'post',
    data: data
  })
}

// 创建文件夹
export function newDir(data) {
  return request({
    url: '/file/newDir',
    method: 'post',
    data: data
  })
}

// 复制剪切
export function copyOrCut(data) {
  return request({
    url: '/file/copyOrCut',
    method: 'post',
    data: data
  })
}
// 删除
export function delet(data) {
  return request({
    url: '/file/delete',
    method: 'post',
    data: data
  })
}
// 压缩
export function compress(data) {
  return request({
    url: '/file/compress',
    method: 'post',
    data: data
  })
}

// 解压
export function decompression(data) {
  return request({
    url: '/file/decompression',
    method: 'post',
    data: data
  })
}