const contentConfig = {
  pageName: 'category',
  header: {
    title: '类别列表',
    btnTitle: '新建类别'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'name', label: '商品类别', width: '180px' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: '160px' }
  ]
}

export default contentConfig
