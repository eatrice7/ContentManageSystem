import myRequest from '@/service'

export function getGoodsAmountList() {
  return myRequest.get({
    url: '/goods/amount/list'
  })
}
export function getGoodsCategoryCount() {
  return myRequest.get({
    url: '/goods/category/count'
  })
}
export function getGoodsCategorySale() {
  return myRequest.get({
    url: '/goods/category/sale'
  })
}
export function getGoodsCategoryFavor() {
  return myRequest.get({
    url: '/goods/category/favor'
  })
}
export function getGoodsAddressSale() {
  return myRequest.get({
    url: '/goods/address/sale'
  })
}
