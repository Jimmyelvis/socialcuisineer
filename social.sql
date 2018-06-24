-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2018 at 11:55 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
(12, 'This is cool', 'dylancougar', 'megan_shurnur', '2018-05-02 20:48:47', 'no', 146);

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
(13, 'robbie_jinjoe', 'dylancougar'),
(15, 'ana_ramos', 'dylancougar'),
(24, 'vernon_dells', 'mark_michaels'),
(27, 'jimmy_elvis', 'mark_michaels'),
(29, 'ana_ramos', 'kerry_walsh'),
(30, 'jane_brisbane', 'kerry_walsh'),
(32, 'jimmy_elvis', 'naomi_jonas'),
(33, 'mark_michaels', 'naomi_jonas'),
(34, 'hurcut_brace', 'naomi_jonas'),
(35, 'robbie_jinjoe', 'naomi_jonas'),
(36, 'jane_brisbane', 'naomi_jonas'),
(37, 'hurcut_brace', 'dylancougar');

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
(41, 'dylancougar', 146);

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
(45, 'robbie_jinjoe', 'dylancougar', 'uiliuluiluil', '2018-03-26 18:03:05', 'yes', 'no', 'no'),
(46, 'hurcut_brace', 'dylancougar', 'op\'op\'op\'po', '2018-03-26 18:05:11', 'no', 'yes', 'no'),
(47, 'rusby_huggins', 'dylancougar', 'rtyrtytru', '2018-03-26 18:05:42', 'no', 'no', 'no'),
(48, 'kalon_nunez', 'dylancougar', '9876yuoyui', '2018-03-26 18:06:10', 'no', 'no', 'no'),
(49, 'vernon_dells', 'dylancougar', ';jk;jk;jk;', '2018-03-26 18:07:07', 'yes', 'yes', 'no'),
(50, 'susie_swanson', 'dylancougar', 'tytyityityik', '2018-03-26 18:07:55', 'yes', 'yes', 'no'),
(51, 'susie_swanson', 'dylancougar', 'uyloyulhyu', '2018-03-26 18:08:18', 'yes', 'yes', 'no'),
(52, 'megan_shurnur', 'dylancougar', 'bdfbdfbb', '2018-03-26 18:55:17', 'yes', 'yes', 'no'),
(53, 'megan_shurnur', 'dylancougar', 'dfdffdnfd', '2018-03-26 18:55:44', 'yes', 'yes', 'no'),
(54, 'megan_shurnur', 'dylancougar', 'hi', '2018-04-26 18:28:56', 'yes', 'no', 'no'),
(55, 'megan_shurnur', 'dylancougar', 'how', '2018-04-26 19:07:02', 'yes', 'no', 'no'),
(56, 'dylancougar', 'megan_shurnur', 'Hey', '2018-04-27 10:55:46', 'yes', 'yes', 'no'),
(57, 'megan_shurnur', 'dylancougar', 'gurl', '2018-04-27 10:56:46', 'yes', 'no', 'no'),
(58, 'dylancougar', 'megan_shurnur', 'boy', '2018-04-27 10:56:57', 'yes', 'yes', 'no'),
(59, 'megan_shurnur', 'dylancougar', 'girl', '2018-04-27 13:37:09', 'no', 'no', 'no'),
(60, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:37:27', 'no', 'no', 'no'),
(61, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:38:35', 'no', 'no', 'no'),
(62, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:39:04', 'no', 'no', 'no'),
(63, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:40:21', 'no', 'no', 'no'),
(64, 'megan_shurnur', 'dylancougar', 'again', '2018-04-27 13:40:30', 'no', 'no', 'no'),
(65, 'megan_shurnur', 'dylancougar', 'yo', '2018-04-29 14:46:01', 'no', 'no', 'no'),
(66, 'megan_shurnur', 'dylancougar', 'yooooooooooooooooooo', '2018-05-01 17:12:05', 'no', 'no', 'no'),
(67, 'megan_shurnur', 'dylancougar', 'heyyyyyyyyyyyyyyyyyyyyyyyyy', '2018-05-01 17:34:57', 'no', 'no', 'no'),
(68, 'vernon_dells', 'dylancougar', 'hey man', '2018-05-01 17:35:09', 'no', 'no', 'no');

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
  `viewed` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_to`, `user_from`, `message`, `link`, `datetime`, `opened`, `viewed`) VALUES
(3, 'jane_brisbane', 'Dylancougar', 'lorem', 'link', '2018-04-18 00:00:00', 'no', 'yes'),
(4, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=40', '2018-04-18 14:59:45', 'yes', 'yes'),
(5, 'megan_shurnur', 'kalon_nunez', 'Kalon Nunez liked your post', 'post.php?id=40', '2018-04-18 15:13:23', 'yes', 'yes'),
(6, 'Dylancougar', 'robbie_jinjoe', 'Robbie Jinjoe liked your post', 'post.php?id=55', '2018-04-18 15:18:43', 'yes', 'yes'),
(7, 'Dylancougar', 'robbie_jinjoe', 'Robbie Jinjoe posted on your profile', 'post.php?id=60', '2018-04-18 15:19:03', 'yes', 'yes'),
(8, 'dylancougar', 'robbie_jinjoe', 'Robbie Jinjoe liked your post', 'post.php?id=57', '2018-04-18 15:43:00', 'yes', 'yes'),
(9, 'vernon_dells', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=43', '2018-04-18 15:43:26', 'no', 'yes'),
(10, 'Dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=55', '2018-04-18 16:42:55', 'no', 'yes'),
(11, 'Dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=54', '2018-04-19 15:27:54', 'yes', 'yes'),
(12, 'megan_shurnur', 'vernon_dells', 'Vernon Dells liked your post', 'post.php?id=34', '2018-04-19 16:01:45', 'yes', 'yes'),
(13, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=96', '2018-04-23 17:04:31', 'no', 'no'),
(14, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=97', '2018-04-23 17:05:41', 'no', 'no'),
(15, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=98', '2018-04-23 17:05:55', 'no', 'no'),
(16, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=99', '2018-04-23 17:09:25', 'no', 'no'),
(17, 'test heading 2', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=100', '2018-04-23 17:11:15', 'no', 'no'),
(18, 'test heading', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=101', '2018-04-23 17:13:39', 'no', 'no'),
(19, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=135', '2018-04-23 20:41:51', 'no', 'yes'),
(20, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=134', '2018-04-23 20:51:58', 'no', 'yes'),
(21, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=138', '2018-04-23 20:53:19', 'no', 'yes'),
(22, 'dylancougar', 'megan_shurnur', 'Megan Shurnur liked your post', 'post.php?id=141', '2018-04-23 20:57:24', 'yes', 'yes'),
(23, 'dylancougar', 'vernon_dells', 'Vernon Dells liked your post', 'post.php?id=141', '2018-04-23 20:59:47', 'yes', 'yes'),
(24, 'dylancougar', 'jane_brisbane', 'Jane Brisbane liked your post', 'post.php?id=141', '2018-04-23 21:22:36', 'yes', 'yes'),
(25, 'dylancougar', 'megan_shurnur', 'Megan Shurnur commented on your post', 'post.php?id=145', '2018-04-26 16:50:00', 'yes', 'yes'),
(26, 'megan_shurnur', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=0', '2018-04-26 18:27:10', 'no', 'no'),
(27, 'megan_shurnur', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=0', '2018-04-26 18:28:42', 'no', 'no'),
(28, 'megan_shurnur', 'dylancougar', 'Dylan Cougar posted on your profile', 'post.php?id=0', '2018-04-26 19:06:37', 'no', 'no'),
(29, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on a post you commented on', 'post.php?id=145', '2018-04-26 21:59:13', 'no', 'no'),
(30, 'dylancougar', 'jane_brisbane', 'Jane Brisbane commented on your post', 'post.php?id=145', '2018-04-26 22:22:15', 'yes', 'yes'),
(31, 'megan_shurnur', 'jane_brisbane', 'Jane Brisbane commented on a post you commented on', 'post.php?id=145', '2018-04-26 22:22:15', 'no', 'no'),
(32, 'dylancougar', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=145', '2018-05-02 17:53:38', 'yes', 'yes'),
(33, 'dylancougar', 'naomi_jonas', 'Naomi Jonas liked your post', 'post.php?id=141', '2018-05-02 17:53:45', 'yes', 'yes'),
(34, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 17:53:58', 'no', 'no'),
(35, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 17:54:07', 'no', 'no'),
(36, 'dylancougar', 'mark_michaels', 'Mark Michaels liked your post', 'post.php?id=145', '2018-05-02 18:06:18', 'no', 'yes'),
(37, 'dylancougar', 'mark_michaels', 'Mark Michaels liked your post', 'post.php?id=141', '2018-05-02 18:06:30', 'yes', 'yes'),
(38, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:07:04', 'no', 'no'),
(39, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:07:11', 'no', 'no'),
(40, 'dylancougar', 'mark_michaels', 'Mark Michaels liked your post', 'post.php?id=141', '2018-05-02 18:07:15', 'yes', 'yes'),
(41, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:07:57', 'no', 'no'),
(42, 'megan_shurnur', 'dylancougar', 'Dylan Cougar liked your post', 'post.php?id=146', '2018-05-02 18:13:21', 'no', 'no'),
(43, 'megan_shurnur', 'dylancougar', 'Dylan Cougar commented on your post', 'post.php?id=146', '2018-05-02 20:48:47', 'no', 'no');

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
(141, 'Lorem ipsum dolor amet fam squid microdosing, kinfolk gluten-free literally marfa unicorn offal typewriter af. Readymade hexagon migas normcore affogato tote bag man bun. Next level hexagon disrupt, tbh jianbing green juice aesthetic raclette ethical microdosing. Post-ironic skateboard farm-to-table dreamcatcher. Hella next level offal snackwave. Godard put a bird on it slow-carb occupy, XOXO narwhal air plant selvage jianbing forage gentrify viral austin wolf vape. Green juice hell of fingerstache, tumeric pour-over dreamcatcher pok pok irony yr meditation.\r\n\r\nPug palo santo fixie cray schlitz offal activated charcoal. Tattooed prism hot chicken aesthetic wayfarers asymmetrical. Lomo tumblr cred man braid, chicharrones squid slow-carb lo-fi glossier yr sriracha shoreditch drinking vinegar. Tumeric 8-bit leggings, yuccie fam keytar cardigan. Palo santo readymade seitan, hexagon next level unicorn migas freegan salvia DIY man bun tofu pork belly knausgaard mumblecore. Raclette artisan pitchfork neutra forage paleo iPhone man bun. Celiac yr kitsch quinoa XOXO plaid austin messenger bag jean shorts.', 'Kitchen Dreams', 'dylancougar', 'none', '2018-04-23 20:57:12', 'no', 'no', 6, 'assets/images/posts/5ade9d08407e0pexels-photo-534151.jpeg'),
(145, 'jianbing green juice aesthetic raclette ethical microdosing. Post-ironic skateboard farm-to-table dreamcatcher. Hella next level offal snackwave. Godard put a bird on it slow-carb occupy, XOXO narwhal air plant selvage jianbing forage gentrify viral austin wolf vape. Green juice hell of fingerstache, tumeric pour-over dreamcatcher pok pok irony yr meditation. Pug palo santo fixie cray schlitz offal activated charcoal. Tattooed prism hot chicken aesthetic wayfarers asymmetrical. Lomo tumblr cred man braid, chicharrones squid slow-carb lo-fi glossier yr sriracha shoreditch drinking vinegar. Tumeric 8-bit leggings, yuccie fam keytar cardigan. Palo santo readymade seitan, hexagon next level unicorn ', 'Appricot Goodness', 'dylancougar', 'none', '2018-04-26 16:46:14', 'no', 'no', 3, 'assets/images/posts/5ae256b66154dapricot-food-fruit-7961.jpg'),
(146, 'jianbing green juice aesthetic raclette ethical microdosing. Post-ironic skateboard farm-to-table dreamcatcher. Hella next level offal snackwave. Godard put a bird on it slow-carb occupy, XOXO narwhal air plant selvage jianbing forage gentrify viral austin wolf vape. Green juice hell of fingerstache, tumeric pour-over dreamcatcher pok pok irony yr meditation. Pug palo santo fixie cray schlitz offal activated charcoal. Tattooed prism hot chicken aesthetic wayfarers asymmetrical. Lomo tumblr cred man braid, chicharrones squid slow-carb lo-fi glossier yr sriracha shoreditch drinking vinegar. Tumeric 8-bit leggings, yuccie fam keytar cardigan. Palo santo readymade seitan, hexagon next level unicorn ', 'Blueberries', 'megan_shurnur', 'none', '2018-04-26 16:48:00', 'no', 'no', 1, 'assets/images/posts/5ae257206d8bbberries-blur-close-up-272242.jpg'),
(148, 'You are here: Home / Recipes / Easy Honey Garlic Salmon\r\nNOVEMBER 28, 2017 BY KARINA 41 COMMENTS\r\n\r\neasy honey garlic salmon\r\nShare\r\nTweet\r\nPin\r\n+1\r\nStumble\r\nEasy Honey Garlic Salmon is a throw together recipe in one pan and a handful of ingredients! A perfect sweet and savoury 5-ingredient garlicky sauce with a hint of lemon will become your familyâ€™s new salmon obsession.\r\n\r\nDinner ready in under 15 minutes, including prep time? YES!\r\n\r\nItâ€™s no secret you all are loving this Browned Butter Honey Garlic Salmon two years after first posting it way back when Cafe Delites was still a baby. With the success of this video on Facebook, a few readers have been writing in asking if there is any possible way to avoid browning butter.\r\n\r\nThis recipe is it.\r\n\r\nMY LATEST VIDEOS\r\n\r\n\r\nNow, the browned butter mixed through that honey garlic sauce is what makes that salmon recipe stand out from the rest. However, there comes a time when people want to keep things simple, and thereâ€™s nothing wrong with simplifying a recipe! In fact, you guys are going to love this one if not more than the previous one!\r\n\r\nThis salmon gets cooked right in the sauce. Thereâ€™s no searing or frying first. Why? Because a lot of people get anxiety at the thought of frying then flipping salmon and having the fillets fall apart on them halfway through cooking. Q. But how do I get the same crispy edges from searing? A. Once the salmon is half way done, youâ€™re going to broil your fillets for a couple more minutes (or grill them if youâ€™re in Australia) for that extra golden, crispy and caramelised finish.\r\n\r\n', 'Awesome Salmon', 'hurcut_brace', 'none', '2018-05-02 14:22:13', 'no', 'yes', 0, 'assets/images/posts/5aea1df5ea9bcclose-up-cooking-cuisine-629093.jpg'),
(149, 'You are here: Home / Recipes / Easy Honey Garlic Salmon\r\nNOVEMBER 28, 2017 BY KARINA 41 COMMENTS\r\n\r\neasy honey garlic salmon\r\nShare\r\nTweet\r\nPin\r\n+1\r\nStumble\r\nEasy Honey Garlic Salmon is a throw together recipe in one pan and a handful of ingredients! A perfect sweet and savoury 5-ingredient garlicky sauce with a hint of lemon will become your familyâ€™s new salmon obsession.\r\n\r\nDinner ready in under 15 minutes, including prep time? YES!\r\n\r\nItâ€™s no secret you all are loving this Browned Butter Honey Garlic Salmon two years after first posting it way back when Cafe Delites was still a baby. With the success of this video on Facebook, a few readers have been writing in asking if there is any possible way to avoid browning butter.\r\n\r\nThis recipe is it.\r\n\r\nMY LATEST VIDEOS\r\n\r\n\r\nNow, the browned butter mixed through that honey garlic sauce is what makes that salmon recipe stand out from the rest. However, there comes a time when people want to keep things simple, and thereâ€™s nothing wrong with simplifying a recipe! In fact, you guys are going to love this one if not more than the previous one!\r\n\r\nThis salmon gets cooked right in the sauce. Thereâ€™s no searing or frying first. Why? Because a lot of people get anxiety at the thought of frying then flipping salmon and having the fillets fall apart on them halfway through cooking. Q. But how do I get the same crispy edges from searing? A. Once the salmon is half way done, youâ€™re going to broil your fillets for a couple more minutes (or grill them if youâ€™re in Australia) for that extra golden, crispy and caramelised finish.\r\n\r\n', 'Awesome Salmon', 'hurcut_brace', 'none', '2018-05-02 16:39:12', 'no', 'yes', 0, 'assets/images/posts/5aea3e10dcc94close-up-cooking-cuisine-629093.jpg'),
(150, 'You are here: Home / Recipes / Easy Honey Garlic Salmon\r\nNOVEMBER 28, 2017 BY KARINA 41 COMMENTS\r\n\r\neasy honey garlic salmon\r\nShare\r\nTweet\r\nPin\r\n+1\r\nStumble\r\nEasy Honey Garlic Salmon is a throw together recipe in one pan and a handful of ingredients! A perfect sweet and savoury 5-ingredient garlicky sauce with a hint of lemon will become your familyâ€™s new salmon obsession.\r\n\r\nDinner ready in under 15 minutes, including prep time? YES!\r\n\r\nItâ€™s no secret you all are loving this Browned Butter Honey Garlic Salmon two years after first posting it way back when Cafe Delites was still a baby. With the success of this video on Facebook, a few readers have been writing in asking if there is any possible way to avoid browning butter.\r\n\r\nThis recipe is it.\r\n\r\nMY LATEST VIDEOS\r\n\r\n\r\nNow, the browned butter mixed through that honey garlic sauce is what makes that salmon recipe stand out from the rest. However, there comes a time when people want to keep things simple, and thereâ€™s nothing wrong with simplifying a recipe! In fact, you guys are going to love this one if not more than the previous one!\r\n\r\nThis salmon gets cooked right in the sauce. Thereâ€™s no searing or frying first. Why? Because a lot of people get anxiety at the thought of frying then flipping salmon and having the fillets fall apart on them halfway through cooking. Q. But how do I get the same crispy edges from searing? A. Once the salmon is half way done, youâ€™re going to broil your fillets for a couple more minutes (or grill them if youâ€™re in Australia) for that extra golden, crispy and caramelised finish.\r\n\r\n', 'Awesome Salmon', 'hurcut_brace', 'none', '2018-05-02 16:39:27', 'no', 'yes', 0, 'assets/images/posts/5aea3e1f27af6close-up-cooking-cuisine-629093.jpg'),
(151, 'You are here: Home / Recipes / Easy Honey Garlic Salmon\r\nNOVEMBER 28, 2017 BY KARINA 41 COMMENTS\r\n\r\neasy honey garlic salmon\r\nShare\r\nTweet\r\nPin\r\n+1\r\nStumble\r\nEasy Honey Garlic Salmon is a throw together recipe in one pan and a handful of ingredients! A perfect sweet and savoury 5-ingredient garlicky sauce with a hint of lemon will become your familyâ€™s new salmon obsession.\r\n\r\nDinner ready in under 15 minutes, including prep time? YES!\r\n\r\nItâ€™s no secret you all are loving this Browned Butter Honey Garlic Salmon two years after first posting it way back when Cafe Delites was still a baby. With the success of this video on Facebook, a few readers have been writing in asking if there is any possible way to avoid browning butter.\r\n\r\nThis recipe is it.\r\n\r\nMY LATEST VIDEOS\r\n\r\n\r\nNow, the browned butter mixed through that honey garlic sauce is what makes that salmon recipe stand out from the rest. However, there comes a time when people want to keep things simple, and thereâ€™s nothing wrong with simplifying a recipe! In fact, you guys are going to love this one if not more than the previous one!\r\n\r\nThis salmon gets cooked right in the sauce. Thereâ€™s no searing or frying first. Why? Because a lot of people get anxiety at the thought of frying then flipping salmon and having the fillets fall apart on them halfway through cooking. Q. But how do I get the same crispy edges from searing? A. Once the salmon is half way done, youâ€™re going to broil your fillets for a couple more minutes (or grill them if youâ€™re in Australia) for that extra golden, crispy and caramelised finish.\r\n\r\n', 'Awesome Salmon', 'hurcut_brace', 'none', '2018-05-02 16:39:37', 'no', 'no', 0, 'assets/images/posts/5aea3e296ade9close-up-cooking-cuisine-629093.jpg');

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
('Lorem', 5),
('Ipsum', 5),
('Dolor', 5),
('Amet', 5),
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
('Finishrnrn', 5);

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
  `num_posts` int(11) NOT NULL,
  `num_likes` int(11) NOT NULL,
  `user_closed` varchar(3) NOT NULL,
  `friend_array` text NOT NULL,
  `state` varchar(50) NOT NULL,
  `fav_food` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `username`, `email`, `password`, `city`, `signup_date`, `profile_pic`, `num_posts`, `num_likes`, `user_closed`, `friend_array`, `state`, `fav_food`) VALUES
(1, 'Dylan', 'Cougar', 'dylancougar', 'dylancougar@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Portland', '2017-11-11', 'assets/images/profile_pics/Dylancougarca03f58e4727f2fcb27f1556de892f7cn.jpeg', 14, 12, 'no', ',jimmy_elvis,megan_shurnur,jane_brisbane,kalon_nunez,vernon_dells,jane_brisbane,susie_swanson,rusby_huggins,tate_robbins,mark_michaels,naomi_jonas,', 'OR', 'Seafood'),
(2, 'Jimmy', 'Elvis', 'jimmy_elvis', 'elvis@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Lansing', '2017-11-12', 'assets/images/profile_pics/Jimmy_Elvis5f0647958670b081976f541b09831669n.jpeg', 1, 1, 'no', ',Dylancougar,debbie_kerrigan,kalon_nunez,', 'MI', ''),
(3, 'Susie', 'Swanson', 'susie_swanson', 'Swan@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Provo', '2017-11-12', 'assets/images/profile_pics/susie_swanson8cbf45445ab07c100b26127f068a1394n.jpeg', 3, 0, 'no', ',robbie_jinjoe,kalon_nunez,dylancougar,hurcut_brace,mark_michaels,', 'UT', ''),
(4, 'Debbie', 'Kerrigan', 'debbie_kerrigan', 'Deb@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Atlanta', '2017-11-12', 'assets/images/profile_pics/debbie_kerrigan6a72b7b1587636842c0a8454e4386bd2n.jpeg', 4, 0, 'no', ',megan_shurnur,Jimmy_Elvis,', 'GA', ''),
(5, 'Robbie', 'Jinjoe', 'robbie_jinjoe', 'Jinjoe@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Springfield', '2017-11-12', 'assets/images/profile_pics/robbie_jinjoe67495a7c3bd82024bd47d856bfd3737fn.jpeg', 4, 0, 'no', ',susie_swanson,Dylancougar,', 'MA', ''),
(6, 'Hurcut', 'Brace', 'hurcut_brace', 'Hurcut@gmail.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Hartford', '2017-11-12', 'assets/images/profile_pics/hurcut_brace78beb8bee62bf15433f50d079d4ac2b4n.jpeg', 8, 0, 'no', ',rusby_huggins,susie_swanson,', 'CT', ''),
(7, 'Rusby', 'Huggins', 'rusby_huggins', 'Rusby@gmx.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Houston', '2017-11-12', 'assets/images/profile_pics/rusby_huggins08c5d3a05da5e07f25750e20beaccf92n.jpeg', 0, 0, 'no', ',hurcut_brace,megan_shurnur,dylancougar,', 'TX', 'Barbecue'),
(9, 'Megan', 'Shurnur', 'megan_shurnur', 'Meg@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Dayton', '2017-11-12', 'assets/images/profile_pics/megan_shurnur5801766362d7a917ead3279c676e0fe6n.jpeg', 3, 4, 'no', ',debbie_kerrigan,dylancougar,vernon_dells,jane_brisbane,rusby_huggins,', 'OH', 'Thai'),
(10, 'Kalon', 'Nunez', 'kalon_nunez', 'Kal@gmx.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Louisville', '2017-11-12', 'assets/images/profile_pics/kalon_nuneze3527a4a6bf9085fcb0588dec2ac5e66n.jpeg', 3, 0, 'no', ',susie_swanson,Jimmy_Elvis,vernon_dells,Dylancougar,', 'KY', ''),
(11, 'Vernon', 'Dells', 'vernon_dells', 'Dells@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Cincinatti', '2017-11-12', 'assets/images/profile_pics/vernon_dells973c6156a78431672abfa3832c97efe9n.jpeg', 12, 3, 'no', ',kalon_nunez,megan_shurnur,dylancougar,', 'OH', ''),
(12, 'Jane', 'Brisbane', 'jane_brisbane', 'Bris@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', 'Boston', '2018-03-21', 'assets/images/profile_pics/jane_brisbane2f8dcd79fbce21b78a6d50a9178abd33n.jpeg', 1, 1, 'no', ',megan_shurnur,dylancougar,', 'MA', 'Southern'),
(13, 'Ana', 'Ramos', 'ana_ramos', 'Anaramos@yahoo.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' San Diego', '2018-05-02', 'assets/images/profile_pics/ana_ramosc1b8c9d4d8f1549e83035af1be5023d8n.jpeg', 0, 0, 'no', ',', ' CA', ' '),
(14, 'Kerry', 'Walsh', 'kerry_walsh', 'Walsh@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Tuscon', '2018-05-02', 'assets/images/profile_pics/kerry_walsh41d257596f6985c14ef7b278218e3384n.jpeg', 0, 0, 'no', ',ace_caracer,tate_robbins,', ' AR', ' '),
(15, 'Mark', 'Michaels', 'mark_michaels', 'Dylancougar@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Seattle', '2018-05-02', 'assets/images/profile_pics/mark_michaels6259dd5d5625017cbfdb05a378f2673an.jpeg', 0, 0, 'no', ',sara_green,dylancougar,susie_swanson,', 'WA', 'Seafood'),
(16, 'Tate', 'Robbins', 'tate_robbins', 'Tate@robbins.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Aliceville', '2018-05-02', 'assets/images/profile_pics/tate_robbins714df0dd1c4a5527cdff128f91bdae29n.jpeg', 0, 0, 'no', ',dylancougar,kerry_walsh,', ' AL', ' '),
(17, 'Sara', 'Green', 'sara_green', 'Sara@green.net', 'b0d86da2d5b3aa15b61df214489f7c12', ' Miami', '2018-05-02', 'assets/images/profile_pics/sara_green43e1cf5728e4b63e3fec6fa1cc7e2d39n.jpeg', 0, 0, 'no', ',mark_michaels,', 'FL', 'Japaneese'),
(18, 'Ace', 'Caracer', 'ace_caracer', 'Ace@aol.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Concord', '2018-05-02', 'assets/images/profile_pics/ace_caracer1298bdf4381590d65e0e044f3b891996n.jpeg', 0, 0, 'no', ',kerry_walsh,', ' NH', ' '),
(19, 'Naomi', 'Jonas', 'naomi_jonas', 'Jonas@namomi.com', 'b0d86da2d5b3aa15b61df214489f7c12', ' Roanoke', '2018-05-02', 'assets/images/profile_pics/naomi_jonasf99e5fc16ee9902f27ab1dd80f0dec9fn.jpeg', 0, 0, 'no', ',dylancougar,', ' VA', ' Seafood');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `friend_requests`
--
ALTER TABLE `friend_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
