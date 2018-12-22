import VueResource from 'vue-resource';
import App from './../components/pages/App.vue';
import HomePage from './../components/pages/Home.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

// for session support
Vue.http.options.credentials = true;

var router = new VueRouter({
    routes: [{
        path: '/',
        component: HomePage
    }]
});

// the vue instance
var vm = new Vue({
    el: '#app',
    data() {
        return {
            deviceReady: false
        };
    },
    components: {
        'app': App,
        'home': HomePage
    },
    router,
    render: function(h) {
        return h(App);
    }
});

// apply event listener for deviceready
document.addEventListener('deviceready', () => vm.deviceReady = true);
