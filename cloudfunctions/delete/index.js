// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
wx.cloud.deleteFile({
  fileList: ['cloud://yunsy-x3zes.7975-yunsy-x3zes-1302194096/123.jpg'],
  success: res => {
    // handle success
    console.log(res.fileList)
  },
  fail: console.error
})