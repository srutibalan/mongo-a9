require('./data/db');
let assert = require('assert');

const universityDao = require('./data/daos/university.dao.server');

testAllOperations();

//test();


function testAllOperations() {
    truncateDatabase().then(function () {
        // console.log("Successfully truncated data");

        //Calling populate database
        return populateDatabase();
    }, function (err) {
        console.log("Error in truncating data :" + err);
    })
        .then(function () {

           // console.log("Success in populating");
        }, function (err) {
           // console.log("Error in inserting documents :" + err);
        })

}

function truncateDatabase() {
    return universityDao.truncateDatabase();
}

function populateDatabase() {
    return universityDao.populateDatabase();
}

