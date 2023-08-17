const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'name', label: '商品名称' },
    { prop: 'oldPrice', label: '商品原价', width: '120px' },
    { prop: 'newPrice', label: '商品新价', width: '120px' },
    { prop: 'desc', label: '商品描述' },
    { prop: 'status', label: '状态', width: '80px' },
    { type: 'custom', prop: 'imgUrl', label: '图片', width: '120px', slotName: 'images' },
    { prop: 'inventoryCount', label: '库存', width: '100px' },
    { prop: 'saleCount', label: '销量', width: '80px' },
    { prop: 'favorCount', label: '收藏', width: '80px' },
    { prop: 'address', label: '地址', width: '80px' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
