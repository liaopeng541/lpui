import LPspin from './LPspin/src/index';
import request from "./LPrequest"
import ComboGrid from "./ComboGrid/ComboGrid"
import InputGrid from "./InputGrid/InputGrid"
export default {
    install(Vue) {
        Vue.prototype.$LPspin = LPspin;
        Vue.prototype.$post=request.post;
        Vue.prototype.$get=request.get;
        Vue.prototype.$json=request.json;
    },
    ComboGrid,
    InputGrid
};