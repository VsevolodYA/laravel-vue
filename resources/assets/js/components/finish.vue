<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading"><h1>Watch your inbox...</h1></div>
                    <div class="panel-body">
                        Alerts are on the way to {{ email }}.
                    </div>
                    <div class="panel-body">
                        If you need to change anything, just up again.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    mounted() {
      this.email = this.$root.$data.email;
    },
    data() {
      return {
        email: ''
      }
    },
    methods: {}
  }
</script>
