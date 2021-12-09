<template>
  <Dialplan type="inbound"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Dialplan from "../components/Dialplan.vue";

export default defineComponent({
  name: 'InboundEdit',
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