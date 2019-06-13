<template>
  <el-dropdown size="small" class="d2-mr" trigger="click">
    <span>
      <span class="user-avatar" :style="{backgroundImage: 'url(https://upload.jianshu.io/users/upload_avatars/4759699/e2a45785-42a9-47b0-9f74-0f55c0fd3e23.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96)'}"></span>
      &nbsp;毛子坤_
    </span>
    <el-dropdown-menu slot="dropdown" >
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    }
  }
}
</script>
<style lang="scss">
  .user-avatar {
    margin-left: 10px;
    height: 32px;
    width: 32px;
    border-radius: 3px 3px 3px 3px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    background-color: rgba(0,0,0,.02);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
  }
</style>