<template>
  <Dialplan type="manager"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Dialplan from "../components/Dialplan.vue";

export default defineComponent({
  name: 'ManagerEdit',
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