const express = require("express")
const {createPoll,getPolls,voteAPoll} = require("../controllers/poll")
const pollRoutes = express.Router()

pollRoutes.post("/createpoll", createPoll)
pollRoutes.get("/getpolls", getPolls)
pollRoutes.patch("/voteapoll/:pollId", voteAPoll)

module.exports = pollRoutes