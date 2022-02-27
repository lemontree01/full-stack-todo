const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = class UserController {
    static async register(req, res, next) {
      try {
          const {login, password} = req.body
          const existingUser = await User.findOne({login})

          if(existingUser) {
              console.log("User already exists")
              return res.status(402).json({
                  message: "User already exists"
              })
          }

          const hashedPassword = await bcrypt.hash(password, 5)
          const user = await User.create({login, password: hashedPassword, todos: []})
          const token = jwt.sign({_id: user._id}, config.get("jwtAccessKey"), {
              expiresIn: "1h"
          })
          return res.status(200).json({
              login, token
          })
      } catch (e) {
          console.log(e)
          return res.status(401).json({
              message: e
          })
      }
    }

    static async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({login})

            if(!user) {
                console.log("User does not exist")
                return res.status(402).json({
                    message: "User does not exist"
                })
            }

            console.log("User password", user.password)
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if(!isPasswordCorrect) {
                console.log("Wrong password")
                return res.status(402).json({
                    message: "Wrong password"
                })
            }

            const token = jwt.sign({_id: user._id}, config.get("jwtAccessKey"), {
                expiresIn: "1h"
            })
            console.log(login, " login successfully")
            return res.status(200).json({
                token, login

            })
        } catch (e) {
            console.log(e)
            return res.status(401).json({
                error: e
            })
        }
    }

    static async auth(req, res) {
       try {
           const {_id} = req.user
           const user = await User.findOne({_id})
           const token = jwt.sign({_id: user._id}, config.get("jwtAccessKey"), {
               expiresIn: "1h"
           })
           return res.status(200).json({
               login: user.login,
               token
           })
       } catch (e) {
           console.log(e)
       }

    }
}