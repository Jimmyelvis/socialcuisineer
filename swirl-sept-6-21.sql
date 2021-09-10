-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2021 at 01:50 AM
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
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_body` text NOT NULL,
  `posted_by` varchar(60) NOT NULL,
  `posted_to` varchar(60) NOT NULL,
  `date_added` datetime NOT NULL,
  `removed` varchar(3) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_body`, `posted_by`, `posted_to`, `date_added`, `removed`, `post_id`) VALUES
(1, 'hey mannnnnnnnnnnnnnnnn', 'kalon_nunez', 'vernon_dells', '2017-11-18 14:40:34', 'no', 43),
(2, 'yoooooooooooooooooooo', 'kalon_nunez', 'kalon_nunez', '2017-11-18 14:41:21', 'no', 33),
(3, 'whaaaaaattttttttttttttttttt', 'kalon_nunez', 'vernon_dells', '2017-11-18 15:38:53', 'no', 19),
(4, 'greatnees', 'kalon_nunez', 'kalon_nunez', '2017-11-18 15:42:25', 'no', 13),
(5, 'yeahahh', 'kalon_nunez', 'vernon_dells', '2017-11-18 15:43:33', 'no', 19),
(6, 'uh huh', 'kalon_nunez', 'vernon_dells', '2017-11-18 15:44:01', 'no', 19),
(7, 'yeah son', 'kalon_nunez', 'kalon_nunez', '2017-11-18 16:04:42', 'no', 26),
(8, 'Nice', 'megan_shurnur', 'megan_shurnur', '2018-04-26 16:49:31', 'no', 146),
(9, 'Cool', 'megan_shurnur', 'dylancougar', '2018-04-26 16:50:00', 'no', 145),
(10, 'Really Cool', 'dylancougar', 'dylancougar', '2018-04-26 21:59:13', 'no', 145),
(11, 'Totally Cool', 'jane_brisbane', 'dylancougar', '2018-04-26 22:22:15', 'no', 145),
(12, 'This is cool', 'dylancougar', 'megan_shurnur', '2018-05-02 20:48:47', 'no', 146),
(13, 'awesome', 'hurcut_brace', 'dylancougar', '2021-03-23 19:03:26', 'no', 145),
(14, 'Awesome', 'hurcut_brace', 'hurcut_brace', '2021-03-28 13:45:22', 'no', 152),
(15, 'Really awesome', 'hurcut_brace', 'hurcut_brace', '2021-03-28 13:45:41', 'no', 152),
(16, 'really cool', 'dylancougar', 'dylancougar', '2021-04-24 16:13:45', 'no', 145),
(17, 'awesome', 'jane_brisbane', 'dylancougar', '2021-07-23 12:38:25', 'no', 156),
(38, 'This looks awesome', 'jane_brisbane', 'naomi_jonas', '2021-07-25 20:49:45', 'no', 175),
(39, 'Thanks', 'naomi_jonas', 'naomi_jonas', '2021-07-25 20:49:58', 'no', 175),
(40, 'This looks really good', 'naomi_jonas', 'dylancougar', '2021-07-25 22:11:17', 'no', 156),
(41, 'I tried it, it wasn\'t too bad.', 'jane_brisbane', 'kerry_walsh', '2021-07-25 22:12:42', 'no', 171),
(42, 'You make these?', 'kalon_nunez', 'ana_ramos', '2021-07-25 22:14:31', 'no', 157),
(43, 'No but want too.', 'ana_ramos', 'ana_ramos', '2021-07-25 22:15:46', 'no', 157),
(44, 'I really need to learn how to make this.', 'ana_ramos', 'dylancougar', '2021-07-25 22:31:16', 'no', 156),
(45, 'My Favorite fruit', 'jane_brisbane', 'megan_shurnur', '2021-07-25 22:34:45', 'no', 146),
(46, 'Cool', 'naomi_jonas', 'hurcut_brace', '2021-08-07 21:03:37', 'no', 152),
(47, 'Yeah Cool', 'kerry_walsh', 'hurcut_brace', '2021-08-07 21:10:13', 'no', 152),
(48, 'Nice', 'kerry_walsh', 'ana_ramos', '2021-08-07 21:14:15', 'no', 157),
(49, 'Cool', 'dylancougar', 'naomi_jonas', '2021-08-23 20:08:21', 'no', 175),
(50, 'This Looks awesome', 'jimmy_smith', 'dylancougar', '2021-08-30 19:08:46', 'no', 156),
(51, 'Wow this steak dinner looks good', 'phil_brooks', 'dylancougar', '2021-09-02 12:31:21', 'no', 174),
(52, 'This looks really good.', 'vernon_dells', 'naomi_jonas', '2021-09-06 19:08:12', 'no', 175),
(53, 'I should try this myself', 'rusby_huggins', 'naomi_jonas', '2021-09-06 19:10:43', 'no', 175);

-- --------------------------------------------------------

--
-- Table structure for table `friend_requests`
--

CREATE TABLE `friend_requests` (
  `id` int(11) NOT NULL,
  `user_to` varchar(50) NOT NULL,
  `user_from` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `friend_requests`
--

INSERT INTO `friend_requests` (`id`, `user_to`, `user_from`) VALUES
(8, 'Jimmy_Elvis', 'jane_brisbane'),
(9, 'Jimmy_Elvis', 'robbie_jinjoe'),
(11, 'debbie_kerrigan', 'dylancougar'),
(27, 'jimmy_elvis', 'mark_michaels'),
(32, 'jimmy_elvis', 'naomi_jonas'),
(33, 'mark_michaels', 'naomi_jonas'),
(46, 'robbie_jinjoe', 'hurcut_brace'),
(61, 'jimmy_elvis', 'kerry_walsh'),
(62, 'tate_robbins', 'kerry_walsh'),
(64, 'debbie_kerrigan', 'kerry_walsh'),
(75, 'Jimmy_Elvis', 'susie_swanson'),
(76, 'beth_hart', 'aria_grady'),
(77, 'veronica_webber', 'aria_grady'),
(78, 'veronica_webber', 'bob_harden'),
(79, 'aria_grady', 'bob_harden'),
(80, 'fred_vann', 'tom_greg'),
(82, 'tom_greg', 'raq_smith'),
(83, 'mark_hallums', 'ace_caracer'),
(84, 'mark_hallums', 'jane_brisbane'),
(85, 'mark_hallums', 'bob_harden'),
(86, 'mark_hallums', 'vernon_dells'),
(87, 'mark_hallums', 'rusby_huggins');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `post_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `username`, `post_id`) VALUES
(23, 'megan_shurnur', 141),
(25, 'vernon_dells', 141),
(26, 'jane_brisbane', 141),
(29, 'dylancougar', 141),
(30, 'dylancougar', 145),
(31, 'naomi_jonas', 145),
(32, 'naomi_jonas', 141),
(35, 'mark_michaels', 145),
(39, 'mark_michaels', 141),
(41, 'dylancougar', 146),
(42, 'dylancougar', 151),
(62, 'dylancougar', 162),
(64, 'ana_ramos', 156),
(65, 'hurcut_brace', 156),
(66, 'megan_shurnur', 156),
(67, 'jane_brisbane', 156),
(99, 'dylancougar', 172),
(102, 'vernon_dells', 156),
(109, 'dylancougar', 156),
(112, 'tate_robbins', 156),
(119, 'rusby_huggins', 145),
(123, 'hurcut_brace', 150),
(124, 'ana_ramos', 150),
(135, 'dylancougar', 150),
(136, 'rusby_huggins', 150),
(137, 'dylancougar', 174),
(138, 'naomi_jonas', 156),
(139, 'jane_brisbane', 171),
(140, 'jane_brisbane', 175),
(141, 'naomi_jonas', 175),
(142, 'ana_ramos', 170),
(143, 'ana_ramos', 172),
(144, 'ana_ramos', 157),
(145, 'jane_brisbane', 146),
(146, 'naomi_jonas', 151),
(150, 'debbie_kerrigan', 146),
(151, 'naomi_jonas', 152),
(152, 'kerry_walsh', 152),
(153, 'kerry_walsh', 157),
(154, 'kalon_nunez', 157),
(155, 'jimmy_smith', 156),
(156, 'phil_brooks', 174),
(157, 'dylancougar', 175),
(158, 'vernon_dells', 175),
(159, 'rusby_huggins', 175);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_to` varchar(50) NOT NULL,
  `user_from` varchar(50) NOT NULL,
  `body` text NOT NULL,
  `date` datetime NOT NULL,
  `opened` varchar(3) NOT NULL,
  `viewed` varchar(3) NOT NULL,
  `deleted` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_to`, `user_from`, `body`, `date`, `opened`, `viewed`, `deleted`) VALUES
(45, 'robbie_jinjoe', 'dylancougar', 'uiliuluiluil', '2018-03-26 18:03:05', 'yes', 'yes', 'no'),
(46, 'hurcut_brace', 'dylancougar', 'op\'op\'op\'po', '2018-03-26 18:05:11', 'yes', 'yes', 'no'),
(47, 'rusby_huggins', 'dylancougar', 'What\'s up man', '2018-03-26 18:05:42', 'yes', 'yes', 'no'),
(48, 'kalon_nunez', 'dylancougar', '9876yuoyui', '2018-03-26 18:06:10', 'yes', 'yes', 'no'),
(49, 'vernon_dells', 'dylancougar', ';jk;jk;jk;', '2018-03-26 18:07:07', 'yes', 'yes', 'no'),
(50, 'susie_swanson', 'dylancougar', 'tytyityityik', '2018-03-26 18:07:55', 'yes', 'yes', 'no'),
(51, 'susie_swanson', 'dylancougar', 'uyloyulhyu', '2018-03-26 18:08:18', 'yes', 'yes', 'no'),
(52, 'megan_shurnur', 'dylancougar', 'bdfbdfbb', '2018-03-26 18:55:17', 'yes', 'yes', 'no'),
(53, 'megan_shurnur', 'dylancougar', 'dfdffdnfd', '2018-03-26 18:55:44', 'yes', 'yes', 'no'),
(54, 'megan_shurnur', 'dylancougar', 'hi', '2018-04-26 18:28:56', 'yes', 'yes', 'no'),
(55, 'megan_shurnur', 'dylancougar', 'how', '2018-04-26 19:07:02', 'yes', 'yes', 'no'),
(56, 'dylancougar', 'megan_shurnur', 'Hey', '2018-04-27 10:55:46', 'yes', 'yes', 'no'),
(57, 'megan_shurnur', 'dylancougar', 'gurl', '2018-04-27 10:56:46', 'yes', 'yes', 'no'),
(58, 'dylancougar', 'megan_shurnur', 'boy', '2018-04-27 10:56:57', 'yes', 'yes', 'no'),
(59, 'megan_shurnur', 'dylancougar', 'girl', '2018-04-27 13:37:09', 'yes', 'yes', 'no'),
(60, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:37:27', 'yes', 'yes', 'no'),
(61, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:38:35', 'yes', 'yes', 'no'),
(62, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:39:04', 'yes', 'yes', 'no'),
(63, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:40:21', 'yes', 'yes', 'no'),
(64, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:40:30', 'yes', 'yes', 'no'),
(65, 'megan_shurnur', 'dylancougar', 'yo', '2018-04-29 14:46:01', 'yes', 'yes', 'no'),
(66, 'megan_shurnur', 'dylancougar', 'yooooooooooooooooooo', '2018-05-01 17:12:05', 'yes', 'yes', 'no'),
(67, 'megan_shurnur', 'dylancougar', 'heyyyyyyyyyyyyyyyyyyyyyyyyy', '2018-05-01 17:34:57', 'yes', 'yes', 'no'),
(68, 'vernon_dells', 'dylancougar', 'hey man', '2018-05-01 17:35:09', 'no', 'yes', 'no'),
(69, 'dylancougar', 'hurcut_brace', 'Hey man', '2021-03-27 18:08:14', 'yes', 'yes', 'no'),
(70, 'dylancougar', 'hurcut_brace', 'yo', '2021-03-27 18:08:22', 'yes', 'yes', 'no'),
(71, 'naomi_jonas', 'hurcut_brace', 'hey now', '2021-03-27 18:08:55', 'no', 'yes', 'no'),
(72, 'kalon_nunez', 'ana_ramos', 'hey', '2021-04-02 20:34:51', 'yes', 'yes', 'no'),
(73, 'ana_ramos', 'kalon_nunez', 'hey you', '2021-04-02 20:35:14', 'yes', 'yes', 'no'),
(74, 'kalon_nunez', 'ana_ramos', 'what\'s up', '2021-04-02 20:36:03', 'yes', 'yes', 'no'),
(75, 'ana_ramos', 'kalon_nunez', 'hey you', '2021-04-02 20:36:20', 'yes', 'yes', 'no'),
(76, 'kalon_nunez', 'dylancougar', 'wefewffew', '2021-05-15 12:19:00', 'yes', 'yes', 'no'),
(77, 'dylancougar', 'kalon_nunez', 'fwgewgwg', '2021-05-15 12:22:20', 'yes', 'yes', 'no'),
(78, 'kalon_nunez', 'dylancougar', 'wefewffew', '2021-05-15 12:22:27', 'no', 'yes', 'no'),
(79, 'dylancougar', 'rusby_huggins', 'Hey dude', '2021-06-07 17:27:28', 'yes', 'yes', 'no'),
(80, 'hurcut_brace', 'rusby_huggins', 'Hey Guy', '2021-06-07 17:29:44', 'yes', 'yes', 'no'),
(81, 'hurcut_brace', 'rusby_huggins', 'Said Hey man', '2021-06-07 17:31:49', 'yes', 'yes', 'no'),
(82, 'naomi_jonas', 'rusby_huggins', 'hey  girl', '2021-06-10 16:50:16', 'yes', 'yes', 'no'),
(83, 'hurcut_brace', 'rusby_huggins', 'Awessome', '2021-06-10 19:04:12', 'yes', 'yes', 'no'),
(84, 'hurcut_brace', 'rusby_huggins', 'Awessome', '2021-06-12 10:31:14', 'yes', 'yes', 'no'),
(85, 'dylancougar', 'robbie_jinjoe', 'What\'s going on man', '2021-06-19 13:04:46', 'yes', 'yes', 'no'),
(86, 'rusby_huggins', 'naomi_jonas', 'Hi', '2021-06-19 13:05:26', 'yes', 'yes', 'no'),
(87, 'kalon_nunez', 'ana_ramos', 'Hiya', '2021-06-19 13:07:11', 'yes', 'yes', 'no'),
(88, 'dylancougar', 'ana_ramos', 'hiya', '2021-06-19 13:09:52', 'yes', 'yes', 'no'),
(89, 'susie_swanson', 'megan_shurnur', 'whats up', '2021-06-26 15:12:15', 'no', 'yes', 'no'),
(90, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:43:25', 'no', 'no', 'no'),
(91, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:47:53', 'no', 'no', 'no'),
(92, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:49:44', 'no', 'no', 'no'),
(93, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:50:45', 'no', 'no', 'no'),
(94, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:52:00', 'no', 'no', 'no'),
(95, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:52:47', 'no', 'no', 'no'),
(96, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:54:24', 'no', 'no', 'no'),
(97, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:57:06', 'no', 'no', 'no'),
(98, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 12:58:23', 'no', 'no', 'no'),
(99, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:02:48', 'no', 'no', 'no'),
(100, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:06:19', 'no', 'no', 'no'),
(101, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:07:29', 'no', 'no', 'no'),
(102, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:08:13', 'no', 'no', 'no'),
(103, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:15:20', 'no', 'no', 'no'),
(104, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:15:43', 'no', 'no', 'no'),
(105, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:15:50', 'no', 'no', 'no'),
(106, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:16:42', 'no', 'no', 'no'),
(107, 'megan_shurnur', 'dylancougar', 'Whats up', '2021-07-04 13:16:49', 'no', 'no', 'no'),
(108, 'dylancougar', 'kerry_walsh', 'Hey man', '2021-08-07 18:50:58', 'no', 'yes', 'no');

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
(29, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2018-04-26 21:59:13', 'yes', 'yes', 145),
(30, 'dylancougar', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=145', '2018-04-26 22:22:15', 'yes', 'yes', 145),
(31, 'megan_shurnur', 'jane_brisbane', 'Jane Brisbane commented on a post you commented on', 'post.php?id=145', '2018-04-26 22:22:15', 'yes', 'yes', 145),
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
(46, 'megan_shurnur', 'hurcut_brace', 'Hurcut Brace commented on a post you commented on', 'post.php?id=145', '2021-03-23 19:03:26', 'yes', 'yes', 145),
(47, 'jane_brisbane', 'hurcut_brace', 'Hurcut Brace commented on a post you commented on', 'post.php?id=145', '2021-03-23 19:03:26', 'no', 'yes', 145),
(48, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2021-04-24 16:13:45', 'yes', 'yes', 145),
(49, 'jane_brisbane', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2021-04-24 16:13:45', 'no', 'yes', 145),
(50, 'hurcut_brace', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2021-04-24 16:13:45', 'yes', 'yes', 145),
(51, 'dylancougar', 'rusby_huggins', 'Rusby Huggins liked your post', 'post.php?id=145', '2021-07-23 13:04:55', 'yes', 'yes', 145),
(52, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:36:22', 'yes', 'yes', 150),
(53, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:41:08', 'yes', 'yes', 150),
(54, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:41:12', 'yes', 'yes', 150),
(55, 'hurcut_brace', 'hurcut_brace', 'Hurcut Brace liked your post', 'post.php?id=150', '2021-07-25 09:41:35', 'yes', 'yes', 150),
(56, 'hurcut_brace', 'ana_ramos', 'Ana Ramos liked your post', 'post.php?id=150', '2021-07-25 09:41:58', 'yes', 'yes', 150),
(57, 'hurcut_brace', 'rusby_huggins', 'Rusby Huggins liked your post', 'post.php?id=150', '2021-07-25 09:43:29', 'yes', 'yes', 150),
(58, 'hurcut_brace', 'rusby_huggins', 'Rusby Huggins liked your post', 'post.php?id=150', '2021-07-25 09:44:33', 'yes', 'yes', 150),
(59, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:45:21', 'yes', 'yes', 150),
(60, 'hurcut_brace', 'rusby_huggins', 'Rusby Huggins liked your post', 'post.php?id=150', '2021-07-25 09:45:24', 'yes', 'yes', 150),
(61, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:45:36', 'yes', 'yes', 150),
(62, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:48:09', 'yes', 'yes', 150),
(63, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:49:28', 'yes', 'yes', 150),
(64, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 09:51:09', 'no', 'yes', 150),
(65, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 10:27:15', 'no', 'yes', 150),
(66, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 10:29:19', 'no', 'yes', 150),
(67, 'hurcut_brace', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=150', '2021-07-25 10:29:28', 'no', 'yes', 150),
(68, 'hurcut_brace', 'rusby_huggins', 'Rusby Huggins liked your post', 'post.php?id=150', '2021-07-25 10:30:12', 'no', 'yes', 150),
(69, 'dylancougar', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=174', '2021-07-25 13:34:54', 'no', 'yes', 174),
(70, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=176', '2021-07-25 15:42:12', 'yes', 'yes', 176),
(71, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=176', '2021-07-25 15:43:02', 'yes', 'yes', 176),
(72, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=176', '2021-07-25 16:00:09', 'yes', 'yes', 176),
(73, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=176', '2021-07-25 16:00:34', 'yes', 'yes', 176),
(74, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=176', '2021-07-25 16:09:29', 'yes', 'yes', 176),
(75, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=176', '2021-07-25 16:14:58', 'yes', 'yes', 176),
(76, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=176', '2021-07-25 16:15:13', 'yes', 'yes', 176),
(77, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=176', '2021-07-25 16:15:19', 'yes', 'yes', 176),
(78, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=176', '2021-07-25 16:16:01', 'yes', 'yes', 176),
(79, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=176', '2021-07-25 16:16:36', 'yes', 'yes', 176),
(80, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=176', '2021-07-25 16:16:46', 'yes', 'yes', 176),
(81, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=175', '2021-07-25 20:49:45', 'yes', 'yes', 175),
(82, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=175', '2021-07-25 20:49:58', 'yes', 'yes', 175),
(83, 'dylancougar', 'naomi_jonas', 'Naomi Jonas commented on your post', 'post.php?id=156', '2021-07-25 22:11:17', 'no', 'yes', 156),
(84, 'jane_brisbane', 'naomi_jonas', 'Naomi Jonas commented on a post you commented on', 'post.php?id=156', '2021-07-25 22:11:17', 'yes', 'yes', 156),
(85, 'kerry_walsh', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=171', '2021-07-25 22:12:42', 'no', 'yes', 171),
(86, 'ana_ramos', 'kalon_nunez', 'Kalon Nunez commented on your post', 'post.php?id=157', '2021-07-25 22:14:31', 'yes', 'yes', 157),
(87, 'kalon_nunez', 'ana_ramos', 'Ana Ramos commented on a post you commented on', 'post.php?id=157', '2021-07-25 22:15:46', 'yes', 'yes', 157),
(88, 'dylancougar', 'ana_ramos', 'Ana Ramos commented on your post', 'post.php?id=156', '2021-07-25 22:31:16', 'no', 'yes', 156),
(89, 'jane_brisbane', 'ana_ramos', 'Ana Ramos commented on a post you commented on', 'post.php?id=156', '2021-07-25 22:31:16', 'no', 'no', 156),
(90, 'naomi_jonas', 'ana_ramos', 'Ana Ramos commented on a post you commented on', 'post.php?id=156', '2021-07-25 22:31:16', 'yes', 'yes', 156),
(91, 'dylancougar', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=156', '2021-07-25 22:32:01', 'no', 'yes', 156),
(92, 'kerry_walsh', 'jane_brisbane', 'Jane Brisbane liked your post', 'post.php?id=171', '2021-07-25 22:32:19', 'no', 'yes', 171),
(93, 'naomi_jonas', 'jane_brisbane', 'Jane Brisbane liked your post', 'post.php?id=175', '2021-07-25 22:32:31', 'yes', 'yes', 175),
(94, 'naomi_jonas', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=175', '2021-07-25 22:32:50', 'yes', 'yes', 175),
(95, 'tate_robbins', 'ana_ramos', 'Ana Ramos liked your post', 'post.php?id=170', '2021-07-25 22:33:25', 'no', 'yes', 170),
(96, 'rusby_huggins', 'ana_ramos', 'Ana Ramos liked your post', 'post.php?id=172', '2021-07-25 22:33:50', 'no', 'yes', 172),
(97, 'ana_ramos', 'ana_ramos', 'Ana Ramos liked your post', 'post.php?id=157', '2021-07-25 22:34:06', 'no', 'yes', 157),
(98, 'megan_shurnur', 'jane_brisbane', 'Jane Brisbane liked your post', 'post.php?id=146', '2021-07-25 22:34:22', 'no', 'no', 146),
(99, 'megan_shurnur', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=146', '2021-07-25 22:34:45', 'no', 'no', 146),
(100, 'dylancougar', 'jane_brisbane', 'Jane Brisbane commented on a post you commented on', 'post.php?id=146', '2021-07-25 22:34:45', 'no', 'yes', 146),
(101, 'hurcut_brace', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=151', '2021-07-25 22:35:33', 'no', 'yes', 151),
(102, 'megan_shurnur', 'debbie_kerrigan', 'Debbie Kerrigan liked your post', 'post.php?id=146', '2021-08-01 10:36:35', 'no', 'no', 146),
(103, 'megan_shurnur', 'debbie_kerrigan', 'Debbie Kerrigan liked your post', 'post.php?id=146', '2021-08-01 13:42:08', 'no', 'no', 146),
(104, 'megan_shurnur', 'debbie_kerrigan', 'Debbie Kerrigan liked your post', 'post.php?id=146', '2021-08-01 13:42:21', 'no', 'no', 146),
(105, 'megan_shurnur', 'debbie_kerrigan', 'Debbie Kerrigan liked your post', 'post.php?id=146', '2021-08-01 13:43:06', 'no', 'no', 146),
(106, 'hurcut_brace', 'naomi_jonas', 'Naomi Jonas commented on your post', 'post.php?id=152', '2021-08-07 21:03:37', 'no', 'no', 152),
(107, 'hurcut_brace', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=152', '2021-08-07 21:04:07', 'no', 'no', 152),
(108, 'hurcut_brace', 'kerry_walsh', 'Kerry Walsh liked your post', 'post.php?id=152', '2021-08-07 21:09:30', 'no', 'no', 152),
(109, 'hurcut_brace', 'kerry_walsh', 'Kerry Walsh commented on your post', 'post.php?id=152', '2021-08-07 21:10:13', 'no', 'no', 152),
(110, 'naomi_jonas', 'kerry_walsh', 'Kerry Walsh commented on a post you commented on', 'post.php?id=152', '2021-08-07 21:10:13', 'no', 'no', 152),
(111, 'ana_ramos', 'kerry_walsh', 'Kerry Walsh liked your post', 'post.php?id=157', '2021-08-07 21:14:02', 'no', 'no', 157),
(112, 'ana_ramos', 'kerry_walsh', 'Kerry Walsh commented on your post', 'post.php?id=157', '2021-08-07 21:14:15', 'no', 'no', 157),
(113, 'kalon_nunez', 'kerry_walsh', 'Kerry Walsh commented on a post you commented on', 'post.php?id=157', '2021-08-07 21:14:15', 'yes', 'yes', 157),
(114, 'ana_ramos', 'kalon_nunez', 'Kalon Nunez liked your post', 'post.php?id=157', '2021-08-08 14:45:58', 'no', 'no', 157),
(115, 'naomi_jonas', 'dylancougar', 'Dylan Cougar commented on your post', 'post.php?id=175', '2021-08-23 20:08:21', 'no', 'no', 175),
(116, 'jane_brisbane', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=175', '2021-08-23 20:08:21', 'no', 'no', 175),
(117, 'dylancougar', 'jimmy_smith', 'Jimmy Smith liked your post', 'post.php?id=156', '2021-08-30 19:08:29', 'no', 'no', 156),
(118, 'dylancougar', 'jimmy_smith', 'Jimmy Smith commented on your post', 'post.php?id=156', '2021-08-30 19:08:46', 'no', 'no', 156),
(119, 'jane_brisbane', 'jimmy_smith', 'Jimmy Smith commented on a post you commented on', 'post.php?id=156', '2021-08-30 19:08:46', 'no', 'no', 156),
(120, 'naomi_jonas', 'jimmy_smith', 'Jimmy Smith commented on a post you commented on', 'post.php?id=156', '2021-08-30 19:08:46', 'no', 'no', 156),
(121, 'ana_ramos', 'jimmy_smith', 'Jimmy Smith commented on a post you commented on', 'post.php?id=156', '2021-08-30 19:08:46', 'no', 'no', 156),
(122, 'dylancougar', 'phil_brooks', 'Phil Brooks liked your post', 'post.php?id=174', '2021-09-02 12:22:15', 'no', 'no', 174),
(123, 'dylancougar', 'phil_brooks', 'Phil Brooks commented on your post', 'post.php?id=174', '2021-09-02 12:31:21', 'no', 'no', 174),
(124, 'naomi_jonas', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=175', '2021-09-06 19:06:15', 'no', 'no', 175),
(125, 'naomi_jonas', 'vernon_dells', 'Vernon Dells liked your post', 'post.php?id=175', '2021-09-06 19:07:58', 'no', 'no', 175),
(126, 'naomi_jonas', 'vernon_dells', 'Vernon Dells commented on your post', 'post.php?id=175', '2021-09-06 19:08:12', 'no', 'no', 175),
(127, 'jane_brisbane', 'vernon_dells', 'Vernon Dells commented on a post you commented on', 'post.php?id=175', '2021-09-06 19:08:12', 'no', 'no', 175),
(128, 'dylancougar', 'vernon_dells', 'Vernon Dells commented on a post you commented on', 'post.php?id=175', '2021-09-06 19:08:12', 'no', 'no', 175),
(129, 'naomi_jonas', 'rusby_huggins', 'Rusby Huggins liked your post', 'post.php?id=175', '2021-09-06 19:10:27', 'no', 'no', 175),
(130, 'naomi_jonas', 'rusby_huggins', 'Rusby Huggins commented on your post', 'post.php?id=175', '2021-09-06 19:10:43', 'no', 'no', 175),
(131, 'jane_brisbane', 'rusby_huggins', 'Rusby Huggins commented on a post you commented on', 'post.php?id=175', '2021-09-06 19:10:43', 'no', 'no', 175),
(132, 'dylancougar', 'rusby_huggins', 'Rusby Huggins commented on a post you commented on', 'post.php?id=175', '2021-09-06 19:10:43', 'no', 'no', 175),
(133, 'vernon_dells', 'rusby_huggins', 'Rusby Huggins commented on a post you commented on', 'post.php?id=175', '2021-09-06 19:10:43', 'no', 'no', 175);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `body` text NOT NULL,
  `heading` varchar(255) NOT NULL,
  `added_by` varchar(60) NOT NULL,
  `user_to` varchar(60) NOT NULL,
  `date_added` datetime NOT NULL,
  `user_closeed` varchar(3) NOT NULL,
  `deleted` varchar(3) NOT NULL,
  `likes` int(11) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `body`, `heading`, `added_by`, `user_to`, `date_added`, `user_closeed`, `deleted`, `likes`, `image`) VALUES
(141, 'Lorem ipsum dolor amet fam squid microdosing, kinfolk gluten-free literally marfa unicorn offal typewriter af. Readymade hexagon migas normcore affogato tote bag man bun. Next level hexagon disrupt, tbh jianbing green juice aesthetic raclette ethical microdosing. Post-ironic skateboard farm-to-table dreamcatcher. Hella next level offal snackwave. Godard put a bird on it slow-carb occupy, XOXO narwhal air plant selvage jianbing forage gentrify viral austin wolf vape. Green juice hell of fingerstache, tumeric pour-over dreamcatcher pok pok irony yr meditation.\r\n\r\nPug palo santo fixie cray schlitz offal activated charcoal. Tattooed prism hot chicken aesthetic wayfarers asymmetrical. Lomo tumblr cred man braid, chicharrones squid slow-carb lo-fi glossier yr sriracha shoreditch drinking vinegar. Tumeric 8-bit leggings, yuccie fam keytar cardigan. Palo santo readymade seitan, hexagon next level unicorn migas freegan salvia DIY man bun tofu pork belly knausgaard mumblecore. Raclette artisan pitchfork neutra forage paleo iPhone man bun. Celiac yr kitsch quinoa XOXO plaid austin messenger bag jean shorts.', 'Kitchen Dreams', 'dylancougar', 'none', '2018-04-23 20:57:12', 'no', 'no', 6, 'assets/img/posts/5ade9d08407e0pexels-photo-534151.jpeg'),
(145, 'jianbing green juice aesthetic raclette ethical microdosing. Post-ironic skateboard farm-to-table dreamcatcher. Hella next level offal snackwave. Godard put a bird on it slow-carb occupy, XOXO narwhal air plant selvage jianbing forage gentrify viral austin wolf vape. Green juice hell of fingerstache, tumeric pour-over dreamcatcher pok pok irony yr meditation. Pug palo santo fixie cray schlitz offal activated charcoal. Tattooed prism hot chicken aesthetic wayfarers asymmetrical. Lomo tumblr cred man braid, chicharrones squid slow-carb lo-fi glossier yr sriracha shoreditch drinking vinegar. Tumeric 8-bit leggings, yuccie fam keytar cardigan. Palo santo readymade seitan, hexagon next level unicorn ', 'Appricot Goodness', 'dylancougar', 'none', '2018-04-26 16:46:14', 'no', 'no', 4, 'assets/img/posts/5ae256b66154dapricot-food-fruit-7961.jpg'),
(146, 'jianbing green juice aesthetic raclette ethical microdosing. Post-ironic skateboard farm-to-table dreamcatcher. Hella next level offal snackwave. Godard put a bird on it slow-carb occupy, XOXO narwhal air plant selvage jianbing forage gentrify viral austin wolf vape. Green juice hell of fingerstache, tumeric pour-over dreamcatcher pok pok irony yr meditation. Pug palo santo fixie cray schlitz offal activated charcoal. Tattooed prism hot chicken aesthetic wayfarers asymmetrical. Lomo tumblr cred man braid, chicharrones squid slow-carb lo-fi glossier yr sriracha shoreditch drinking vinegar. Tumeric 8-bit leggings, yuccie fam keytar cardigan. Palo santo readymade seitan, hexagon next level unicorn ', 'Blueberries', 'megan_shurnur', 'none', '2018-04-26 16:48:00', 'no', 'no', 3, 'assets/img/posts/5ae257206d8bbberries-blur-close-up-272242.jpg'),
(148, 'Orci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n', 'Awesome Salmon', 'hurcut_brace', 'none', '2018-05-02 14:22:13', 'no', 'no', 0, 'assets/img/posts/5aea1df5ea9bcclose-up-cooking-cuisine-629093.jpg'),
(150, 'Dui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.', 'Cool Strawberry Smoothie', 'hurcut_brace', 'none', '2018-05-02 16:39:27', 'no', 'no', 4, 'assets/img/posts/pexels-photo-3679973.jpg'),
(151, 'Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. ', 'My Favorite Type Of Cheese', 'hurcut_brace', 'none', '2018-05-02 16:39:37', 'no', 'no', 2, 'assets/img/posts/pexels-photo-821365.jpg'),
(152, 'Sapien pellentesque habitant morbi tristique. Malesuada fames ac turpis egestas sed tempus. Nulla malesuada pellentesque elit eget gravida cum sociis natoque. Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Enim nec dui nunc mattis. Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Malesuada fames ac turpis egestas sed. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Dignissim sodales ut eu sem integer.', 'Great Coffee', 'hurcut_brace', 'none', '2021-03-28 13:44:42', 'no', 'no', 2, 'assets/img/posts/6060dca9e5274pexels-ylanite-koppens-796614.jpg'),
(156, 'Et netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.', 'Creamy Shrimp Soup', 'dylancougar', 'none', '2021-07-05 13:58:13', 'no', 'no', 9, 'assets/img/posts/60e36455b53ddbowl-cooking-creamy-688802.jpg'),
(157, 'Tincidunt lobortis feugiat vivamus at augue. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Aliquam malesuada bibendum arcu vitae. ', 'Coffee And Cookies', 'ana_ramos', 'none', '2021-07-05 14:00:43', 'no', 'no', 3, 'assets/img/posts/60e364ea97b80pexels-brigitte-tohm-189537.jpg'),
(159, 'Orci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.', 'Awesome Burger And Fries', 'sara_green', 'none', '2021-07-05 14:05:06', 'no', 'no', 0, 'assets/img/posts/60e365f1a5698pexels-photo-70497.jpg'),
(160, 'Tincidunt lobortis feugiat vivamus at augue. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Aliquam malesuada bibendum arcu vitae. Est ultricies integer quis auctor elit sed vulputate. Lorem mollis aliquam ut porttitor leo a diam. In iaculis nunc sed augue lacus viverra vitae. Faucibus in ornare quam viverra orci. Tellus orci ac auctor augue mauris augue neque. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Nibh sed pulvinar proin gravida hendrerit lectus. Quam pellentesque nec nam aliquam sem et tortor. Sodales neque sodales ut etiam. A arcu cursus vitae congue.', 'Fried Rice With Eggs', 'sara_green', 'none', '2021-07-05 14:08:46', 'no', 'no', 0, 'assets/img/posts/60e366ce315a5egg-food-fried-rice-53121.jpg'),
(161, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Scelerisque in dictum non consectetur a. Lectus mauris ultrices eros in cursus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Sit amet mauris commodo quis. Viverra mauris in aliquam sem fringilla ut morbi. Dapibus ultrices in iaculis nunc. Iaculis urna id volutpat lacus laoreet non. Et pharetra pharetra massa massa ultricies mi quis. Ultricies integer quis auctor elit. Arcu cursus vitae congue mauris rhoncus. Id eu nisl nunc mi. Amet aliquam id diam maecenas ultricies mi. Ullamcorper sit amet risus nullam. Mattis nunc sed blandit libero volutpat sed cras. Enim sed faucibus turpis in eu mi. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Consectetur purus ut faucibus pulvinar elementum integer.\r\n\r\nOrci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.\r\n\r\nTincidunt lobortis feugiat vivamus at augue. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Aliquam malesuada bibendum arcu vitae. Est ultricies integer quis auctor elit sed vulputate. Lorem mollis aliquam ut porttitor leo a diam. In iaculis nunc sed augue lacus viverra vitae. Faucibus in ornare quam viverra orci. Tellus orci ac auctor augue mauris augue neque. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Nibh sed pulvinar proin gravida hendrerit lectus. Quam pellentesque nec nam aliquam sem et tortor. Sodales neque sodales ut etiam. A arcu cursus vitae congue.', 'My Awesome Coffee Recipe', 'mark_michaels', 'none', '2021-07-05 14:11:40', 'no', 'no', 0, 'assets/img/posts/60e3677c0cc5dcoffee-PD8NC5H.jpg'),
(162, 'Orci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.', 'My Grilled Cheese Recipe', 'naomi_jonas', 'none', '2021-07-05 14:15:54', 'no', 'no', 0, 'assets/img/posts/60e36879e56f5pexels-photo-1600711.jpg'),
(167, 'Orci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. ', 'Chili Lime Tacos', 'naomi_jonas', 'none', '2021-07-05 14:42:34', 'no', 'no', 0, 'assets/img/posts/60e36eba4f462pexels-photo-461198.jpg'),
(168, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Scelerisque in dictum non consectetur a. Lectus mauris ultrices eros in cursus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Sit amet mauris commodo quis. Viverra mauris in aliquam sem fringilla ut morbi. Dapibus ultrices in iaculis nunc. Iaculis urna id volutpat lacus laoreet non. Et pharetra pharetra massa massa ultricies mi quis. Ultricies integer quis auctor elit. Arcu cursus vitae congue mauris rhoncus. Id eu nisl nunc mi. Amet aliquam id diam maecenas ultricies mi. Ullamcorper sit amet risus nullam. Mattis nunc sed blandit libero volutpat sed cras. Enim sed faucibus turpis in eu mi. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Consectetur purus ut faucibus pulvinar elementum integer.\r\n\r\nOrci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.\r\n\r\nTincidunt lobortis feugiat vivamus at augue. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Aliquam malesuada bibendum arcu vitae. Est ultricies integer quis auctor elit sed vulputate. Lorem mollis aliquam ut porttitor leo a diam. In iaculis nunc sed augue lacus viverra vitae. Faucibus in ornare quam viverra orci. Tellus orci ac auctor augue mauris augue neque. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Nibh sed pulvinar proin gravida hendrerit lectus. Quam pellentesque nec nam aliquam sem et tortor. Sodales neque sodales ut etiam. A arcu cursus vitae congue.', 'A Strawberry Recipe, I found.', 'sara_green', 'none', '2021-07-05 14:43:39', 'no', 'no', 0, 'assets/img/posts/60e36efb82c22pexels-photo-376464.jpg'),
(169, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Scelerisque in dictum non consectetur a. Lectus mauris ultrices eros in cursus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Sit amet mauris commodo quis. Viverra mauris in aliquam sem fringilla ut morbi. Dapibus ultrices in iaculis nunc. Iaculis urna id volutpat lacus laoreet non. Et pharetra pharetra massa massa ultricies mi quis. Ultricies integer quis auctor elit. Arcu cursus vitae congue mauris rhoncus. Id eu nisl nunc mi. Amet aliquam id diam maecenas ultricies mi. Ullamcorper sit amet risus nullam. Mattis nunc sed blandit libero volutpat sed cras. Enim sed faucibus turpis in eu mi. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Consectetur purus ut faucibus pulvinar elementum integer.\r\n\r\nOrci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.\r\n\r\nTincidunt lobortis feugiat vivamus at augue. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Tortor at auctor urna nunc id cursus metus aliquam eleifend. Aliquam malesuada bibendum arcu vitae. Est ultricies integer quis auctor elit sed vulputate. Lorem mollis aliquam ut porttitor leo a diam. In iaculis nunc sed augue lacus viverra vitae. Faucibus in ornare quam viverra orci. Tellus orci ac auctor augue mauris augue neque. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Nibh sed pulvinar proin gravida hendrerit lectus. Quam pellentesque nec nam aliquam sem et tortor. Sodales neque sodales ut etiam. A arcu cursus vitae congue.', 'My Favorite Fruit', 'ace_caracer', 'none', '2021-07-05 14:45:14', 'no', 'no', 0, 'assets/img/posts/60e36f5a1d94bpexels-photo-209449.jpg'),
(170, 'Id eu nisl nunc mi. Amet aliquam id diam maecenas ultricies mi. Ullamcorper sit amet risus nullam. Mattis nunc sed blandit libero volutpat sed cras. Enim sed faucibus turpis in eu mi. At risus viverra adipiscing at in tellus integer feugiat scelerisque. Consectetur purus ut faucibus pulvinar elementum integer.\r\n\r\nOrci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit.', 'Anything Wrapped in bacon is cool.', 'tate_robbins', 'none', '2021-07-05 14:47:05', 'no', 'no', 1, 'assets/img/posts/60e36fc999ec0pexels-photo-416471.jpg'),
(171, 'Et netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.', 'I never tried a pizza like this before', 'kerry_walsh', 'none', '2021-07-05 14:49:45', 'no', 'no', 1, 'assets/img/posts/60e37068b1609pexels-photo-1260968.jpg'),
(172, 'Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim.', 'A cupcake recipe I found', 'rusby_huggins', 'none', '2021-07-05 14:52:29', 'no', 'no', 2, 'assets/img/posts/60e3710d5366dpexels-photo-853006.jpg'),
(173, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas fringilla phasellus faucibus scelerisque eleifend. Lacus sed turpis tincidunt id. In eu mi bibendum neque egestas congue quisque egestas diam. Et magnis dis parturient montes nascetur ridiculus mus. Semper viverra nam libero justo laoreet sit. Cras semper auctor neque vitae. Magna ac placerat vestibulum lectus mauris ultrices. Leo duis ut diam quam nulla porttitor massa. Pretium lectus quam id leo in. Sed tempus urna et pharetra pharetra massa massa.Condimentum lacinia quis vel eros donec ac. In dictum non consectetur a erat nam at lectus. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Dictum non consectetur a erat nam at lectus. Ultricies mi quis hendrerit dolor magna eget est lorem. Eros in cursus turpis massa tincidunt. Elit at imperdiet dui accumsan sit amet nulla facilisi. Sodales ut etiam sit amet nisl. A cras semper auctor neque vitae tempus quam pellentesque. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Ipsum dolor sit amet consectetur adipiscing. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Elementum facilisis leo vel fringilla est ullamcorper eget. Aenean et tortor at risus viverra adipiscing at. Odio morbi quis commodo odio aenean sed adipiscing diam donec.Aliquet risus feugiat in ante metus dictum at. Pellentesque elit eget gravida cum sociis natoque penatibus et. Elementum integer enim neque volutpat ac tincidunt vitae. Tempor nec feugiat nisl pretium fusce id velit ut. Enim nulla aliquet porttitor lacus luctus accumsan. Libero enim sed faucibus turpis in eu. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Lectus proin nibh nisl condimentum id venenatis a. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Iaculis urna id volutpat lacus. Purus sit amet volutpat consequat mauris. Bibendum arcu vitae elementum curabitur vitae nunc. Scelerisque in dictum non consectetur. Ultrices tincidunt arcu non sodales neque. Libero justo laoreet sit amet cursus sit amet. Feugiat in fermentum posuere urna nec tincidunt. Ultrices dui sapien eget mi proin sed. Leo vel orci porta non pulvinar neque laoreet suspendisse. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Mi bibendum neque egestas congue quisque egestas diam.Ut porttitor leo a diam. Cursus euismod quis viverra nibh cras pulvinar. Venenatis a condimentum vitae sapien pellentesque. Integer malesuada nunc vel risus commodo viverra. A scelerisque purus semper eget duis at tellus at urna. Diam vulputate ut pharetra sit amet aliquam. Tempor nec feugiat nisl pretium. Eu feugiat pretium nibh ipsum consequat nisl. Mi bibendum neque egestas congue. Morbi non arcu risus quis varius quam quisque id diam. Odio morbi quis commodo odio.Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Aliquet enim tortor at auctor urna nunc id. In fermentum et sollicitudin ac orci phasellus egestas. Cursus sit amet dictum sit amet justo. Vitae et leo duis ut diam quam. Senectus et netus et malesuada fames ac turpis egestas. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Ipsum dolor sit amet consectetur adipiscing elit. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Et malesuada fames ac turpis egestas. Non consectetur a erat nam at lectus urna duis. Sit amet luctus venenatis lectus magna fringilla. Augue eget arcu dictum varius duis.', 'An Apple For Your Day', 'dylancougar', 'none', '2021-07-25 13:02:58', 'no', 'no', 0, 'assets/img/posts/60fdb562644b2pexels-photo-209449.jpg'),
(174, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas fringilla phasellus faucibus scelerisque eleifend. Lacus sed turpis tincidunt id. In eu mi bibendum neque egestas congue quisque egestas diam. Et magnis dis parturient montes nascetur ridiculus mus. Semper viverra nam libero justo laoreet sit. Cras semper auctor neque vitae. Magna ac placerat vestibulum lectus mauris ultrices. Leo duis ut diam quam nulla porttitor massa. Pretium lectus quam id leo in. Sed tempus urna et pharetra pharetra massa massa.</p><p><br></p><p>Condimentum lacinia quis vel eros donec ac. In dictum non consectetur a erat nam at lectus. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Dictum non consectetur a erat nam at lectus. Ultricies mi quis hendrerit dolor magna eget est lorem. Eros in cursus turpis massa tincidunt. Elit at imperdiet dui accumsan sit amet nulla facilisi. Sodales ut etiam sit amet nisl. A cras semper auctor neque vitae tempus quam pellentesque. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Ipsum dolor sit amet consectetur adipiscing. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Elementum facilisis leo vel fringilla est ullamcorper eget. Aenean et tortor at risus viverra adipiscing at. Odio morbi quis commodo odio aenean sed adipiscing diam donec.</p><p><br></p><p>Aliquet risus feugiat in ante metus dictum at. Pellentesque elit eget gravida cum sociis natoque penatibus et. Elementum integer enim neque volutpat ac tincidunt vitae. Tempor nec feugiat nisl pretium fusce id velit ut. Enim nulla aliquet porttitor lacus luctus accumsan. Libero enim sed faucibus turpis in eu. Lorem ipsum dolor sit amet consectetur adipiscing elit duis. Lectus proin nibh nisl condimentum id venenatis a. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Iaculis urna id volutpat lacus. Purus sit amet volutpat consequat mauris. Bibendum arcu vitae elementum curabitur vitae nunc. Scelerisque in dictum non consectetur. Ultrices tincidunt arcu non sodales neque. Libero justo laoreet sit amet cursus sit amet. Feugiat in fermentum posuere urna nec tincidunt. Ultrices dui sapien eget mi proin sed. Leo vel orci porta non pulvinar neque laoreet suspendisse. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Mi bibendum neque egestas congue quisque egestas diam.</p><p><br></p><p>Ut porttitor leo a diam. Cursus euismod quis viverra nibh cras pulvinar. Venenatis a condimentum vitae sapien pellentesque. Integer malesuada nunc vel risus commodo viverra. A scelerisque purus semper eget duis at tellus at urna. Diam vulputate ut pharetra sit amet aliquam. Tempor nec feugiat nisl pretium. Eu feugiat pretium nibh ipsum consequat nisl. Mi bibendum neque egestas congue. Morbi non arcu risus quis varius quam quisque id diam. Odio morbi quis commodo odio.</p><p><br></p><p>Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Aliquet enim tortor at auctor urna nunc id. In fermentum et sollicitudin ac orci phasellus egestas. Cursus sit amet dictum sit amet justo. Vitae et leo duis ut diam quam. Senectus et netus et malesuada fames ac turpis egestas. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Ipsum dolor sit amet consectetur adipiscing elit. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. Et malesuada fames ac turpis egestas. Non consectetur a erat nam at lectus urna duis. Sit amet luctus venenatis lectus magna fringilla. Augue eget arcu dictum varius duis.</p>', 'Steak Dinner', 'dylancougar', 'none', '2021-07-25 13:25:12', 'no', 'no', 2, 'assets/img/posts/60fdba97a4da4pexels-photo-3535383.jpg'),
(175, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas fringilla phasellus faucibus scelerisque eleifend. Lacus sed turpis tincidunt id. In eu mi bibendum neque egestas congue quisque egestas diam. Et magnis dis parturient montes nascetur ridiculus mus. Semper viverra nam libero justo laoreet sit. Cras semper auctor neque vitae. Magna ac placerat vestibulum lectus mauris ultrices. Leo duis ut diam quam nulla porttitor massa. Pretium lectus quam id leo in. Sed tempus urna et pharetra pharetra massa massa.</p>', 'Great Coffee Recipe of Mine', 'naomi_jonas', 'none', '2021-07-25 13:44:06', 'no', 'no', 5, 'assets/img/posts/60fdbf0627852coffee-glass-beverage-coffee-mug-162947.jpg'),
(179, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet luctus venenatis lectus magna fringilla urna. Interdum varius sit amet mattis vulputate. Accumsan in nisl nisi scelerisque. Mauris pellentesque pulvinar pellentesque habitant morbi. Congue mauris rhoncus aenean vel elit scelerisque. Netus et malesuada fames ac turpis egestas. Convallis aenean et tortor at. Ornare suspendisse sed nisi lacus sed viverra tellus. Nunc mattis enim ut tellus elementum sagittis vitae. Sit amet mattis vulputate enim nulla aliquet porttitor. Lorem ipsum dolor sit amet consectetur adipiscing. Nunc sed blandit libero volutpat sed cras. Nibh sed pulvinar proin gravida hendrerit lectus a. Consequat interdum varius sit amet.</p><p><br></p><p>Purus sit amet volutpat consequat mauris nunc congue. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Sapien et ligula ullamcorper malesuada. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Suspendisse potenti nullam ac tortor. Mattis nunc sed blandit libero volutpat sed cras. Vitae ultricies leo integer malesuada nunc vel risus. Neque ornare aenean euismod elementum nisi quis. Scelerisque viverra mauris in aliquam. Et tortor consequat id porta nibh venenatis cras. Massa ultricies mi quis hendrerit dolor magna. Tincidunt augue interdum velit euismod. Dolor purus non enim praesent elementum facilisis leo vel. Diam vel quam elementum pulvinar etiam non.</p><p><br></p><p>Velit dignissim sodales ut eu sem integer vitae justo eget. Dui ut ornare lectus sit. Tempus egestas sed sed risus pretium quam. Viverra ipsum nunc aliquet bibendum enim facilisis. Felis imperdiet proin fermentum leo vel orci. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Pulvinar mattis nunc sed blandit libero volutpat sed cras. Justo donec enim diam vulputate ut pharetra sit amet. Congue mauris rhoncus aenean vel. In fermentum posuere urna nec. Massa eget egestas purus viverra accumsan in. Integer vitae justo eget magna fermentum iaculis eu non.</p><p><br></p><p>Lacus sed viverra tellus in hac. Enim ut sem viverra aliquet. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Lorem ipsum dolor sit amet consectetur adipiscing. Orci ac auctor augue mauris augue neque gravida. Consequat id porta nibh venenatis cras sed. Sit amet commodo nulla facilisi nullam vehicula ipsum. Habitant morbi tristique senectus et netus et malesuada. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus non enim praesent elementum facilisis. Aliquet bibendum enim facilisis gravida neque convallis a cras.</p><p><br></p><p>Nunc mi ipsum faucibus vitae aliquet nec. Lectus mauris ultrices eros in. Vel eros donec ac odio tempor orci. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Diam in arcu cursus euismod quis. Sit amet purus gravida quis blandit turpis cursus. Sed felis eget velit aliquet sagittis. Sed blandit libero volutpat sed cras. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Orci ac auctor augue mauris augue. At elementum eu facilisis sed. Curabitur vitae nunc sed velit. Enim nec dui nunc mattis. Adipiscing commodo elit at imperdiet. Nec sagittis aliquam malesuada bibendum arcu.</p>', 'A Cool Tropical Drink Recipe I found', 'tom_greg', 'none', '2021-08-28 17:16:17', 'no', 'no', 0, 'assets/img/posts/612aa7a119fb9colorful-tropical-still-life-with-grapefruit-mocktail-or-exotic-antioxidant-drink-vibrant-composition_t20_OJmvzm.jpg'),
(180, '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet luctus venenatis lectus magna fringilla urna. Interdum varius sit amet mattis vulputate. Accumsan in nisl nisi scelerisque. Mauris pellentesque pulvinar pellentesque habitant morbi. Congue mauris rhoncus aenean vel elit scelerisque. Netus et malesuada fames ac turpis egestas. Convallis aenean et tortor at. Ornare suspendisse sed nisi lacus sed viverra tellus. Nunc mattis enim ut tellus elementum sagittis vitae. Sit amet mattis vulputate enim nulla aliquet porttitor. Lorem ipsum dolor sit amet consectetur adipiscing. Nunc sed blandit libero volutpat sed cras. Nibh sed pulvinar proin gravida hendrerit lectus a. Consequat interdum varius sit amet.</p><p><br></p><p>Purus sit amet volutpat consequat mauris nunc congue. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Euismod in pellentesque massa placerat duis ultricies lacus sed turpis. Sapien et ligula ullamcorper malesuada. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Suspendisse potenti nullam ac tortor. Mattis nunc sed blandit libero volutpat sed cras. Vitae ultricies leo integer malesuada nunc vel risus. Neque ornare aenean euismod elementum nisi quis. Scelerisque viverra mauris in aliquam. Et tortor consequat id porta nibh venenatis cras. Massa ultricies mi quis hendrerit dolor magna. Tincidunt augue interdum velit euismod. Dolor purus non enim praesent elementum facilisis leo vel. Diam vel quam elementum pulvinar etiam non.</p><p><br></p><p>Velit dignissim sodales ut eu sem integer vitae justo eget. Dui ut ornare lectus sit. Tempus egestas sed sed risus pretium quam. Viverra ipsum nunc aliquet bibendum enim facilisis. Felis imperdiet proin fermentum leo vel orci. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Pulvinar mattis nunc sed blandit libero volutpat sed cras. Justo donec enim diam vulputate ut pharetra sit amet. Congue mauris rhoncus aenean vel. In fermentum posuere urna nec. Massa eget egestas purus viverra accumsan in. Integer vitae justo eget magna fermentum iaculis eu non.</p><p><br></p><p>Lacus sed viverra tellus in hac. Enim ut sem viverra aliquet. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Lorem ipsum dolor sit amet consectetur adipiscing. Orci ac auctor augue mauris augue neque gravida. Consequat id porta nibh venenatis cras sed. Sit amet commodo nulla facilisi nullam vehicula ipsum. Habitant morbi tristique senectus et netus et malesuada. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus non enim praesent elementum facilisis. Aliquet bibendum enim facilisis gravida neque convallis a cras.</p><p><br></p><p>Nunc mi ipsum faucibus vitae aliquet nec. Lectus mauris ultrices eros in. Vel eros donec ac odio tempor orci. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Diam in arcu cursus euismod quis. Sit amet purus gravida quis blandit turpis cursus. Sed felis eget velit aliquet sagittis. Sed blandit libero volutpat sed cras. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Orci ac auctor augue mauris augue. At elementum eu facilisis sed. Curabitur vitae nunc sed velit. Enim nec dui nunc mattis. Adipiscing commodo elit at imperdiet. Nec sagittis aliquam malesuada bibendum arcu.</p>', 'My Blueberry Yogurt Recipe', 'mark_hallums', 'none', '2021-08-30 18:15:30', 'no', 'no', 0, 'assets/img/posts/612d5881f2827glass-of-blueberry-yogurt-with-fresh-blueberries_t20_6nyV2y.jpg'),
(181, '<p>Lacus sed viverra tellus in hac. Enim ut sem viverra aliquet. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Lorem ipsum dolor sit amet consectetur adipiscing. Orci ac auctor augue mauris augue neque gravida. Consequat id porta nibh venenatis cras sed. Sit amet commodo nulla facilisi nullam vehicula ipsum. Habitant morbi tristique senectus et netus et malesuada. Magnis dis parturient montes nascetur ridiculus mus mauris vitae. Purus non enim praesent elementum facilisis. Aliquet bibendum enim facilisis gravida neque convallis a cras.<br></p>', 'A Bread Recipe I came up with', 'mark_hallums', 'none', '2021-08-30 18:21:57', 'no', 'no', 0, 'assets/img/posts/612d5a04b8ca6baked-baked-goods-baking-209387.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`id`, `name`) VALUES
(1, 'Mark'),
(2, 'Michelle');

-- --------------------------------------------------------

--
-- Table structure for table `trends`
--

CREATE TABLE `trends` (
  `title` varchar(50) NOT NULL,
  `hits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trends`
--

INSERT INTO `trends` (`title`, `hits`) VALUES
('Lorem', 54),
('Ipsum', 51),
('Dolor', 38),
('Amet', 130),
('Fam', 13),
('Squid', 13),
('Microdosing', 13),
('Kinfolk', 5),
('Glutenfree', 5),
('Literally', 5),
('Marfa', 5),
('Unicorn', 13),
('Offal', 21),
('Typewriter', 5),
('Af', 5),
('Readymade', 13),
('Hexagon', 18),
('Migas', 10),
('Normcore', 5),
('Affogato', 5),
('Tote', 5),
('Bag', 10),
('Bun', 15),
('Level', 21),
('Disrupt', 5),
('Tbh', 5),
('Jianbing', 16),
('Green', 16),
('Juice', 16),
('Aesthetic', 16),
('Raclette', 13),
('Ethical', 8),
('Postironic', 8),
('Skateboard', 8),
('Farmtotable', 8),
('Dreamcatcher', 16),
('Hella', 8),
('Snackwave', 8),
('Godard', 8),
('Bird', 8),
('Slowcarb', 16),
('Occupy', 8),
('XOXO', 13),
('Narwhal', 8),
('Air', 8),
('Plant', 8),
('Selvage', 8),
('Forage', 13),
('Gentrify', 8),
('Viral', 8),
('Austin', 13),
('Wolf', 8),
('Vape', 8),
('Hell', 8),
('Fingerstache', 8),
('Tumeric', 16),
('Pourover', 8),
('Pok', 16),
('Irony', 8),
('Yr', 21),
('MeditationrnrnPug', 5),
('Palo', 16),
('Santo', 16),
('Fixie', 8),
('Cray', 8),
('Schlitz', 8),
('Activated', 8),
('Charcoal', 8),
('Tattooed', 8),
('Prism', 8),
('Hot', 8),
('Chicken', 8),
('Wayfarers', 8),
('Asymmetrical', 8),
('Lomo', 8),
('Tumblr', 8),
('Cred', 8),
('Braid', 8),
('Chicharrones', 8),
('Lofi', 8),
('Glossier', 8),
('Sriracha', 8),
('Shoreditch', 8),
('Drinking', 8),
('Vinegar', 8),
('8bit', 8),
('Leggings', 8),
('Yuccie', 8),
('Keytar', 8),
('Cardigan', 8),
('Seitan', 8),
('Freegan', 5),
('Salvia', 5),
('DIY', 5),
('Tofu', 5),
('Pork', 5),
('Belly', 5),
('Knausgaard', 5),
('Mumblecore', 5),
('Artisan', 5),
('Pitchfork', 5),
('Neutra', 5),
('Paleo', 5),
('IPhone', 5),
('Celiac', 5),
('Kitsch', 5),
('Quinoa', 5),
('Plaid', 5),
('Messenger', 5),
('Jean', 5),
('Shorts', 5),
('Test', 2),
('Meditation', 3),
('Pug', 3),
('Girl', 1),
('Grl', 1),
('Home', 5),
('Recipes', 5),
('Easy', 5),
('Honey', 25),
('Garlic', 25),
('SalmonrnNOVEMBER', 5),
('28', 5),
('2017', 5),
('KARINA', 5),
('41', 5),
('COMMENTSrnrneasy', 5),
('SalmonrnSharernTweetrnPinrn1rnStumblernEasy', 5),
('Salmon', 35),
('Throw', 5),
('Recipe', 20),
('Pan', 5),
('Handful', 5),
('Ingredients', 5),
('Perfect', 5),
('Sweet', 5),
('Savoury', 5),
('5ingredient', 5),
('Garlicky', 5),
('Sauce', 15),
('Hint', 5),
('Lemon', 5),
('Familys', 5),
('ObsessionrnrnDinner', 5),
('Ready', 5),
('15', 5),
('Minutes', 10),
('Including', 5),
('Prep', 5),
('Time', 10),
('YESrnrnIts', 5),
('Secret', 5),
('Loving', 5),
('Browned', 10),
('Butter', 10),
('Posting', 5),
('Cafe', 5),
('Delites', 5),
('Baby', 5),
('Success', 5),
('Video', 5),
('Facebook', 5),
('Readers', 5),
('Writing', 5),
('Avoid', 5),
('Browning', 5),
('ButterrnrnThis', 5),
('ItrnrnMY', 5),
('VIDEOSrnrnrnNow', 5),
('Mixed', 5),
('Makes', 5),
('Stand', 5),
('Rest', 5),
('Comes', 5),
('People', 10),
('Simple', 5),
('Theres', 10),
('Wrong', 5),
('Simplifying', 5),
('Guys', 5),
('Love', 5),
('Previous', 5),
('OnernrnThis', 5),
('Cooked', 5),
('Searing', 10),
('Frying', 10),
('Lot', 5),
('Anxiety', 5),
('Flipping', 5),
('Fillets', 10),
('Fall', 5),
('Apart', 5),
('Halfway', 5),
('Cooking', 5),
('Crispy', 10),
('Edges', 5),
('Half', 5),
('Youre', 10),
('Broil', 5),
('Couple', 5),
('Grill', 5),
('Australia', 5),
('Extra', 5),
('Golden', 5),
('Caramelised', 5),
('Finishrnrn', 5),
('Sapien', 42),
('Pellentesque', 78),
('Habitant', 19),
('Morbi', 46),
('Tristique', 34),
('Malesuada', 49),
('Fames', 22),
('Ac', 58),
('Turpis', 50),
('Egestas', 106),
('Sed', 189),
('Tempus', 20),
('Nulla', 41),
('Elit', 64),
('Eget', 81),
('Gravida', 59),
('Cum', 3),
('Sociis', 3),
('Natoque', 3),
('Fusce', 9),
('Ut', 122),
('Placerat', 25),
('Orci', 50),
('Dignissim', 37),
('Enim', 112),
('Sit', 131),
('Vulputate', 59),
('Nec', 77),
('Sagittis', 43),
('Aliquam', 94),
('Bibendum', 63),
('Arcu', 77),
('Dui', 30),
('Nunc', 127),
('Mattis', 59),
('Neque', 106),
('Fermentum', 26),
('Et', 107),
('Sollicitudin', 13),
('Phasellus', 10),
('Lobortis', 24),
('Elementum', 79),
('Nibh', 79),
('Tellus', 102),
('Molestie', 42),
('Blandit', 52),
('Massa', 69),
('Purus', 58),
('Viverra', 76),
('Accumsan', 13),
('Nisl', 51),
('Nisi', 48),
('Scelerisque', 71),
('Sodales', 25),
('Eu', 35),
('Sem', 42),
('Integer', 65),
('Netus', 22),
('Ultrices', 72),
('Quam', 75),
('Quisque', 50),
('Id', 169),
('Diam', 94),
('Vel', 74),
('Pulvinar', 87),
('Ultricies', 57),
('Lacus', 39),
('Tincidunt', 72),
('Aliquet', 52),
('Risus', 74),
('Feugiat', 74),
('Varius', 40),
('Lectus', 103),
('Urna', 111),
('Duis', 53),
('Convallis', 79),
('Interdum', 39),
('Velit', 33),
('Laoreet', 41),
('Mauris', 123),
('Vitae', 118),
('Pharetra', 34),
('Mi', 72),
('Congue', 66),
('Suscipit', 14),
('Est', 67),
('Erat', 39),
('Imperdiet', 31),
('Ante', 30),
('Cursus', 66),
('Nullam', 31),
('Tortor', 62),
('Vivamus', 17),
('Augue', 67),
('Suspendisse', 24),
('Consectetur', 78),
('Faucibus', 68),
('Volutpat', 64),
('Auctor', 74),
('Metus', 25),
('Eleifend', 17),
('Venenatis', 26),
('Donec', 43),
('Dictum', 61),
('Nam', 65),
('Curabitur', 15),
('Euismod', 31),
('Lacinia', 14),
('Quis', 84),
('Odio', 30),
('Consequat', 45),
('Felis', 17),
('Vestibulum', 16),
('Rhoncus', 48),
('Ullamcorper', 39),
('Cras', 41),
('Proin', 52),
('Hendrerit', 37),
('Justo', 42),
('Porta', 17),
('NisirnrnDui', 8),
('Tempor', 38),
('Commodo', 30),
('Iaculis', 32),
('Mollis', 17),
('Porttitor', 26),
('Leo', 38),
('Semper', 33),
('Rutrum', 7),
('Libero', 37),
('AuguernrnEt', 8),
('Ornare', 21),
('Adipiscing', 49),
('Posuere', 19),
('Etiam', 21),
('Eiusmod', 12),
('Incididunt', 12),
('Labore', 12),
('Dolore', 12),
('Magna', 28),
('Aliqua', 12),
('Eros', 15),
('Praesent', 11),
('Fringilla', 22),
('Dapibus', 7),
('Maecenas', 11),
('IntegerrnrnOrci', 7),
('LectusrnrnTincidunt', 6),
('Magnis', 6),
('Dis', 6),
('Parturient', 6),
('Montes', 6),
('Nascetur', 6),
('Ridiculus', 6),
('Mus', 6),
('Pretium', 17),
('MassaCondimentum', 1),
('Facilisi', 12),
('Senectus', 8),
('Facilisis', 20),
('Aenean', 14),
('DonecAliquet', 1),
('Penatibus', 2),
('Luctus', 7),
('Condimentum', 6),
('DiamUt', 1),
('OdioMauris', 1),
('PLorem', 5),
('MassappbrppCondimentum', 1),
('DonecppbrppAliquet', 1),
('DiamppbrppUt', 1),
('OdioppbrppMauris', 1),
('Duisp', 1),
('Massap', 1),
('Pvwevwevp', 1),
('Ligula', 3),
('UtppbrppArcu', 1),
('NislppbrppVestibulum', 1),
('OdioppbrppViverra', 1),
('QuisppbrppAuctor', 1),
('Acp', 1),
('AmetppbrppPurus', 2),
('Potenti', 2),
('NonppbrppVelit', 2),
('NonppbrppLacus', 2),
('Hac', 3),
('Vehicula', 3),
('CrasppbrppNunc', 2),
('Arcup', 2),
('PLacus', 1),
('Crasbrp', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(25) NOT NULL,
  `last_name` varchar(25) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `signup_date` date NOT NULL,
  `profile_pic` varchar(255) NOT NULL,
  `profile_header` varchar(255) NOT NULL,
  `num_posts` int(11) NOT NULL,
  `num_likes` int(11) NOT NULL,
  `user_closed` varchar(3) NOT NULL,
  `friend_array` text NOT NULL,
  `state` varchar(50) NOT NULL,
  `fav_food` varchar(255) NOT NULL,
  `bio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `city`, `signup_date`, `profile_pic`, `profile_header`, `num_posts`, `num_likes`, `user_closed`, `friend_array`, `state`, `fav_food`, `bio`) VALUES
(1, 'Dylan', 'Cougar', 'dylancougar', 'dylancougar@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Portland', '2017-11-11', 'assets/img/profile_pics/Dylancougarca03f58e4727f2fcb27f1556de892f7cn.jpeg', 'assets/img/profile_headers/dylancougar_profile_header.jpeg', 21, 21, 'no', ',jimmy_elvis,megan_shurnur,jane_brisbane,kalon_nunez,vernon_dells,jane_brisbane,susie_swanson,rusby_huggins,tate_robbins,mark_michaels,naomi_jonas,hurcut_brace,ana_ramos,robbie_jinjoe,ace_caracer,kerry_walsh,', 'OR', 'Seafood', ''),
(2, 'Jimmy', 'Elvis', 'jimmy_elvis', 'elvis@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Lansing', '2017-11-12', 'assets/img/profile_pics/Jimmy_Elvis5f0647958670b081976f541b09831669n.jpeg', '', 1, 1, 'no', ',Dylancougar,debbie_kerrigan,kalon_nunez,', 'MI', '', ''),
(3, 'Susie', 'Swanson', 'susie_swanson', 'Swan@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Provo', '2017-11-12', 'assets/img/profile_pics/susie_swanson8cbf45445ab07c100b26127f068a1394n.jpeg', '', 3, 0, 'no', ',robbie_jinjoe,kalon_nunez,dylancougar,hurcut_brace,mark_michaels,ace_caracer,vernon_dells,', 'UT', '', ''),
(4, 'Debbie', 'Kerrigan', 'debbie_kerrigan', 'Deb@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Atlanta', '2017-11-12', 'assets/img/profile_pics/debbie_kerrigan.jpeg', 'assets/img/profile_headers/debbie_kerrigan_profile_header.jpeg', 4, 0, 'no', ',megan_shurnur,Jimmy_Elvis,vernon_dells,', 'GA', 'Shrimp', ''),
(5, 'Robbie', 'Jinjoe', 'robbie_jinjoe', 'Jinjoe@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Springfield', '2017-11-12', 'assets/img/profile_pics/robbie_jinjoe67495a7c3bd82024bd47d856bfd3737fn.jpeg', 'assets/img/profile_headers/robbie_jinjoe_profile_header.jpeg', 4, 0, 'no', ',susie_swanson,Dylancougar,dylancougar,naomi_jonas,ana_ramos,ace_caracer,', 'MA', '', ''),
(6, 'Hurcut', 'Brace', 'hurcut_brace', 'Hurcut@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Hartford', '2017-11-12', 'assets/img/profile_pics/hurcut_brace78beb8bee62bf15433f50d079d4ac2b4n.jpeg', '', 9, 8, 'no', ',rusby_huggins,susie_swanson,naomi_jonas,dylancougar,ana_ramos,', 'CT', 'Bacon', ' <p>\r\nOrci nulla pellentesque dignissim enim sit amet venenatis urna. At consectetur lorem donec massa sapien faucibus. Dictum non consectetur a erat nam at lectus urna. Arcu vitae elementum curabitur vitae nunc. Euismod lacinia at quis risus sed vulputate odio. Nec nam aliquam sem et tortor consequat id. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Felis bibendum ut tristique et egestas quis. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Urna duis convallis convallis tellus id interdum. Nibh sed pulvinar proin gravida hendrerit lectus. Mattis rhoncus urna neque viverra justo nec ultrices dui. Proin sagittis nisl rhoncus mattis rhoncus urna neque. Justo donec enim diam vulputate. Erat imperdiet sed euismod nisi porta lorem. Integer enim neque volutpat ac. Purus sit amet volutpat consequat mauris nunc congue nisi.\r\n\r\n </p>\r\n\r\n <p>\r\nDui sapien eget mi proin sed. Nec ultrices dui sapien eget mi. Ante metus dictum at tempor commodo ullamcorper. Mattis molestie a iaculis at. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Arcu dictum varius duis at. Nam at lectus urna duis convallis convallis. Vulputate odio ut enim blandit. Sed id semper risus in hendrerit gravida rutrum quisque. Egestas congue quisque egestas diam in. Consequat semper viverra nam libero justo laoreet. Faucibus nisl tincidunt eget nullam non nisi est sit. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Quisque id diam vel quam elementum pulvinar. Lobortis feugiat vivamus at augue eget arcu dictum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Nibh tellus molestie nunc non blandit massa. Ac auctor augue mauris augue.\r\n </p>\r\n\r\n <p>\r\nEt netus et malesuada fames. Ultrices sagittis orci a scelerisque purus. Quam quisque id diam vel quam elementum pulvinar. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Tellus integer feugiat scelerisque varius morbi. Molestie nunc non blandit massa enim. Lectus urna duis convallis convallis tellus id interdum velit laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Ut tellus elementum sagittis vitae. Lectus arcu bibendum at varius vel pharetra vel turpis. Mi bibendum neque egestas congue quisque egestas. Nunc congue nisi vitae suscipit tellus mauris a. Lectus sit amet est placerat in egestas erat imperdiet. Ante in nibh mauris cursus mattis molestie. Nisl tincidunt eget nullam non nisi est sit amet. Id nibh tortor id aliquet lectus.\r\n </p>'),
(7, 'Rusby', 'Huggins', 'rusby_huggins', 'Rusby@gmx.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Houston', '2017-11-12', 'assets/img/profile_pics/rusby_huggins08c5d3a05da5e07f25750e20beaccf92n.jpeg', '', 1, 2, 'no', ',hurcut_brace,megan_shurnur,dylancougar,ana_ramos,ace_caracer,', 'TX', 'Barbecue', ''),
(9, 'Megan', 'Shurnur', 'megan_shurnur', 'Meg@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Dayton', '2017-11-12', 'assets/img/profile_pics/megan_shurnur5801766362d7a917ead3279c676e0fe6n.jpeg', '', 3, 6, 'no', ',debbie_kerrigan,dylancougar,vernon_dells,jane_brisbane,rusby_huggins,ana_ramos,ace_caracer,', 'OH', 'Thai', ''),
(10, 'Kalon', 'Nunez', 'kalon_nunez', 'Kal@gmx.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Louisville', '2017-11-12', 'assets/img/profile_pics/kalon_nuneze3527a4a6bf9085fcb0588dec2ac5e66n.jpeg', '', 3, 0, 'no', ',susie_swanson,Jimmy_Elvis,vernon_dells,Dylancougar,ana_ramos,ace_caracer,', 'KY', '', ''),
(11, 'Vernon', 'Dells', 'vernon_dells', 'Dells@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Cincinatti', '2017-11-12', 'assets/img/profile_pics/vernon_dells973c6156a78431672abfa3832c97efe9n.jpeg', 'assets/img/profile_headers/vernon_dells_profile_header.jpeg', 12, 3, 'no', ',kalon_nunez,megan_shurnur,dylancougar,ace_caracer,mark_michaels,jane_brisbane,susie_swanson,debbie_kerrigan,sara_green,', 'OH', '', ''),
(12, 'Jane', 'Brisbane', 'jane_brisbane', 'Bris@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Boston', '2018-03-21', 'assets/img/profile_pics/jane_brisbane2f8dcd79fbce21b78a6d50a9178abd33n.jpeg', 'assets/img/profile_headers/jane_brisbane_profile_header.jpeg', 1, 1, 'no', ',megan_shurnur,dylancougar,kerry_walsh,naomi_jonas,,ace_caracer,vernon_dells,', 'MA', 'Southern', ''),
(13, 'Ana', 'Ramos', 'ana_ramos', 'Anaramos@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' San Diego', '2018-05-02', 'assets/img/profile_pics/ana_ramosc1b8c9d4d8f1549e83035af1be5023d8n.jpeg', 'assets/img/profile_headers/ana_ramos_profile_header.jpeg', 1, 3, 'no', ',dylancougar,kerry_walsh,rusby_huggins,hurcut_brace,kalon_nunez,megan_shurnur,tate_robbins,robbie_jinjoe,ace_caracer,', ' CA', ' ', ''),
(14, 'Kerry', 'Walsh', 'kerry_walsh', 'Walsh@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Tuscon', '2018-05-02', 'assets/img/profile_pics/kerry_walsh41d257596f6985c14ef7b278218e3384n.jpeg', 'assets/img/profile_headers/kerry_walsh_profile_header.jpeg', 1, 1, 'no', ',ana_ramos,jane_brisbane,ace_caracer,dylancougar,', ' AR', ' ', ''),
(15, 'Mark', 'Michaels', 'mark_michaels', 'Dylancougar@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Seattle', '2018-05-02', 'assets/img/profile_pics/mark_michaels6259dd5d5625017cbfdb05a378f2673an.jpeg', '', 4, 0, 'no', ',sara_green,dylancougar,susie_swanson,vernon_dells,', 'WA', 'Seafood', ''),
(16, 'Tate', 'Robbins', 'tate_robbins', 'Tate@robbins.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Aliceville', '0000-00-00', 'assets/img/profile_pics/tate_robbins.jpeg', '', 1, 1, 'no', ',dylancougar,ana_ramos,', ' AL', ' ', ''),
(17, 'Sara', 'Green', 'sara_green', 'Sara@green.net', 'b0d86da2d5b3aa15b61df214489f7c12', ' Miami', '2018-05-02', 'assets/img/profile_pics/sara_green43e1cf5728e4b63e3fec6fa1cc7e2d39n.jpeg', 'assets/img/profile_headers/sara_green_profile_header.jpeg', 4, 0, 'no', ',mark_michaels,vernon_dells,', 'FL', 'Japaneese', ''),
(18, 'Ace', 'Caracer', 'ace_caracer', 'Ace@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Concord', '2018-05-02', 'assets/img/profile_pics/ace_caracer1298bdf4381590d65e0e044f3b891996n.jpeg', 'assets/img/profile_headers/ace_caracer_profile_header.jpeg', 1, 0, 'no', ',ana_ramos,vernon_dells,jane_brisbane,susie_swanson,dylancougar,robbie_jinjoe,naomi_jonas,megan_shurnur,kalon_nunez,rusby_huggins,kerry_walsh,', ' NH', ' Apples', ''),
(19, 'Naomi', 'Jonas', 'naomi_jonas', 'Jonas@namomi.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Miami', '2018-05-02', 'assets/img/profile_pics/naomi_jonas.jpeg', 'assets/img/profile_headers/naomi_jonas_profile_header.jpeg', 6, 5, 'no', ',dylancougar,hurcut_brace,jane_brisbane,robbie_jinjoe,ace_caracer,', 'FL', 'Chicken', ''),
(21, 'Aria', 'Grady', 'aria_grady', 'Aria@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' ', '2021-08-18', 'assets/img/profile_pics/aria_grady.jpeg', 'assets/img/profile_headers/aria_grady_profile_header.jpeg', 0, 0, 'no', ',', ' ', ' ', ' '),
(22, 'Raquel', 'Smith', 'raq_smith', 'smith@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'San Francisco', '2021-06-09', 'assets/img/profile_pics/raq_smith.jpeg', 'assets/img/profile_headers/raq_smith_profile_header.jpeg', 0, 0, 'no', ',', 'CA', 'Steak', ' '),
(23, 'Fred', 'Vann', 'fred_vann', 'Vann@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' ', '2021-08-18', 'assets/img/profile_pics/defaults/head_pete_river.png', '', 0, 0, 'no', ',', ' ', ' ', ' '),
(24, 'Dan', 'Randale', 'dan_randale', 'Ran@gamil.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Pittsburgh', '2021-08-19', 'assets/img/profile_pics/dan_randale.jpeg', 'assets/img/profile_headers/dan_randale_profile_header.jpeg', 0, 0, 'no', ',tom_greg,', 'PA', 'Seafood', ' '),
(25, 'Veronica', 'Webber', 'veronica_webber', 'Webber@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' ', '2021-08-19', 'assets/img/profile_pics/veronica_webber.jpeg', 'assets/img/profile_headers/veronica_webber_profile_header.jpeg', 0, 0, 'no', ',', ' ', ' ', ' '),
(26, 'Phil', 'Brooks', 'phil_brooks', 'Brooks@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Virginia Beach', '2021-08-21', 'assets/img/profile_pics/phil_brooks.jpeg', 'assets/img/profile_headers/phil_brooks_profile_header.jpeg', 0, 0, 'no', ',', 'VA', 'Turkey', ' '),
(27, 'Tom', 'Hardy', 'tom_hardy', 'Hardy@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Lansing', '2021-08-21', 'assets/img/profile_pics/tom_hardy.jpeg', 'assets/img/profile_headers/tom_hardy_profile_header.jpeg', 0, 0, 'no', ',', 'MI', 'Lobster', ' '),
(28, 'Cori', 'Gianni', 'cori_gianni', 'Cori@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' ', '2021-08-21', 'assets/img/profile_pics/cori_gianni.jpeg', 'assets/img/profile_headers/cori_gianni_profile_header.jpeg', 0, 0, 'no', ',', ' ', ' ', ' '),
(29, 'Beth', 'Hart', 'beth_hart', 'Beth@beth.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' ', '2021-08-21', 'assets/img/profile_pics/beth_hart.jpeg', 'assets/img/profile_headers/beth_hart_profile_header.jpeg', 0, 0, 'no', ',', ' ', ' ', ' '),
(30, 'Bob', 'Harden', 'bob_harden', 'Bob@bob.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' ', '2021-08-21', 'assets/img/profile_pics/bob_harden.jpeg', 'assets/img/profile_headers/bob_harden_profile_header.jpeg', 0, 0, 'no', ',', ' ', ' ', ' '),
(31, 'Mark', 'Hallums', 'mark_hallums', 'Hal@hal.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Springfield', '2021-08-21', 'assets/img/profile_pics/mark_hallums.jpeg', 'assets/img/profile_headers/mark_hallums_profile_header.jpeg', 2, 0, 'no', ',', 'MA', 'Salmon', ' '),
(32, 'Tom', 'Greg', 'tom_greg', 'Greg@greg.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' San Diego', '2021-08-21', 'assets/img/profile_pics/tom_greg.jpeg', 'assets/img/profile_headers/tom_greg_profile_header.jpeg', 1, 0, 'no', ',dan_randale,', 'CA', 'Steak', ' '),
(33, 'Jimmy', 'Smith', 'jimmy_smith', 'Jimmy@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'New Orleans', '2021-08-30', 'assets/img/profile_pics/jimmy_smith.jpeg', 'assets/img/profile_headers/jimmy_smith_profile_header.jpeg', 0, 0, 'no', ',', 'LA', 'Macoroni', ' ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `friend_requests`
--
ALTER TABLE `friend_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
