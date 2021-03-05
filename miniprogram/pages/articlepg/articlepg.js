const db = wx.cloud.database()
var worklist=[];
Page({
  // 删除文章
  delete:function(e){
    console.log(worklist)
   var that=this;
   var index=e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除此文章吗？',
      success: function (res) {
       if (res.confirm) {
        console.log('点击确定了');
        console.log(worklist[index]._id)
        db.collection("word-list").doc(worklist[index]._id).remove({
          success:function(){
            console.log('删除成功')
            that.delfile(index)
          },
          fail:function(){
            console.log('删除失败')
          }
        })
       } else if (res.cancel) {
         console.log('点击取消了');
         return false;   
        }      
      }
     })
  },
  /**
   * 页面的初始数据
   */
  data: {
    worklist:[],
  }, 
  // 删除对应云文件
  delfile(index){
  wx.cloud.deleteFile({
    fileList: [worklist[index].img]
  }).then(res => {
    // handle success
    console.log(res.fileList)
  }).catch(error => {
    // handle error
  })
},

//  获取openid查询相应文章
 idopen(){
  wx.cloud.callFunction({
    name: 'text',
    complete: res => {
      console.log('callFunction test result: ', res)
       db.collection("word-list").where({
        _openid:res.result.openid
      }).get().then(res=>{
        console.log(res)
        this.setData({
          worklist:res.data,
        })
        worklist=res.data
      })
    }
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
  onReady: function () {
    this.idopen()
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
    this.idopen()
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