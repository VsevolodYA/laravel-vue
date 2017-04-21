<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">

                        <div class="row form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" required autofocus v-model="email">
                                <span class="help-block" v-if="false">
                                        <strong></strong>
                                    </span>
                            </div>
                        </div>

                        <div class="row form-group">
                            <label for="password" class="col-md-4 control-label">Password</label>
                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control" name="password" required v-model="password">
                                <span class="help-block" v-if="false">
                                        <strong></strong>
                                    </span>
                            </div>
                        </div>

                        <div class="row form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="alert alert-danger" v-if="error">
                                    {{ error }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" v-model="remember"> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-primary" @click="sendLoginData">
                                    Login
                                </button>

                                <router-link :to="{ name: 'passwordForget' }" class="btn btn-link">
                                Forgot Your Password?
                                </router-link>
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
        email: '',
        password: '',
        remember: false,
        error: ''
      }
    },
    methods: {
      sendLoginData() {
        let loginData = {
          email: this.email,
          password: this.password
        };
        axios.post('/login', loginData)
          .then(response => {
            if (this.remember) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('userName', response.data.user.name);
            }
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
</script>
