const express = require('express')
const { User } = require('./db/models')
const app = express()
const asyncHandler = require('express-async-handler')
let user = require('./db/models/user')
const cors = require("cors")

app.use(cors({}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




// get all users
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
}))


// post new user when user enter a username
app.post('/user', asyncHandler(async (req, res, next) => {
  try {
    let { username } = req.body
    let winCount = 0
    let lostCount = 0
    user = User.create({ username, winCount, lostCount })

  } catch (error) {
    console.log(error);
    next(error)
  }

}))

//get user by username
app.get('/users/:username', asyncHandler(async (req, res, next) => {
  try {
    username = req.params.username
    const user = await User.findOne({
      where: { username }
    })
    return res.json(user)
  } catch (error) {
    console.log(error);
    next(error)
  }
}))


app.put('/users/:username', asyncHandler(async (req, res, next) => {
  try {
    username = req.params.username
    winCount = req.body.winCount
    lostCount = req.body.lostCount
    let user = await User.findOne({
      where: { username }
    })
    user.update({ username: username, winCount: winCount, lostCount: lostCount })
  } catch (error) {
    console.log(error);
    next(error)
  }
}))


app.post('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
}))

module.exports = app
