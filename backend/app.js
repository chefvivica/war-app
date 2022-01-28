const express = require('express')
const { User } = require('./db/models')
const app = express()
const asyncHandler = require('express-async-handler')
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
    let user = User.create({ username, winCount, lostCount })
    return res.json(user)
  } catch (error) {
    next(error)
  }

}))

//get user by username
app.get('/users/:username', asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({
      where: { username }
    })
    return res.json(user)
  } catch (error) {
    next(error)
  }
}))

//when user won, winCount increase by 1 point
app.get('/users/:username/winIncrease', asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({
      where: { username }
    })
    const incrementResult = await user.increment('winCount')
    return res.json(incrementResult)
  } catch (error) {
    next(error)
  }
}))


//when user lost, lostCount increase by 1 point
app.get('/users/:username/lostIncrease', asyncHandler(async (req, res, next) => {
  try {
    const username = req.params.username
    const user = await User.findOne({
      where: { username }
    })
    const incrementResult = await user.increment('lostCount')
    return res.json(incrementResult)
  } catch (error) {
    next(error)
  }
}))




app.post('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll()
  return res.json(users)
}))

module.exports = app
