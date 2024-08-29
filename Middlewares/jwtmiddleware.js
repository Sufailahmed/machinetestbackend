
const jwt=require('jsonwebtoken')


const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt middleware");
const token=req.headers['authorization'].split(' ')[1];
console.log(token);
try{
    const jwtResponse=jwt.verify(token,'supersecretkey1234567')
    console.log(jwtResponse);
    req.payload=jwtResponse.userId
    next()
}catch(err){
    res.status(401).json("Authorization failed ,Plese Login")
}

}
module.exports=jwtMiddleware;


















