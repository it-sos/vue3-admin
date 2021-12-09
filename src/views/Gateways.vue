<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button icon="el-icon-circle-close" size="small" type="info" @click="handleStop">STOP</el-button>
        <el-button icon="el-icon-caret-right" size="small" type="info" @click="handleStart">START</el-button>
        <el-popconfirm title="Are you sure to copy it?" @confirm="handleCopy" >
          <template #reference>
            <el-button icon="el-icon-document-copy" size="small" type="info">COPY</el-button>
          </template>
        </el-popconfirm>
        <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAdd">ADD</el-button>
        <el-popconfirm title="Are you sure to delete it?" @confirm="handleDelete" >
          <template #reference>
            <el-button icon="el-icon-delete" size="small" type="danger">DELETE</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="Gateway" prop="gateway"></el-table-column>
      <el-table-column label="Context" prop="context"></el-table-column>
      <el-table-column label="Status" prop="status"></el-table-column>
      <el-table-column label="Action" prop="action"></el-table-column>
      <el-table-column label="State" prop="state"></el-table-column>
      <el-table-column label="Hostname" prop="hostname"></el-table-column>
      <el-table-column label="Enabled" prop="enabled"></el-table-column>
      <el-table-column label="Description" prop="description"></el-table-column>
      <el-table-column fixed="right" label="Operation" width="100">
        <template #default="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row.gateway_uuid)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete?" @confirm="handleSingleDelete(scope.row.gateway_uuid)">
            <template #reference>
              <el-button size="mini" type="text">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <!--    <el-pagination-->
    <!--        :current-page="currentPage"-->
    <!--        :page-size="pageSize"-->
    <!--        :total="total"-->
    <!--        background-->
    <!--        layout="prev, pager, next"-->
    <!--        @current-change="changePage"-->
    <!--    />-->
  </el-card>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, toRefs} from 'vue'
import {ElMessage} from 'element-plus'
// @ts-ignore
import axios from '@/utils/axios'
import router from "../router"

interface Gateways {
  gateway_uuid: string
  gateway: string
  context: string
  status: string
  action: string
  state: string
  hostname: string
  enabled: string
  description: string
}

export default defineComponent({
  name: 'Gateways',
  setup() {
    const multipleTable = <any>ref(null)
    const state = reactive({
      loading: false,
      tableData: ref<Gateways[]>([]), // 数据列表
      multipleSelection: ref<Gateways[]>([]), // 选中项
      type: 'add', // 操作类型
    })

    onMounted(() => {
      getGateways()
    })

    // 获取网关列表
    const getGateways = () => {
      state.loading = true
      axios.get('/gateways').then((res: HttpResult) => {
        state.tableData = res.data.data
        // state.total = 100
        // state.currentPage = 1
        state.loading = false
      }).catch((e: Result) => {
        console.log(e)
      })
    }

    // 添加网关项
    const handleAdd = () => {
      state.type = 'add'
      router.push({path: '/gateways_edit'})
    }

    // 修改网关
    const handleEdit = (id: any) => {
      router.push({path: '/gateways_edit', query: {id: id}})
      state.type = 'edit'
    }
    // 选择项
    const handleSelectionChange = (val: never[]) => {
      state.multipleSelection = val
    }

    // 删单条
    const handleSingleDelete = (id: string) => {
      axios.delete(`/gateways/${id}`).then(() => {
        ElMessage.success('Delete succeeded.')
        getGateways()
      }).catch(() => {
      })
    }

    // 启动
    const handleSingleStart = (id: string) => {
      axios.put(`/gateways/start/${id}`).then(() => {
        ElMessage.success('Start succeeded.')
        getGateways()
      }).catch(() => {
      })
    }

    // 停用
    const handleSingleStop = (id: string) => {
      axios.put(`/gateways/stop/${id}`).then(() => {
        ElMessage.success('Stop succeeded.')
        getGateways()
      }).catch(() => {
      })
    }

    // 复制
    const handleSingleCopy = (id: string) => {
      axios.post(`/gateways/copy/${id}`).then(() => {
        ElMessage.success('Copy succeeded.')
        getGateways()
      }).catch(() => {
      })
    }

    // 批量执行回调函数
    const doSelection = (callback: Function) => {
      if (!state.multipleSelection.length) {
        ElMessage.error('Please add a selection.')
        return
      }
      state.multipleSelection.map((row: Gateways) => {
        callback(row.gateway_uuid)
      })
    }

    // 批量删除
    const handleDelete = () => {
      doSelection(handleSingleDelete)
    }

    // 批量启用
    const handleStart = () => {
      doSelection(handleSingleStart)
    }

    // 批量停用
    const handleStop = () => {
      doSelection(handleSingleStop)
    }

    // 批量复制
    const handleCopy = () => {
      doSelection(handleSingleCopy)
    }

    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      handleCopy,
      handleStop,
      handleStart,
      handleAdd,
      handleEdit,
      handleDelete,
      handleSingleDelete,
    }
  }
})
</script>

<style scoped>
.swiper-container {
  min-height: 100%;
}

.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>