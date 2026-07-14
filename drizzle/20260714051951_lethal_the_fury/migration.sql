-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "enum_users_roles" AS ENUM('super-admin', 'user');--> statement-breakpoint
CREATE TYPE "enum_tenants_subscription_subscription_status" AS ENUM('active', 'paused', 'cancelled', 'expired', 'none', 'trial', 'suspended');--> statement-breakpoint
CREATE TYPE "enum_tenants_bank_details_account_type" AS ENUM('vendor', 'super-vendor');--> statement-breakpoint
CREATE TYPE "enum_tenants_bank_details_status" AS ENUM('pending', 'verified', 'rejected', 'suspended', 'not_submitted');--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY,
	"alt" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);
--> statement-breakpoint
CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"media_id" integer,
	"tenants_id" integer
);
--> statement-breakpoint
CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"store" varchar NOT NULL,
	"active_template" varchar DEFAULT 'default' NOT NULL,
	"subscription_subscription_id" varchar,
	"subscription_subscription_details_submitted" boolean DEFAULT false,
	"subscription_subscription_status" "enum_tenants_subscription_subscription_status" DEFAULT 'trial'::"enum_tenants_subscription_subscription_status",
	"subscription_subscription_start_date" timestamp(3) with time zone,
	"subscription_subscription_end_date" timestamp(3) with time zone,
	"subscription_trial_start_date" timestamp(3) with time zone,
	"subscription_trial_end_date" timestamp(3) with time zone,
	"subscription_trial_days_remaining" numeric,
	"subscription_is_trial_active" boolean,
	"bank_details_account_holder_name" varchar,
	"bank_details_account_number" varchar,
	"bank_details_ifsc_code" varchar,
	"bank_details_bank_details_submitted" boolean DEFAULT false,
	"bank_details_account_type" "enum_tenants_bank_details_account_type" DEFAULT 'vendor'::"enum_tenants_bank_details_account_type",
	"bank_details_razorpay_linked_account_id" varchar,
	"bank_details_razorpay_linked_product_id" varchar,
	"bank_details_status" "enum_tenants_bank_details_status" DEFAULT 'not_submitted'::"enum_tenants_bank_details_status",
	"bank_details_commission_fee" numeric DEFAULT '0',
	"bank_details_flat_fee" numeric DEFAULT '0',
	"bank_details_pan_card_number" varchar,
	"max_products" numeric DEFAULT '100',
	"analytics_total_products" numeric DEFAULT '0',
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT '0',
	"lock_until" timestamp(3) with time zone,
	"username" varchar NOT NULL,
	"phone" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_tenants" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY,
	"tenant_id" integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "media_filename_idx" ON "media" ("filename");--> statement-breakpoint
CREATE INDEX "media_updated_at_idx" ON "media" ("updated_at");--> statement-breakpoint
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" ("key");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" ("created_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" ("global_slug");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" ("media_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" ("order");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" ("path");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" ("tenants_id");--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" ("users_id");--> statement-breakpoint
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");--> statement-breakpoint
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" ("key");--> statement-breakpoint
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" ("updated_at");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" ("users_id");--> statement-breakpoint
CREATE INDEX "tenants_created_at_idx" ON "tenants" ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "tenants_phone_idx" ON "tenants" ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" ("slug");--> statement-breakpoint
CREATE INDEX "tenants_subscription_subscription_subscription_status_idx" ON "tenants" ("subscription_subscription_status");--> statement-breakpoint
CREATE INDEX "tenants_updated_at_idx" ON "tenants" ("updated_at");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_phone_idx" ON "users" ("phone");--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" ("updated_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_idx" ON "users" ("username");--> statement-breakpoint
CREATE INDEX "users_roles_order_idx" ON "users_roles" ("order");--> statement-breakpoint
CREATE INDEX "users_roles_parent_idx" ON "users_roles" ("parent_id");--> statement-breakpoint
CREATE INDEX "users_sessions_order_idx" ON "users_sessions" ("_order");--> statement-breakpoint
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" ("_parent_id");--> statement-breakpoint
CREATE INDEX "users_tenants_order_idx" ON "users_tenants" ("_order");--> statement-breakpoint
CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" ("_parent_id");--> statement-breakpoint
CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" ("tenant_id");--> statement-breakpoint
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE SET NULL;
*/