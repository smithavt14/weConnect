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
        wx.switchTab({
          url: '/pages/profile/profile',
        })
      }, 
      fail: function (err) {
        console.log(err)
      }
    })
  },

  userLogin: function (data) {
    wx.BaaS.auth.loginWithWechat(data).then(currentUser => {
      wx.setStorage({
        key: "user",
        data: currentUser
      })
      this.checkCurrentUser()
      this.createUserProfile(currentUser)
    }, err => {
      console.log(err)
    })
  },

  createUserProfile(currentUser) {
    let user = new wx.BaaS.User().getWithoutData(currentUser.id)
    let Profile = new wx.BaaS.TableObject('profile')
    let NewProfile = Profile.create()
    NewProfile.set({
      'background_img': 'https://cloud-minapp-27532.cloud.ifanrusercontent.com/1hU3JlR3qdI7ihhh.png',
      'user_avatar': currentUser.avatar, 
      'user_name': currentUser.nickname,
      'user': user
    })
    NewProfile.save().then(res => {
      console.log(res)
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