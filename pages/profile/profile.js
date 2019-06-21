// pages/home/home.js
Page({

  data: {
    currentUser: null,
    profile: null, 
    noInfo: 'N/A'
  },

  // Custom Functions

  getCurrentUser() {
    let self = this
    return new Promise(resolve => {
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
        }
      })
    })
  },

  navigateToEdit() {
    wx.navigateTo({
      url: '/pages/edit/edit'
    })
  },

  getUserProfile(options, user) {
    let query = new wx.BaaS.Query()
    let Profile = new wx.BaaS.TableObject('profile')
    let User = new wx.BaaS.User()
    let id = options.user_id ? user_id : user.id
  
    query.compare('user', '=', User.getWithoutData(id))
    Profile.setQuery(query).expand(['user']).find().then(res => {
      let profile = res.data.objects[0]
      this.setData({
        profile: profile
      })
    })
  },

  // Outdated Function -----------
  getExperience(profile) {
    let query = new wx.BaaS.Query()
    let Experience = new wx.BaaS.TableObject('experience')
    let Profile = new wx.BaaS.TableObject('profile')

    query.compare('profile', '=', Profile.getWithoutData(profile.id))
    Experience.setQuery(query).expand(['profile']).find().then(res => {
      let experience = res.data.objects
      console.log(experience)
      this.setData({
        experience: experience
      })
    })
  },

  // Outdated Function -------------
  getEducation(profile) {
    let query = new wx.BaaS.Query()
    let Education = new wx.BaaS.TableObject('education')
    let Profile = new wx.BaaS.TableObject('profile')

    query.compare('profile', '=', Profile.getWithoutData(profile.id))
    Education.setQuery(query).expand(['profile']).find().then(res => {
      let education = res.data.objects
      console.log(education)
      this.setData({
        education: education
      })
    })
  },

  // LifeCycle Functions
  onLoad: function (options) {
    this.getCurrentUser().then(user => {
      this.getUserProfile(options, user)
    })
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