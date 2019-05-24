// pages/edit/edit.js
Page({

  data: {
    currentUser: null,
    profile: null,
    viewPosition: 0
  },

  // Custom Functions

  getCurrentUser() {
    let self = this
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'user',
        success: function (res) {
          self.setData({
            currentUser: res.data
          })
          resolve(res.data)
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        }
      })
    })
  },

  getCurrentProfile(data) {
    let currentUserId = data.id
    let query = new wx.BaaS.Query()
    let Profile = new wx.BaaS.TableObject('profile')
    let User = new wx.BaaS.TableObject('_userprofile')

    query.compare('user_id', '=', Profile.getWithoutData(currentUserId))
    query.compare('id', '=', User.getWithoutData(currentUserId))

    Profile.setQuery(query).expand(['user_id', 'id']).find().then(res => {
      if (res.data.objects.length !== 0) {
        this.setData({
          profile: res.data.objects[0]
        })
      }
    })
  },

  // LifeCycle Functions
  onLoad: function (options) {
    this.getCurrentUser().then((data) => {
      this.getCurrentProfile(data)
    })
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