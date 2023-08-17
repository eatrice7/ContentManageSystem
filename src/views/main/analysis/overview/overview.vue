<template>
  <div class="overview">
    <div class="time-info">
      <span class="greeting">{{ greetings }}</span>
    </div>
    <div class="package">
      <div class="intro">
        <span class="title">核心技术</span>
      </div>
      <el-row>
        <template v-for="item in versionData" :key="item.name">
          <el-col :span="6" class="bag">
            <span class="name" type="success">{{ item.name }}</span>
            <span class="version" type="warning">{{ item.value }}</span>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts" name="overview">
import { userGreetings } from '@/utils/format'
import useLoginStore from '@/store/login/login'
import packageData from './data/package-data.json'

// 1.问候语提示
const loginStore = useLoginStore()
const { userInfo } = loginStore
const greetings = userGreetings(userInfo.name)

// 2.对安装的包的数据进行转换
interface IVersionObj {
  name: string
  value: string
}

const data: any = packageData
const versionData: IVersionObj[] = []
for (const key in data) {
  const value = data[key]
  versionData.push({ name: key, value: value })
}
console.log(versionData)
</script>

<style scoped>
.overview {
  border-radius: 10px;
  overflow: hidden;
  .time-info {
    padding: 20px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
    background-color: #fff;
  }
  .package {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    .intro {
      padding: 30px 0 30px 0;
      border-bottom: 2px dotted gray;
      .title {
        font-size: 30px;
      }
    }
    .bag {
      margin-top: 20px;
      font-size: 10px;
      border-collapse: collapse;
      .name {
        padding: 10px;
        display: inline-block;
        border-radius: 3px 0 0 3px;
        background-color: #faecd8;
      }
      .version {
        margin-left: -1px;
        padding: 10px;
        display: inline-block;
        border-radius: 0 3px 3px 0;
        background-color: #faecd8;
      }
    }
  }
}
</style>
