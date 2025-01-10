const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);


function uniqueSurvey(params) {

  return DB.unique("survey", params);
}

function uniqueQuestions(params) {

  return DB.unique("questions", params);
}

function uniqueBranches(params) {

  return DB.unique("question_branches", params);
}

function uniqueAnswer(params) {

  return DB.unique("answer_options", params);
}

function update(body) {

  return DB.update("survey", body);
}


module.exports = {
  uniqueSurvey,
  uniqueQuestions,
  uniqueAnswer,
  update,
  uniqueBranches
};
