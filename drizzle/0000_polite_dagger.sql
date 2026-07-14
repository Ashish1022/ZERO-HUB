-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."enum_categories_status" AS ENUM('active', 'inactive', 'draft');--> statement-breakpoint
CREATE TYPE "public"."enum_products_badge" AS ENUM('', 'new', 'sale', 'bestseller', 'limited');--> statement-breakpoint
CREATE TYPE "public"."enum_products_refund_policy" AS ENUM('30-day', '14-day', '7-day', '3-day', '1-day', 'no-refunds');--> statement-breakpoint
CREATE TYPE "public"."enum_products_status" AS ENUM('active', 'draft', 'archived');--> statement-breakpoint
CREATE TYPE "public"."enum_subscription_plans_period" AS ENUM('monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."enum_subscriptions_status" AS ENUM('created', 'pending', 'authenticated', 'active', 'paused', 'halted', 'cancelled', 'completed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."enum_tags_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."enum_tags_type" AS ENUM('general', 'feature', 'collection', 'season', 'style', 'material', 'color', 'size', 'brand', 'occasion');--> statement-breakpoint
CREATE TYPE "public"."enum_tenants_bank_details_account_type" AS ENUM('vendor', 'super-vendor');--> statement-breakpoint
CREATE TYPE "public"."enum_tenants_bank_details_status" AS ENUM('pending', 'verified', 'rejected', 'suspended', 'not_submitted');--> statement-breakpoint
CREATE TYPE "public"."enum_tenants_subscription_subscription_status" AS ENUM('active', 'paused', 'cancelled', 'expired', 'none', 'trial', 'suspended');--> statement-breakpoint
CREATE TYPE "public"."enum_users_roles" AS ENUM('super-admin', 'user');--> statement-breakpoint
CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
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
CREATE TABLE "tenants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"store" varchar NOT NULL,
	"active_template" varchar DEFAULT 'default' NOT NULL,
	"subscription_subscription_id" varchar,
	"subscription_subscription_details_submitted" boolean DEFAULT false,
	"subscription_subscription_status" "enum_tenants_subscription_subscription_status" DEFAULT 'trial',
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
	"bank_details_account_type" "enum_tenants_bank_details_account_type" DEFAULT 'vendor',
	"bank_details_razorpay_linked_account_id" varchar,
	"bank_details_razorpay_linked_product_id" varchar,
	"bank_details_status" "enum_tenants_bank_details_status" DEFAULT 'not_submitted',
	"bank_details_commission_fee" numeric DEFAULT '0',
	"bank_details_flat_fee" numeric DEFAULT '0',
	"bank_details_pan_card_number" varchar,
	"max_products" numeric DEFAULT '100',
	"analytics_total_products" numeric DEFAULT '0',
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_images" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"image_id" uuid NOT NULL,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"tenant_slug" varchar NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar NOT NULL,
	"short_description" varchar,
	"pricing_price" numeric NOT NULL,
	"pricing_compare_at_price" numeric NOT NULL,
	"pricing_cost_price" numeric NOT NULL,
	"pricing_taxable" boolean DEFAULT true,
	"inventory_track_quantity" boolean DEFAULT true,
	"inventory_quantity" numeric DEFAULT '0',
	"inventory_low_stock_threshold" numeric DEFAULT '5',
	"inventory_allow_backorders" boolean DEFAULT false,
	"category_id" uuid NOT NULL,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_keywords" varchar,
	"featured" boolean DEFAULT false,
	"badge" "enum_products_badge",
	"content" jsonb,
	"shipping_weight" numeric,
	"shipping_dimensions_length" numeric,
	"shipping_dimensions_width" numeric,
	"shipping_dimensions_height" numeric,
	"shipping_requires_shipping" boolean DEFAULT true,
	"shipping_free_shipping" boolean DEFAULT false,
	"shipping_shipping_cost" numeric,
	"refund_policy" "enum_products_refund_policy" DEFAULT '30-day' NOT NULL,
	"status" "enum_products_status" DEFAULT 'draft' NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_specifications" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_variants" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_variants_options" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"price_adjustment" numeric DEFAULT '0'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT '0',
	"lock_until" timestamp(3) with time zone
);
--> statement-breakpoint
CREATE TABLE "users_tenants" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"tenant_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"type" "enum_tags_type" DEFAULT 'general' NOT NULL,
	"featured" boolean DEFAULT false,
	"status" "enum_tags_status" DEFAULT 'active' NOT NULL,
	"seo_title" varchar,
	"seo_description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" uuid NOT NULL,
	"path" varchar NOT NULL,
	"tags_id" uuid
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"tenant_slug" varchar NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" varchar,
	"status" "enum_categories_status" DEFAULT 'active' NOT NULL,
	"featured" boolean DEFAULT false,
	"parent_id" uuid,
	"thumbnail_id" uuid NOT NULL,
	"seo_title" varchar,
	"seo_description" varchar,
	"seo_keywords" varchar,
	"seo_og_image_id" uuid,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"name" varchar NOT NULL,
	"rating" numeric NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"email" varchar,
	"product_id" uuid NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans_features" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"feature" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"firstname" varchar NOT NULL,
	"lastname" varchar NOT NULL,
	"email" varchar NOT NULL,
	"news_letter" boolean DEFAULT false,
	"shipping_address_street" varchar NOT NULL,
	"shipping_address_apartment" varchar NOT NULL,
	"shipping_address_city" varchar NOT NULL,
	"shipping_address_postal_code" varchar NOT NULL,
	"shipping_address_state" varchar NOT NULL,
	"shipping_address_country" varchar NOT NULL,
	"delivery_option" varchar,
	"special_instructions" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"name" varchar NOT NULL,
	"customer_id" uuid NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"order_date" timestamp(3) with time zone NOT NULL,
	"gross_amount" numeric NOT NULL,
	"discount_amount" numeric DEFAULT '0',
	"tax_amount" numeric DEFAULT '0' NOT NULL,
	"shipping_amount" numeric DEFAULT '0',
	"sale_amount" numeric DEFAULT '0' NOT NULL,
	"razorpay_checkout_session_id" varchar,
	"razorpay_order_id" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category_sales_summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"category_name" varchar NOT NULL,
	"month" varchar NOT NULL,
	"year" varchar NOT NULL,
	"total_orders" numeric NOT NULL,
	"gross_sales" numeric NOT NULL,
	"net_sales" numeric NOT NULL,
	"total_items_sold" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products_sales_summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"product_name" varchar NOT NULL,
	"month" varchar NOT NULL,
	"year" varchar NOT NULL,
	"total_orders" numeric NOT NULL,
	"cost_price" numeric DEFAULT '60',
	"gross_sales" numeric NOT NULL,
	"net_sales" numeric NOT NULL,
	"total_items_sold" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monthly_sales_summary" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid,
	"month" varchar NOT NULL,
	"year" varchar NOT NULL,
	"total_orders" numeric NOT NULL,
	"gross_sales" numeric NOT NULL,
	"net_sales" numeric NOT NULL,
	"total_items_sold" numeric NOT NULL,
	"average_order_value" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"amount" numeric NOT NULL,
	"currency" varchar DEFAULT 'INR',
	"period" "enum_subscription_plans_period" NOT NULL,
	"interval" numeric DEFAULT '1',
	"razorpay_plan_id" varchar,
	"is_active" boolean DEFAULT true,
	"popular" boolean DEFAULT false,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tenant_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"razorpay_subscription_id" varchar NOT NULL,
	"status" "enum_subscriptions_status" NOT NULL,
	"start_at" timestamp(3) with time zone,
	"end_at" timestamp(3) with time zone,
	"current_start" timestamp(3) with time zone,
	"current_end" timestamp(3) with time zone,
	"charge_at" timestamp(3) with time zone,
	"total_count" numeric,
	"paid_count" numeric DEFAULT '0',
	"remaining_count" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_kv" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_migrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_roles" (
	"order" integer NOT NULL,
	"parent_id" uuid NOT NULL,
	"value" "enum_users_roles",
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders_order_items" (
	"_order" integer NOT NULL,
	"_parent_id" uuid NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"product" varchar NOT NULL,
	"category" varchar,
	"quantity" numeric NOT NULL,
	"unit_price" numeric NOT NULL,
	"discount_per_item" numeric DEFAULT '0',
	"gross_item_amount" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" uuid NOT NULL,
	"path" varchar NOT NULL,
	"users_id" uuid,
	"media_id" uuid,
	"tenants_id" uuid,
	"products_id" uuid,
	"tags_id" uuid,
	"categories_id" uuid,
	"reviews_id" uuid,
	"subscription_plans_id" uuid,
	"subscriptions_id" uuid,
	"customers_id" uuid,
	"orders_id" uuid,
	"category_sales_summary_id" uuid,
	"products_sales_summary_id" uuid,
	"monthly_sales_summary_id" uuid
);
--> statement-breakpoint
CREATE TABLE "payload_preferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" uuid NOT NULL,
	"path" varchar NOT NULL,
	"users_id" uuid
);
--> statement-breakpoint
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_specifications" ADD CONSTRAINT "products_specifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_variants_options" ADD CONSTRAINT "products_variants_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscription_plans_features" ADD CONSTRAINT "subscription_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."subscription_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category_sales_summary" ADD CONSTRAINT "category_sales_summary_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_sales_summary" ADD CONSTRAINT "products_sales_summary_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monthly_sales_summary" ADD CONSTRAINT "monthly_sales_summary_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_subscription_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."subscription_plans"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders_order_items" ADD CONSTRAINT "orders_order_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tenants_fk" FOREIGN KEY ("tenants_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscription_plans_fk" FOREIGN KEY ("subscription_plans_id") REFERENCES "public"."subscription_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscriptions_fk" FOREIGN KEY ("subscriptions_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_customers_fk" FOREIGN KEY ("customers_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_category_sales_summary_fk" FOREIGN KEY ("category_sales_summary_id") REFERENCES "public"."category_sales_summary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_sales_summary_fk" FOREIGN KEY ("products_sales_summary_id") REFERENCES "public"."products_sales_summary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_monthly_sales_summary_fk" FOREIGN KEY ("monthly_sales_summary_id") REFERENCES "public"."monthly_sales_summary"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename" text_ops);--> statement-breakpoint
CREATE INDEX "media_tenant_idx" ON "media" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "tenants_created_at_idx" ON "tenants" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenants_phone_idx" ON "tenants" USING btree ("phone" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenants_slug_idx" ON "tenants" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "tenants_subscription_subscription_subscription_status_idx" ON "tenants" USING btree ("subscription_subscription_status" enum_ops);--> statement-breakpoint
CREATE INDEX "tenants_updated_at_idx" ON "tenants" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "products_images_image_idx" ON "products_images" USING btree ("image_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_images_order_idx" ON "products_images" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "products_featured_idx" ON "products" USING btree ("featured" bool_ops);--> statement-breakpoint
CREATE INDEX "products_name_idx" ON "products" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "products_status_idx" ON "products" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "products_tenant_idx" ON "products" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_tenant_slug_idx" ON "products" USING btree ("tenant_slug" text_ops);--> statement-breakpoint
CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "tenantSlug_name_idx" ON "products" USING btree ("tenant_slug" text_ops,"name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenantSlug_slug_idx" ON "products" USING btree ("tenant_slug" text_ops,"slug" text_ops);--> statement-breakpoint
CREATE INDEX "products_specifications_order_idx" ON "products_specifications" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "products_specifications_parent_id_idx" ON "products_specifications" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_variants_options_order_idx" ON "products_variants_options" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "products_variants_options_parent_id_idx" ON "products_variants_options" USING btree ("_parent_id" text_ops);--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "users_phone_idx" ON "users" USING btree ("phone" text_ops);--> statement-breakpoint
CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username" text_ops);--> statement-breakpoint
CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "tags_name_idx" ON "tags" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "tags_status_idx" ON "tags" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "tags_tenant_idx" ON "tags" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order" int4_ops);--> statement-breakpoint
CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path" text_ops);--> statement-breakpoint
CREATE INDEX "products_rels_tags_id_idx" ON "products_rels" USING btree ("tags_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "categories_seo_seo_og_image_idx" ON "categories" USING btree ("seo_og_image_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "categories_status_idx" ON "categories" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "categories_tenant_idx" ON "categories" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "categories_tenant_slug_idx" ON "categories" USING btree ("tenant_slug" text_ops);--> statement-breakpoint
CREATE INDEX "categories_thumbnail_idx" ON "categories" USING btree ("thumbnail_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "tenantSlug_featured_idx" ON "categories" USING btree ("tenant_slug" text_ops,"featured" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "tenantSlug_slug_1_idx" ON "categories" USING btree ("tenant_slug" text_ops,"slug" text_ops);--> statement-breakpoint
CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "reviews_product_idx" ON "reviews" USING btree ("product_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "reviews_tenant_idx" ON "reviews" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "subscription_plans_features_order_idx" ON "subscription_plans_features" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "subscription_plans_features_parent_id_idx" ON "subscription_plans_features" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "customers_created_at_idx" ON "customers" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "customers_tenant_idx" ON "customers" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "customers_updated_at_idx" ON "customers" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "orders_customer_idx" ON "orders" USING btree ("customer_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "orders_tenant_idx" ON "orders" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "category_sales_summary_created_at_idx" ON "category_sales_summary" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "category_sales_summary_tenant_idx" ON "category_sales_summary" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "category_sales_summary_updated_at_idx" ON "category_sales_summary" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "products_sales_summary_created_at_idx" ON "products_sales_summary" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "products_sales_summary_tenant_idx" ON "products_sales_summary" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "products_sales_summary_updated_at_idx" ON "products_sales_summary" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "monthly_sales_summary_created_at_idx" ON "monthly_sales_summary" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "monthly_sales_summary_tenant_idx" ON "monthly_sales_summary" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "monthly_sales_summary_updated_at_idx" ON "monthly_sales_summary" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "subscription_plans_created_at_idx" ON "subscription_plans" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_plans_name_idx" ON "subscription_plans" USING btree ("name" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_plans_razorpay_plan_id_idx" ON "subscription_plans" USING btree ("razorpay_plan_id" text_ops);--> statement-breakpoint
CREATE INDEX "subscription_plans_updated_at_idx" ON "subscription_plans" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "subscriptions_created_at_idx" ON "subscriptions" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "subscriptions_plan_idx" ON "subscriptions" USING btree ("plan_id" uuid_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "subscriptions_razorpay_subscription_id_idx" ON "subscriptions" USING btree ("razorpay_subscription_id" text_ops);--> statement-breakpoint
CREATE INDEX "subscriptions_status_idx" ON "subscriptions" USING btree ("status" enum_ops);--> statement-breakpoint
CREATE INDEX "subscriptions_tenant_idx" ON "subscriptions" USING btree ("tenant_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "subscriptions_updated_at_idx" ON "subscriptions" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key" text_ops);--> statement-breakpoint
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order" int4_ops);--> statement-breakpoint
CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "orders_order_items_order_idx" ON "orders_order_items" USING btree ("_order" int4_ops);--> statement-breakpoint
CREATE INDEX "orders_order_items_parent_id_idx" ON "orders_order_items" USING btree ("_parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug" text_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_category_sales_summary_id_idx" ON "payload_locked_documents_rels" USING btree ("category_sales_summary_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_customers_id_idx" ON "payload_locked_documents_rels" USING btree ("customers_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_monthly_sales_summary_id_idx" ON "payload_locked_documents_rels" USING btree ("monthly_sales_summary_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order" int4_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path" text_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_products_sales_summary_id_idx" ON "payload_locked_documents_rels" USING btree ("products_sales_summary_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_subscription_plans_id_idx" ON "payload_locked_documents_rels" USING btree ("subscription_plans_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_subscriptions_id_idx" ON "payload_locked_documents_rels" USING btree ("subscriptions_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_tenants_id_idx" ON "payload_locked_documents_rels" USING btree ("tenants_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key" text_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at" timestamptz_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order" int4_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path" text_ops);--> statement-breakpoint
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id" uuid_ops);
*/