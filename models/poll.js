const mongoose = require("mongoose")

const Poll_Options = new mongoose.Schema({
    option: {
        type: String,
        minLength: [1, "min length of a option is 1"],
        maxLength: [150, "max length of a option is 150"],
        required: true,
        trim: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    }
}, {timestamps: true})

const PollSchema = new mongoose.Schema({
    question: {
        type: String,
        minLength: [5, "min length of a question is 5"],
        maxLength: [150, "max length of a question is 150"],
        required: true,
        trim: true,
    },
    options: [Poll_Options]
}, {timestamps: true})

const Poll = mongoose.model("Poll", PollSchema)

module.exports = Poll