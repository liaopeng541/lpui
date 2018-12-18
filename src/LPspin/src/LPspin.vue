<template>
    <div style="position: fixed;top:0px;left:0px;right:0px;bottom:0px; background: rgba(0,0,0,0.5);z-index: 99999;display: flex;align-items: center;justify-content: center;">

        <div style="background: #ffffff;border-radius:2px;padding:8px 12px;border:solid 2px #f0f2f5;box-shadow: 0 -2px 20px 0 rgba(39,54,78,.11);display: flex;align-items: center;justify-content: center">
            <i class="el-icon-loading" style="font-size: 30px"></i>
            <span style="margin-left: 12px;font-size: 12px">{{message?message:"加载中..."}}</span>
        </div>

    </div>
</template>

<script>
    export default {
        name: "LPspin",
        data(){
            return {
                message:"",
            }
        }
    }
</script>

<style scoped>

</style>