<template>
  <div v-if="report.id">
    <div class="flex flex-col p-2">
      {{ report.id }}
      {{ report.survey }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'report-item',
  props: {
    report: Object,
  },
};
</script>

<style>

</style>
