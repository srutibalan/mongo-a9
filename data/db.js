const mongoose = require('mongoose', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/white-board')
    .then(() => {
       // console.log('Database connection successful')
    })
    .catch(err => {
       // console.error('Database connection error')
    });

