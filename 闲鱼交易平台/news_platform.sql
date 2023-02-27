/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50735
 Source Host           : localhost:3306
 Source Schema         : news_platform

 Target Server Type    : MySQL
 Target Server Version : 50735
 File Encoding         : 65001

 Date: 10/01/2022 14:58:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `shop_id` bigint(20) NOT NULL,
  `artist_id` bigint(20) NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gmt_modify` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `gmt_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `avator` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 2, 1, '这是评论', '2022-01-10 10:21:37', '2022-01-10 09:51:04', '帅气小哥哥', 'http://localhost:8088/assests/images/lRR_qt6KojFY11RunSVxYcgq.jpg');
INSERT INTO `comments` VALUES (15, 2, 1, 'zheshi', '2022-01-10 10:49:51', '2022-01-10 10:49:51', '帅气小哥哥', 'http://localhost:8088/assests/images/lRR_qt6KojFY11RunSVxYcgq.jpg');
INSERT INTO `comments` VALUES (16, 2, 1, '这是我的评论啊', '2022-01-10 10:52:35', '2022-01-10 10:52:35', '帅气小哥哥', 'http://localhost:8088/assests/images/lRR_qt6KojFY11RunSVxYcgq.jpg');
INSERT INTO `comments` VALUES (17, 3, 1, '来评论一下', '2022-01-10 10:54:54', '2022-01-10 10:54:54', '帅气小哥哥', 'http://localhost:8088/assests/images/lRR_qt6KojFY11RunSVxYcgq.jpg');
INSERT INTO `comments` VALUES (18, 3, 1, '评论一下', '2022-01-10 14:50:59', '2022-01-10 14:50:59', '帅气小哥哥', 'http://localhost:8088/assests/images/lRR_qt6KojFY11RunSVxYcgq.jpg');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `artist_id` bigint(20) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `main_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `article` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `article_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `recommand` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gmt_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gmt_modify` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `price` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES (2, 1, '美丽国度-白俄罗斯', 'http://localhost:8088/assests/images/f9UPyumrZUCZgDbdT_PO2uOk.JPG', '白俄罗斯共和国（白俄罗斯语：Рэспубліка Беларусь，英语：Republic of Belarus），简称白俄罗斯，位于东欧平原西部，东邻俄罗斯，北、西北与拉脱维亚和立陶宛交界，西与波兰毗邻，南与乌克兰接壤。 [1]  国土面积达207,600平方公里，人口达939.78万（2020年4月） [20]  ，大部分居住在首都明斯克等大城市附近，将近80%人口为白俄罗斯人，大多信仰东正教，复活节等被设为国定假日。 [2] \n白俄罗斯人是东斯拉夫人的一支。白俄罗斯（“白色罗斯”）一词始见于1135年编年史。公元862年，白俄罗斯土地上建成波洛茨克城堡。9-12世纪，以该城堡为中心形成波洛茨克公国。 [1]  13世纪上半叶形成白俄罗斯语文字。13世纪中期-18世纪末，先后归属立陶宛大公国和波兰立陶宛联邦。 [1]  18世纪起并入俄罗斯帝国。 [2]  第一次世界大战后期，1918年3月25日，依照《布列斯特-立托夫斯克和约》宣布独立，建立白俄罗斯人民共和国。1919年成立白俄罗斯苏维埃社会主义共和国，1922年并入苏联，成为苏联加盟共和国之一。1991年8月25日恢复独立。现为独联体和集体安全条约组织的成员国。 [2] \n白俄罗斯工业基础较好，机械制造业、冶金加工业、机床及激光技术、IT业较发达；农业和畜牧业亦很发达。白俄罗斯与俄罗斯和哈萨克斯坦共同建立了欧亚经济联盟，与俄罗斯和哈萨克的经济、军事等一体化趋势正逐渐加强。', '3', '美丽', '2021-11-30 10:01:09', '2022-01-10 14:18:52', '10');
INSERT INTO `news` VALUES (3, 1, '一款好玩的游戏', 'http://localhost:8088/assests/images/98is2kwv-CwFwbvEJJavrRXW.JPG', '这是一款好玩的游戏', '2', '一款好玩的游戏', '2021-11-30 13:16:00', '2022-01-10 14:18:54', '21');
INSERT INTO `news` VALUES (4, 1, '好玩的游戏', 'http://localhost:8088/assests/images/p9tbpfLBAfZCmnWzFlvm2GQ7.JPG', '一款不错的游戏', '1', '游戏', '2021-11-30 13:17:25', '2022-01-10 14:18:55', '34');
INSERT INTO `news` VALUES (5, 1, '一款不错的游戏', 'http://localhost:8088/assests/images/KAYbRBMsX-p76Blqlg067-qv.jpg', '一款不错的游戏', '5', '一款不错的游戏', '2021-11-30 13:22:21', '2022-01-10 14:18:56', '65');
INSERT INTO `news` VALUES (6, 1, '美丽的女性', 'http://localhost:8088/assests/images/9ZtmWmtjrZYo6F3I6X2UNjTl.jpg', '美丽的女性', '1', '美丽的女性', '2021-11-30 15:26:26', '2022-01-10 14:18:56', '65');
INSERT INTO `news` VALUES (7, 1, '美丽的女星', 'http://localhost:8088/assests/images/ohSel0PSOcEE0GBMR7c2wU7p.jpg', '美丽的女性', '2', '美丽的女性', '2021-11-30 15:26:48', '2022-01-10 14:18:59', '76');
INSERT INTO `news` VALUES (8, 1, '美丽的女性美丽的女性', 'http://localhost:8088/assests/images/0OSHYEuo4iuKrR1jo9oZCNzA.jpg', '美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性', '3', '美丽的女性美丽的女性', '2021-11-30 15:27:05', '2022-01-10 14:19:01', '46');
INSERT INTO `news` VALUES (9, 1, '美丽的女性美丽的', 'http://localhost:8088/assests/images/zt9ps4kEmmQX9nodv8-CuLPt.jpg', '美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性', '4', '美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性', '2021-11-30 15:27:24', '2022-01-10 14:18:57', '76');
INSERT INTO `news` VALUES (10, 1, '美丽的风景', 'http://localhost:8088/assests/images/QPtlnvHSlVX0mWndF5t9bZbd.jfif', '美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性美丽的女性', '1', '美丽的女性美丽的女性美丽的女性', '2021-11-30 15:27:39', '2022-01-10 14:19:04', '92');
INSERT INTO `news` VALUES (11, 1, '好看的风景', 'http://localhost:8088/assests/images/XCcK5Th4iBhklI9Vsx2q3RLJ.jpg', '好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景', '1', '好看的风景', '2021-11-30 15:34:04', '2022-01-10 14:19:06', '8');
INSERT INTO `news` VALUES (12, 1, '好看的风景好看的风景', 'http://localhost:8088/assests/images/PGYkJACInPrY6DsHg9FzGC85.jfif', '好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景', '2', '好看的风景好看的风景好看的风景', '2021-11-30 15:34:21', '2022-01-10 14:19:08', '46');
INSERT INTO `news` VALUES (13, 1, '好看的风景好看的风景好看的风景', 'http://localhost:8088/assests/images/ZMzMehE-WZo2DDURyTiQV-s8.jpg', '好看的风景好看的风景好看的风景好看的风景好看的风景', '4', '好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景好看的风景', '2021-11-30 15:34:35', '2022-01-10 14:19:10', '73');
INSERT INTO `news` VALUES (14, 4, '一篇文章', 'http://localhost:8088/assests/images/WJ9HAZ7I8rS8XHzhlqVqOSxx.jpg', '一篇文章一篇文章一篇文章一篇文章', '1', '一篇文章一篇文章一篇文章', '2021-11-30 15:46:53', '2022-01-10 14:19:12', '27');
INSERT INTO `news` VALUES (15, 1, '八宝粥', 'http://localhost:8088/assests/images/m7vIeW_4-_nS30NqN9KD9TWs.JPG', '好吃的八宝粥', '3', '好吃的', '2022-01-10 14:41:37', '2022-01-10 14:41:37', NULL);
INSERT INTO `news` VALUES (16, 1, '咸鱼', 'http://localhost:8088/assests/images/c2i4Cpu-rvwSUEXDQmDneL1L.png', '咸鱼商品市场', '1', '好玩的', '2022-01-10 14:53:00', '2022-01-10 14:53:00', '2000');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `gmt_create` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gmt_modify` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `avator` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '帅气小哥哥', '女', '1311111111111', '浙江省', '2021-11-30 09:41:27', '2021-11-30 09:45:00', 'http://localhost:8088/assests/images/lRR_qt6KojFY11RunSVxYcgq.jpg');
INSERT INTO `user` VALUES (2, '1', 'c4ca4238a0b923820dcc509a6f75849b', '1', '男', '1', '1', '2021-11-30 15:40:30', '2021-11-30 15:40:30', NULL);
INSERT INTO `user` VALUES (3, 'user', 'b59c67bf196a4758191e42f76670ceba', '小哥小', '男', '1311111111', '浙江', '2021-11-30 15:42:29', '2021-11-30 15:43:46', 'http://localhost:8088/assests/images/Y2s6_-P4bkOjNPRhdf0yqPYR.jfif');
INSERT INTO `user` VALUES (4, 'user1', 'b59c67bf196a4758191e42f76670ceba', '小水阿哥', '男', '111111111', 'zhejiang', '2021-11-30 15:45:26', '2021-11-30 15:46:36', 'http://localhost:8088/assests/images/EiaMDuHQTrSLM_nym-whYenE.jfif');

SET FOREIGN_KEY_CHECKS = 1;
