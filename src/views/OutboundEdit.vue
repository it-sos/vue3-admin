<template>
  <Dialplan type="outbound"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Dialplan from "../components/Dialplan.vue";

export default defineComponent({
  name: 'OutboundEdit',
  components: {
    Dialplan,
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>
