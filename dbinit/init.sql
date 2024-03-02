/*
 MySQL Data Transfer

 Source Server         : Uniplato
 Source Server Type    : MySQL
 Source Server Version : 100144
 Source Host           : localhost:3306
 Source Schema         : uniplato

 Target Server Type    : MySQL
 Target Server Version : 100144
 File Encoding         : 65001

 Date: 10/09/2020 07:51:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `latitude` int NULL DEFAULT NULL,
  `longitude` int NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `counter` int NULL DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;


-- ----------------------------
-- user
-- ----------------------------

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id` binary(16) default (uuid_to_bin(uuid())) not null primary key
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;


-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (3, 1, '77', 250, 1);
INSERT INTO `category` VALUES (3, 1, '76', 160, 2);
INSERT INTO `category` VALUES (3, 1, '75', 200, 3);

SET FOREIGN_KEY_CHECKS = 1;



commit;
