const express = require('express')
const {User} = require('./db/models')
const app = express()
const port = 8080
const asyncHandler = require('express-async-handler')
let user = require('./db/models/user')
const cors = require("cors")

app.use(cors({}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})


// get all users
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll()
    return res.json(users)
  })
)


// post new user when user enter a username
app.post('/user', asyncHandler(async (req, res, next) => {
    try {
      let {username} = req.body
      let winCount = 0
      let lostCount = 0
      user = User.create({ username, winCount, lostCount} )

    } catch (error) {
      console.log(error);
      next(error)
    }

  })



)
