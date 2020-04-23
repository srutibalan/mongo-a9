const studentModel = require('../models/student.model.server');
const questionModel = require('../models/question.model.server');
const answerModel = require('../models/answer.model.server');

function truncateDatabase() {

    //console.log("Inside truncate db");

    //deleteAllAnswers();
    //deleteAllQuestions();
    //deleteAllStudents();
    return deleteAllAnswers().then(function () {
        return deleteAllQuestions();
    }).then(function () {
        return deleteAllStudents();
    });

}

function populateDatabase() {

    //Create students, questions and answers
    //Create students, questions and answers
    console.log("Inside populate db")
    return createStudent({
                             _id: 123,
                             username: "alice",
                             password: "alice",
                             firstName: "Alice",
                             lastName: "Wonderland",
                             gradYear: 2020,
                             scholarship: 15000
                         }).then(
        function (res) {
            return createStudent({
                                     _id: 234,
                                     username: "bob",
                                     password: "bob",
                                     firstName: "Bob",
                                     lastName: "Hope",
                                     gradYear: 2021,
                                     scholarship: 12000
                                 });
        }
    ).then(function (res) {
        console.log("Inside create question");
        return createQuestion({
                                  _id: 321,
                                  question: "Is the following schema valid?",
                                  points: 10,
                                  questionType: 'TRUE_FALSE',
                                  trueFalse: {
                                      isTrue: false
                                  }
                              })

    }).then(function (res) {
        console.log("Question 1 created");
        return createQuestion({
                                  _id: 432,
                                  question: "DAO stands for Dynamic Access Object.",
                                  points: 10,
                                  questionType: 'TRUE_FALSE',
                                  trueFalse: {
                                      isTrue: false
                                  }
                              })

    }).then(function (res) {
        return createQuestion({
                                  _id: 543,
                                  question: "What does JPA stand for?",
                                  points: 10,
                                  questionType: 'MULTIPLE_CHOICE',
                                  multipleChoice: {
                                      choices: "Java Persistence API,Java Persisted Application,JavaScript "
                                               + "Persistence API,JSON Persistent Associations",
                                      correct: 1
                                  },
                              })

    }).then(function (res) {
        return createQuestion({
                                  _id: 654,
                                  question: "What does ORM stand for?",
                                  points: 10,
                                  questionType: 'MULTIPLE_CHOICE',
                                  multipleChoice: {
                                      choices: "Object Relational Model,Object Relative Markup,Object "
                                               + "Reflexive Model,Object Relational Mapping",
                                      correct: 4
                                  },
                              })

    }).then(function (res) {
        return answerQuestion({
                                  _id: 123,
                                  trueFalseAnswer: true,
                                  student: 123,
                                  question: 321
                              })

    }).then(function (res) {
        return answerQuestion({
                                  _id: 234,
                                  trueFalseAnswer: false,
                                  student: 123,
                                  question: 432
                              })

    }).then(function (res) {
        return answerQuestion({
                                  _id: 345,
                                  multipleChoiceAnswer: 1,
                                  student: 123,
                                  question: 543
                              })

    }).then(function (res) {
        return answerQuestion({
                                  _id: 456,
                                  multipleChoiceAnswer: 2,
                                  student: 123,
                                  question: 654
                              })

    }).then(function (res) {
        return answerQuestion({
                                  _id: 567,
                                  trueFalseAnswer: false,
                                  student: 234,
                                  question: 321
                              })
    }).then(function (res) {
        return answerQuestion({
                                  _id: 678,
                                  trueFalseAnswer: true,
                                  student: 234,
                                  question: 432
                              })

    }).then(function (res) {
        return answerQuestion({
                                  _id: 789,
                                  multipleChoiceAnswer: 3,
                                  student: 234,
                                  question: 543
                              })
    }).then(function () {
        return answerQuestion({
                                  _id: 890,
                                  multipleChoiceAnswer: 4,
                                  student: 234,
                                  question: 654
                              })

    });
}

//Create a student using student model
createStudent = (studentArray) => {
    return studentModel.create(studentArray)
};

deleteStudent = (id) => studentModel.deleteOne({_id: id});

createQuestion = (question) => questionModel.create(question);

deleteQuestion = (id) => questionModel.deleteOne({_id: id});

answerQuestion=async(studentId, questionId, answer)=>{

    try{

        if(typeof answer === "boolean"){
            return await answerModel.create({
                                                '_id': Date.now(),
                                                'trueFalseAnswer': answer,
                                                'student': studentId,
                                                'question': questionId
                                            })
        }else{
            return await answerModel.create({
                                                '_id': Date.now(),
                                                'multipleChoiceAnswer': answer,
                                                'student': studentId,
                                                'question': questionId
                                            })
        }

    } catch(e){
        return e;
    }
};

deleteAnswer = id => answerModel.deleteOne({_id: id});

findAllStudents = () => studentModel.find();

findStudentById = (id) => studentModel.findById(id);

findAllQuestions = () => questionModel.find();

findQuestionById = (id) => questionModel.findById(id);

findAllAnswers = () => answerModel.find();

findAnswerById = (id) => answerModel.findById(id);

findAnswersByStudent = (studentId) => answerModel.find({student: studentId});

findAnswersByStudentForQuestion=async(studentId, questionId)=>{
    return await answerModel.find({student:studentId,question:questionId});
}


findAnswersByQuestion = (questionId) => answerModel.find({question: questionId});

findStudentByUsername = (userName) => studentModel.find({username: userName});

deleteAllStudents = () => studentModel.deleteMany({}, function () {
});

deleteAllQuestions = () => questionModel.deleteMany({}, function () {
});

deleteAllAnswers = () => answerModel.deleteMany({}, function () {
});

deleteAnswerByStudentAndQuestion = (studentId, questionId) =>
    answerModel.deleteMany({
                               student: studentId,
                               question: questionId
                           })

deleteAnswerByQuestion = (questionId) => answerModel.deleteMany({question: questionId});

deleteAnswerByStudent = (studentId) => answerModel.deleteMany({student: studentId});

updateStudent=async(studentId, student)=>{
    return await studentModel.updateOne({_id:studentId},{$set:student})
}

updateQuestion=async(id, question)=>{
    return await questionModel.updateOne({_id:id},{$set:question})
}

findStudentsCount = () => studentModel.countDocuments({});

findQuestionsCount = () => questionModel.countDocuments({});

findAnswersCount = () => answerModel.countDocuments({});

module.exports = {
    truncateDatabase,
    populateDatabase,
    findAllStudents,
    findAllQuestions,
    findAllAnswers,
    deleteAnswerByStudentAndQuestion,
    findAnswersByStudent,
    deleteQuestion,
    deleteStudent,
    findStudentsCount,
    findQuestionsCount,
    findAnswersCount,
    deleteAnswerByQuestion,
    deleteAnswerByStudent,
    createStudent,
    findStudentById,
    createQuestion,
    findQuestionById,
    findAnswersByStudentForQuestion,
    answerQuestion,
    updateStudent,
    updateQuestion
}
