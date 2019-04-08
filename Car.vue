<template>
    <div class="app-goodlist">
        <!--商品详细信息 start-->
        <div class="goods-item" v-for="(item,i) of list" :key="i">
            <img :src="item.pic" @click.prevent="jumpInfo" :data-lid="item.lid" />
            <h4 style="font-size:15px">{{item.lname}}</h4>
            <div class="info">
                <span class="now">¥{{item.price.toFixed(2)}}</span>
            </div>
            <div class="sell">
                <span>热卖中</span>
            </div>
        </div>
        <!--商品详细信息 end-->
        <!--加载更多-->
        <mt-button size="large" type="primary" @click="loadMore" style="background:#f90">加载更多</mt-button>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[],  //模板中显示商品列表
                pno:0   //第几页  初始值0
            }
        },
        created(){
            //当组件创建成功后立即调用加载下一页方法
            this.loadMore();
        },
        methods:{
            //加载下一页的数据，并且将数据显示在模板上
            loadMore(){
                //0:获取当前页码
                this.pno++;
                //1:创建变量url请求地址
                var url="http://127.0.0.1:3000/Car?pno="+this.pno;
                //2:发送ajax请求
                this.axios.get(url).then(result=>{
                    //3:获取服务器返回结果保存data
                    //this.list=result.data.data;
                    //3:获取服务器返回结果，追加list
                    //使用concat拼接数组
                    var rows=this.list.concat(result.data.data);
                    this.list=rows;
                })
            },
            //跳转商品详情组件
            jumpInfo(e){
                var lid=e.target.dataset.lid;
                this.$router.push("/CarInfo?lid="+lid);
            }
        }
    }
</script>
<style>
    /*外层父元素*/
    .app-goodlist{
        display:flex;/*弹性布局*/
        flex-wrap:wrap;/*子元素换行*/
        justify-content:space-between;/*两端对齐*/
        padding:4px;/**/
    }
    /*商品信息*/
    .app-goodlist .goods-item{
        width:49%;/*商品信息元素宽度*/
        border:1px solid #ccc;/*边框*/
        margin:2px 0;/*外补丁*/
        padding:2px;
        display:flex;/*子元素弹性布局*/
        flex-direction:column;/*排列方式；按列*/
        min-height:245px;/*最小高度*/
    }
    /*商品图片*/
    .app-goodlist .goods-item img{
        width:100%;
    }
    /*商品名称*/
    /*商品价格*/
</style>