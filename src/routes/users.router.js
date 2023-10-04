import { Router } from "express";
import {userMongo} from '../managers/users/usersMongo.js';
import {hashData} from '../utils.js';
import passport from "passport";

const router = new Router();

router.post('/singup',async (req, res) => {
    const {first_name,last_name,username,password} = req.body
    if(!first_name || !last_name || !username || !password){
        return res.status(400).json({message:'Some data is missing'})
    }
    const userDB = await userMongo.findUser(username)
    if(userDB){
        return res.status(400).json({message:'User already used'})
    }
    const hashPassword = await hashData(password)
    const newUser = await userMongo.createUser({...req.body,password:hashPassword})
    res.status(200).json({message:'User created',user:newUser})
    //res.redirect('http://localhost:8080/api/views/clientHome')
})

router.get('/home',async (req, res) => {
        const {username} = req.session
        console.log(username)
        const userDB = await userMongo.findUser(username)
        console.log(userDB)
        if(userDB.isAdmin){
            res.redirect('/api/views/adminHome')
        }else{
            res.redirect('/api/views/clientHome')
        }
})

router.get('/githubSignup',passport.authenticate('github',{scope: ['user:email']}))

router.get('/github',passport.authenticate('github',{failureRedirect:'/api/views/singup'}),(req,res)=>{
    console.log(req)
    //esto es como trate de correjir el erro pero no estaria funcionando, sospecho que algo me falta y no se muy bien que.
    req.session['username'] = req.user.username
    res.redirect('/home')
})



export default router