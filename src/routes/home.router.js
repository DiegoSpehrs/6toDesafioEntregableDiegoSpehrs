import { Router } from "express";
import { userMongo } from "../managers/users/usersMongo.js";

const router = Router()


router.get('/', async (req, res) => {
    const user = await userMongo.findUser(req.session.username)
    const newUser = {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
    }
    res.render('clientHome',{user: newUser})
})





export default router