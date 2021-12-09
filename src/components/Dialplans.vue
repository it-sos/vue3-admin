<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
<!--        <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAdd">ADD</el-button>-->
<!--        <el-popconfirm title="Are you sure to delete it?" @confirm="handleDelete" >-->
<!--          <template #reference>-->
<!--            <el-button icon="el-icon-delete" size="small" type="danger">DELETE</el-button>-->
<!--          </template>-->
<!--        </el-popconfirm>-->

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
      <el-table-column label="Name" prop="dialplan_name"></el-table-column>
      <el-table-column label="Number" prop="dialplan_number"></el-table-column>
      <el-table-column label="Context" prop="dialplan_context"></el-table-column>
      <el-table-column label="Order" prop="dialplan_order"></el-table-column>
      <el-table-column label="Enabled" prop="dialplan_enabled"></el-table-column>
      <el-table-column label="Description" prop="dialplan_description"></el-table-column>
      <el-table-column label="Operation" fixed="right" width="100">
        <template #default="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row.dialplan_uuid)">Edit</el-button>
          <el-popconfirm title="Are you sure to delete?" @confirm="handleSingleDelete(scope.row.dialplan_uuid)">
            <template #reference>
              <el-button type="text" size="mini">Delete</el-button>
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

interface Dialplans {
  dialplan_uuid: string
  dialplan_name: string
  dialplan_number: string
  dialplan_context: string
  dialplan_order: number
  dialplan_enabled: string
  dialplan_description: string
}

export default defineComponent({
  name: 'Dialplans',
  props: {
    type: String
  },
  setup(ctx) {
    const multipleTable = <any>ref(null)

    const state = reactive({
      loading: false,
      tableData: ref<Dialplans[]>([]), // 数据列表
      multipleSelection: ref<Dialplans[]>([]), // 选中项
      type: 'add', // 操作类型
    })

    onMounted(() => {
      getDialplans()
    })

    // 获取拨号计划列表
    const getDialplans = () => {
      state.loading = true
      axios.get('/dialplans', {
        params: {type: ctx.type}
      }).then((res: HttpResult) => {
        state.tableData = res.data.data
        // state.total = 100
        // state.currentPage = 1
        state.loading = false
      }).catch((e: Result) => {
        console.log(e)
      })
    }

    // 添加内部项
    const handleAdd = () => {
      state.type = 'add'
      router.push({path: ctx.type + '_edit'})
    }

    // 修改内部
    const handleEdit = (id: any) => {
      router.push({path: ctx.type + '_edit', query: {id: id}})
      state.type = 'edit'
    }

    // 选择项
    const handleSelectionChange = (val: never[]) => {
      state.multipleSelection = val
    }

    // 删单条
    const handleSingleDelete = (id: string) => {
      axios.delete(`/dialplans/${id}`).then(() => {
        ElMessage.success('Delete succeeded.')
        getDialplans()
      }).catch(() => {
      })
    }

    // 复制
    const handleSingleCopy = (id: string) => {
      axios.post(`/dialplans/copy/${id}`).then(() => {
        ElMessage.success('Copy succeeded.')
        getDialplans()
      }).catch(() => {
      })
    }

    // 批量执行回调函数
    const doSelection = (callback: Function) => {
      if (!state.multipleSelection.length) {
        ElMessage.error('Please add a selection.')
        return
      }
      state.multipleSelection.map((row: Dialplans) => {
        callback(row.dialplan_uuid)
      })
    }

    // 批量复制
    const handleCopy = () => {
      doSelection(handleSingleCopy)
    }

    // 批量删除
    const handleDelete = () => {
      doSelection(handleSingleDelete)
    }

    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      handleAdd,
      handleEdit,
      handleSingleDelete,
      handleDelete,
      handleCopy,
    }
  }
})
</script>

<style scoped>
.swiper-container {
  min-height: 100%;
}
</style>