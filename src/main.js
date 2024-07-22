/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuevalidate from 'vuelidate'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faPlus,
    faTrash,
    faPen,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons';


library.add(faPlus, faTrash, faPen,faPowerOff)

/* add icons to the library */


createApp(App)
    // .use(VueSimpleAlert)
    .use(store)
    .use(router)
    .use(Vuevalidate)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
