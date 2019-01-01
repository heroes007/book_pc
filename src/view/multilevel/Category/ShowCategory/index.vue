<template>
    <div>
        <Table border :columns="columns12" :data="data">
            <template slot-scope="{ row }" slot="image">
                <img class="book-img" :src="row.image" alt="">
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="check(index)">check</Button>
                <Button type="error" size="small" @click="remove(index)">Delete</Button>
            </template>
        </Table>
        <Modal
                v-model="modalBook"
                title="图书列表">
            <Table border :columns="columns1" :data="bookData" class="category-table">
                <template slot-scope="{ row }" slot="image">
                    <img class="book-img" :src="row.image" alt="">
                </template>
            </Table>
        </Modal>
    </div>
</template>

<script>
import './index.css'
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
          title: 'Number',
          key: 'number'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      columns1: [
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
        }
      ],
      data: [],
      bookData: [],
      modalBook: false
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      getData('/api/category').then(res => {
        this.data = res.data
      })
    },
    remove (index) {
      let _id = this.data[index]._id
      let category = this.data[index]._id
      getData('/api/book', {category}).then(res => {
        if (res.data.length) {
          this.$Message.info('该分类下还有图书，请勿删除')
        } else {
          deleteData('/api/category', { _id }).then(res => {
            console.log(res)
          })
        }
      })
    },
    check (index) {
      let category = this.data[index]._id
      getData('/api/book', {category}).then(res => {
        if (res.code === 200) {
          this.bookData = res.data
          this.modalBook = true
          this.bookData.forEach((item, index) => {
            let _id = item.category
            getData('/api/category', {_id}).then(res => {
              item.category = res.data[0].title
            })
          })
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
    /deep/ .ivu-modal-body{
        max-height: 460px;
        overflow: auto;
    }
    /deep/ .ivu-modal{
        top: 5%;
    }
</style>
