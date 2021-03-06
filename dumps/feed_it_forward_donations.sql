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
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) DEFAULT NULL,
  `productQuantity` int(11) DEFAULT NULL,
  `productUnit` varchar(255) DEFAULT NULL,
  `donatorId` int(11) DEFAULT NULL,
  `receiverId` int(11) DEFAULT NULL,
  `expiration` datetime DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,'Absinthe',2,'cup',NULL,NULL,'2017-11-16 20:32:49','The road to success is always under construction.','reserved','2017-11-16 20:42:14','2017-11-16 20:42:14'),(2,'Baba Ghanoush',3,'pint',NULL,NULL,'2017-11-16 20:32:49','Where there is a \"will,\"\" there are 500 relatives.\"','completed(picked up)','2017-11-16 20:42:14','2017-11-16 20:42:14'),(3,'Bagel and Lox',4,'quart',NULL,NULL,'2017-11-16 20:32:49','Wear short sleeves. Support your right to bare arms!','cancelled','2017-11-16 20:42:14','2017-11-16 20:42:14'),(4,'Baklava',5,'gallon',NULL,NULL,'2017-11-16 20:32:49','When everything\'s coming your way, you\'re in the wrong lane.','open','2017-11-16 20:42:14','2017-11-16 20:42:14'),(5,'Barbecue Ribs',6,'milliliter',NULL,NULL,'2017-11-16 20:32:49','Join The Army. Visit exotic places, meet strange people, then kill them.','reserved','2017-11-16 20:42:14','2017-11-16 20:42:14'),(6,'Bellini',7,'liter',NULL,NULL,'2017-11-16 20:32:49','I poured spot remover on my dog. Now he\'s gone.','completed(picked up)','2017-11-16 20:42:14','2017-11-16 20:42:14'),(7,'Bird\'s Nest Soup',8,'pound',NULL,NULL,'2017-11-16 20:32:49','Death is hereditary.','cancelled','2017-11-16 20:42:14','2017-11-16 20:42:14'),(8,'Biscuits and Gravy',9,'ounce',NULL,NULL,'2017-11-16 20:32:49','When you\'re right, no one remembers. When you\'re wrong, no one forgets.','open','2017-11-16 20:42:14','2017-11-16 20:42:14'),(9,'Black Pudding',10,'fl oz',NULL,NULL,'2017-11-16 20:32:49','Cheer up, the worst is yet to come.','reserved','2017-11-16 20:42:14','2017-11-16 20:42:14'),(10,'Black Truffle',11,'cup',NULL,NULL,'2017-11-16 20:32:49','If you can\'t see the bright side of life, polish the dull side.','completed(picked up)','2017-11-16 20:42:14','2017-11-16 20:42:14'),(11,'Borscht',12,'pint',NULL,NULL,'2017-11-16 20:32:49','Everybody wants to go to heaven, but nobody wants to die.','cancelled','2017-11-16 20:42:14','2017-11-16 20:42:14'),(12,'Calamari',13,'quart',NULL,NULL,'2017-11-16 20:32:49','I stopped fighting my inner demons, we\'re on the same side now.','open','2017-11-16 20:42:14','2017-11-16 20:42:14'),(13,'Carp',14,'gallon',NULL,NULL,'2017-11-16 20:32:49','Well-behaved women rarely make history.','reserved','2017-11-16 20:42:14','2017-11-16 20:42:14'),(14,'Caviar',15,'milliliter',NULL,NULL,'2017-11-16 20:32:49','I would never die for my beliefs because I might be wrong.','completed(picked up)','2017-11-16 20:42:14','2017-11-16 20:42:14'),(15,'Cheese Fondue',16,'liter',NULL,NULL,'2017-11-16 20:32:49','He who laughs last, didn\'t get it.','cancelled','2017-11-16 20:42:14','2017-11-16 20:42:14'),(16,'Chicken and Waffles (together, at the same time)',17,'pound',NULL,NULL,'2017-11-16 20:32:49','We live in an age where pizza gets to your home before the police.','open','2017-11-16 20:42:14','2017-11-16 20:42:14'),(17,'Chicken Tikka Masala',18,'ounce',NULL,NULL,'2017-11-16 20:32:49','I\'m an excellent housekeeper. Every time I get a divorce, I keep the house.','reserved','2017-11-16 20:42:14','2017-11-16 20:42:14'),(18,'Chile Relleno',19,'fl oz',NULL,NULL,'2017-11-16 20:32:49','Cheese . . . milk\'s leap toward immortality.','completed(picked up)','2017-11-16 20:42:14','2017-11-16 20:42:14'),(19,'Chitlins',20,'cup',NULL,NULL,'2017-11-16 20:32:49','He\'s so optimistic he\'d buy a burial suit with two pairs of pants.','cancelled','2017-11-16 20:42:14','2017-11-16 20:42:14'),(20,'Churros',21,'pint',NULL,NULL,'2017-11-16 20:32:49','Half of the people in the world are below average.','open','2017-11-16 20:42:14','2017-11-16 20:42:14'),(21,'Clam Chowder',22,'quart',NULL,NULL,'2017-11-16 20:32:49','I could tell that my parents hated me. My bath toys were a toaster and a radio.','reserved','2017-11-16 20:42:14','2017-11-16 20:42:14'),(22,'Cognac',23,'gallon',NULL,NULL,'2017-11-16 20:32:49','A clear conscience is usually the sign of a bad memory.','completed(picked up)','2017-11-16 20:42:14','2017-11-16 20:42:14'),(23,'Crab Cakes',24,'milliliter',NULL,NULL,'2017-11-16 20:32:49','It is not my fault that I never learned to accept responsibility!','cancelled','2017-11-16 20:42:14','2017-11-16 20:42:14'),(24,'Crickets',25,'liter',NULL,NULL,'2017-11-16 20:32:49','Advice is what we ask for when we already know the answer but wish we didn\'t.','open','2017-11-16 20:42:15','2017-11-16 20:42:15'),(25,'Currywurst',26,'pound',NULL,NULL,'2017-11-16 20:32:49','Advice is what we ask for when we already know the answer but wish we didn\'t.','reserved','2017-11-16 20:42:15','2017-11-16 20:42:15'),(26,'Dandelion Wine',27,'ounce',NULL,NULL,'2017-11-16 20:32:49','Constipated people don\'t give a crap.','completed(picked up)','2017-11-16 20:42:15','2017-11-16 20:42:15'),(27,'Dulce De Leche',28,'fl oz',NULL,NULL,'2017-11-16 20:32:49','Why does a slight tax increase cost you $200 and a substantial tax cut save you 30 cents?','cancelled','2017-11-16 20:42:15','2017-11-16 20:42:15'),(28,'Durian',29,'cup',NULL,NULL,'2017-11-16 20:32:49','My wife made me join a bridge club. I jump off next Tuesday.','open','2017-11-16 20:42:15','2017-11-16 20:42:15');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
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
