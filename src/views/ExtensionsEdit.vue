<template>
  <div class="add">
    <el-card class="add-container affix-container">
      <el-affix :offset="60" style="text-align: right" target=".affix-container">
        <el-popconfirm v-if="extensionForm.extension_uuid" title="Are you sure to copy it?" @confirm="copy" >
          <template #reference>
            <el-button icon="el-icon-document-copy" size="mini" type="info">COPY</el-button>
          </template>
        </el-popconfirm>
        <el-button icon="el-icon-document-add" size="mini" type="primary" @click="save">SAVE</el-button>
      </el-affix>
      <el-form ref="extensionsRef" :model="extensionForm" :rules="rules" class="extensionForm" label-width="300px" size="small">
        <el-form-item label="Extension" prop="extension" required>
          <el-input v-model="extensionForm.extension" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the alphanumeric extension. The default configuration allows 2 - 15 digit
            extensions. </p>
        </el-form-item>
        <el-form-item label="Number Alias" prop="number_alias">
          <el-input v-model="extensionForm.number_alias" maxlength="255" style="width: 200px"></el-input>
          <p class="note">If the extension is numeric then number alias is optional.</p>
        </el-form-item>
        <el-form-item v-if="extensionForm.extension_uuid" label="Password" prop="password" required>
          <el-input v-model="extensionForm.password" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the password here. </p>
        </el-form-item>

<!--        <el-form-item v-if="!extensionForm.extension_uuid" label="Range" prop="range">-->
<!--          <el-select v-model="extensionForm.range" style="width: 100px;">-->
<!--            <el-option-->
<!--                v-for="(value, index) in rangeOptions"-->
<!--                :key="index"-->
<!--                :label="value"-->
<!--                :value="value"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          <p class="note">Enter the number of extensions to create. Increments each extension by 1. </p>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Users" prop="users">-->
<!--          <el-select-v2-->
<!--              v-model="extensionForm.users"-->
<!--              :options="usersOptions"-->
<!--              multiple-->
<!--              placeholder="Please select"-->
<!--              style="width: 200px"-->
<!--          />-->
<!--          <p class="note">Assign users to this extension. </p>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Voicemail Password" prop="voicemail_password">-->
<!--          <el-input v-model="extensionForm.voicemail_password" maxlength="255" show-password style="width: 200px"-->
<!--                    type="password"></el-input>-->
<!--          <p class="note">Enter the numeric voicemail password here. </p>-->
<!--        </el-form-item>-->
        <el-form-item label="Account Code" prop="accountcode">
          <el-input v-model="extensionForm.accountcode" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the account code here. </p>
        </el-form-item>
        <el-form-item label="Effective Caller ID Name" prop="effective_caller_id_name">
          <el-input v-model="extensionForm.effective_caller_id_name" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the internal caller ID name here. </p>
        </el-form-item>
        <el-form-item label="Effective Caller ID Number" prop="effective_caller_id_number">
          <el-input v-model="extensionForm.effective_caller_id_number" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the internal caller ID number here. </p>
        </el-form-item>
        <el-form-item label="Outbound Caller ID Name" prop="outbound_caller_id_name">
          <el-input v-model="extensionForm.outbound_caller_id_name" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the external (public) caller ID name here. </p>
        </el-form-item>
        <el-form-item label="Outbound Caller ID Number" prop="outbound_caller_id_number">
          <el-input v-model="extensionForm.outbound_caller_id_number" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the external (public) caller ID number here. </p>
        </el-form-item>
        <el-form-item label="Emergency Caller ID Name" prop="emergency_caller_id_name">
          <el-input v-model="extensionForm.emergency_caller_id_name" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the emergency caller ID name here. </p>
        </el-form-item>
        <el-form-item label="Emergency Caller ID Number" prop="emergency_caller_id_number">
          <el-input v-model="extensionForm.emergency_caller_id_number" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the emergency caller ID number here. </p>
        </el-form-item>
        <el-form-item label="Directory Full Name">
          <el-col :span="11">
            <el-input v-model="extensionForm.directory_first_name" maxlength="255" style="width: 94px"></el-input>
          </el-col>
          <el-col :span="2" class="line">&nbsp;-&nbsp;</el-col>
          <el-col :span="11">
            <el-input v-model="extensionForm.directory_last_name" maxlength="255" style="width: 94px"></el-input>
          </el-col>
          <p class="note">Enter the first name followed by the last name. </p>
        </el-form-item>
        <el-form-item label="Directory Visible" prop="directory_visible">
          <el-select v-model="extensionForm.directory_visible" placeholder="Select" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Select whether to hide the name from the directory.</p>
        </el-form-item>
        <el-form-item label="Directory Extension Visible" prop="directory_exten_visible">
          <el-select v-model="extensionForm.directory_exten_visible" placeholder="Select" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Select whether announce the extension when calling the directory. </p>
        </el-form-item>
        <el-form-item label="Max Registrations" prop="max_registrations">
          <el-input v-model="extensionForm.max_registrations" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the maximum registration allowed for this user</p>
        </el-form-item>
        <el-form-item label="Limit Max" prop="limit_max">
          <el-input v-model="extensionForm.limit_max" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the max number of outgoing calls for this user.</p>
        </el-form-item>
        <el-form-item label="Limit Destination" prop="limit_destination">
          <el-input v-model="extensionForm.limit_destination" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the destination to send the calls when the max number of outgoing calls has been
            reached. </p>
        </el-form-item>
<!--        <el-form-item label="Voicemail Enabled" prop="voicemail_enabled">-->
<!--          <el-select v-model="extensionForm.voicemail_enabled" placeholder="Select" style="width: 94px;">-->
<!--            <el-option label="True" value="true"></el-option>-->
<!--            <el-option label="False" value="false"></el-option>-->
<!--          </el-select>-->
<!--          <p class="note">Enable/disable voicemail for this extension.</p>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Voicemail Mail To" prop="voicemail_mail_to">-->
<!--          <el-input v-model="extensionForm.voicemail_mail_to" maxlength="255" style="width: 200px"></el-input>-->
<!--          <p class="note">Enter the email address to send voicemail to (optional).</p>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Voicemail File" prop="voicemail_file">-->
<!--          <el-select v-model="extensionForm.voicemail_file" placeholder="Select" style="width: 250px;">-->
<!--            <el-option-->
<!--                v-for="item in voicemailFileOptions"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--          <p class="note">Select a listening option to include with the email notification.</p>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Voicemail Keep Local" prop="voicemail_local_after_email">-->
<!--          <el-select v-model="extensionForm.voicemail_local_after_email" placeholder="Select" style="width: 94px;">-->
<!--            <el-option label="True" value="true"></el-option>-->
<!--            <el-option label="False" value="false"></el-option>-->
<!--          </el-select>-->
<!--          <p class="note">Enable/disable voicemail for this extension.</p>-->
<!--        </el-form-item>-->
        <el-form-item label="Missed Call" prop="missed_call_app">
          <el-select v-model="extensionForm.missed_call_app" placeholder="Empty" style="width: 94px;">
            <el-option label="" value=""></el-option>
            <el-option label="email" value="email"></el-option>
          </el-select>
          &nbsp;
          <el-input v-show="extensionForm.missed_call_app=='email'" v-model="extensionForm.missed_call_data"
                    maxlength="255" style="width: 200px"></el-input>
          <p class="note">Select the notification type, and enter the appropriate destination. </p>
        </el-form-item>
        <el-form-item label="Toll Allow" prop="toll_allow">
          <el-input v-model="extensionForm.toll_allow" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the toll allow value here. (Examples: domestic,international,local)</p>
        </el-form-item>
        <el-form-item label="Call Timeout" prop="call_timeout">
          <el-input-number v-model="extensionForm.call_timeout" :max="255" :min="1" :step="1" maxlength="255"
                           style="width: 200px"></el-input-number>
          <p class="note">Enter the call timeout.</p>
        </el-form-item>
        <el-form-item label="Call Group" prop="call_group">
          <el-input v-model="extensionForm.call_group" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the user call group here. Groups available by default: sales, support, billing.</p>
        </el-form-item>
        <el-form-item label="Call Screen" prop="call_screen_enabled">
          <el-select v-model="extensionForm.call_screen_enabled" placeholder="Select" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Choose whether to enable or disable call screening.</p>
        </el-form-item>
        <el-form-item label="Record" prop="user_record">
          <el-select v-model="extensionForm.user_record" placeholder="Select" style="width: 120px;">
            <el-option
                v-for="item in userRecordOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <p class="note">Choose whether to record local, inbound, outbound, or all.</p>
        </el-form-item>
        <el-form-item label="Hold Music" prop="hold_music">
          <el-select v-model="extensionForm.hold_music" placeholder="Empty" style="width: 120px;">
            <el-option label="" value=""></el-option>
            <el-option-group
                v-for="group in holdMusicOptions"
                :key="group.label"
                :label="group.label"
            >
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-option-group>
          </el-select>
          <p class="note">Select the MOH Category here.</p>
        </el-form-item>
        <el-form-item label="Domain" prop="domain_uuid">
          <el-select v-model="extensionForm.domain_uuid" style="width: 120px;">
            <el-option
                v-for="item in domainUuidOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <p class="note">Select the Domain</p>
        </el-form-item>
        <el-form-item label="Context" prop="user_context" required>
          <el-input v-model="extensionForm.user_context" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the alphanumeric extension. The default configuration allows 2 - 15 digit
            extensions. </p>
        </el-form-item>
        <el-form-item v-if="advanced==false">
          <el-button icon="el-icon-setting" size="mini" type="info" @click="advanced=true">ADVANCED</el-button>
        </el-form-item>
        <div v-show="advanced">
          <el-form-item label="Auth ACL" prop="auth_acl">
            <el-input v-model="extensionForm.auth_acl" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter the Auth ACL here. </p>
          </el-form-item>
          <el-form-item label="CIDR" prop="cidr">
            <el-input v-model="extensionForm.cidr" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Enter allowed address/ranges in CIDR notation (comma separated). </p>
          </el-form-item>
          <el-form-item label="SIP Force Contact" prop="sip_force_contact">
            <el-select v-model="extensionForm.sip_force_contact" placeholder="Empty" style="width: 250px;">
              <el-option
                  v-for="item in sipForceContactOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <p class="note">Choose whether to rewrite the contact port, or rewrite both the contact IP and port.</p>
          </el-form-item>
          <el-form-item label="SIP Force Expires" prop="sip_force_expires">
            <el-input-number v-model="extensionForm.sip_force_expires" :min="1" :step="1" maxlength="255"
                             style="width: 200px"></el-input-number>
            <p class="note">To prevent stale registrations SIP Force expires can override the client expire. </p>
          </el-form-item>
          <el-form-item label="MWI Account" prop="mwi_account">
            <el-input v-model="extensionForm.mwi_account" maxlength="255" style="width: 200px"></el-input>
            <p class="note">MWI Account with user@domain of the voicemail to monitor. </p>
          </el-form-item>
          <el-form-item label="SIP Bypass Media" prop="sip_bypass_media">
            <el-select v-model="extensionForm.sip_bypass_media" placeholder="Empty" style="width: 250px;">
              <el-option
                  v-for="item in sipBypassMediaOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <p class="note">Choose whether to send the media stream point to point or in transparent proxy mode.</p>
          </el-form-item>
          <el-form-item label="Absolute Codec String" prop="absolute_codec_string">
            <el-input v-model="extensionForm.absolute_codec_string" maxlength="255" style="width: 200px"></el-input>
            <p class="note">Absolute Codec String for the extension </p>
          </el-form-item>
          <el-form-item label="Force ping" prop="force_ping">
            <el-select v-model="extensionForm.force_ping" placeholder="Empty" style="width: 94px;">
              <el-option label="" value=""></el-option>
              <el-option label="True" value="true"></el-option>
              <el-option label="False" value="false"></el-option>
            </el-select>
            <p class="note">Enable/disable voicemail for this extension.</p>
          </el-form-item>
          <el-form-item label="Dial String" prop="dial_string">
            <el-input v-model="extensionForm.dial_string" maxlength="4096" style="width: 200px"></el-input>
            <p class="note">Location of the endpoint. </p>
          </el-form-item>
        </div>
        <el-form-item label="Enabled" prop="enabled">
          <el-select v-model="extensionForm.enabled" placeholder="Select" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Set the status of the extension.</p>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="extensionForm.description" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the description.</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, reactive, ref, toRefs, watch} from 'vue'
// @ts-ignore
import axios from '@/utils/axios'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRoute, useRouter} from 'vue-router'

interface Extension {
  extension_uuid: string
  extension: string
  effective_caller_id_name: string
  outbound_caller_id_name: string
  call_group: string
  enabled: string
  description: string
  number_alias: string
  // range: number
  users: string[]
  password: string
  // voicemail_password: string
  accountcode: string
  effective_caller_id_number: string
  outbound_caller_id_number: string
  emergency_caller_id_name: string
  emergency_caller_id_number: string
  directory_first_name: string
  directory_last_name: string
  directory_visible: string
  directory_exten_visible: string
  max_registrations: string
  limit_max: number
  limit_destination: string
  // voicemail_enabled: string
  // voicemail_mail_to: string
  // voicemail_file: string
  // voicemail_local_after_email: string
  missed_call_app: string
  missed_call_data: string
  toll_allow: string
  call_timeout: number
  call_screen_enabled: string
  user_record: string
  hold_music: string
  domain_uuid: string
  user_context: string
  // advanced
  auth_acl: string
  cidr: string
  sip_force_contact: string
  sip_force_expires: number
  mwi_account: string
  sip_bypass_media: string
  absolute_codec_string: string
  force_ping: string
  dial_string: string
}

export default defineComponent({
  name: 'ExtensionsEdit',
  setup() {
    const extensionsRef = ref()
    const route = useRoute()
    const router = useRouter()
    const {id} = route.query
    let state = reactive({
      advanced: false,
      extensionForm: ref<Extension>({
        extension_uuid: '',
        extension: '',
        number_alias: '',
        // range: 1,
        users: [],
        password: '',
        // voicemail_password: '',
        accountcode: '',
        effective_caller_id_name: '',
        effective_caller_id_number: '',
        outbound_caller_id_name: '',
        outbound_caller_id_number: '',
        emergency_caller_id_name: '',
        emergency_caller_id_number: '',
        directory_first_name: '',
        directory_last_name: '',
        directory_visible: 'true',
        directory_exten_visible: 'true',
        max_registrations: '',
        limit_max: 5,
        limit_destination: '!USER_BUSY',
        // voicemail_enabled: 'true',
        // voicemail_mail_to: '',
        // voicemail_file: 'attach',
        // voicemail_local_after_email: 'true',
        missed_call_app: '',
        missed_call_data: '',
        toll_allow: '',
        call_timeout: 30,
        call_group: '',
        call_screen_enabled: 'false',
        user_record: '',
        hold_music: '',
        domain_uuid: '',
        user_context: '',
        enabled: 'true',
        description: '',
        // advanced
        auth_acl: '',
        cidr: '',
        sip_force_contact: '',
        sip_force_expires: 0,
        mwi_account: '',
        sip_bypass_media: '',
        absolute_codec_string: '',
        force_ping: '',
        dial_string: '',
      }),
      // 提交表单时的验证规则
      rules: {
        extension: [
          {
            required: 'true',
            min: 2,
            message: 'The default configuration allows 2 - 15 digit extensions. ',
            trigger: ['change']
          }
        ],
        enabled: [
          {required: 'true', message: 'Required', trigger: ['change']}
        ],
      },
    });

    const domainUuidOptions = ref<Option[]>()
    const domainOptions = async () => {
      let ress: HttpResult = await axios.get('/options/domains')
      domainUuidOptions.value = ress.data.data
      if (!id) {
        axios.get('/options/domain_uuid').then((res: HttpResult) => {
          state.extensionForm.domain_uuid = res.data.data
          ress.data.data.forEach((v: Option) => {
            if (v.value == state.extensionForm.domain_uuid) {
              state.extensionForm.user_context = v.label
            }
          })
        }).catch(() => {})
      }
    }

    onMounted(() => {

      domainOptions()

      if (id) {
        axios.get(`/extensions/${id}`).then((res: HttpResult) => {
          let data: Extension = res.data.data
          state.extensionForm = data
        }).catch(()=>{});
      }
    })

    onBeforeUnmount(() => {
    })

    const copy = () => {
      ElMessageBox.prompt('Enter the new Extension...', 'Tip', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern:
            /^.{2,}$/,
        inputErrorMessage: 'The default configuration allows 2 - 15 digit extensions.',
      })
          .then(({value}) => {
            axios.get('/extensions/copy', {
              params: {
                extensionUuid: state.extensionForm.extension_uuid,
                extension: value,
              }
            }).then((res: HttpResult) => {
              ElMessage.success('Copy succeeded.')
              router.push({path: '/extensions'})
            }).catch(() => {
            });
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: 'Copy canceled',
            })
          })
    }

    const save = () => {
      extensionsRef.value.validate((valid: boolean) => {
        if (!valid) {
          ElMessage.error('Please check the form items.')
          return
        }
        if (state.extensionForm.extension.length > 8) {
          ElMessage.error('Cannot exceed 8 characters.')
          return
        }
        axios.post('/extensions/save', state.extensionForm).then((res: HttpResult) => {
          let id: string = res.data.data
          ElMessage.success(state.extensionForm.extension_uuid ? 'Update succeeded.' : 'Add succeeded.')
          router.push({path: '/extensions_edit', query: {id: id}})
          state.extensionForm.extension_uuid = id
        }).catch(() => {
        })
      })
    }

    // 固定形式
    let rangeOptions = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100, 150, 200, 250, 500, 750, 1000, 5000
    ]

    let holdMusicOptions = [
      {
        label: 'Music on Hold',
        options: [
          {value: "local_stream://default", label: "default"},
        ]
      },
      {
        label: 'Streams',
        options: [
          {value: "/tmp/hello1.wav", label: "moh"},
        ]
      },
    ]

    // @todo 数据应来自后端接口「二期」
    let userRecordOptions = [
      {value: "", label: "Disabled"},
      {value: "all", label: "All"},
      {value: "local", label: "Local"},
      {value: "inbound", label: "Inbound"},
      {value: "outbound", label: "Outbound"},
    ]

    // @todo 数据应来自后端接口「二期」
    // let voicemailFileOptions = [
    //   {value: "", label: "Listen Link (Login Required)"},
    //   {value: "link", label: "Download Link (No Login Required)"},
    //   {value: "attach", label: "Audio File Attachment"},
    // ]

    // 用户选项
    // let usersOptions = ref<Option>()
    // axios.get('/users/list').then((res: HttpResult) => {
    //   res.data.data.forEach((v: any) => {
    //     usersOptions.value.push({
    //       label: v.account,
    //       value: v.id,
    //     })
    //   })
    // }).catch(() => {
    // });

    // @todo 数据应来自后端接口「二期」
    let sipForceContactOptions = [
      {value: "", label: ""},
      {value: "NDLB-connectile-dysfunction", label: "Rewrite Contact IP and Port"},
      {value: "NDLB-connectile-dysfunction-2.0", label: "Rewrite Contact IP and Port 2.0"},
      {value: "NDLB-tls-connectile-dysfunction", label: "Rewrite TLS Contact Port"},
    ]

    // @todo 数据应来自后端接口「二期」
    let sipBypassMediaOptions = [
      {value: "", label: ""},
      {value: "bypass-media", label: "Bypass Media"},
      {value: "bypass-media-after-bridge", label: "Bypass Media After Bridge"},
      {value: "proxy-media", label: "Proxy Media"},
    ]

    // voicemail_file 联动逻辑
    // watch(() => state.extensionForm.voicemail_file, (n) => {
    //   if (n != 'attach') {
    //     state.extensionForm.voicemail_local_after_email = 'true'
    //   }
    // })
    // // voicemail_local_after_email 联动逻辑
    // watch(() => state.extensionForm.voicemail_local_after_email, (n) => {
    //   if (n != 'true') {
    //     state.extensionForm.voicemail_file = 'attach'
    //   }
    // })

    return {
      ...toRefs(state),
      // voicemailFileOptions,
      userRecordOptions,
      rangeOptions,
      // usersOptions,
      holdMusicOptions,
      domainUuidOptions,
      sipForceContactOptions,
      sipBypassMediaOptions,
      extensionsRef,
      save,
      copy,
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
