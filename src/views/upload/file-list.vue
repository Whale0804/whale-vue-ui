<template>
    <d2-container class="file-list-wrapper">
        <template slot="header">
            <div class="file-list-header">
                <div class="file-list-header-btn">
                    <el-button-group>
                        <el-button type="primary" size="small" @click="selectAll">全选</el-button>
                        <transition name="slide-fade">
                            <el-button v-show="isAll" size="small" type="primary">删除<i
                                    class="el-icon-delete el-icon--right"></i></el-button>
                        </transition>
                        <transition name="slide-fade">
                            <el-button v-show="isClickRow" size="small" type="primary">重命名<i
                                    class="el-icon-edit el-icon--right"></i></el-button>
                        </transition>
                        <transition name="slide-fade">
                            <el-button v-show="isAll" size="small" type="primary">下载<i
                                    class="el-icon-download el-icon--right"></i></el-button>
                        </transition>
                        <transition name="slide-fade">
                            <el-button v-show="isAll" size="small" type="primary">移动<i
                                    class="el-icon-sort el-icon--right"></i></el-button>
                        </transition>
                        <transition name="slide-fade">
                            <el-button v-show="isAll" size="small" type="primary">分享<i
                                    class="el-icon-share el-icon--right"></i></el-button>
                        </transition>
                        <el-button type="primary" size="small" @click="selectAll">新建文件<i
                                class="el-icon-folder-add el-icon--right"></i></el-button>
                    </el-button-group>
                </div>
                <div @click="handleContentListClick">
                    <d2-icon name="list" class="file-list-icon" :style="{color: active ?'#409EFF':''}"/>
                </div>
                <div @click="handleContentGridClick">
                    <d2-icon name="th" class="file-grid-icon" :style="{color: !active ?'#409EFF':''}"/>
                </div>
            </div>
            <div class="file-bread">
                <el-breadcrumb separator-class="el-icon-arrow-right" class="file-bread-wrapper">
                    <span class="file-header-back">返回上一级</span> <span class="file-header-back-line">|</span>
                    <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :to="{path: item.path }" :key="index">
                        <span>{{item.name}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div class="file-bread-desc">
                    已全部加载，共2个
                </div>
            </div>
        </template>


        <div class="file-list-container">
            <el-table v-if="isTable"
                      ref="multipleTable"
                      :data="tableData"
                      tooltip-effect="dark"
                      style="width: 100%"
                      @row-click="handleRowClick"
                      @row-dblclick="handleRowDbClick"
                      :row-class-name="tableRowClassName"
                      @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="名称"
                        prop="date"
                        sortable>
                    <template slot-scope="scope">
                        <div class="list-item-name-cell">
                            <div style="flex: 1;display: flex;flex-direction: row;">
                                <img src="../../assets/list-icons/folder.png" class="list-img-item" alt="">
                                <span class="file-item-name" :title="scope.row.name">{{scope.row.name}}</span>
                            </div>
                            <div class="list-item-action">
                                <i class="el-icon-share action-icon-item" @click.stop="handleShareClick(scope.row)"/>
                                <i class="el-icon-download action-icon-item" @click.stop="handleDownloadClick(scope.row)"/>
                                <i class="el-icon-more action-icon-item" @click.stop="handleMoreClick(scope.row)"/>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="size"
                        label="大小"
                        width="100"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="修改日期"
                        width="160">
                    <template slot-scope="scope">
                        {{ scope.row.date }}
                    </template>
                </el-table-column>
            </el-table>
            <div v-else class="file-grid-content">
                <el-row :gutter="10">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="2" :class="`${'file-item'} ${item.select? 'file-item-active':''}`" v-for="(item,index) in fileList" :key="index" @click.native="HandleFileItemClick(index)">
                        <d2-icon name="check-circle" class="file-item-grid-icon"/>
                        <div class="file-item-grid-img" :style="{backgroundImage: 'url(' + item.icon + ')', backgroundSize:'56px 56px',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}">
                            <img :src="item.icon" alt="" style="visibility: hidden;">
                        </div>
                        <div :title="item.name" class="file-item-grid-name">
                            {{item.name}}
                        </div>
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
                isClickRow:false,
                isTable: true,
                active: true,
                selectType: '',
                searchTxt: '',
                fileList:[],
                BS: null,
                tableData: [{
                    name: 'Go实战仿百度云盘 实现企业级分布式云存储系统-v1 实现企业级分布式云存储系统-v1',
                    date: '2016-05-03 19:20:01',
                    size: '890 M'
                },{
                    name: 'Go实战仿百度云盘 实现企业级分布式云存储系统',
                    date: '2016-05-03',
                    size: '12.5 G'
                }, {
                    name: 'Go实战仿百度云盘 实现企业级分布式云存储系统',
                    date: '2016-05-03',
                    size: '12.5 G'
                }, {
                    name: 'Go实战仿百度云盘 实现企业级分布式云存储系统',
                    date: '2016-05-03',
                    size: '12.5 G'
                }, {
                    name: 'Go实战仿百度云盘 实现企业级分布式云存储系统',
                    date: '2016-05-03',
                    size: '12.5 G'
                }, ],
                multipleSelection: [],
                breadcrumbList: [
                    {
                        path: '/',
                        name: '全部文件',
                    },{
                        path: '/upload1',
                        name: '全部文件',
                    },
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
            handleRowClick (row, column, event) {
                this.$refs.multipleTable.toggleRowSelection(row);
                this.isAll = !this.isAll
                this.isClickRow = !this.isClickRow
            },
            handleRowDbClick (row, column, event) {
                this.$router.push("/")
            },
            tableRowClassName({row, rowIndex}) {
              if (rowIndex === 1) {
                return 'warning-row';
              } else if (rowIndex === 3) {
                return 'success-row';
              }
              return '';
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
                            select: false,
                            icon: require('../../assets/list-icons/file_zip.png')
                        })
                    }else{
                        this.fileList.push({
                            name: '这是一个文件夹'+i,
                            type: 'folder',
                            select: false,
                            icon: require('../../assets/list-icons/folder.png')
                        })
                    }
                }
            },
            HandleFileItemClick (index) {
              let select = this.fileList[index].select;
              this.fileList[index].select = select === true ? false : true;
              console.log(this.fileList[index])
            },
            handleShareClick (row) {
                console.log(row)
            },
            handleDownloadClick (row) {
                console.log(row)
            },
            handleMoreClick (row) {
                console.log(row)
            },
        },
    }
</script>
<style lang="scss">
    .d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__header {
        padding: 20px 20px;
    }
    .theme-d2 .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__header {
        border-bottom: 1px solid #EDEEF3;
        background: #FFF;
    }
    .file-list-wrapper {
        display: flex;
        flex-direction: column;
    }
    .file-bread {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        .file-bread-wrapper {
            display: flex;
            flex-direction: row;
            flex: 1;
        }
        .file-header-back {
            color: #66b1ff;
            cursor: pointer;
            font-weight: bold;
        }

        .file-header-back-line {
            margin: 0 5px;
            color: #CCC7D1;
        }
        .file-bread-desc {
            font-size: 12px;
        }
    }

    .file-list-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-width: 980px;

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
        width: 100%;
        min-width: 980px;

        .el-table .warning-row {
            background: oldlace;
        }

        .el-table .success-row {
            background: #f0f9eb;
        }

        .file-grid-content {
            width: 100%;
            /*flex布局（作用于容器）*/
            display: table-cell;

            .file-item {
                float: left;
                width: 120px;
                height: 127px;
                float: left;
                margin: 20px 0 0 30px;
                text-align: center;
                cursor: pointer;
                position: relative;
                .file-item-grid-img {
                    position: relative;
                    margin: 9px auto 0;
                    width: 84px;
                    height: 84px;
                    background-repeat: no-repeat;
                    overflow: hidden;
                    img {
                        position: absolute;
                    }
                }

                .file-item-grid-name {
                    display: block;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    margin: 6px 5px 5px;
                    color: #424e67;
                    cursor: default;
                    font-size: 14px;
                }
                .file-item-grid-name:hover {
                    color: #66b1ff;
                }
                .file-item-grid-icon {
                    font-size: 19px;
                    color: #09AAFF;
                    position: absolute;
                    left: 4px;
                    top: 4px;
                    display: none;
                }
            }
            .file-item:hover {
                background: #F2FAFF;
                border-radius: 4px;
                .file-item-grid-icon {
                    opacity:0.4;
                    display: inline;
                }
            }
            .file-item-active {
                background-color: #DAF5FF;
                border: 1px solid #90d8ff;
                border-radius: 5px;
                .file-item-grid-icon {
                    display: inline;
                    opacity: 1.0;
                }
            }
        }

        .list-item-action {
            width: 100px;
            height: 23px;
            font-size: 18px;
            font-weight: 500;
            display: none;
            .action-icon-item {
                padding: 0 7px;
                color: #66b1ff;
                cursor: pointer;
            }
        }
        .el-table__row:hover {
            .list-item-action {
                display: inline-block;
            }
        }
    }
    .list-img-item {
        width: 23px;
        height: 23px;
        vertical-align: middle;
        cursor: pointer;
    }
    .file-item-name {
        height: 23px;
        line-height: 23px;
        margin-left: 8px;
        vertical-align:middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 500px;
        cursor: pointer;
    }
    .list-item-name-cell {
        min-width: 600px;
        display: flex;
        flex-direction: row;
    }
</style>


