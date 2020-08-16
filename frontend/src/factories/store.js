export default () => ({
  instructions: {
    status: 'string',
    items: {
      type: 'array',
      // initial_value: JSON.parse(localStorage.getItem('appointments')) || [],
      initial_value: [],
    },
  },
  actions: {
    list: async ({ commit, rootState }, params) => {
      const { authModule: { token } } = rootState;

      const endpoint = `${$const.API.BASE_URL}${$const.API.ENDPOINTS.APC_REPORT.FETCH_APPOINTMENTS}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      };

      try {
        commit('setStatus', $const.API.STATUS.LOADING);

        const { data: { data: appointments } } = await axios.get(endpoint, config);
        commit('seItems', appointments);

        commit('setStatus', $const.API.STATUS.SUCCESS);
      } catch (error) {
        commit('setStatus', $const.API.STATUS.ERROR);
        if (error.response) {
          if (error.response.status === 401) {
            commit('setStatus', $const.API.STATUS.UNAUTHORIZED);
          }
        }
      }
    },
  },
});
