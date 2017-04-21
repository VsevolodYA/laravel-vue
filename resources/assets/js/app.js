/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('header-nav', require('./components/header-nav.vue'));

const Login = Vue.component('login', require('./components/login.vue'));
const Register = Vue.component('register', require('./components/register.vue'));
const passwordForget = Vue.component('passwordForget', require('./components/passwordForget.vue'));

const Dashboard = Vue.component('dashboard', require('./components/dashboard.vue'));

Vue.component('enter-email', require('./components/enter-email.vue'));
Vue.component('enter-data', require('./components/enter-data.vue'));
Vue.component('finish', require('./components/finish.vue'));

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forget',
      name: 'passwordForget',
      component: passwordForget
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    }
  ]
});

const app = new Vue({
  router,
  el: '#app',
  mounted() {
//      console.log('App init.');
  },
  data() {
    return {
    }
  },
  methods: {

  }
});


