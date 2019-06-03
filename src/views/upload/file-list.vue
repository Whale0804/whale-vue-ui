<template>
    <d2-container class="file-list-wrapper">
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="file-bread-wrapper">
                <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :to="{path: item.path }" :key="index">
                    <span>{{item.name}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="file-list-header">
            <div class="file-list-header-btn">
                <el-button type="primary" size="small" @click="selectAll">全选</el-button>
                <transition name="slide-fade">
                    <el-button v-show="isAll" size="small" type="primary">删除<i
                            class="el-icon-upload el-icon--right"></i></el-button>
                </transition>
                <transition name="slide-fade">
                    <el-button v-show="isAll" size="small" type="primary">下载<i
                            class="el-icon-folder el-icon--right"></i></el-button>
                </transition>
                <transition name="slide-fade">
                    <el-button v-show="isAll" size="small" type="primary">移动<i
                            class="el-icon-folder el-icon--right"></i></el-button>
                </transition>
                <transition name="slide-fade">
                    <el-button v-show="isAll" size="small" type="primary">分享<i
                            class="el-icon-folder el-icon--right"></i></el-button>
                </transition>
            </div>
            <!--            <el-input placeholder="请输入内容" size="medium" v-model="searchTxt" class="input-with-select">-->
            <!--                <el-select v-model="selectType" slot="prepend" placeholder="请选择">-->
            <!--                    <el-option label="餐厅名" value="1"></el-option>-->
            <!--                    <el-option label="订单号" value="2"></el-option>-->
            <!--                    <el-option label="用户电话" value="3"></el-option>-->
            <!--                </el-select>-->
            <!--                <el-button slot="append" icon="el-icon-search"></el-button>-->
            <!--            </el-input>-->
            <div @click="handleContentListClick">
                <d2-icon name="list" class="file-list-icon" :style="{color: active ?'#409EFF':''}"/>
            </div>
            <div @click="handleContentGridClick">
                <d2-icon name="th" class="file-grid-icon" :style="{color: !active ?'#409EFF':''}"/>
            </div>

        </div>

        <div class="file-list-container">
            <el-table v-if="isTable"
                      ref="multipleTable"
                      :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="日期"
                        width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div v-else class="file-grid-content">
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" class="file-item" v-for="(item,index) in fileList" :key="index">
                        <img :src="item.icon" alt="">
                        <span :title="item.name">
                        {{subString(item.name)}}
                    </span>
                    </el-col>
                </el-row>
            </div>
        </div>

    </d2-container>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                isAll: false,
                isTable: true,
                active: true,
                selectType: '',
                searchTxt: '',
                fileList:[],
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                breadcrumbList: [
                    {
                        path: '/',
                        name: '首页'
                    },
                    {
                        path: '/upload',
                        name: '全部文件',
                    }
                ],
            }
        },
        mounted () {
          this.filelist();
        },
        watch: {},
        methods: {
            selectAll() {
                this.isAll = !this.isAll
                this.$refs.multipleTable.toggleAllSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
            },
            handleContentListClick() {
                this.isTable = true;
                this.active = true;
            },
            handleContentGridClick() {
                this.isTable = false;
                this.active = false;
            },
            subString(str) {
                return this.$tool.subSting(str,4)
            },
            filelist () {
                for(let i=1;i<=100;i++){
                    if(i % 2 == 0){
                        this.fileList.push({
                            name: '这是一个压缩包'+i+'.zip',
                            type: 'zip',
                            icon: require('../../assets/list-icons/file_zip.png')
                        })
                    }else{
                        this.fileList.push({
                            name: '这是一个文件夹'+i,
                            type: 'folder',
                            icon: require('../../assets/list-icons/folder.png')
                        })
                    }
                }
            }
        }
    }
</script>
<style lang="scss">
    .file-bread-wrapper {
        display: flex;
        flex-direction: row;
    }

    .file-list-wrapper {
        display: flex;
        flex-direction: column;
    }

    .file-list-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #EDF1F6;
        margin-top: 12px;
        padding: 8px;
        border-radius: 4px;

        .file-list-header-btn {
            flex: 1;
        }

        .el-select .el-input {
            width: 130px;
        }

        .input-with-select {
            width: 500px;
        }

        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }

        .file-list-icon {
            padding: 0 12px;
            font-size: 20px;
            color: #606266;
        }

        .file-list-icon:hover {
            color: #409EFF;
        }

        .file-grid-icon {
            padding: 0 12px;
            font-size: 20px;
            color: #606266;
        }

        .file-grid-icon:hover {
            color: #409EFF;
        }
    }

    .file-list-container {
        margin-top: 12px;
        width: 100%;

        thead {
            display: none;
        }

        .file-grid-content {
            width: 100%;
            /*flex布局（作用于容器）*/
            display: table-cell;

            .file-item {
                float: left;
                width: 110px;
                height: 130px;
                display: flex;
                flex-direction: column;
                margin: 15px 30px;
                cursor: pointer;

                img {
                    width: 100%;
                }

                span {
                    width: 110px;
                    font-size: 14px;
                    color: #333;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 0 4px;
                }
            }
        }
    }

</style>


