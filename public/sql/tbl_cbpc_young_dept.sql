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

 Date: 19/11/2019 10:57:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_cbpc_young_dept
-- ----------------------------
DROP TABLE IF EXISTS `tbl_cbpc_young_dept`;
CREATE TABLE `tbl_cbpc_young_dept`  (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `deptname` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  `uid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `id`(`id`, `deptname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_cbpc_young_dept
-- ----------------------------
INSERT INTO `tbl_cbpc_young_dept` VALUES (1, '公司领导 ', NULL);
INSERT INTO `tbl_cbpc_young_dept` VALUES (2, '办公室 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (3, '企划信息部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (4, '计划财务部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (5, '印钞管理部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (6, '钞纸管理部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (7, '安全保卫部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (8, '设备管理部 ', 15);
INSERT INTO `tbl_cbpc_young_dept` VALUES (9, '物资管理部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (10, '技术中心 ', 9);
INSERT INTO `tbl_cbpc_young_dept` VALUES (11, '基建与行政事务部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (12, '党委组织部(人力资源部)', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (13, '党委宣传部(企业文化部)', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (14, '纪检监察内审部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (15, '群工部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (16, '离退休工作部 ', NULL);
INSERT INTO `tbl_cbpc_young_dept` VALUES (17, '数管制作部 ', 4);
INSERT INTO `tbl_cbpc_young_dept` VALUES (18, '胶凹制作部 ', 4);
INSERT INTO `tbl_cbpc_young_dept` VALUES (19, '印码制作部 ', 5);
INSERT INTO `tbl_cbpc_young_dept` VALUES (20, '检封制作部 ', 6);
INSERT INTO `tbl_cbpc_young_dept` VALUES (21, '钞纸制作部 ', 7);
INSERT INTO `tbl_cbpc_young_dept` VALUES (22, '钞纸成品制作部 ', 8);
INSERT INTO `tbl_cbpc_young_dept` VALUES (23, '能源环保部 ', 9);
INSERT INTO `tbl_cbpc_young_dept` VALUES (24, '市场开发部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (25, '采购管理部 ', 3);
INSERT INTO `tbl_cbpc_young_dept` VALUES (26, '中钞长城公司 ', 11);
INSERT INTO `tbl_cbpc_young_dept` VALUES (27, '金鼎公司 ', 10);
INSERT INTO `tbl_cbpc_young_dept` VALUES (28, '物业公司 ', 12);
INSERT INTO `tbl_cbpc_young_dept` VALUES (29, '中钞金服', 13);

SET FOREIGN_KEY_CHECKS = 1;
