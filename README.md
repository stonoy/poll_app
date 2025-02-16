#Poll Schema
    - Poll_Schema = {
        question: String,
        options: [
            {
                option: String,
                count: Number
            }
        ]
    }

#Api EndPoints
    - create a poll (POST) : path -> "/api/v1/createpoll" , json body -> {question, option1, option2, option3, option4}
    - get polls (GET) : path -> "/api/v1/getpolls"
    - vote (PATCH) : path -> "/api/v1/voteapoll/:pollId", json body -> {selectedOptionId}