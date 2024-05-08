import express from "express";
const router = express.Router()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';
import z, { any } from 'zod'
import * as argon2 from "argon2";
import { JWT_SECRET } from "../config";
import userAuth from "../middlewares/userAuth";

//Zod Validation (for User object)
const userSchema = z.object({
    firstName: z.string().max(50, {message:'is very loooooong'}).optional(),
    lastName: z.string().max(50, {message:'is very loooooong'}).optional(),
    username: z.string().email({ message: 'must be a valid email' }),
    password: z.string().min(8, { message: 'is Too short' }),
})

//signup endpoint
router.post("/signup", async(req, res) => {
    const parsedData = userSchema.safeParse(req.body);

    if (!parsedData.success){
        res.status(400).json({error:parsedData.error})
    }

    //Argon2 for password hashing instead of bycrypt
    const hashedPass = await argon2.hash(req.body.password);

    try{
    const user = await prisma.user.create({
        data: {
            email: req.body.username,
            password:hashedPass,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        }
    })
    const userId = user.id
    // signing the userId with Json Web Token and returning it
    const jwttoken = jwt.sign({userId}, JWT_SECRET)

    res.json({
        msg:"User Created Successfully",
        token:jwttoken
    })
}catch(error){
    console.log(error)
    res.status(400).json({
        msg:"Unable to create user",
        error:error
    })
}
})

//signin endpoint
router.post("/signin" ,async (req, res) => {
    const parsed = userSchema.safeParse(req.body)
    console.log(parsed)
    if(!parsed.success){
        res.status(400).json({
            error:parsed.error
        })
    }
    console.log(req.body.username)

    try{
    const user = await prisma.user.findUnique({
        where:{
            email:req.body.username
        }
    })
    console.log(user)
    if (user){
        try {
            if (await argon2.verify(user.password, req.body.password)) {
                const jwttoken = jwt.sign({userId:user.id},JWT_SECRET )
                res.json({
                    token:jwttoken
                })
                
            } else {
                res.json({
                    msg:"Invalid Password"
                })
            }
          } catch (err) {
            res.json({
                msg:"Invalid Password",
                err:err
            })
          }
}
}catch(error){
    console.log(error)
    res.json({
        msg:"User not found",
        error:error
    })
}
    
})

//insert todo endpoint
router.post("/add-todo",userAuth, async(req:any , res) => {

    const userId = req.userId
    try{
        const todo = await prisma.todos.create({
            data:{
                userId,
                title:req.body.title,
                description:req.body.description
            }
        })

        console.log(todo)
        res.json({
            msg:"Todo Added Successfully",
            todo:todo
        })
        
    }catch(err){
        res.json({
            msg:"Unable to add Todo",
            error:err
        })
    }
})

//get all todos endpoint with user info (join used)
router.get("/mytodos", userAuth, async(req:any , res)=>{
    const userId = req.userId
    try{
        const gettodoswithinfo = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                firstName:true,
                lastName:true,
                todos:true
            }
        })
        if(gettodoswithinfo){
            res.json({
                firstName:gettodoswithinfo.firstName,
                lastName:gettodoswithinfo.lastName,
                todo:gettodoswithinfo.todos
            })
        }
    }catch(err){
        res.status(400).json({
            msg:"Something went Wrong",
            error:err
        })
    }

})



export default router