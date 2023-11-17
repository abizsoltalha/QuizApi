const express = require('express');
const app = express();
const port = 3000;
require('./models');
const users = require('./controller/userController');
const quiz = require('./controller/quizController');
const question= require('./controller/questionController');
app.use(express.json());
const { _, auth } = require('./middleware/middlewares');


app.get('/', (req, res) => {
    res.send('hello i am running')
})

app.post('/signup', users.addUser);

app.post('/login', auth,users.login);

app.get('/create-quiz',auth,quiz.getQuiz)

app.post('/create-quiz',auth ,quiz.createQuiz);

app.get('/quiz/:Quizid',auth,quiz.getSpecificQuiz);

app.get('/question',auth,question.getQuestion);

app.get('/question/:Qestionid',auth,question.getSpecificQuestion);

app.post('/question/create-question',auth,question.createQuestion);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))