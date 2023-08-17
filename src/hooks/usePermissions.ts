import useLoginStore from '@/store/login/login'

// 按钮权限判断 返回布尔值
function usePermissions(permissionStr: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  return !!permissions.find((item) => item.includes(permissionStr))
}

export default usePermissions
