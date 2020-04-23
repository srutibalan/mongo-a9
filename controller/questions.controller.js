const universityDao = require('../data/daos/university.dao.server');

module.exports = (app) => {

    app.post('/api/questions', async(req,res)=>{
        universityDao.createQuestion(req.body).then(question=>res.send(question));
    })

    app.get('/api/questions', async(req,res)=>{
        universityDao.findAllQuestions().then(questions=>res.send(questions));
    })

    app.get('/api/questions/:id', async(req,res)=>{
        let id = req.params.id;
        universityDao.findQuestionById(id).then(question=>res.send(question));
    })

    app.put('/api/questions/:id', async(req,res)=>{
        universityDao.updateQuestion(req.params.id,req.body).then(status=>res.send(status));
    })

    app.delete('/api/questions/:id', async(req,res)=>{
        universityDao.deleteQuestion(req.params.id).then(status=>res.send(status));
    })

    // app.get()

}