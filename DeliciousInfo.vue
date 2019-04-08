<template>
    <div>
        <div class="mui-card">
            <div class="mui-card-header">商品名称：{{info.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <img :src="info.pic" style="width:325px;height:300px;">
                    <p style="font-size:16px;color:#000;text-align:center;">
                        销售价：¥:{{info.price}}
                    </p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="danger" size="small" @click="addCart" style="background:#f90">加入购物车</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    export default {
        data(){
            return { //上一个组件传递id
                lid:this.$route.query.lid,
                info:{}  //显示商品对象
            }
        },
        created(){
            this.DeliciousInfo();
        },
        methods:{
            //当组件创建成功后加载当前商品信息
            DeliciousInfo(){
                //1:获取商品lid
                //2:发送ajax请求
                var url="http://127.0.0.1:3000/DeliciousInfo?lid="+this.lid;
                this.axios.get(url).then(result=>{
                    this.info=result.data.data[0];
                })
                console.log(this.info)
                //3:获取服务器返回结果[]
                //4:保留返回结果 info{}
            },
            //添加至购物车
            addCart(){
                //1:获取三个参数 pid pname price pic
                var pid=this.lid;
                var pname=this.info.lname;
                var price=this.info.price;
                var img_url=this.info.pic;

                    //2:发送ajax
                    var url="http://127.0.0.1:3000/addcart?pid="+pid+"&price="+price+"&pname="+pname+"&img_url="+img_url;
                    this.axios.get(url).then(result=>{
                        Toast(result.data.msg);
                        //如果将商品已经加入购物车
                        this.$store.commit("increment");
                    })
                    //3:获取返回结果 提示
            }
        }
    }
</script>
<style>
</style>
