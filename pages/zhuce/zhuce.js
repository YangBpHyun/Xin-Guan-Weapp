var util = require('../../utils/util.js');

Page({
    data: {
        // 理发师选择框
        showLifadian: false,
        lifadian_List:[],

        focusShenFen: false,
        focusLianXiFangShi: false,
        focusYongHuMing: false,
        focusXingMing: false,
        focusSex: false,
        focusMiMa: false,
        focusReMiMa: false,
        shenfenOK: false,
        lianxifangshiOK: false,
        yonghumingOK: false,
        xingmingOK: false,
        xingbieOK: false,
        remimaOK: false,
        shenfen:"",
        lianxifangshi:"",
        yonghuming:"",
        xingming:"",
        xingbie:"",
        mima:"",
        remima:"",
        res:"",
        
    },
    // 理发店选择绑定函数
    showLifadianPopup:function (e) {
        this.setData({ showLifadian:true });
        var lifadianlist=[]
        for(var i=0; i < this.data.lifadian_List.length; i++){
            lifadianlist.push(this.data.lifadian_List[i].lifadian_name)
        }
        this.setData({ 
            showLifadian:true,
            lifadianname_List:lifadianlist
         });
        //  console.log(this.data.lifadianname_List)
    },
    onLifadianPickerClose:function() {
        this.setData({ showLifadian:false });
    },
    onLifadianPickerConfirm:function(e) {
        this.setData({
            lifadianName:e.detail.value,
            showLifadian:false
        })
        console.log(this.data.lifadianName)

    },
    focusLianXiFangShi: function() {
        this.setData({
            focusLianXiFangShi: true
        })
    },
    // 页面加载时函数
    onLoad: function() {
        this.getLifadianName()   
    },
    // 获取全部理发店
    getLifadianName: function(){
        var that = this
        wx.request({
            url: 'http://127.0.0.1:8000/jianyue/getLifadianName/',
            method: 'GET',
            success: function(res){
                console.log(res)
            }
        }) 
    },
  
    // // 输入框失去焦点时验证格式
    blurLianXiFangShi: function(e) {
        this.setData({
            focusLianXiFangShi: false,
        })
        util.checkAll("lianxifangshi",e.detail.value)
        var lianxifangshiOK = util.checkAll("lianxifangshi",e.detail.value)
        this.setData({
            lianxifangshiOK: lianxifangshiOK,
        }) 
    },
    blurYongHuMing: function(e) {
        this.setData({
            focusYongHuMing: false,
        })
        util.checkAll("yonghuming",e.detail.value)
    },
    blurXingMing: function(e) {
        this.setData({
            focusXingMing: false,
        })
        util.checkAll("xingming",e.detail.value)
    },
    blurMiMa: function(e) {
        this.setData({
            focusMiMa: false,
            mima: e.detail.value
        })
        util.checkAll("mima",e.detail.value)
    },
    blurReMiMa: function(e) {
        console.log(this.data.mima);
        if (e.detail.value != this.data.mima) {
            wx.showToast({
                title: "两次密码不一致，请确认",
                icon: "none",
                duration:1000
            })
            this.setData({
                remimaOK:false,
            })
        }
        else {
            this.setData({
                remimaOK:true
            })
        }
    },

    // // 提交表单
    create_zhuce: function(e) {
        console.log(e.detail.value)
        console.log("lianxifangshiOK",this.data.lianxifangshiOK)
        console.log("remimaOK",this.data.remimaOK)
        // if(this.data.remimaOK&&this.data.lianxifangshiOK&&this.data.xingmingOK&&this.data.yonghumingOK){
        if(this.data.remimaOK&&this.data.lianxifangshiOK){
            wx.request({
                url: "http://127.0.0.1:8000/jianyue/zhuce" ,
                header:{
                    "Content-Type" :"application/x-www-form-urlencoded"
                },
                method: "GET",
                data:{
                    shenfen: e.detail.value.shenfen,
                    lianxifangshi: e.detail.value.lianxifangshi,
                    xingming: e.detail.value.xingming,
                    yonghuming: e.detail.value.yonghuming,
                    xingbie: e.detail.value.xingbie,
                    mima: e.detail.value.mima
                },
                success: this.getResult.bind(this)         
            })
        }
        else if(!this.data.lianxifangshiOK){
            wx.showToast({
                title:"请输入正确的手机号",
                icon:"none",
                duration:2000
            })
        }
        else if(!this.data.remimaOK){
            wx.showToast({
                title:"两次密码不一致，请确认",
                icon:"none",
                duration:2000
            })
        }
    },
    getResult: function(res) {
        console.log("data:",res.data);
        console.log("success:",res.data.success);
        console.log("msg",res.data.msg);
        var msg = res.data.msg;
        var success = res.data.success;
        var status = res.data.status;
        if(success == "0"){
            console.log(msg);
            wx.showToast({
                title: msg,
                icon:"none",
                duration: 2000
            })
        }
        else{
            if(status == "1"){
                wx.showToast({
                    title:"注册成功",
                    duration: 2000
                })
                setTimeout(function () {
                    wx.navigateBack({
                        url: '/pages/denglu/denglu'
                    })
                }, 2000)
            }
        }
        
    }

})