import LPspin from './LPspin/src/index';
export default {
    install(Vue) {
        Vue.prototype.$LPspin = LPspin;
    },
};