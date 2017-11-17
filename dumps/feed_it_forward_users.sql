-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: feed_it_forward
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `addressStreet` varchar(255) DEFAULT NULL,
  `addressCity` varchar(255) DEFAULT NULL,
  `addressState` varchar(255) DEFAULT NULL,
  `addressZip` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'﻿Corrie','Tolan','random','Mulberry Court','New York','AL','84000','donor','1customer@email.com','801.555.1234','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(2,'Rosa','Spradlin','random','Linda Lane','Los Angeles','AK','84001','receiver','2cusspmer@email.rom','801.483.2929','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(3,'Elliott','Mickelson','random','Poplar Street','Chicago','AZ','84002','donor','3cusmimer@email.elm','987.393.1023','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(4,'Whitney','Boehman','random','Creek Road','Houston[7]','AR','84003','receiver','4cusbomer@email.whm','393.292.1029','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(5,'Hannelore','Rahaim','random','Redwood Drive','Phoenix','CA','84004','donor','5cusramer@email.ham','801.555.1235','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(6,'Mui','Leroy','random','Grove Street','Philadelphia[8]','CO','84005','receiver','6cuslemer@email.mum','801.483.2930','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(7,'Laraine','Bhatt','random','Meadow Lane','San Antonio','CT','84006','donor','7cusbhmer@email.lam','987.393.1024','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(8,'Davis','Hagler','random','Clay Street','San Diego','DE','84007','receiver','8cushamer@email.dam','393.292.1030','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(9,'Catharine','Colmenero','random','Elm Avenue','Dallas','FL','84008','donor','9cuscomer@email.cam','801.555.1236','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(10,'Margert','Faucher','random','Ann Street','San Jose','GA','84009','receiver','10cusfamer@email.mam','801.483.2931','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(11,'Shanae','Pruden','random','Park Place','Austin','HI','84010','donor','11cusprmer@email.shm','987.393.1025','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(12,'Malorie','Surles','random','Buttonwood Drive','Jacksonville[9]','ID','84011','receiver','12cussumer@email.mam','393.292.1031','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(13,'Samuel','Hankerson','random','Hamilton Street','San Francisco[10]','IL','84012','donor','13cushamer@email.sam','801.555.1237','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(14,'Ali','Sartori','random','Pennsylvania Avenue','Columbus','IN','84013','receiver','14cussamer@email.alm','801.483.2932','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(15,'Wynell','Randell','random','5th Street South','Indianapolis[11]','IA','84014','donor','15cusramer@email.wym','987.393.1026','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(16,'Karen','Schaller','random','Front Street','Fort Worth','KS','84015','receiver','16cusscmer@email.kam','393.292.1032','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(17,'Viola','Innis','random','Green Street','Charlotte','KY','84016','donor','17cusinmer@email.vim','801.555.1238','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(18,'Edelmira','Watters','random','Clinton Street','Seattle','LA','84017','receiver','18cuswamer@email.edm','801.483.2933','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(19,'Kasie','Saylors','random','Front Street South','Denver[12]','ME','84018','donor','19cussamer@email.kam','987.393.1027','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(20,'Cleveland','Lamacchia','random','Madison Avenue','El Paso','MD','84019','receiver','20cuslamer@email.clm','393.292.1033','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(21,'Pearlie','Braxton','random','Woodland Road','Washington[13]','MA','84020','donor','21cusbrmer@email.pem','801.555.1239','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(22,'Andria','Lathrop','random','Glenwood Avenue','Boston','MI','84021','receiver','22cuslamer@email.anm','801.483.2934','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(23,'Columbus','Hervey','random','Lilac Lane','Detroit','MN','84022','donor','23cushemer@email.com','987.393.1028','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(24,'Manuela','William','random','Route 4','Nashville[14]','MS','84023','receiver','24cuswimer@email.mam','393.292.1034','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(25,'Forest','Victor','random','14th Street','Memphis','MO','84024','donor','25cusvimer@email.fom','801.555.1240','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(26,'Magdalen','Ashworth','random','Cardinal Drive','Portland','MT','84025','receiver','26cusasmer@email.mam','801.483.2935','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(27,'Qiana','Jobe','random','Arlington Avenue','Oklahoma City','NE','84026','donor','27cusjomer@email.qim','987.393.1029','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(28,'Osvaldo','Mischke','random','Summit Street','Las Vegas','NV','84027','receiver','28cusmimer@email.osm','393.292.1035','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(29,'Yun','Wilcoxson','random','6th Street North','Louisville[15]','NH','84028','donor','29cuswimer@email.yum','801.555.1241','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(30,'Emelia','Piotrowski','random','5th Street West','Baltimore[16]','NJ','84029','receiver','30cuspimer@email.emm','801.483.2936','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(31,'Felice','Vandervort','random','Holly Drive','Milwaukee','NM','84030','donor','31cusvamer@email.fem','987.393.1030','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(32,'Retha','Algarin','random','Main Street North','Albuquerque','NY','84031','receiver','32cusalmer@email.rem','393.292.1036','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(33,'Isadora','Melo','random','Magnolia Avenue','Tucson','NC','84032','donor','33cusmemer@email.ism','801.555.1242','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(34,'Pauletta','Meals','random','Strawberry Lane','Fresno','ND','84033','receiver','34cusmemer@email.pam','801.483.2937','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(35,'Virgina','Scranton','random','Liberty Street','Sacramento','OH','84034','donor','35cusscmer@email.vim','987.393.1031','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(36,'Cecelia','Oldenburg','random','Broadway','Mesa','OK','84035','receiver','36cusolmer@email.cem','393.292.1037','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(37,'Arletha','Chiarello','random','Spring Street','Kansas City','OR','84036','donor','37cuschmer@email.arm','801.555.1243','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(38,'Marla','Lebaron','random','Henry Street','Atlanta','PA','84037','receiver','38cuslemer@email.mam','801.483.2938','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(39,'Elanor','Hultquist','random','Walnut Avenue','Long Beach','RI','84038','donor','39cushumer@email.elm','987.393.1032','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(40,'Ileen','Mayville','random','Water Street','Colorado Springs','SC','84039','receiver','40cusmamer@email.ilm','393.292.1038','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(41,'Agnes','Lesher','random','Pin Oak Drive','Raleigh','SD','84040','donor','41cuslemer@email.agm','801.555.1244','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(42,'Katharina','Mcmahon','random','2nd Avenue','Miami','TN','84041','receiver','42cusmcmer@email.kam','801.483.2939','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(43,'Regine','Morehouse','random','Marshall Street','Virginia Beach[16]','TX','84042','donor','43cusmomer@email.rem','987.393.1033','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(44,'Marlene','Wyant','random','Chestnut Street','Omaha','UT','84043','receiver','44cuswymer@email.mam','393.292.1039','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(45,'Kaylee','Zehner','random','Catherine Street','Oakland','VT','84044','donor','45cuszemer@email.kam','801.555.1245','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(46,'Pok','Schmidt','random','Berkshire Drive','Minneapolis','VA','84045','receiver','46cusscmer@email.pom','801.483.2940','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(47,'Kelley','Cuellar','random','3rd Street North','Tulsa','WA','84046','donor','47cuscumer@email.kem','987.393.1034','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(48,'Luis','Carrington','random','Taylor Street','Arlington','WV','84047','receiver','48cuscamer@email.lum','393.292.1040','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(49,'Arielle','Liddell','random','2nd Street West','New Orleans[17]','WI','84048','donor','49cuslimer@email.arm','801.555.1246','password','2017-11-16 20:32:49','2017-11-16 20:32:49'),(50,'Titus','Mulford','random','Chapel Street','Wichita','WY','84049','receiver','50cusmumer@email.tim','801.483.2941','password','2017-11-16 20:32:49','2017-11-16 20:32:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-16 20:52:50
