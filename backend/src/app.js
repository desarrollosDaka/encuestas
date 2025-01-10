const express = require("express");
const morgan = require('morgan');
const path = require('path');

//RUTAS DE LOS MODULES(Tablas de la bases de datos)
const Usuarios = require('./modules/Usuarios/rutas');
const Auth = require('./modules/Auth/rutas');
const GenerateUUID = require('./modules/GenerateUUID/rutas');
const Survey = require('./modules/Survey/rutas');
const Questions =  require('./modules/Questions/rutas');
const AnswerOptions =  require('./modules/AnswerOptions/rutas');
const Response =  require('./modules/Response/rutas');
const Documentacion = require('./modules/Documentacion/rutas');
const Company = require('./modules/Company/rutas');
const Departments = require('./modules/Departments/rutas');
const DownloadArchive = require('./modules/DownloadArchive/rutas');
const LibraryQuestions = require('./modules/LibraryQuestions/rutas');
const LibraryAnswers = require('./modules/LibraryAnswers/rutas');
const TakeSurvey = require('./modules/TakeSurvey/rutas');
const QuestionBranches =  require('./modules/QuestionBranches/rutas');
const Evaluations =  require('./modules/Evaluations/rutas');


const error = require('./red/errors');
const cors = require('cors');

// initializations
const app = express();

app.use(cors());

//habilita la opción trust proxy para que req.ip devuelva la dirección IP correcta del cliente
app.set('trust proxy', true);

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/public', express.static(path.join(__dirname, '../document')));

// settings
app.set("port", process.env.PORT || 4000);
app.set("portDev", process.env.PORT_DEV || 4001);

// RUTAS DE LA API
app.use('/api/encuestas/Usuarios', Usuarios);
app.use('/api/encuestas/Auth', Auth);
app.use('/api/encuestas/GenerateUUID',GenerateUUID);
app.use('/api/encuestas/Survey',Survey);
app.use('/api/encuestas/Questions',Questions);
app.use('/api/encuestas/AnswerOptions',AnswerOptions);
app.use('/api/encuestas/Response',Response);
app.use('/api/encuestas/Documentacion', Documentacion);
app.use('/api/encuestas/Company', Company);
app.use('/api/encuestas/Departments', Departments);
app.use('/api/encuestas/DownloadArchive', DownloadArchive);
app.use('/api/encuestas/LibraryQuestions', LibraryQuestions);
app.use('/api/encuestas/LibraryAnswers', LibraryAnswers);
app.use('/api/encuestas/TakeSurvey', TakeSurvey);
app.use('/api/encuestas/QuestionBranches', QuestionBranches);
app.use('/api/encuestas/Evaluations', Evaluations);

app.use(error);

module.exports = app;