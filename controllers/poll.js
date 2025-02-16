const createError = require("../error")
const Poll = require("../models/poll")


const createPoll = async(req,res) => {
    const {question, option1, option2, option3, option4} = req.body

    if (!option1 || !option2 || !option3 || !option4 ){
        createError("invalid options", 400)
        return
    }

    const newPoll = Poll({
        question,
        options: [{option:option1},{option:option2},{option:option3},{option:option4}]
    })

    await newPoll.save()

    res.status(201).json("poll created")
}

const getPolls = async(req,res) => {
    const polls = await Poll.find({})

    res.status(200).json({polls})
}

const voteAPoll = async(req,res) => {
    const {pollId} = req.params
    const {selectedOptionId} = req.body

    const updatedPoll = await Poll.findOneAndUpdate(
        { _id: pollId, "options._id": selectedOptionId }, 
        { $inc: { "options.$.count": 1 } },
        { new: true } 
    );

    if (!updatedPoll) {
        createError("Poll or Option not found!", 400);
        return;
    }

    res.status(200).json({updatedPoll})
}

module.exports = {createPoll,getPolls,voteAPoll}