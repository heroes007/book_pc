<template>
    <div>
        <div id="bar" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
import './index.css'
import echarts from 'echarts'
import { getData } from '@/api/data'
export default {
  name: 'index',
  data () {
    return {
      bookList: [],
      categoryList: [],
      option: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '图书数量',
            type: 'bar',
            barWidth: '60%',
            data: []
          }
        ]
      }
    }
  },
  created () {
    this.getMessage()
  },
  mounted () {
    setTimeout(() => { this.bar() }, 100)
  },
  methods: {
    bar () {
      var bar = echarts.init(document.getElementById('bar'))
      bar.setOption(this.option)
    },
    getMessage () {
      getData('/api/book').then(res => {
        this.bookList = res.data
        console.log(res)
      })
      getData('/api/category').then(res => {
        this.categoryList = res.data
        console.log(res.data)
        res.data.forEach((item, index) => {
          this.option.xAxis[0].data[index] = item.title
          this.option.series[0].data[index] = item.number
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
