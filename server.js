const express =  require('express');
const mongoose = require('mongoose');
require('./data/db');
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

require('./controller/database.controller')(app);
require('./controller/student.controller')(app);
require('./controller/questions.controller')(app);
require('./controller/answer.controller')(app);

app.listen(process.env.PORT || 8080 , () => console.log(`Server has started`));
