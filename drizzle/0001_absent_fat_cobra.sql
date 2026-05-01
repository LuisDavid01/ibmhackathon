CREATE TABLE "proyectos_changes" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "proyectos_changes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"proyect_id" bigint NOT NULL,
	"change_title" text NOT NULL,
	"user_id" text NOT NULL,
	"details" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"budget_spent" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proyectos" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "proyectos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text NOT NULL,
	"company" text NOT NULL,
	"location" text NOT NULL,
	"municipality" text NOT NULL,
	"budget" bigint NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "proyectos_changes" ADD CONSTRAINT "proyectos_changes_proyect_id_proyectos_id_fk" FOREIGN KEY ("proyect_id") REFERENCES "public"."proyectos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proyectos_changes" ADD CONSTRAINT "proyectos_changes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "proyecto_index" ON "proyectos_changes" USING btree ("proyect_id");--> statement-breakpoint
CREATE INDEX "user_index" ON "proyectos_changes" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "name_index" ON "proyectos" USING btree ("name");--> statement-breakpoint
CREATE INDEX "company_index" ON "proyectos" USING btree ("company");--> statement-breakpoint
CREATE INDEX "location_index" ON "proyectos" USING btree ("location");--> statement-breakpoint
CREATE INDEX "municipalidad_index" ON "proyectos" USING btree ("municipality");