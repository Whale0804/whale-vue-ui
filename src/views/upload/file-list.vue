<template>
    <d2-container class="file-list-wrapper">
        <div>
            <el-breadcrumb  separator-class="el-icon-arrow-right" class="file-bread-wrapper">
                <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :to="{path: item.path }" :key="index" style="width:fit-content;width:-webkit-fit-content;">
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
            <el-input placeholder="请输入内容" size="medium" v-model="searchTxt" class="input-with-select">
                <el-select v-model="selectType" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="file-list-container">
            <el-table
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
        </div>
    </d2-container>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                isAll: false,
                selectType: '',
                searchTxt: '',
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
        watch: {},
        methods: {
            selectAll() {
                this.isAll = !this.isAll
                this.$refs.multipleTable.toggleAllSelection();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val)
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
        padding: 12px;

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
    }

    .file-list-container {
        margin-top: 12px;
        width: 100%;

        thead {
            display: none;
        }
    }

</style>


