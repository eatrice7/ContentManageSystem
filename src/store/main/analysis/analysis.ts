import {
  getGoodsAmountList,
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'

interface IAnalysisState {
  amountList: any[]
  categoryCount: any[]
  categorySale: any[]
  categoryFavor: any[]
  addressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    categoryCount: [],
    categorySale: [],
    categoryFavor: [],
    addressSale: []
  }),
  actions: {
    fetchAnalysisDataAction() {
      getGoodsAmountList().then((res) => {
        this.amountList = res.data
      })
      getGoodsCategoryCount().then((res) => {
        console.log('res', res)
        this.categoryCount = res.data
      })
      getGoodsCategorySale().then((res) => {
        this.categorySale = res.data
      })
      getGoodsCategoryFavor().then((res) => {
        this.categoryFavor = res.data
      })
      getGoodsAddressSale().then((res) => {
        this.addressSale = res.data
      })
    }
  }
})

export default useAnalysisStore
