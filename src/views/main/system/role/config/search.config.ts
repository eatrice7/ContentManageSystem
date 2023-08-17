const searchConfig = {
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称',
      initialValue: ''
    },
    {
      type: 'input',
      prop: 'leader',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      initialValue: ''
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
