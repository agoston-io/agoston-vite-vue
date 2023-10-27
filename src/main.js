import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import router from './router'
import { AgostonClient } from '@agoston-io/client'
import App from './App.vue'

AgostonClient().then(agostonClient => {

    const apolloProvider = agostonClient.createEmbeddedApolloProvider();

    const app = createApp(App)
    app.use(apolloProvider)
    app.config.globalProperties.$agostonClient = agostonClient
    app.config.globalProperties.$session = agostonClient.session()
    app.use(router(agostonClient.session()));
    app.mount('#app')

});


