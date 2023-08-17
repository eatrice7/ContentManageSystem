const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: ''
  },
  propsList: [
    { prop: 'name', label: '菜单名称', width: '160px' },
    { prop: 'type', label: '级别', width: '60px' },
    { prop: 'url', label: '菜单URL', width: '220px' },
    { prop: 'icon', label: '菜单ICON', width: '190px' },
    { prop: 'sort', label: '排序', width: '60px' },
    { prop: 'permission', label: '权限', width: '180px' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: '160px' }
  ],
  // el-table树形数据与懒加载
  childrenTree: {
    rowKey: 'id',
    treeProps: { children: 'children' }
  }
}

export default contentConfig
