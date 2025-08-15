const axios = require('axios');
const isValid =async  (req,res,next)=>{
    try {
        token = req.headers['x-access-token'];
        const response = await axios('http://localhost:3001/api/user/isAuthenticated',{
            headers:{"x-access-token":token}
        })
      
        if(response.data.success==true)
        {
           
            next();
        }
        else
        {
            return res.status(401).json({
                msg:"Unauthorised",              
            })
        }
    } catch (error) {
      
        return res.status(401).json({
           
            msg:"Unauthorised",
            
        })
    }
}
module.exports = isValid;