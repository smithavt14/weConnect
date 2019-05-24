// pages/home/home.js
Page({

  data: {
    currentUser: null,
  },

  // Custom Functions

  getCurrentUser() {
    let self = this
    wx.getStorage({
      key: 'user',
      success: function (res) {
        self.setData({
          currentUser: res.data
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  navigateToEdit() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },

  // LifeCycle Functions
  onLoad: function (options) {
    this.getCurrentUser()
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