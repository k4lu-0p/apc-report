<template>
  <div v-if="report.id">
    <div class="flex flex-col p-2">
      <strong>Id de l'utilisateur: {{ report.user_id }}</strong>
      <em>{{ report.content }}</em>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export default class ReportItem extends Vue {
  @Prop({ default: {} })
  readonly report: object | undefined
}
</script>

<style>

</style>
