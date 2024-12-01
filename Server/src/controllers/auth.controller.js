import bcrypt from "bcrypt"
import connection from "../utils/db.mysql.js";
import { generateToken } from "../utils/utils.js";


export const signup =  async (req, res) => { 
    const {name, surname, username, mail, password} = req.body

    try{
        if(!name.trim() || !surname.trim() ||!username.trim() ||!mail.trim() ||!password.trim()){
            return res.status(400).json({message : "All fields are required."});
        }
        if(password.length < 6 ){
            return res.status(400).json({message : "Password must be at least 6  characters."});
        }
        connection.query({
            sql: 'SELECT * FROM users WHERE username=?',
            timeout: 40000, // 40s
            values: [username]
          }, async function (error, results, fields) {
            if (error){
                res.status(500).json({message : "Cannot create the account, please try again."});
                throw error;
            }
            if(results.length >= 1){
                return res.status(400).json({message : "Username already used, choose anothe one."});
            }

            const salt = await bcrypt.genSalt(10)
            const hashedp = await bcrypt.hash(password, salt)
            const _jdp_id = generate_id()
            connection.query({
                sql: 'INSERT INTO users(name,surname,username,mail,password,user_id) VALUES(?,?,?,?,?,?)',
                timeout: 40000, // 40s
                values: [name, surname, username, mail, hashedp,_jdp_id]
              }, async function (error, results, fields) {
                    if (error){
                        res.status(500).json({message : "Cannot create the account, please try again."});
                        throw error;
                    }
                    if(results.affectedRows == 1){
                        generateToken(_jdp_id,res)
                        res.status(201).json({
                            name : name,
                            surname : surname,
                            username : username,
                            mail : mail,
                            id : _jdp_id
                        })
                    }else{
                        res.status(500).json({message : "Cannot create the account, please try again."});
                    }
              })
          });
    }catch(error){
        res.status(500).json({message : "Cannot create the account, please try again."});
    }
    
};

export const signin = async (req, res) => { 
    const {username, password} = req.body
    try{
        connection.query({
            sql: 'SELECT * FROM users WHERE username=? or mail=?',
            timeout: 40000, // 40s
            values: [username, username]
        }, async function (error, results, fields) {
            if (error){
                res.status(500).json({message : "error, please try again."});
                throw error;
            }
            if(results.length <= 0){
                return res.status(400).json({message : "No user found."});
            }
            const sameP = await bcrypt.compare(password, results[0].password)
            if(!sameP){
                return res.status(400).json({message : "Wrong password."});
            }
            generateToken(results[0].user_id, res)

            res.status(200).json({ 
                name : results[0].name,
                surname : results[0].surname,
                username : results[0].username,
                mail : results[0].mail,
                id : results[0]._jdp_id});

        })
    }catch(error){
        res.status(500).json({message : "error, please try again."});
        throw error;
    }

}

export const logout = async (req, res) => {   
    try{
        res.cookie("jdp_token", "", {maxAge:0})
        res.status(200).json({message : "Bye."});
    }catch(error){
        res.status(500).json({message : "error, please try again."});
        throw error;
    }
}

export const checkAuth = async (req, res) => {  
      
    res.status(200).send(req.user)
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function generate_id(){
    var aleatoire = 0;
    var dec=65; 
    var de = [];
    for (let index = 0; index < 15; index++) {
        aleatoire = Math.floor(Math.random() * 35);
        if(aleatoire >=26){
            aleatoire =35 - aleatoire;
            switch (aleatoire)
            {
                case 0:
                    de[index]='0';
                case 1:
                    de[index]='1';
                    break;
                case 2:
                    de[index]='2';
                    break;
                case 3:
                    de[index]='3';
                    break;
                case 4:
                    de[index]='4';
                    break;
                case 5:
                    de[index]='5';
                    break;
                case 6:
                    de[index]='6';
                    break;
                case 7:
                    de[index]='7';
                    break;
                case 8:
                    de[index]='8';
                    break;
                case 9:
                    de[index]='9';
                    break;
            }
        }else{
            for (let j=0; j < aleatoire; j++) { 
                dec= ++dec;
            }
            de[index] = String.fromCharCode(dec);
        }
        dec=65;  
    }

    const id = de.join('')
    let exists = false
    do {
        exists = false
        connection.query({
            sql: 'SELECT * FROM users WHERE user_id=?',
            timeout: 40000, // 40s
            values: [id]
          }, async function (error, results, fields) {
                if (error) throw error;
                if(results.length >= 1) exists = true
          })
    } while (exists);

    return id
}