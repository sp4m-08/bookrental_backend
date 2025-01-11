import express from "express"
import bodyParser from "body-parser"
import cors from "cors" //allow cross origin requests
import db from "../db.js"
import bcrypt from "bcryptjs"


const authRouter = express.Router();




authRouter.use(cors());
authRouter.use(bodyParser.json());


//login

authRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    try{
        const result = await db.one('SELECT * FROM users WHERE email =$1',[email]);
        const user = result.rows[0];
        console.log(user);

        if(user){
            const match =await bcrypt.compare(password, user.password);
            if(match){
                return res.status(200).json({message:'Login Succesful',email});
            }else{
                return res.status(401).json({error:'invalid password'});
            }
        }else{
            return res.status(404).json({error:'internal server error'});
        }

        
    }catch(err){
        console.error(err);
        res.status(500).json({error:'internal server error'});
    }
});

//signup
const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

authRouter.post('/signup',async(req,res)=>{
    const {email, password,confirmPassword} = req.body;
    console.log("example");
    
    if(!isValidGmail(email)){   
        return res.status(400).json({error: 'Invalid email! Please enter Correct Email ID'});
    }

    if(password!==confirmPassword){
        return res.status(400).json({error: 'Passwords do not match'});
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.one('INSERT INTO users (email,password) VALUES ($1,$2)',[email,hashedPassword]);
        res.status(201).json({message:'user registered successfully!'});

    }catch(err){
        console.error(err);
        if (err.code === '23505') {
            res.status(400).json({ error: 'Email already exists' });
          } else {
            res.status(500).json({ error: 'Internal server error' });
          }
    }


});

export default authRouter;


