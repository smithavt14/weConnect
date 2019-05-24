// pages/login/login.js
Page({

  data: {
    user: null
  },

  // Custom Functions
  checkCurrentUser() {
    let self = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        self.setData({
          user: res.data
        })
        wx.navigateTo({
          url: '/pages/profile/profile'
        })
      }, 
      fail: function (err) {
        console.log(err)
      }
    })
  },

  userLogin: function (data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorage({
        key: "user",
        data: user
      })
      this.checkCurrentUser()
    }, err => {
      console.log(err)
    })
  },

  userLogout() {
    wx.BaaS.auth.logout().then(res => {
      let self = this
      wx.removeStorage({
        key: 'user', 
        success: function(res) {
          self.setData({
            user: null
          })
        }
      })
    }, err => {
      console.log(err)
    })
  },

  // LifeCycle Functions
  onLoad: function (options) {
    this.checkCurrentUser()
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})