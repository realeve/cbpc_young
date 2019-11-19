/*
 Navicat Premium Data Transfer

 Source Server         : MYSQL
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : api_sheet_manager

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 19/11/2019 10:57:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_cbpc_young_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_cbpc_young_user`;
CREATE TABLE `tbl_cbpc_young_user`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rec_time` datetime(0) NULL DEFAULT NULL,
  `dept_id` int(11) NULL DEFAULT NULL,
  `gm` int(10) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_cbpc_young_user
-- ----------------------------
INSERT INTO `tbl_cbpc_young_user` VALUES (1, '黄夏玢', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 13:31:54', 15, 1);
INSERT INTO `tbl_cbpc_young_user` VALUES (2, '李宾', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:19:41', 5, 1);
INSERT INTO `tbl_cbpc_young_user` VALUES (3, '周婧秋', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:41:53', 12, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (4, '郭大平', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:41:58', 18, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (5, '周海兵', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:42:05', 19, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (6, '昝晨曲', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:42:11', 20, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (7, '赵昌玉', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:42:16', 21, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (8, '孙梦凡', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:42:22', 22, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (9, '刘军', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:42:28', 23, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (10, '王永超', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:43:30', 27, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (11, '熊宇', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:43:38', 26, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (12, '胡晓凤', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:43:43', 28, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (13, '李杨', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 14:43:46', 29, 0);
INSERT INTO `tbl_cbpc_young_user` VALUES (14, '孔宇芳', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 15:42:30', 15, 1);
INSERT INTO `tbl_cbpc_young_user` VALUES (15, '黄宇翔', '11c292b26e7ca9b11ab892ef8627ea63', '2019-11-18 16:05:36', 8, 0);

-- ----------------------------
-- Triggers structure for table tbl_cbpc_young_user
-- ----------------------------
DROP TRIGGER IF EXISTS `cbpc_yount_user`;
delimiter ;;
CREATE TRIGGER `cbpc_yount_user` BEFORE INSERT ON `tbl_cbpc_young_user` FOR EACH ROW SET new.password = MD5(concat('wMqSakbLdy9t8LLD',new.password)),new.rec_time = CURRENT_TIMESTAMP
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
