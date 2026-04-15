-- Earning App Database Schema

-- Create Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` varchar(255) NOT NULL PRIMARY KEY,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS `transactions` (
  `txn_id` varchar(255) NOT NULL PRIMARY KEY,
  `user_id` varchar(255) NOT NULL,
  `type` enum('deposit','withdrawal','transfer') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `external_txn_id` varchar(255) DEFAULT NULL UNIQUE,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `user_id` (`user_id`),
  KEY `external_txn_id_idx` (`external_txn_id`),
  KEY `created_at` (`created_at`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Verification Log Table (for audit trail)
CREATE TABLE IF NOT EXISTS `verification_logs` (
  `id` int AUTO_INCREMENT PRIMARY KEY,
  `user_id` varchar(255) NOT NULL,
  `transaction_id` varchar(255),
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `response_data` longtext,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  KEY `user_id` (`user_id`),
  KEY `transaction_id` (`transaction_id`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
