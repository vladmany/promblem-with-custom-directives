import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

export const output_bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.directive("changestyle",{
    bind(e1) {
        console.log(e1);
        e1.style.color = "red";
        e1.style.fontSize = "30px";
    }
});