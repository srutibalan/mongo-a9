const universityDao = require('../data/daos/university.dao.server');

module.exports = (app) => {
    app.delete('/api/all', async(req,res)=>{
        await universityDao.truncateDatabase();
        return res.send({message: "successful in truncating database"});
    })

    app.post('/api/populate', async(req,res)=>{
        await universityDao.populateDatabase();
        return res.send({status: 200, message: "successful in populating database"});
    })

}
