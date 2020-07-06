<template>
  <div v-if="report.id">
    <div class="flex flex-col p-2">
      <strong>Id de l'utilisateur: {{ report.user_id }}</strong>
      <em>{{ report.content }}</em>
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
