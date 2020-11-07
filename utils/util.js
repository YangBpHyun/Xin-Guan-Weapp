const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  module.exports = {
    formatTime: formatTime,
    checkAll:checkAll
  }
  
  
 
 function  checkAll(type,value){  
  //checkAll函数,type是验证的类型,value是验证该类型的值，msg是验证失败后弹出的提示语
  switch(type)    //判断该类型
  {
  case 'lianxifangshi':   //如果类型是lianxifangshi的话，就执行下面的判断
      if (value == "") {
        wx.showToast({
            title: '手机号不能为空',
            icon:'none',
            duration: 2000
        })
    }else if (!(/^1[34578]\d{9}$/.test(value))) {
        wx.showToast({
            title: "请输入正确的手机号",
            icon: "none",
            duration : 2000
        })
    }else return true
    break;
  case 'yonghuming':
      if (value == "") {
        wx.showToast({
            title: '用户名不能为空',
            icon:'none',
            duration: 2000
        })
    }else if (!(/^[\w\u4e00-\u9fa5]{4,16}$/.test(value))) {
        wx.showToast({
            title: "用户名4-16位,包含字母，数字，下划线",
            icon: "none",
            duration : 2000
        })
    }
    break;
    case 'xingming':
        if (value == "") {
          wx.showToast({
              title: '姓名不能为空',
              icon:'none',
              duration: 2000
          })
      }else if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(value))) {
          wx.showToast({
              title: "请输入正确的姓名",
              icon: "none",
              duration : 2000
          })
      }
    break;
    case 'mima':
        if (value == "") {
          wx.showToast({
              title: '密码不能为空',
              icon:'none',
              duration: 2000
          })
      }else if (!(/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^/&*?\.]).*$/.test(value))) {
          wx.showToast({
              title: "密码6-16位，必须含有数字、字母和特殊符号",
              icon: "none",
              duration : 2000
          })
      }
    break;
  }
}