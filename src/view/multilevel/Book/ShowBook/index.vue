<template>
    <div>
        <Table border :columns="columns12" :data="data">
            <template slot-scope="{ row }" slot="image">
                <img class="book-img" :src="row.image" alt="">
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <!--<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>-->
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
    </div>
</template>

<script>
import './index.css'
import axios from 'axios'
import { getData, deleteData } from '@/api/data'
export default {
  title: 'index',
  data () {
    return {
      columns12: [
        {
          title: 'Title',
          key: 'title'
        },
        {
          title: 'Image',
          slot: 'image'
        },
        {
          title: 'Category',
          key: 'category'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      data: []
    }
  },
  created () {
    this.getBook()
  },
  methods: {
    getBook () {
      getData('/api/book').then(res => {
        this.data = res.data
        this.data.forEach((item, index) => {
          let _id = item.category
          getData('/api/category', {_id}).then(res => {
            item.category = res.data[0].title
          })
        })
      })
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Title：${this.data6[index].title}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      let _id = this.data[index]._id
      deleteData('/api/book', { _id }).then(res => {
        if (res.code === 200) {
          this.getBook()
        } else {
          this.$Message.info(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.book-img{
    width: 50px;
    height: 50px;
}
</style>
