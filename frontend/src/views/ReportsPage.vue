<template>
  <!-- Main -->
  <div class="">
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
      mode="out-in"
    >
      <transition-group v-if="reports" tag="ul">
        <li v-for="report in reports" :key="report.id">
          <report-item :report="report"/>
        </li>
      </transition-group>
      <div v-else class="flex justify-center items-center h-screen w-screen">
        <moon-loader :color="$const.MISC.SPINNER.COLOR"></moon-loader>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ReportItem from '@/components/Reports/ReportItem.vue';
import { reportsModule } from '../store/reports-module';
import $const from '../constants';

@Component({
  components: {
    ReportItem,
  },
})
export default class ReportsPage extends Vue {
  mounted(): void {
    if (!this.reports && !this.reports.length) {
      reportsModule.fetchUserReports().then(() => {
        // Handle invalid token even if user is authenticated
        if (reportsModule.requestStatus === $const.API.STATUS.UNAUTHORIZED) {
          reportsModule.logout().then(() => {
            this.$router.push({ path: '/login' }) // TODO: fix this
          })
        }
      });
    }
  },

  get reports(): Array<object> {
    return reportsModule.allReportsUser;
  }
}

</script>
