<template>
    <div>
        <enter-email v-if="step == 1" v-on:emailsave="nextStep"></enter-email>
        <enter-data v-if="step == 2" v-on:datasave="nextStep"></enter-data>
        <finish v-if="step == 3"></finish>
    </div>
</template>

<script>
  export default {
    mounted() {
      this.email = this.$root.$data.email;
    },
    data() {
      return {
        step: 1
      }
    },
    methods: {
      nextStep() {
        if (this.step == 2) {
          axios.post('/email', this.$root.$data)
            .then(response => {
              console.log(response);
            });
        }
        this.step++;
      }
    }
  }
</script>
