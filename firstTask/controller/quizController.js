var db = require('./../models');
var Quiz = db.quizzes;

var createQuiz = async (req, res) => {
    try {
        const { quizType, groupAssignment, quizPermission } = req.body;

        if (!quizType || !groupAssignment || !quizPermission) {
            return res.status(400).json({ error: 'Please fill in all the details for quiz creation' });
        }

        // Create a new quiz
        await Quiz.create({
            quizType: quizType,
            groupAssignment: groupAssignment,
            quizPermission: quizPermission
        });

        res.json({ message: 'Quiz created successfully' });
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

var getQuiz = async (req, res) => {
    try {
        const { quizType, groupAssignment, quizPermission } = req.body;
        // Create a new user
        const getAllQuiz = await Quiz.findAll();
        if(!getAllQuiz){
            res.send({message:"Couldn't find the quizzes"})
        }
        res.json({ message: 'Quiz Created successfully', data: getAllQuiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

var getSpecificQuiz = async (req, res) => {
    try {
        const Quizid = req.params.Quizid;
        const fetchedQuiz = await Quiz.findOne({where:{ id: Quizid }})
        if (!fetchedQuiz) {
            res.status(402).send({ message: 'Quiz Id either invalid or Not found!' })
        }
        else {
            res.send({ message: "Found", data: fetchedQuiz })
        }
    }
    catch (err) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createQuiz,
    getQuiz,
    getSpecificQuiz
}