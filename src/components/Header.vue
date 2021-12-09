<template>
  <div class="header">
    <div class="left">
      <i v-if="hasBack" class="el-icon-back" @click="back"></i>
      <span style="font-size: 20px">{{ name }}</span>
    </div>
    <div class="right">
      <el-popover
          :width="320"
          placement="bottom"
          popper-class="popper-user-box"
          trigger="click"
      >
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom"/>
            {{ userInfo && userInfo.nickName || '' }}
            <i class="el-icon-caret-bottom"/>
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ userInfo && userInfo.loginUserName || '' }}</p>
          <p>昵称：{{ userInfo && userInfo.nickName || '' }}</p>
          <el-tag class="logout" effect="dark" size="small" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive, toRefs} from 'vue'
import {useRouter} from 'vue-router'
import axios from '@/utils/axios'
import {localRemove, localGet, pathMap} from '@/utils'

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter()
    const state = reactive({
      name: '',
      userInfo: null,
      hasBack: false
    })

    onMounted(() => {
      if (localGet('token') && state.userInfo == null) {
        getUserInfo()
      }
    })

    const getUserInfo = async () => {
      // 获取用户信息
      const userInfo = await axios.get('/users/profile').catch(() => {})
      state.userInfo = {
        nickName: userInfo.data.data.account,
        loginUserName: userInfo.data.data.account,
      }
    }

    const logout = () => {
      // axios.delete('/logout').then(() => {
      //   localRemove('token')
      //   window.location.reload()
      // })
      localRemove('token')
      window.location.reload()
    }
    const back = () => {
      router.back()
    }
    router.afterEach((to) => {
      const {id} = to.query
      state.name = pathMap[to.name]
      state.hasBack = [
        'extensions_edit',
        'gateways_edit',
        'destination_edit',
        'inbound_edit',
        'outbound_edit',
        'dialplan_xml'
      ].includes(to.name)
    })
    return {
      ...toRefs(state),
      logout,
      back
    }
  }
})
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.el-icon-back {
  border: 1px solid #e9e9e9;
  padding: 4px;
  border-radius: 50px;
  margin-right: 10px;
}

.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}

.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>
<style>
.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}

.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}

.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>