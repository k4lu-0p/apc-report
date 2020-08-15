<template>
<!-- eslint-disable max-len -->
  <div class="min-h-screen bg-white">
    <top-bar
      has-back-button
    />
    <transition
      mode="out-in"
      enter-active-class="animated fadeIn faster-x2"
      leave-active-class="animated fadeOut faster-x2"
    >
      <form
        v-if="form.customer.id !== 0"
        @submit.prevent="handleSubmitCustomer"
        class="container mx-auto px-8"
      >

        <div class="flex flex-col justify-center items-center py-12">
          <img src="../../../public/img/bg/4.png" class="header-image-lg" alt="">
        </div>

        <!-- Customer commercial_name -->
        <div :class="[commercialNameErrors.length > 1 ? 'pb-5' : 'pb-8']">
          <!-- label -->
          <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
            Nom commercial :
            <span class="text-red-500">*</span>
          </label>

          <!-- input -->
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name=""
            id="warning"
            type="text"
            placeholder="Saisir le nom commercial"
            @blur="$v.form.customer.commercial_name.$touch()"
            v-model="$v.form.customer.commercial_name.$model"
          />

          <!-- errors -->
          <div :class="{'absolute' : commercialNameErrors.length === 1}">
            <p
              v-for="(message, index) in commercialNameErrors"
              :key="`customer-commercial-name-error-${index}`"
              class="text-red-500 text-xs font-medium pt-2"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Customer leader_lastname  -->
        <div :class="[leaderLastnameErrors.length > 1 ? 'pb-5' : 'pb-8']">
          <!-- label -->
          <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
            {{ $t('form.customer.leader_lastname.label') }}
            <span class="text-red-500">*</span>
          </label>

          <!-- input -->
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name=""
            id="warning"
            type="text"
            :placeholder="$t('form.customer.leader_lastname.placeholder')"
            @blur="$v.form.customer.leader_lastname.$touch()"
            v-model="$v.form.customer.leader_lastname.$model"
          />

          <!-- errors -->
          <div :class="{'absolute' : leaderLastnameErrors.length === 1}">
            <p
              v-for="(message, index) in leaderLastnameErrors"
              :key="`warning-error-${index}`"
              class="text-red-500 text-xs font-medium pt-2"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Customer leader_firstname  -->
        <div :class="[leaderFirstnameErrors.length > 1 ? 'pb-5' : 'pb-8']">
          <!-- label -->
          <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
            {{ $t('form.customer.leader_firstname.label') }}
            <span class="text-red-500">*</span>
          </label>

          <!-- input -->
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name=""
            id="warning"
            type="text"
            :placeholder="$t('form.customer.leader_firstname.placeholder')"
            @blur="$v.form.customer.leader_firstname.$touch()"
            v-model="$v.form.customer.leader_firstname.$model"
          />

          <!-- errors -->
          <div :class="{'absolute' : leaderFirstnameErrors.length === 1}">
            <p
              v-for="(message, index) in leaderFirstnameErrors"
              :key="`warning-error-${index}`"
              class="text-red-500 text-xs font-medium pt-2"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Customer adresse  -->
        <div :class="[leaderFirstnameErrors.length > 1 ? 'pb-5' : 'pb-8']">
          <!-- input et label -->
          <here-input
            @clear="handleClearAddress($event)"
            @onClickLocation="handleSelectAddress($event)"
            :label="$t('form.customer.address.label')"
            :placeholder="$t('form.customer.address.placeholder')"
            :default-value="addressLabel"
          ></here-input>

          <!-- errors -->
          <div :class="{'absolute' : addressErrors.length === 1}">
            <p
              v-for="(message, index) in addressErrors"
              :key="`warning-error-${index}`"
              class="text-red-500 text-xs font-medium pt-2"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Customer email  -->
        <div :class="[emailErrors.length > 1 ? 'pb-5' : 'pb-8']">
          <!-- label -->
          <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
            {{ $t('form.customer.email.label') }}
            <span class="text-red-500">*</span>
          </label>

          <!-- input -->
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name=""
            id="warning"
            type="email"
            :placeholder="$t('form.customer.email.placeholder')"
            @blur="$v.form.customer.email.$touch()"
            v-model="$v.form.customer.email.$model"
          />

          <!-- errors -->
          <div :class="{'absolute' : emailErrors.length === 1}">
            <p
              v-for="(message, index) in emailErrors"
              :key="`warning-error-${index}`"
              class="text-red-500 text-xs font-medium pt-2"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Customer phone  -->
        <div :class="[phoneErrors.length > 1 ? 'pb-5' : 'pb-8']">
          <!-- label -->
          <label class="block pb-2 font-semibold text-gray-800 text-lg" for="warning">
            {{ $t('form.customer.phone.label') }}
            <span class="text-red-500">*</span>
          </label>

          <!-- input -->
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name=""
            id="warning"
            type="tel"
            :placeholder="$t('form.customer.phone.placeholder')"
            @blur="$v.form.customer.phone.$touch()"
            v-model="$v.form.customer.phone.$model"
          />

          <!-- errors -->
          <div :class="{'absolute' : phoneErrors.length === 1}">
            <p
              v-for="(message, index) in phoneErrors"
              :key="`warning-error-${index}`"
              class="text-red-500 text-xs font-medium pt-2"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Submit -->
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

            <!-- submit -->
            <button
              :disabled="this.$v.$invalid || formHasNoChange"
              v-else
              :class="[this.$v.$invalid || formHasNoChange ? 'bg-gray-400' : ' bg-teal-600']"
              class="mx-auto hover:bg-teal-800 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Mettre à jour
            </button>
          </transition>
        </div>
      </form>
      <spinner
        :is-visible="true"
        v-else
      ></spinner>
    </transition>

    <alert-modal
      v-if="isAlertModalShowed"
      @cancel="handleCancelModal"
      type="forbidden"
      :title="alertModal.title"
      :message="alertModal.message"
    ></alert-modal>
  </div>
</template>

<script>
import TopBar from '../../components/Navigators/TopBar.vue';
import HereInput from '../../components/Inputs/HereInput.vue';
import { customerValidationMessages } from '../../mixins/formValidationMessages';
import validator from '../../validators';
import Spinner from '../../components/Spinner.vue';
import AlertModal from '../../components/Modals/AlertModal.vue';

export default {
  name: 'edit-customer-page',
  mixins: [customerValidationMessages],
  components: {
    TopBar,
    Spinner,
    AlertModal,
    HereInput,
  },
  data() {
    return {
      form: {
        customer: {
          id: 0,
          commercial_name: '',
          leader_lastname: '',
          leader_firstname: '',
          address: null,
          email: '',
          phone: '',
        },
      },
      save: {}, // copie de notre customer pour comparer les anciennes valeurs avec les nouvelles
      isAlertModalShowed: false,
      alertModal: {
        title: '',
        message: '',
        type: 'forbidden',
      },
    };
  },
  validations() {
    return {
      form: {
        customer: { ...validator.customer.form },
      },
    };
  },
  computed: {
    status() {
      return this.$store.getters['customersModule/getStatus'];
    },
    customers() {
      return this.$store.getters['customersModule/getCustomers'];
    },
    // hack pour eviter que les deux objets data de Vue soit syncro
    customerSaved() {
      return JSON.parse(this.save);
    },
    token() {
      return this.$store.getters['authModule/getToken'];
    },
    addressLabel() {
      if (this.form.customer.address) {
        return JSON.parse(this.form.customer.address).label;
      }
      return '';
    },
    formHasNoChange() {
      return JSON.stringify(this.form.customer) === JSON.stringify(this.customerSaved);
    },
  },
  methods: {
    // PUT les nouvelles data de notre customer
    // TODO: refactoring this
    handleSubmitCustomer() {
      const formData = this.form.customer;
      delete formData.id;

      // toggle si le nom commericial est déjà utilisé
      let commercialNameisAlreadyUse = false;

      // Params de la requête pour aller chercher les customers qui match avec le nom commercial
      const searchParams = {
        offset: 0,
        limit: 10,
        by: 'commercial_name',
        value: this.form.customer.commercial_name,
      };

      // On compare avec notre sauvegarde pour vérifier que l'user a bien saisi un nouveau nom
      if (this.form.customer.commercial_name !== this.customerSaved.commercial_name) {
        this.$store.dispatch('customersModule/fetchCustomers', searchParams).then(() => {
          if (this.customers.length > 0) {
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < this.customers.length; index++) {
              const customer = this.customers[index];
              // Si on trouve une correspondance alors le nom est déjà pris !
              // eslint-disable-next-line max-len
              if (customer.commercial_name.toLowerCase() === this.form.customer.commercial_name.toLowerCase()) {
                commercialNameisAlreadyUse = true;
                break;
              }
            }
          }

          // eslint-disable-next-line max-len
          // Si après le traitement de la boucle, c'est toujours false alors on peut envoyer nos data
          if (commercialNameisAlreadyUse === false) {
            this.$store.dispatch('customersModule/putCustomer', {
              id: this.$route.params.id,
              formData,
            }).then(() => this.$router.go(-1));
          } else {
            this.alertModal.title = 'Nom commercial déjà utilisé !';
            this.alertModal.message = 'Ce nom commercial est déjà utilisé sur une autre fiche partenaire.';
            this.alertModal.type = 'forbidden';
            this.isAlertModalShowed = true;
          }
        });
      } else {
        this.$store.dispatch('customersModule/putCustomer', {
          id: this.$route.params.id,
          formData,
        }).then(() => this.$router.go(-1));
      }
    },
    handleClearAddress() {
      this.$v.form.customer.address.$touch();
      this.form.customer.address = null;
    },
    handleSelectAddress(location) {
      this.form.customer.address = JSON.stringify(location);
    },
    handleCancelModal() {
      this.isAlertModalShowed = false;
      this.alertModal.title = '';
      this.alertModal.message = '';
      this.alertModal.type = '';
    },
  },
  async mounted() {
    if (!this.$route.params.id) {
      this.$router.go(-1);
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.FETCH_CUSTOMER}${this.$route.params.id}`;
      const { data: { data: customer } } = await this.$axios.get(endpoint, config);
      if (customer !== undefined) {
        this.form.customer = customer;
        this.save = JSON.stringify(customer); // hack pour eviter que les deux objets soit syncro
      }
    }
  },

};
</script>

<style lang="stylus">
.header-image-lg
  width 230px
</style>
