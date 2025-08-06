-- MySQL dump 10.13  Distrib 8.0.40, for macos14 (arm64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `id_autore` bigint NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `text` varchar(120) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`id_autore`),
  KEY `comment_ibfk_1` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`id_autore`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (60,52,14,'2024-11-02','09:45:00','Sono passati diversi mesi, ma è ancora uno dei migliori pc'),(61,52,14,'2024-11-02','10:30:00','Concordo con Marco, grazie per fare questi meravigliosi prodotti!'),(62,52,14,'2024-10-02','09:45:00','Chapeau!'),(63,52,6,'2024-10-02','08:10:00','Concordo con Marco, grazie per il post!'),(64,52,14,'2024-09-02','09:45:00','Ottimo spunto di riflessione, Sara!'),(65,56,14,'2024-11-05','09:45:00','Chissà perché questo passo indietro!'),(66,56,6,'2024-11-04','10:10:00','Concordo con Marco, a me è piaciuta questa generazione!'),(67,55,6,'2024-11-02','12:15:00','Wow, davvero incredibile! Apple sempre un passo avanti a tutti.'),(68,54,6,'2024-08-27','12:15:00','Mi hai convinto...lo ordinerò subito'),(69,53,6,'2024-06-22','19:15:00','Deve essere stata un\'esperienza fantastica, grazie per averla condivisa!'),(70,56,6,'2024-12-24','14:21:19','ciao'),(71,52,6,'2024-12-24','14:22:11','aspetterò la prossima generazione'),(77,62,6,'2024-12-26','19:31:58','fatemi sapere cosa ne pensate!'),(78,56,14,'2024-11-05','12:30:00','Intel dovrebbe ascoltare meglio i feedback degli utenti.'),(79,56,6,'2024-11-06','09:45:00','Scelta strana per un prodotto che punta alla longevità.'),(80,56,14,'2024-11-06','15:20:00','Sembra un errore strategico per i prossimi anni.'),(81,56,6,'2024-11-07','08:00:00','Mi chiedo come impatterà sulle performance.'),(82,56,14,'2024-11-07','11:10:00','Non tutti vogliono hardware così poco flessibile.'),(83,56,6,'2024-11-08','14:50:00','Lunar Lake ha innovazioni, ma questa scelta è discutibile.'),(84,56,14,'2024-11-08','17:25:00','Una RAM saldata è un passo indietro per molti utenti.'),(85,56,6,'2024-11-09','10:05:00','Intel avrebbe dovuto prevedere la reazione del mercato.'),(86,56,14,'2024-11-09','13:40:00','Un errore che potrebbe costare caro ad Intel.'),(87,56,6,'2024-11-10','09:30:00','Le alternative AMD sembrano più interessanti ora.'),(88,56,14,'2024-11-10','18:10:00','Questa decisione potrebbe spingere molti verso ARM.'),(89,56,6,'2024-11-11','07:15:00','La RAM integrata potrebbe limitare anche la durata del dispositivo.'),(90,56,14,'2024-11-11','16:20:00','Interessante, ma avrebbero dovuto pensarci meglio.'),(91,56,6,'2024-11-12','08:50:00','Spero che correggano il tiro nei prossimi modelli.'),(92,56,14,'2024-11-12','15:30:00','Intel deve tornare a mettere al centro l’utente.'),(93,56,6,'2024-11-13','11:40:00','Potrebbe creare problemi nei mercati emergenti.'),(94,56,14,'2024-11-13','13:55:00','Un errore simile a quello fatto con Itanium.'),(95,56,6,'2024-11-14','10:20:00','Gli utenti Pro non saranno contenti di questa scelta.'),(96,56,14,'2024-11-14','17:45:00','Un limite che potrebbe diventare un problema serio.'),(97,56,6,'2024-11-15','08:30:00','Lunar Lake avrebbe potuto essere molto più competitivo.'),(98,56,14,'2024-11-15','14:10:00','Una mossa che sembra ignorare le tendenze del mercato.'),(99,56,6,'2024-11-16','07:50:00','Aspettiamo di vedere le vendite prima di giudicare.'),(100,56,14,'2024-11-16','18:30:00','L’hardware fisso non piace a tutti, Intel dovrebbe saperlo.'),(101,56,6,'2024-11-17','10:10:00','La RAM integrata è meno problematica per alcuni utenti.'),(102,56,14,'2024-11-17','15:50:00','La flessibilità è sempre stata un punto forte, ma ora?'),(103,56,6,'2024-11-18','09:25:00','Una scelta progettuale che solleva molte domande.'),(104,56,14,'2024-11-18','13:35:00','Perché Intel non ha optato per un design modulare?'),(105,56,6,'2024-11-19','08:40:00','Gli sviluppatori potrebbero risentirne maggiormente.'),(106,56,14,'2024-11-19','18:20:00','Vedremo se la qualità giustificherà questa scelta.'),(107,56,6,'2024-11-20','10:45:00','L’integrazione può essere un vantaggio, ma a che costo?'),(108,56,14,'2024-11-20','16:55:00','Questo tipo di decisioni influenzerà la fiducia nel brand.'),(109,56,6,'2024-11-05','10:15:00','Concordo, la RAM integrata limita gli upgrade futuri.'),(110,63,6,'2024-12-26','22:59:35','per il mio setup desktop non vedo l\'ora che escano i leak sulla 5080, è ora di sostituire la mia 3080 Ti'),(111,61,6,'2024-12-26','23:05:07','commentate per farmi sapere la vostra!'),(132,63,14,'2025-01-04','23:25:43','ora di comprare un nuovo dissipatore allora, consuma quanto l\'intera build da sola!');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `preview` varchar(100) DEFAULT NULL,
  `content` varchar(280) DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `id_autore` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_post` (`id_autore`),
  CONSTRAINT `fk_user_post` FOREIGN KEY (`id_autore`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (51,'Apple presenta M3, M3 Pro e M3 Max, i chip più avanzati per un personal computer','Apple ha annunciato i tre chip M3, M3 Pro e M3 Max che garantiscono prestazioni superiori su Mac.','I primi chip del settore a 3 nanometri per personal computer introducono una GPU con architettura di nuova generazione, offrono prestazioni sensibilmente superiori, CPU e Neural Engine più veloci, e supportano più memoria unificata','2023-10-30','12:00:00',6),(52,'Apple presenta i nuovi MacBook Air 13\" e 15\" con il potente chip M3','Il portatile più popolare al mondo migliora ulteriormente con performance ancora più elevate...','Grazie al chip M3, MacBook Air è fino al 60% più veloce rispetto al modello con M1, e fino a 13 volte più scattante del modello MacBook Air più veloce con processore Intel.','2024-03-04','09:20:00',14),(53,'Ryzen 9 AI HX 370: fino al 25% in più di prestazioni rispetto al Ryzen 9 8945HS su Geekbench','Su Geekbench sono apparsi nuovi test sulle APU Ryzen Strix Point','Tuttavia, la CPU ha segnato un punteggio di 2.833 nel test single core e di 14.773 in quello multicore sopravanzando il Ryzen 9 8945HS rispettivamente di circa il 19% e il 25%.','2024-06-02','19:00:00',6),(54,'Asus ROG Zephyrus G14: Il MacBook Pro dei laptop da gaming | Recensione','La versione 2024 dell’Asus ROG Zephyrus G14 è un laptop da gaming sia potente che elegante','L\'Asus ROG Zephyrus G14, nella sua versione 2024, sembra fatto apposta per me. Ha tutto ciò che cercavo in un laptop da gaming, con l’aggiunta di un design elegante che gli permette di essere il perfetto compagno sia per il gaming in mobilità che per l’ambito professionale.','2024-08-09','12:00:00',14),(55,'Apple presenta i chip M4 Pro e M4 Max','M4 Pro e M4 Max si uniscono a M4 per formare la serie di chip più avanzata mai vista su un pc','Tutti e tre i chip sono stati realizzati usando una tecnologia a 3 nm di 2a gen. che migliora prestazioni ed efficienza energetica. Le CPU della serie M4 sono le più veloci al mondo, con le migliori prestazioni single‑thread del settore e prestazioni multi-thread più veloci.','2024-10-30','12:00:00',6),(56,'Intel dice che la RAM integrata in Lunar Lake è stata un errore','Intel ha detto che la decisione di integrare la RAM nei chip dei Core Ultra 200V è stato un errore','La questione stupisce perché la stessa Intel ha parlato proprio dell\'integrazione della RAM direttamente nel chiplet come una delle ragioni principali per cui i Lunar Lake sono così efficienti e prestanti.','2024-11-03','09:20:00',6),(59,'WhatsApp, la funzione di scan dei documenti è arrivata su iPhone!','Vi sarà capitato di dover inviare al volo un documento e di scegliere WhatsApp...','Ma come si effettua una scansione, installata l\'ultima versione? Be\', semplice: all\'interno di una chat, basta premere sul + a sinistra del campo di testo, poi sull\'icona Documento e infine selezionare Scansiona documento. Aperta la fotocamera basta inquadrare il documento.','2024-12-26','19:06:47',6),(60,'Nuovo iPad in arrivo nel 2025: Apple punta sulla connettività 5G proprietaria','l\'iPad di undicesima generazione potrebbe fare il suo debutto nei primi mesi del 2025.','Il lancio del nuovo tablet dovrebbe coincidere con il rilascio di iPadOS 18.3, l\'aggiornamento del sistema operativo che, secondo le anticipazioni, includerà il supporto specifico per il nuovo dispositivo. potremmo vedere l\'iPad 11 nei negozi durante la primavera del 2025.','2024-12-26','19:10:39',6),(61,'iPhone 17 Air sarà meno caro del previsto: le rinunce sono pesanti','Avrà un prezzo di listino più contenuto rispetto a quanto ipotizzato inizialmente.','Il 2025 sarà l\'anno in cui Apple aggiornerà in maniera importante la sua offerta di iPhone, andando a proporre una lineup di iPhone 17 che includerà il tanto chiacchierato modello Air - nome ancora da confermare - a cui spetterà il compito di suscitare nuovamente interesse.','2024-12-26','19:13:18',6),(62,'AirPods Pro 3: Apple punta sul monitoraggio della salute con i nuovi auricolari','Apple sta lavorando a una serie di innovative funzionalità dedicate alla salute per la prossima gen.','Apple sembra essere  concentrata sullo sviluppo di un sensore per il monitoraggio del battito cardiaco. Si dice anche che i test interni mostrano risultati promettenti, e sebbene la precisione non raggiunga ancora quella dell\'Apple Watch, le differenze sarebbero minime.','2024-12-26','19:14:58',6),(63,'NVIDIA GeForce RTX 5070 Ti e RTX 5070: trapelano le specifiche tecniche','La prossima generazione di schede video della famiglia Blackwell RTX 50 sta facendo parlare di sé.','La GeForce RTX 5070 Ti utilizzerà il GB203-300-A1, che include ben 8960 Cuda Core e 16 GB di memoria GDDR7 con un bus a 256 bit. Il design della scheda sarà basato sul PG147-SKU60, con un consumo totale di potenza (TBP) di 300W.','2024-12-26','19:18:14',6);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `numero` varchar(255) NOT NULL,
  `data_nascita` date NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_UNIQUE` (`numero`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'roberto','dioguardi','roberto02','roberto02@gmail.com','3393371385','2000-02-12','$2a$10$omJlKvyBb/p0e6hGgaHmtOJ1VI8dHywD/ezMw5xVu.IivisC3weSK'),(9,'Gino','Lobelia','gino.lobelia','gino.lobelia@gmail.com','3245547766','2001-09-06','$2a$10$J4Xz4NweJwhI8Ct7yowRYuNONWnNaz9X0wWar6J9oC6crESL1ATXG'),(11,'Leonardo','Mendola','leomendola','leo.mendola01@gmail.com','3713725212','2001-05-16','$2a$10$XoMhckdTxVWXpZOgL4AfNOT6ZY6e.96ozHWZ.eeiC4.WCMnqSUHea'),(12,'Daneiele','Lucchese','dani_theking','daniele.lucchese@gmail.com','3413425212','2001-06-30','$2a$10$Evll.t5JQB7A.xtEPI7sY.LEMp34u.EFrYER67.R6JWZHn5BEDsLq'),(13,'Matteo','Rubino','mattheww','matteo.rubino@icloud.com','3243256778','2001-12-14','$2a$10$KZAz3Dg/iG6ewjcoaTSrN.vnNGhr3jJkWKpv/QWKuaX4m/NvxgOji'),(14,'Gabriele ','Greco','gabriele.greco02','gab.greco@gmail.com','3383798831','2002-02-09','$2a$10$H2DMj.oca/v8Mi9pK1kmtexBea32QP1Z/Dqv2ohDayhzGrkCfoD8.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-18 11:44:05
