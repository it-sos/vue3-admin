<template>
  <Dialplans type="inbound" />
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Dialplans from "../components/Dialplans.vue";

export default defineComponent({
  name: 'Inbounds',
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