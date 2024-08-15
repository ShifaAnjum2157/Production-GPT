import express from 'express';
import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username)
            return res.send({ message: 'Name is required' })
        if (!email)
            return res.send({ message: 'Email is required' })
        if (!password)
            return res.send({ message: 'Password is required' })
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'Already registerd please login',
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ username, email, password: hashedPassword }).save();
        res.status(201).send(
            {
                success: true,
                message: 'User registered successfully',
                user
            }
        )

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Ivalid Email or password',
            })
        }
        const user = await userModel.findOne({ email })
        if (!user)
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        res.status(200).send({
            success: true,
            messsage: "Login Successful",
            user: {
                username: user.username,
                email: user.email,
            }
        })
    }
    catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

