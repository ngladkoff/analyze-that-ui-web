import 'core-js/stable'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the Auth0 plugin here
import { Auth0Plugin } from "./auth";

Vue.config.performance = true
Vue.use(VueAxios, axios)
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});


new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
