<template>
  <div class="add">
    <el-card class="add-container affix-container">
      <el-affix :offset="60" style="text-align: right" target=".affix-container">
        <el-popconfirm v-if="dialplanForm.dialplan_uuid" title="Are you sure to copy it?" @confirm="copy">
          <template #reference>
            <el-button icon="el-icon-document-copy" size="mini" type="info">COPY</el-button>
          </template>
        </el-popconfirm>
        <el-button v-if="dialplanForm.dialplan_uuid" icon="el-icon-aim" size="mini" type="success" @click="goXml">XML
        </el-button>
        <el-button icon="el-icon-document-add" size="mini" type="primary" @click="save">SAVE</el-button>
      </el-affix>
      <el-form ref="DialplanRef" :model="dialplanForm" :rules="rules" class="dialplanForm" label-width="200px"
               size="small"
               style="padding-top: 20px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="Name" prop="dialplan_name" required>
              <el-input v-model="dialplanForm.dialplan_name" maxlength="32" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Order" prop="dialplan_order" required>
              <el-select v-model="dialplanForm.dialplan_order" placeholder="Empty" style="width: 94px;">
                <el-option
                    v-for="order in dialplanOrderOptions"
                    :key="order"
                    :label="order"
                    :value="order"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Number" prop="dialplan_number">
              <el-input v-model="dialplanForm.dialplan_number" maxlength="32" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Destination" prop="dialplan_destination">
              <el-select v-model="dialplanForm.dialplan_destination" placeholder="Empty" style="width: 94px;">
                <el-option
                    v-for="item in boolEmptyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Hostname" prop="hostname">
              <el-input v-model="dialplanForm.hostname" maxlength="32" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Domain" prop="domain_uuid">
              <el-select v-model="dialplanForm.domain_uuid" placeholder="Empty" style="width: 120px;">
                <el-option
                    v-for="item in domainUuidOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Context" prop="dialplan_context">
              <el-input v-model="dialplanForm.dialplan_context" maxlength="255" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Enabled" prop="dialplan_enabled">
              <el-select v-model="dialplanForm.dialplan_enabled" placeholder="Empty" style="width: 94px;">
                <el-option
                    v-for="item in boolOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Continue" prop="dialplan_continue">
              <el-select v-model="dialplanForm.dialplan_continue" placeholder="Empty" style="width: 94px;">
                <el-option
                    v-for="item in boolOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Description" prop="dialplan_description">
              <el-input v-model="dialplanForm.dialplan_description" maxlength="255" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div v-for="(detail, idx) in dialplanForm.dialplan_detail">
          <el-row style="margin-top:30px;">
            <el-col :span="3" class="title"><span style="color:#ff4500">*</span>&nbsp;Tag</el-col>
            <el-col :span="4" class="title"><span style="color:#ff4500">*</span>&nbsp;Type</el-col>
            <el-col :span="5" class="title">Data</el-col>
            <el-col :span="2" class="title">Break</el-col>
            <el-col :span="2" class="title">Inline</el-col>
            <el-col :span="2" class="title"><span style="color:#ff4500">*</span>&nbsp;Group</el-col>
            <el-col :span="2" class="title"><span style="color:#ff4500">*</span>&nbsp;Order</el-col>
            <el-col :span="2" class="title"><span style="color:#ff4500">*</span>&nbsp;Enabled</el-col>
            <el-col :span="2" class="title">Operate</el-col>
          </el-row>
          <el-row v-for="(item, sub_idx) in detail" class="row-data">
            <el-col :span="3" class="data">
              <el-select v-if="item.is_dialplan_detail_tag" v-model="item.dialplan_detail_tag" placeholder="Empty"
                         size="mini">
                <el-option v-for="items in dialplanDetailTagOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
              <div v-else class="label" @click="item.is_dialplan_detail_tag=true">{{ item.dialplan_detail_tag }}</div>
            </el-col>
            <el-col :span="4" class="data">
              <div v-if="item.is_dialplan_detail_types">
                <el-row v-if="item.is_dialplan_detail_type">
                  <el-col :span="17">
                    <el-input v-model="item.dialplan_detail_type" maxlength="255" size="mini"></el-input>
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="2">
                    <el-button
                        icon="el-icon-caret-left"
                        size="mini" style="vertical-align: middle;" type="info" @click="item.is_dialplan_detail_type = !item.is_dialplan_detail_type;item.dialplan_detail_type=item.dialplan_detail_type_old"></el-button>
                  </el-col>
                </el-row>
                <el-row v-else>
                  <el-select
                      v-model="item.dialplan_detail_type"
                      placeholder="Empty" size="mini" @change="item.is_dialplan_detail_type = !item.is_dialplan_detail_type;item.dialplan_detail_type_old=item.dialplan_detail_type">
                    <el-option-group label="Selected" key="Selected">
                      <el-option :label="item.dialplan_detail_type_vv" :value="item.dialplan_detail_type_vv"></el-option>
                    </el-option-group>
                    <el-option-group
                        v-for="group in dialplanDetailTypeOptions"
                        :key="group.label"
                        :label="group.label"
                    >
                      <el-option
                          v-for="items in group.options"
                          :key="items.value"
                          :label="items.label"
                          :value="items.value"
                      >
                      </el-option>
                    </el-option-group>
                  </el-select>
                </el-row>
              </div>
              <div v-else class="label" @click="item.is_dialplan_detail_types=true;item.dialplan_detail_type_vv = item.dialplan_detail_type">{{
                  item.dialplan_detail_type
                }}
              </div>
            </el-col>


            <el-col :span="5" class="data">
              <el-input v-if="item.is_dialplan_detail_data" v-model="item.dialplan_detail_data" maxlength="255"
                        size="mini"></el-input>
              <div v-else class="label" @click="item.is_dialplan_detail_data=true">{{
                  item.dialplan_detail_datas
                }}
              </div>
            </el-col>
            <el-col :span="2" class="data">
              <el-select v-if="item.is_dialplan_detail_break" v-model="item.dialplan_detail_break" placeholder="Empty"
                         size="mini">
                <el-option v-for="items in dialplanDetailBreakOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
              <div v-else class="label" @click="item.is_dialplan_detail_break=true">{{
                  item.dialplan_detail_break
                }}
              </div>
            </el-col>
            <el-col :span="2" class="data">
              <el-select v-if="item.is_dialplan_detail_inline" v-model="item.dialplan_detail_inline"
                         placeholder="Empty" size="mini">
                <el-option v-for="items in boolEmptyOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
              <div v-else class="label" @click="item.is_dialplan_detail_inline=true">{{
                  item.dialplan_detail_inline
                }}
              </div>
            </el-col>
            <el-col :span="2" class="data">
              <el-input v-if="item.is_dialplan_detail_group" v-model="item.dialplan_detail_group" maxlength="255"
                        size="mini"></el-input>
              <div v-else class="label" @click="item.is_dialplan_detail_group=true">{{
                  item.dialplan_detail_group
                }}
              </div>
            </el-col>
            <el-col :span="2" class="data">
              <el-input v-if="item.is_dialplan_detail_order" v-model="item.dialplan_detail_order" maxlength="255"
                        size="mini"></el-input>
              <div v-else class="label" @click="item.is_dialplan_detail_order=true">{{
                  item.dialplan_detail_order
                }}
              </div>
            </el-col>
            <el-col :span="2" class="data">
              <el-select v-if="item.is_dialplan_detail_enabled" v-model="item.dialplan_detail_enabled"
                         placeholder="Empty" size="mini">
                <el-option v-for="items in boolOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
              <div v-else class="label" @click="item.is_dialplan_detail_enabled=true">{{
                  item.dialplan_detail_enabled
                }}
              </div>
            </el-col>
            <el-col :span="2" class="data" style="text-align: center">
              <el-button size="mini" type="danger" @click="submitDel(idx, sub_idx)">Del</el-button>
            </el-col>
          </el-row>

          <el-row class="row-data" style="background:#fbfbfb">
            <el-col :span="3" class="data">
              <el-select v-model="dialplan_tmp[idx].dialplan_detail_tag" placeholder="Empty" size="mini">
                <el-option v-for="items in dialplanDetailTagOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="4" class="data">
              <el-row v-if="dialplan_tmp[idx].is_dialplan_detail_type">
                <el-col :span="17">
                  <el-input v-model="dialplan_tmp[idx].dialplan_detail_type" maxlength="255" size="mini"></el-input>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="2">
                  <el-button
                      icon="el-icon-caret-left"
                      size="mini" style="vertical-align: middle;" type="info" @click="dialplan_tmp[idx].is_dialplan_detail_type = !dialplan_tmp[idx].is_dialplan_detail_type;dialplan_tmp[idx].dialplan_detail_type=dialplan_tmp[idx].dialplan_detail_type_old"></el-button>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-select
                    v-model="dialplan_tmp[idx].dialplan_detail_type"
                    placeholder="Empty" size="mini" @change="dialplan_tmp[idx].is_dialplan_detail_type = !dialplan_tmp[idx].is_dialplan_detail_type;dialplan_tmp[idx].dialplan_detail_type_old=dialplan_tmp[idx].dialplan_detail_type">
                  <el-option label="" value=""></el-option>
                  <el-option-group
                      v-for="group in dialplanDetailTypeOptions"
                      :key="group.label"
                      :label="group.label"
                  >
                    <el-option
                        v-for="items in group.options"
                        :key="items.value"
                        :label="items.label"
                        :value="items.value"
                    >
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-row>
            </el-col>
            <el-col :span="5" class="data">
              <el-input v-model="dialplan_tmp[idx].dialplan_detail_data" maxlength="255" size="mini"></el-input>
            </el-col>
            <el-col :span="2" class="data">
              <el-select v-model="dialplan_tmp[idx].dialplan_detail_break" placeholder="Empty" size="mini">
                <el-option v-for="items in dialplanDetailBreakOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="data">
              <el-select v-model="dialplan_tmp[idx].dialplan_detail_inline" placeholder="Empty" size="mini">
                <el-option v-for="items in boolEmptyOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="data">
              <el-input v-model="dialplan_tmp[idx].dialplan_detail_group" maxlength="255" size="mini"></el-input>
            </el-col>
            <el-col :span="2" class="data">
              <el-input v-model="dialplan_tmp[idx].dialplan_detail_order" maxlength="255" size="mini"></el-input>
            </el-col>
            <el-col :span="2" class="data">
              <el-select v-model="dialplan_tmp[idx].dialplan_detail_enabled" placeholder="Empty" size="mini">
                <el-option v-for="items in boolOptions"
                           :key="items.value" :label="items.label" :value="items.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2" class="data" style="text-align: center">
              <el-button size="mini" type="success" @click="submitAdd(idx)">Add</el-button>
            </el-col>
          </el-row>
        </div>
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
import option from "../store/option";

interface DialplanRule {
  dialplan_detail_tag: string
  dialplan_detail_type: string
  dialplan_detail_data: string
  dialplan_detail_break: string
  dialplan_detail_inline: string
  dialplan_detail_group: number
  dialplan_detail_order: number
  dialplan_detail_enabled: string
}

interface Dialplan {
  dialplan_uuid: string
  dialplan_number: string
  dialplan_context: string
  dialplan_description: string
  domain_uuid: string
  dialplan_continue: string
  dialplan_order: number
  dialplan_enabled: string
  dialplan_destination: string
  hostname: string
  dialplan_name: string
  dialplan_detail: DialplanRule[][]
}

export default defineComponent({
  name: 'Dialplan',
  props: {
    type: String
  },
  setup(ctx) {
    const DialplanRef = ref()
    const route = useRoute()
    const router = useRouter()
    const {id} = route.query
    let state = reactive({
      advanced: false,
      showAction: false,
      showAlternate: false,
      dialplan_tmp: [
        {
          dialplan_detail_tag: "",
          dialplan_detail_type: "",
          dialplan_detail_data: "",
          dialplan_detail_break: "",
          dialplan_detail_inline: "",
          dialplan_detail_group: 0,
          dialplan_detail_order: 185,
          dialplan_detail_enabled: "true",
        },
      ],
      dialplanForm: ref<Dialplan>({
        dialplan_uuid: '',
        dialplan_destination: 'false',
        dialplan_name: '',
        hostname: '',
        dialplan_number: '',
        dialplan_context: 'public',
        domain_uuid: '',
        dialplan_order: 200,
        dialplan_enabled: 'true',
        dialplan_description: '',
        dialplan_continue: 'true',
        dialplan_detail: [[]]
      }),
      // 提交表单时的验证规则
      rules: {
        sip_cid_type: [
          {pattern: /^(none|pid|rpid)$/, trigger: ['change']}
        ],
      },
    });

    let gatewayData = new Map()
    const gateways = async () => {
      await axios.get('/gateways').then((res: HttpResult) => {
        res.data.data.forEach((v: any) => {
          gatewayData.set(v.gateway_uuid, v.gateway)
        })
      }).catch((e: Result) => {
      })
    }

    // 特殊流程
    const changeData = (sv: DialplanRule) => {
      // @ts-ignore
      sv.dialplan_detail_datas = sv.dialplan_detail_data
      if (sv.dialplan_detail_type == 'bridge') {
        let gateway_uuid = sv.dialplan_detail_data.replace(/.*\/(\w+-\w+-\w+-\w+-\w+)\/.*/, "$1")
        if (gatewayData.has(gateway_uuid)) {
          // @ts-ignore
          sv.dialplan_detail_datas = sv.dialplan_detail_data.replace(gateway_uuid, gatewayData.get(gateway_uuid))
        }
      }
    }

    const getDialplans = async () => {
      if (gatewayData.size < 1) {
        await gateways()
      }

      // for(let key of map)
      axios.get(`/dialplans/${id}`).then((res: HttpResult) => {
        res.data.data.dialplan_detail.forEach((v: DialplanRule[], i: number) => {
          let o = v[v.length - 1]
          let group = 0
          let order = 200
          if (typeof o != "undefined") {
            group = o.dialplan_detail_group
            order = o.dialplan_detail_order
          }
          state.dialplan_tmp[i] = {
            dialplan_detail_tag: "",
            dialplan_detail_type: "",
            dialplan_detail_data: "",
            dialplan_detail_break: "",
            dialplan_detail_inline: "",
            dialplan_detail_group: group,
            dialplan_detail_order: order,
            dialplan_detail_enabled: "true",
          }
          v.forEach((sv: DialplanRule) => {
            changeData(sv)
          })
          console.log(res.data.data)
        })
        state.dialplanForm = res.data.data
      }).catch((e: any) => {
        console.log(e)
      });
    }

    const domainUuidOptions = ref<Option[]>()
    const domainOptions = async () => {
      let ress: HttpResult = await axios.get('/options/domains')
      domainUuidOptions.value = ress.data.data
      if (!id) {
        axios.get('/options/domain_uuid').then((res: HttpResult) => {
          state.dialplanForm.domain_uuid = res.data.data
          ress.data.data.forEach((v: Option) => {
            if (v.value == state.dialplanForm.domain_uuid) {
              state.dialplanForm.dialplan_context = v.label
            }
          })
        }).catch(() => {
        })
      }
    }

    // let instance
    onMounted(() => {
      domainOptions()
      if (id) {
        getDialplans()
      }
    })

    onBeforeUnmount(() => {
    })

    const save = () => {
      DialplanRef.value.validate((valid: any) => {
        if (!valid) {
          ElMessage.error('Please check the form items.')
          return
        }
        axios.post('/dialplans/save', state.dialplanForm).then((res: HttpResult) => {
          let res_id: string = res.data.data
          ElMessage.success(state.dialplanForm.dialplan_uuid ? 'Update succeeded.' : 'Add succeeded.')
          if (id) {
            getDialplans()
          } else {
            router.push({path: `/${ctx.type}_edit`, query: {id: res_id}})
          }
          state.dialplanForm.dialplan_uuid = res_id
        }).catch(() => {
        })
      })
    }

    const dialplanOrderOptions = []
    for (let i = 0; i < 1000; i++) {
      dialplanOrderOptions.push(('000000000' + i).slice(-3))
    }

    // dialplan
    const boolOptions = [
      {value: "true", label: "True"},
      {value: "false", label: "False"},
    ]

    const boolEmptyOptions = [
      {value: "true", label: "True"},
      {value: "false", label: "False"},
    ]

    const dialplanDetailTagOptions = [
      {value: "condition", label: "Condition"},
      // {value: "regex", label: "Regular Expression"},
      {value: "action", label: "Action"},
      // {value: "anti-action", label: "Anti-Action"},
    ]

    const dialplanDetailBreakOptions = [
      {value: "on-true", label: "On True"},
      {value: "on-false", label: "On False"},
      {value: "always", label: "Always"},
      {value: "never", label: "Never"},
    ]

    let dialplanDetailTypeOptions = option.dialplan_type

    const clone = (obj: any) => {
      let txt = JSON.stringify(obj);
      let nobj = JSON.parse(txt);
      changeData(nobj)
      return nobj
    }

    const submitAdd = (index: any) => {
      let group: any = state.dialplan_tmp[index].dialplan_detail_group
      let order: any = state.dialplan_tmp[index].dialplan_detail_order
      if (!state.dialplan_tmp[index].dialplan_detail_tag || !state.dialplan_tmp[index].dialplan_detail_type) {
        ElMessage.error('Tag & Type cannot empty.')
        return
      }
      if (!/^\d+$/.test(group) || !/^\d+$/.test(order)) {
        ElMessage.error('Group & Order must be number.')
        return
      }

      if (!state.dialplanForm.dialplan_detail.hasOwnProperty(group)) {
        let min = state.dialplan_tmp.length
        if (min < group) {
          ElMessage.warning(`The value of a is changed from ${group} to ${min}`)
          group = min
        }
        state.dialplan_tmp[index].dialplan_detail_group = group
        state.dialplanForm.dialplan_detail[group] = [clone(state.dialplan_tmp[index])]
        // 原来的输入框重置
        state.dialplan_tmp[index] = {
          dialplan_detail_tag: "",
          dialplan_detail_type: "",
          dialplan_detail_data: "",
          dialplan_detail_break: "",
          dialplan_detail_inline: "",
          dialplan_detail_group: group-1,
          dialplan_detail_order: order,
          dialplan_detail_enabled: "true",
        }
        state.dialplan_tmp[group] = {
          dialplan_detail_tag: "",
          dialplan_detail_type: "",
          dialplan_detail_data: "",
          dialplan_detail_break: "",
          dialplan_detail_inline: "",
          dialplan_detail_group: group,
          dialplan_detail_order: order,
          dialplan_detail_enabled: "true",
        }
      } else {
        state.dialplanForm.dialplan_detail[group].push(clone(state.dialplan_tmp[index]))
      }
      // console.log(index)
    }

    const submitDel = (index: any, sub_idx: any) => {
      // console.log(index, sub_idx, state.dialplanForm.dialplan_detail[index])
      state.dialplanForm.dialplan_detail[index] = state.dialplanForm.dialplan_detail[index].filter((v, k) => {
        return k != sub_idx;
      })
    }

    const goXml = () => {
      router.push({path: '/dialplan_xml', query: {id: state.dialplanForm.dialplan_uuid}})
    }

    const copy = () => {
      axios.post(`/dialplans/copy/${state.dialplanForm.dialplan_uuid}`).then((res: HttpResult) => {
        ElMessage.success('Copy succeeded.')
        router.push({path: `/${ctx.type}s`})
      }).catch(() => {
      });
    }

    return {
      ...toRefs(state),
      domainUuidOptions,
      dialplanDetailBreakOptions,
      dialplanDetailTypeOptions,
      dialplanDetailTagOptions,
      boolOptions,
      boolEmptyOptions,
      dialplanOrderOptions,
      DialplanRef,
      copy,
      submitDel,
      submitAdd,
      save,
      goXml,
    }
  }
})
</script>

<style scoped>
.title {
  border: #ffffff 1px solid;
  background: #e9e9e9;
  padding: 8px 0 8px 10px;
}

.row-data {
  vertical-align: middle;
}

.row-data .label {
  padding-left: 10px;
  height: 100%;
  word-break: break-all;
  word-wrap: break-word;
}

.data {
  border-bottom: #eaeaea 1px solid;
  font-size: 14px;
  padding: 8px 3px;
  line-height: 1.8;
}

.add {
  display: flex;
}

.add-container {
  flex: 1;
  height: 100%;
  /*padding-left:50px;*/
}
</style>