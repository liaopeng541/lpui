import LPspin from './LPspin/src/index';
import request from "./LPrequest"
import ComboGrid from "./ComboGrid/ComboGrid"
import InputGrid from "./InputGrid/InputGrid"
export default {
    install(Vue) {
        Vue.component(ComboGrid.name, ComboGrid)
        Vue.component(InputGrid.name, InputGrid)
        Vue.prototype.$LPspin = LPspin;
        Vue.prototype.$request=request;
        Vue.prototype.$post=request.post;
        Vue.prototype.$get=request.get;
        Vue.prototype.$json=request.json;
    },

};