// pages/edit/edit.js
Page({

  data: {
    user: null,
    profile: null,
    experience: null,
    education: null,
    backgroundImages: ['https://cloud-minapp-27532.cloud.ifanrusercontent.com/1hU3JlR3qdI7ihhh.png', 'https://cloud-minapp-27532.cloud.ifanrusercontent.com/1hU3Jlj0b53ZoWxO.png', 'https://cloud-minapp-27532.cloud.ifanrusercontent.com/1hU3tom2f94O95Xj.png', 'https://cloud-minapp-27532.cloud.ifanrusercontent.com/1hU3toD51DPYYaSa.png']
  },

  // Custom Functions

  getCurrentUser() {
    let self = this
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: 'user',
        success: function (res) {
          let user = res.data
          self.setData({
            user: user
          })
          resolve(user)
        },
        fail: function (err) {
          console.log(err)
          reject(err)
        }
      })
    })
  },

  getUserProfile(user) {
    let query = new wx.BaaS.Query()
    let Profile = new wx.BaaS.TableObject('profile')
    let User = new wx.BaaS.User()

    query.compare('user', '=', User.getWithoutData(user.id))
    Profile.setQuery(query).expand(['user']).find().then(res => {
      let profile = res.data.objects[0]
      this.setData({
        profile: profile
      })
      this.getExperience(profile)
      this.getEducation(profile)
    })
  },

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

  addNewExperience() {
    let Profile = new wx.BaaS.TableObject('profile')
    let profile = Profile.getWithoutData(this.data.profile.id)

    let Experience = new wx.BaaS.TableObject('experience')
    let experience = Experience.create()

    experience.set('profile', profile)

    experience.save().then(res => {
      console.log(res)
      this.getUserProfile(this.data.user)
    }, err => {
      console.log(err)
    })
  },

  // LifeCycle Functions
  onLoad: function (options) {
    this.getCurrentUser().then((user) => {
      this.getUserProfile(user)
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