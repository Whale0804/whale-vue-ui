<template>
    <el-card shadow="never" v-if="isShow" class="global-uploader">
        <div slot="header" class="clearfix">
            <span>文件列表</span>
            <el-button style="float: right; padding: 3px 0;margin-left: 10px;" type="text" @click="close" >
                <el-tooltip class="item" effect="dark" content="关闭" placement="top">
                    <i class="el-icon-error"></i>
                </el-tooltip>
            </el-button>
            <el-button style="float: right; padding: 3px 0;" type="text" @click="fileListShow" >
                {{collapse?'展开':'折叠'}}
            </el-button>
        </div>
        <div class="file-list" v-show="!collapse">
            <el-table  :data="files" :row-class-name="tableRowClassName" max-height="440">
                <el-table-column
                        type="index"
                        :index="indexMethod"></el-table-column>
                <el-table-column
                        label="类型"
                        width="60">
                    <template slot-scope="scope">
                        <img v-if="scope.row.thumb" :src="scope.row.thumb" width="40" height="40" />
                        <span v-else>No Image</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="文件"></el-table-column>
                <el-table-column
                        prop="size"
                        label="大小"
                        width="80" :formatter="formatter"></el-table-column>
                <el-table-column
                        prop="speed"
                        label="速度"
                        width="110" :formatter="formatterSpeed"></el-table-column>
                <el-table-column
                        prop="speed"
                        label="进度"
                        width="170">
                    <template slot-scope="scope">
                        <el-progress :text-inside="true" :stroke-width="18" :percentage="parseFloat(scope.row.progress)" status="success"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="115">
                    <template slot-scope="scope">
                        <el-dropdown size="small" split-button type="primary">
                            操作
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click="handleSuspendClick(scope.$index)">暂停</el-dropdown-item>
                                <el-dropdown-item @click="handleCancelClick(scope.$index)">取消</el-dropdown-item>
                                <el-dropdown-item @click="handleDeleteClick(scope.$index)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
  import SparkMD5 from 'spark-md5';
  export default {
    name: 'GlobalUploader',
    data() {
      return {
        collapse: false,
        isShow: false,
        files:[]
      }
    },
    created() {
    },
    mounted() {
      this.$bus.$on('openUploader', query => {
        this.isShow = true;
        this.files = query.files;
      });
    },
    computed: {

    },
    methods: {
      close () {
        this.isShow = false;
        this.files=[];
      },
      handleSuspendClick (index) {
        this.$bus.$emit("doStop",{
          file: this.files[index]
        })
      },
      handleCancelClick (index) {
        this.$bus.$emit("doCancel",{
          file: this.files[index]
        })
      },
      handleDeleteClick (index) {
        alert(1)
        console.log(index)
        this.files.splice(index,1)
        this.$bus.$emit("doDelete",{
          file: this.files[index]
        })
      },
      fileListShow (){
        this.collapse = !this.collapse;
      },
      formatter (row, column){
        return this.$tool.formatSize(row.size)
      },
      formatterSpeed (row, column) {
        return this.$tool.formatSpeed(row.speed)
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      indexMethod(index) {
        return index + 1;
      }
    },
    watch: {},
    destroyed() {
      this.$bus.$off('openUploader');
    },
    components: {}
  }
</script>

<style scoped lang="scss">
    .global-uploader {
        position: fixed;
        z-index: 20;
        right: 20px;
        bottom: 0;
        width: 75%;
        .file-list {
            position: relative;
            height: 450px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #fff;
        }
        .no-file {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
        }
        .uploader-file-icon {
            &:before {
                content: '' !important;
            }

        }
        .uploader-file-actions > span {
            margin-right: 6px;
        }
    }
    /* 隐藏上传按钮 */
    #global-uploader-btn {
        position: absolute;
        clip: rect(0, 0, 0, 0);
    }
</style>
