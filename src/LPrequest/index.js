/**
 * Created by liaopeng on 17/3/4.
 */
'use strict'
import querystring from 'query-string';
var request={}
function buildrequest(url,params,overtime=0,type="GET",contentType="form",useCookie=false){
    var header={
        method: type,
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
    }
    if(useCookie)
    {
        header.mode='no-cors';
        header.credentials="include";
    }
    if(params)
    {
        if(type=="GET")
        {
            let opera='';
            url.indexOf("?")>=0?opera='&':opera="?";
            url +=opera+querystring.stringify(params);
        }
        if(type=='POST')
        {
            header.body=querystring.stringify(params)
        }
        if(contentType=='json')
        {
            header.headers['Content-Type']='application/json';
            header.body=JSON.stringify(params)
        }
    }
    return Promise.race([
        fetch(url,header),
        new Promise((resolve, reject) => {
            setTimeout(() => reject({status:150,msg:"访问超时!"}), overtime>0 ? overtime*1000 : 30 * 1000);
        })
    ]).then((response)=>{
        return new Promise((resolve, reject) => {
            if(response.status!=200)
            {
                reject({status:response.status,msg:"数据接口异常!"});
            }else{
                resolve(response.json());
            }

        })

    })
}
request.post=(url,body,overtime=30,useCookie=false)=>{
    return buildrequest(url,body,overtime,"POST","form",useCookie);
}
request.get=(url,body,overtime=30,useCookie=false)=>{
    return buildrequest(url,body,overtime,"GET","form",useCookie);
}
request.json=(url,body,overtime=30,useCookie=false)=>{
    return buildrequest(url,body,overtime,"POST","json",useCookie);
}
export default request