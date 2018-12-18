import Vue from 'vue';
import LPspin from './LPspin';
const VueLPspin=Vue.extend(LPspin)
let instance = null;
VueLPspin.hide=function()
{
    if(instance && instance.$el && instance.$el.parentNode)
    {
        instance.$el.parentNode.removeChild(instance.$el);
        instance=null;
    }
}
VueLPspin.show=function(message="")
{
    if(instance)
    {
        instance.message=message;
    }else{
        instance = new VueLPspin({
            el: document.createElement('div'),
            data: {message:message}
        });
        document.body.appendChild(instance.$el);
    }

}

export default VueLPspin

