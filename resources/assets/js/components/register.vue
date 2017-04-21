<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Register</div>
                    <div class="panel-body">
                        <div class="row form-group">
                            <label for="name" class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control" name="name" required autofocus v-model="name">
                                <!--<span class="help-block">-->
                                <!--<strong></strong>-->
                                <!--</span>-->
                            </div>
                        </div>

                        <div class="row form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" required v-model="email">
                                <!--<span class="help-block">-->
                                <!--<strong></strong>-->
                                <!--</span>-->
                            </div>
                        </div>

                        <div class="row form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>
                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required v-model="password">
                            </div>
                        </div>

                        <div class="row form-group">
                            <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required v-model="passwordConfirm">
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="alert alert-danger" v-if="errorPassword">
                                    {{ errorPassword }}
                                </div>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button class="btn btn-primary" @click="sendRegisterData">
                                    Register
                                </button>
                            </div>
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

    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        errorName: '',
        errorEmail: '',
        errorPassword: ''
      }
    },
    methods: {
      sendRegisterData() {
        this.errorPassword = this.password != this.passwordConfirm ? 'Passwords is not equal.' : '';
        if (this.errorPassword) {
          return;
        } else {
          let registerData = {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirm
          };
          axios.post('/register', registerData)
            .then(response => {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('userName', response.data.user.name);
              this.$root.$data.token = response.data.token;
              this.$root.$data.userName = response.data.user.name;
              this.$root.$emit('login');
              this.$router.push({name: 'dashboard'});
            }, error => {
              this.error = error.response.data.error;
            });
        }
      }
    }
  }
</script>
