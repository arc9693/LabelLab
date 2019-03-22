CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'dev'@'localhost';
CREATE DATABASE IF NOT EXISTS `LabelLab` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `LabelLab`;

--
-- Table structure for table `Images`
--

DROP TABLE IF EXISTS `Images`;

CREATE TABLE `Images` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `height` int(11) DEFAULT '0',
  `width` int(11) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Table structure for table `Labels`
--

DROP TABLE IF EXISTS `Labels`;

CREATE TABLE `Labels` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Label` varchar(255) NOT NULL,
  `x` int(11) DEFAULT '0',
  `y` int(11) DEFAULT '0',
  `height` int(11) DEFAULT '0',
  `width` int(11) DEFAULT '0',
  `ImageID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ImageID` (`ImageID`),
  CONSTRAINT `Labels_ibfk_1` FOREIGN KEY (`ImageID`) REFERENCES `Images` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
