<template>
<!-- eslint-disable max-len -->
  <form v-if="survey.length > 0 && responses" @submit.prevent="onSubmitResponses">

    <!-- survey fields -->
    <div v-for="(question, index) in survey" :key="`question-${index}`">

      <hr class="my-2">

      <!-- type rate -->
      <div v-if="question.type === 'rate'">
        <div class="py-2">
          <label class="font-semibold text-lg text-gray-800 block pb-2">{{question.label}} :</label>
          <star-rating
              :increment="1"
              :max-rating="5"
              :rating="responses[question.slug]"
              v-model="responses[question.slug]"
              :show-rating="false"
              inactive-color="#e2e8f0"
              active-color="#319795"
              :padding="10"
              :star-size="30">
          </star-rating>
        </div>
      </div>

      <!-- type checkbox -->
      <div v-else-if="question.type === 'checkbox'" >
        <div class="flex flex-col py-2">
          <label class="font-semibold text-lg text-gray-800 block pb-2">{{question.label}} : <small class="font-light text-sm">(plusieurs choix possibles)</small></label>
          <div
           :key="`choice-${index}-${question.slug}`"
            v-for="(choice, index) in question.choices"
          >
            <div class="pr-4 flex items-center py-2">
              <label :for="choice.label" class="pr-2 w-2/3 text-gray-800 font-medium">{{ choice.label }}</label>
              <div class="w-1/3 flex justify-center">
                <input
                  :id="choice.label"
                  class="form-checkbox w-5 h-5 text-teal-600"
                  :type="question.type"
                  :value="choice.value"
                  v-model="responses[question.slug]"
                />
              </div>
            </div>
            <hr v-if="question.slug === 'profile' && index === 1" class="my-2">
          </div>
        </div>
      </div>

      <!-- type radio -->
      <div v-else>
        <div class="py-2">
          <label class="font-semibold text-lg text-gray-800 block pb-2">{{question.label}} :</label>
           <div
              :key="`choice-${index}-${question.slug}`"
              v-for="(choice, index) in question.choices"
              class="pr-4 flex items-center py-2"
            >
            <label
              :for="choice.label"
              :name="`${question.slug}`"
              class="pr-2 w-2/3 text-gray-800 font-medium">
              {{ choice.label }}
            </label>
            <div class="w-1/3 flex justify-center">
              <input
                :id="choice.label"
                :name="`${question.slug}`"
                class="w-5 h-5 form-radio text-teal-600"
                :type="question.type"
                :value="choice.value"
                v-model="responses[question.slug]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- submit -->
      <div class="pb-8 flex justify-center items-center h-16">
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn faster-x2"
          leave-active-class="animated fadeOut faster-x2"
        >

          <!-- loading -->
          <moon-loader
            v-if="status === $const.API.STATUS.LOADING"
            :color="$const.MISC.SPINNER.COLOR"
            class="v-spinner-custom"
          ></moon-loader>

          <button
            :disabled="isValid === false"
            :class="[isValid === false ? 'bg-gray-400' : ' bg-teal-600 hover:bg-teal-800']"
            v-else
            class="mx-auto text-white font-bold py-2 px-4 my-4 w-full rounded focus:outline-none focus:shadow-outline"
          >Envoyer mon rapport</button>

        </transition>
      </div>
  </form>
</template>

<script>
export default {
  name: 'edit-report-form',
  data() {
    return {
      responses: null,
    };
  },
  props: {
    status: String,
    survey: Array,
    report: Object,
  },
  methods: {
    onSubmitResponses() {
      if (this.status !== this.$const.API.STATUS.LOADING) {
        this.$emit('submit', this.responses);
      }
    },
  },
  computed: {
    isValid() {
      let isValid = true;
      // eslint-disable-next-line no-restricted-syntax
      for (const key in this.responses) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.responses.hasOwnProperty(key)) {
          const element = this.responses[key];
          if (element.length === 0) {
            isValid = false;
            break;
          }
        }
      }
      return isValid;
    },
  },
  mounted() {
    // link current values to the form
    this.responses = JSON.parse(this.report.responses);
    console.log(this.survey);
  },
};
</script>

<style lang="stylus">

</style>
