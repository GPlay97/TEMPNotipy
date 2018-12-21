-- database creaton
DROP DATABASE IF EXISTS TEMPNotipy;
CREATE DATABASE TEMPNotipy;
USE TEMPNotipy;

-- table structure for current temperature
CREATE TABLE `temperature` (
    `temperature` FLOAT DEFAULT 0,
    `timestamp` INT(11) DEFAULT 0
);
-- placeholder for the current temperature
INSERT INTO `temperature` (`temperature`, `timestamp`) VALUES (0, 0);

-- table structure for the statistics
CREATE TABLE `statistic` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `temperature` FLOAT DEFAULT 0,
    `timestamp` INT(11) DEFAULT 0,
    PRIMARY KEY (`id`)
);
