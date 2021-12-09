<template>
  <div class="add">
    <el-card class="add-container affix-container">
      <el-affix :offset="60" style="text-align: right" target=".affix-container">
        <el-popconfirm v-if="gatewaysForm.gateway_uuid" title="Are you sure to copy it?" @confirm="copy">
          <template #reference>
            <el-button icon="el-icon-document-copy" size="mini" type="info">COPY</el-button>
          </template>
        </el-popconfirm>
        <el-button icon="el-icon-document-add" size="mini" type="primary" @click="save">SAVE</el-button>
      </el-affix>
      <el-form ref="gatewaysRef" :model="gatewaysForm" :rules="rules"
               class="gatewaysForm" label-width="300px" size="small">
        <el-form-item label="Gateway" prop="gateway" required>
          <el-input v-model="gatewaysForm.gateway" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the gateway name here. </p>
        </el-form-item>
        <el-form-item label="Username" prop="username" required>
          <el-input v-model="gatewaysForm.username" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the username here. </p>
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-input v-model="gatewaysForm.password" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the password here.</p>
        </el-form-item>
        <el-form-item label="From User" prop="from_user">
          <el-input v-model="gatewaysForm.from_user" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the from-user here. </p>
        </el-form-item>
        <el-form-item label="From Domain" prop="from_domain">
          <el-input v-model="gatewaysForm.from_domain" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the from-domain here. </p>
        </el-form-item>
        <el-form-item label="Proxy" prop="proxy" required>
          <el-input v-model="gatewaysForm.proxy" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the hostname or IP address of the proxy. host[:port] </p>
        </el-form-item>
        <el-form-item label="Realm" prop="realm">
          <el-input v-model="gatewaysForm.realm" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the realm here. </p>
        </el-form-item>
        <el-form-item label="Expire Seconds" prop="expire_seconds" required>
          <el-input-number v-model="gatewaysForm.expire_seconds" :max="65535" :min="1" :step="1" maxlength="255"
                           style="width: 200px"></el-input-number>
          <p class="note">Enter the expire-seconds here. </p>
        </el-form-item>
        <el-form-item label="Register" prop="register" required>
          <el-select v-model="gatewaysForm.register" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Choose whether to register. </p>
        </el-form-item>
        <el-form-item label="Retry Seconds" prop="retry_seconds" required>
          <el-input-number v-model="gatewaysForm.retry_seconds" :max="65535" :min="1" :step="1" maxlength="255"
                           style="width: 200px"></el-input-number>
          <p class="note">Enter the retry-seconds here. </p>
        </el-form-item>
        <el-form-item v-if="advanced==false">
          <el-button icon="el-icon-setting" size="mini" type="info" @click="advanced=true">ADVANCED</el-button>
        </el-form-item>
        <div v-show="advanced">
          <el-form-item label="Distinct To" prop="distinct_to">
            <el-select v-model="gatewaysForm.distinct_to" placeholder="Empty" style="width: 94px;">
              <el-option label="" value=""></el-option>
              <el-option label="True" value="true"></el-option>
              <el-option label="False" value="false"></el-option>
            </el-select>
            <p class="note">Enter the distinct_to here. </p>
          </el-form-item>
          <el-form-item label="Auth Username" prop="auth_username">
            <el-input v-model="gatewaysForm.auth_username" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the auth-username here. </p>
          </el-form-item>
          <el-form-item label="Extension" prop="extension">
            <el-input v-model="gatewaysForm.extension" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the extension here. </p>
          </el-form-item>
          <el-form-item label="Register Transport" prop="register_transport">
            <el-select v-model="gatewaysForm.register_transport" placeholder="Empty" style="width: 250px;">
              <el-option
                  v-for="item in registerTransportOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <p class="note">Choose whether to register-transport. </p>
          </el-form-item>
          <el-form-item label="Register Proxy" prop="register_proxy">
            <el-input v-model="gatewaysForm.register_proxy" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the hostname or IP address of the register proxy. host[:port] </p>
          </el-form-item>
          <el-form-item label="Outbound Proxy" prop="outbound_proxy">
            <el-input v-model="gatewaysForm.outbound_proxy" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the hostname or IP address of the outbound proxy. host[:port] </p>
          </el-form-item>
          <el-form-item label="Caller ID In From" prop="caller_id_in_from">
            <el-select v-model="gatewaysForm.caller_id_in_from" placeholder="Empty" style="width: 94px;">
              <el-option label="" value=""></el-option>
              <el-option label="True" value="true"></el-option>
              <el-option label="False" value="false"></el-option>
            </el-select>
            <p class="note">Enter the caller-id-in-from. </p>
          </el-form-item>
          <el-form-item label="Supress CNG" prop="supress_cng">
            <el-select v-model="gatewaysForm.supress_cng" placeholder="Empty" style="width: 94px;">
              <el-option label="" value=""></el-option>
              <el-option label="True" value="true"></el-option>
              <el-option label="False" value="false"></el-option>
            </el-select>
            <p class="note">Enter the supress-cng </p>
          </el-form-item>
          <el-form-item label="Sip CID Type" prop="sip_cid_type">
            <el-input v-model="gatewaysForm.sip_cid_type" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the sip cid type: none, pid, and rpid. </p>
          </el-form-item>
          <el-form-item label="Codec Preferences" prop="codec_prefs">
            <el-input v-model="gatewaysForm.codec_prefs" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the codec preferences as a list. Ex: PCMA,PCMU,G722 </p>
          </el-form-item>
          <el-form-item label="Extension In Contact" prop="extension_in_contact">
            <el-select v-model="gatewaysForm.extension_in_contact" placeholder="Select" style="width: 94px;">
              <el-option label="" value=""></el-option>
              <el-option label="True" value="true"></el-option>
              <el-option label="False" value="false"></el-option>
            </el-select>
            <p class="note">Enter the Extension In Contact </p>
          </el-form-item>
          <el-form-item label="Ping" prop="ping">
            <el-input v-model="gatewaysForm.ping" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the ping interval here in seconds. </p>
          </el-form-item>
          <el-form-item label="Ping Min" prop="ping_min">
            <el-input-number v-model="gatewaysForm.ping_min" :max="65535" :min="1" :step="1" maxlength="255"
                             style="width: 200px"></el-input-number>
            <p class="note"></p>
          </el-form-item>
          <el-form-item label="Ping Max" prop="ping_max">
            <el-input-number v-model="gatewaysForm.ping_max" :max="65535" :min="1" :step="1" maxlength="255"
                             style="width: 200px"></el-input-number>
            <p class="note"></p>
          </el-form-item>
          <el-form-item label="Channels" prop="channels">
            <el-input-number v-model="gatewaysForm.channels" :max="65535" :min="1" :step="1" maxlength="255"
                             style="width: 200px"></el-input-number>
            <p class="note">Maximum number of simultaneous channels available in the gateway. </p>
          </el-form-item>
          <el-form-item label="Hostname" prop="hostname">
            <el-input v-model="gatewaysForm.hostname" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the hostname / switchname. </p>
          </el-form-item>
          <el-form-item label="Domain" prop="domain_uuid">
            <el-select v-model="gatewaysForm.domain_uuid" placeholder="Empty" style="width: 250px;">
              <el-option v-for="item in domainUuidOptions"
                         :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <p class="note">Select the Domain </p>
          </el-form-item>
        </div>
        <el-form-item label="Context" prop="context">
          <el-input v-model="gatewaysForm.context" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the context here. </p>
        </el-form-item>
        <el-form-item label="Profile" prop="profile" required>
          <el-select v-model="gatewaysForm.profile" placeholder="Empty" style="width: 250px;">
            <el-option v-for="item in profileOptions"
                       :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <p class="note">Enter the profile here. </p>
        </el-form-item>
        <el-form-item label="Enabled" prop="enabled" required>
          <el-select v-model="gatewaysForm.enabled" placeholder="Select" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Enable or Disable the Gateway </p>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="gatewaysForm.description" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the description. </p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, reactive, ref, toRefs} from 'vue'
// @ts-ignore
import axios from '@/utils/axios'
import {useRoute, useRouter} from 'vue-router'
import {ElMessage} from "element-plus";

interface Gateway {
  gateway_uuid: string
  gateway: string
  context: string
  hostname: string
  enabled: string
  description: string
  channels: number
  ping_max: number
  ping_min: number
  ping: string
  extension_in_contact: string
  codec_prefs: string
  supress_cng: string
  caller_id_in_from: string
  register_proxy: string
  realm: string
  proxy: string
  from_domain: string
  from_user: string
  password: string
  outbound_proxy: string
  username: string
  sip_cid_type: string
  extension: string,
  register_transport: string
  expire_seconds: number
  register: string
  retry_seconds: number
  distinct_to: string
  auth_username: string
  domain_uuid: string
  profile: string
}

export default defineComponent({
  name: 'GatewaysEdit',
  setup() {
    const gatewaysRef = ref()
    const route = useRoute()
    const router = useRouter()
    const {id} = route.query
    let state = reactive({
      advanced: false,
      gatewaysForm: ref<Gateway>({
        gateway_uuid: '',
        hostname: '',
        channels: 0,
        ping_max: 0,
        ping_min: 0,
        ping: '',
        extension_in_contact: '',
        codec_prefs: '',
        supress_cng: '',
        caller_id_in_from: '',
        register_proxy: '',
        realm: '',
        proxy: '',
        from_domain: '',
        from_user: '',
        password: '',
        outbound_proxy: '',
        username: '',
        gateway: '',
        sip_cid_type: '',
        extension: '',
        register_transport: '',
        expire_seconds: 800,
        register: 'true',
        retry_seconds: 30,
        distinct_to: '',
        auth_username: '',
        domain_uuid: '',
        context: 'public',
        profile: 'external',
        enabled: 'true',
        description: '',
      }),
      // 提交表单时的验证规则
      rules: {
        sip_cid_type: [
          {pattern: /^(none|pid|rpid)$/, trigger: ['change']}
        ],
      },
    });

    const domainUuidOptions = ref<Option[]>()
    const domainOptions = async () => {
      let ress: HttpResult = await axios.get('/options/domains')
      domainUuidOptions.value = ress.data.data
      if (!id) {
        axios.get('/options/domain_uuid').then((res: HttpResult) => {
          state.gatewaysForm.domain_uuid = res.data.data
          ress.data.data.forEach((v: Option) => {
            if (v.value == state.gatewaysForm.domain_uuid) {
              state.gatewaysForm.context = v.label
            }
          })
        }).catch(() => {})
      }
    }

    // let instance
    onMounted(() => {

      domainOptions()

      if (id) {
        axios.get(`/gateways/${id}`).then((res: HttpResult) => {
          state.gatewaysForm = res.data.data
        }).catch(() => {});
      }
    })

    onBeforeUnmount(() => {
    })

    const copy = () => {
      axios.post(`/gateways/copy/${state.gatewaysForm.gateway_uuid}`).then((res: HttpResult) => {
        ElMessage.success('Copy succeeded.')
        router.push({path: '/gateways'})
      }).catch(() => {
      });
    }

    const save = () => {
      gatewaysRef.value.validate((valid: boolean) => {
        if (!valid) {
          ElMessage.error('Please check the form items.')
          return
        }
        axios.post('/gateways/save', state.gatewaysForm).then((res: HttpResult) => {
          let id: string = res.data.data
          ElMessage.success(state.gatewaysForm.gateway_uuid ? 'Update succeeded.' : 'Add succeeded.')
          router.push({path: '/gateways_edit', query: {id: id}})
          state.gatewaysForm.gateway_uuid = id
        }).catch(() => {
        })
      })
    }

    let registerTransportOptions = [
      {value: "", label: ""},
      {value: "udp", label: "udp"},
      {value: "tcp", label: "tcp"},
      {value: "tls", label: "tls"},
    ]

    let profileOptions = ref<Option>()
    axios.get('/options/profile').then((res: HttpResult) => {
      profileOptions.value = res.data.data
    }).catch(() => {
    });

    return {
      ...toRefs(state),
      registerTransportOptions,
      domainUuidOptions,
      profileOptions,
      gatewaysRef,
      copy,
      save,
    }
  }
})
</script>

<style scoped>
.note {
  font-size: 12px;
  color: #999999;
  line-height: 30px;
  padding: 0px;
  margin: 0px;
  clear: both;
}

.add {
  display: flex;
}

.add-container {
  flex: 1;
  height: 100%;
}
</style>