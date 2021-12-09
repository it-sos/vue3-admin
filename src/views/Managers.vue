<template>
  <Dialplans type="manager" />
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Dialplans from "../components/Dialplans.vue";

export default defineComponent({
  name: 'Manager',
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