Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowSelectTitle: {
      type: Boolean,
      value: false
    },
    filters: {
      type: Array,
      value: [
        {
          title: '全部',
          items: [
          { title: '全部', items: [] },
          { title: '理发师', items: [] },
          { title: '理发店', items: [] }]
        },
        {
          title: '排序',
          items: [
          { title: '智能排序', items: [] },
          { title: '离我最近', items: [] },
          { title: '好评优先', items: [] },
          { title: '价格升序', items: [] },
          { title: '价格降序', items: [] }
          ]
        }
      ]
    }
  },

 
  /**
   * 组件的初始数据
   */
  data: {
    titleList: [],
 
    // 显示数组
    firstList: [],
    secondList: [],
    // thirdList: [],
 
    // 存放当前列选择数组 默认第一个元素
    firstSelectList: [0, 0, 0, 0],
    secondSelectList: [1, 0],
    // thirdSelectList: [2, 0],
    // fourthSelectList: [3, 0],
 
    selectColumn: 999,
    isOpenList: false,
 
    // 对应selectList 的值
    firstIndex: 0,
    secondIndex: 0,
    // thirdIndex: 0,
  },
 
  attached: function(e) {
    let titles = this.getTitleList(this.properties.filters)
    console.log('titles0000: ' + JSON.stringify(titles))
    console.log('isShowSelectTitle: ' + JSON.stringify(this.properties.isShowSelectTitle))
    this.setData({
      titleList: titles
    })
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
    selectItemList: function(e) {
      this.triggerEvent('filterSelectItemList', {'items': [this.data.secondSelectList, this.data.secondSelectList]})
    },
 
    refreshTitles: function(e) {
      if (this.data.isShowSelectTitle == true) {
        let titles = this.getTitleList(this.properties.filters)
        this.setData({
          titleList: titles
        })
      }
    },
 
    cellSelect: function(e) {
      console.log('cellSelect: ' + JSON.stringify(e))
      let group = e.currentTarget.dataset.group
      let index = e.currentTarget.dataset.index
      // 0、2 只有选择地区时出现(说明 selectColumn == 0)、其他情况单列表选择(只显示第二组)
       if (this.data.selectColumn == 1) {
          this.setData({
            secondSelectList: [1, index]
          })
        } else if (this.data.selectColumn == 2) {
          this.setData({
            thirdSelectList: [2, index]
          })
        } else if (this.data.selectColumn == 3) {
          this.setData({
            fourthSelectList: [3, index]
          })
        } else {}
        
        if (this.data.isOpenList && this.data.selectColumn != 0) {
          this.setData({
            isOpenList: false,
            secondIndex: index
          })
          this.refreshTitles()
          this.selectItemList()
        } else {
          let firstItems = this.properties.filters[0].items
          let secondItems = firstItems[this.data.firstSelectList[1]].items
          let thirdItems = secondItems[index].items
          this.setData({
            firstSelectList: [0, this.data.firstSelectList[1], index, 0],
            secondIndex: index,
            thirdList: thirdItems,
            thirdIndex: 0
          })
 
          this.refreshTitles()
      }
    },
 
    // 展开或者隐藏 历史数据
    categoryBtnClick: function(e) {
      let index = e.currentTarget.dataset.index
      let column = this.data.selectColumn
      if (column == index) {
        this.setData({
          isOpenList: !this.data.isOpenList
        })
      } else {
        this.setData({
          isOpenList: true
        })
      }
 
      this.setData({
        selectColumn: index
      })
 
      // 分类选择更新数据
      let firstItems = this.properties.filters[index].items
      if (index != 0) {
        this.setListData(firstItems, index)
      } else {
        let firstItems = this.properties.filters[this.data.firstSelectList[0]].items
        let secondItems = firstItems[this.data.firstSelectList[1]].items
        let thirdItems = secondItems[this.data.firstSelectList[2]].items
        this.setData({
          firstList: firstItems,
          secondList: secondItems,
          thirdList: thirdItems,
          firstIndex: this.data.firstSelectList[1],
          secondIndex: this.data.firstSelectList[2],
          thirdIndex: this.data.firstSelectList[3]
        })
 
        if (this.data.isShowSelectTitle == true) {
          let titles = this.getTitleList(this.properties.filters)
          this.setData({
            titleList: titles
          })
        }
      }
      
    },
 
    setListData: function(items, index) {
      this.setData({
        secondList: items,
        firstList: [],
        thirdList: []
      })
      
      // 把当前选择的数组值，赋值给高亮的索引
      switch (index) {
        case 1:
          this.setData({
            secondIndex: this.data.secondSelectList[1]
          })
          break;
        case 2:
          this.setData({
            secondIndex: this.data.thirdSelectList[1]
          })
          break;
        case 3:
          this.setData({
            secondIndex: this.data.fourthSelectList[1]
          })
          break;
        default:
          break;
      }
    },
 
    getTitleList: function(e) {
      var mutList = []
      for (let index = 0; index < e.length; index++) {
        const element = e[index];
        let items = element.items
        if (index == 0) {
          let index1 = this.data.firstSelectList[1]
          let index2 = this.data.firstSelectList[2]
          let index3 = this.data.firstSelectList[3]
          let items0 = (items[index1]).items
          let items1 = items0[index2].items
          let items2 = items1[index3]
          let title = items2.title
          mutList.push(title)
        } else if (index == 1) {
          mutList.push(this.getObjectTitle(items, 1, this.data.secondSelectList, '审核状态'))
        } else if (index == 2) {
          mutList.push(this.getObjectTitle(items, 1, this.data.thirdSelectList, '是否上架'))
        } else if (index == 3) {
          mutList.push(this.getObjectTitle(items, 1, this.data.fourthSelectList))
        } else{
          
        }
      }
      return mutList
    },
 
    getObjectTitle: function(obj, index, list, filterStr) {
      let mIndex = list[index]
      let title = obj[mIndex].title
      if (title == '全部') {
        return filterStr
      }
      return title
    }
  }
})