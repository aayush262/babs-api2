module.exports = {
    getIndexPage: (req,res,next)=>{
        res.json({
            msg: 'login page'
        })
    },
    postLoginPage: (req,res,next)=>{
       const data=req.body
       if(data.username === 'admin' && data.password === 'buddha22070'){
           res.json({
               msg: 'login success'
           })
       }
       else{
           next('Invalid username or password')
       }
    }
}