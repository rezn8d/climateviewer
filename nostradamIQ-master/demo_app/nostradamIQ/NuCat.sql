-- phpMyAdmin SQL Dump
-- version 4.2.3deb1.trusty~ppa.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 05, 2015 at 10:09 PM
-- Server version: 5.5.43-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `NuCat`
--
CREATE DATABASE IF NOT EXISTS `NuCat` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `NuCat`;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` varchar(10) NOT NULL,
  `type` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL,
  `longitude` decimal(7,4) NOT NULL,
  `latitude` decimal(7,4) NOT NULL,
  `depth` decimal(7,4) NOT NULL,
  `scalar` decimal(16,9) NOT NULL,
  `place` varchar(180) NOT NULL,
  `AnomalyScore` decimal(8,8) NOT NULL,
  `AnomalyMean_Windowsize` varchar(100) NOT NULL,
  `AnomalyLikelihood` decimal(8,8) NOT NULL,
  `logLikelihood` decimal(8,8) NOT NULL,
  `prediction` varchar(180) NOT NULL,
  `iterCount` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Stores the Events processed';

-- --------------------------------------------------------

--
-- Table structure for table `places`
--

CREATE TABLE IF NOT EXISTS `places` (
`id` int(11) NOT NULL,
  `country_code` char(2) COLLATE utf8_unicode_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `place_name` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `admin_name1` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `admin_code1` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `admin_name2` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `admin_code2` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `admin_name3` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `admin_code3` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` decimal(7,4) NOT NULL,
  `longitude` decimal(7,4) NOT NULL,
  `accuracy` tinyint(4) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2100129 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
 ADD KEY `id` (`id`);

--
-- Indexes for table `places`
--
ALTER TABLE `places`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `places`
--
ALTER TABLE `places`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2100129;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
