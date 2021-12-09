<template>
  <Dialplans type="outbound" />
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Dialplans from "../components/Dialplans.vue";

export default defineComponent({
  name: 'Outbounds',
  components: {
    Dialplans,
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
</style>
