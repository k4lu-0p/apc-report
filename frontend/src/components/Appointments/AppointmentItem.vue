<template>
  <div v-if="appointment">
    <div>
      <p>ID : {{ appointment.id }}</p>
      <p>REPORT ID : {{ appointment.report_id }}</p>
      <p>USER ID : {{ appointment.user_id }}</p>
      <p>CUSTOMER ID : {{ appointment.customer_id }}</p>
      <p>TITLE : {{ appointment.title }}</p>
      <p>LOCATION :</p>
       <p v-for="(elem, index) in location" :key="`${index}-question`">
        {{index}} : {{elem}}
      </p>
      <p>START AT : {{ appointment.start_at }}</p>
      <p>FINISH AT : {{ appointment.finish_at }}</p>
      <p>WARNING : {{ appointment.warning }}</p>
      <p>CREATED AT : {{ appointment.created_at }}</p>
      <p>UPDATED AT : {{ appointment.updated_at }}</p>
    </div>

    <hr>
  </div>
</template>

<script>
export default {
  name: 'appointment-item',
  props: {
    appointment: Object,
  },
  computed: {
    location() {
      return JSON.parse(this.appointment.location);
    },
  },
};
</script>

<style>

</style>
