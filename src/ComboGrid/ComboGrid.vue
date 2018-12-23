<template>

        <lp-popover
                placement="bottom-start"
                :width="width"
                trigger="focus"
                v-model="isshow"
                popper-class="lppop"
                @show="show"
                @hide="hide"


        >
            <div class="lp-popver-box">


            <el-table :data="table.list"
                      ref="multipleTable"
                      v-loading="table.loading"
                      header-row-class-name="table_th"
                      :border="true"
                      :show-header="ShowHeader"
                      @row-click="rowClick"
                      :row-style="selectedHighlight"
            >

                <el-table-column
                        width="45" style="padding: 0px">
                    <template slot-scope="scope">
                        <i v-if="selectedRow&&(selectedRow[ValueColumn]==scope.row[ValueColumn])" class="el-icon-caret-right" style="font-size: 20px"></i>
                    </template>
                </el-table-column>

                <el-table-column v-for="(item,key) in TableHeader" :label="item.label" :width="item.width" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        {{scope.row[item.column]}}
                    </template>
                </el-table-column>

            </el-table>
            </div>
            <div style="text-align: right">
                <el-pagination
                        style="flex: 1;"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage"
                        :page-sizes="pagination.pageSizes"
                        :page-size="pagination.pageSize"
                        layout="total,  prev, pager, next"
                        :total="pagination.total">
                </el-pagination>
            </div>

            <div>

            </div>
            <div slot="reference">
                <el-input @keydown.native="keydown($event)" @keyup.native="keyup($event)"
                          v-model="label"
                          :placeholder="placeholder"
                >
                    <i slot="prefix" class="el-input__icon"   :style="{color:value? '#67C23A':'#F56C6C'}" :class="value?'el-icon-success':'el-icon-question'"></i>
                    <i slot="suffix" class="el-input__icon"  :class="loading?'el-icon-loading':(isshow?'el-icon-caret-top':'el-icon-caret-bottom')"></i>
                </el-input>
            </div>
        </lp-popover>

</template>

<script>
    import Vue from "vue"
    import LpPopover from "../component/LpPopover";
    import request from "../LPrequest"
    import {Pagination,Table,TableColumn,Input,Loading} from "element-ui"
    Vue.use(Pagination)
    Vue.use(Table)
    Vue.use(Input)
    Vue.use(TableColumn)
    Vue.use(Loading)
    export default {
        name: "ComboGrid",
        components: {LpPopover},
        computed:{
          inputvalue:{
              get:function () {
                  return this.value
              },
              set:function (val) {
                  this.$emit('input',val)
              }
          }
        },
        data() {
            return {
                isshow:false,
                selectedRow:null,
                loading:false,
                label:"",
                timer:null,
                pageData: {
                },
                table: {
                    loading: true,
                    list: [],
                    pagination: {
                        pageSize: 10,
                        pageSizes: [10, 20, 50, 100],
                        currentPage: 1,
                        total: 0,
                    },
                    multipleSelection: []
                }
            }
        },
        watch:{
            value(val)
            {
                this.$emit("change",val?this.selectedRow:null);
            },
        },
        model:{
            prop: 'value',
            event: 'input'
        },
        props:{
            TableHeader:{
                type:Array,
                default:null,
                required: true
            },
            placeholder:"",
            ShowHeader:{
                type:Boolean,
                default:true,
                required: true
            },
            url:{
                type:String,
                default:"",
                required: true
            },
            ListKey:{
                type:String,
                default:"list",
            },
            TotalKey:{
                type:String,
                default:"total"
            },
            width:{
                type:String,
                default:"800"
            },
            method:{
                type:String,
                default:'post',
                validator: value => ['post', 'get'].indexOf(value) > -1
            },
            pagination:{
                type:Object,
                default:{pageSize: 10,currentPage: 1,total: 0},
            },
            ValueColumn:{
                type:String,
                default:""
            },
            LabelColumn:{
                type:String,
                default:"",
                required: true
            },
            DefaultParams:{
                type:Object,
                default:{}
            },
            SearchParams:{
                type:String,
                default:"",
                required: true
            },
            value:"",
            initlabel:"",

        },
        mounted() {
                if(this.initlabel)
                {
                    this.label=this.initlabel
                }
        },
        methods: {
            selectedHighlight(row,rowIndex)
            {
                if (this.selectedRow&&this.selectedRow[this.ValueColumn] == row.row[this.ValueColumn] ) {
                    return {
                        "background-color": "#f0f5f5"
                    };
                }
            },
            rowClick (row) {
                this.selectedRow=row
                this.$nextTick(this.setVal)
            },
            // rowDbClick(row)
            // {
            //   this.rowClick(row);
            //   this.$nextTick(this.setVal)
            // },
            setVal()
            {
                    if(this.selectedRow)
                    {
                        this.inputvalue=this.selectedRow[this.ValueColumn]
                        this.label=this.selectedRow[this.LabelColumn]
                    }
                    this.isshow=false;
            },
            keydown(e)
            {
                if(e.keyCode==38||e.keyCode==40)
                {
                    e.preventDefault();
                }
            },
            keyup(e)
            {
                if(e.keyCode!=13)
                {
                    this.isshow||(this.isshow=true);

                    if(e.keyCode!=38&&e.keyCode!=40)
                    {
                        if(this.timer)
                        {
                            clearTimeout(this.timer);
                        }
                        this.timer=setTimeout(this.fetchData,250)
                        this.inputvalue="";
                    }
                }
            },
            keyaction(e)
            {
                switch (e.keyCode)
                {
                    case 13://回车
                        if(this.table.list.length>0)
                        {
                            this.setVal();

                        }
                        break;
                    case 40://下
                        if(this.table.list.length>0)
                        {
                            var index=0
                            this.table.list.map((item,i)=>{
                                if(this.selectedRow&&item[this.ValueColumn]==this.selectedRow[this.ValueColumn])
                                {
                                    index=i;
                                }
                            })
                            this.selectedRow=this.table.list[index+1]?this.table.list[index+1]:this.table.list[0]
                        }
                        e.preventDefault();
                        break;
                    case 38:
                        if(this.table.list.length>0)
                        {
                            var index=0
                            this.table.list.map((item,i)=>{
                                if(this.selectedRow&&item[this.ValueColumn]==this.selectedRow[this.ValueColumn])
                                {
                                    index=i;
                                }
                            })
                            this.selectedRow=this.table.list[index-1]?this.table.list[index-1]:this.table.list[this.table.list.length-1]


                        }
                        e.preventDefault();
                        break;

                }
            },
            show()
            {
                this.fetchData();
                document.body.addEventListener('keyup',this.keyaction,false);
            },

            hide()
            {
                document.body.removeEventListener('keyup',this.keyaction,false);
                this.loading=false;
            },

            fetchData() {
                var params=Object.assign({},this.pagination,this.DefaultParams)
                params[this.SearchParams]=this.label;
                this.loading=true;
                request[this.method](this.url,params).then((response)=>{
                    this.loading=false;
                    this.table.loading=false;

                    var list_key=this.ListKey.split(".");
                    var list_val=response[list_key[0]];
                    list_key.map((item,i)=>{
                        if(i>0&&list_val[item]) {
                            list_val = list_val[item]
                        }
                    })
                    this.table.list=list_val;
                    if(list_val&&list_val.length>0)
                    {
                        if(this.value)
                        {
                            list_val.map((item)=>{
                                if(item[this.ValueColumn]==this.value)
                                {
                                    this.selectedRow=item;
                                }
                            })
                        }else{
                            this.selectedRow=list_val[0];
                        }

                    }
                    var total_key=this.TotalKey.split(".");
                    var total_val=response[list_key[0]];
                    total_key.map((item,i)=>{
                        if(i>0&&total_val[item]) {
                            total_val = total_val[item]
                        }
                    })

                     this.pagination.total=parseInt(total_val);
                }).catch((e)=>{
                    this.loading=false;
                    this.table.loading=false;
                    this.$emit("error","网络访问失败")
                })




              //  this.table.loading=false;
            },
            handleSizeChange() {

            },
            handleCurrentChange(val) {
                this.pagination.currentPage=val;
                this.$nextTick(this.fetchData)
            },



        }
    }
</script>

<style lang="less">
    @import "./ComboGrid.less";
</style>