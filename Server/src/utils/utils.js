import jwt from "jsonwebtoken"

export const generateToken = function(jdp_id,res){

    const token = jwt.sign({jdp_id}, process.env.JWT_SECRET,{
        expiresIn : "1d"
    })
    res.cookie("jdp_token",token,{
        maxAge : 24 * 60 * 60 * 1000,
        httponly : true,
        sameSite: "strict",
        secure : process.env.SECURE_MODE
    })

    return token
}