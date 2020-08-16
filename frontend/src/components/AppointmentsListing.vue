<script>
import containerFactory from '../factories/container';
import provider from '../providers/appointment';

import ListingContainer from './ListingContainer.vue';

export default containerFactory(ListingContainer, { provider });

</script>
