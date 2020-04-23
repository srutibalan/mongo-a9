const universityDao = require('../data/daos/university.dao.server');

module.exports = (app) => {
    app.post('/api/students/:sid/questions/:qid/answers', async(req,res)=>{
        universityDao.answerQuestion(req.params.sid,req.params.qid,req.body.answer).then(answer=>res.send(answer));
    })

    app.get('/api/students/:sid/questions/:qid/answers', async(req,res)=>{
        universityDao.findAnswersByStudentForQuestion(req.params.sid,req.params.qid).then(answer=>res.send(answer));
    })

    app.get('/api/questions/:qid/students/:sid/answers', async(req,res)=>{
        universityDao.findAnswersByStudentForQuestion(req.params.sid,req.params.qid).then(answer=>res.send(answer));
    })

    app.get('/api/answers', async(req,res)=>{
        universityDao.findAllAnswers().then(answers=>res.send(answers));
    })


}
