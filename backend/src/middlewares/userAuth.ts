import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

interface JwtType extends JwtPayload{
    userId:string  
}

export default function userAuth(req:any, res:any, next:any){
    const pretoken = req.headers.authorization;

    if(!pretoken){
        return res.status(401).json({message:"No token found"})
    }

    const token = pretoken.split(" ")[1]

    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtType

    if(!decodedToken.userId){
        res.status(401).json({message:"Token not valid"})
    }else{
        req.userId = decodedToken.userId
        next()
    }
}
