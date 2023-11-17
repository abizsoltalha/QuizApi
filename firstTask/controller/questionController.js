var db = require('../models');
var Question = db.questions

var getQuestion = async (req, res) => {
    try {
        var fecthedQuestions = await Question.findAll();
        if (!fecthedQuestions) {
            res.send({ message: "Couldn't find the question" })
        }
        res.json({ message: 'Quiz Created successfully', data: fecthedQuestions });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};

var getSpecificQuestion = async (req, res) => {
    try {
        const QuestionId = req.params.Qestionid;
        const fetchedQuestion = await Quiz.findOne({ where: { id: QuestionId } })
        if (!fetchedQuestion) {
            res.status(402).send({ message: 'Quiz Id either invalid or Not found!' })
        }
        else {
            res.send({ message: "Found", data: fetchedQuestion })
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

var createQuestion = async (req, res) => {
    try {
        const { title, questionType, answer, optionType, options, quizId } = req.body;

        if (!title || !questionType || !answer || !optionType || !options) {
            return res.status(400).json({ error: 'Please fill in all the details for question creation' });
        }

        // Create a new question
        await Question.create({
            title: title,
            questionType: questionType,
            answer: answer,
            optionType: optionType,
            options: options,
            quizId: quizId
        });

        res.json({ message: 'Question created successfully' });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

var deleteQuestion=async (req,res)=>{
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(401).json({ error: 'Please write a valid Question!' });
        }
        const findQuestion = await User.findOne({ where: { id: id } });

        if (!findQuestion) {
            return res.status(401).json({ error: 'Question not found!' });
        }
        
        await findQuestion.destroy();
        return res.json({ message: 'Question deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting question:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getQuestion,
    createQuestion,
    getSpecificQuestion,
    deleteQuestion
}