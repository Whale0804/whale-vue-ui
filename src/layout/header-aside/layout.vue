<template>
    <div
            class="d2-layout-header-aside-group"
            :style="styleLayoutMainGroup"
            :class="{grayMode: grayActive}">
        <!-- 半透明遮罩 -->
        <div class="d2-layout-header-aside-mask"></div>
        <!-- 主体内容 -->
        <div class="d2-layout-header-aside-content" flex="dir:top">
            <!-- 顶栏 -->
            <div
                    class="d2-theme-header"
                    :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
                    flex-box="0"
                    flex>
                <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0">
                    <img v-if="asideCollapse"
                         :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
                    <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
                </div>
                        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
                          <d2-icon name="bars"/>
                        </div>
                <d2-menu-header flex-box="1"/>
                <!-- 顶栏右侧 -->
                <div class="d2-header-right" flex-box="0">
                    <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
                    <d2-header-search @click="handleSearchClick"/>
                    <d2-header-theme/>
                    <d2-header-user/>
                </div>
            </div>
            <!-- 下面 主体 -->
            <div class="d2-theme-container" flex-box="1" flex>
                <!-- 主体 侧边栏 -->
                <div
                        flex-box="0"
                        ref="aside"
                        class="d2-theme-container-aside"
                        :style="{
                        width: asideCollapse ? asideWidthCollapse : asideWidth,
                        opacity: this.searchActive ? 0.5 : 1,
                      }">
                    <d2-menu-side/>
                </div>
                <!-- 主体 -->
                <div class="d2-theme-container-main" flex-box="1" flex>
                    <!-- 搜索 -->
                    <transition name="fade-scale">
                        <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
                            <d2-panel-search
                                    ref="panelSearch"
                                    @close="searchPanelClose"/>
                        </div>
                    </transition>
                    <!-- 内容 -->
                    <transition name="fade-scale">
                        <div v-if="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
                            <!-- 页面 -->
                            <div class="d2-theme-container-main-body" flex-box="1">
                                <transition :name="transitionActive ? 'fade-transverse' : ''">
                                    <keep-alive :include="keepAlive">
                                        <router-view/>
                                    </keep-alive>
                                </transition>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <div class="upload-wrapper">
            <transition name="fade">
                <div class="upload-btn-item" v-if="actionShow">
                    <div id="filePicker">
                        <el-button size="medium" type="primary" icon="fa fa-cloud-upload" circle></el-button>
                    </div>
                    <vue-upload
                            ref="uploader"
                            uploadButton="#filePicker"
                            multiple
                            @fileChange="fileChange"
                            @progress="onProgress"
                            @success="onSuccess"
                            url="/v1/file/upload ">
                    </vue-upload>
                </div>
            </transition>
            <transition name="fade" v-if="actionShow">
                <div class="upload-btn-item">
                    <el-button size="medium" type="success" icon="el-icon-folder-add" circle></el-button>
                </div>
            </transition>
            <transition name="fade">
                <div class="upload-btn-item">
                    <el-button size="medium" type="warning" icon="el-icon-plus" circle
                               @click="handleToggleBtnClick"></el-button>
                </div>
            </transition>
        </div>
        <!--    https://www.jianshu.com/p/989af714553d    -->
        <transition name="fade" v-if="isUploadFiles">
            <div class="upload-file-list-wrapper">
                <el-container>
                    <el-header class="upload-file-list-header">
                        上传列表
                        <i class="el-icon-error" @click="handleCloseFileListWrapper"/>
                    </el-header>
                    <el-main>
                        <div v-for="(item,index) in files" :key="index">
                            <span><i class="bg"></i>{{item.name}}</span>
                            <div v-if="item.progressFlag">
                                <el-progress :percentage="item.progressPercent"></el-progress>
                            </div>
                            <span v-else-if="item.successFlag">上传成功!</span>
                            <span v-else>上传失败!</span>
                            <span>{{item.size}}</span>
                            <div v-if="item.progressFlag">
                                <span>[删除]</span>
                                <span>[下载]</span>
                            </div>
                            <div v-else>

                            </div>
                        </div>


                    </el-main>
                </el-container>
            </div>
        </transition>
    </div>
</template>

<script>
    import d2MenuSide from './components/menu-side'
    import d2MenuHeader from './components/menu-header'
    import d2Tabs from './components/tabs'
    import d2HeaderFullscreen from './components/header-fullscreen'
    import d2HeaderSearch from './components/header-search'
    import d2HeaderSize from './components/header-size'
    import d2HeaderTheme from './components/header-theme'
    import d2HeaderUser from './components/header-user'
    import d2HeaderLog from './components/header-log'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import mixinSearch from './mixins/search'
    import vueUpload from '../../components/upload/upload'
    export default {
        name: 'd2-layout-header-aside',
        mixins: [
            mixinSearch
        ],
        components: {
            d2MenuSide,
            d2MenuHeader,
            d2Tabs,
            d2HeaderFullscreen,
            d2HeaderSearch,
            d2HeaderSize,
            d2HeaderTheme,
            d2HeaderUser,
            d2HeaderLog,
            vueUpload,
        },
        data() {
            return {
                // [侧边栏宽度] 正常状态
                asideWidth: '200px',
                // [侧边栏宽度] 折叠状态
                asideWidthCollapse: '65px',
                actionShow: false,
                isUploadFiles: true,
                files: [],
                fileList: [],
            }
        },
        mounted() {
            // let body = document.querySelector('body')
            // body.addEventListener('click',(e)=>{
            //     if(e.target.className == 'upload-wrapper'){
            //         this.actionShow = true
            //     }else {
            //         this.actionShow = false
            //     }
            // })
        },
        computed: {
            ...mapState('d2admin', {
                keepAlive: state => state.page.keepAlive,
                grayActive: state => state.gray.active,
                transitionActive: state => state.transition.active,
                asideCollapse: state => state.menu.asideCollapse
            }),
            ...mapGetters('d2admin', {
                themeActiveSetting: 'theme/activeSetting'
            }),
            /**
             * @description 最外层容器的背景图片样式
             */
            styleLayoutMainGroup() {
                return {
                    ...this.themeActiveSetting.backgroundImage ? {
                        backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
                    } : {}
                }
            },
            uploader() {
                return this.$refs.uploader;
            }
        },
        methods: {
            ...mapActions('d2admin/menu', [
                'asideCollapseToggle'
            ]),
            fileChange(file) {
                if (!file.size) return;
                this.fileList.push(file);
                console.log(file);
            },
            onProgress(file, percent) {
                $(`.file-${file.id} .progress`).css('width', percent * 100 + '%');
                $(`.file-${file.id} .file-status`).html((percent * 100).toFixed(2) + '%');
            },
            onSuccess (file, response) {
                console.log('上传成功', response);
                if (response.needMerge) {
                    api.mergeUpload({
                        tempName: response.tempName,
                        fileName: file.name
                    }).then(res => {
                        let $fileStatus = $(`.file-${file.id} .file-status`);
                        console.log(res);
                        if (res.status === 0) {
                            $fileStatus.html('上传成功，转码中');
                        } else if (res.status === 1) {
                            $fileStatus.html('上传失败');
                        } else if (res.status === 2) {
                            $fileStatus.html('上传成功');
                        }
                    });
                }
            },
            resume(file) {
                this.uploader.upload(file);
            },
            stop(file) {
                this.uploader.stop(file);
            },
            remove(file) {
                // 取消并中断文件上传
                this.uploader.cancelFile(file);
                // 在队列中移除文件
                this.uploader.removeFile(file, true);
                // 在ui上移除
                let index = this.fileList.findIndex(ele => ele.id === file.id);
                this.fileList.splice(index, 1);
            },
            fileSize(size) {
                return WebUploader.Base.formatSize(size);
            },
            fileCategory(ext) {
                let type = '';
                const typeMap = {
                    image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
                    video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
                    text: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
                };
                Object.keys(typeMap).forEach((_type) => {
                    const extensions = typeMap[_type];
                    if (extensions.indexOf(ext) > -1) {
                        type = _type
                    }
                });
                return type
            },
            handleProgres(event, file, fileList) {
                this.files = fileList
                this.files.forEach(item => {
                    item.progressFlag = true
                    console.log(item)
                    item.progressPercent = item.percentage;
                    this.files = Object.assign({}, this.files);
                })

            },
            handleFileSuccess(res, file, fileList) {
                this.fileArr = fileList
                this.fileArr.forEach((item, index) => {
                    item.progressFlag = false
                    if (item.status == 'success') {
                        item.successFlag = true
                    } else {
                        item.successFlag = false
                    }
                })
            },
            handleCloseFileListWrapper() {
                this.isUploadFiles = false;
            },
            /**
             * 接收点击切换侧边栏的按钮
             */
            handleToggleAside() {
                this.asideCollapseToggle()
            },
            handleToggleBtnClick() {
                this.actionShow = !this.actionShow
            }
        }
    }
</script>

<style lang="scss">
    // 注册主题
    @import '~@/assets/style/theme/register.scss';

    .upload-file-list-wrapper {
        background: #FFF;
        width: 400px;
        height: 300px;
        position: fixed;
        bottom: 50px;
        right: 130px;
        border-radius: 5px;

        .upload-file-list-header {
            background: #66b1ff;
            height: 40px !important;
            line-height: 40px;
            color: white;

            i {
                float: right;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }

    .upload-wrapper {
        display: flex;
        flex-direction: column;
        position: fixed;
        bottom: 50px;
        right: 50px;

        .el-button {
            width: 48px;
            height: 48px;
            font-size: 18px;
        }

        .upload-btn-item {
            margin-top: 12px;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }

        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
        {
            opacity: 0;
        }
    }
</style>
