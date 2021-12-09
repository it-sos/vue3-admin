<template>
  <div class="add">
    <el-card class="add-container">
      <pre v-highlightjs><code class="XML" style="padding: 30px 20px;min-height:350px">{{rawHtml}}</code></pre>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
// @ts-ignore
import axios from '@/utils/axios'
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'DialplanXml',
  setup() {
    const route = useRoute()
    const {id} = route.query
    const rawHtml = ref<string>('')
    axios.get(`/dialplans/xml/${id}`).then((res: HttpResult) => {
      rawHtml.value = res.data.data
    }).catch(()=>{});
    return {
      rawHtml
    }
  }
})
</script>

<style scoped>
.add-container {
  min-height: 400px;
  flex: 1;
  height: 100%;
  /*padding-left:50px;*/
}
</style>