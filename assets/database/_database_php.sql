DROP DATABASE IF EXISTS db_node;

CREATE SCHEMA IF NOT EXISTS `database_php` DEFAULT CHARACTER SET utf8;
USE `database_php`;
-- -----------------------------------------------------
-- Table `database_php`.`ROLES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`ROLES` (
  `rol_code` INT NOT NULL AUTO_INCREMENT,
  `rol_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`rol_code`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `database_php`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`USERS` (
  `rol_code` INT NOT NULL,
  `user_code` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(100) NOT NULL,
  `user_lastname` VARCHAR(100) NOT NULL,
  `user_id` VARCHAR(20) NOT NULL,
  `user_email` VARCHAR(100) NOT NULL,
  `user_pass` VARCHAR(200) NOT NULL,
  `user_state` TINYINT NOT NULL,
  PRIMARY KEY (`user_code`),
  INDEX `ind_users_roles` (`rol_code` ASC),
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`rol_code`) REFERENCES `database_php`.`ROLES` (`rol_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `database_php`.`CUSTOMERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`CUSTOMERS` (
  `customer_code` INT NOT NULL,
  `customer_datebirth` DATE NOT NULL,
  `customer_address` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`customer_code`),
  CONSTRAINT `fk_customers_users` FOREIGN KEY (`customer_code`) REFERENCES `database_php`.`USERS` (`user_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `database_php`.`CATEGORIES`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`CATEGORIES` (
  `category_code` INT NOT NULL,
  `category_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`category_code`)
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `database_php`.`PRODUCTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`PRODUCTS` (
  `category_code` INT NOT NULL,
  `product_code` INT NOT NULL,
  `product_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`product_code`),
  INDEX `ind_products_categories` (`category_code` ASC),
  CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_code`) REFERENCES `database_php`.`CATEGORIES` (`category_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `database_php`.`ORDERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`ORDERS` (
  `customer_code` INT NOT NULL,
  `order_code` INT NOT NULL,
  `order_date` DATE NOT NULL,
  PRIMARY KEY (`order_code`),
  INDEX `ind_orders_customers` (`customer_code` ASC),
  CONSTRAINT `fk_orders_customers` FOREIGN KEY (`customer_code`) REFERENCES `database_php`.`CUSTOMERS` (`customer_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `database_php`.`LIST_PRODUCTS_ORDERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `database_php`.`LIST_PRODUCTS_ORDERS` (
  `order_code` INT NOT NULL,
  `product_code` INT NOT NULL,
  `quantity_products` INT NOT NULL,
  INDEX `ind_list_products_orders` (`order_code` ASC),
  INDEX `ind_list_products_products` (`product_code` ASC),
  CONSTRAINT `fk_list_products_orders` FOREIGN KEY (`order_code`) REFERENCES `database_php`.`ORDERS` (`order_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_list_products_products` FOREIGN KEY (`product_code`) REFERENCES `database_php`.`PRODUCTS` (`product_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;