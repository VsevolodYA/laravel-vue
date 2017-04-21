<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading"><h1>Loan Alert</h1></div>

                    <div class="panel-body">
                        Get loan alerts in your inbox!
                    </div>
                    <div class="panel-body">
                        <div class="col-md-8 col-md-offset-2">
                            <div class="form-group">
                                <input class="form-control" type="email" placeholder="Your BEST email" v-on:change="changeEmail" v-model="email">
                                <div class="alert alert-danger" v-if="emailError">
                                    {{ emailError }}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-1">
                            <button class="btn btn-default" @click="saveEmail">Alert Me</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    mounted() {
//      console.log('Component mounted.')
    },
    data() {
      return {
        email: '',
        emailError: ''
      }
    },
    methods: {
      changeEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(this.email)) {
          this.emailError = 'Not valid email.'
        } else {
          this.emailError = '';
        }
      },
      saveEmail() {
        if (!this.emailError) {
          this.$root.$data.email = this.email;
          this.$emit('emailsave');
        }
      }
    }
  }
</script>
