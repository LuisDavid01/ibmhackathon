CREATE TABLE `ibmhackathon_account` (
	`id` varchar(255) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp,
	`refresh_token_expires_at` timestamp,
	`scope` text,
	`password` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `ibmhackathon_account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `account_userId_idx` ON `ibmhackathon_account` (`user_id`);--> statement-breakpoint
CREATE TABLE `ibmhackathon_comments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	`content` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `ibmhackathon_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `title_index` ON `ibmhackathon_comments` (`name`);--> statement-breakpoint
CREATE INDEX `owner_id_index` ON `ibmhackathon_comments` (`owner_id`);--> statement-breakpoint
CREATE TABLE `ibmhackathon_session` (
	`id` varchar(255) NOT NULL,
	`expires_at` timestamp NOT NULL,
	`token` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(255) NOT NULL,
	CONSTRAINT `ibmhackathon_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `ibmhackathon_session` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_token_idx` ON `ibmhackathon_session` (`token`);--> statement-breakpoint
CREATE TABLE `ibmhackathon_user` (
	`id` varchar(255) NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `ibmhackathon_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ibmhackathon_verification` (
	`id` varchar(255) NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `ibmhackathon_verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `ibmhackathon_verification` (`identifier`);