<template>
  <div class="add">
    <el-card class="add-container">
      <el-form ref="DestinationRef" :model="DestinationForm" :rules="rules"
               class="DestinationForm" label-width="300px" size="small">
        <el-form-item label="Type" prop="destination_type">
          <el-select v-model="DestinationForm.destination_type" style="width: 120px;">
            <el-option label="Inbound" value="inbound"></el-option>
            <el-option label="Outbound" value="outbound"></el-option>
<!--            <el-option label="Local" value="local"></el-option>-->
          </el-select>
          <p class="note">Select the type. </p>
        </el-form-item>

        <el-form-item label="Country Code" prop="destination_prefix">
          <el-input v-model="DestinationForm.destination_prefix" maxlength="32" style="width: 200px"></el-input>
          <p class="note">Enter the country code. </p>
        </el-form-item>
        <el-form-item label="Destination" prop="destination_number" required>
          <el-input v-model="DestinationForm.destination_number" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the destination. </p>
        </el-form-item>
        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="Caller ID Name" prop="destination_caller_id_name">
          <el-input v-model="DestinationForm.destination_caller_id_name" maxlength="255"
                    style="width: 200px"></el-input>
          <p class="note">Enter the caller ID name. </p>
        </el-form-item>
        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="Caller ID Number" prop="destination_caller_id_number">
          <el-input v-model="DestinationForm.destination_caller_id_number" :max="255" :min="0" :step="1" maxlength="255"
                    style="width: 200px"></el-input>
          <p class="note">Enter the caller ID number. </p>
        </el-form-item>
        <el-form-item label="Context" prop="destination_context">
          <el-input v-model="DestinationForm.destination_context" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the context. </p>
        </el-form-item>

        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="Actions">
          <el-col :span="11">
            <el-select v-show="!showAction" v-model="DestinationForm.destination_action" placeholder="Empty" style="width: 200px;">
              <el-option label="" value=""></el-option>
              <el-option-group
                  v-for="group in destinationActionOptions"
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
            <el-input v-show="showAction" v-model="DestinationForm.destination_action" maxlength="255" style="width: 200px" readonly></el-input>
          </el-col>
          <el-col :span="3">&nbsp;</el-col>
          <el-col :span="8">
            <el-button @click="showAction = !showAction" icon="el-icon-caret-left" size="mini" style="vertical-align: middle;" type="info"></el-button>
          </el-col>
          <p class="note" style="padding-top: 5px;"></p>
          <el-col :span="11">
            <el-select  v-show="!showAlternate" v-model="DestinationForm.destination_alternate_action" placeholder="Empty" style="width: 200px;">
              <el-option label="" value=""></el-option>
              <el-option-group
                  v-for="group in destinationActionOptions"
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
            <el-input v-show="showAlternate" v-model="DestinationForm.destination_alternate_action" maxlength="255" style="width: 200px" readonly></el-input>
          </el-col>
          <el-col :span="3">&nbsp;</el-col>
          <el-col :span="8">
            <el-button @click="showAlternate = !showAlternate" icon="el-icon-caret-left" size="mini" style="vertical-align: middle;" type="info"></el-button>
          </el-col>
        </el-form-item>
        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="User" prop="user_uuid">
          <el-select v-model="DestinationForm.user_uuid" placeholder="Empty" style="width: 94px;">
            <el-option
                v-for="item in userOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <p class="note">Assign this destination to a user. </p>
        </el-form-item>

        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="Caller ID Name Prefix" prop="destination_cid_name_prefix">
          <el-input v-model="DestinationForm.destination_cid_name_prefix" maxlength="255"
                    style="width: 200px"></el-input>
          <p class="note">Set a prefix on the caller ID name.</p>
        </el-form-item>

        <el-form-item label="Record" prop="destination_record">
          <el-select v-model="DestinationForm.destination_record" placeholder="Empty" style="width: 94px;">
            <el-option label="" value=""></el-option>
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note"></p>
        </el-form-item>

        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="Hold Music" prop="hold_music">
          <el-select v-model="DestinationForm.destination_hold_music" placeholder="Empty" style="width: 120px;">
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

        <el-form-item v-if="DestinationForm.destination_type === 'inbound'" label="Account Code" prop="destination_accountcode">
          <el-input v-model="DestinationForm.destination_accountcode" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter account code.</p>
        </el-form-item>
        <el-form-item label="Usage">
          <el-checkbox v-model="DestinationForm.destination_type_voice" label="Voice"></el-checkbox>
          <el-checkbox v-model="DestinationForm.destination_type_fax" label="Fax"></el-checkbox>
          <el-checkbox v-model="DestinationForm.destination_type_text" label="Text"></el-checkbox>
          <el-checkbox v-model="DestinationForm.destination_type_emergency" label="Emergency"></el-checkbox>
          <p class="note">Set how the Destination will be used.</p>
        </el-form-item>

        <el-form-item label="Domain" prop="domain_uuid">
          <el-select v-model="DestinationForm.domain_uuid" placeholder="Empty" style="width: 250px;">
            <el-option
                v-for="item in domainUuidtOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <p class="note">Select the Domain</p>
        </el-form-item>

        <el-form-item label="Order" prop="destination_order" required>
          <el-select v-model="DestinationForm.destination_order" placeholder="Empty" style="width: 94px;">
            <el-option
                v-for="order in destinationOrderOptions"
                :key="order"
                :label="order"
                :value="order"
            >
            </el-option>
          </el-select>
          <p class="note"></p>
        </el-form-item>

        <el-form-item label="Enabled" prop="enabled">
          <el-select v-model="DestinationForm.enabled" placeholder="Select" style="width: 94px;">
            <el-option label="True" value="true"></el-option>
            <el-option label="False" value="false"></el-option>
          </el-select>
          <p class="note">Enable or Disable the Destination </p>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="DestinationForm.destination_description" maxlength="255" style="width: 200px"></el-input>
          <p class="note">Enter the description. </p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">SAVE</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, onMounted, reactive, ref, toRefs, watch} from 'vue'
// @ts-ignore
import axios from '@/utils/axios'
import {useRoute, useRouter} from 'vue-router'

interface Destination {
  destination_type: string
  destination_prefix: string
  destination_number: string
  destination_caller_id_name: string
  destination_caller_id_number: number|string
  destination_context: string
  destination_action: string
  destination_alternate_action: string
  user_uuid: string
  destination_cid_name_prefix: string
  destination_record: string
  destination_hold_music: string
  destination_accountcode: string
  destination_type_voice: boolean
  destination_type_fax: boolean
  destination_type_text: boolean
  destination_type_emergency: boolean
  domain_uuid: string
  destination_order: number
  enabled: string
  destination_description: string
}

export default defineComponent({
  name: 'DestinationEdit',
  setup() {
    const DestinationsRef = ref()
    const route = useRoute()
    const router = useRouter()
    const {id} = route.query
    let state = reactive({
      id: id,
      advanced: false,
      showAction: false,
      showAlternate: false,
      DestinationForm: ref<Destination>({
        destination_type: 'inbound',
        destination_prefix: '',
        destination_number: '',
        destination_caller_id_name: '',
        destination_caller_id_number: '',
        destination_context: 'public',
        destination_action: '',
        destination_alternate_action: '',
        user_uuid: '',
        destination_cid_name_prefix: '',
        destination_record: '',
        destination_hold_music: '',
        destination_accountcode: '',
        destination_type_voice: false,
        destination_type_fax: false,
        destination_type_text: false,
        destination_type_emergency: false,
        // // @todo 后端给默认值
        domain_uuid: 'd4f5c9ed-5bc2-4dda-b81b-e4edd0e011a4',
        destination_order: 100,
        enabled: 'true',
        destination_description: '',
      }),
      // 提交表单时的验证规则
      rules: {
        sip_cid_type: [
          {pattern: /^(none|pid|rpid)$/, trigger: ['change']}
        ],
      },
    });
    // let instance
    onMounted(() => {
      if (id) {
        // @todo 后端接口返回详情数据
        // axios.get(`/Destinations/${id}`).then(res => {});
      }
    })

    onBeforeUnmount(() => {
    })

    const submitAdd = () => {
      DestinationsRef.value.validate((valid: any) => {
        if (valid) {
          // 默认新增用 post 方法
          let httpOption = axios.post
          if (state.id) {
            // 修改商品使用 put 方法
            httpOption = axios.put
          }
          // @todo 更新数据
          // httpOption('/Destinations', params).then(() => {
          //   ElMessage.success(id ? '修改成功' : '添加成功')
          router.push({path: '/Destinations_edit', query: {id: 1}})
          state.id = '1'
          // }).catch((response) => {
          //   console.log(response.data)
          // })
        }
      })
    }

    // @todo 数据应来自后端接口
    let userOptions = [
      {value: "", label: ""},
      {value: "udp", label: "udp"},
      {value: "tcp", label: "tcp"},
    ]

    // @todo 数据应来自后端接口
    let domainUuidOptions = [
      {value: '', label: 'Global'},
      {value: "879f1b06-ee17-4469-a806-a42512b58fc4", label: "172.16.1.1"},
    ]

    // @todo 数据应来自后端接口
    let profileOptions = [
      {value: "external", label: "external"},
      {value: "external-ipv6", label: "external-ipv6"},
      {value: "internal", label: "internal"},
      {value: "internal-ipv6", label: "internal-ipv6"},
    ]

    // @todo 数据应来自后端接口
    let holdMusicOptions = [{
      label: 'Music on Hold',
      options: [
        {value: "local_stream://default", label: "default"},
      ]
    }]

    // @todo 数据应来自后端接口
    const destinationActionOptions = [
      {
        label: 'Tones',
        options: [
          {value: "test1", label: "001 tian001"},
          {value: "test2", label: "002 tian002"}
        ]
      },
      {
        label: 'Voicemails',
        options: [
          {value: "test3", label: "003 tian003"},
          {value: "test4", label: "004 tian004"}
        ]
      },
    ]

    // @todo 数据应来自后端接口
    const domainUuidtOptions = [
      {value: "", label: "Global"},
      {value: "d4f5c9ed-5bc2-4dda-b81b-e4edd0e011a2", label: "10.10.10.10"},
      {value: "d4f5c9ed-5bc2-4dda-b81b-e4edd0e011a3", label: "10.10.10.12"},
      {value: "d4f5c9ed-5bc2-4dda-b81b-e4edd0e011a4", label: "10.10.10.13"},
    ]

    const destinationOrderOptions = []
    for (let i = 0; i < 1000; i++) {
      destinationOrderOptions.push(('000000000' + i).slice(-3))
    }

    // destination_type 联动逻辑
    watch(() => state.DestinationForm.destination_type, (n) => {
      if (n == 'inbound') {
        state.DestinationForm.destination_context = 'public'
      } else if (n == 'outbound') {
        let domain = domainUuidtOptions.filter((n) => {
          return n.value == state.DestinationForm.domain_uuid
        })
        state.DestinationForm.destination_context = domain[0].label
      }
    })

    // destination_context 联动逻辑
    watch(() => state.DestinationForm.domain_uuid, (n) => {
      if (state.DestinationForm.destination_type == 'outbound') {
        let domain = domainUuidtOptions.filter((m) => {
          return m.value == n
        })
        state.DestinationForm.destination_context = domain[0].label
      }
    })

    return {
      ...toRefs(state),
      destinationActionOptions,
      destinationOrderOptions,
      domainUuidtOptions,
      holdMusicOptions,
      userOptions,
      domainUuidOptions,
      profileOptions,
      DestinationsRef,
      submitAdd,
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