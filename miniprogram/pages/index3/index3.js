const db = wx.cloud.database()
var sb="";
var id="";
Page({
 
  
  /**
   * 页面的初始数据
   */
  data: {
     limit:""
     
  },
  //监听输入限制提交
  
  limit2:function(evt){
    let Value=evt.detail.value;
    this.setData({
      limit:Value.length
    })
  },

// 提交表单到数据库
  btnSub(res){
     console.log(res)
      var {title,author,img,content}=res.detail.value;
     db.collection("word-list").add({
       data: {
         title:title,
         author:author,
         img:sb,
         content:content,
         openid:id
       }
     }).then(res=>{
       console.log(res)
     })
  },

  // 上传图片
  upimg(){
     wx.chooseImage({
       complete: (res) => {
         console.log(res)
         var filePath=res.tempFilePaths[0]
         this.cloudFile(filePath)
       },
     })
  },

  cloudFile(path){
    wx.showLoading({
      title: '上传中...',
    })
    wx.cloud.uploadFile({
      cloudPath:Date.now()+".jpg",
      filePath:path
    }).then(res=>{
      console.log(res.fileID)
      this.setData({
        sb:res.fileID
      })
      wx.hideLoading()
      // console.log(res.fileID)
      sb=res.fileID
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  
  },
 


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 获取用户id
  onReady: function () {
    wx.cloud.callFunction({
      name: 'text',
      complete: res => {
        console.log('callFunction test result: ', res)
        this.setData({
         id:res.result.openid
        })
        id=id
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})