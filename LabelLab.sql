CREATE USER 'dev'@'localhost' IDENTIFIED BY 'dev';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'dev'@'localhost';
CREATE DATABASE IF NOT EXISTS `LabelLab` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `LabelLab`;
--
-- Table structure for table `Images`
--

DROP TABLE IF EXISTS `Images`;

CREATE TABLE `Images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `has_label` varchar(5) NOT NULL DEFAULT 'false',
  `label` varchar(255) DEFAULT NULL,
  `x` smallint(6) DEFAULT '100',
  `y` smallint(6) DEFAULT '100',
  `height` smallint(6) DEFAULT '100',
  `width` smallint(6) DEFAULT '100',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
