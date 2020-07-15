<template>
  <div v-if="report.id">
    <div class="flex flex-col p-2">
      <p>{{ report.id }}</p>
      <p v-for="(question, index) in survey" :key="`${index}-question`">
        {{index}} : {{question}}
      </p>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'report-item',
  props: {
    report: Object,
  },
  computed: {
    survey() {
      return JSON.parse(this.report.survey);
    },
  },
};
</script>

<style>

</style>
