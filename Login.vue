<template>
    <div class="app-login">
        <div style="width:380px;"><img src="http://127.0.0.1:3000/img/dl.jpg" style="width:100%"></div>
        <form>
        <input type="text" name='uname' v-model='uname' placeholder="请输入用户名"><br>
        <input type="password" name='upwd' v-model='upwd' placeholder="请输入密码"><br>
        <input type="button" style='width:30%;float:left' value="登录" @click='btnLogin'>
        <input type="button" style='width:30%;float:right' value="注册" @click='btnRegister'>  
        </form>
    </div>
</template>
<script>
    //1:引入mint-ui Toast 局部使用
    import {Toast} from "mint-ui"
    export default {
        data(){
            return {
                uname:"",
                upwd:"",
            }
        },
        methods:{
            btnLogin(){
                //1:获取用户输入用户名和密码
                var u=this.uname;
                var p=this.upwd;
                //2:创建正则表达式验证用户名和密码格式是否正确
                var reg=/^[a-z0-9_]{3,8}$/i;  //i表示忽略大小写
                if(!reg.test(u)){
                    //提示信息不是alert();
                    Toast("用户名格式不正确，请检查");
                    return;
                }
                if(!reg.test(p)){
                    Toast("密码格式不正确，请检查");
                    return;
                }
                //3:发送ajax
                var url="http://127.0.0.1:3000/login?uname="+u+"&upwd="+p;
                this.axios.get(url).then(result=>{
                    if(result.data.code==1){
                        Toast("登录成功");
                        location.href="http://127.0.0.1:8080/#/Index"; //登录成功跳转到首页
                    }else{
                        Toast("用户名或密码有误");
                    }
                });
            },
            btnRegister(){
                this.$router.push({path:'/register'});
            }
        }
    }
</script>
<style>
</style>

