-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2021 at 01:38 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swirl`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_to` varchar(50) NOT NULL,
  `user_from` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `link` varchar(100) NOT NULL,
  `datetime` datetime NOT NULL,
  `opened` varchar(3) NOT NULL,
  `viewed` varchar(3) NOT NULL,
  `post_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_to`, `user_from`, `message`, `link`, `datetime`, `opened`, `viewed`, `post_ID`) VALUES
(3, 'jane_brisbane', 'Dylancougar', 'lorem', 'link', '2018-04-18 00:00:00', 'no', 'yes', 0),
(4, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=40', '2018-04-18 14:59:45', 'yes', 'yes', 40),
(5, 'megan_shurnur', 'kalon_nunez', 'Kalon Nunez liked your post', 'post.php?id=40', '2018-04-18 15:13:23', 'yes', 'yes', 40),
(6, 'Dylancougar', 'robbie_jinjoe', 'Robbie Jinjoe liked your post', 'post.php?id=55', '2018-04-18 15:18:43', 'yes', 'yes', 55),
(7, 'Dylancougar', 'robbie_jinjoe', 'Robbie Jinjoe posted on your profile', 'post.php?id=60', '2018-04-18 15:19:03', 'yes', 'yes', 60),
(8, 'dylancougar', 'robbie_jinjoe', 'Robbie Jinjoe liked your post', 'post.php?id=57', '2018-04-18 15:43:00', 'yes', 'yes', 57),
(9, 'vernon_dells', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=43', '2018-04-18 15:43:26', 'no', 'yes', 43),
(10, 'Dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=55', '2018-04-18 16:42:55', 'no', 'yes', 55),
(11, 'Dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=54', '2018-04-19 15:27:54', 'yes', 'yes', 54),
(12, 'megan_shurnur', 'vernon_dells', 'Vernon Dells liked your post', 'post.php?id=34', '2018-04-19 16:01:45', 'yes', 'yes', 34),
(13, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=96', '2018-04-23 17:04:31', 'no', 'no', 96),
(14, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=97', '2018-04-23 17:05:41', 'no', 'no', 97),
(15, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=98', '2018-04-23 17:05:55', 'no', 'no', 98),
(16, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=99', '2018-04-23 17:09:25', 'no', 'no', 99),
(17, 'test heading 2', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=100', '2018-04-23 17:11:15', 'no', 'no', 100),
(18, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=101', '2018-04-23 17:13:39', 'no', 'no', 101),
(19, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=135', '2018-04-23 20:41:51', 'no', 'yes', 135),
(20, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=134', '2018-04-23 20:51:58', 'no', 'yes', 134),
(21, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=138', '2018-04-23 20:53:19', 'yes', 'yes', 138),
(22, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=141', '2018-04-23 20:57:24', 'yes', 'yes', 141),
(23, 'dylancougar', 'vernon_dells', 'Vernon Dells liked your post', 'post.php?id=141', '2018-04-23 20:59:47', 'yes', 'yes', 141),
(24, 'dylancougar', 'jane_brisbane', 'Jane Brisbane liked your post', 'post.php?id=141', '2018-04-23 21:22:36', 'yes', 'yes', 141),
(25, 'dylancougar', 'megan_shurnur', 'Megan Shurnur commented on your post', 'post.php?id=145', '2018-04-26 16:50:00', 'yes', 'yes', 145),
(26, 'megan_shurnur', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=0', '2018-04-26 18:27:10', 'no', 'yes', 0),
(27, 'megan_shurnur', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=0', '2018-04-26 18:28:42', 'no', 'yes', 0),
(28, 'megan_shurnur', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=0', '2018-04-26 19:06:37', 'no', 'yes', 0),
(29, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2018-04-26 21:59:13', 'no', 'yes', 145),
(30, 'dylancougar', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=145', '2018-04-26 22:22:15', 'yes', 'yes', 145),
(31, 'megan_shurnur', 'jane_brisbane', 'Jane Brisbane commented on a post you commented on', 'post.php?id=145', '2018-04-26 22:22:15', 'no', 'yes', 145),
(32, 'dylancougar', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=145', '2018-05-02 17:53:38', 'yes', 'yes', 145),
(33, 'dylancougar', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=141', '2018-05-02 17:53:45', 'yes', 'yes', 141),
(34, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 17:53:58', 'no', 'yes', 146),
(35, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 17:54:07', 'no', 'yes', 146),
(36, 'dylancougar', 'mark_michaels', 'Mark Michaels liked your post', 'post.php?id=145', '2018-05-02 18:06:18', 'yes', 'yes', 145),
(37, 'dylancougar', 'mark_michaels', 'Mark Michaels liked your post', 'post.php?id=141', '2018-05-02 18:06:30', 'yes', 'yes', 141),
(38, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:07:04', 'no', 'yes', 146),
(39, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:07:11', 'no', 'yes', 146),
(40, 'dylancougar', 'mark_michaels', 'Mark Michaels liked your post', 'post.php?id=141', '2018-05-02 18:07:15', 'yes', 'yes', 141),
(41, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:07:57', 'no', 'yes', 146),
(42, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:13:21', 'no', 'yes', 146),
(43, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on your post', 'post.php?id=146', '2018-05-02 20:48:47', 'no', 'yes', 146),
(44, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=151', '2021-03-23 18:24:45', 'yes', 'yes', 151),
(45, 'dylancougar', 'hurcut_brace', 'Hurcut Brace commented on your post', 'post.php?id=145', '2021-03-23 19:03:26', 'yes', 'yes', 145),
(46, 'megan_shurnur', 'hurcut_brace', 'Hurcut Brace commented on a post you commented on', 'post.php?id=145', '2021-03-23 19:03:26', 'no', 'yes', 145),
(47, 'jane_brisbane', 'hurcut_brace', 'Hurcut Brace commented on a post you commented on', 'post.php?id=145', '2021-03-23 19:03:26', 'no', 'yes', 145),
(48, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2021-04-24 16:13:45', 'no', 'no', 145),
(49, 'jane_brisbane', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2021-04-24 16:13:45', 'no', 'yes', 145),
(50, 'hurcut_brace', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2021-04-24 16:13:45', 'no', 'yes', 145);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
