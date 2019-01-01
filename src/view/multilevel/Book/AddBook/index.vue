<template>
    <div class="content">
        <Form :modal="bookList" label-position="left" :label-width=80>
            <FormItem label="image:">
                <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                        ref="upload"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        type="drag"
                        :data="upload"
                        action="http://upload-z1.qiniup.com"
                        style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="ios-camera" size="20"></Icon>
                    </div>
                </Upload>
                <Modal title="View Image" v-model="visible">
                    <img :src="imgUrl" style="width: 100%">
                </Modal>
            </FormItem>
            <FormItem label="title:">
                <Input style="width: 200px" v-model="bookData.title"/>
            </FormItem>
            <FormItem label="author:">
                <Input style="width: 200px" v-model="bookData.author"/>
            </FormItem>
            <FormItem label="category:">
                <Select v-model="bookData.category" style="width:200px">
                    <Option v-for="(item, index) in categoryList" :value="item._id" :key="index">{{ item.title }}</Option>
                </Select>
            </FormItem>
            <Button type="primary" class="content-btn" @click="handleSure">确认</Button>
        </Form>
    </div>
</template>

<script>
import './index.css'
import axios from 'axios'
import { getData, postData } from '@/api/data.js'
export default {
  name: 'index',
  data () {
    return {
      bookList: {title: '', image: '', category: ''},
      imgUrl: '',
      visible: false,
      uploadList: [],
      upload: {},
      bookData: {category: ''},
      categoryList: []
    }
  },
  created () {
    this.getupload()
    this.getCategoryList()
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    getCategoryList () {
      getData('/api/category').then(res => {
        let data = JSON.parse(JSON.stringify(res.data))
        data.forEach((item, index) => {
          this.categoryList[index] = item
        })
        console.log(this.categoryList)
      })
    },
    handleSure () {
      postData('/api/book/add', this.bookData).then(res => {
        this.$Message.info(res.msg)
        if (res.code === 200) {
          this.bookData = {category: ''}
        }
      })
    },
    handleView (url) {
      this.imgUrl = url
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = res.url
      file.name = res.hash
      this.bookData.image = res.url
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 1
      if (!check) {
        this.$Notice.warning({
          title: '只能添加一张哦'
        })
      }
      return check
    },
    getupload () {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.upload.token = res.data.data
      })
    }
  }
}
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
