<template>
    <div class="app-home">
        <!--顶部导航条  mint-ui-->
        <mt-header fixed title="CXY-MALL" style="background:#f90"></mt-header>
        <!--轮播图  mint-ui-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) of navlist" :key="i"><img :src="item.img_url"/></mt-swipe-item>
        </mt-swipe>
        <!--九宫格  mui-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,i) of gridlist" :key="i">
                <a href="#">                 <!--prevent 阻止默认行为-->
                    <img :src="item.img_url" @click.prevent="jump" :data-id="item.id" />
                    <div class="mui-media-body">{{item.title}}</div>
                </a>
            </li>
        </ul>            
        <!--tabbar  mui-->                      
    </div>
</template>
<script>
    export default {
        data(){
            return {
                navlist:[], //轮播图列表
                gridlist:[],  //九宫格
                id:this.$route.query.id,  //上个组件传来的id
                info:{} 
            }
        },
        created(){
            this.handleImage();
            this.handleGrid();
        },
        methods:{
            handleGrid(){
                //1:发送ajax获取九宫格数据
                var url="http://127.0.0.1:3000/grid";
                this.axios.get(url).then(result=>{
                    //2:获取返回数据
                    //3:保存gridlist
                    this.gridlist=result.data;
                })
            },
            //加载轮播图的数据
            handleImage(){
                //1:发送ajax获取轮播数据
                var url="http://127.0.0.1:3000/imglist";
                this.axios.get(url).then(result=>{
                    //2:获取返回结果
                    //console.log(result.data.data);
                    //3:保存data属性中
                    this.navlist=result.data.data;
                })
            },
            //Home.vue
            jump(e){
                var id=e.target.dataset.id;
                var path="/";
                if(id==1){
                    path="/Supermarket";
                }else if(id==2){
                    path="/Phone";
                }else if(id==3){
                    path="/Cosmetics";
                }else if(id==4){
                    path="/Delicious";
                }else if(id==5){
                    path="/Dress"
                }else if(id==6){
                    path="/Car";
                }else{
                    path="/";
                }
                this.$router.push(path);
            }
        }
    }
</script>
<style>
    /*轮播框的高度*/
   .app-home .mint-swipe{
       height:200px;
   } 
   /*轮播图片宽度*/
   .app-home .mint-swipe img{
       width:100%;
   }
   /*九宫格图片宽度 逻辑像素=物理像素/2*/
   .app-home .mui-grid-9 img{
       width:60px;  /*逻辑像素*/
       height:60px;
   }
   /*九宫格背景色  白色*/
   .app-home .mui-grid-view.mui-grid-9{
       background-color:#fff;
   }
   /*练习：tabbar  mui/.../tabbar.html*/

</style>