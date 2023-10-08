const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const {db} = require("../connection")



const addUsers = async (req, res) => {
    console.log(req.body)
    const {userName,passWord,email} = req.body;

    bcrypt.hash(passWord , 10, (err,hash) => {

        if(err){
            console.log(err)
        }else{

            db.query(`select * from users where name = ? `,userName,(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    if(result.length > 0){
                        res.send({msg : `there is an same username as ${userName} plese use and other name for register`})
                    }else{
                        db.query(`insert into users (name, email, password) values (?,?,?)`,[userName,email,hash],(err,result)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log(result)
                            }
                        })
                    }
                }
            })
           
        }
      
    })

}


const loginUser = async (req, res) => {
    console.log(req.body)
    const {loginName,loginPassword} = req.body;

    db.query(`select * from users where name = ? `,[loginName],(err,result)=>{
        console.log(result)
        if(err){
            res.send({err:err})
        }
        if(result?.length > 0){
            bcrypt.compare(loginPassword,result[0].password ,(error,response)=>{
                req.session.user = result
                console.log(req.session.user)

                if(response){
                    const id = result[0].id
                    const token = jwt.sign({id}, "jwtSecret",{expiresIn : 300,}) 

                    req.session.user = result
                    console.log(req.session.user)

                    res.json({auth : true , token : token , result : result})
                }else{
                    res.send({msg : "worng user name password combination"})
                    
                }
            })
        }else{
            res.send({msg : "user name dosn't exist"})
        }
    })

}

const authtest = async (req,res)=>{
    res.send("authentication done successfully")
}

module.exports = {
    
    addUsers,
    loginUser,
    authtest,

}
