<template>
  <div>
    <ul>
      <li
        v-for="item in provider.items"
        :key="item.id"
      >
        {{ item.id }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Provider } from '../providers/Provider';

export default {
  name: 'ListingContainer',
  props: {
    provider: {
      required: true,
      type: Provider,
    },
  },
  created() {
    this.provider.list();
  },
};
</script>
