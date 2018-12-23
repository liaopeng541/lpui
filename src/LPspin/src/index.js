import Vue from 'vue';
import LPspin from './LPspin';
const VueLPspin=Vue.extend(LPspin)
let instance = null;
//隐藏
VueLPspin.hide=function()
{
    //如果存在才隐藏
    if(instance && instance.$el && instance.$el.parentNode)
    {
        instance.$el.parentNode.removeChild(instance.$el);
        instance=null;
    }
}
//显示
VueLPspin.show=function(message="",time=0)
{
    if(instance)
    {
        //如果己存在则只改变消息
        instance.message=message;
    }else{
        //不存在就新建一个并挂到body下
        instance = new VueLPspin({
            el: document.createElement('div'),
            data: {message:message}
        });
        document.body.appendChild(instance.$el);
    }
    if(time>0)
    {
        setTimeout(()=>{
            VueLPspin.hide();
        },time)
    }

}

export default VueLPspin

