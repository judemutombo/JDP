import  jwt  from "jsonwebtoken"
import connection from "../utils/db.mysql.js"

export const protectRoutes = async (req,res,next) =>{

    try{
        const token = req.cookies.jdp_token
        if(!token){
            return res.status(401).json({message: "Unauthorized - Sign in first"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Bypass"})
        }
        const [results] = await connection.execute(
            "SELECT name, surname, username, mail, user_id FROM players WHERE user_id=?",
            [decoded.jdp_id]
        )

        if(results.length != 1){
            return res.status(404).json({message: "Unauthorized - User not found"})
        }
        req.user = results[0]
        next()
    }catch(error){

        return res.status(500).json({message: "Error, please try again"})
    }
    
}