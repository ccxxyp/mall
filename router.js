import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Test from "./components/Test.vue"  //1:引入Test.vue组件
import List from "./components/List.vue"
import Login from "./components/project/Login.vue"
import Register from "./components/project/Register.vue"
import TfCart from "./components/project/TfCart.vue"
import Supermarket from "./components/project/Supermarket.vue"
import SupermarketInfo from "./components/project/SupermarketInfo.vue"
import Phone from "./components/project/Phone.vue"
import PhoneInfo from "./components/project/PhoneInfo.vue"
import Cosmetics from "./components/project/Cosmetics.vue"
import CosmeticsInfo from "./components/project/CosmeticsInfo.vue"
import Delicious from "./components/project/Delicious.vue"
import DeliciousInfo from "./components/project/DeliciousInfo.vue"
import Dress from "./components/project/Dress.vue"
import DressInfo from "./components/project/DressInfo.vue"
import Car from "./components/project/Car.vue"
import CarInfo from "./components/project/CarInfo.vue"
import Index from "./components/project/Index.vue"
import SVIP from "./components/project/SVIP.vue"
import SvipInfo from "./components/project/SvipInfo.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:"/Index"},
    {path:'/Test',component:Test},//2:为Test组件配置访问路径  /Test
    {path:'/List',component:List},
    {path:'/Login',component:Login},
    {path:'/Register',component:Register},
    {path:'/TfCart',component:TfCart},
    {path:'/Supermarket',component:Supermarket},
    {path:'/SupermarketInfo',component:SupermarketInfo},
    {path:'/Phone',component:Phone},
    {path:'/PhoneInfo',component:PhoneInfo},
    {path:'/Cosmetics',component:Cosmetics},
    {path:'/CosmeticsInfo',component:CosmeticsInfo},
    {path:'/Delicious',component:Delicious},
    {path:'/DeliciousInfo',component:DeliciousInfo},
    {path:'/Dress',component:Dress},
    {path:'/DressInfo',component:DressInfo},
    {path:'/Car',component:Car},
    {path:'/CarInfo',component:CarInfo},
    {path:'/Index',component:Index},
    {path:'/SVIP',component:SVIP},
    {path:'/SvipInfo',component:SvipInfo},
  ]
})
