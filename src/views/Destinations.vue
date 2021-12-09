<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
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
      <el-table-column label="Type" prop="type"></el-table-column>
      <el-table-column label="Prefix" prop="prefix"></el-table-column>
      <el-table-column label="Destination" prop="destination"></el-table-column>
      <el-table-column label="Actions" prop="actions"></el-table-column>
      <el-table-column label="Context" prop="context"></el-table-column>
      <el-table-column label="Enabled" prop="enabled"></el-table-column>
      <el-table-column label="Description" prop="description"></el-table-column>
      <el-table-column label="Operation" fixed="right" width="100">
        <template #default="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row.id)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete?" @confirm="handleDeleteOne(scope.row.id)">
            <template #reference>
              <el-button type="text" size="mini" @click="handleDelete(scope.row.id)" >Delete</el-button>
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

interface Destinations {
  id: string
  type: string
  prefix: string
  destination: string
  actions: string
  context: string
  enabled: string
  description: string
}

export default defineComponent({
  name: 'Destinations',
  setup() {

    const multipleTable = <any>ref(null)

    const state = reactive({
      loading: false,
      tableData: ref<Destinations[]>([]), // 数据列表
      multipleSelection: ref<Destinations[]>([]), // 选中项
      type: 'add', // 操作类型
    })

    onMounted(() => {
      getdestination()
    })

    // 获取网关列表
    const getdestination = () => {
      state.loading = true
      // axios.get('/destination', {
      //   params: {
      //     pageNumber: state.currentPage,
      //     pageSize: state.pageSize
      //   }
      // }).then(res => {
      setTimeout(() => {
        state.tableData = [
          {
            id: 'xx-22-33',
            type: 'inbound',
            prefix: 'prefix',
            destination: 'destionation',
            actions: 'actions',
            context: 'context',
            enabled: 'true',
            description: 'description',
          },
          {
            id: 'xx-23-34',
            type: 'inbound',
            prefix: 'prefix',
            destination: 'destionation',
            actions: 'actions',
            context: 'context',
            enabled: 'true',
            description: 'description',
          },
        ]
        // state.total = 100
        // state.currentPage = 1
        state.loading = false
      }, 200)
      //   })
    }

    // 添加网关项
    const handleAdd = () => {
      state.type = 'add'
      router.push({path: '/destination_edit'})
    }

    // 修改网关
    const handleEdit = (id: any) => {
      router.push({path: '/destination_edit', query: {id: id}})
      state.type = 'edit'
    }
    // 选择项
    const handleSelectionChange = (val: never[]) => {
      state.multipleSelection = val
    }
    // 批量删除
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('Please add a selection.')
        return
      }
      axios.delete('/destination', {
        data: {
          ids: state.multipleSelection.map((i: Destinations) => i.id)
        }
      }).then(() => {
        ElMessage.success('Delete succeeded.')
        getdestination()
      })
    }
    // 单个删除
    const handleDeleteOne = (id: Destinations) => {
      axios.delete('/destination', {
        data: {
          ids: [id]
        }
      }).then(() => {
        ElMessage.success('Delete succeeded.')
        getdestination()
      })
    }

    const handleStart = () => {
      console.log(state.multipleSelection)
    }

    const handleStop = () => {
      console.log(state.multipleSelection[0].id)
      axios.put('/destination/stop', {
        data: {
          ids: state.multipleSelection.map((i: Destinations) => i.id)
        }
      }).then(() => {
        ElMessage.success('Stop succeeded.')
        getdestination()
      })
    }

    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      // addGood,
      handleStop,
      handleStart,
      handleAdd,
      handleEdit,
      handleDelete,
      handleDeleteOne,
      getdestination,
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