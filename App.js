import express from"express"
const app= express();
import mysql from"mysql"
import cors from"cors"
import bodyparser from "body-parser";

import cookieparser from "cookie-parser";
app.use(cookieparser());
app.use(express.json());
app.use(bodyparser.json());



app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(bodyparser.urlencoded({extened:true}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dongho"
})

// Code resigter
app.post("/resigter",function(req,res){
    db.connect((err)=>{
        const values =[
            req.body.email,
            req.body.password,
            req.body.phone,
            req.body.name,
        ]
        const sql = "INSERT INTO khachhang (email,matkhau,sdt,tenkh) values(?)"
   
    db.query(sql,[values],function(err,data){
        if(err){
            return res.json({Status:"Registration failed"})
        }else{
            return res.json(data)
        }
    })
})
})
// end resigter

// product
app.get("/product",(req,res)=>{
    db.connect((err)=>{
        const sql ="SELECT * FROM sanpham"
    db.query(sql,(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
    })

})
// end product
// chitietsp
app.get("/product/:id",(req,res)=>{
    db.connect((err)=>{
        const sql ="SELECT * FROM sanpham where masp=?"
    db.query(sql,[req.params.id],(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
    })

})
// end chitiet
// qlp
app.get("/qlp",(req,res)=>{
    db.connect((err)=>{
        const sql ="SELECT * FROM sanpham"
    db.query(sql,(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
    })

})
//end qlp
// delete p
app.get("/delete/:id",(req,res)=>{
    db.connect((err)=>{
        const sql= "DELETE from sanpham where masp=?"
    db.query(sql,[req.params.id],(err,data)=>{
        if(err){
            return res.json(err);
        }else{
            return res.json(data);
        }
    })
    })
})

// end delete p


app.listen(4000,()=>{
    console.log("Sever running ")
})