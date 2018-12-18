import LPspin from './src/index';
export default {
    install(Vue) {
        Vue.prototype.$LPspin = LPspin;
    },
};