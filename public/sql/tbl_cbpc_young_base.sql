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

 Date: 19/11/2019 10:57:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_cbpc_young_base
-- ----------------------------
DROP TABLE IF EXISTS `tbl_cbpc_young_base`;
CREATE TABLE `tbl_cbpc_young_base`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `usercode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deptname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rec_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `prod_quality` int(10) NULL DEFAULT NULL,
  `prod_produce` int(10) NULL DEFAULT NULL,
  `prod_cost` int(10) NULL DEFAULT NULL,
  `support_prod` int(10) NULL DEFAULT NULL,
  `support_attitude` int(10) NULL DEFAULT NULL,
  `manager` int(10) NULL DEFAULT NULL,
  `score` int(10) NULL DEFAULT NULL,
  `rec_time` datetime(0) NULL DEFAULT NULL,
  `uid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Triggers structure for table tbl_cbpc_young_base
-- ----------------------------
DROP TRIGGER IF EXISTS `base_rec_time`;
delimiter ;;
CREATE TRIGGER `base_rec_time` BEFORE INSERT ON `tbl_cbpc_young_base` FOR EACH ROW SET new.rec_time = CURRENT_TIMESTAMP
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
