<template>
    <div>
        <div class="mui-card">
            <div class="mui-card-header">购物车
                <!--添加复选框 全选-->
                <input type="checkbox" @click="selectAll" :checked="allcb">
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--商品信息开始-->
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="(item,i) of list" :key="i">
                            <!--商品复选框-->
                            <input type="checkbox" style="float:left;margin:15px;" :data-id="item.id" :checked="item.cb" @click="modifyItem" :data-i="i">
                            <a href="javascript:;" style="float:left">
                                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                                <div class="mui-media-body">
                                    <p class='mui-ellipsis'>
                                        {{item.pname}}<br/>
                                        ¥:{{item.price.toFixed(2)}}
                                        <!--<input type="button" value="删除" @click="removeItem" :data-id="item.id" :data-idx="i">-->
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>    
                    <!--商品信息结束-->
                </div>
            </div>
            <div class="mui-card-footer">
                <input type="button" value="删除选中的商品" @click="delItem" >
            </div>
        </div>			
    </div>
</template>
<script>
    import {Toast} from "mint-ui";
    export default {
        data(){
            return {
                list:[],  //购物车列表
                allcb:false  //全选状态 默认未选中
            }
        },
        created(){
            this.loadMore();

        },
        methods:{
            //加载当前用户购物车列表
            loadMore(){
                //1:创建url地址
                var url="http://127.0.0.1:3000/getTfCart";
                //2:发送ajax请求
                this.axios.get(url).then(result=>{
                    //3:获取返回数据
                    //4:保存list
                    //this.list=result.data.data;
                    //5:循环显示
                    //6:获取返回数组
                    var rows=result.data.data;
                    //7:为数组中每个对象添加属性cb初始值false
                    for(var item of rows){
                        item.cb=false;
                    }
                    //8:将数据保存list中
                    this.list=rows;
                })
            },
            //删除购物车中某个商品
            removeItem(e){
                //1:获取购物车商品id
                var id=e.target.dataset.id;
                var idx=e.target.dataset.idx;
                //2:创建url
                var url="http://127.0.0.1:3000/removeItem";
                var postData=this.qs.stringify({
                    id:id
                });
                //3:发送ajax请求
                this.axios.post(url,postData).then(result=>{
                    if(result.data.code==1){
                        this.list.splice(idx,1);
                        Toast("删除成功");
                    }else{
                        Toast("删除失败");
                    }
                })
                //4:获取返回结果
                //5:提示删除结果
                //6:list对应商品项删除
            },
            //删除选中的多个商品
            delItem(){
                //[{cb:true,id:1},{cb:tre,id:3}]
                //"1,3"
                //1:创建空字符串
                var html="";
                //2:遍历数据中元素
                for(var item of this.list){
                    //3:判断cb==true
                    if(item.cb){
                        //4:保存id拼接字符串 "1,6,7,"
                        html+=item.id+",";
                    }
                }
                if(html.length==0){
                    Toast("请选中您需要删除的商品!");
                    return;
                }
                //5:截取字符串去除最后  "1,6,7"
                html=html.substring(0,html.length-1);
                //6:发送ajax ids=1,6,7
                var url="http://127.0.0.1:3000/removeMItem?ids="+html;
                this.axios.get(url).then(result=>{
                    if(result.data.code==1){
                        Toast("删除成功");
                        this.loadMore();
                    }else{
                        Toast("删除失败");
                    }
                })
                //7:获取返回数据提示 删除成功或失败
            },
            //修改复选框状态 选中 取消
            modifyItem(e){
                //1:获取当前元素状态 true false
                var rs=e.target.checked;
                //2:当前元素在数组中下标
                var i=e.target.dataset.i;
                //3:将状态赋值给当前数组下标中对象cb值
                this.list[i].cb=rs;
                //判断全选复选框状态 true false
                //1:获取数组个数
                var size1=this.list.length;
                //2:计算数组中cb true 元素个数
                var count=0;
                for(var item of this.list){
                    if(item.cb){
                        count++;
                    }
                }
                //3:数组个数==cb true 个数[累加和]
                if(count==size1){
                    this.allcb=true;
                }else{
                    this.allcb=false;
                }
                //4:将allcb=true
                //5:否则allcb=false
            },
            //全选
            selectAll(e){
                //1:获取全选按钮选中状态
                var rs=e.target.checked;
                //2:遍历数组所有元素
                for(var item of this.list){
                    item.cb=rs;
                }
                //3:item.cb==全选状态
            }
        }
    }
</script>