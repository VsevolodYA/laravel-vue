<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Reset Password</div>
                    <div class="panel-body">

                        <div class="alert alert-success" v-if="status">
                        {{ status }}
                        </div>

                        <div class="row form-group">
                            <label for="email" class="col-md-4 control-label">E-Mail Address</label>
                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control" name="email" v-model="email" required>
                                <span class="help-block" v-if="error">
                                <strong>{{ error }}</strong>
                                </span>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary" @click="sendResetLink">
                                    Send Password Reset Link
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
        email: '',
        status: '',
        error: ''
      }
    },
    methods: {
      sendResetLink() {
        let data = {
          email: this.email
        };
        axios.post('/password/email', data)
          .then(response => {
            if (response.status == 200) {
                this.status = 'We have e-mailed your password reset link!';
            }
          }, error => {
            this.error = error.response.data.error;
          });
      }
    }
  }
</script>
