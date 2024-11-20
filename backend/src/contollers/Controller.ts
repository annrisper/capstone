import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { clearScreenDown } from 'readline';

const prisma = new PrismaClient();


export const register = async (req: Request, res: Response) => {
    try {
        const { id, username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10)

        const userInfo = await prisma.userInfo.create({
            data: {
                id,
                username,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: 'User registered successfully', userInfo });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;


const user = await prisma.userInfo.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return
        }
        // Token will be generated when user logs in
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET!, {expiresIn:"1h"});
        res.cookie('token', token,{
            httpOnly:true,
            expires:new Date(Date.now() + 1000 *300),
            sameSite:'lax',
            secure:process.env.NODE_ENV ==='production',
        });

        
        res.status(200).json({ message: "Login successful", user: { email: user.email } ,token});
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error logging in" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.userInfo.findMany();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };


export const deleteUser = async(req:Request, res:Response) =>{
    const {id} =req.params;

    try{
        await prisma.userInfo.delete({where: {id:Number(id)}})
        res.json({message:"User deleted successfully"})
    }catch(error:any){
        if(error.code === "p2025"){
            res.status(404).json({message:"User not found"});
        }else{
            res.status(500).json({message:"Error deleting user", error});
        }
    }
}

