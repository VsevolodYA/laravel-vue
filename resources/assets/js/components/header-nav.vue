<template>
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <router-link :to="{ name: 'dashboard' }" class="navbar-brand">Home</router-link>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
                    &nbsp;
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                    <li v-if="!loggedIn">
                        <router-link :to="{ name: 'login' }">Login</router-link>
                    </li>
                    <li v-if="!loggedIn">
                        <router-link :to="{ name: 'register' }">Register</router-link>
                    </li>
                    <li class="dropdown" v-if="loggedIn">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                            {{ userName }} <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a class="pointer" @click="logout">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
  export default {
    mounted() {
      this.$root.$on('login', () => {
        this.token = this.$root.$data.token;
        this.userName = this.$root.$data.userName;
        this.loggedIn = true;
      });
    },
    data() {
      return {
        loggedIn: localStorage.getItem('token') ? true : false,
        userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
      }
    },
    methods: {
      logout() {
        localStorage.setItem('token', '');
        localStorage.setItem('userName', '');
        this.token = this.$root.$data.token = '';
        this.userName = this.$root.$data.userName = '';
        this.loggedIn = false;
        axios.post('/logout', {})
          .then(result => {
            console.log(result);
            this.$router.push({name: 'login'});
          });
      }
    }
  }
</script>