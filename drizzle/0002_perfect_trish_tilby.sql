ALTER TABLE "comments" DROP CONSTRAINT "comments_owner_id_user_id_fk";
--> statement-breakpoint
DROP INDEX "comments_userId_idx";--> statement-breakpoint
ALTER TABLE "proyectos_changes" ADD COLUMN "changeState" "proyect_stages" DEFAULT 'preparacion' NOT NULL;--> statement-breakpoint
ALTER TABLE "proyectos_changes" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "owner_id";