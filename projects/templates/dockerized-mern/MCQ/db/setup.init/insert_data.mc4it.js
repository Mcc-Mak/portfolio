db.mc4it.insertMany([
    {
        question_id: "1",
        question_desc: "What's your name?",
        answer_A_desc: "John",
        answer_B_desc: "Peter",
        answer_C_desc: "Luke",
        answer_D_desc: "Timothy",
        answer_E_desc: "Matthew",
        expected_answer_id: "A",
    },
    {
        question_id: "2",
        question_desc: "How old are you?",
        answer_A_desc: "below 18",
        answer_B_desc: "18-29",
        answer_C_desc: "30-49",
        answer_D_desc: "50-59",
        answer_E_desc: "above 60",
        expected_answer_id: "C",
    },
])

db.mc4it.find({})
