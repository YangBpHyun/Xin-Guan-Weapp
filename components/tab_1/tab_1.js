// components/tab_1.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tab_1:[
      {
        id:0,
        name:"全部订单",
        isActive:true
      },{
        id:1,
        name:"预约订单",
        isActive:false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      let {tab_1}=this.data
      tab_1.forEach((v,i)=>i===index? v.isActive=true:v.isActive=false);
      
      this.setData({
        tab_1})
    }
  }
})
