-- Analytics views consumed by src/modules/analytics/server/procedure.ts
-- These are NOT managed by Payload; re-run this file after a fresh DB reset.
-- Column names are chosen so drizzle-kit pull produces camelCase members
-- (v_tenant_monthly_sales -> vTenantMonthlySales, etc.) matching the code.

CREATE OR REPLACE VIEW v_tenant_monthly_sales AS
SELECT
    tenant_id,
    month,
    SUM(gross_sales)                                    AS total_gross_sales,
    SUM(net_sales)                                      AS total_net_sales,
    SUM(total_orders)                                   AS total_orders,
    SUM(gross_sales) / NULLIF(SUM(total_orders), 0)     AS average_order_value
FROM monthly_sales_summary
GROUP BY tenant_id, month;

CREATE OR REPLACE VIEW v_top_categories_by_tenant AS
SELECT
    tenant_id,
    category_name,
    SUM(gross_sales)      AS total_gross_sales,
    SUM(net_sales)        AS total_net_sales,
    SUM(total_orders)     AS total_orders,
    SUM(total_items_sold) AS total_items_sold,
    ROW_NUMBER() OVER (
        PARTITION BY tenant_id
        ORDER BY SUM(gross_sales) DESC
    )                     AS category_rank
FROM category_sales_summary
GROUP BY tenant_id, category_name;

CREATE OR REPLACE VIEW v_product_performance_by_tenant AS
SELECT
    tenant_id,
    product_name,
    SUM(gross_sales)      AS total_gross_sales,
    SUM(net_sales)        AS total_net_sales,
    SUM(cost_price)       AS total_cost_price,
    SUM(total_items_sold) AS total_items_sold,
    SUM(total_orders)     AS total_orders,
    ROW_NUMBER() OVER (
        PARTITION BY tenant_id
        ORDER BY SUM(gross_sales) DESC
    )                     AS product_rank_high,
    ROW_NUMBER() OVER (
        PARTITION BY tenant_id
        ORDER BY SUM(gross_sales) ASC
    )                     AS product_rank_low
FROM products_sales_summary
GROUP BY tenant_id, product_name;
