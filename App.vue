<template>
 <div class="app-container">
     <!--App.vue 组件-->
     <!--1:公共顶部导航条-->
    <mt-header fixed title="CXY-MALL" style="background:#f90">
        <router-link slot="left" to="">
            <mt-button icon="back" @click="back"></mt-button>
        </router-link>
    </mt-header>
     <!--2:容器显示其它组件-->
    <router-view></router-view>
    <!--3:底部tabbar-->
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item mui-active" to="/Index">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/Login">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">用户</span>
        </router-link>
        <router-link class="mui-tab-item" to="/TfCart">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
               <!--<span class="mui-badge">{{$store.getters.optCartCount}}</span>-->
            </span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/SVIP">
            <span class="mui-icon mui-icon-extra mui-icon-extra-heart-filled"></span>
            <span class="mui-tab-label">SVIP</span>
        </router-link>
    </nav> 
 </div>
</template>
<script>
    export default{
        data(){
            return {}
        },
        methods:{
            back(){
                history.go(-1);
            },
        }
    }
</script>
<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>
