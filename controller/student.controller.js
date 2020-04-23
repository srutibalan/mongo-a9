const universityDao = require('../data/daos/university.dao.server');

module.exports = (app) => {

    app.post('/api/students', async(req,res)=>{
        let newStudent = req.body;
        console.log(req.body);
        universityDao.createStudent(newStudent).then(actualUser => res.send(actualUser));
    })

    app.get('/api/students', async(req,res)=>{
        universityDao.findAllStudents().then(students=>res.send(students));
    })

    app.get('/api/students/:id', async(req,res)=>{
        let id = req.params.id;
        universityDao.findStudentById(id).then(student=>res.send(student));
    })

    app.put('/api/students/:id', async(req,res)=>{
        universityDao.updateStudent(req.params.id,req.body).then(status=>res.send(status));
    })


    app.delete('/api/students/:id', async(req,res)=>{
        universityDao.deleteStudent(req.params.id).then(status=>res.send(status));
    })



}