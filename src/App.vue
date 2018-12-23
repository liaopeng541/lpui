<template>
  <div id="app">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全局LPspin</span>
      </div>
      <div style="width: 200px;margin:10px">
        <el-button @click="doSpin">打开spin 2秒</el-button>
      </div>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>modal</span>
      </div>
      <div style="width: 200px;margin:10px">
        <el-button @click="doSpin">弹出modal</el-button>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>ComboGrid</span>
      </div>
      <div style="width: 200px;margin:10px">
        <combo-grid
                :table-header="[{column:'id',label:'编号',width:'100'},{column:'name',label:'名称',width:'150'},{column:'url',label:'链接'}]"
                :pagination="{pageSize: 10,currentPage: 1,total: 0}"
                :search-column="['id','name','title']"
                label-column="name"
                value-column="id"
                v-model="input10"
                initlabel=""
                :default-params="{id:1,token:2}"
                search-params="name"
                :show-header="true"
                url="http://www.henghengadmin.com/admin/web/index.php?r=admin/test"
                method="get"
                list-key="data.list"
                total-key="data.total"
                width="800"
                @change="changeval"
                @error="error"
                placeholder="请选择"

        />
      </div>

    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>InputGrid</span>
      </div>
      <div style="width: 200px;margin:10px">
        <input-grid
                :table-header="[{column:'id',label:'编号',width:'100'},{column:'name',label:'名称',width:'150'},{column:'url',label:'链接'}]"
                :pagination="{pageSize: 10,currentPage: 1,total: 0}"
                :search-column="['id','name','title']"
                value-column="name"
                v-model="input11"
                :default-params="{id:1,token:2}"
                search-params="name"
                :show-header="true"
                url="http://www.henghengadmin.com/admin/web/index.php?r=admin/test"
                method="get"
                list-key="data.list"
                total-key="data.total"
                width="800"
                @change="changeval"
                @error="error"
                placeholder="请输入"

        />
      </div>

    </el-card>

  </div>
</template>

<script>
import Vue from "vue"
import ComboGrid from "./ComboGrid/ComboGrid";
import {Card,Button} from "element-ui"
import InputGrid from "./InputGrid/InputGrid";
Vue.use(Card)
Vue.use(Button)
export default {
  name: 'app',
    components: {InputGrid, ComboGrid},
    data () {
    return {
        input10: '',
        input11: ''
    }
  },
    methods:{
        error()
        {
          console.log("出错啦")
        },
        doSpin(){
            this.$LPspin.show("正在搞事。。。。",2000)
        },
        changeval(val)
        {
            console.log(val);
        }
    }
}
</script>

<style>

</style>
