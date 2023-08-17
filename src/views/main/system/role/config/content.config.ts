const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  propsList: [
    { type: 'selection', width: '50px' },
    { type: 'index', label: '序号', width: '60px' },
    { prop: 'name', label: '角色名称', width: '180px' },
    { prop: 'intro', label: '权限介绍', width: '180px' },
    { type: 'timer', prop: 'createAt', label: '创建时间' },
    { type: 'timer', prop: 'updateAt', label: '更新时间' },
    { type: 'handler', label: '操作', width: '160px' }
    // // 自定义数据
    // { type: 'custom', prop: 'intro', label: '权限介绍', width: '180px', slotName: 'intro' },
    // { type: 'custom', prop: 'name', label: '角色名称', width: '180px', slotName: 'name' }
  ]
}

export default contentConfig
