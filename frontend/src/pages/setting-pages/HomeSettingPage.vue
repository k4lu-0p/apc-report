<template>
<!-- eslint-disable max-len -->
  <div class="container mx-auto p-4 bg-white">
    <!-- spinner pending switch account -->
    <spinner
      :isVisible="true"
      v-if="isSwitchingAccount"
    ></spinner>

    <div v-else class="flex flex-col justify-center items-center">

      <!-- admin features -->
      <div v-if="userRole === 'ROLE_ADMIN'" class="w-full">
        <h2 class="font-bold text-xl text-gray-800 pt-4 text-left">Changer de compte :</h2>
        <label for="search-user" class="py-2 block text-gray-800">Se connecter en tant que :</label>
        <input-search
          id="search-user"
          :status="usersModuleStatus"
          placeholder="Nom d'utilisateur"
          @search="handleSearchUser"
        ></input-search>
        <transition
          mode="out-in"
          enter-active-class="animated fadeIn faster-x2"
          leave-active-class="animated fadeOut faster-x2"
        >
          <!-- if no result user search -->
          <div v-if="hasNoResult">
            <p class="text-gray-500 text-center py-5 px-10">Aucun résultat</p>
          </div>

          <!-- list users founded -->
          <div v-if="users && users.length > 0">
            <div
              v-for="user in users"
              :key="`user-${user.id}`"
              @click="handleSwitchAccount(user)"
              class="my-2 h-20 rounded-r flex items-center justify-center border border-yellow-750 shadow-lg bg-white rounded px-2"
            >
              <p class="py-5 text-center w-full font-bold text-gray-800">{{ user.name }}</p>
            </div>
          </div>
        </transition>
      </div>

      <!-- admin : newsletter form -->
      <newsletter-form
        v-if="userRole === 'ROLE_ADMIN'"
        @submit="handleSubmitNewsletter"
        :is-sending="isSendingMails"
      ></newsletter-form>

      <!-- logout -->
      <button
        @click="logout"
        class="text-lg mx-auto border-2 border-yellow-750 text-yellow-750 bg-white w-full font-bold py-2 rounded focus:outline-none focus:shadow-outline"
      >
        {{ $t('form.login.logout.label') }}
      </button>
    </div>
  </div>
</template>

<script>
import logout from '../../mixins/logout';
import InputSearch from '../../components/Inputs/InputSearch.vue';
import Spinner from '../../components/Spinner.vue';
import NewsletterForm from '../../components/Forms/NewsletterForm.vue';

export default {
  name: 'settings-page',
  mixins: [logout],
  components: {
    InputSearch,
    Spinner,
    NewsletterForm,
  },
  data() {
    return {
      usersSearchParams: {
        limit: 10,
        offset: 0,
        by: 'user_name',
        value: '',
      },
      isSwitchingAccount: false,
      isSendingMails: false,
      userToSwitchHasNoToken: false,
      hasNoResult: false,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters['authModule/getUserRole'];
    },
    users: {
      get() {
        return this.$store.getters['usersModule/getUsers'];
      },
      set(value) {
        this.$store.commit('usersModule/setUsers', value);
      },
    },
    usersModuleStatus() {
      return this.$store.getters['usersModule/getStatus'];
    },
    token: {
      get() {
        return this.$store.getters['authModule/getToken'];
      },
      set(value) {
        this.$store.commit('authModule/setToken', value);
      },
    },
    currentUser: {
      get() {
        return this.$store.getters['authModule/getUser'];
      },
      set(value) {
        this.$store.commit('authModule/setUser', value);
      },
    },
  },
  methods: {
    handleSearchUser(userName) {
      if (userName.length) {
        this.hasNoResult = false;
        this.usersSearchParams.value = userName;
        this.$store.dispatch('usersModule/fetchUsers', this.usersSearchParams).then(() => {
          // handle no result
          if (this.users.length === 0) {
            this.hasNoResult = true;
          }

          // Handle invalid token even if user is authenticated
          if (this.usersModuleStatus === this.$const.API.STATUS.UNAUTHORIZED) {
            this.logout();
          }
        });
      }
    },
    async handleSwitchAccount(user) {
      this.isSwitchingAccount = true;
      const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.APC_REPORT.FETCH_USER}${user.id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };

      const { data } = await this.$axios.get(endpoint, config);

      if (data.token && data.user) {
        this.token = data.token;
        this.currentUser = data.user;
        this.$router.push({ name: this.$const.NAVIGATION.HOME_PAGE.NAME });
      }
    },
    async handleSubmitNewsletter(newsletterForm) {
      if (newsletterForm) {
        this.isSendingMails = true;
        const endpoint = `${this.$const.API.BASE_URL}${this.$const.API.ENDPOINTS.APC_REPORT.NEWSLETTER_CUSTOMER}`;
        const config = {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        };

        // eslint-disable-next-line no-useless-catch
        try {
          const { subject, content, attachment } = newsletterForm;
          const formData = new FormData();
          formData.append('subject', subject);
          formData.append('content', content);
          formData.append('attachment', attachment);
          await this.$axios.post(endpoint, formData, config);
          this.isSendingMails = false;
        } catch (error) {
          throw error;
        }
      }
    },
  },
  mounted() {
    this.users = [];
  },
};
</script>
