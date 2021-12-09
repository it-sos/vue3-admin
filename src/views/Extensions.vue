<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAdd">ADD</el-button>
        <el-popconfirm
            title="Are you sure to delete it?"
            @confirm="handleDelete"
        >
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
      <el-table-column label="Extension" prop="extension"></el-table-column>
      <el-table-column label="Effective CID Name" prop="effective_caller_id_name"></el-table-column>
      <el-table-column label="Outbound CID Name" prop="outbound_caller_id_name"></el-table-column>
      <el-table-column label="Call Group" prop="call_group"></el-table-column>
      <el-table-column label="Context" prop="user_context"></el-table-column>
      <el-table-column label="Enabled" prop="enabled"></el-table-column>
      <el-table-column label="description" prop="description"></el-table-column>
      <el-table-column fixed="right" label="Operation" width="100">
        <template #default="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.row.extension_uuid)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete?" @confirm="handleSingleDelete(scope.row.extension_uuid)">
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

interface Extensions {
  extension_uuid: string
  extension: string
  effective_caller_id_name: string
  outbound_caller_id_name: string
  call_group: string
  user_context: string
  enabled: string
  description: string
}

export default defineComponent({
  name: 'Extensions',
  setup() {
    const multipleTable = ref()

    const state = reactive({
      loading: false,
      tableData: ref<Extensions[]>([]), // 数据列表
      multipleSelection: [], // 选中项
      // total: 0, // 总条数
      // currentPage: 1, // 当前页
      // pageSize: 10, // 分页大小
      type: 'add', // 操作类型
    })

    onMounted(() => {
      getExtensions()
    })

    // 获取坐席列表
    const getExtensions = () => {
      state.loading = true
      axios.get('/extensions', {
        params: {}
      }).then((res: HttpResult) => {
        state.tableData = res.data.data
        // state.total = 100
        // state.currentPage = 1
        state.loading = false
      }).catch((e: Result) => {
        console.log(e)
      })
    }

    // 添加坐席项
    const handleAdd = () => {
      state.type = 'add'
      router.push({path: '/extensions_edit'})
    }

    // 修改坐席
    const handleEdit = (id: any) => {
      router.push({path: '/extensions_edit', query: {id: id}})
      state.type = 'edit'
    }
    // 选择项
    const handleSelectionChange = (val: never[]) => {
      state.multipleSelection = val
    }

    // 删单条
    const handleSingleDelete = (id: string) => {
      axios.delete(`/extensions/${id}`).then(() => {
        ElMessage.success('Delete succeeded.')
        getExtensions()
      }).catch(() => {
      })
    }

    // 批量删除
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('Please add a selection.')
        return
      }
      state.multipleSelection.map((row: Extensions) => {
        handleSingleDelete(row.extension_uuid)
      })
    }

    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleDelete,
      handleSingleDelete,
      getExtensions,
    }
  }
})
</script>

<style scoped>
.swiper-container {
  min-height: 100%;
}
</style>