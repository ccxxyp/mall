<template>
    <div>
        <div style="width:380px"><img src="http://127.0.0.1:3000/img/zc.jpg" style="width:100%"></div>
        <form>
        <input type="text" name='uname' v-model='uname' placeholder="请输入用户名"><br>
        <input type="text" name="user_name" placeholder="请再次输入"><br>
        <center>
        <input type="radio" id="man" name="sex" value="男" checked><label for="man">男</label>
        <input type="radio" id="woman" name="sex" value="女"><label for="woman">女</label>
        </center>
        <input type="password" name='upwd' v-model='upwd' placeholder="请输入密码"><br>
        <input type="email" name="email" placeholder="请输入邮箱"><br>
        <input type="text" name="phone" placeholder="请输入手机号"><br>
        
        <center>
            <input type="button" style='width:30%;' value="立即注册" @click='btnRegister'>
        </center>
        </form>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                uname:'',
                upwd:''
            }
        },
        methods:{
            btnRegister(){
                // 1：获取输入的用户名和密码
                    var u = this.uname;
                    var p = this.upwd;
                    console.log(u)
                // 2：创建正则表达式验证用户名和密码格式是否正确
                    var reg = /^[a-z0-9_]{3,8}$/i;
                    if(!reg.test(u)){
                        // 提示信息不匹配
                        Toast('用户名格式有误，请检查');
                        return;
                    }
                    if(!reg.test(p)){
                        // 提示信息不匹配
                        Toast('密码格式不正确，请检查');
                        return;
                    }
                // 3：发送ajax
                    var url = 'http://127.0.0.1:3000/register?uname='+u+'&upwd='+p;
                    this.axios.get(url).then(result=>{
                        Toast(result.data.msg)
                        location.href = "http://127.0.0.1:8080/#/Login"
                    });
                // 4：获取服务器返回结果
                // 5：提示用户
            }
        }
    }
</script>
