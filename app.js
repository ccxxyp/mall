//app_server_00/app.js
//0:下载mysql express模块
//1:引入两个模块 mysql express
const mysql=require("mysql");
const express=require("express");
//1.1 引入模块 cors
const cors=require("cors");
//2:创建连接池  很大的提高效率方法
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"sn",
    connectionLimit:10 //连接池数量
});
//3:创建express对象
var server=express();
//3.1 配置允许访问列表 脚手架8080  跨域
server.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],
    credentials:true
}));
//3.11 引入模块 express-session
//并且对其配置 顺序问题
const session=require("express-session");
//3.12 配置模块
server.use(session({
    secret:"128位随机字符串",  //安全字符串
    resave:false,   //每次请求更新session值
    saveUninitialized:true,  //初始化保存数据
    cookie:{
        maxAge:1000*60*60  //session对象存活  一个小时   1000ms=1s
    }
}));
//3.2 配置静态资源目录 public
server.use(express.static("public"));
//3.3 配置第三方中间件
const bodyParser=require("body-parser");
//3.4 配置json是否是自动转换   fasle是不转换
server.use(bodyParser.urlencoded({extended:false}));

//4:为express对象绑定监听端口 3000
server.listen(3000);

//用户登录
server.get("/login",(req,res)=>{
    //2:获取二个参数 uname upwd
    var u=req.query.uname;
    var p=req.query.upwd;
    //3:创建sql
    var sql="SELECT uid FROM sn_user WHERE uname=? AND upwd=?";
    //4:执行sql
    pool.query(sql,[u,p],(err,result)=>{
        if(err) throw err;  
        //6:返回客户数据
        if(result.length==0){  //如果没查到
            res.send({code:-1,msg:"用户名或密码有误"});
        }else{
            //登录成功
            //获取当前登录用户id
            var uid=result[0].uid;
            //保存session对象中
            req.session.uid=uid;
            res.send({code:1,msg:"登录成功"});
        }
    })
});

//用户注册
server.get("/register",(req,res)=>{
    var u = req.query.uname;
    var p = req.query.upwd;
    var sql1 = "select * from sn_user where uname = ?";
    var sql2 = "INSERT INTO sn_user (uid,uname,upwd,email,phone,user_name,gender) VALUES (NULL,?,?,NULL,NULL,NULL,NULL)";
    pool.query(sql1,[u],(err,result)=>{
        if(err)throw err;
        if(result.length==0){
            pool.query(sql2,[u,p],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:"注册成功"});
                }else{
                    res.send({code:-1,msg:"注册失败"});
                }
            })
        }else{
            res.send({code:-1,msg:"用户名被占用"})
        }
    })
});

//首页轮播图
server.get("/imglist",(req,res)=>{
    var rows=[
        {id:1,img_url:"http://127.0.0.1:3000/img/index/1.jpg"},
        {id:2,img_url:"http://127.0.0.1:3000/img/index/2.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/img/index/3.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/img/index/4.jpg"},
    ];
    res.send({code:1,data:rows});
});

//首页九宫格
server.get("/grid",(req,res)=>{
    var rows=[
        {id:1,title:"超市",img_url:"http://127.0.0.1:3000/img/grid/11.jpg"},
        {id:2,title:"手机",img_url:"http://127.0.0.1:3000/img/grid/22.jpg"},
        {id:3,title:"化妆品",img_url:"http://127.0.0.1:3000/img/grid/33.jpg"},
        {id:4,title:"美食",img_url:"http://127.0.0.1:3000/img/grid/44.jpg"},
        {id:5,title:"服饰",img_url:"http://127.0.0.1:3000/img/grid/55.jpg"},
        {id:6,title:"汽车",img_url:"http://127.0.0.1:3000/img/grid/66.jpg"},
    ];
    res.send(rows);
});

//超市
//1:用户get 请求路径 /getProducts
server.get("/Supermarket",(req,res)=>{
    //1:获取用户参数 pno pageSize
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //res.send(pno+":"+pageSize);
    //2:为参数设置默认值 pno:1 pageSize:4
    if(!pno){pno=1}
    if(!pageSize){pageSize=4}
    //3:创建sql语句
    var sql="SELECT lid,lname,pic,price From sn_supermarket LIMIT ?,?";
    //3.1 计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //4:执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
        //5:获取数据库返回结果并且发送脚手架  {code:1,dat:[]}

    })
});

//超市——用户点击商品列表显示商品详细信息
server.get("/SupermarketInfo",(req,res)=>{
    //1:参数
    var lid=req.query.lid;
    //2:sql
    var sql="SELECT lid,price,title,pic,lname FROM sn_supermarket WHERE lid=?";
    //3:json
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//手机
//1:用户get 请求路径 /getProducts
server.get("/Phone",(req,res)=>{
    //1:获取用户参数 pno pageSize
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //res.send(pno+":"+pageSize);
    //2:为参数设置默认值 pno:1 pageSize:4
    if(!pno){pno=1}
    if(!pageSize){pageSize=4}
    //3:创建sql语句
    var sql="SELECT lid,lname,pic,price From sn_phone LIMIT ?,?";
    //3.1 计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //4:执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
        //5:获取数据库返回结果并且发送脚手架  {code:1,dat:[]}

    })
});

//手机——用户点击商品列表显示商品详细信息
server.get("/PhoneInfo",(req,res)=>{
    //1:参数
    var lid=req.query.lid;
    //2:sql
    var sql="SELECT lid,price,title,pic,lname FROM sn_phone WHERE lid=?";
    //3:json
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//化妆品
//1:用户get 请求路径 /getProducts
server.get("/Cosmetics",(req,res)=>{
    //1:获取用户参数 pno pageSize
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //res.send(pno+":"+pageSize);
    //2:为参数设置默认值 pno:1 pageSize:4
    if(!pno){pno=1}
    if(!pageSize){pageSize=4}
    //3:创建sql语句
    var sql="SELECT lid,lname,pic,price From sn_cosmetics LIMIT ?,?";
    //3.1 计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //4:执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
        //5:获取数据库返回结果并且发送脚手架  {code:1,dat:[]}

    })
});

//化妆品——用户点击商品列表显示商品详细信息
server.get("/CosmeticsInfo",(req,res)=>{
    //1:参数
    var lid=req.query.lid;
    //2:sql
    var sql="SELECT lid,price,title,pic,lname FROM sn_cosmetics WHERE lid=?";
    //3:json
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//美食
//1:用户get 请求路径 /getProducts
server.get("/Delicious",(req,res)=>{
    //1:获取用户参数 pno pageSize
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //res.send(pno+":"+pageSize);
    //2:为参数设置默认值 pno:1 pageSize:4
    if(!pno){pno=1}
    if(!pageSize){pageSize=4}
    //3:创建sql语句
    var sql="SELECT lid,lname,pic,price From sn_delicious LIMIT ?,?";
    //3.1 计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //4:执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
        //5:获取数据库返回结果并且发送脚手架  {code:1,dat:[]}

    })
});

//美食——用户点击商品列表显示商品详细信息
server.get("/DeliciousInfo",(req,res)=>{
    //1:参数
    var lid=req.query.lid;
    //2:sql
    var sql="SELECT lid,price,title,pic,lname FROM sn_delicious WHERE lid=?";
    //3:json
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//服饰
//1:用户get 请求路径 /getProducts
server.get("/Dress",(req,res)=>{
    //1:获取用户参数 pno pageSize
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //res.send(pno+":"+pageSize);
    //2:为参数设置默认值 pno:1 pageSize:4
    if(!pno){pno=1}
    if(!pageSize){pageSize=4}
    //3:创建sql语句
    var sql="SELECT lid,lname,pic,price From sn_dress LIMIT ?,?";
    //3.1 计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //4:执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
        //5:获取数据库返回结果并且发送脚手架  {code:1,dat:[]}

    })
});

//服饰——用户点击商品列表显示商品详细信息
server.get("/DressInfo",(req,res)=>{
    //1:参数
    var lid=req.query.lid;
    //2:sql
    var sql="SELECT lid,price,title,pic,lname FROM sn_dress WHERE lid=?";
    //3:json
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//汽车
//1:用户get 请求路径 /getProducts
server.get("/Car",(req,res)=>{
    //1:获取用户参数 pno pageSize
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //res.send(pno+":"+pageSize);
    //2:为参数设置默认值 pno:1 pageSize:4
    if(!pno){pno=1}
    if(!pageSize){pageSize=4}
    //3:创建sql语句
    var sql="SELECT lid,lname,pic,price From sn_car LIMIT ?,?";
    //3.1 计算开始记录数，几条记录
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //4:执行sql语句
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
        //5:获取数据库返回结果并且发送脚手架  {code:1,dat:[]}

    })
});

//汽车——用户点击商品列表显示商品详细信息
server.get("/CarInfo",(req,res)=>{
    //1:参数
    var lid=req.query.lid;
    //2:sql
    var sql="SELECT lid,price,title,pic,lname FROM sn_car WHERE lid=?";
    //3:json
    pool.query(sql,[lid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//SVIP客户
server.get("/Svip",(req,res)=>{
    //*参数    pno 页码  pageSize 页大小
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    //*默认值   1          7
    if(!pno){pno=1}
    if(!pageSize){pageSize=7}
    var sql="SELECT id,title,ctime,point,img_url From sn_svip LIMIT ?,?";
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    //*json   {code:1,data:[]} 
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//歌曲内容显示
server.get("/SvipInfo",(req,res)=>{
    //1:获取客户参数 nid
    var nid=req.query.nid;
    //2:拦截用户参数
    var reg=/^[0-9]{1,}$/;
    if(!reg.test(nid)){
        res.send({code:-1,msg:"参数格式不争取"});
        return;
    }
    var sql="SELECT id,content,ctime,img_url FROM sn_svip WHERE id=?";
    nid=parseInt(nid);
    //3:{code:1,data:[]}  
    pool.query(sql,[nid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//发表评论
server.post("/addcomment",(req,res)=>{
    //1:获取参数   nid新闻编号    content评论内容
    var nid=req.body.nid;
    var content=req.body.content;
    //2.sql
    //var sql="INSERT INTO tf_comment VALUES(null,?,?,now())";  /每列都添加
    var sql="INSERT INTO sn_comment(id,nid,content,ctime) VALUES(null,?,?,now())";   //指定列添加
    pool.query(sql,[nid,content],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:"添加成功"});
    })
    //3:json
});

//评论列表 
server.get("/getComment",(req,res)=>{
    //1:参数
    var nid=req.query.nid;
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    if(!pno){pno=1;}
    if(!pageSize){pageSize=5;}
    //2:sql
    var sql="SELECT id,nid,content,ctime FROM sn_comment WHERE nid=? LIMIT ?,?";
    var offset=(pno-1)*pageSize;
    pageSize=parseInt(pageSize);
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
    //3:result
});

//查询购物车列表
server.get("/getTfCart",(req,res)=>{
    //拦截没有登录用户
    if(!req.session.uid){
        res.send({code:-1,data:[],msg:"请登录"});
        return;
    }
    //1:参数 uid 用户登录成功保存服务器
    //node.js 程序不是保存脚手架
    //服务器对象 session
    var uid=req.session.uid; //后面替换
    //2:sql
    var sql="SELECT id,pid,price,uid,pname,img_url FROM sn_cart WHERE uid=?";
    //3:json
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,data:result});
    })
});

//删除购物车中某个商品
server.post("/removeItem",(req,res)=>{
    var id=req.body.id;
    var sql="DELETE FROM sn_cart WHERE id=?";
    id=parseInt(id);
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        //执行sql语句影响的行数
        if(result.affectedRows>0){
            res.send({code:1,msg:"删除成功"});
        }else{
            res.send({code:-1,msg:"删除失败"});
        }
    })
})

//删除购物车中多个商品
server.get("/removeMItem",(req,res)=>{
    //1:参数
    var ids=req.query.ids;
    //2:sql
    var sql="DELETE FROM sn_cart WHERE id IN ("+ids+")";
    //3:json
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"成功删除多个商品"});
        }else{
            res.send({code:-1,msg:"删除失败"});
        }
    })
});

//点击添加购物车按钮
server.get("/addcart",(req,res)=>{
    //1:获取参数 uid pid pname price
    var uid=req.session.uid;
    var pid=req.query.pid;
    var price=req.query.price;
    var pname=req.query.pname;
    var img_url=req.query.img_url;
    //2:判断用户是否登录
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    //3:如果当前用户未登录 程序停止 返回出错信息 请登录
    //4:创建sql语句查询当前用户是否添加过此商品
    var sql="SELECT id FROM sn_cart WHERE uid=? AND pid=?";
    pool.query(sql,[uid,pid],(err,result)=>{
        if(err) throw err;
        //回调函数：什么时候执行函数 
        //sql语句执行完毕并且返回结果
        if(result.length==0){
            //5:创建sql语句如果没有查询结果添加此商品
            var sql=`INSERT INTO sn_cart(id,uid,pid,price,pname,img_url,count) VALUES(null,${uid},${pid},${price},'${pname}','${img_url}',1)`;
        }else{
            //6:创建sql语句如果有查询结果更新数量
            var sql=`UPDATE sn_cart SET count=count+1 WHERE uid=${uid} AND pid=${pid}`;
        }
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            res.send({code:1,msg:"添加成功"});
        })
    })
})






