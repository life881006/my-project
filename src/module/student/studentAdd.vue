<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="form.inputText1" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="form.inputText2" placeholder="请输入内容"></el-input>
    </el-form-item>

    <editor ref="content" :tinyMce="studentContent"></editor>
    <el-col class="controll" :span="24">
      <el-button icon="el-icon-success" @click="getEditorContent">提交</el-button>
    </el-col>
    <div id="editorContent"></div>
  </el-form>
</template>

<script>
import editor from '@/components/util/tinyMce/tinyMce'

export default {
  data () {
    return {
      addTable: [
        {
          serialNumber: '1',
          name: '试试1',
          address: '京口区'
        },
        {
          serialNumber: '2',
          name: '试试2',
          address: '润州区'
        },
        {
          serialNumber: '3',
          name: '试试3',
          address: '句容市'
        },
        {
          serialNumber: '4',
          name: '试试4',
          address: '丹徒'
        },
        {
          serialNumber: '5',
          name: '试试5',
          address: '扬中'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        },
        {
          serialNumber: '6',
          name: '试试6',
          address: '丹阳'
        }
      ],
      form: {
        inputText1: 'laoli1',
        inputText2: 'laoli2'
      },
      studentContent: 'studentTinyMce',
      editorText: ''
    }
  },
  methods: {
    getEditorContent () {
      this.editorText = this.$refs.content.getMceContent()
      document.getElementById('editorContent').innerHTML = this.editorText
    }
  },
  components: { editor },
  props: [],
  mounted: function () {}
}
</script>

<style>
#addTable {
  height: auto;
  overflow-y: auto;
}
.el-table-column {
  width: 33%;
}
.controll {
  text-align: center;
}
</style>
