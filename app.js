App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    wx.BaaS.init('4e75d73179060038406d')
    let clientID = '4e75d73179060038406d'
    wx.BaaS.init(clientID, { autoLogin: true })

    wx.BaaS.auth.getCurrentUser().then(user => {
      console.log(user)
      wx.setStorage({
        key: "user",
        data: user
      })
    }).catch(err => {
      // HError  
      if (err.code === 604) {
        console.log('用户未登录')
      }
    })
  }
})
