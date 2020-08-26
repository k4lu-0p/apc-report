<template>
<!-- eslint-disable max-len */ -->
  <form class="w-full" @submit.prevent="onSubmit" enctype="multiplart/form-data">
    <h2 class="font-bold text-xl text-gray-800 pt-4 text-left">Envoyer un email à tous les partenaires :</h2>
    <div class="flex flex-col py-2">
      <label class="text-lg py-2 block text-gray-800" for="subject">
        Sujet :
        <span class="text-red-500">*</span>
      </label>
      <input
        v-model="$v.form.subject.$model"
        class="text-lg appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="subject"
        type="text"
        placeholder="Définir le sujet du mail"
      >
    </div>
    <div class="text-lg flex flex-col py-2">
      <label class="py-2 block text-gray-800" for="content">
        Contenu du mail :
        <span class="text-red-500">*</span>
      </label>
      <textarea
        v-model="$v.form.content.$model"
        id="content"
        rows="5"
        class="appearance-none border rounded w-full py-2 text-lg px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Définir un message contenu dans le mail comme un texte introductif en rapport avec le fichier PDF.">
      </textarea>
    </div>
    <div class="flex flex-col py-2">
      <label class="text-lg py-2 block text-gray-800" for="attachment">
        Pièce jointe (.pdf uniquement) :
        <span class="text-red-500">*</span>
      </label>
      <div class="overflow-hidden relative w-64 mb-4">
        <button class="text-lg bg-purple-800 text-white font-bold py-2 px-4 w-full inline-flex items-center">
            <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
            </svg>

            <span
              v-if="form.attachment !== null"
              class="ml-2"
            >{{ form.attachment.name }} </span>

            <span v-else class="ml-2">Choisir un PDF (max: 1)</span>
        </button>
        <input
          class="cursor-pointer absolute block left-0 h-12 w-full top-0 opacity-0 pin-r pin-t"
          type="file"
          name="attachment"
          id="attachment"
          accept="application/pdf,application/vnd.ms-excel"
          @change="form.attachment = $event.target.files[0]">
      </div>
    </div>
    <!-- submit massive mails: -->
    <button
      v-if="isSending === false"
      :disabled="$v.$invalid || form.attachment === null"
      :class="[$v.$invalid || form.attachment === null ? 'bg-gray-400 border-gray-400' : ' bg-yellow-750 border-yellow-750']"
      class="text-lg my-4 border-2 w-full text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline">Envoyer</button>
      <div v-else class="flex justify-center items-center">
        <moon-loader
          :color="$const.MISC.SPINNER.COLOR"
          class="v-spinner-custom"
        ></moon-loader>
      </div>
  </form>
</template>

<script>
import validator from '../../validators';

export default {
  name: 'newsletter-form',
  data() {
    return {
      form: {
        subject: null,
        content: null,
        attachment: null,
      },
    };
  },
  props: {
    isSending: {
      type: Boolean,
      required: true,
    },
  },
  validations: validator.newsletter,
  methods: {
    onSubmit() {
      this.$emit('submit', this.form);
    },
  },
};
</script>

<style>

</style>
