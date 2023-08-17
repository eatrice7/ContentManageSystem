const modalConfig = {
  pageName: 'goods',
  header: {
    newTitle: '新建商品',
    editTitle: '编辑商品'
  },
  formItems: [
    { type: 'input', prop: 'name', label: '商品名称', placeholder: '请输入商品名称' },
    { type: 'input', prop: 'oldPrice', label: '商品原价', placeholder: '请输入商品原价' },
    { type: 'input', prop: 'newPrice', label: '商品新价', placeholder: '请输入商品新价' },
    { type: 'input', prop: 'desc', label: '商品描述', placeholder: '请输入商品描述' },
    {
      type: 'select',
      prop: 'status',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    { type: 'input', prop: 'imgUrl', label: '图片', placeholder: '请上传商品图片' },
    { type: 'input', prop: 'inventoryCount', label: '库存', placeholder: '请输入库存' },
    { type: 'input', prop: 'address', label: '地址', placeholder: '请输入地址' }
  ]
}

export default modalConfig
