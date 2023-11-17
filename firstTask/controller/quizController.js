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
        if (!getAllQuiz) {
            res.send({ message: "Couldn't find the quizzes" })
        }
        res.json({ message: 'Quiz Created successfully', data: getAllQuiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

var getSpecificQuiz = async (req, res) => {
    try {
        const Quizid = req.params.Quizid;
        const fetchedQuiz = await Quiz.findOne({ where: { id: Quizid } })
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

var updateQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const { updatedQuizType } = req.body;
        if (!id) {
            return res.status(401).json({ error: 'Please write a valid Quiz Id!' });
        }
        const findQuiz = await Quiz.findOne({ where: { id: id } });

        if (!findQuiz) {
            return res.status(401).json({ error: 'Quiz not found!' });
        }

        await findQuiz.update({ quizType: updatedQuizType }, {
            where: {
                id: id
            }
        });
        return res.json({ message: 'Quiz updated successfully' });
    }
    catch (error) {
        console.error('Error updating quiz:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

var deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(401).json({ error: 'Please write a valid Quiz Id!' });
        }
        const findQuiz = await Quiz.findOne({ where: { id: id } });

        if (!findQuiz) {
            return res.status(401).json({ error: 'Quiz not found!' });
        }

        await findQuiz.destroy();
        return res.json({ message: 'Quiz deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting quiz:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createQuiz,
    getQuiz,
    getSpecificQuiz,
    deleteQuiz,
    updateQuiz
}