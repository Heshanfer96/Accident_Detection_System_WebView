const jwt = require("jsonwebtoken")



const auth = (req, res, next) =>{

    const token = req.headers["x-access-token"];

    if(!token){
        res.send("yooo you need an token, plese give it to us next time")
    }else{
        jwt.verify(token,"jwtSecret",(err,decoded)=>{
            if(err){
                res.json({auth : false , msg : "you fail to authenticate"})
            }else{
                req.userId = decoded.id;
                next()
            }
        })
    }


}

module.exports = auth;