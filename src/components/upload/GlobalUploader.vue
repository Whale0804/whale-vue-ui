<template>
    <div id="global-uploader">
        <!-- 上传 -->
        <uploader
                ref="uploader"
                :options="options"
                :autoStart="false"
                @file-added="onFileAdded"
                @file-success="onFileSuccess"
                @file-progress="onFileProgress"
                @file-error="onFileError"
                class="uploader-app">
            <uploader-unsupport></uploader-unsupport>
            <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn">选择文件</uploader-btn>
            <uploader-list v-show="panelShow">
                <el-card shadow="never" slot-scope="props">
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
                    <ul class="file-list">
                         <li v-for="file in props.fileList" :key="file.id">
                             <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
                         </li>
                         <div class="no-file" v-if="!props.fileList.length"><i class="nucfont inuc-empty-file"></i> 暂无待上传文件</div>
                    </ul>
                </el-card>
            </uploader-list>
        </uploader>
    </div>
</template>

<script>
  import SparkMD5 from 'spark-md5';
  export default {
    name: 'GlobalUploader',
    data() {
      return {
        options: {
          target: "",
          chunkSize: '2048000',
          fileParameterName: 'upfile',
          maxChunkRetries: 3,
          testChunks: true,   //是否开启服务器分片校验
          // 服务器分片校验函数，秒传及断点续传基础
          checkChunkUploadedByResponse: function (chunk, message) {
            let objMessage = JSON.parse(message);
            if (objMessage.skipUpload) {
              return true;
            }
            return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
          },
          query() {
          }
        },
        attrs: {
          accept: '*'
        },
        panelShow: true,   //选择文件后，展示上传panel
        collapse: false,
      }
    },
    created() {
    },
    mounted() {
      this.$bus.$on('openUploader', query => {
        this.params = query || {};
        if (this.$refs.uploadBtn) {
          document.getElementById("global-uploader-btn").click();
        }
      });
    },
    computed: {
      //Uploader实例
      uploader() {
        return this.$refs.uploader.uploader;
      }
    },
    methods: {
      onFileAdded(file) {
        this.$bus.$emit('fileAdded');
        this.panelShow = true;
        this.computeMD5(file);
      },
      onFileProgress(rootFile, file, chunk) {
        console.log(`上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}`)
      },
      onFileSuccess(rootFile, file, response, chunk) {
        let res = JSON.parse(response);
        // 服务器自定义的错误，这种错误是Uploader无法拦截的
        if (!res.result) {
          this.$message({ message: res.message, type: 'error' });
          return
        }
        // 如果服务端返回需要合并
        if (res.needMerge) {
          // api.mergeSimpleUpload({
          //   tempName: res.tempName,
          //   fileName: file.name,
          //   ...this.params,
          // }).then(res => {
          //   // 文件合并成功
          //   this.$bus.$emit('fileSuccess');
          // }).catch(e => {});
          // 不需要合并
        } else {
          this.$bus.$emit('fileSuccess');
          console.log('上传成功');
        }
      },
      onFileError(rootFile, file, response, chunk) {
        this.$message({
          message: response,
          type: 'error'
        })
      },
      /**
       * 计算md5，实现断点续传及秒传
       * @param file
       */
      computeMD5(file) {
        let fileReader = new FileReader();
        let time = new Date().getTime();
        let md5 = '';
        file.pause();
        fileReader.readAsArrayBuffer(file.file);
        fileReader.onload = (e => {
          if (file.size != e.target.result.byteLength) {
            this.error('Browser reported success but could not read the file until the end.');
            return
          }
          md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
          // 添加额外的参数
          this.uploader.opts.query = {
            ...this.params
          }
          console.log(`MD5计算完毕：${file.id} ${file.name} MD5：${md5} 用时：${new Date().getTime() - time} ms`);
          file.uniqueIdentifier = md5;
          file.resume();
        });
        fileReader.onerror = function () {
          this.error('FileReader onerror was triggered, maybe the browser aborted due to high memory usage.');
        };
      },
      fileListShow() {
        let $list = document.getElementsByClassName('file-list')
        if ($list.is(':visible')) {
          $list.slideUp();
          this.collapse = true;
        } else {
          $list.slideDown();
          this.collapse = false;
        }
      },
      close() {
        this.uploader.cancel();
        this.panelShow = false;
      },
      error(msg) {
        this.$notify({
          title: this.$t('c.false'),
          message: msg,
          type: 'error',
          duration: 2000
        })
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
    #global-uploader {
        position: fixed;
        z-index: 20;
        right: 20px;
        bottom: 0;
        .uploader-app {
            width: 520px;
        }
        .file-list {
            position: relative;
            height: 240px;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: #fff;
            > li {
                background-color: #fff;
            }
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
