<template>
<!-- eslint-disable max-len -->
  <form v-if="survey.length > 0" @submit.prevent="onSubmitResponses">
    <h1 class="font-bold text-2xl">Rapport pour le rendez-vous du</h1>
    <p>{{ appointmentStart.calendar() }}</p>
    <div class="py-2" v-for="(question, index) in survey" :key="`question-${index}`">
      <label class="font-medium">{{question.label}} :</label>
      <div v-if="question.type === 'rate'">rate</div>
      <div v-else class="flex">
        <div
          :key="`choice-${index}-${question.slug}`"
          v-for="(choice, index) in question.choices"
          class="pr-4"
        >
          <label :for="choice.label" class="pr-2">{{ choice.label }}</label>
          <input :id="choice.label" :type="question.type" :value="choice.value"/>
        </div>
      </div>
    </div>

    <button
      class="mx-auto bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
    >Soumettre</button>
  </form>
</template>

<script>
export default {
  name: 'edit-report-form',
  data() {
    return {
      newResponses: null,
    };
  },
  props: {
    responses: Object,
    appointmentStart: Object,
    appointmentFinish: Object,
    appointmentTitle: String,
    customerName: String,
  },
  methods: {
    onSubmitResponses() {
      // this.$emit('submit', this.newResponses);
      window.alert('En cours de développement...');
      console.log('lol');
    },
  },
  computed: {
    survey() {
      const surveyStringify = this.$store.getters['settingsModule/getSettings']
        .find((setting) => setting.key === 'survey')
        .content;
      return JSON.parse(surveyStringify);
    },
  },
  mounted() {
    this.newResponses = this.responses;
    console.log(this.survey);
    window.alert('En cours de développement...');
  },
};
</script>

<style>

</style>
