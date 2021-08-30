// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()
server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error getting users',
            err: err.message,
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user){
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        }
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error getting user',
            err: err.message,
        })
    })
})

server.post('/api/users', (req, res) => {
    const user =req.body
    if(!user.name || !user.bio){
        res.status(400).json({
            message: 'Please provide name and bio for the user'
        })
    }else{
    User.insert(user)
    .then(newUser => {
        res.status(201).json(newUser)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error creating user',
            err: err.message,
        })
    })
    }
})

server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
    .then(user => {
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({
                message: "The user with the specified ID does not exist" })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The user could not be removed",
            err: err.message,
        })
    })
})

server.put('/api/user/:id', async (req, res) => {
    const { id } = req.params
    const changes = req.body
    console.log(id, changes)
    
    .then(user => {
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({
                message: "The user with the specified ID does not exist" })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The user information could not be modified",
            err: err.message,
        })
    })
})
server.use('*', (req, res) => {
    res.status(404).json({message: 'not found'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
