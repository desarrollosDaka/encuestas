-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 149.50.139.122    Database: encuestas
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.22.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer_options`
--

DROP TABLE IF EXISTS `answer_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer_options` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdEncuesta` int NOT NULL,
  `IdQuestion` varchar(250) NOT NULL,
  `TextoRespuesta` varchar(1000) DEFAULT NULL,
  `IdQuestionJump` varchar(250) DEFAULT NULL,
  `TextoCanalizacion` varchar(250) DEFAULT NULL,
  `Score` int DEFAULT '0',
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  `IndexTarget` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_survey_answer_options` (`IdEncuesta`),
  KEY `fk_questions_answer_options` (`IdQuestion`),
  CONSTRAINT `fk_questions_answer_options` FOREIGN KEY (`IdQuestion`) REFERENCES `questions` (`IdQuestion`),
  CONSTRAINT `fk_survey_answer_options` FOREIGN KEY (`IdEncuesta`) REFERENCES `survey` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3707 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `Id` int NOT NULL,
  `Usuario` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `Id_UNIQUE` (`Id`),
  CONSTRAINT `fk_usuarios_auth` FOREIGN KEY (`Id`) REFERENCES `usuarios` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `NameCompany` varchar(100) DEFAULT NULL,
  `IdCompany` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdEmpresa` varchar(4) DEFAULT NULL,
  `IdDepartments` varchar(16) DEFAULT NULL,
  `NameDepartments` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `libraryanswers`
--

DROP TABLE IF EXISTS `libraryanswers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libraryanswers` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdQuestion` varchar(250) NOT NULL,
  `TextoRespuesta` varchar(1000) NOT NULL,
  `IndexTarget` int DEFAULT NULL,
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_libraryquestions_libraryanswers` (`IdQuestion`),
  CONSTRAINT `fk_libraryquestions_libraryanswers` FOREIGN KEY (`IdQuestion`) REFERENCES `libraryquestions` (`IdQuestion`)
) ENGINE=InnoDB AUTO_INCREMENT=369 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `libraryquestions`
--

DROP TABLE IF EXISTS `libraryquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `libraryquestions` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdQuestion` varchar(250) NOT NULL,
  `TextoPregunta` varchar(250) NOT NULL,
  `IdTipreg` int DEFAULT NULL,
  `IdDepartments` varchar(16) DEFAULT NULL,
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`,`IdQuestion`),
  UNIQUE KEY `IdQuestion_UNIQUE` (`IdQuestion`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_branches`
--

DROP TABLE IF EXISTS `question_branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_branches` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdEncuesta` int NOT NULL,
  `RowId` int DEFAULT NULL,
  `IdQuestionJump` varchar(250) DEFAULT NULL,
  `IdQuestion` varchar(250) NOT NULL,
  `TextoPregunta` varchar(250) DEFAULT NULL,
  `IdQuestionAnswer` varchar(250) DEFAULT NULL,
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_survey_question_branches` (`IdEncuesta`),
  KEY `fk_questions_question_branches` (`IdQuestion`),
  CONSTRAINT `fk_questions_question_branches` FOREIGN KEY (`IdQuestion`) REFERENCES `questions` (`IdQuestion`),
  CONSTRAINT `fk_survey_question_branches` FOREIGN KEY (`IdEncuesta`) REFERENCES `survey` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `question_type`
--

DROP TABLE IF EXISTS `question_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_type` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdEncuesta` int NOT NULL,
  `IdQuestion` varchar(250) NOT NULL,
  `TextoPregunta` varchar(250) NOT NULL,
  `IdTipreg` int DEFAULT NULL,
  `Required` tinyint DEFAULT '0',
  `ShowResults` tinyint DEFAULT '0',
  `TypeEvaluation` tinyint DEFAULT '0',
  `InLibrary` tinyint DEFAULT '0',
  `IdQuestionInLibrary` varchar(250) DEFAULT NULL,
  `OrderBy` int DEFAULT NULL,
  `TextoCanalizacion` varchar(250) DEFAULT NULL,
  `Jump` tinyint DEFAULT '0',
  `ShowAllOptions` tinyint DEFAULT '1',
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`,`FecCrea`,`IdQuestion`),
  UNIQUE KEY `IdQuestion_UNIQUE` (`IdQuestion`),
  KEY `fk_survey_questions` (`IdEncuesta`),
  CONSTRAINT `fk_survey_questions` FOREIGN KEY (`IdEncuesta`) REFERENCES `survey` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=689 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='ALMACENA LAS PREGUNTAS DE CADA ENCUESTA';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `response`
--

DROP TABLE IF EXISTS `response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `response` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdEncuesta` int NOT NULL,
  `IdQuestion` varchar(250) NOT NULL,
  `IdAnswer` varchar(250) DEFAULT NULL,
  `TextoRespuesta` varchar(1000) DEFAULT NULL,
  `FechaRespuesta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `TipoRespuesta` varchar(50) DEFAULT NULL,
  `Score` int DEFAULT NULL,
  `ScoreQuestion` int DEFAULT NULL,
  `MaxScoreQuestion` int DEFAULT NULL,
  `ReqIpClient` varchar(100) DEFAULT NULL,
  `IdUserResponse` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `INDEX_ENCUESTA` (`IdEncuesta`),
  KEY `fk_questions_response` (`IdQuestion`),
  CONSTRAINT `fk_questions_response` FOREIGN KEY (`IdQuestion`) REFERENCES `questions` (`IdQuestion`),
  CONSTRAINT `fk_survey_response` FOREIGN KEY (`IdEncuesta`) REFERENCES `survey` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=204658 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `IdCompany` varchar(4) DEFAULT NULL,
  `IdDepartments` varchar(16) DEFAULT NULL,
  `Encabezado` varchar(250) DEFAULT NULL,
  `Estado` int NOT NULL,
  `Respuestas` int DEFAULT '0',
  `TypeSurvey` varchar(100) DEFAULT 'H',
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  `UrlSurvey` varchar(250) DEFAULT NULL,
  `ShowResultsEnd` tinyint DEFAULT '1',
  `StartButton` tinyint DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='ALMACENA LOS NOMBRES DE LAS ENCUESTAS';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) DEFAULT NULL,
  `IdCompany` varchar(4) DEFAULT NULL,
  `IdDepartments` varchar(16) DEFAULT NULL,
  `Activo` int DEFAULT NULL,
  `RolAdministrator` tinyint DEFAULT '0',
  `UsrCrea` varchar(50) DEFAULT NULL,
  `FecCrea` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UsrAct` varchar(50) DEFAULT NULL,
  `FecAct` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `uuid_session`
--

DROP TABLE IF EXISTS `uuid_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uuid_session` (
  `Uuid` varchar(250) NOT NULL,
  `Usuario` varchar(100) NOT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'encuestas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-10  9:36:07
