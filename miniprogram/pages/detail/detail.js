const db = wx.cloud.database();
const _ = db.command
const app = getApp();
var valule="";
var essayid="";
var userInfo="";
var detail="";
var  bk_id=""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:"",
    essayid:"",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  // 获取用户信息
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   hasUserInfo: true
      // })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    userInfo=e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 提交表单到数据库
  qz(res)
  {
    console.log(res.detail.value);
    valule=res.detail.value
  },
  sj(){
    db.collection("comment").add({
      data: {    
        content:valule,
        author:userInfo.nickName,
        pic:userInfo.avatarUrl,
        essayid:essayid
      }
    })
    this.getcomment(essayid);
    this.onLoad();
  },

  onShow:function(){
    wx.cloud.downloadFile({
      fileID: 'cloud://yunsy-x3zes.7975-yunsy-x3zes-1302194096/document/焞煌.doc'
    }).then(res => {
      console.log(res.tempFilePath)
      let fs=wx.getFileSystemManager()
      let result = fs.readFileSync(res.tempFilePath,"utf-8")
      this.setData({
        allcontent: result
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取文章id
  onLoad: function (options) {
      console.log(options);
      essayid=options.id;
    this.getdetail(essayid);
    this.getcomment(essayid);
  },

  // 根据id获取detail
  getdetail(essayid){
    let that=this;
    db.collection("word-list").doc(essayid).get().then(res=>{
      that.setData({
       detail:res.data
      })
    })
  },
  // 根据id获取comment
  getcomment(essayid){
    let that=this;
    db.collection("comment").where({
      essayid:essayid
    }).get().then(res=>{
      console.log(res.data)
      that.setData({
        comment:res.data
       })
    })
  },

 
// bk_id赋值
evaluation1(){
  this.setData({
    bk_id:"cloud://yunsy-x3zes.7975-yunsy-x3zes-1302194096/userPic/羊皮卷5.png"
  })
},
evaluation2(){
  this.setData({
    bk_id:""
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  transformation:function (e) {
    // console.log(e)
    var that=this
    wx.showModal({
      title: '提示',
      content: '羊皮卷背景',
      success: function (res) {
       if (res.confirm) {
        console.log('点击确定了');
        that.evaluation1();
        return true;  
       } else if (res.cancel) {
         console.log('点击取消了');
         that.evaluation2();
         return false;   
        }      
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

