Component({
  properties: {
    dropDownMenuTitle: {
      type: Array,
      value: [],
    },
    dropDownMenuStyleData: {
      type: Array,
      value: []
    },
    dropDownMenuFilterData: {
      type: Array,
      value: []
    },
  },
  data: {
    // private properity
    style_open: false, // 出租 出售
    filteropen: false, // 筛选
    shownavindex: '',
    selected_style_id: 0,
    selected_style_name: '',
    selected_filter_id: 0,
    selected_filter_name: ''
  },
  methods: {
    tapStyleNav: function(e) {
      if (this.data.style_open) {
        this.setData({
          style_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          style_open: true,
          filter_open: false,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
      console.log(e.target)
    },
    tapFilterNav: function(e) {
      if (this.data.filter_open) {
        this.setData({
          style_open: false,
          filter_open: false,
          shownavindex: 0
        })
      } else {
        this.setData({
          style_open: false,
          filter_open: true,
          shownavindex: e.currentTarget.dataset.nav
        })
      }
    },

    selectFilterItem: function(e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_filter_id: selectedId,
        selected_filter_name: selectedTitle
      })
      this.triggerEvent("selectedItem", {
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

    selectStyleItem: function(e) {
      var selectedId = e.target.dataset.model.id
      var selectedTitle = e.target.dataset.model.title;
      this.closeHyFilter();
      this.setData({
        selected_style_id: selectedId,
        selected_style_name: selectedTitle
      })
      this.triggerEvent("selectedItem", {
        index: this.data.shownavindex,
        selectedId: selectedId,
        selectedTitle: selectedTitle
      })
    },

    /**关闭筛选 */
    closeHyFilter: function() {
      if (this.data.style_open) {
        this.setData({
          style_open: false,
          filter_open: false,
        })
      } else if (this.data.filter_open) {
        this.setData({
          style_open: false,
          filter_open: false,
        })
      }
    },
  },
  //组件生命周期函数，在组件实例进入页面节点树时执行
  attached: function() {


  },

})