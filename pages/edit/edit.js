import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
  data: {
    disableBtn: true,
    user: null,
    profile: null,
    experience: null,
    education: null,
    updateProfile: null,
    updateExperience: null,
    updateEducation: null,
    chooseBackground: false,
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
        profile: profile, 
        disableBtn: true
      })
    })
  },

  chooseAvatar() {
    let self = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        let MyFile = new wx.BaaS.File()
        let fileParams = {filePath: res.tempFilePaths[0]}
        let metaData = {categoryName: 'SDK'}
        
        MyFile.upload(fileParams, metaData).then(res => {
          let path = res.data.path
          let Profile = new wx.BaaS.TableObject('profile')
          let userProfile = Profile.getWithoutData(self.data.profile.id)
          
          userProfile.set('avatar', path)
          userProfile.update().then(() => {
            self.getUserProfile(self.data.user)
          })
        }, err => {
          console.log(err)
        })
      }, 
      fail: function(err) {
        console.log(err)
      }
    })
  },

  updateValue(e) {
    this.setData({
      [`${e.target.dataset.group}.${e.target.dataset.name}`]: e.detail,
      disableBtn: false
    })
  },

  updateProfile(e) {
    if (!this.data.disableBtn) {
      let Profile = new wx.BaaS.TableObject('profile')
      let userProfile = Profile.getWithoutData(this.data.profile.id)
      userProfile.set(this.data.updateProfile)
      userProfile.update().then(res => {
        this.getUserProfile(this.data.user)
        Toast.success('Success!')
        wx.switchTab({
          url: '/pages/profile/profile'
        })
      })
    }
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