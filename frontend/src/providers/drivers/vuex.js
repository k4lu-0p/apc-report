export default function makeVuexDriver({ namespace, store }) {
  return {
    computed: {
      items() {
        return store.state[namespace].items;
      },
    },
    methods: {
      list() {
        store.dispatch(`${namespace}/list`);
      },
      create() {
        store.dispatch(`${namespace}/create`);
      },
      delete() {
        store.dispatch(`${namespace}/delete`);
      },
      update() {
        store.dispatch(`${namespace}/update`);
      },
    },
  };
}
